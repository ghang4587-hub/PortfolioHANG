const MODULES = {
  'short-drama': {
    type: 'short-drama', label: '短剧', panelId: 'shortDramaPanel', gridId: 'shortDramaGrid', countId: 'shortDramaCount',
    scopeId: 'shortScopeTabs', tagId: 'shortTagChips', tabHash: '#short-drama',
    scopeCountIds: { focus: 'shortFocusCount', all: 'shortAllCount', overseas: 'shortOverseasCount', domestic: 'shortDomesticCount' },
    controls: { search: 'shortSearchInput', market: 'shortMarketFilter', platform: 'shortPlatformFilter', audience: 'shortAudienceFilter', duration: 'shortDurationFilter', sort: 'shortSortFilter' },
    platformOrder: ['DramaBox', 'GoodShort', '腾讯视频', '优酷', '阅文短剧'], defaultScope: 'focus', defaultSort: 'value', durationLimits: { short: 900, medium: 1800 },
  },
  manga: {
    type: 'manga', label: '漫剧', panelId: 'mangaPanel', gridId: 'mangaGrid', countId: 'mangaCount',
    scopeId: 'mangaScopeTabs', tagId: 'mangaTagChips', tabHash: '#manga',
    scopeCountIds: { focus: 'mangaFocusCount', deep: 'mangaDeepCount', all: 'mangaAllCount' },
    controls: { search: 'mangaSearchInput', market: 'mangaMarketFilter', platform: 'mangaPlatformFilter', audience: 'mangaAudienceFilter', duration: 'mangaDurationFilter', sort: 'mangaSortFilter' },
    platformOrder: ['B站', '爱奇艺', 'Baichuan Comics', 'Supreme Anime Drama'], defaultScope: 'focus', defaultSort: 'value', durationLimits: { short: 2700, medium: 7200 },
  },
};

const state = {
  catalog: null,
  rows: [],
  activeModule: 'short-drama',
  modules: { 'short-drama': { scope: 'focus', tag: 'all' }, manga: { scope: 'focus', tag: 'all' } },
  selectedUid: '',
  storyboardCache: new Map(),
  activePlayer: null,
};

const $ = (id) => document.getElementById(id);
// Used only until the catalog is loaded; the published snapshot is authoritative.
let snapshotDate = '2026-09-14';
let youtubeApiPromise = null;

function configFor(type) { return MODULES[type === 'manga' ? 'manga' : 'short-drama']; }
function bool(value) { return value === true || value === 1 || value === '1' || value === 'true'; }
function setText(id, value) { const element = $(id); if (element) element.textContent = String(value); }

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[character]));
}

function formatViews(value, label = '') {
  if (label) return label;
  if (value == null || Number.isNaN(Number(value))) return '播放量待核验';
  const number = Number(value);
  if (!number) return '0 次播放';
  if (number >= 1e8) return `${(number / 1e8).toFixed(1)} 亿播放`;
  if (number >= 1e4) return `${(number / 1e4).toFixed(1)} 万播放`;
  return `${number.toLocaleString('zh-CN')} 次播放`;
}

function displayViews(row) {
  const count = formatViews(row.views, row.viewLabel);
  return row.viewNote ? `${count} · ${row.viewNote}` : count;
}

function formatDate(value) {
  if (!value) return '日期待核验';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value).slice(0, 10) : date.toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' });
}

function formatDuration(seconds, fallback = '') {
  const value = Number(seconds) || 0;
  if (!value) return fallback || '时长待核验';
  const h = Math.floor(value / 3600);
  const m = Math.floor((value % 3600) / 60);
  const s = value % 60;
  return h ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}` : `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function audienceLabel(value) { return value === 'female' ? '女频向' : value === 'male' ? '男频向' : '中性待判'; }
function typeLabel(value) { return value === 'manga' ? '漫剧' : '短剧'; }
function marketLabel(value) { return value === 'domestic' ? '国内' : '海外'; }
function dateValue(row) { const value = new Date(row?.publishedAt || 0).getTime(); return Number.isFinite(value) ? value : 0; }
function viewsValue(row) { const value = Number(row?.views); return Number.isFinite(value) ? value : -1; }
function durationValue(row) { const value = Number(row?.durationSec); return Number.isFinite(value) && value > 0 ? value : 0; }

// Sort values are kept backwards-compatible with the original `strategy` option.
// New markup should use `value` and label it “买量创策价值”.
function normalizeSort(type, value) {
  const candidate = String(value || '').trim().toLowerCase();
  if (candidate === 'value' || candidate === 'strategy' || candidate === 'buy-value' || candidate === 'creative-value') return 'value';
  if (candidate === 'views' || candidate === 'heat' || candidate === 'hot' || candidate === 'popularity') return 'views';
  if (candidate === 'latest' || candidate === 'newest' || candidate === 'recent') return 'latest';
  if (candidate === 'hook' || candidate === 'score' || candidate === 'editor-score') return 'hook';
  if (candidate === 'shortest' || candidate === 'duration-asc') return 'shortest';
  if (candidate === 'longest' || candidate === 'duration' || candidate === 'duration-desc') return 'longest';
  return configFor(type).defaultSort;
}

function firstNumeric(row, fields, fallback = 0) {
  for (const field of fields) {
    const raw = row?.[field];
    if (raw == null || raw === '' || typeof raw === 'boolean') continue;
    const number = Number(raw);
    if (Number.isFinite(number)) return number;
  }
  return fallback;
}

function editorScoreValue(row) {
  // `score` is the canonical editorial score; aliases allow future catalog updates.
  return firstNumeric(row, ['editorScore', 'editScore', 'creativeScore', 'score'], 0);
}

function publicHeatValue(row) {
  // Prefer an explicit heat metric, then the canonical public view count.
  return firstNumeric(row, ['publicHeat', 'heat', 'popularity', 'heatScore', 'views', 'viewCount'], -1);
}

function canSeekMoments(row) {
  const provider = resolveProvider(row);
  return Boolean(provider.canSeek);
}

function momentEvidenceReady(row, moment) {
  if (!moment || moment.verified !== true) return false;
  const seconds = Number(moment.seconds) || 0;
  if (moment.frameStatus === 'available') {
    return Boolean(moment.frame || (row?.frames && (row.frames[String(moment.seconds)] || row.frames[String(Math.floor(seconds))])));
  }
  if (moment.frameStatus === 'storyboard') {
    const spec = row?.storyboard;
    return Boolean(spec?.url && Number(spec.w) > 0 && Number(spec.h) > 0 && Number(spec.count) > 0);
  }
  return false;
}

