import { z } from "zod";
import { DIMENSIONS } from "./dimensions";

const OptionSchema = z.object({
  zh: z.string(),
  en: z.string(),
  v: z.union([z.literal(1), z.literal(2), z.literal(3)]),
});

const QuestionSchema = z.object({
  id: z.string(),
  dim: z.enum(DIMENSIONS),
  zh: z.string(),
  en: z.string(),
  opts: z.tuple([OptionSchema, OptionSchema, OptionSchema]),
});

export type Option = z.infer<typeof OptionSchema>;
export type Question = z.infer<typeof QuestionSchema>;

const QUESTIONS_RAW: Question[] = [
  // DIM 1: CR — Gender Expression Conformity
  {
    id: "cr1",
    dim: "CR",
    zh: "你平时的穿着打扮：",
    en: "Your everyday style:",
    opts: [
      { zh: "基本符合自己性别的社会期待，买衣服默认走男装区或女装区。", en: "Mostly aligns with gender expectations — you shop in the \"right\" section.", v: 1 },
      { zh: "大部分合规，但偶尔会穿一些\"越界\"的单品，享受别人的眼神。", en: "Mostly conventional, but occasionally throw in a genre-bending piece.", v: 2 },
      { zh: "男装女装随便穿，今天心情决定，性别标签不是你的老板。", en: "Whatever you feel like. Gender labels are not your manager.", v: 3 },
    ],
  },
  {
    id: "cr2",
    dim: "CR",
    zh: "有人说\"你打扮得不像你的性别\"，你会：",
    en: "Someone says \"you don't dress like your gender.\" You:",
    opts: [
      { zh: "有点在意，可能解释一下或者下次注意。", en: "Feel mildly bothered and consider adjusting.", v: 1 },
      { zh: "无所谓，但也不会特意去挑战。", en: "Shrug it off, but not deliberately pushing back either.", v: 2 },
      { zh: "\"谢谢夸奖。\"然后原地转个圈继续走。", en: "\"Thanks for the compliment.\" Then do a little spin and walk away.", v: 3 },
    ],
  },
  {
    id: "cr3",
    dim: "CR",
    zh: "你上公共厕所会：",
    en: "Public restrooms — you go into:",
    opts: [
      { zh: "进符合自己性别认同的那间，这是基本操作。", en: "The one matching your gender identity. Obviously.", v: 1 },
      { zh: "一般进符合的那间，但如果对面没人排队也会直接进。", en: "Usually the matching one, but sneak into the empty one if needed.", v: 2 },
      { zh: "哪个空进哪个，性别标志牌不是针对你设计的。", en: "Whichever is empty. Those signs aren't directed at you personally.", v: 3 },
    ],
  },
  {
    id: "cr4",
    dim: "CR",
    zh: "填表格遇到\"性别：男/女\"，你会：",
    en: "A form asks \"Gender: Male / Female\". You:",
    opts: [
      { zh: "选一个，有一个更符合我的。", en: "Pick one — one of them is accurate enough.", v: 1 },
      { zh: "选一个但内心不舒服，希望有更多选项。", en: "Pick one, but feel mildly annoyed there are only two.", v: 2 },
      { zh: "想划掉整个选项，在旁边写\"以上皆非\"或画个彩虹。", en: "Want to cross it out and write \"none of the above\" or draw a rainbow.", v: 3 },
    ],
  },
  {
    id: "cr5",
    dim: "CR",
    zh: "别人第一次见到你，通常能准确判断你的性别吗？",
    en: "When people meet you for the first time, can they usually read your gender correctly?",
    opts: [
      { zh: "能，我的外表基本符合社会对我性别的预期。", en: "Yes — I present within expected norms.", v: 1 },
      { zh: "有时候不确定，但我不会特意纠正或强调。", en: "Sometimes uncertain — I don't bother correcting them.", v: 2 },
      { zh: "经常判断错，或者\"ta 不好判断\"——我不介意，甚至有点享受这种模糊。", en: "\"Hard to read\" is basically my brand. I enjoy the ambiguity.", v: 3 },
    ],
  },
  {
    id: "cr6",
    dim: "CR",
    zh: "你在正式场合（工作/家庭聚会）的打扮：",
    en: "At formal occasions (work, family events):",
    opts: [
      { zh: "在性别规范内，正式场合我不想因为外表制造额外讨论。", en: "Stay within gender norms. Not the time or place for a statement.", v: 1 },
      { zh: "会稍微收敛，但还是有几个\"个人签名\"细节。", en: "Tone it down a bit, but keep a few signature personal touches.", v: 2 },
      { zh: "正式场合也是我，不会为了\"看起来专业\"而假装合规。", en: "Same as always. Professionalism isn't a gender uniform.", v: 3 },
    ],
  },
  {
    id: "cr7",
    dim: "CR",
    zh: "你小时候玩的玩具和游戏：",
    en: "Growing up, the toys and games you played:",
    opts: [
      { zh: "基本是自己性别\"应该\"玩的那类，没有觉得哪里不对。", en: "Mostly what was expected for your gender — felt natural.", v: 1 },
      { zh: "混着玩，但没有特别意识到这跟性别有关。", en: "A mix, but didn't consciously connect it to gender.", v: 2 },
      { zh: "经常玩\"另一个性别的\"东西，或者根本没按性别划分过。", en: "Consistently crossed the gender toy aisle. Never really sorted by gender.", v: 3 },
    ],
  },
  {
    id: "cr8",
    dim: "CR",
    zh: "关于性别规范，你的整体态度是：",
    en: "Your general attitude toward gender norms:",
    opts: [
      { zh: "遵守不代表认同，只是更省力，不想每天解释自己。", en: "Following them is just easier — not an endorsement, just efficiency.", v: 1 },
      { zh: "有些规范合理，有些不合理，选择性遵守。", en: "Some make sense, some don't — pick and choose.", v: 2 },
      { zh: "它主要是用来限制人的，我的存在本身就是一种挑战。", en: "Mostly a control mechanism. My existence is already a challenge to them.", v: 3 },
    ],
  },
  {
    id: "cr9",
    dim: "CR",
    zh: "你对自己外表性别信号（发型、妆容、配饰）的态度：",
    en: "Your attitude toward gender signals in your appearance (hair, makeup, accessories):",
    opts: [
      { zh: "会考虑，不想给人发送\"错误\"信息。", en: "Pay attention to them — don't want to send the wrong message.", v: 1 },
      { zh: "偶尔会有意混搭，但不是每天的功课。", en: "Occasionally mix them up deliberately, but it's not a daily mission.", v: 2 },
      { zh: "爱怎么搭就怎么搭，别人怎么读取是他们的事。", en: "Style as you please — how others read it is their problem.", v: 3 },
    ],
  },
  {
    id: "cr10",
    dim: "CR",
    zh: "如果你的伴侣希望你在公开场合打扮得\"更符合性别\"，你会：",
    en: "If a partner asked you to dress \"more gender-appropriate\" in public, you would:",
    opts: [
      { zh: "可以理解他们的想法，愿意适当调整。", en: "Understand their perspective and be willing to adjust somewhat.", v: 1 },
      { zh: "会讨论，但不会完全牺牲自己的风格。", en: "Have a conversation — but won't completely sacrifice your style.", v: 2 },
      { zh: "这会成为我们关系的一个根本性问题。我不会改，ta 得接受这一点。", en: "This would be a dealbreaker conversation. I won't change; they need to accept me.", v: 3 },
    ],
  },

  // DIM 2: OM — Attraction Range
  {
    id: "om1",
    dim: "OM",
    zh: "回想过去五年，你心动/喜欢过的对象，他们的性别：",
    en: "Think about the last 5 years — the gender(s) of people you've had crushes on:",
    opts: [
      { zh: "只有一种性别，就一种，没有例外，感谢发问。", en: "One gender only. No exceptions. Thanks for asking.", v: 1 },
      { zh: "主要是一种，但偶尔会有跨越的情况，让我自己也困惑。", en: "Mostly one, with occasional exceptions that confuse even me.", v: 2 },
      { zh: "不止一种，或者根本没按性别分类过。", en: "More than one — or I never sorted by gender in the first place.", v: 3 },
    ],
  },
  {
    id: "om2",
    dim: "OM",
    zh: "你在交友软件上看到一个人写\"只找同性\"，你会：",
    en: "On a dating app, someone writes \"same gender only.\" You think:",
    opts: [
      { zh: "\"很好，我也是。\"清晰边界，节省时间，职业素养。", en: "\"Same energy.\" Clear boundaries, saves time, very professional.", v: 1 },
      { zh: "尊重，但我自己没办法这么确定地写出来。", en: "Respect it, but I couldn't write that about myself so confidently.", v: 2 },
      { zh: "\"锁死一种性别感觉好浪费，万一遇到特别的人呢？\"", en: "\"Locking into one gender feels like leaving options on the table.\"", v: 3 },
    ],
  },
  {
    id: "om3",
    dim: "OM",
    zh: "如果你喜欢的人突然宣布要跨性别，你会：",
    en: "The person you're dating announces they're transitioning. You:",
    opts: [
      { zh: "大概率会失去感觉——因为我喜欢的确实是那种特定性别本身。", en: "Probably lose feelings — the specific gender was genuinely part of the attraction.", v: 1 },
      { zh: "会震惊，需要时间处理，但不会立刻离开。", en: "Be shocked, need time to process, but won't immediately leave.", v: 2 },
      { zh: "没关系，我喜欢的是这个人，性别是 ta 的皮肤，不是 ta 的灵魂。", en: "Fine by me — I love the person, not their gender. Gender is skin, not soul.", v: 3 },
    ],
  },
  {
    id: "om4",
    dim: "OM",
    zh: "你认为你能对哪些性别产生浪漫或情感上的吸引？",
    en: "Which genders do you think you could be romantically or sexually attracted to?",
    opts: [
      { zh: "只有男性，或只有女性。非常确定，不用考虑。", en: "Only men, or only women. Very certain. No deliberation needed.", v: 1 },
      { zh: "主要是一种，但在特定情况下可能有例外。", en: "Mainly one, but there could be exceptions in specific circumstances.", v: 2 },
      { zh: "男性、女性、非二元都有可能，取决于具体的人而不是性别标签。", en: "Men, women, non-binary — depends on the person, not the label.", v: 3 },
    ],
  },
  {
    id: "om5",
    dim: "OM",
    zh: "你的朋友问：\"你到底喜欢男的还是女的？\"你会：",
    en: "Your friend asks: \"So do you like guys or girls?\" You say:",
    opts: [
      { zh: "\"男的。\"或\"女的。\"简洁明了，不需要补充。", en: "\"Guys.\" or \"Girls.\" Simple. No footnotes.", v: 1 },
      { zh: "说一个答案，但其实那个答案并不完全准确，只是最省事的解释。", en: "Give a simple answer that's not fully accurate but easiest to explain.", v: 2 },
      { zh: "\"都行，看人。\"或者\"你问这个干嘛，管你啥事？\"", en: "\"Either, depends on the person.\" Or \"why do you ask, honestly?\"", v: 3 },
    ],
  },
  {
    id: "om6",
    dim: "OM",
    zh: "你走在街上，什么样的人会让你多看一眼？",
    en: "Walking down the street — what kind of person makes you look twice?",
    opts: [
      { zh: "只有特定性别的人，非常一致，从来没有例外。", en: "Only one specific gender — totally consistent, never an exception.", v: 1 },
      { zh: "主要是一种性别，但偶尔某个不同性别的人也会让我多看。", en: "Mainly one gender, but occasionally someone else catches my eye.", v: 2 },
      { zh: "各种性别都有可能，有时候完全不是性别吸引我，而是气场或眼神。", en: "Any gender — sometimes it's not even about gender, it's the energy.", v: 3 },
    ],
  },
  {
    id: "om7",
    dim: "OM",
    zh: "如果你发现你的伴侣是双性恋/泛性恋，你会：",
    en: "You find out your partner is bi/pan. You:",
    opts: [
      { zh: "有点不安，会担心 ta 是不是还想要另一种性别——逻辑上不成立但情绪上就是这样。", en: "Feel slightly anxious — \"are they missing another gender?\" Illogical but emotional.", v: 1 },
      { zh: "需要一点时间消化，但最终接受，因为行动才是证明。", en: "Need a moment to digest, but ultimately okay — actions speak louder.", v: 2 },
      { zh: "完全没问题，甚至觉得\"我们理解彼此\"或者\"我也是\"。", en: "No problem at all — \"we understand each other\" or \"same tbh.\"", v: 3 },
    ],
  },
  {
    id: "om8",
    dim: "OM",
    zh: "你对自己吸引取向标签的确定性：",
    en: "How certain are you about your attraction orientation label?",
    opts: [
      { zh: "非常确定，我就是同性恋/异性恋，不用再想了，谢谢。", en: "Very certain. Gay or straight. Done. No further thought needed.", v: 1 },
      { zh: "大体确定，但偶尔会在某些人身上犯嘀咕。", en: "Mostly certain, but occasionally second-guess myself around specific people.", v: 2 },
      { zh: "不太确定，任何单一标签都装不下我，\"流动\"可能更准确。", en: "Not certain — no single label fits. \"Fluid\" might be the most honest answer.", v: 3 },
    ],
  },
  {
    id: "om9",
    dim: "OM",
    zh: "你在看喜欢的类型内容时，性别是搜索条件吗？",
    en: "When browsing content you find attractive, is gender a search filter?",
    opts: [
      { zh: "是的，必须的，不然结果太杂了。", en: "Yes, absolutely — otherwise it's too broad.", v: 1 },
      { zh: "有时候是，有时候不是，看心情。", en: "Sometimes yes, sometimes no — depends on my mood.", v: 2 },
      { zh: "不太是，我更关注气质、类型、能量，不是性别本身。", en: "Not really — I filter by vibe, type, energy. Not gender itself.", v: 3 },
    ],
  },
  {
    id: "om10",
    dim: "OM",
    zh: "你对\"泛性恋\"（对所有性别都可能产生吸引）的理解是：",
    en: "Your understanding of \"pansexual\" (attracted to all genders):",
    opts: [
      { zh: "存在且合理，只是跟我没关系，我的吸引对象非常固定。", en: "Valid and real — just doesn't apply to me. Mine is very fixed.", v: 1 },
      { zh: "我大概理解，但不确定自己是不是。", en: "I sort of understand it — not sure if it applies to me.", v: 2 },
      { zh: "我就是，或者这个词比\"异/同性恋\"更准确地描述了我。", en: "This is me, or at least more accurate than gay/straight.", v: 3 },
    ],
  },

  // DIM 3: SA — Sexual vs Asexual spectrum
  {
    id: "sa1",
    dim: "SA",
    zh: "你和暧昧对象约在私密空间，对方说\"今晚只想抱着聊天，不做别的\"，你会：",
    en: "You're alone with your crush. They say \"I just want to cuddle and talk tonight.\" You:",
    opts: [
      { zh: "表面说\"好\"，内心：这不是约好的剧情啊。", en: "Say \"sure\" while internally thinking this isn't what you rehearsed.", v: 1 },
      { zh: "有点失落，但也觉得陪伴本身挺好的，下次吧。", en: "Slightly disappointed but genuinely enjoy the closeness anyway.", v: 2 },
      { zh: "\"好啊。\"然后真的开心地抱了一整晚，完全不觉得少了什么。", en: "\"Great!\" And genuinely feel 100% fulfilled by a night of cuddling.", v: 3 },
    ],
  },
  {
    id: "sa2",
    dim: "SA",
    zh: "你手机相册\"个人收藏\"里存的最多的是：",
    en: "Your phone's \"personal favorites\" album contains mostly:",
    opts: [
      { zh: "让你心跳加速的图片和内容、让你怦然心动的人。", en: "Heart-racing images, content that excites you, people who make your pulse jump.", v: 1 },
      { zh: "混着——有风景猫猫，也有一些让你心动的人。", en: "A mix — landscapes and cats, plus some people who catch your eye.", v: 2 },
      { zh: "风景、猫、食物、朋友的表情包、让你平静的图。", en: "Scenery, cats, food, memes from friends, things that bring you peace.", v: 3 },
    ],
  },
  {
    id: "sa3",
    dim: "SA",
    zh: "你和一个很心动的人约会三次后，对方说\"我想慢慢来，半年内不打算有性\"，你会：",
    en: "After 3 great dates, they say \"I'd like to take things slow — no sex for 6 months.\" You:",
    opts: [
      { zh: "\"那我们的节奏可能不太合适……\"然后开始犹豫要不要继续。", en: "\"Our timelines might not match...\" Start wondering if you should continue.", v: 1 },
      { zh: "有点犹豫，但愿意尝试，看感情能不能先发展。", en: "Hesitant, but willing to try — see if emotional connection builds first.", v: 2 },
      { zh: "\"没问题，我们可以先去爬山、看展、一起发呆。\"认真的。", en: "\"Perfect — let's hike, visit galleries, and stare at nothing together.\" Genuinely.", v: 3 },
    ],
  },
  {
    id: "sa4",
    dim: "SA",
    zh: "你对\"无感情基础的约会\"的态度是：",
    en: "Your attitude toward casual, no-strings dating:",
    opts: [
      { zh: "可以接受，只要双方真实意愿一致、安全。", en: "Fine with it, maybe done it — as long as it's safe and consensual.", v: 1 },
      { zh: "理解为什么别人会，但我自己需要一点情感基础。", en: "Understand why others do it, but personally need some emotional foundation.", v: 2 },
      { zh: "不太感兴趣，或完全不感兴趣——不是道德评判，就是没有这种需求。", en: "Not interested — or zero interest. Not a judgment, just no drive.", v: 3 },
    ],
  },
  {
    id: "sa5",
    dim: "SA",
    zh: "你上一次主动产生\"想要性\"的冲动是什么时候？",
    en: "When did you last spontaneously feel sexual desire?",
    opts: [
      { zh: "最近一周内，正常频率，不值得特别说明。", en: "Within the last week. Normal frequency, not worth noting.", v: 1 },
      { zh: "大概一个月内，或者需要对方主动才有反应。", en: "Within the past month, or mainly responsive rather than spontaneous.", v: 2 },
      { zh: "一个月以上 / 很久 / 需要想想 / 可能从来没有过？", en: "Over a month / a long time / I'd have to think / possibly never?", v: 3 },
    ],
  },
  {
    id: "sa6",
    dim: "SA",
    zh: "你更害怕哪种情况？",
    en: "Which scenario scares you more?",
    opts: [
      { zh: "伴侣深爱我的灵魂，却对我的身体毫无欲望。", en: "Partner deeply loves my soul but has zero physical desire for me.", v: 1 },
      { zh: "前者更让我不安，但后者也很糟——身体亲密对我来说需要情感基础才有意义。", en: "The first scares me more, but the second is also bad — physical intimacy only means something with emotional depth.", v: 2 },
      { zh: "伴侣只想要我的身体，却不在意我是什么人。", en: "Partner only wants my body and doesn't care who I actually am.", v: 3 },
    ],
  },
  {
    id: "sa7",
    dim: "SA",
    zh: "你在亲密关系里，性的位置是：",
    en: "In a romantic relationship, sex plays the role of:",
    opts: [
      { zh: "非常重要，是连接彼此的核心方式之一，缺席了关系会很不完整。", en: "Central — one of the core ways I connect. The relationship feels incomplete without it.", v: 1 },
      { zh: "重要，但不是唯一核心，情感连接同样不可缺少。", en: "Important, but not the only core — emotional connection matters just as much.", v: 2 },
      { zh: "可有可无，情感连接、陪伴和理解才是更核心的东西。", en: "Optional — companionship and emotional understanding are far more central.", v: 3 },
    ],
  },
  {
    id: "sa8",
    dim: "SA",
    zh: "你对\"无性恋\"（asexual，对他人不产生吸引冲动）的理解：",
    en: "Your understanding of \"asexual\" (not experiencing attraction impulses):",
    opts: [
      { zh: "存在，但我截然相反，我对他人有很强的吸引感受。", en: "Valid — but the opposite of me. I definitely experience strong attraction.", v: 1 },
      { zh: "存在，而且我有时候觉得自己可能偏向这一侧。", en: "Valid — and I sometimes wonder if I lean toward this end.", v: 2 },
      { zh: "我就在那个谱系上，或者\"灰色性恋\"更接近描述我。", en: "This is me, or \"grey-asexual\" is more accurate.", v: 3 },
    ],
  },
  {
    id: "sa9",
    dim: "SA",
    zh: "你理想中的周末早晨是：",
    en: "Your ideal Sunday morning:",
    opts: [
      { zh: "被吻醒，然后赖床到中午，外卖放门口，下午继续懒着。", en: "Wake up to kisses, stay in bed until noon, delivery at the door, a perfectly lazy day.", v: 1 },
      { zh: "慵懒地醒来，亲吻拥抱，然后一起做早餐。", en: "Lazy wake-up, kissing, cuddling, then make breakfast together.", v: 2 },
      { zh: "一起做早餐，坐在窗边聊天，亲一下额头就够了——真的够了。", en: "Make breakfast together, chat by the window, a forehead kiss. That's genuinely enough.", v: 3 },
    ],
  },
  {
    id: "sa10",
    dim: "SA",
    zh: "如果你的伴侣突然无法进行亲密接触，你会：",
    en: "If your partner suddenly lost the ability to be physically intimate, you would:",
    opts: [
      { zh: "很难接受，这对我来说是关系完整性的重要组成部分。", en: "Struggle with it — this is an important part of relationship completeness for me.", v: 1 },
      { zh: "需要调整，但相信我们可以找到其他方式维持亲密。", en: "Need to adjust, but believe you could find other ways to stay intimate.", v: 2 },
      { zh: "完全不影响。我们还有一百种方式亲密，那只是其中一种。", en: "Completely fine. There are a hundred ways to be intimate — that's just one.", v: 3 },
    ],
  },

  // DIM 4: GP — Relationship Structure
  {
    id: "gp1",
    dim: "GP",
    zh: "你发现你的伴侣和另一个人接吻了，你的第一反应是：",
    en: "You find out your partner kissed someone else. First reaction:",
    opts: [
      { zh: "\"完了，天塌了。\"不管什么背景，先崩一下再说。", en: "\"Everything is ruined.\" Full stop. Figure out context later.", v: 1 },
      { zh: "非常难受，但先听对方解释，再决定下一步。", en: "Devastated, but listen to their explanation before deciding anything.", v: 2 },
      { zh: "\"等等，先停下，安全措施做了吗？我们谈谈边界。\"", en: "\"Wait, hold on — did they use protection? Let's discuss our boundaries.\"", v: 3 },
    ],
  },
  {
    id: "gp2",
    dim: "GP",
    zh: "你同时和两个人约会，两人都不知道对方存在，你会：",
    en: "You're dating two people simultaneously. Neither knows about the other. You:",
    opts: [
      { zh: "非常痛苦，必须立刻二选一，这种状态让我觉得自己是坏人。", en: "Feel terrible — must choose immediately. This makes you feel like a bad person.", v: 1 },
      { zh: "有点内疚，但还在观望，等感情更明朗再做决定。", en: "Feel slightly guilty but observing — waiting for feelings to clarify.", v: 2 },
      { zh: "如果他们知情同意，我不认为这有什么问题。爱不是稀缺资源。", en: "If they were consensually informed, you wouldn't see the issue. Love isn't scarce.", v: 3 },
    ],
  },
  {
    id: "gp3",
    dim: "GP",
    zh: "你对\"开放式关系\"的看法是：",
    en: "Your view on open relationships:",
    opts: [
      { zh: "理解它存在，但对我来说就是给出轨找借口，接受不了。", en: "Understand they exist, but for you it's just a cover for cheating.", v: 1 },
      { zh: "可以理解，但自己不确定能不能做到，需要非常强的信任基础。", en: "Can understand them — but unsure if you could manage it. Requires extreme trust.", v: 2 },
      { zh: "挺合理，一个人真的满足不了另一个人所有维度的需求。", en: "Makes a lot of sense — one person genuinely can't meet every need.", v: 3 },
    ],
  },
  {
    id: "gp4",
    dim: "GP",
    zh: "你的嫉妒程度：",
    en: "Your jealousy level:",
    opts: [
      { zh: "偏高，伴侣和某个特定的人走得太近我会本能地不舒服。", en: "High — if your partner gets close to someone specific you get instinctively uncomfortable.", v: 1 },
      { zh: "中等，一般不吃醋，但如果对方开始隐瞒事情就不行了。", en: "Moderate — usually fine, but secrecy triggers it immediately.", v: 2 },
      { zh: "偏低，甚至看到伴侣和别人很开心我也会觉得高兴（compersion）。", en: "Low to nonexistent — seeing your partner happy with others actually makes you happy.", v: 3 },
    ],
  },
  {
    id: "gp5",
    dim: "GP",
    zh: "你理想的长期关系形态是：",
    en: "Your ideal long-term relationship structure:",
    opts: [
      { zh: "一对一，彼此排他，这是我安全感的来源。", en: "Monogamous and exclusive. This is where your security lives.", v: 1 },
      { zh: "默认一对一，但如果双方都同意，可以讨论边界调整。", en: "Default monogamous, but open to discussing adjustments if both agree.", v: 2 },
      { zh: "可以协商开放，或者多元家庭/共居——只要大家诚实且快乐。", en: "Negotiably open, or a chosen family structure — honesty and happiness above all.", v: 3 },
    ],
  },
  {
    id: "gp6",
    dim: "GP",
    zh: "如果你的伴侣提出\"我想和你以及另一个人一起生活\"，你会：",
    en: "Your partner says \"I want us to live with someone else I'm also in a relationship with.\" You:",
    opts: [
      { zh: "\"不行，我做不到。\"这条线很清晰。", en: "\"Absolutely not.\" That's a firm line.", v: 1 },
      { zh: "非常惊讶，需要很长时间才能消化，结果不确定。", en: "Very surprised — need a long time to process. Outcome uncertain.", v: 2 },
      { zh: "\"可以谈，但先要定好边界和规则。\"不排斥探索。", en: "\"Let's talk, but we need to set boundaries and rules first.\" Open to exploring.", v: 3 },
    ],
  },
  {
    id: "gp7",
    dim: "GP",
    zh: "你对\"多人同时约会\"的态度：",
    en: "Your attitude toward dating multiple people at once:",
    opts: [
      { zh: "听起来就很复杂，嫉妒感会把我淹没。", en: "Even thinking about it is destabilizing — jealousy would overwhelm you.", v: 1 },
      { zh: "好奇过，但实际操作起来感觉会很复杂，不确定能处理好。", en: "Curious in theory, but the practicalities seem complicated.", v: 2 },
      { zh: "不排斥，甚至好奇，具体看人和时机。", en: "Open to exploring, even curious. Depends on the people and timing.", v: 3 },
    ],
  },
  {
    id: "gp8",
    dim: "GP",
    zh: "你手机里有没有同时和多个暧昧对象保持联系？",
    en: "Do you currently text-flirt with multiple people at once?",
    opts: [
      { zh: "没有，一旦认真了我就只聊一个，不然觉得对人不公平。", en: "No — once you're serious about someone, you focus. It feels unfair otherwise.", v: 1 },
      { zh: "有，但在刚开始了解阶段，一旦决定了就会收缩。", en: "Yes, during early stages — once committed, you narrow down.", v: 2 },
      { zh: "有，而且我觉得这很正常，不必要在正式化之前就封闭自己。", en: "Yes, and you think it's totally normal — no need to close off before things are official.", v: 3 },
    ],
  },
  {
    id: "gp9",
    dim: "GP",
    zh: "你看到一对开放式关系的情侣公开分享他们的故事，你内心：",
    en: "You see an open-relationship couple publicly sharing their story. Internally:",
    opts: [
      { zh: "\"祝福你们，但我完全做不到。\"钦佩但无法共情。", en: "\"Good for them.\" Respect but zero personal resonance.", v: 1 },
      { zh: "\"好奇，但感觉很难，也许适合某些人吧。\"", en: "\"Interesting — seems hard, but maybe right for some people.\"", v: 2 },
      { zh: "\"好棒，这才是诚实的关系形态。\"或者\"我以前就是这样。\"", en: "\"Honestly goals.\" Or \"I used to live like this.\"", v: 3 },
    ],
  },
  {
    id: "gp10",
    dim: "GP",
    zh: "你在亲密关系中的核心需求是：",
    en: "Your core need in an intimate relationship:",
    opts: [
      { zh: "安全感和唯一性——知道我是那个特别的人，其他人不行。", en: "Security and exclusivity — knowing you're the one. No sharing.", v: 1 },
      { zh: "信任和诚实——只要对方不欺骗我，形式可以谈。", en: "Trust and honesty — as long as there's no deception, structure is negotiable.", v: 2 },
      { zh: "自由和真实——能做自己，不被关系框架限制成某种固定角色。", en: "Freedom and authenticity — be yourself, unconstrained by role expectations.", v: 3 },
    ],
  },
];

export const QUESTIONS: readonly Question[] = z
  .array(QuestionSchema)
  .parse(QUESTIONS_RAW);

export const QUESTION_COUNT = QUESTIONS.length;
