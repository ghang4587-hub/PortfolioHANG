// 中文展示层：按视频 ID 维护，不改动采集快照、播放器参数和证据字段。
const CHINESE_TITLES = {
  'VIk3M40d-sE': '被迫替嫁冷酷黑帮首领',
  'CiV32O95JUE': '为爱隐退的黑帮教父，为女儿重出江湖复仇',
  'Y8Q28_jQvig': '本是替嫁新娘，他却不肯让我离开',
  'fOSzB-9uNm0': '隐瞒的孩子、致命的谎言与一生的悔恨',
  'gxQh71RYSSM': '复仇引燃爱恨纠葛（完整版·上）',
  'wMtyXWrQ-rY': '复仇引燃爱恨纠葛（完整版·下）',
  '5U09HqdBEIA': '《盲心千金》盲女千金与贴身保镖（合集·下）',
  'V-zysxG7Jdg': '《盲心千金》盲女千金与贴身保镖（合集·上）',
  'CjiR0He0fSg': '为学费嫁给陌生人，他竟成了我的新教授',
  'fuM-slY--64': '嫁给被前任轻视的男人，赛车高手找到真爱',
  'As2Zh26ZzYQ': '遭背叛后重生重返蓝天，她起飞之日他追悔莫及',
  'jx-Dz0sPOsY': '被遗弃的小精灵成了福星，萌娃竟能与魔兽沟通',
  '_2QV0Y8Csm4': '《我在镇抚司探案的那些年》现代侦探穿越古代，联手长公主破奇案',
  '1CWjFFHyohk': '从供血的人类仆从，到真正力量觉醒',
  'PUhrYaWypO4': '替嫁后才发现，平凡丈夫竟是吸血鬼始祖',
  'SVFxqoe-3Vg': '父亲的兄弟，竟是我的秘密恋人',
  'w_U9Cd6NoB8': '爱她三年只是替她打掩护，离开后她追悔莫及',
  '2c0LwQqpmUI': '《晋末长剑》穿成受欺军户，凭箭术在乱世杀出一条生路',
  'UXkydz7nlGY': '爱她三年只是替她打掩护，离开后她追悔莫及',
  'KqxdCWtzQY8': '被嘲无用的治疗者，王座上的身份让众人震惊',
  'tSQqcZ2qxEo': '父亲的情人羞辱错了人，黑帮千金不需要新妈妈',
  'h7CDf24MQkY': '失忆后仇人成了丈夫，孩子唤醒被遗忘的家庭',
  'ecopH193lDM': '嫁给被前任轻视的男人，赛车高手找到真爱',
  'EDP3sLP8W0o': '被嫌弃的软饭丈夫，竟是拥有强大力量的神灵',
  '2cBsv0BCNNA': '传奇龙骑士隐身醉汉，重出江湖伸张正义',
  '26jX-89MUf8': '《我家娘子不对劲4》殿前斗诗、浴血护妻，挚爱却被仙宗掳走',
  'DkbopE4aMqk': '失去十年记忆后，才发现自己嫁给了死对头',
  '-K64M9WIefs': '强迫自己喜欢男人，却为女队长动了心',
  'vIk_340qICQ': '《娘子，别这样》带满级物资穿成落魄庶子，卷入皇权纷争',
  '1QJvGAUMYGA': '她轻视的丈夫，竟是为她缔造一切的幕后强者',
  'Bup3USA1pT4': '请他教我追别人，恋爱教学却逐渐失控',
  'AcDxCKlZtSY': '用心头血救他，他却把我送给恶毒继姐',
  '3Q86GqmSUKw': '《大佬入赘极致重婚》含恨重生逆天改命，联手神秘男人破局',
  'tVcFxZY5fVk': '《箱子里的大明》造景箱连接真实明末，随手救人改写王朝命运',
  'HWLJXOvnrDc': '《千岁萌宝突然驾到》皇后穿越现代，萌宝助攻一家重聚',
  'FhRMIFvoDy0': '《万世归一》家族遭陷害破产，隐忍多年只为复仇',
  'J1YTodTmBIU': '《你是我的天赐良缘》总裁爱上带娃秘书，她竟是被自己抛弃的妻子',
  '3PJH3o_aQF8': '《九龙城寨之女王归来》女将军寻夫征战，意外登基成为女帝',
  'H9NSpytSkFY': '《武极天尊》武学奇才遭暗算，重修绝世武功复仇',
  'oK0CF1q-eXc': '《盛婚蜜爱》撞破男友与闺蜜背叛，救她的总裁竟是青梅竹马',
  'aL-Cm1V4uj8': '《我才不要恋爱呢》卷入恋爱游戏，与四位型男见招拆招',
  'qqJUcG1fLv8': '《卿卿三思》王妃逆天改命，与夫君再续良缘',
  'PCmB1NeR1NI': '《心动的他》先婚后爱，总裁恋上替嫁女',
  'qHqUzd7yCDo': '首辅靠读心术追妻（完整版）',
  'PVQQ8nXhkQg': '一纸婚约锁住爱情（完整版）',
  'cBgg6JfSx0o': '恶魔少爷再度爱上元气少女（完整版）',
  'awWDtFja2t4': '神医在异世界逆袭（完整版）',
  '72miE0_G8Ms': '夫妻博弈，谁会成为最后赢家（完整版）',
};