function isFresh(row) {
  if (!row.publishedAt) return false;
  const published = new Date(row.publishedAt).getTime();
  const snapshot = new Date(`${snapshotDate}T23:59:59+08:00`).getTime();
  return Number.isFinite(published) && snapshot - published >= 0 && snapshot - published <= 7 * 864e5;
}

function coverMarkup(row) {
  const cover = row.cover || '';
  if (!cover) return '<div class="cover-fallback">封面待补齐<br>保留来源链接</div>';
  return `<img loading="lazy" decoding="async" src="${escapeHtml(cover)}" alt="${escapeHtml(row.title)} 封面" data-fallback-title="${escapeHtml(row.title)}">`;
}

function durationBucket(row, type) {
  const seconds = durationValue(row);
  if (!seconds) return 'unknown';
  const limits = configFor(type).durationLimits;
  if (seconds <= limits.short) return 'short';
  if (seconds <= limits.medium) return 'medium';
  return 'long';
}

function searchText(row) {
  return [row.title, row.sourceTitle, row.originalTitle, row.platform, row.source, row.contentTypeLabel, row.marketLabel, ...(row.tags || []), row.hook, row.first10, row.synopsis, row.rise, row.promise].filter(Boolean).join(' ').toLowerCase();
}

function moduleRows(type) { return state.rows.filter((row) => row.contentType === type); }

function selectionComparator(a, b) {
  return Number(b.score || 0) - Number(a.score || 0) || dateValue(b) - dateValue(a) || viewsValue(b) - viewsValue(a) || Number(a.__index || 0) - Number(b.__index || 0);
}

function marketBalancedSelection(rows, perMarket, marker) {
  const selected = [];
  ['domestic', 'overseas'].forEach((market) => {
    const pool = rows.filter((row) => row.market === market);
    const marked = marker ? pool.filter(marker).sort(selectionComparator) : [];
    const unmarked = pool.filter((row) => !marked.includes(row)).sort(selectionComparator);
    selected.push(...marked.slice(0, perMarket));
    if (marked.length < perMarket) selected.push(...unmarked.slice(0, perMarket - marked.length));
  });
  return selected;
}

function shortDramaScopeRows(scope = state.modules['short-drama'].scope) {
  const rows = moduleRows('short-drama');
  if (scope === 'all') return rows.slice();
  if (scope === 'domestic' || scope === 'overseas') return rows.filter((row) => row.market === scope);
  // sourceFocus is the original Hanbox 8-per-market selection; fill gaps from the canonical rank.
  return marketBalancedSelection(rows, 8, (row) => bool(row.sourceFocus));
}

function mangaScopeRows(scope = state.modules.manga.scope) {
  const rows = moduleRows('manga');
  if (scope === 'all') return rows.slice();
  const perMarket = scope === 'deep' ? 4 : 8;
  // focusRank is assigned independently for domestic and overseas manga.
  return marketBalancedSelection(rows, perMarket, (row) => Number(row.focusRank) > 0 && Number(row.focusRank) <= perMarket);
}

function scopeRows(type, scope = state.modules[type].scope) { return type === 'manga' ? mangaScopeRows(scope) : shortDramaScopeRows(scope); }

function readFilters(type) {
  const config = configFor(type);
  const value = (key, fallback = 'all') => $(config.controls[key])?.value ?? fallback;
  return { query: String(value('search', '')).trim().toLowerCase(), market: value('market'), platform: value('platform'), audience: value('audience'), duration: value('duration'), sort: normalizeSort(type, value('sort', config.defaultSort)) };
}

function ensureDefaultSort(type) {
  const config = configFor(type), select = $(config.controls.sort);
  if (!select || select.dataset.defaultSortReady === 'true') return;
  const desired = normalizeSort(type, config.defaultSort);
  const matching = [...select.options].find((option) => normalizeSort(type, option.value) === desired);
  if (matching) {
    select.value = matching.value;
  } else {
    const option = document.createElement('option');
    option.value = desired;
    option.textContent = desired === 'value' ? '买量创策价值' : '默认排序';
    select.insertBefore(option, select.firstChild);
    select.value = desired;
  }
  select.dataset.defaultSortReady = 'true';
}

function collectTopTags(type) {
  const counts = new Map();
  moduleRows(type).forEach((row) => (row.tags || []).forEach((tag) => { if (tag) counts.set(tag, (counts.get(tag) || 0) + 1); }));
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'zh-CN')).slice(0, 14).map(([tag]) => tag);
}

function modulePanel(type) { return $(configFor(type).panelId); }

function renderTagChips(type) {
  const config = configFor(type), panel = modulePanel(type), list = $(config.tagId);
  if (!panel || !list) return;
  const currentTag = state.modules[type].tag;
  const allInList = list.querySelector('[data-tag="all"]');
  const tags = collectTopTags(type);
  const markup = tags.map((tag) => `<button class="tag-chip${currentTag === tag ? ' active' : ''}" data-tag="${escapeHtml(tag)}" data-module-tag="${type}" type="button">${escapeHtml(tag)}</button>`).join('');
  if (allInList) list.innerHTML = `<button class="tag-chip${currentTag === 'all' ? ' active' : ''}" data-tag="all" data-module-tag="${type}" type="button">全部</button>${markup}`;
  else list.innerHTML = markup;
  panel.querySelectorAll('.tag-chip').forEach((button) => {
    const belongs = button.dataset.moduleTag === type || (!button.dataset.moduleTag && button.closest(`#${config.tagId}`));
    if (belongs && button.dataset.tag === 'all') button.classList.toggle('active', currentTag === 'all');
  });
}

function populatePlatforms(type) {
  const config = configFor(type), select = $(config.controls.platform);
  if (!select) return;
  const current = select.value, rows = moduleRows(type);
  const known = config.platformOrder.filter((platform) => rows.some((row) => row.platform === platform));
  const unknown = [...new Set(rows.map((row) => row.platform).filter((platform) => platform && !known.includes(platform)))];
  const platforms = [...known, ...unknown];
  select.innerHTML = `<option value="all">全部${config.label}平台</option>${platforms.map((platform) => `<option value="${escapeHtml(platform)}">${escapeHtml(platform)}</option>`).join('')}`;
  select.value = platforms.includes(current) ? current : 'all';
}

function scopeMarker(type, scope) { return scopeRows(type, scope).length; }

