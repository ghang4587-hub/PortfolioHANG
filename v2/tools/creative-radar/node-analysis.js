// 中文剧情节点简述。按视频 ID、秒数和原文匹配，避免数据更新后套用旧分析。
const NODE_ANALYSIS_ZH = {
  "DkbopE4aMqk": {
    "589": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "家人不相信女子失忆，怀疑她只是装病离婚，理由是她已买好去找亨特的机票。",
      "type": "失忆质疑",
      "sourceDescription": "Yeah, she said she doesn't remember any of the last few years. She's lying. She's just trying to get a divorce. She even bought a ticket to be with Hunter. She's faking it."
    },
    "1073": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "旁人误解丈夫的来意，丈夫澄清是想替雷吉娜检查精神状态，怀疑她行为异常。",
      "type": "误会冲突",
      "sourceDescription": "You finally can't handle the blue paws after being ignored by your wife for years. Your secret's safe with me. I got you, man. I meant it for Regina. Her brain needs to be checked. I think she's bipolar."
    },
    "726": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "女子得知自己曾为参加亨特生日，把女儿独留家中，导致孩子在雷雨夜受到惊吓。",
      "type": "亲情愧疚",
      "sourceDescription": "What's with Isla? You don't know? I told you that I lost my memories a few years ago. You left Isla at home for Hunter's birthday. She was traumatized by the thunderstorm all"
    },
    "507": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "女子得知自己婚后仍把一切给了亨特，甚至拖垮家族公司，情绪陷入崩溃。",
      "type": "往事冲击",
      "sourceDescription": "What are you trying to do? Where's the knife? I should just kill myself right now. So, I married Lionus, had a child, gave everything to Hunter, and even ruined the family company."
    },
    "326": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "丈夫质问她为何先主动求婚、如今又一心离婚，女子无法理解自己过去的选择。",
      "type": "婚姻疑云",
      "sourceDescription": "You were the one who said you wanted to marry me last time, and now you're doing everything you can to get a divorce. What the I was the one who said I wanted to marry you."
    },
    "1253": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "女子直接询问医生，是否在建议她与丈夫离婚。",
      "type": "离婚抉择",
      "sourceDescription": "Are you saying that I should divorce my husband, Dr. Gibson?"
    },
    "247": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "女子惊讶地发现，自己不仅嫁给了昔日对头，还与他生了女儿。",
      "type": "失忆反转",
      "sourceDescription": "What is it this time? Me? I didn't just marry Lionus. I even had a daughter with him. Wow. I didn't know you were doing so well now."
    },
    "83": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "男子提议结婚，女子却激烈拒绝，声称即使世上只剩他也不会嫁。",
      "type": "冤家求婚",
      "sourceDescription": "who's going to DATE ME EVER AGAIN? DON'T DATE THEM. Marry me. Monty, I WILL NEVER MARRY YOUR ASS. Even if you WERE THE LAST MAN ON PLANET EARTH."
    },
    "962": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "男子用当场亲吻来试探女子，追问她丈夫会如何反应，女子斥责他失控。",
      "type": "越界试探",
      "sourceDescription": "me. What will your husband do if I kiss you right now? You're out of your mind. You always never mean what you say."
    },
    "863": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "女儿询问父母是否又吵架，母亲嘴上否认，却仍把丈夫称作死对头。",
      "type": "家庭试探",
      "sourceDescription": "Who said I'm mentally disturbed? Daddy. Mommy, did you fight again? Of course not, Isla. We're just sworn enemies."
    }
  },
  "tSQqcZ2qxEo": {
    "558": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "女子断言对方无法成为家族女主人，对方亲属恼羞成怒，命人将她按住。",
      "type": "权势压迫",
      "sourceDescription": "you'll never become Donna Carboni. And who the hell are you to decide that? Don will marry my sister whenever he feels like. I've had enough of this Hold her still."
    },
    "173": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "男子交代去珠宝店取礼物送给洛蕾塔，对方欣然答应。",
      "type": "赠礼安排",
      "sourceDescription": "stored at Carro Jewelers. Pick it up and give it to Loretta. I'm sure she'll love it. You're the best, honey. I'll go get it right now."
    },
    "64": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "父亲表示，女儿不祝福就不会再婚；他曾没能保护妻子，绝不再让女儿受到伤害。",
      "type": "护女底线",
      "sourceDescription": "gives us her blessing, I'm not marrying you. I failed to protect her mother. I'm not going to fail Loretta, too. I won't let anyone hurt her. Damn it. I've spent 5 years taking care"
    },
    "363": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "女子斥责对方品行恶劣，断言保罗不会娶她；另一人赶到现场询问伤者情况。",
      "type": "恶行揭穿",
      "sourceDescription": "I had no idea you were this vile. Paolo Carboni would never marry a woman like you. Marie, are you hurt? I came as soon as I"
    },
    "195": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "女子舍不得把珠宝送出去，心想嫁给保罗后，财产迟早都会归自己。",
      "type": "贪欲暴露",
      "sourceDescription": "It's gorgeous. What a waste to just give it away. Whatever. After I marry Paulo, it'll all go to me anyway. Mommy, let's shop here. I want"
    },
    "468": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "对方认定黑帮首领必会派人保护女儿，因此不相信眼前女子的真实身份，反指她冒名顶替。",
      "type": "身份误判",
      "sourceDescription": "No, Paul treats her daughter like a treasure. There's no way he'd let her go anywhere without protection. This woman can't possibly be her. First my gemstone, and now you tried to pull a fake identity on me?"
    },
    "792": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "旁人担心再打下去会出人命，急忙劝阻，却被施暴者喝退。",
      "type": "生死危机",
      "sourceDescription": "Mr. Giovanni, please stop. This has gone way too far. She is going to get killed, for real. You cheap vendor, don't tell me what to do. Piss off. You heard her. Get out of our way or"
    },
    "619": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "女子担心闹事影响自己嫁给保罗，发出死亡威胁；对方反击说她再也无法接近保罗。",
      "type": "婚约威胁",
      "sourceDescription": "To Carros now. If this costs me my chance to marry Paolo, you will pay with your life. Marry Paolo? After today, you won't get anywhere near"
    },
    "740": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "受害者扬言追究所有人，对方却仗着即将攀上权贵，声称杀人也无人敢出声。",
      "type": "暴力升级",
      "sourceDescription": "I will DESTROY EVERY LAST ONE of you. Destroy us? My sister is about to be Donna Carboni. We can put you in dirt like crushing an ant, and no one would speak a word."
    },
    "283": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "小女孩被指撞落宝石，母亲相信孩子的否认，对方却叫人动手抓人。",
      "type": "栽赃冲突",
      "sourceDescription": "That lady, she dropped her gem. Mommy, I swear I didn't bump into her. I know, sweetheart. Don't cry. I believe you. What are you idiots waiting for? Grab the"
    }
  },
  "LiKNqywx_U0": {
    "2516": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "主角发现稀有的四级机甲图纸，判断融合后能够强化现有装备与设施。",
      "type": "升级资源",
      "sourceDescription": "这是一个四级机甲图表中心。超级稀有的物品。一旦融合，段会给我升级，加上我的雷达和实验室"
    },
    "868": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "主角打开系统面板查看获得的天赋，对结果感到意外。",
      "type": "能力探索",
      "sourceDescription": "牺牲。 我打开面板，看看这个蹩脚的系统给了我什么天赋。我勒个去？"
    },
    "22": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "主角得知数值降到零就会死亡，过低还会导致失控，努力平复自己的情绪。",
      "type": "生存规则",
      "sourceDescription": "击中零你就死了。每个人都从 100 开始。最低 50。你会发疯的。我 吸了一口气，稳定了我的情绪"
    },
    "2084": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "主角与同伴背靠背，在巨兽身体的掩护下与敌人持续交战。",
      "type": "协同作战",
      "sourceDescription": "雨，混乱。 Trua 和我背靠背，在 Daong 庞大的身体的保护下，与那些人进行着残酷的拉锯战。"
    },
    "314": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "面对数值下降与死亡规则，主角深呼吸稳住心神，避免情绪继续恶化。",
      "type": "生存危机",
      "sourceDescription": "击中零你就死了。每个人都从 100 开始。最低 50。你会发疯的。我深吸了一口气，稳住了心，"
    },
    "3800": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "人物逐渐恢复呼吸，同伴惊讶地指出，对方竟然杀死了那个被称为母亲的存在。",
      "type": "击杀揭示",
      "sourceDescription": "呼吸平稳下来，苍白的脸上泛起一丝奇怪的红晕。你实际上杀了母亲。特鲁亚缓缓打开"
    },
    "2790": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "一方担心前方存在更大的怪物，另一方认为过度谨慎反而会更快丧命。",
      "type": "行动抉择",
      "sourceDescription": "开路者担心这个地狱里有更大的怪物，谨慎行事会让你更快地被杀，我卡住了"
    },
    "1972": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "双头魔鬼鲨是嗜血的群体猎手，主角留下的杀戮气味可能引来追踪。",
      "type": "怪物威胁",
      "sourceDescription": "污染源。双头分裂魔鬼鲨是嗜血的群体猎人，你的杀戮气味已经"
    },
    "1733": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "海域内进化至二阶的兽族幸存者已超过一万，深渊生态即将发生变化。",
      "type": "环境异变",
      "sourceDescription": "这片海域中，兽族进化到二阶的幸存者，已经超过了一万只。深渊生态系统即将发生转变。"
    },
    "933": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "主角头晕乏力时，前方雾气中传来低沉的马达声，危险来源尚不明确。",
      "type": "未知威胁",
      "sourceDescription": "虚弱，焦急地抱怨。就在我头晕目眩的时候，前方的雾气里传来了奇怪的马达声。低沉、不安的嗡嗡声背叛了我的"
    }
  },
  "PUhrYaWypO4": {
    "253": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "男子把选择摆到女子面前，直接询问她是否愿意嫁给自己。",
      "type": "求婚转折",
      "sourceDescription": "You brought this on yourself, sweetheart. So, will you marry me?"
    },
    "396": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "女子告诉父亲自己已经结婚，拒绝再嫁吸血鬼始祖；父亲怀疑她只是在逃婚。",
      "type": "反抗逼婚",
      "sourceDescription": "Get your ass back here right now. Dad, I'm already married. I'm not marrying the first vampire. So, stop wasting your time. Are you pulling this just to escape the wedding? Believe whatever you want. I don't care anymore"
    },
    "494": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "前任指责女子迅速另结新欢，她反问是谁在婚礼前夜与未婚妻的姐妹偷情。",
      "type": "背叛对质",
      "sourceDescription": "before. And after one night, you jump into bed with another guy. Were you cheating on me this whole time? You hypocritical piece of trash. Who is screwing his fiance's sister the night before their wedding?"
    },
    "1056": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "家人害怕始祖降罪全家，命人按住女子、打断她的腿，让她独自承担后果。",
      "type": "暴力逼迫",
      "sourceDescription": "The first vampire will be here any second. Instead of letting him punish our entire family, we'll make sure you pay for what you did. Pin her down. Break her leg so she can"
    },
    "955": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "对方嘲笑女子的丈夫贫穷低微，声称他连进入会场的资格都没有。",
      "type": "身份羞辱",
      "sourceDescription": "Did you honestly think your little broke ass husband invited you? Wake the up. A lesser vampire like him wouldn't even be allowed through these doors. At least"
    },
    "850": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "女子发现记忆没有被抹去，怀疑男子与自己结契，只因为自己像另一名女子。",
      "type": "替身疑云",
      "sourceDescription": "My memories are still here. Viven, he tried to erase my memory to protect her. That's why he bonded with me. Because I look like Viven. I was just"
    },
    "162": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "面对送她回家的提议，女子拒绝返回，决定摆脱家人对婚姻的控制。",
      "type": "自主选择",
      "sourceDescription": "Where do you live? I'll take you home. I can't go back. If my family insists to control my life, then I'll choose my own way out."
    },
    "69": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "家人逼女子嫁给传闻中新娘无法生还的吸血鬼始祖，她质问对方为何要让自己代人送死。",
      "type": "替嫁危机",
      "sourceDescription": "marry the first vampire. No one survives becoming his bride. You betrayed me and now you want me to die for her. It's not up to you to decide."
    },
    "717": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "来人提起男子多年拒绝所有新娘，暗示他仍在追寻某段旧情。",
      "type": "旧情线索",
      "sourceDescription": "place, and expect a warm welcome. No wonder all those brides I sent your way over the years, you rejected every single one. Zayn, turns out you were still chasing"
    },
    "597": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "对手震惊于眼中弱者竟能压制自己，男子警告他立刻离开。",
      "type": "力量反转",
      "sourceDescription": "What the hell? How is this possible? How can this weaking overpower me? Get the out of my sight before I wipe you out."
    }
  },
  "h7CDf24MQkY": {
    "601": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "家人认定她只是在假装失忆，企图离婚并乘飞机去找亨特。",
      "type": "失忆质疑",
      "sourceDescription": "记得 过去 几 年 的 事 了。 她 在 撒谎。 她 只 是 想 离婚。 她 甚至 买 了 张机票 去 陪伴 亨特。 她 装 的。 花样 滑冰 运动员 安娜 · 弗莱彻 将 于"
    },
    "1082": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "旁人以为男子因多年被妻子忽视而另有打算，他却澄清自己是在为雷吉娜求助。",
      "type": "误会澄清",
      "sourceDescription": "多 年 来 一直 被 妻子 忽视， 你 终于 忍无可忍， 决定 不 再 忍受 蓝爪子 了 你 的 秘密 我 绝对 保密。 我 明白 了， 女士。 我 指 的 是 雷吉娜。 她 需要"
    },
    "1549": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "女儿问父亲为什么不愿在动物园喂苍鹭，母亲解释是因为父亲害怕它们。",
      "type": "亲子互动",
      "sourceDescription": "妈妈， 为什么 爸爸 不 喜欢 在 动物园 喂苍鹭？ 因为 你 爸爸 怕 他们。"
    },
    "252": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "女子怀疑自己来到十年后，惊讶地确认自己已与昔日对头结婚。",
      "type": "失忆反转",
      "sourceDescription": "穿越 到 10 年 后 了 吗？ 等等， 我们 真的 结婚 了 吗？ 这 次 又 是 什么 事？ 我 可 不 只是 嫁给 了 利昂努斯。 我 甚至 还"
    },
    "1401": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "丈夫认定无论失忆前后她都不会喜欢自己，雷吉娜恳求他再给一点时间。",
      "type": "关系修复",
      "sourceDescription": "也 会 对 我 好 吗？ 忘 了 它。 无论 你 是 18 岁 还 是 28 岁， 你 永远 不 会 喜欢 我。 蒙蒂， 给 我 点 时间。 请。 答 对 了。"
    },
    "84": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "雷吉娜怒气冲冲地质问男子，男子却提出让她嫁给自己。",
      "type": "冤家求婚",
      "sourceDescription": "Regina， 我， 我 可以 解释。 我 要 杀 了 你。 该 死 的。 我 心 想：“ 哎呀， 以后 还 有 谁 会 跟 我 约会 呢？” 不 要 和 他们 约 会。 嫁给 我 吧。"
    },
    "372": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "女子得知自己曾主动求婚、生下女儿却又背叛丈夫，开始质疑过去的自己。",
      "type": "往事冲击",
      "sourceDescription": "我 曾 对 蒙蒂 说 我 会 嫁给 他， 后来 我 和 他 生 了 一 个 女儿， 但 我 也 背叛 了 他。 我 到底 是 什么样 的 贱人？ 蒙蒂 不 是 刚 走 吗？ 他 为什么"
    },
    "700": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "家人讨论孩子的安排，丈夫质问雷吉娜是否又要借机与亨特私会。",
      "type": "婚姻冲突",
      "sourceDescription": "伊斯拉 将 住在 哪里？ Regina， 你 不 会 趁 着 我们 孩子 在 看 音乐 的 时候 搞 Hunter 吧？ 请 到 楼下 等。 是 的， 先生。 一切 都 结束 了， 雷吉娜。 音乐 到 此 为止"
    },
    "1242": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "医生通过孩子的画指出，她觉得母亲不喜欢自己，并强调必须对孩子的状况负责。",
      "type": "亲情创伤",
      "sourceDescription": "伊莎画 的。 是 的。 她 说 她 妈妈 不 喜欢 她， 而且 她 妈妈 的 眼睛 很 可怕。 伊斯拉 是 我 的 病人， 蒙哥马利 夫人。 所以， 我 必须 对 她 负责。 你 想 让"
    },
    "905": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "亨特以为雷吉娜跟到伦敦是为了自己，不解她为何还带着丈夫和孩子。",
      "type": "错判动机",
      "sourceDescription": "我 知道 雷吉娜 会 跟着 我 去 伦敦。 但 她 为什么 带 着 丈夫 和 孩子 一起 来 呢？ 又 开始 欲擒 故纵 了。 我 需要 去 女 厕 所。 稍 等。"
    }
  },
  "fuM-slY--64": {
    "1462": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "施暴者仍把男子当成冒认丈夫的小偷，旁人却认出眼前女子正是玛洛丽·萨顿。",
      "type": "身份揭露",
      "sourceDescription": "That's right. Just a low-life thief and he's been going around telling everyone he's your husband. But don't worry, I took care of him. Gavin, she's really Mallerie Sutton, the"
    },
    "1673": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "对方认错求饶，萨顿女士拒绝原谅羞辱丈夫的人，当场将其开除。",
      "type": "护夫反击",
      "sourceDescription": "Mrs. Sutton, I swear I didn't know. Please forgive me. Anyone who humiliates my husband doesn't get forgiven. You're fired. You heard her. Get out."
    },
    "910": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "对方以威胁口吻要求男子认清地位，强调此处轮不到他做主。",
      "type": "强势压迫",
      "sourceDescription": "it. Baby, I wasn't finished with you earlier. I'll take care of that right now. Remember your place. You don't call the shots here."
    },
    "1053": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "众人嘲笑男子连车都没有，不相信他娶了城中首富；男子让他们直接向妻子求证。",
      "type": "身份质疑",
      "sourceDescription": "marry the richest woman in the city? Look at yourself. You don't even own a car. What makes you think you're Mrs. Seter's husband? It's the truth. If you don't believe me, ask her yourself. Damn it. I don't even have her"
    },
    "627": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "男子提起自己的驾驶本领，女子宣布他已是自己的丈夫，并提出每月给他二十万。",
      "type": "关系约定",
      "sourceDescription": "I may just be a mechanic right now, but my driving skills. You're my man now. Behave yourself and I'll give you 200 grand every month."
    },
    "849": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "男子质问兄弟为何背叛自己，对方却把爱情说成输赢，反责他没能留住恋人。",
      "type": "兄弟反目",
      "sourceDescription": "I treated you like my brother. Love is about winning. You lost her. That's on you. Baby, don't waste your time. He's just a"
    },
    "422": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "婚礼上两人正式结为夫妻；男子提醒彼此还不熟悉，女子决定婚后再慢慢了解。",
      "type": "闪婚转折",
      "sourceDescription": "By the power vested in me, I now pronounce you husband and wife. You may kiss the bride. Miss, we don't even know each other. We'll figure it out."
    },
    "11": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "来人把男子贬为小偷，称他冒认丈夫身份，并向女子邀功说已经教训了他。",
      "type": "身份羞辱",
      "sourceDescription": "That's right. Just a low-life thief. And he's been going around telling everyone he's your husband. But don't worry, I took care of him."
    },
    "1275": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "男子提到父亲仍在住院，恳求老板不要逼迫自己，旁人却催他服从韦伯先生的要求。",
      "type": "权势胁迫",
      "sourceDescription": "You bastard. Boss, you can't do this. My dad is still in the hospital. Preston, just do what Mr. Web says. Wow."
    },
    "261": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "女子否认资助学费就能换来婚姻，旁人炫耀她已与企业经理订婚，用戒指价格羞辱男子。",
      "type": "感情背叛",
      "sourceDescription": "it paying tuition doesn't buy you a wife, loser. Veronica's engaged to a manager at United Emotive Group. His ring's worth more than you'll make in years."
    }
  },
  "As2Zh26ZzYQ": {
    "914": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "面对失去丈夫就一无所有的威胁，娜迪娅平静回应，自己只是停止干涉和挽留。",
      "type": "主动放手",
      "sourceDescription": "up and you'll drive me away. And if you can't even hold on to your own husband, who the hell will you have left? Honey, what are you talking about? I'm doing exactly what you wanted. No more controlling you. No more push"
    },
    "600": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "丈夫以为多年做主妇的娜迪娅只在乎自己和孩子，认定她不可能真正离开。",
      "type": "轻视妻子",
      "sourceDescription": "nothing. Maybe she's busy. Busy doing what? She's been a housewife for years. Me and Toby are her whole world. Well, she does love you. That's the problem. I'm her whole damn"
    },
    "496": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "男子与情人私下商量如何瞒过娜迪娅，还抱怨妻子不如情人体谅自己。",
      "type": "秘密私情",
      "sourceDescription": "her face. And stop taking my side all the time. You'll make her suspicious. Toby needs his family. Babe, I'm sorry I have to keep you in the shadows. If Nadia were half as understanding as you, my life wouldn't be such a"
    },
    "1210": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "丈夫把娜迪娅的疏离当成欲擒故纵，仍坚信她爱自己，不会真正离开。",
      "type": "自负误判",
      "sourceDescription": "she doing? Trying to make me chase you now. You're getting spoiled, Nadia. You love me too much to stay mad. Fine, I'll let it slide."
    },
    "362": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "娜迪娅回想死后才看清的背叛，突然表示愿意放手，让比安卡带走丈夫，令众人错愕。",
      "type": "重生醒悟",
      "sourceDescription": "a bitter failure. And I had to die to finally see their betrayal. Bianca, this isn't your fault. She's the one who Fine. Bianca can take him. What? I said it's fine. Bianca"
    },
    "786": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "丈夫叫孩子起床上学，却发现娜迪娅已经不在家，原本习以为常的生活开始失序。",
      "type": "离家转折",
      "sourceDescription": "Toby. Toby, you're late for school. Get up. Where's your mom? Nadia. Nadia. I don't think Nadia's here. I've"
    },
    "1035": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "丈夫仍盘算回家管教妻子，娜迪娅却收到录取通知，获得重新出发的机会。",
      "type": "事业转机",
      "sourceDescription": "I'll straighten her out tonight. You two will work it out. Nadia's lucky. Not every woman has a husband who tries this hard. I'll make it up to you, baby. Fine, but you owe me. Nadia, you're in. Report to the"
    },
    "1352": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "女子用礼物拉拢孩子，要求瞒着父亲；孩子答应保密，甚至表示愿意让她当妈妈。",
      "type": "亲情背叛",
      "sourceDescription": "Okay, they're yours. But this has to be our little secret. You can't tell daddy. If he finds out, Mommy might come back and start bossing you around again. I won't tell. You can be my mommy now. I"
    },
    "236": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "比安卡挑拨夫妻关系，娜迪娅意识到，对方正在一步步夺走自己的丈夫和生活。",
      "type": "关系夺取",
      "sourceDescription": "He's already fed up with you, Nadia. Maybe you should ask yourself why. Gavin. Nadia, please don't fight over me. Nadia only wants what's best for Toby. This was the day Bianca started stealing my life, my husband, my so"
    },
    "57": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "男子向娜迪娅求婚，两人对腹中的孩子许诺会守护家庭。",
      "type": "婚姻承诺",
      "sourceDescription": "our baby everything. Nadia, will you marry me? Yes, of course. Yes. You hear that, little one? If daddy ever breaks mommy's heart, it's two against"
    }
  },
  "EDP3sLP8W0o": {
    "1428": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "妻子维护多里安，丈夫反问她是否真以为协议由对方促成，并坦言是自己办成的。",
      "type": "功劳争夺",
      "sourceDescription": "in one day than you ever have. You had no right to lay a finger on him. Do you truly believe Dorian secured that agreement? What are you implying? That you did it? You? Yes, I did."
    },
    "550": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "昔日托付要求男子以丈夫身份守护六年；如今距离妻子掌权六周年只剩六天。",
      "type": "期限将至",
      "sourceDescription": "I want you to stay by her side as her husband, protect her, and love her for 6 years. After that, you'll be free. In 6 days, Leila will celebrate her 6th year as chairwoman."
    },
    "1205": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "妻子不相信守约的解释，认为丈夫只是舍不得不用工作、无需承担经济责任的生活。",
      "type": "动机误解",
      "sourceDescription": "A covenant. But the truth is, you can't bear to give up being Leila Rothway's husband. No work, no financial responsibility, no risks. You only pretend to care."
    },
    "955": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "丈夫因别的男人碰触妻子而不满，妻子却称对方只是帮忙戴项链，指责丈夫嫉妒。",
      "type": "夫妻争执",
      "sourceDescription": "enough to him last time. Because he put his hands on my wife. You're jealous, and now you're twisting the truth. Dorian only helped me put on a necklace. He was being polite. Enough. I have no interest in your little mar"
    },
    "1893": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "妻子让丈夫独自回家，自己要照顾多里安；旁人替丈夫抱不平，却被她拒绝干涉。",
      "type": "感情冷落",
      "sourceDescription": "home by yourself after the party. Don't wait up. I'll be taking care of Dorian tonight. Evren is your husband. Can't you see how badly he's hurt? Ms. Sanders, my marriage is none of your business."
    },
    "1668": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "一方感谢礼物令母亲开心，表示早已把对方视为家人，亲人的幸福比生意更重要。",
      "type": "亲情拉近",
      "sourceDescription": "My mother truly loves it. You two are family to me. Seeing her this happy means more than closing any deal. Honestly, I've always believed you two"
    },
    "2051": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "妻子得知丈夫已经离开，责怪身边人知情不报、没有挽留。",
      "type": "离别追问",
      "sourceDescription": "Layla, that worthless You knew my husband was leaving and you said nothing? You just let him go? I should fire you for this."
    },
    "750": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "男子感叹守护妻子六年，自己的礼物却得不到重视，另一件礼物反而被要求当众展示。",
      "type": "付出受冷落",
      "sourceDescription": "I've protected you for 6 years. Yet, you couldn't spare my gift a single glass. Put it on her. Come on, let us see it."
    },
    "105": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "男子应下临终愿望，承诺娶她、珍惜并保护她，直到约定期限结束才恢复自由。",
      "type": "守护契约",
      "sourceDescription": "Your final wish has been heard. I will marry her, cherish her, and keep her safe. When the final grain of sand falls, our covenant shall end and I will be free."
    },
    "249": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "男子回忆自己整理合同、陪同会议，并在暗中替妻子抵挡董事会与外部威胁。",
      "type": "幕后守护",
      "sourceDescription": "sorting contracts, and sitting silently through meetings. From the shadows I have protected her from the board and threats she never even knew existed. I only hope that one day she would be strong enough to hold this"
    }
  },
  "2cBsv0BCNNA": {
    "1732": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "权贵要求在全国百姓面前将男子鞭打至死，借惩罚维护王室尊严。",
      "type": "公开处刑",
      "sourceDescription": "person in this kingdom. I demand he be subjected to the harshest punishment Alician law allows. Flog him to death before every citizen and preserve the dignity of the crown. Hunter, 20 years of playing the devoted"
    },
    "613": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "两方争夺次日决战的胜利与王位，言语冲突不断升级。",
      "type": "决战宣言",
      "sourceDescription": "Lother. Tomorrow's fight is mine. Don't kid yourself. Shut your mouth. The throne belongs to me. Between"
    },
    "91": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "旁人指责男子让家族蒙羞，奥托不仅不维护，还否认兄弟关系，将他贬为废物。",
      "type": "家族羞辱",
      "sourceDescription": "Otto, you seriously going to let your brother carry on like that? He's making the Khn family look like a goddamn joke. Relax. He's no brother of mine. Just a worthless dog."
    },
    "1338": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "众人讨论国王只能辅佐女王、没有最高权力；为追究杀父旧案，男子需要更大的权限。",
      "type": "权力限制",
      "sourceDescription": "Allesian can only serve in support of the queen. He holds no supreme power. But if his father was murdered, then what Kalin needs is the kind of authority that overrides everything"
    },
    "1512": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "男子称亲手杀对方都会弄脏自己，激怒对手，对方扬言要杀他。",
      "type": "挑衅激怒",
      "sourceDescription": "move, I suppose. Easy there, big guy. You got the wrong idea. It's just killing a disgusting pest like you with my bare hands would make me feel dirty. You dare look down on me, I'LL KILL YOU."
    },
    "965": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "寻找龙骑士的人得到肯定答复，对方表示，只要他赢下比赛，真相自然会公开。",
      "type": "真相将现",
      "sourceDescription": "Don't tell me. Did you find the dragon rider? Yes. Once he wins, the truth will come out on its own."
    },
    "728": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "有人惊讶于男子的真本领，怀疑他就是昨夜出现的神秘高手。",
      "type": "身份疑云",
      "sourceDescription": "Moto Khan has real skill. Could it be him last night? Who are you? Broken to the Khan estate. You've got a"
    },
    "478": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "男子当面指认亨特，称自己二十年前亲眼看见他杀害父亲。",
      "type": "旧仇揭露",
      "sourceDescription": "Hunter, if I hadn't watched you murder my father with my own eyes 20 years ago, I might have actually believed you were a decent man."
    },
    "1219": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "众人催促女王宣布奥托成为丈夫与新国王，王位归属即将揭晓。",
      "type": "册封转折",
      "sourceDescription": "Your majesty, it's time to announce to the whole kingdom that Otto will be your husband and the new king of Elissian. I hereby declare the title of king shall"
    },
    "245": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "对手认定王国失去龙的庇护，威胁在竞技场击败所有武士，夺取王位与奥蕾莉娅。",
      "type": "王权争夺",
      "sourceDescription": "Release her now. You've lost dragon's protection. Those sorry excuses for warriors don't stand a chance against me in the arena. The throne and Aurelia, they're both"
    }
  },
  "CiV32O95JUE": {
    "30": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "来人宣称接管这条街，要求老板露面，并将保护费翻倍。",
      "type": "强势威胁",
      "sourceDescription": "Yo, old man. Where's the boss? Tell them this block's under us now. Protection money just doubled."
    },
    "404": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "长辈得知女孩在学校受辱，责怪奥兰多没有保护好她，表示要立刻找他算账。",
      "type": "保护承诺",
      "sourceDescription": "Orlando, that useless piece of I told him to protect you and he let you take this crap at school. I'm going to go deal with him right now."
    },
    "1163": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "父亲承诺不再让任何人伤害女儿，女儿却担心他也遭报复，哭求父亲放手。",
      "type": "亲情救赎",
      "sourceDescription": "Those psychopaths will destroy you, too. I'm here. No one is ever going to hurt you again. I swear. Please, Dad. Just let me go."
    },
    "807": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "约瑟夫亲自送东西的举动震住旁人；得知他是家族首领后，对方连忙认错求饶。",
      "type": "身份反转",
      "sourceDescription": "Good job, Joseph. My god. Joseph, the head of the Volante family, delivered something for him in person. Who the hell is he? I'm dead. Mr. Joseph, I was blind. I had"
    },
    "318": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "女孩看见约瑟夫与父亲同行，却因担心奥兰多报复父亲，不敢说出受伤真相。",
      "type": "隐瞒真相",
      "sourceDescription": "Who the did this? Why is Uncle Joseph with dad? I can't tell him the truth. Orlando will kill him. He's just a mechanic. Dad, Uncle Joseph,"
    },
    "994": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "一方追问为何没有保护好女孩，另一方却抱怨遭到殴打、失去演艺交易，被迫困在此处。",
      "type": "追责冲突",
      "sourceDescription": "one job. Keep her safe. this protection. You piece of You beat me like a dog over some sewer You ruined my Hollywood deal and shoved me into this hole. The jumped. How the is"
    },
    "194": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "女孩质问奥兰多是否真心爱过她，对方嘲笑她的灰姑娘幻想，并称交往只是奉父亲之命。",
      "type": "感情背叛",
      "sourceDescription": "Orlando, were you lying when you said you loved me? Love you? Stop dreaming your pathetic Cinderella fantasy. Orlando was just following his dad's orders. I have no clue what my old man"
    },
    "496": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "家族成员反对继承人与出身低微的女孩交往；另一方表示另有隐情，要求先服从安排。",
      "type": "门第冲突",
      "sourceDescription": "So that's your grand plan? Leashing the air of this family like a dog to some gutter girl skirt? There are things I can't tell you right now, but if you just do as"
    },
    "893": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "女孩质问对方是否想利用自己羞辱父亲；另一人向约瑟夫表示，自己早已期待这一刻。",
      "type": "公开羞辱",
      "sourceDescription": "You think you can use me to humiliate my dad? You know, Joseph, I've replayed this moment a million times in my head."
    },
    "718": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "女孩拒绝对方家族的虚假善意，表示自己只想顺利毕业。",
      "type": "拒绝施舍",
      "sourceDescription": "suck up to trash like you. Listen, I didn't know anything about it. And I don't need your family's fake charity. I just want to graduate."
    }
  },
  "jx-Dz0sPOsY": {
    "405": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "莱拉听懂动物的话，得知继母正给西奥下毒，企图让自己的孩子继承家产。",
      "type": "阴谋揭露",
      "sourceDescription": "Wait, you can understand me? Mhm. Theo's the old son from his late wife. Arabella's marrying in as his stepmother, and she's poisoning him so her own child can inherit the"
    },
    "753": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "莱拉得知小猫有危险；西奥因猫是母亲留下的念想，焦急寻找。",
      "type": "救援危机",
      "sourceDescription": "What did they say? Oh no, the kittens are in danger. Danger? Has anyone seen my cat? Go's all I have left of Mama. I can't lose her. Theo,"
    },
    "1247": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "莱拉感谢西奥相信自己，另一人却质疑对方只是在拿孩子的判断当挡箭牌。",
      "type": "信任冲突",
      "sourceDescription": "that's not because of you, by the way. Thank you for believing in me, Theo. So, you already know you're now hiding behind a child's guest. Just admit"
    },
    "609": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "有人警告西奥，父亲带回的女孩会抢走宠爱与继承权；莱拉却亲切地称他为哥哥。",
      "type": "亲情挑拨",
      "sourceDescription": "father brought back. Good thing you woke up, or she would have stolen all your father's love and taken your place as the heir of this house. Hi, Theo. I'm Lyra. You'll be my big brother now."
    },
    "890": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "莱拉劝对方说实话，提醒撒谎会带来厄运，对方却把她的话当成威胁。",
      "type": "谎言对峙",
      "sourceDescription": "me the truth. This is your last chance. Please tell the truth. Lies always bring bad luck. I'm begging you. Bad luck? Is this brat trying to threaten me?"
    },
    "216": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "送别者祝愿莱拉找到命定家人；男子发现女孩能够让动物停止攻击。",
      "type": "新家羁绊",
      "sourceDescription": "Farewell, Lyra. Perhaps this man is the family fate has chosen for you. Was that you? You called them off. Mhm. Don't worry, sir. They won't"
    },
    "1388": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "女方家族以解除婚约相威胁，要求父亲卖掉所谓受诅咒的孩子，才愿代偿债务。",
      "type": "利益逼迫",
      "sourceDescription": "Listen, Alistister, sell this cursed child and my family will cover your debt. Otherwise, this engagement is over. Daddy, I'm not really thinking. Daddy,"
    },
    "1101": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "父女讨论让一匹马参加比赛，莱拉承认五百万价格高昂，却仍相信它的潜力。",
      "type": "能力认可",
      "sourceDescription": "Look at that spirit. Daddy, I love her, too. Let's enter in the race. Daddy, 5 million is a lot, but she has a real"
    },
    "1594": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "家人将矛盾归咎于女孩，声称若她破坏家庭，就不准她留下。",
      "type": "家族排斥",
      "sourceDescription": "doesn't like me. Absurd. If that child has come to tear this family apart, she'll not be welcome here."
    },
    "78": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "女孩看到小兔子带来的收获，惊喜地向它道谢。",
      "type": "能力显现",
      "sourceDescription": "Wow, look at all this. Thank you, little bunny."
    }
  },
  "HWLJXOvnrDc": {
    "1750": {
      "basis": "unusable-captions",
      "status": "unusable",
      "description": "该时间点的字幕仅有零碎识别词，无法还原具体剧情。可查看画面或打开原片核验。",
      "type": "剧情待核验",
      "sourceDescription": "fore"
    },
    "337": {
      "basis": "unusable-captions",
      "status": "unusable",
      "description": "该时间点的字幕仅有零碎识别词，无法还原具体剧情。可查看画面或打开原片核验。",
      "type": "剧情待核验",
      "sourceDescription": "spe fore"
    },
    "3686": {
      "basis": "unusable-captions",
      "status": "unusable",
      "description": "该时间点的字幕仅有零碎识别词，无法还原具体剧情。可查看画面或打开原片核验。",
      "type": "剧情待核验",
      "sourceDescription": "for"
    },
    "2398": {
      "basis": "unusable-captions",
      "status": "unusable",
      "description": "该时间点的字幕仅有零碎识别词，无法还原具体剧情。可查看画面或打开原片核验。",
      "type": "剧情待核验",
      "sourceDescription": "the"
    },
    "1038": {
      "basis": "unusable-captions",
      "status": "unusable",
      "description": "该时间点的字幕仅有零碎识别词，无法还原具体剧情。可查看画面或打开原片核验。",
      "type": "剧情待核验",
      "sourceDescription": "foree fore"
    },
    "5783": {
      "basis": "unusable-captions",
      "status": "unusable",
      "description": "该时间点的字幕仅有零碎识别词，无法还原具体剧情。可查看画面或打开原片核验。",
      "type": "剧情待核验",
      "sourceDescription": "you oh"
    },
    "5184": {
      "basis": "unusable-captions",
      "status": "unusable",
      "description": "该时间点的字幕仅有零碎识别词，无法还原具体剧情。可查看画面或打开原片核验。",
      "type": "剧情待核验",
      "sourceDescription": "all"
    },
    "6922": {
      "basis": "unusable-captions",
      "status": "unusable",
      "description": "该时间点的字幕仅有零碎识别词，无法还原具体剧情。可查看画面或打开原片核验。",
      "type": "剧情待核验",
      "sourceDescription": "for"
    },
    "6264": {
      "basis": "unusable-captions",
      "status": "unusable",
      "description": "该时间点的字幕仅有零碎识别词，无法还原具体剧情。可查看画面或打开原片核验。",
      "type": "剧情待核验",
      "sourceDescription": "all"
    },
    "2202": {
      "basis": "unusable-captions",
      "status": "unusable",
      "description": "该时间点的字幕仅有零碎识别词，无法还原具体剧情。可查看画面或打开原片核验。",
      "type": "剧情待核验",
      "sourceDescription": "fore spee"
    }
  },
  "36JeMI78JmU": {
    "2013": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "人物已逼近死亡边缘，旁人表示无能为力，要求做好最坏准备。",
      "type": "生死危机",
      "sourceDescription": "死亡之门。我什么也做不了。为最坏的情况做好准备。 你轻点。你想杀死我们"
    },
    "3684": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "目标好感跌至零以下，恋爱任务即将失败，系统开始十秒惩罚倒计时。",
      "type": "任务危机",
      "sourceDescription": "目标。好感度已跌至零以下。爱情使命将彻底失败。 10秒后，系统触发顶部橡皮擦，"
    },
    "2427": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "人物放出狠话后，系统立即提醒保持健全人格，行动受到规则约束。",
      "type": "系统警告",
      "sourceDescription": "美好的。我会送他去他曾祖母那里 感受母爱。 警告。保持健康的人格。"
    },
    "3022": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "系统发出情绪超载警告，人物仍陷于激动，并扬言与对方战斗。",
      "type": "情绪失控",
      "sourceDescription": "警告。情绪超载崩溃。 这家酒馆的女士太性感了。 我会和你战斗。"
    },
    "3989": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "一方指责对方把人逼入绝境、会引来追杀，另一方否认自己杀了首领。",
      "type": "对峙升级",
      "sourceDescription": "Hujo精英不会放过人民。你把他们逼到了死胡同。 死胡同。我没有杀大佬"
    },
    "3782": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "有人要求借用力量，系统却开始崩溃，旁人急忙呼喊罗伯特停手。",
      "type": "力量失控",
      "sourceDescription": "我的能量。你在干什么？ 把你的力量借给我吧。做一个战利品。 罗伯特，停下来。系统正在崩溃。"
    },
    "3158": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "有人想冲出去，却被提醒外面士兵持刀包围，出去等同送死。",
      "type": "逃生受阻",
      "sourceDescription": "闭嘴。你想死吗？外面的士兵都拿着刀。出去就是必死无疑。"
    },
    "3317": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "众人提及一位父亲的担当，并嘱咐同伴保护小修。",
      "type": "保护托付",
      "sourceDescription": "说吧兄弟。沉先生真是一位伟大的父亲。 你保护小修。"
    },
    "366": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "面对可能致命的风险，一方表示不怕，另一方便催促其购买。",
      "type": "冒险选择",
      "sourceDescription": "被静电杀死。我不害怕。 如果你不怕死，那就买吧"
    },
    "3403": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "系统提示附近出现恋爱支线目标，要求救人以获得好感和后续奖励。",
      "type": "任务触发",
      "sourceDescription": "浪漫支线任务主持人。前方50米，是绝世少爷UA。你疯了。拯救他以获得爱。解锁双"
    }
  },
  "AcDxCKlZtSY": {
    "1035": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "坎迪丝当面炫耀，只因自己想要，朱利安就把女子送给他的吊坠交给了她。",
      "type": "情敌炫耀",
      "sourceDescription": "I heard you gave this to Julian, Allie. Too bad. I wanted it, so he gave it to me. You saved the whole town, and yet he"
    },
    "359": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "女子说演出后将迎来人生重要仪式，希望对方到场，对方却犹豫是否有空。",
      "type": "重要邀约",
      "sourceDescription": "I'll finally be receiving the vessel after my performance. It's the most important moment of my life. You'll be there, right? Tomorrow? I don't know. I think I have"
    },
    "1221": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "众人以血誓印记与家族礼物判断继承人迷恋坎迪丝，她却说从未见过那位继承人。",
      "type": "身份误会",
      "sourceDescription": "Are you serious? First, a human got the blood oath mark for you. Now you're getting gifts from House Vanderberg? Candace, the Vanderberg heir must be obsessed with you. I've never even met the Vanderberg heir."
    },
    "1366": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "女子炫耀朱利安为她取得血誓印记，却又嘲笑他的付出，否认自己真心喜欢他。",
      "type": "真心遭践踏",
      "sourceDescription": "did you see Julian's? He got a blood oath mark for me. What a loser. Can't believe he actually did it. Cringe, am I right? I thought you Thought I what? Actually liked that loser? Please."
    },
    "199": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "女子请求被带走，透露父亲一直想把她献给苏醒的始祖当血仆，自己曾为朱利安拒绝。",
      "type": "逃离控制",
      "sourceDescription": "Take me away. Now. Ever since that ruthless original awakened, my dad's been trying to offer me to him as a blood servant. I kept refusing because of Julian. But now, even if the original tears me"
    },
    "929": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "女子为保护朱利安送出本该护佑自己的吊坠，却发现他随意转赠给了坎迪丝。",
      "type": "信物背叛",
      "sourceDescription": "I gave my pendant away to protect him. When it was supposed to be protecting me. Now he gave it to Candace like it was nothing."
    },
    "76": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "女子听闻强大的吸血鬼血统，才意识到朱利安也是吸血鬼。",
      "type": "身份揭露",
      "sourceDescription": "human for? Just a girl? Vandeburg? That's the most powerful vampire bloodline in Veil Bridge. Wait, Julian's a vampire?"
    },
    "676": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "女子意外战胜原本被看好的对手，旁人不服，质疑她连舞步都没完成。",
      "type": "胜负反转",
      "sourceDescription": "Wow. I honestly wasn't expecting this. I can't believe I actually beat Valberg's perfect keeper. No, this has to be a mistake. She didn't even do the dance right."
    },
    "756": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "有人质疑女子根本不知自己在做什么，现场仍宣布开始第一道誓约。",
      "type": "仪式开启",
      "sourceDescription": "No. She has no idea what she's doing. Begin the first oath. Tonight, we gather"
    },
    "500": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "一方追问是否生气，另一方故作不在意，声称两人从未认真交往。",
      "type": "感情疏离",
      "sourceDescription": "Ally, it's not that big a deal. It's fine. What do I care who you spend your time with? It's not like we were ever anything serious. Wait. Are you mad at me? No."
    }
  },
  "ecopH193lDM": {
    "1204": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "对方不相信男子所说的结婚礼物，以保住工作为条件，逼他喝酒并跪下道歉。",
      "type": "当众羞辱",
      "sourceDescription": "the wedding gift to me. Still going with that story? Seriously? You drank too much and started believing your own fantasy. You don't want to get fired? Fine. Drink all of these and get on your knees and apologize."
    },
    "1079": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "众人不信一个连车都没有的男子能娶城中首富，男子要求直接向萨顿女士求证。",
      "type": "身份质疑",
      "sourceDescription": "marry the richest woman in the city? Look at yourself. You don't even own a car. What makes you think you're Ms. Sutton's husband? It's the truth. If you don't believe me, ask her yourself."
    },
    "285": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "男子提起毕业后结婚的承诺，却被嘲讽资助学费不等于买到妻子，女方已经另有婚约。",
      "type": "婚约背叛",
      "sourceDescription": "You said we'd get married after graduation. If you've changed your mind, paying tuition doesn't buy you a wife, loser. Veronica's engaged to a manager at United Motive Group."
    },
    "73": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "玛洛丽被要求接受婚姻安排，否则公司就交给弟弟；她拒绝让人夺走属于自己的东西。",
      "type": "家产胁迫",
      "sourceDescription": "You don't get to say no, Mallory. Marry him, or your brother gets the company. Your call. No one takes what's mine."
    },
    "739": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "朋友们为普雷斯顿的新婚举杯，称赞他技术出众，也总在别人需要时伸出援手。",
      "type": "朋友认可",
      "sourceDescription": "Guys, thank you. I I still can't believe you're the first one getting married. Come on, cheers to Preston. Why you surprised? Preston's the best mechanic here. And whenever someone needs help, he's always there."
    },
    "1418": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "男子提起玛洛丽会阻止对方，对方反逼他打电话，检验她是否认得这个所谓丈夫。",
      "type": "身份求证",
      "sourceDescription": "For real this time. Mallory won't let you do this. If you're really her husband, call her. Let's see if she even knows who you are."
    },
    "467": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "众人惊讶男子一夜成为富豪丈夫，女子公开警告所有人不准再羞辱他。",
      "type": "护夫表态",
      "sourceDescription": "You actually did it? That bastard really hit the jackpot become a millionaire's husband overnight. Listen carefully. He's mine now. Disrespect him again,"
    },
    "653": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "男子提到机械师身份与驾驶本领，女子提出每月给他二十万，明确两人的新关系。",
      "type": "关系约定",
      "sourceDescription": "I may just be a mechanic right now, but my driving skills You're my man now. Behave yourself, and I'll give you 200 grand every month."
    },
    "905": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "男子感谢前任让自己免于娶她，并指责另一人插足感情，表明不再留恋旧关系。",
      "type": "决裂反击",
      "sourceDescription": "forever. And thank you for saving me from marrying you. You? And you, keep playing the home wrecker if that's who you want to be."
    },
    "425": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "旁人质疑两人是假扮情侣，要求他们当场结婚证明关系。",
      "type": "逼婚试探",
      "sourceDescription": "manners myself. You're just some fake you hired. If you're really serious, marry him, right now."
    }
  },
  "1QJvGAUMYGA": {
    "294": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "男子回忆处理合同、出席会议，暗中保护妻子免受董事会和未知威胁。",
      "type": "幕后守护",
      "sourceDescription": "sorting contracts, and sitting silently through meetings. From the shadows, I have protected her from the board and threats she never even knew existed. I only hoped that one day she would be strong enough to hold this e"
    },
    "862": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "多里安以海外业务负责人的身份自居，嘲笑女子的丈夫只会留在家里打扫。",
      "type": "身份羞辱",
      "sourceDescription": "what a real man gives his woman. You must be my moon's husband. The one who spends his days cleaning the house, right, Dorian Kesler. I run the overseas division."
    },
    "641": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "旁人盛赞妻子与多里安般配，并提起多里安为建立国际供应网络离开七年的往事。",
      "type": "旧情铺垫",
      "sourceDescription": "like an angel. Dorian was right behind you, and the two of you already looked like a power couple straight out of a magazine. Such a shame Dorian left for 7 years to build that international supply network. Had he"
    },
    "1450": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "丈夫坚持保护妻子是职责，妻子却认为他鲁莽，并强调自己从未想嫁给他。",
      "type": "保护被拒",
      "sourceDescription": "I don't need your reckless heroics. I've told you that again and again. I'm your husband. Protecting you is my duty. I was forced to marry you. Never forget that. I never wanted you as my husband."
    },
    "999": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "丈夫指责多里安碰触妻子，妻子却认为只是戴项链的礼貌举动，反责丈夫嫉妒。",
      "type": "夫妻误解",
      "sourceDescription": "enough to him last time because he put his hands on my wife. You're jealous. And now you're twisting the truth. Dorian only helped me put on a necklace. He was being polite. Enough. I have no interest in your little mari"
    },
    "1234": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "妻子表示无论丈夫做什么都不会爱他，丈夫回应自己只是在履行对她父亲的承诺。",
      "type": "感情拒绝",
      "sourceDescription": "who I love. So, no matter what you do, I will never love you. I don't ask for your love, Miss Rothwit. I am only honoring the promise your father bound me to. That's what you always say, a promise, a"
    },
    "1594": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "妻子嫌丈夫的衣着令自己丢脸，不愿等他更换，只让他躲开人群。",
      "type": "宴会羞辱",
      "sourceDescription": "Did you dress like this just to humiliate me in front of everyone? I'll change it once. Don't bother. The party is already half over. Just stay out of sight and stop embarrassing me."
    },
    "1758": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "来人调查丈夫出身后，嘲笑他没钱没背景，只靠遗嘱进入家门，不配与妻子相伴。",
      "type": "门第贬低",
      "sourceDescription": "halfway over. Move. I looked into you. No family, no money, no name, nothing. You crawled into this house through Herilyn's will. Do you really think you deserve her? If I don't deserve her, do"
    },
    "497": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "男子以妻子获得西海岸黄金供应线路的年度独家权为条件，达成交易。",
      "type": "利益让渡",
      "sourceDescription": "On one condition, the exclusive annual rights to the West Coast Gold supply route will be granted to my wife, Ila Rothwell. So you came here for her? 5 years ago,"
    },
    "140": {
      "basis": "existing-captions",
      "status": "summarized",
      "description": "父亲担心死后董事会夺走女儿的一切，请男子以丈夫身份守护她六年。",
      "type": "临终托付",
      "sourceDescription": "Once I die, the board will move in and take everything from her. I want you to stay by her side as her husband. protect her and love her for 6 years. After that, you'll be free. Your final wish has been heard. I will mar"
    }
  }
};