function chineseText(value) {
  if (typeof value !== 'string') return value;
  return value.replace(/\s*\((?:Lily Watson|Victoria|Ava Wright)\)/g, '')
    .replace(/Storyboard/gi, '分镜预览').replace(/videoshot/gi, '视频截图')
    .replace(/\bNPC\b/g, '非玩家角色').replace(/\bSSS\s*级/g, '最高级')
    .replace(/\bHook\b/gi, '开场吸引力');
}

function localizeRow(source) {
  const row = { ...source, sourceTitle: source.title };
  if (source.id === 'VIk3M40d-sE') row.playbackNotice = '2026-09-15 实测：官方观看页提示上传用户禁止在当前国家/地区播放。该限制无法通过站内重新连接解除。';
  for (const key of ['title', 'hook', 'first10', 'synopsis', 'rise', 'promise', 'analysisScope', 'viewNote']) {
    row[key] = chineseText(row[key]);
  }
  if (CHINESE_TITLES[row.id]) {
    row.title = CHINESE_TITLES[row.id];
    // 标题复述型钩子只清理语言；不把标题信息冒充已核验镜头。
    if (source.hook === source.title || /ENG SUB|Top Gear/.test(source.hook || '')) row.hook = `标题看点：${row.title}`;
  }
  if (['VIk3M40d-sE', 'Y8Q28_jQvig'].includes(row.id)) {
    row.hook = '妹妹逃婚后，护士莉莉被迫替嫁传闻冷酷的黑帮首领。';
    row.synopsis = '25岁的护士莉莉参加同父异母妹妹维多利亚的婚礼。妹妹临阵逃婚，莉莉被迫代替她嫁给黑帮首领多米尼克·卡斯特拉诺。';
  }
  if (row.id === 'CjiR0He0fSg') {
    row.hook = '为学费结婚，一年后才发现新教授就是自己的丈夫。';
    row.synopsis = '大学生艾娃在21岁生日醉酒后，与一位愿意支付学费的神秘富豪结婚。一年后，她发现新来的教授正是自己的丈夫，两人的关系因此变得复杂。';
  }
  if (row.id === 'CiV32O95JUE') {
    row.hook = '为亡妻隐退的黑帮教父，在女儿遭遇伤害后重出江湖。';
    row.synopsis = '帕特里克曾是致命刺客和黑帮教父，为亡妻退出江湖。女儿被男友及其富家朋友逼迫跳楼后，他重新出手复仇。';
  }
  if (['fuM-slY--64', 'ecopH193lDM'].includes(row.id)) {
    row.hook = '为逃离包办婚姻嫁给机械师，婚后发现对方隐藏着赛车高手与豪门继承人的身份。';
    row.synopsis = '她为逃离包办婚姻，冲动嫁给了一名被前任抛弃的机械师。婚后才发现，他不仅是赛车高手，还是豪门继承人。当前任求复合时，他选择留在妻子身边。';
  }
  row.moments = (source.moments || []).map(moment => {
    const analysis = NODE_ANALYSIS_ZH[source.id]?.[String(moment.seconds)];
    const matches = analysis && analysis.sourceDescription === moment.description;
    return {
      ...moment,
      type: matches ? analysis.type : chineseText(moment.type),
      description: matches ? analysis.description : chineseText(moment.description),
      analysisStatus: matches ? analysis.status : 'source',
    };
  });
  row.tags = (source.tags || []).map(chineseText);
  return row;
}