function updateScopeTabs(type) {
  const config = configFor(type), panel = modulePanel(type);
  if (!panel) return;
  const selectedScope = state.modules[type].scope;
  panel.querySelectorAll('[data-scope]').forEach((button) => {
    const active = button.dataset.scope === selectedScope;
    button.classList.toggle('active', active); button.setAttribute('aria-selected', String(active)); button.tabIndex = active ? 0 : -1;
  });
  Object.entries(config.scopeCountIds).forEach(([scope, id]) => setText(id, scopeMarker(type, scope)));
}

function updateSnapshotSummary() {
  const total = state.rows.length;
  setText('navShortDrama', moduleRows('short-drama').length); setText('navManga', moduleRows('manga').length);
  setText('snapshotStatus', `快照 ${snapshotDate} · ${total} 条已合并`); setText('navSummary', `${total} 条统一样本 · 两个独立工作区`);
  Object.keys(MODULES).forEach((type) => updateScopeTabs(type));
}

function isModuleFocus(row, type = row.contentType) { return type === 'manga' ? Number(row.focusRank) > 0 && Number(row.focusRank) <= 8 : bool(row.sourceFocus); }

function stableIndexCompare(a, b) { return Number(a.__index || 0) - Number(b.__index || 0); }

// The default ranking is intentionally lexicographic so every signal is auditable:
// buy candidacy, editorial score, recency, publish date, then public heat.
function valueComparator(a, b) {
  return Number(bool(b.buyCandidate)) - Number(bool(a.buyCandidate))
    || editorScoreValue(b) - editorScoreValue(a)
    || Number(isFresh(b)) - Number(isFresh(a))
    || dateValue(b) - dateValue(a)
    || publicHeatValue(b) - publicHeatValue(a)
    || viewsValue(b) - viewsValue(a)
    || stableIndexCompare(a, b);
}

// Keep the old helper name as a small compatibility bridge for downstream scripts.
function strategyComparator(type, a, b) { return valueComparator(a, b); }

function sortRows(type, rows, sort) {
  const sorted = rows.slice(), normalized = normalizeSort(type, sort);
  if (normalized === 'value') sorted.sort(valueComparator);
  else if (normalized === 'views') sorted.sort((a, b) => publicHeatValue(b) - publicHeatValue(a) || dateValue(b) - dateValue(a) || stableIndexCompare(a, b));
  else if (normalized === 'latest') sorted.sort((a, b) => dateValue(b) - dateValue(a) || publicHeatValue(b) - publicHeatValue(a) || stableIndexCompare(a, b));
  else if (normalized === 'hook') sorted.sort((a, b) => editorScoreValue(b) - editorScoreValue(a) || dateValue(b) - dateValue(a) || publicHeatValue(b) - publicHeatValue(a) || stableIndexCompare(a, b));
  else if (normalized === 'shortest') sorted.sort((a, b) => (durationValue(a) || Number.MAX_SAFE_INTEGER) - (durationValue(b) || Number.MAX_SAFE_INTEGER) || dateValue(b) - dateValue(a) || stableIndexCompare(a, b));
  else if (normalized === 'longest') sorted.sort((a, b) => durationValue(b) - durationValue(a) || dateValue(b) - dateValue(a) || publicHeatValue(b) - publicHeatValue(a) || stableIndexCompare(a, b));
  else sorted.sort(valueComparator);
  return sorted;
}

function filteredRows(type) {
  const filters = readFilters(type), tag = state.modules[type].tag;
  return scopeRows(type).filter((row) => {
    if (filters.query && !searchText(row).includes(filters.query)) return false;
    if (filters.market !== 'all' && row.market !== filters.market) return false;
    if (filters.platform !== 'all' && row.platform !== filters.platform) return false;
    if (filters.audience !== 'all' && row.audience !== filters.audience) return false;
    if (filters.duration !== 'all' && durationBucket(row, type) !== filters.duration) return false;
    if (tag !== 'all' && !(row.tags || []).includes(tag)) return false;
    return true;
  });
}

function cardMarkup(row) {
  const title = escapeHtml(row.title), focus = isModuleFocus(row), fresh = isFresh(row);
  const tags = (row.tags || []).slice(0, 4).map((tag) => `<span class="card-tag">${escapeHtml(tag)}</span>`).join('');
  const external = row.sourceUrl ? `<a class="card-button external" href="${escapeHtml(row.sourceUrl)}" target="_blank" rel="noopener" title="打开来源" aria-label="打开来源">↗</a>` : '';
  return `<article class="sample-card${focus ? ' is-focus' : ''}" data-uid="${escapeHtml(row.uid)}" tabindex="0" aria-label="查看 ${title}">
    <div class="card-cover">${coverMarkup(row)}<div class="cover-badges"><span class="badge type-${escapeHtml(row.contentType)}">${typeLabel(row.contentType)}</span><span class="badge market-${escapeHtml(row.market)}">${marketLabel(row.market)}</span><span class="badge">${escapeHtml(row.platform)}</span></div>${focus ? '<span class="focus-ribbon">本期重点</span>' : ''}${fresh ? '<span class="focus-ribbon fresh-ribbon">近 7 日</span>' : ''}</div>
    <div class="card-body"><h3 class="card-title">${title}</h3>
      <div class="card-meta"><span>${escapeHtml(displayViews(row))}</span><span class="meta-sep">·</span><span>${escapeHtml(formatDate(row.publishedAt))} 发布</span><span class="meta-sep">·</span><span>${escapeHtml(formatDuration(row.durationSec, row.durationText))}</span></div>
      <div class="card-tags">${tags}<span class="card-tag">${audienceLabel(row.audience)}</span></div>
      <p class="analysis-line"><b>开场吸引点</b>${escapeHtml(row.first10 || row.hook || '待补充')}</p><p class="synopsis-line">${escapeHtml(row.synopsis || '剧情梗概待补充')}</p>
      <div class="card-footer"><div class="card-actions"><button class="card-button detail-button" type="button" data-uid="${escapeHtml(row.uid)}">查看详情</button>${external}</div><span class="card-score">吸引力评分 ${escapeHtml(row.score ?? '--')}</span></div>
    </div></article>`;
}

function renderCatalogGrid(type, rows) {
  const config = configFor(type), sort = readFilters(type).sort;
  const ordered = sortRows(type, rows, sort);
  return ordered.length ? ordered.map(cardMarkup).join('') : `<div class="state-panel section-empty"><strong>当前筛选下没有${config.label}样本</strong><p>调整搜索或筛选条件后再试。</p></div>`;
}

