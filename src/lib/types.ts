import type { Dimension } from "./dimensions";

export const TYPE_CODES = [
  "C-O-S-G",
  "C-O-S-P",
  "C-O-A-G",
  "C-O-A-P",
  "C-M-S-G",
  "C-M-S-P",
  "C-M-A-G",
  "C-M-A-P",
  "R-O-S-G",
  "R-O-S-P",
  "R-O-A-G",
  "R-O-A-P",
  "R-M-S-G",
  "R-M-S-P",
  "R-M-A-G",
  "R-M-A-P",
] as const;

export type TypeCode = (typeof TYPE_CODES)[number];

export interface Persona {
  code: TypeCode;
  cn: string;
  en: string;
  /** 2-3 keyword chips for quick scan */
  tags: { zh: string[]; en: string[] };
  moto: { zh: string; en: string };
  desc: { zh: string; en: string };
  dims: Record<Dimension, { zh: string; en: string }>;
  /** Primary color keys from globals.css palette */
  hue: { from: string; to: string };
}

export const TYPES: Record<TypeCode, Persona> = {
  "C-O-S-G": {
    code: "C-O-S-G",
    cn: "坚定二元纯爱战士",
    en: "The Binary Loyalist",
    tags: {
      zh: ["忠诚", "清晰", "单向"],
      en: ["Loyal", "Certain", "Single-track"],
    },
    moto: {
      zh: "我是男/女同性恋，这辈子只爱一个人。不忠就分手。",
      en: "Gay or straight, monogamous, always. Unfaithful? The door's that way.",
    },
    desc: {
      zh: "你是彩虹谱系里最像 MBTI 直人测试结果的那种存在——方向明确，边界清晰，排他性强到吓人。你在 gay 吧里拒绝所有搭讪，因为\"我有男朋友了\"。手机屏保是伴侣照片，朋友圈全是秀恩爱。朋友们让你来做这个测试纯属好奇，你做完了，结果毫无悬念，然后转发给伴侣说\"看，我就说我是正常人吧\"——ta 回复了一个翻白眼的表情。",
      en: "You are the most MBTI-straight person in the rainbow spectrum. Clear direction, hard limits, monogamy enforced like a terms-of-service agreement. You declined three flirtatious texts tonight because \"I have a boyfriend.\" Your phone wallpaper is your partner's face. You took this test purely to confirm what you already knew.",
    },
    dims: {
      CR: {
        zh: "你的性别表达在规范内——不是因为你没想过打破它，而是因为你已经有太多事情要忠诚了。",
        en: "Your gender expression stays within norms — not because you've never questioned them, but because you're already loyal to enough things.",
      },
      OM: {
        zh: "吸引方向固定，从来没有例外，感谢发问。",
        en: "Attraction is fixed and single-directional. No exceptions. Thanks for asking.",
      },
      SA: {
        zh: "性对你很重要，是关系里的核心语言之一，缺少了会有真实的缺憾感。",
        en: "Sex matters to you — it's a primary intimacy language. Its absence creates real longing.",
      },
      GP: {
        zh: "一对一是你的安全感结构，不是限制，是选择。",
        en: "Monogamy is your security architecture. Not a constraint — a choice.",
      },
    },
    hue: { from: "#6bcb77", to: "#4d6a53" },
  },
  "C-O-S-P": {
    code: "C-O-S-P",
    cn: "单性别端水大师",
    en: "The Single-Gender Juggler",
    tags: {
      zh: ["多线程", "时间管理", "坦诚"],
      en: ["Multi-thread", "Time-blocked", "Candid"],
    },
    moto: {
      zh: "我只喜欢男的，但可以同时喜欢好几个。爱不是除法。",
      en: "Only into guys, but I can like multiple at once. Love isn't division.",
    },
    desc: {
      zh: "方向非常固定（就那一种性别，感谢发问），但关系数量不设上限。时间管理精确到小时，情人节给不同人送不同颜色的同款内裤。被问\"你怎么还没定下来\"时答：\"我在认真考虑所有候选人。\"口头禅：\"我爱的是男人这个物种，不是某一个具体的个体。\"",
      en: "Direction: fixed (one gender only, thanks). Quantity: unspecified. You manage a relationship portfolio like a venture capitalist — diversified, strategic, never over-committed. Time-blocking is your love language.",
    },
    dims: {
      CR: { zh: "打扮合规，这不是你需要用来表达的维度。", en: "You dress conventionally — this isn't the dimension you use for self-expression." },
      OM: { zh: "吸引对象只有一种性别，非常确定，不需要再想。", en: "Attracted to one gender only. Very certain. Done." },
      SA: { zh: "性是你维持多段关系的核心动力之一。", en: "Sex is central to why multiple connections work for you." },
      GP: { zh: "你不认为同时喜欢多个人有什么道德问题，前提是诚实。", en: "No moral issue with multi-dating — transparency is the only requirement." },
    },
    hue: { from: "#ff9f43", to: "#c06820" },
  },
  "C-O-A-G": {
    code: "C-O-A-G",
    cn: "无性单性恋守望者",
    en: "The Platonic Devotee",
    tags: { zh: ["柏拉图", "深情", "克制"], en: ["Platonic", "Devoted", "Restrained"] },
    moto: {
      zh: "我只喜欢女的，但我不碰她们。灵魂交融才是真正的亲密。",
      en: "Only women, but I don't touch them. Soul-merging is the real intimacy.",
    },
    desc: {
      zh: "暗恋一个女生三年，每天送早餐、帮写论文，对方以为 ta 只是个超级好的朋友。某天女生喝醉了主动亲了 ta，ta 吓得原地转移话题说\"对了你这周作业交了吗\"。精神恋爱是永恒的，身体接触是一个需要另行讨论的话题——可能永远不会讨论。",
      en: "Three-year crush. Daily breakfast deliveries. The object of your affection thinks you're just \"a really good friend.\" One night she tried to kiss you and you pivoted to asking about her homework deadline.",
    },
    dims: {
      CR: { zh: "性别表达合规，你的革命发生在精神层面，不在外表上。", en: "Gender-conforming exterior. Your revolution happens internally." },
      OM: { zh: "只被一种性别吸引，非常清晰。", en: "Attracted to one gender only. Very clear." },
      SA: { zh: "性对你来说不在亲密关系的必要清单上。你不是冰冷的——你只是用另一种语言爱人。", en: "Sex isn't on your intimacy checklist. You're not cold — you speak a different love language." },
      GP: { zh: "一对一让你感到专注和真实，不是限制。", en: "Monogamy feels like focus, not a constraint." },
    },
    hue: { from: "#4d96ff", to: "#2a70d0" },
  },
  "C-O-A-P": {
    code: "C-O-A-P",
    cn: "无性单性恋多人情绪管家",
    en: "The Platonic Polyamory Provider",
    tags: { zh: ["照顾欲", "深度共情", "模糊边界"], en: ["Caretaker", "Empath", "Blurred lines"] },
    moto: {
      zh: "我只对女生有感觉（精神上），但我是你们所有人的情感基础设施。",
      en: "Romantically women-only (spiritually), but I'm everyone's emotional infrastructure.",
    },
    desc: {
      zh: "同时照顾三个同性朋友的全部情绪需求：陪哭、陪逛街、凌晨三点接电话、帮删前任的聊天记录。谁想进一步 ta 就躲。被朋友问\"你到底喜不喜欢我\"时答：\"我照顾你比我照顾我自己还好，你说呢？\"",
      en: "You simultaneously manage the complete emotional needs of three people. You're there for every breakdown, every heartbreak, every 3am call. The moment someone wants more, you vanish.",
    },
    dims: {
      CR: { zh: "外表合规，内心是一个无所不包的情感服务平台。", en: "Conforming exterior. Internally, an all-encompassing emotional service platform." },
      OM: { zh: "只有一种性别能让你产生浪漫感，这一点非常清楚。", en: "Only one gender produces romantic feelings. Very clear." },
      SA: { zh: "不需要性来感受连接，情感共鸣是你全部的亲密语言。", en: "No sex needed to feel connected. Emotional resonance is your entire intimacy vocabulary." },
      GP: { zh: "你可以同时爱多人，而且不觉得这有问题——只要是情感上的爱。", en: "You can love multiple people simultaneously — as long as it stays emotional." },
    },
    hue: { from: "#ffd93d", to: "#c0a020" },
  },
  "C-M-S-G": {
    code: "C-M-S-G",
    cn: "双/泛性恋忠诚单偶者",
    en: "The Loyal Bi",
    tags: { zh: ["忠诚", "流动", "反刻板"], en: ["Loyal", "Fluid", "Stereotype-buster"] },
    moto: {
      zh: "男女通吃，但一次只爱一个。我的取向是流动的，但我的忠诚不是。",
      en: "Attracted to multiple genders, but loyal to one. Orientation: fluid. Loyalty: bedrock.",
    },
    desc: {
      zh: "上半年和男生同居，下半年和女生同居，每段都全情投入排他。被骂过\"双性恋不能专一\"，气得当场写了三千字辩驳文章并且发到了三个群里。现在随身携带这篇文章的截图以备随时放大给质疑者看。",
      en: "You've dated across genders with full-hearted exclusivity each time. You've been told \"bis can't be faithful\" and you wrote a 3,000-word rebuttal that you keep saved as a screenshot.",
    },
    dims: {
      CR: { zh: "性别表达在规范内，打破规范不是你选择的战场。", en: "Gender-conforming. Breaking norms isn't your chosen battleground." },
      OM: { zh: "吸引不被性别锁定，但每段关系你都认认真真。", en: "Attraction crosses genders, but every relationship is fully committed." },
      SA: { zh: "性是你感受亲密连接的重要语言。", en: "Sex is an important intimacy language for you." },
      GP: { zh: "一对一是你给伴侣的承诺，不是性别问题，是忠诚问题。", en: "Monogamy is your commitment. Not a gender question — a loyalty one." },
    },
    hue: { from: "#ee7e9a", to: "#c05070" },
  },
  "C-M-S-P": {
    code: "C-M-S-P",
    cn: "双/泛性恋多元能量体",
    en: "The Pansexual Portfolio Manager",
    tags: { zh: ["全开", "协调者", "高容量"], en: ["All-access", "Coordinator", "High-capacity"] },
    moto: {
      zh: "男女都行，而且可以同时来。爱不是除法，是乘法。",
      en: "All genders welcome, multiple relationships possible. Love multiplies, it doesn't divide.",
    },
    desc: {
      zh: "同时与一男一女维持知情同意的多元关系，三个人一起看电影、吃火锅、偶尔一起出游。ta 负责协调时间表和情绪管理。被朋友问\"你累不累\"时答：\"单恋一个人才更累，你不懂。\"",
      en: "You maintain consensual multi-gender relationships simultaneously. You manage the shared calendar, the emotional check-ins, the group dynamic.",
    },
    dims: {
      CR: { zh: "打扮在规范内，你的开放性体现在关系结构上，不在外表上。", en: "Conventionally dressed. Your expansiveness lives in relationship structure, not appearance." },
      OM: { zh: "不被任何性别限定，对人的吸引力是全方位的。", en: "Not limited by gender. Attraction is omnidirectional." },
      SA: { zh: "性是你感受彼此的重要方式，不可缺少。", en: "Sex is essential to how you connect. Non-negotiable." },
      GP: { zh: "多元关系是你的自然状态，透明和诚实是前提。", en: "Polyamory is your natural state. Transparency is the only rule." },
    },
    hue: { from: "#c77dff", to: "#9050c0" },
  },
  "C-M-A-G": {
    code: "C-M-A-G",
    cn: "双浪漫无性单偶者",
    en: "The Genderblind Romantic",
    tags: { zh: ["灵魂伴侣", "无性", "专注"], en: ["Soulmate", "Aro-spec soft", "Focused"] },
    moto: {
      zh: "我能对男女都动心，但不需要性，一次只爱一个。我的心像候鸟。",
      en: "Attracted to any gender romantically, no sex needed, one at a time. My heart migrates.",
    },
    desc: {
      zh: "每两三年换一个灵魂伴侣（无性），性别随机，每次都像全新的人生开始。前任们都觉得 ta 是史上最好的伴侣，然后悲伤地发现这段关系里一直没有性，而 ta 对此毫无遗憾。",
      en: "Every few years, a new soul-partner — different gender each time, always no sex. Every ex says you were the best partner they ever had, then gradually realizes the relationship was entirely platonic.",
    },
    dims: {
      CR: { zh: "外表合规，你的内心比外表复杂得多。", en: "Conforming on the outside. Far more complex on the inside." },
      OM: { zh: "精神上的吸引不被性别限定，但每次只专注一个人。", en: "Romantic attraction crosses all genders — but one at a time." },
      SA: { zh: "性对你无所谓——不是缺失，是你的浪漫语言里本来就没有这个词。", en: "Sex is irrelevant — not missing, just not in your romantic vocabulary." },
      GP: { zh: "一对一的专注感是你的自然选择。", en: "One-at-a-time focus is your natural mode." },
    },
    hue: { from: "#7ee8b5", to: "#40b070" },
  },
  "C-M-A-P": {
    code: "C-M-A-P",
    cn: "泛浪漫无性多元连接者",
    en: "The Communal Heart",
    tags: { zh: ["情感公社", "无性", "广泛"], en: ["Commune", "Ace", "Expansive"] },
    moto: {
      zh: "我能对所有人动心（无性），同时爱多个。我们是一个情感公社。",
      en: "Romantically open to all genders, no sex, multiple loves. We're an emotional commune.",
    },
    desc: {
      zh: "和三个人保持\"比朋友多一点\"的关系：一个陪吃饭，一个陪旅行，一个陪深夜崩溃。没有性，没有嫉妒，只有温暖绵延的纠缠。新朋友问\"你们是什么关系\"，所有人一起回答：\"情感公社。\"",
      en: "You maintain three \"more-than-friends\" relationships simultaneously: one for meals, one for travel, one for 3am breakdowns. No sex. No jealousy. Just warmth and entanglement.",
    },
    dims: {
      CR: { zh: "外表合规，内心是一个温暖的多节点情感网络。", en: "Conforming appearance. Internally, a warm multi-node emotional network." },
      OM: { zh: "不被任何性别限定，精神吸引是全方位的。", en: "Romantically open to all genders. Spiritually omnidirectional." },
      SA: { zh: "不需要性，情感陪伴是你全部的亲密语言。", en: "No need for sex. Emotional companionship is your entire intimacy language." },
      GP: { zh: "多元关系是你的自然状态，爱可以分享，不会变少。", en: "Poly is your nature. Love shared doesn't diminish." },
    },
    hue: { from: "#ffd93d", to: "#c0a020" },
  },
  "R-O-S-G": {
    code: "R-O-S-G",
    cn: "出格单性恋单偶者",
    en: "The Rebel Loyalist",
    tags: { zh: ["叛逆", "专一", "视觉主张"], en: ["Rebel", "Exclusive", "Visual-first"] },
    moto: {
      zh: "我只爱男/女，但我不按性别规范打扮。我变的是皮肤，不变的是输出。",
      en: "One gender only, but I dress how I want. The aesthetic changes; the attraction doesn't.",
    },
    desc: {
      zh: "今天穿裙子，明天穿工装，后天把两个都穿上。但伴侣类型从来不变。路人以为 ta 是非二元，其实 ta 只是不觉得\"打扮合规\"是他/她的义务。被问\"你到底是什么\"时答：\"我是你伴侣，今天穿裙子版本。\"",
      en: "Skirt today, cargo pants tomorrow, both at once on Sunday. But your attraction? Locked in. People assume you're non-binary — you're just someone who never felt obligated to dress for a gender.",
    },
    dims: {
      CR: { zh: "你主动打破性别规范，这是你选择的表达方式。", en: "You actively break gender norms. This is your chosen expression." },
      OM: { zh: "只被一种性别吸引，这一点在你所有的出格里是稳定的锚点。", en: "Attracted to one gender. This is the stable anchor in all your chaos." },
      SA: { zh: "性对你很重要，你用各种方式表达自己，床上也不例外。", en: "Sex matters to you. You express yourself fully in every context." },
      GP: { zh: "一对一，排他，这是你的承诺。", en: "Monogamous and exclusive. That's your commitment." },
    },
    hue: { from: "#ff6b6b", to: "#c03030" },
  },
  "R-O-S-P": {
    code: "R-O-S-P",
    cn: "出格单性恋多元者",
    en: "The Chameleon Collector",
    tags: { zh: ["千面", "固定取向", "多线"], en: ["Shapeshifter", "Fixed type", "Multi-thread"] },
    moto: {
      zh: "我的打扮随便，但我只睡一类人，可以同时睡多个。我不是渣，我是千面佛。",
      en: "I dress how I want, attracted to one type, dating multiples. Not a player — a multifaceted deity.",
    },
    desc: {
      zh: "性别表达每天不同，但被吸引的类型从来不变（比如只喜欢壮熊，或只喜欢御姐）。同时和几个喜欢的人约会，每个对象都以为 ta 是不同的人，因为 ta 今天是 A 版本，明天是 B 版本。",
      en: "Your presentation shifts daily, but your type is locked in. Currently dating three, each experiencing a different facet of you. \"You seem different today.\" \"I'm always different. That's the feature.\"",
    },
    dims: {
      CR: { zh: "你主动打破性别规范，每天都是不同的版本。", en: "You break gender norms actively. Every day is a new edition." },
      OM: { zh: "吸引对象固定（虽然不一定是性别，而是类型），这一点很一致。", en: "Attraction is fixed to a type — consistent even within your chaos." },
      SA: { zh: "性是你感受连接的核心方式。", en: "Sex is central to how you connect." },
      GP: { zh: "多元关系是你的自然状态，知情同意是前提。", en: "Multiple relationships feel natural. Consent is the only rule." },
    },
    hue: { from: "#4d96ff", to: "#2060c0" },
  },
  "R-O-A-G": {
    code: "R-O-A-G",
    cn: "出格无性单性恋守望者",
    en: "The Aesthetic Monk",
    tags: { zh: ["禅意", "精神吸引", "一对一"], en: ["Zen", "Spiritual pull", "One at a time"] },
    moto: {
      zh: "我的性别表达是谜，我只爱一种性别，不需要性，一次一个。都是，都不是，但我在。",
      en: "My gender is a riddle. One gender only. No sex. One at a time. I'm here, that's all.",
    },
    desc: {
      zh: "外表让所有人困惑，但内心非常清楚自己喜欢谁（就一种性别）。每隔几年对某个人产生强烈的精神依恋，关系里没有性，但有深刻的存在感。对方问\"你到底是男是女\"，ta 答：\"都是，都不是，但今天你归我。\"",
      en: "Your appearance confuses everyone. Your internal clarity is unshakeable. Deep spiritual attachment to one gender, one person at a time, never sexual.",
    },
    dims: {
      CR: { zh: "你打破性别规范，这是你存在方式的一部分。", en: "You break gender norms. It's part of how you exist." },
      OM: { zh: "只被一种性别吸引，尽管你自己的性别是流动的。", en: "Attracted to one gender — despite your own fluid presentation." },
      SA: { zh: "性对你来说不必要，精神陪伴是唯一的亲密需求。", en: "Sex unnecessary. Spiritual companionship is your only intimacy need." },
      GP: { zh: "一对一让你感到专注和真实。", en: "One-at-a-time feels focused and genuine." },
    },
    hue: { from: "#8884a8", to: "#5a5878" },
  },
  "R-O-A-P": {
    code: "R-O-A-P",
    cn: "出格无性多元灵魂团",
    en: "The Platonic Rebel Commune",
    tags: { zh: ["灵魂团", "同性群体", "共栖"], en: ["Soul-pack", "Same-gender tribe", "Co-living"] },
    moto: {
      zh: "我只被一种性别精神吸引，同时爱多个，不上床。我们是一株多肉，彼此提供水分。",
      en: "Spiritually one-gender-only, loving multiple, no sex. We're succulents sharing a root system.",
    },
    desc: {
      zh: "和三个同性维持灵魂姐妹/兄弟关系，一起租房、养猫、分享彼此的崩溃时刻。自己的打扮每天都在出格，但爱的方向从来不变。朋友问\"你们谁喜欢谁\"，所有人说：\"我们是一株多肉，请不要分开盆栽。\"",
      en: "Three same-gender soul-bonds. Shared apartment, shared cat, shared breakdowns. Your appearance breaks every norm daily, but your love direction never wavers.",
    },
    dims: {
      CR: { zh: "你打破性别规范，你的存在本身就是一种声明。", en: "You break norms. Your existence is the statement." },
      OM: { zh: "只有一种性别能在精神上吸引你，这一点稳定如磐石。", en: "Only one gender produces spiritual attraction. Stable as bedrock." },
      SA: { zh: "不需要性，精神陪伴是你全部的亲密需求。", en: "No sex needed. Spiritual companionship is everything." },
      GP: { zh: "多元爱是你的自然状态，无嫉妒，只有温暖。", en: "Plural love is your nature. No jealousy, only warmth." },
    },
    hue: { from: "#7ee8b5", to: "#40b070" },
  },
  "R-M-S-G": {
    code: "R-M-S-G",
    cn: "泛性别表达泛性恋单偶变色龙",
    en: "The Chameleon Monogamist",
    tags: { zh: ["镜像", "重启式", "专注"], en: ["Mirror", "Reinvent", "One at a time"] },
    moto: {
      zh: "我的性别和对方的性别都不重要，一次只爱一个人。我变成你喜欢的样子，但你喜欢的是我吗？",
      en: "Neither my gender nor yours matters. One at a time. I become what you love — but do you love me?",
    },
    desc: {
      zh: "每段关系都像重启人生：和 A 在一起时是一种风格，和 B 在一起时是完全不同的样子。分手后朋友认不出 ta。口头禅：\"我是一面镜子，但我也是镜子后面的人——你有没有好奇过那个人是谁？\"",
      en: "Every relationship is a system reboot. You become a different aesthetic with each partner. After breakups your friends don't recognize you.",
    },
    dims: {
      CR: { zh: "你打破性别规范，这是你身份表达的核心。", en: "You break gender norms. It's your identity's core language." },
      OM: { zh: "任何性别都可能吸引你，你爱的是人本身。", en: "Any gender. You love the person, not the category." },
      SA: { zh: "性对你很重要，是感受彼此真实存在的方式。", en: "Sex is important — it's how you feel each other's realness." },
      GP: { zh: "即使面对如此复杂的身份，你仍然选择一对一——这是你的专注仪式。", en: "Despite the complexity, you choose one-at-a-time. Monogamy is your focus ritual." },
    },
    hue: { from: "#c77dff", to: "#9050c0" },
  },
  "R-M-S-P": {
    code: "R-M-S-P",
    cn: "泛性别泛性恋多元宇宙体",
    en: "The Infinite Universe",
    tags: { zh: ["无边界", "全开", "宇宙级"], en: ["No borders", "All-access", "Cosmic"] },
    moto: {
      zh: "百无禁忌，同时爱所有人。标签是罐头，我是新鲜空气。",
      en: "No limits, loving everyone simultaneously. Labels are cans. I'm fresh air.",
    },
    desc: {
      zh: "同时与男人、女人、非二元约会，自己的性别表达每天不同。在所有场合如鱼得水，昨天是他，今天是她，明天是那个用 it/its 的朋友，后天仨一起吃火锅。",
      en: "Dating across every gender simultaneously. Your own expression shifts daily. Yesterday you were him, today her, tomorrow you're having hotpot with all three.",
    },
    dims: {
      CR: { zh: "你彻底打破性别规范，而且你以此为乐。", en: "You obliterate gender norms and genuinely enjoy doing so." },
      OM: { zh: "不被任何性别限定，对人的吸引力是全方位开放的。", en: "Unlimited attraction. All genders. All people." },
      SA: { zh: "性是你体验亲密和连接的核心语言。", en: "Sex is central to how you experience connection." },
      GP: { zh: "多元关系是你的存在方式，不是选择。", en: "Polyamory isn't a choice — it's how you exist." },
    },
    hue: { from: "#ff9f43", to: "#c06820" },
  },
  "R-M-A-G": {
    code: "R-M-A-G",
    cn: "泛浪漫无性单偶守护者",
    en: "The Silent Devoted",
    tags: { zh: ["诗意", "沉默", "无条件"], en: ["Poetic", "Silent", "Unconditional"] },
    moto: {
      zh: "我能被任何性别精神吸引，但一次只专注一个，不上床。我爱你，与你无关。",
      en: "Romantically open to all genders, one at a time, no sex. I love you — that has nothing to do with you.",
    },
    desc: {
      zh: "每几年遇到一个\"灵魂地震\"，对方性别随机，关系无性。会为对方写诗、偷偷画画像，但绝不表白——怕说出来反而失去那种微妙的平衡。对方结婚了 ta 还默默送了一束花，没有署名。",
      en: "Every few years, a soul-earthquake arrives in an unpredictable gender. You write poems. You sketch their face in private. You never confess — it would ruin the balance.",
    },
    dims: {
      CR: { zh: "你打破性别规范，这是你对这个世界的回应方式。", en: "You break gender norms. It's how you respond to the world." },
      OM: { zh: "精神上对所有性别开放，你爱的是灵魂本身。", en: "Spiritually open to all genders. You love souls, not bodies." },
      SA: { zh: "性不在你的亲密需求里，情感共鸣是唯一的必需品。", en: "Sex is absent from your intimacy needs. Emotional resonance is the only requirement." },
      GP: { zh: "每次只专注一个人，这是你爱的仪式感。", en: "One at a time. This is your love ritual." },
    },
    hue: { from: "#ee7e9a", to: "#b04060" },
  },
  "R-M-A-P": {
    code: "R-M-A-P",
    cn: "泛浪漫无性多元宇宙命运共同体",
    en: "The Cosmic Commune",
    tags: { zh: ["命运共同体", "非人类逻辑", "星际"], en: ["Chosen family", "Beyond labels", "Interstellar"] },
    moto: {
      zh: "我能同时和所有人精神恋爱，不上床。别问，问就是命运共同体。",
      en: "Spiritually in love with everyone simultaneously. No sex. Don't ask — we're a cosmic commune.",
    },
    desc: {
      zh: "和五个不同性别、不同背景的人住在一起，共用洗衣机、一起做饭、偶尔集体抱头痛哭，没有人定义关系。自己的性别表达每天都在打破规范。新朋友问\"你们谁和谁是一对\"，所有人异口同声：\"我们是命运共同体，请不要用人类的恋爱逻辑解释我们。\"",
      en: "Five housemates, different genders, shared laundry, communal cooking, occasional group crying. No defined relationships. Your gender changes daily.",
    },
    dims: {
      CR: { zh: "你彻底打破性别规范，你的存在是对所有规范的温柔颠覆。", en: "You obliterate gender norms. Your existence is a gentle subversion of everything." },
      OM: { zh: "对所有性别开放，精神吸引无边界。", en: "Spiritually open to all genders. No boundaries on attraction." },
      SA: { zh: "不需要性，情感的缠绕和陪伴才是你的亲密语言。", en: "No sex needed. Emotional entanglement and companionship are your language." },
      GP: { zh: "多元关系不是你的选择，是你的存在方式。", en: "Polyamory isn't chosen — it's how you exist." },
    },
    hue: { from: "#4d96ff", to: "#2060c0" },
  },
};

export function isTypeCode(s: string): s is TypeCode {
  return (TYPE_CODES as readonly string[]).includes(s);
}

export function getType(code: TypeCode): Persona {
  return TYPES[code];
}
