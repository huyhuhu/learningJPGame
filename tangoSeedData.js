// ===== TANGO-CHO SEED DATA =====
// Developer-editable initial questions for new users.
//
// To add/update seed questions:
//   1. Edit the `questions`, `kanji`, and `words` below.
//   2. Bump `version` — existing users will get new items merged in
//      (their own edits/additions are never overwritten).
//
// Question format:
//   - question:    the prompt text. Wrap target words in |...| to highlight.
//   - choices:     array of 2-4 options.
//   - answer:      must match one entry in `choices` exactly.
//   - explanation: (optional) text shown after the user answers — for notes,
//                  reading hints, grammar tips, etc.
//
// Kanji / words format:
//   - Key = the character or word.
//   - reading: hiragana/katakana reading(s).
//   - meaning: short English meaning.

const TANGO_SEED_DATA = {
    version: 3,

    questions: [
        {
            id: "seed-1",
            question: "What is the meaning of |新|?",
            choices: ["new", "old", "big", "small"],
            answer: "new",
            explanation: "新 (しん / あたら) means 'new'. Appears in: 新しい (new), 新聞 (newspaper), 最新 (latest)."
        },
        {
            id: "seed-2",
            question: "How to read |新しい|くるまですね?",
            choices: ["あたらしい", "あだらしい", "あらたしい", "あらだしい"],
            answer: "あたらしい",
            explanation: "新しい is read あたらしい. Watch out — it is NOT あらたしい (a common mistake)."
        },
        {
            id: "seed-3",
            question: "|学校|へ行きます。 What does 学校 mean?",
            choices: ["school", "library", "hospital", "station"],
            answer: "school",
            explanation: "学校 (がっこう) = school. 学 = study/learning, 校 = school."
        },
        {
            id: "seed-4",
            question: "How to read |車|?",
            choices: ["くるま", "うま", "とり", "いぬ"],
            answer: "くるま",
            explanation: "車 = くるま (car/vehicle). On'yomi: しゃ (used in compounds like 自動車 jidousha)."
        },
        {
            id: "seed-5",
            question: "毎日 |日本語| を べんきょうします。 What is 日本語?",
            choices: ["Japanese language", "Chinese language", "English language", "Korean language"],
            answer: "Japanese language",
            explanation: "日本語 (にほんご) = Japanese language. 日本 (Japan) + 語 (language)."
        },

        // ===== Week 2 — Numbers, days, and basic kanji =====
        {
            id: "seed-6",
            question: "What is the meaning of |山|?",
            choices: ["mountain", "river", "sea", "sky"],
            answer: "mountain",
            explanation: "山 (やま / さん) = mountain. Famous example: 富士山 (ふじさん) = Mt. Fuji."
        },
        {
            id: "seed-7",
            question: "What is the meaning of |人|?",
            choices: ["person", "child", "friend", "family"],
            answer: "person",
            explanation: "人 (ひと / じん / にん) = person. 日本人 (にほんじん) = Japanese person, 三人 (さんにん) = 3 people."
        },
        {
            id: "seed-8",
            question: "What is the meaning of |円|?",
            choices: ["yen / circle", "money in general", "coin", "ticket"],
            answer: "yen / circle",
            explanation: "円 (えん) = yen, the Japanese currency. Original meaning is 'circle' (まるい). 千円 (せんえん) = 1000 yen."
        },
        {
            id: "seed-9",
            question: "How to read |9時|?",
            choices: ["くじ", "きゅうじ", "ここのじ", "きゅじ"],
            answer: "くじ",
            explanation: "⚠ Watch out: 9時 = くじ, NOT きゅうじ. Three time-reading exceptions to memorize: 4時=よじ, 7時=しちじ, 9時=くじ."
        },
        {
            id: "seed-10",
            question: "How to read |4時|?",
            choices: ["よじ", "しじ", "よんじ", "よっじ"],
            answer: "よじ",
            explanation: "⚠ 4時 = よじ. Even though 4 is usually よん or し, in time you say よじ."
        },
        {
            id: "seed-11",
            question: "How to read |7時|?",
            choices: ["しちじ", "ななじ", "しっじ", "なのじ"],
            answer: "しちじ",
            explanation: "7時 = しちじ. 7 has two readings (しち / なな), but in time it is しち."
        },
        {
            id: "seed-12",
            question: "What day is |月曜日|?",
            choices: ["Monday", "Sunday", "Saturday", "Friday"],
            answer: "Monday",
            explanation: "月曜日 (げつようび) = Monday. The 月 here means 'moon' (the planet), like 'Moon-day' in English."
        },
        {
            id: "seed-13",
            question: "How to read |水曜日|?",
            choices: ["すいようび", "みずようび", "みずようひ", "すいよび"],
            answer: "すいようび",
            explanation: "水曜日 (すいようび) = Wednesday. 水 = water (すい in compounds, みず alone)."
        },
        {
            id: "seed-14",
            question: "How to read |土曜日|?",
            choices: ["どようび", "つちようび", "とようび", "どうようび"],
            answer: "どようび",
            explanation: "土曜日 (どようび) = Saturday. 土 in compounds is ど (not つち)."
        },
        {
            id: "seed-15",
            question: "Choose the correct particle: 7時(___)おきます。",
            choices: ["に", "で", "を", "へ"],
            answer: "に",
            explanation: "に marks a specific point in time. 7時に = at 7 o'clock. Note: do NOT add に after 今日 / 昨日 / 明日 / 毎日."
        },
        {
            id: "seed-16",
            question: "Choose the correct particle: でんしゃ(___)がっこうへ いきます。",
            choices: ["で", "に", "を", "と"],
            answer: "で",
            explanation: "で marks the means/method (here: transportation). でんしゃで = by train. Exception: 歩いて (on foot) does NOT take で."
        },
        {
            id: "seed-17",
            question: "Choose the correct particle: ともだち(___)えいがを みます。",
            choices: ["と", "に", "で", "から"],
            answer: "と",
            explanation: "と means 'together with (a person)'. ともだちと = with a friend. Used for the person you do something with."
        },
        {
            id: "seed-18",
            question: "Choose the correct particle: わたしは とうきょう(___)いきます。",
            choices: ["へ", "で", "を", "から"],
            answer: "へ",
            explanation: "へ marks direction/destination of movement. に also works here, but へ is more strongly tied to direction. Read as 'え', not 'へ'."
        },
        {
            id: "seed-19",
            question: "Choose the correct particles: わたし(A)ほん(B)よみます。",
            choices: ["A=は, B=を", "A=を, B=は", "A=は, B=に", "A=が, B=を"],
            answer: "A=は, B=を",
            explanation: "は marks the topic (the person/thing the sentence is about). を marks the direct object of an action verb."
        },
        {
            id: "seed-20",
            question: "What is the past affirmative form of |たべます|?",
            choices: ["たべました", "たべませんでした", "たべません", "たべて"],
            answer: "たべました",
            explanation: "ます form conjugation: ます (present) → ました (past) → ません (negative) → ませんでした (past negative)."
        },
        {
            id: "seed-21",
            question: "What is the past negative form of |いきます|?",
            choices: ["いきませんでした", "いきません", "いきました", "いかない"],
            answer: "いきませんでした",
            explanation: "Past negative = ませんでした. So いきます → いきませんでした (did not go)."
        },
        {
            id: "seed-22",
            question: "What does |おきます| mean?",
            choices: ["wake up / get up", "go to bed", "go out", "come home"],
            answer: "wake up / get up",
            explanation: "おきます (起きます) = wake up. Pair with ねます (寝ます) = go to bed."
        },
        {
            id: "seed-23",
            question: "What is |電車|?",
            choices: ["train", "car", "bus", "bicycle"],
            answer: "train",
            explanation: "電車 (でんしゃ) = (electric) train. 電 = electricity, 車 = vehicle."
        },
        {
            id: "seed-24",
            question: "|毎日| べんきょうします。 What does 毎日 mean?",
            choices: ["every day", "today", "tomorrow", "yesterday"],
            answer: "every day",
            explanation: "毎日 (まいにち) = every day. Note: do NOT add に after 毎日 — say 毎日 おきます, not 毎日に おきます."
        },
        {
            id: "seed-25",
            question: "|何時| ですか。 What does 何時 mean?",
            choices: ["what time", "what day", "how long", "how much"],
            answer: "what time",
            explanation: "何時 (なんじ) = what time. 何 (なん/なに) = what + 時 (じ) = hour."
        },
        {
            id: "seed-26",
            question: "これは |いくら| ですか。 What does いくら mean?",
            choices: ["how much (price)", "how many", "what color", "what kind"],
            answer: "how much (price)",
            explanation: "いくら = how much (used for price). Standard reply: 〜円です. Example: 500円です."
        },
        {
            id: "seed-27",
            question: "Choose the correct particles: 9時(A)5時(B)はたらきます。",
            choices: ["A=から, B=まで", "A=まで, B=から", "A=に, B=に", "A=で, B=へ"],
            answer: "A=から, B=まで",
            explanation: "から = from (start point), まで = until (end point). Works for both time and place: とうきょうから おおさかまで."
        }
    ],

    kanji: {
        "新": { reading: "しん, あたら(しい)", meaning: "new" },
        "学": { reading: "がく, まな(ぶ)", meaning: "study, learning" },
        "校": { reading: "こう", meaning: "school" },
        "車": { reading: "しゃ, くるま", meaning: "car, vehicle" },
        "日": { reading: "にち, ひ", meaning: "day, sun" },
        "本": { reading: "ほん, もと", meaning: "book, origin" },
        "語": { reading: "ご, かた(る)", meaning: "language, word" },
        "毎": { reading: "まい", meaning: "every" },

        // ===== Week 2 — Numbers 1-10 =====
        "一": { reading: "いち, ひと(つ)", meaning: "one" },
        "二": { reading: "に, ふた(つ)", meaning: "two" },
        "三": { reading: "さん, みっ(つ)", meaning: "three" },
        "四": { reading: "し, よん, よ", meaning: "four" },
        "五": { reading: "ご, いつ(つ)", meaning: "five" },
        "六": { reading: "ろく, むっ(つ)", meaning: "six" },
        "七": { reading: "しち, なな", meaning: "seven" },
        "八": { reading: "はち, やっ(つ)", meaning: "eight" },
        "九": { reading: "く, きゅう", meaning: "nine" },
        "十": { reading: "じゅう, とお", meaning: "ten" },

        // ===== Week 2 — Days of the week =====
        "月": { reading: "げつ, がつ, つき", meaning: "month, moon" },
        "火": { reading: "か, ひ", meaning: "fire" },
        "水": { reading: "すい, みず", meaning: "water" },
        "木": { reading: "もく, き", meaning: "tree, wood" },
        "金": { reading: "きん, かね", meaning: "gold, money" },
        "土": { reading: "ど, つち", meaning: "earth, soil" },

        // ===== Week 2 — Other =====
        "人": { reading: "じん, にん, ひと", meaning: "person" },
        "円": { reading: "えん, まる(い)", meaning: "yen, circle" },
        "山": { reading: "さん, やま", meaning: "mountain" }
    },

    words: {
        "新しい": { reading: "あたらしい", meaning: "new" },
        "学校": { reading: "がっこう", meaning: "school" },
        "日本語": { reading: "にほんご", meaning: "Japanese language" },

        // ===== Week 2 — Days of the week =====
        "月曜日": { reading: "げつようび", meaning: "Monday" },
        "火曜日": { reading: "かようび", meaning: "Tuesday" },
        "水曜日": { reading: "すいようび", meaning: "Wednesday" },
        "木曜日": { reading: "もくようび", meaning: "Thursday" },
        "金曜日": { reading: "きんようび", meaning: "Friday" },
        "土曜日": { reading: "どようび", meaning: "Saturday" },
        "日曜日": { reading: "にちようび", meaning: "Sunday" },
        "何曜日": { reading: "なんようび", meaning: "what day of the week" },

        // ===== Week 2 — Time =====
        "何時": { reading: "なんじ", meaning: "what time" },
        "毎日": { reading: "まいにち", meaning: "every day" },
        "今": { reading: "いま", meaning: "now" },
        "午前": { reading: "ごぜん", meaning: "AM, morning" },
        "午後": { reading: "ごご", meaning: "PM, afternoon" },

        // ===== Week 2 — Verbs (ます form) =====
        "起きます": { reading: "おきます", meaning: "to wake up, get up" },
        "寝ます": { reading: "ねます", meaning: "to sleep, go to bed" },
        "行きます": { reading: "いきます", meaning: "to go" },
        "来ます": { reading: "きます", meaning: "to come" },
        "帰ります": { reading: "かえります", meaning: "to return home" },
        "食べます": { reading: "たべます", meaning: "to eat" },
        "飲みます": { reading: "のみます", meaning: "to drink" },
        "読みます": { reading: "よみます", meaning: "to read" },
        "見ます": { reading: "みます", meaning: "to watch, see" },
        "働きます": { reading: "はたらきます", meaning: "to work" },

        // ===== Week 2 — Transportation & places =====
        "電車": { reading: "でんしゃ", meaning: "train" },
        "新幹線": { reading: "しんかんせん", meaning: "bullet train" },
        "自転車": { reading: "じてんしゃ", meaning: "bicycle" },
        "飛行機": { reading: "ひこうき", meaning: "airplane" },
        "駅": { reading: "えき", meaning: "(train) station" },
        "会社": { reading: "かいしゃ", meaning: "company" }
    }
};