function bindCardMedia(grid) {
  if (!grid) return;
  grid.querySelectorAll('.card-cover img').forEach((image) => image.addEventListener('error', () => {
    const fallback = document.createElement('div'); fallback.className = 'cover-fallback'; fallback.textContent = `${image.dataset.fallbackTitle || '样本'}\n封面待补齐`; image.replaceWith(fallback);
  }, { once: true }));
}

function render(type = state.activeModule) {
  if (!state.catalog) return;
  const config = configFor(type), panel = modulePanel(type), grid = $(config.gridId);
  if (!panel || !grid) return;
  ensureDefaultSort(type); renderTagChips(type); updateScopeTabs(type); populatePlatforms(type);
  const base = scopeRows(type), rows = filteredRows(type);
  setText(config.countId, `${rows.length} 条结果${rows.length !== base.length ? ` · 共 ${base.length} 条` : ''}`);
  grid.classList.remove('platform-groups'); grid.classList.add('catalog-grid');
  grid.innerHTML = renderCatalogGrid(type, rows); bindCardMedia(grid);
}

function sourceLinkMarkup(row) {
  if (!row.sourceUrl) return '';
  return `<a href="${escapeHtml(row.sourceUrl)}" target="_blank" rel="noopener">打开来源 ↗</a>`;
}

function parsedUrl(value) {
  if (!value) return null;
  try { return new URL(String(value), document.baseURI); } catch (error) { return null; }
}

function hostMatches(hostname, domain) {
  const host = String(hostname || '').toLowerCase();
  return host === domain || host.endsWith(`.${domain}`);
}

function youtubeIdFromUrl(value) {
  const url = parsedUrl(value); if (!url) return '';
  const host = url.hostname.toLowerCase();
  const youtubeHost = hostMatches(host, 'youtube.com') || hostMatches(host, 'youtube-nocookie.com');
  let candidate = '';
  if (hostMatches(host, 'youtu.be')) candidate = url.pathname.split('/').filter(Boolean)[0] || '';
  else if (youtubeHost) {
    candidate = url.searchParams.get('v') || '';
    if (!candidate) {
      const match = url.pathname.match(/^\/(?:embed|shorts|live)\/([A-Za-z0-9_-]+)/);
      candidate = match ? match[1] : '';
    }
  }
  return /^[A-Za-z0-9_-]{6,20}$/.test(candidate) ? candidate : '';
}

function bilibiliIdFromUrl(value) {
  const url = parsedUrl(value); if (!url || !hostMatches(url.hostname, 'bilibili.com')) return '';
  const queryId = url.searchParams.get('bvid') || '';
  const pathMatch = url.pathname.match(/\/video\/(BV[A-Za-z0-9]{10})(?:\/|$)/i);
  const candidate = queryId || (pathMatch ? pathMatch[1] : '');
  return /^BV[A-Za-z0-9]{10}$/i.test(candidate) ? `BV${candidate.slice(2)}` : '';
}

// The official Bilibili iframe reads `t` (seconds) on navigation.  Keep URL
// construction in one place so a node click can recreate the same playable
// embed without depending on a cross-origin player API.
function bilibiliEmbedUrl(videoId, seconds = null, autoplay = false) {
  const params = new URLSearchParams({
    isOutside: 'true', bvid: videoId, page: '1', autoplay: autoplay ? '1' : '0',
    danmaku: '0', high_quality: '1',
  });
  if (seconds != null) params.set('t', String(Math.max(0, Math.floor(Number(seconds) || 0))));
  return `https://player.bilibili.com/player.html?${params.toString()}`;
}

function resolveProvider(row) {
  const candidates = [row?.embedUrl, row?.sourceUrl].filter(Boolean);
  for (const value of candidates) {
    const videoId = youtubeIdFromUrl(value);
    if (videoId) {
      const allowed = bool(row?.playable);
      return { provider: 'youtube', videoId, canEmbed: allowed, canSeek: allowed, reason: allowed ? '' : '该视频当前未开放站内嵌入播放。' };
    }
  }
  for (const value of candidates) {
    const videoId = bilibiliIdFromUrl(value);
    if (videoId) return { provider: 'bilibili', videoId, canEmbed: true, canSeek: true, reason: '' };
  }
  if (candidates.some((value) => {
    const url = parsedUrl(value); return url && hostMatches(url.hostname, 'iqiyi.com');
  })) return { provider: 'iqiyi', videoId: '', canEmbed: false, canSeek: false, reason: '当前记录没有爱奇艺官方播放器所需的具体视频参数。' };
  return { provider: 'external', videoId: '', canEmbed: false, canSeek: false, reason: '当前来源未提供可稳定嵌入的播放器。' };
}

function youtubeId(row) {
  const resolved = resolveProvider(row);
  return resolved.provider === 'youtube' ? resolved.videoId : '';
}

function loadYouTubeIframeApi() {
  if (window.YT && typeof window.YT.Player === 'function') return Promise.resolve(window.YT);
  if (youtubeApiPromise) return youtubeApiPromise;
  const pending = new Promise((resolve, reject) => {
    let settled = false;
    let timeoutId = 0;
    const settle = (handler, value) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeoutId);
      handler(value);
    };
    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previousReady === 'function') {
        try { previousReady(); } catch (error) { console.warn('previous YouTube API callback failed', error); }
      }
      if (window.YT && typeof window.YT.Player === 'function') settle(resolve, window.YT);
      else settle(reject, new Error('YouTube IFrame API did not initialize'));
    };
    let script = document.querySelector('script[data-youtube-iframe-api]');
    if (!script) {
      script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      script.dataset.youtubeIframeApi = 'true';
      document.head.appendChild(script);
    }
    script.addEventListener('error', () => settle(reject, new Error('YouTube IFrame API failed to load')), { once: true });
    timeoutId = window.setTimeout(() => settle(reject, new Error('YouTube IFrame API timed out')), 12000);
  });
  youtubeApiPromise = pending.catch((error) => {
    document.querySelector('script[data-youtube-iframe-api]')?.remove();
    youtubeApiPromise = null;
    throw error;
  });
  return youtubeApiPromise;
}

function playerSourceLink(row) {
  const source = parsedUrl(row?.sourceUrl);
  if (!source || !/^https?:$/.test(source.protocol)) return '';
  return `<a class="media-fallback-link" href="${escapeHtml(source.href)}" target="_blank" rel="noopener">打开原片 ↗</a>`;
}

