/* New visits begin at home; navigation inside the current visit stays unchanged. */
(function () {
  'use strict';
  var radar = /(?:^|\/)tools\/creative-radar(?:\/|$)/.test(location.pathname);
  var homeHash = radar ? '#short-drama' : '#home';
  var entry = window.__portfolioEntryHome = {page: radar ? 'creative-radar' : 'portfolio', homeHash: homeHash, interrupted: false};
  var reloading = false;
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  function canonicalize() {
    var url = new URL(location.href);
    url.hash = homeHash;
    if (radar) url.searchParams.delete('item');
    history.replaceState(history.state, '', url.pathname + url.search + url.hash);
  }

  function align() {
    if (entry.interrupted || location.hash !== homeHash) return;
    var root = document.documentElement;
    var previous = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    try { window.scrollTo({top: 0, left: 0, behavior: 'instant'}); }
    catch (error) { window.scrollTo(0, 0); }
    root.style.scrollBehavior = previous;
  }

  function settle() {
    align();
    requestAnimationFrame(align);
  }

  function interrupt(event) {
    if (event.isTrusted) entry.interrupted = true;
  }
  ['wheel', 'pointerdown', 'touchstart', 'keydown', 'click'].forEach(function (type) {
    window.addEventListener(type, interrupt, {capture: true, passive: true});
  });

  canonicalize();
  settle();
  document.addEventListener('DOMContentLoaded', function () {
    settle();
    if (document.fonts) document.fonts.ready.then(align);
  }, {once: true});
  window.addEventListener('load', settle, {once: true});
  window.addEventListener('pageshow', function (event) {
    if (event.persisted) {
      if (reloading) return;
      reloading = true;
      // Cached documents can retain open dialogs, players and pending chapter transitions.
      // A single normal reload lets the existing app create a clean home state.
      canonicalize();
      location.reload();
    } else settle();
  });
}());