function renderPlayerFallback(row, reason, media = $('detailMedia')) {
  if (!media) return;
  media.classList.remove('is-loading');
  media.dataset.playerProvider = 'unavailable';
  const cover = row.cover ? `<img src="${escapeHtml(row.cover)}" alt="${escapeHtml(row.title)} 封面">` : '';
  const note = row.playbackNotice || `${reason} 可通过原片入口检查来源页面。`;
  media.innerHTML = `<div class="media-placeholder">${cover}<p>${escapeHtml(note)}</p>${playerSourceLink(row)}</div>`;
  setText('playerStatus', note);
}

function disableTimelineSeeking(message) {
  const timeline = $('timeline'); if (!timeline) return;
  timeline.querySelectorAll('.moment').forEach((node) => node.classList.remove('is-seekable', 'selected'));
  timeline.querySelectorAll('.moment-jump').forEach((button) => {
    button.disabled = true;
    button.setAttribute('aria-disabled', 'true');
    const timeLabel = button.querySelector('.moment-time')?.textContent || formatDuration(button.dataset.seconds);
    button.setAttribute('aria-label', `${timeLabel} 节点预览`);
  });
  const count = timeline.querySelectorAll('.moment').length;
  if (count) setText('timelineHint', `${count} 个节点 · ${message}`);
}

function disableMomentPreview(preview, message) {
  const visual = preview?.closest('.moment-visual');
  const moment = visual?.closest('.moment');
  const button = moment?.querySelector('.moment-jump');
  if (!visual || !moment || !button) return;
  const fallback = document.createElement('span');
  fallback.className = 'moment-placeholder';
  fallback.setAttribute('role', 'img');
  fallback.innerHTML = `<b class="moment-placeholder-mark">?</b><span>${escapeHtml(message)}</span>`;
  visual.replaceChildren(fallback);
  moment.classList.remove('is-seekable', 'selected');
  button.disabled = true;
  button.setAttribute('aria-disabled', 'true');
  const timeLabel = button.querySelector('.moment-time')?.textContent || formatDuration(button.dataset.seconds);
  button.setAttribute('aria-label', `${timeLabel} 节点预览`);
  if (!state.activePlayer?.canSeek) return;
  const timeline = $('timeline');
  const count = timeline?.querySelectorAll('.moment').length || 0;
  const seekableCount = timeline?.querySelectorAll('.moment-jump:not(:disabled)').length || 0;
  if (count) setText('timelineHint', seekableCount ? `${count} 个节点 · ${seekableCount} 个已核验节点可跳转` : `${count} 个节点 · 关键帧当前不可用`);
}

function createYouTubePlayer(descriptor, row, media) {
  let player = null;
  let ready = false;
  let destroyed = false;
  let pendingSeconds = null;
  let readyTimeout = 0;
  let basicMode = false;
  let apiStopped = false;
  function basicEmbed(seconds = 0, autoplay = false) {
    if (destroyed) return;
    basicMode = true; apiStopped = true; ready = false;
    window.clearTimeout(readyTimeout);
    try { player?.destroy(); } catch (_) {}
    player = null;
    adapter.canSeek = true;
    const params = new URLSearchParams({ playsinline: '1', rel: '0', hl: 'zh-CN', start: String(Math.max(0, Math.floor(Number(seconds) || 0))), autoplay: autoplay ? '1' : '0' });
    media.classList.remove('is-loading');
    media.innerHTML = `<iframe src="https://www.youtube.com/embed/${encodeURIComponent(descriptor.videoId)}?${params}" title="${escapeHtml(row.title)} 官方基础播放器" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    setText('playerStatus', '已切换官方基础播放器，请点击画面中的播放按钮；节点跳转会重新载入视频。');
  }
  const adapter = {
    provider: 'youtube', rowUid: row.uid, canSeek: true,
    useBasic() { basicEmbed(pendingSeconds || 0); },
    mount() {
      media.dataset.playerProvider = 'youtube';
      media.classList.add('is-loading');
      media.innerHTML = '<div class="player-mount"></div><div class="player-loading" aria-hidden="true">正在连接播放器</div>';
      const mountNode = media.querySelector('.player-mount');
      readyTimeout = window.setTimeout(() => basicEmbed(pendingSeconds || 0), 30000);
      loadYouTubeIframeApi().then((api) => {
        if (destroyed || apiStopped || !mountNode?.isConnected) return;
        try {
          player = new api.Player(mountNode, {
            videoId: descriptor.videoId,
            playerVars: { autoplay: 0, playsinline: 1, rel: 0, hl: 'zh-CN', origin: location.origin },
            events: {
              onReady: () => {
                if (destroyed || apiStopped) return;
                ready = true;
                window.clearTimeout(readyTimeout);
                media.classList.remove('is-loading');
                media.querySelector('.player-loading')?.remove();
                setText('playerStatus', 'YouTube 播放器已就绪');
                if (pendingSeconds != null) {
                  const target = pendingSeconds; pendingSeconds = null; adapter.seek(target);
                }
              },
              onError: (event) => {
                if (destroyed || apiStopped) return;
                const messages = { 2: '视频地址无效。', 5: '当前浏览器无法播放该视频。', 100: '视频已下线或设为私密。', 101: '发布者禁止在站外播放。', 150: '发布者禁止在站外播放。', 153: '播放器未收到来源标识（错误153），请尝试官方基础播放器或打开原片。' };
                fail(messages[event.data] || 'YouTube 播放器无法加载该视频。', Number(event.data));
              },
            },
          });
          player.getIframe()?.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
        } catch (error) { basicEmbed(pendingSeconds || 0); }
      }).catch(() => { if (!apiStopped) basicEmbed(pendingSeconds || 0); });
    },
    seek(seconds) {
      if (destroyed || !adapter.canSeek) return false;
      const target = Math.max(0, Math.floor(Number(seconds) || 0));
      if (basicMode) { basicEmbed(target, true); return true; }
      if (!ready || !player || typeof player.seekTo !== 'function') {
        pendingSeconds = target;
        setText('playerStatus', `播放器就绪后跳转至 ${formatDuration(target)}`);
        return true;
      }
      try {
        player.seekTo(target, true);
        player.playVideo();
        setText('playerStatus', `已跳转至 ${formatDuration(target)}`);
        return true;
      } catch (error) {
        pendingSeconds = target;
        return true;
      }
    },
    destroy() {
      destroyed = true; ready = false; pendingSeconds = null;
      window.clearTimeout(readyTimeout);
      try { if (player && typeof player.destroy === 'function') player.destroy(); } catch (error) { console.warn('YouTube player cleanup failed', error); }
      player = null;
      media.classList.remove('is-loading');
    },
  };
  function fail(reason, code = 0) {
    if (destroyed || apiStopped) return;
    apiStopped = true;
    ready = false; adapter.canSeek = false;
    window.clearTimeout(readyTimeout);
    try { if (player && typeof player.destroy === 'function') player.destroy(); } catch (error) { console.warn('YouTube player cleanup failed', error); }
    player = null;
    const restricted = code === 101 || code === 150;
    renderPlayerFallback(row, restricted ? '来源拒绝站外播放；官方页可能还有地区或账号限制。' : reason, media);
    if (restricted) {
      const link = media.querySelector('.media-fallback-link');
      if (link) link.textContent = '查看 YouTube 官方原片 ↗';
      const basicButton = $('playerRecovery')?.querySelector('[data-basic-player]');
      if (basicButton) basicButton.hidden = true;
      setText('playerStatus', row.playbackNotice || '来源限制站外播放；重新连接不会解除限制，可查看上方官方原片入口。');
    }
    disableTimelineSeeking('播放器不可用，保留节点预览');
  }
  return adapter;
}

function createBilibiliPlayer(descriptor, row, media) {
  let iframe = null;
  let destroyed = false;
  let seekRevision = 0;
  let loadTimeout = 0;
  const adapter = {
    provider: 'bilibili', rowUid: row.uid, canSeek: true,
    mount() {
      const src = bilibiliEmbedUrl(descriptor.videoId);
      media.dataset.playerProvider = 'bilibili';
      media.classList.add('is-loading');
      media.innerHTML = `<iframe src="${escapeHtml(src)}" title="${escapeHtml(row.title)} B站播放器" loading="eager" scrolling="no" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe><div class="player-loading" aria-hidden="true">正在连接 B站播放器</div>`;
      iframe = media.querySelector('iframe');
      loadTimeout = window.setTimeout(() => fail('B站播放器响应超时，请通过原片入口查看。'), 15000);
      iframe?.addEventListener('load', () => {
        if (destroyed) return;
        window.clearTimeout(loadTimeout);
        media.classList.remove('is-loading');
        media.querySelector('.player-loading')?.remove();
        setText('playerStatus', 'B站播放器已载入；点击节点可跳转到对应时间。');
      }, { once: true });
      iframe?.addEventListener('error', () => fail('B站播放器加载失败。'), { once: true });
    },
    seek(seconds) {
      if (destroyed || !iframe) return false;
      const target = Math.max(0, Math.floor(Number(seconds) || 0));
      const revision = ++seekRevision;
      // Bilibili's cross-origin iframe has no supported parent-side seek API.
      // Re-navigation is the documented-compatible way to apply `t`; autoplay
      // keeps the player usable after a node click (subject to browser policy).
      iframe.addEventListener('load', () => {
        if (!destroyed && revision === seekRevision) setText('playerStatus', `已跳转至 ${target ? formatDuration(target) : '00:00'}`);
      }, { once: true });
      iframe.src = bilibiliEmbedUrl(descriptor.videoId, target, true);
      setText('playerStatus', `正在跳转至 ${target ? formatDuration(target) : '00:00'}`);
      return true;
    },
    destroy() {
      destroyed = true;
      window.clearTimeout(loadTimeout);
      if (iframe) iframe.src = 'about:blank';
      iframe = null;
      media.classList.remove('is-loading');
    },
  };
  function fail(reason) {
    if (destroyed) return;
    adapter.canSeek = false;
    window.clearTimeout(loadTimeout);
    iframe = null;
    renderPlayerFallback(row, reason, media);
    disableTimelineSeeking('播放器不可用，保留节点预览');
  }
  return adapter;
}

function createUnavailablePlayer(descriptor, row, media) {
  return {
    provider: descriptor.provider, rowUid: row.uid, canSeek: false,
    mount() { renderPlayerFallback(row, descriptor.reason, media); },
    seek() { return false; },
    destroy() {},
  };
}

function createPlayerAdapter(row, media) {
  const descriptor = resolveProvider(row);
  if (descriptor.provider === 'youtube' && descriptor.canEmbed) return createYouTubePlayer(descriptor, row, media);
  if (descriptor.provider === 'bilibili' && descriptor.canEmbed) return createBilibiliPlayer(descriptor, row, media);
  return createUnavailablePlayer(descriptor, row, media);
}

function destroyActivePlayer() {
  if (!state.activePlayer) return;
  try { state.activePlayer.destroy(); } catch (error) { console.warn('player cleanup failed', error); }
  state.activePlayer = null;
}

function renderMedia(row) {
  const media = $('detailMedia'); if (!media) return;
  destroyActivePlayer();
  media.innerHTML = '';
  state.activePlayer = createPlayerAdapter(row, media);
  state.activePlayer.mount();
  let controls = $('playerRecovery');
  if (!controls) {
    controls = document.createElement('div'); controls.id = 'playerRecovery'; controls.className = 'detail-actions';
    media.insertAdjacentElement('afterend', controls);
  }
  const provider = resolveProvider(row);
  controls.innerHTML = provider.canEmbed ? '<button type="button" class="card-button" data-reconnect>重新连接播放器</button>' + (provider.provider === 'youtube' ? '<button type="button" class="card-button" data-basic-player>切换官方基础播放器</button>' : '') : '';
  controls.querySelector('[data-reconnect]')?.addEventListener('click', () => openDetail(row.uid));
  controls.querySelector('[data-basic-player]')?.addEventListener('click', () => {
    openDetail(row.uid);
    state.activePlayer?.useBasic?.();
  });
}

function storyboardFrame(spec, seconds) {
  const count = Number(spec.count) || 0, cols = Number(spec.cols) || 1, rows = Number(spec.rows) || 1, ms = Number(spec.ms) || 10000;
  const frameIndex = Math.min(Math.max(0, Math.floor(seconds * 1000 / ms)), Math.max(0, count - 1));
  const perSheet = cols * rows, sheet = Math.floor(frameIndex / perSheet), cell = frameIndex % perSheet;
  return { src: String(spec.url || '').replace('$M', String(sheet)), sx: (cell % cols) * Number(spec.w || 0), sy: Math.floor(cell / cols) * Number(spec.h || 0), sw: Number(spec.w || 0), sh: Number(spec.h || 0) };
}

function momentMarkup(row, moment) {
  const seconds = Number(moment.seconds) || 0;
  const frameStatus = moment.frameStatus || 'unavailable';
  // A node is actionable only when its timestamp and visual evidence were verified.
  const seekable = canSeekMoments(row) && momentEvidenceReady(row, moment);
  const framePath = moment.frame || (row.frames && (row.frames[String(moment.seconds)] || row.frames[String(Math.floor(seconds))]));
  const spec = row.storyboard;
  const timeLabel = moment.time || formatDuration(seconds);
  let visual = '';
  if (frameStatus === 'available' && framePath) {
    visual = `<img src="${escapeHtml(framePath)}" alt="${escapeHtml(row.title)} ${escapeHtml(timeLabel)} 画面">`;
  } else if (frameStatus === 'storyboard' && spec && spec.url) {
    const frame = storyboardFrame(spec, seconds);
    visual = `<canvas width="320" height="180" data-storyboard-src="${escapeHtml(frame.src)}" data-sx="${frame.sx}" data-sy="${frame.sy}" data-sw="${frame.sw}" data-sh="${frame.sh}" aria-label="${escapeHtml(row.title)} ${escapeHtml(timeLabel)} 画面"></canvas>`;
  } else {
    visual = `<span class="moment-placeholder" role="img" aria-label="${escapeHtml(row.title)} ${escapeHtml(timeLabel)} 关键帧待人工核验"><b class="moment-placeholder-mark">?</b><span>关键帧待人工核验</span></span>`;
  }
  const classes = `moment${seekable ? ' is-seekable' : ''}`;
  const buttonState = seekable ? '' : ' disabled aria-disabled="true"';
  const actionLabel = seekable ? `跳转到 ${timeLabel}` : `${timeLabel} 节点预览`;
  return `<article class="${classes}" data-seconds="${seconds}"><button class="moment-jump" type="button" data-seconds="${seconds}" aria-label="${escapeHtml(actionLabel)}"${buttonState}><span class="moment-time">${escapeHtml(timeLabel)}</span><span class="moment-visual">${visual}</span></button><p class="moment-copy"><span class="moment-type">${escapeHtml(moment.type || '剧情节点')}</span>${escapeHtml(moment.description || '视觉候选，需打开原片核验。')}</p></article>`;
}

function paintStoryboards() {
  document.querySelectorAll('[data-storyboard-src]').forEach((canvas) => {
    const src = canvas.dataset.storyboardSrc;
    if (!state.storyboardCache.has(src)) state.storyboardCache.set(src, new Promise((resolve, reject) => {
      const image = new Image(); image.onload = () => resolve(image); image.onerror = reject; image.src = src;
    }));
    state.storyboardCache.get(src).then((image) => {
      const context = canvas.getContext('2d'); if (!context) return;
      const sx = Number(canvas.dataset.sx), sy = Number(canvas.dataset.sy), sw = Number(canvas.dataset.sw), sh = Number(canvas.dataset.sh);
      if (!sw || !sh) return;
      const scale = Math.max(canvas.width / sw, canvas.height / sh), width = sw * scale, height = sh * scale;
      context.filter = 'blur(13px) brightness(.58)'; context.drawImage(image, sx, sy, sw, sh, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
      const fit = Math.min(canvas.width / sw, canvas.height / sh); context.filter = 'none'; context.drawImage(image, sx, sy, sw, sh, (canvas.width - sw * fit) / 2, (canvas.height - sh * fit) / 2, sw * fit, sh * fit);
    }).catch(() => disableMomentPreview(canvas, '分镜地址已过期'));
  });
}

function canonicalHash(type) { return configFor(type).tabHash; }
function replaceUrl(url) { history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`); }

function moduleFromHash(hash = location.hash) {
  const value = String(hash || '').toLowerCase();
  if (value === '#manga' || value === '#mangapanel' || value === '#mangasection') return 'manga';
  if (value === '#short-drama' || value === '#shortdramapanel' || value === '#shortdramasection') return 'short-drama';
  return '';
}

function activateModule(type, { updateHash = true, focus = false } = {}) {
  const canonical = type === 'manga' ? 'manga' : 'short-drama';
  state.activeModule = canonical;
  document.querySelectorAll('[data-module-tab]').forEach((button) => {
    const active = button.dataset.moduleTab === canonical;
    button.classList.toggle('active', active); button.setAttribute('aria-selected', String(active));
    if (active) button.removeAttribute('tabindex'); else button.tabIndex = -1;
  });
  Object.keys(MODULES).forEach((key) => {
    const panel = modulePanel(key); if (!panel) return;
    const active = key === canonical; panel.hidden = !active; panel.setAttribute('aria-hidden', String(!active));
  });
  if (updateHash) { const url = new URL(location.href); url.hash = canonicalHash(canonical); replaceUrl(url); }
  render(canonical);
  if (focus) document.querySelector(`[data-module-tab="${canonical}"]`)?.focus();
}

function openDetail(uid) {
  const row = state.rows.find((item) => item.uid === uid); if (!row) return;
  const rowModule = row.contentType === 'manga' ? 'manga' : 'short-drama';
  if (state.activeModule !== rowModule) activateModule(rowModule);
  state.selectedUid = uid;
  const url = new URL(location.href); url.searchParams.set('item', uid); url.hash = canonicalHash(rowModule); replaceUrl(url);
  setText('detailTitle', row.title);
  setText('detailOriginalTitle', row.sourceTitle || row.originalTitle || row.title);
  const originalDisclosure = $('originalTitleDisclosure');
  if (originalDisclosure) { originalDisclosure.open = false; originalDisclosure.hidden = row.sourceTitle === row.title; }
  setText('detailSubtitle', `${typeLabel(row.contentType)} · ${marketLabel(row.market)} · ${row.platform} · ${audienceLabel(row.audience)}`);
  setText('detailEyebrow', `${row.contentType === 'manga' ? '漫剧' : '短剧'} / ${row.deepDive ? '深度跟踪' : '样本详情'}`);
  renderMedia(row);
  const detailMeta = $('detailMeta');
  if (detailMeta) detailMeta.innerHTML = `<span>${escapeHtml(displayViews(row))}</span><span>·</span><span>${escapeHtml(formatDate(row.publishedAt))} 发布</span><span>·</span><span>${escapeHtml(formatDuration(row.durationSec, row.durationText))}</span><span>·</span><span>吸引力评分 ${escapeHtml(row.score ?? '--')}</span>`;
  const detailActions = $('detailActions');
  if (detailActions) detailActions.innerHTML = sourceLinkMarkup(row) + (row.buyCandidate ? '<span class="status-label">买量候选</span>' : '') + (isModuleFocus(row) ? '<span class="status-label">本期重点</span>' : '');
  setText('detailFirst10', row.first10 || row.hook || '待补充'); setText('detailSynopsis', row.synopsis || '剧情梗概待补充'); setText('detailRise', row.rise || '冲突升级待补充'); setText('detailPromise', row.promise || '追看悬念待补充'); setText('detailScope', `${row.analysisScope || '编辑分析'} · 来源快照 ${row.snapshot}`);
  const moments = Array.isArray(row.moments) ? row.moments : [], timeline = $('timeline');
  const seekableCount = moments.filter((moment) => canSeekMoments(row) && momentEvidenceReady(row, moment)).length;
  setText('timelineTitle', '剧情 / 冲突节点');
  setText('timelineHint', moments.length
    ? seekableCount
      ? `${moments.length} 个节点 · ${seekableCount} 个已核验节点可跳转`
      : `${moments.length} 个节点 · 当前来源不可跳转`
    : '当前来源未提供字幕节点');
  if (timeline) {
    timeline.innerHTML = moments.length ? moments.map((moment) => momentMarkup(row, moment)).join('') : '<div class="timeline-empty">当前来源保留公开字段与来源链接，未提供可核验的字幕节点。</div>';
    timeline.querySelectorAll('.moment-visual img').forEach((image) => image.addEventListener('error', () => disableMomentPreview(image, '关键帧读取失败'), { once: true }));
    if (seekableCount) timeline.querySelectorAll('.moment-jump:not(:disabled)').forEach((button) => {
      button.addEventListener('click', () => seekPlayer(Number(button.dataset.seconds), button.closest('.moment')));
    });
  }
  if ($('detailModal')) $('detailModal').hidden = false;
  document.body.style.overflow = 'hidden'; paintStoryboards();
}

function seekPlayer(seconds, selectedNode = null) {
  const target = Math.max(0, Math.floor(Number(seconds) || 0));
  if (!state.activePlayer?.canSeek || state.activePlayer.seek(target) === false) return;
  document.querySelectorAll('#timeline .moment').forEach((node) => node.classList.remove('selected'));
  const current = selectedNode || [...document.querySelectorAll('#timeline .moment')].find((node) => Number(node.dataset.seconds) === target);
  if (current) current.classList.add('selected');
}

function closeDetail() {
  destroyActivePlayer();
  if ($('detailModal')) $('detailModal').hidden = true; if ($('detailMedia')) $('detailMedia').innerHTML = '';
  setText('playerStatus', '');
  document.body.style.overflow = ''; state.selectedUid = '';
  const url = new URL(location.href); url.searchParams.delete('item'); replaceUrl(url);
}

function resetModule(type = state.activeModule) {
  const config = configFor(type);
  Object.entries(config.controls).forEach(([key, id]) => { const element = $(id); if (element) element.value = key === 'search' ? '' : key === 'sort' ? config.defaultSort : 'all'; });
  state.modules[type] = { scope: config.defaultScope, tag: 'all' }; updateScopeTabs(type); render(type);
}

function bindModulePanel(type) {
  const config = configFor(type), panel = modulePanel(type); if (!panel || panel.dataset.bound === 'true') return;
  panel.dataset.bound = 'true';
  panel.querySelectorAll('[data-scope]').forEach((button) => button.addEventListener('click', () => {
    const scope = button.dataset.scope; if (!Object.prototype.hasOwnProperty.call(config.scopeCountIds, scope)) return;
    state.modules[type].scope = scope; updateScopeTabs(type); render(type);
  }));
  panel.addEventListener('click', (event) => {
    const tagButton = event.target.closest('.tag-chip'); if (!tagButton || !panel.contains(tagButton)) return;
    const belongs = tagButton.dataset.moduleTag === type || (!tagButton.dataset.moduleTag && tagButton.closest(`#${config.tagId}`)); if (!belongs) return;
    state.modules[type].tag = tagButton.dataset.tag || 'all'; render(type);
  });
  Object.entries(config.controls).forEach(([key, id]) => { const element = $(id); if (element) element.addEventListener(key === 'search' ? 'input' : 'change', () => render(type)); });
  const grid = $(config.gridId); if (!grid) return;
  grid.addEventListener('click', (event) => {
    const detail = event.target.closest('.detail-button');
    if (detail) { event.stopPropagation(); openDetail(detail.dataset.uid); return; }
    if (event.target.closest('a, button')) return;
    const card = event.target.closest('.sample-card'); if (card) openDetail(card.dataset.uid);
  });
  grid.addEventListener('keydown', (event) => { if (event.key !== 'Enter' && event.key !== ' ') return; const card = event.target.closest('.sample-card'); if (!card || event.target !== card) return; event.preventDefault(); openDetail(card.dataset.uid); });
}

function bindEvents() {
  document.querySelectorAll('[data-module-tab]').forEach((button) => button.addEventListener('click', () => activateModule(button.dataset.moduleTab)));
  Object.keys(MODULES).forEach(bindModulePanel);
  $('resetButton')?.addEventListener('click', () => resetModule(state.activeModule));
  document.querySelectorAll('[data-reset-module]').forEach((button) => button.addEventListener('click', () => resetModule(button.dataset.resetModule)));
  $('closeModal')?.addEventListener('click', closeDetail);
  $('detailModal')?.addEventListener('click', (event) => { if (event.target === $('detailModal')) closeDetail(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && $('detailModal') && !$('detailModal').hidden) closeDetail(); });
  window.addEventListener('hashchange', () => { const type = moduleFromHash(); if (type && type !== state.activeModule) activateModule(type, { updateHash: false }); });
}

async function init() {
  bindEvents();
  try {
    const response = await fetch('./data/catalog.json', { cache: 'no-store' }); if (!response.ok) throw new Error(`HTTP ${response.status}`);
    state.catalog = await response.json(); if (state.catalog.snapshotDate) snapshotDate = String(state.catalog.snapshotDate);
    state.rows = Array.isArray(state.catalog.videos) ? state.catalog.videos.map(localizeRow) : []; state.rows.forEach((row, index) => { row.__index = index; });
    if (!state.rows.length) throw new Error('empty catalog');
    updateSnapshotSummary(); const requestedModule = moduleFromHash(); activateModule(requestedModule || 'short-drama', { updateHash: Boolean(requestedModule) });
    const item = new URLSearchParams(location.search).get('item'); if (item && state.rows.some((row) => row.uid === item)) openDetail(item);
  } catch (error) {
    console.error('catalog load failed', error); const errorState = $('errorState'); if (errorState) errorState.hidden = false; setText('snapshotStatus', '样本快照读取失败');
  }
}

init();
