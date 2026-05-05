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
//   - label:   (optional) classification tag. Falls back to defaultLabel below.

const TANGO_SEED_DATA = {
    version: 6,
    // Default label applied to every kanji/word in this seed (per-entry `label` overrides).
    defaultLabel: "No label",

    questions: [
        {
            id: "seed-1",
            label: "Week2",
            question: "What is the meaning of |新|?",
            choices: ["new", "old", "big", "small"],
            answer: "new",
            explanation: "新 (しん / あたら) means 'new'. Appears in: 新しい (new), 新聞 (newspaper), 最新 (latest)."
        },
        {
            id: "seed-2",
            label: "Week2",
            question: "How to read |新しい|くるまですね?",
            choices: ["あたらしい", "あだらしい", "あらたしい", "あらだしい"],
            answer: "あたらしい",
            explanation: "新しい is read あたらしい. Watch out — it is NOT あらたしい (a common mistake)."
        },
        {
            id: "seed-3",
            label: "Week2",
            question: "|学校|へ行きます。 What does 学校 mean?",
            choices: ["school", "library", "hospital", "station"],
            answer: "school",
            explanation: "学校 (がっこう) = school. 学 = study/learning, 校 = school."
        },
        {
            id: "seed-4",
            label: "Week2",
            question: "How to read |車|?",
            choices: ["くるま", "うま", "とり", "いぬ"],
            answer: "くるま",
            explanation: "車 = くるま (car/vehicle). On'yomi: しゃ (used in compounds like 自動車 jidousha)."
        },
        {
            id: "seed-5",
            label: "Week2",
            question: "毎日 |日本語| を べんきょうします。 What is 日本語?",
            choices: ["Japanese language", "Chinese language", "English language", "Korean language"],
            answer: "Japanese language",
            explanation: "日本語 (にほんご) = Japanese language. 日本 (Japan) + 語 (language)."
        },

        // ===== Week 2 — Numbers, days, and basic kanji =====
        {
            id: "seed-6",
            label: "Week2",
            question: "What is the meaning of |山|?",
            choices: ["mountain", "river", "sea", "sky"],
            answer: "mountain",
            explanation: "山 (やま / さん) = mountain. Famous example: 富士山 (ふじさん) = Mt. Fuji."
        },
        {
            id: "seed-7",
            label: "Week2",
            question: "What is the meaning of |人|?",
            choices: ["person", "child", "friend", "family"],
            answer: "person",
            explanation: "人 (ひと / じん / にん) = person. 日本人 (にほんじん) = Japanese person, 三人 (さんにん) = 3 people."
        },
        {
            id: "seed-8",
            label: "Week2",
            question: "What is the meaning of |円|?",
            choices: ["yen / circle", "money in general", "coin", "ticket"],
            answer: "yen / circle",
            explanation: "円 (えん) = yen, the Japanese currency. Original meaning is 'circle' (まるい). 千円 (せんえん) = 1000 yen."
        },
        {
            id: "seed-9",
            label: "Week2",
            question: "How to read |9時|?",
            choices: ["くじ", "きゅうじ", "ここのじ", "きゅじ"],
            answer: "くじ",
            explanation: "⚠ Watch out: 9時 = くじ, NOT きゅうじ. Three time-reading exceptions to memorize: 4時=よじ, 7時=しちじ, 9時=くじ."
        },
        {
            id: "seed-10",
            label: "Week2",
            question: "How to read |4時|?",
            choices: ["よじ", "しじ", "よんじ", "よっじ"],
            answer: "よじ",
            explanation: "⚠ 4時 = よじ. Even though 4 is usually よん or し, in time you say よじ."
        },
        {
            id: "seed-11",
            label: "Week2",
            question: "How to read |7時|?",
            choices: ["しちじ", "ななじ", "しっじ", "なのじ"],
            answer: "しちじ",
            explanation: "7時 = しちじ. 7 has two readings (しち / なな), but in time it is しち."
        },
        {
            id: "seed-12",
            label: "Week2",
            question: "What day is |月曜日|?",
            choices: ["Monday", "Sunday", "Saturday", "Friday"],
            answer: "Monday",
            explanation: "月曜日 (げつようび) = Monday. The 月 here means 'moon' (the planet), like 'Moon-day' in English."
        },
        {
            id: "seed-13",
            label: "Week2",
            question: "How to read |水曜日|?",
            choices: ["すいようび", "みずようび", "みずようひ", "すいよび"],
            answer: "すいようび",
            explanation: "水曜日 (すいようび) = Wednesday. 水 = water (すい in compounds, みず alone)."
        },
        {
            id: "seed-14",
            label: "Week2",
            question: "How to read |土曜日|?",
            choices: ["どようび", "つちようび", "とようび", "どうようび"],
            answer: "どようび",
            explanation: "土曜日 (どようび) = Saturday. 土 in compounds is ど (not つち)."
        },
        {
            id: "seed-15",
            label: "Week2",
            question: "Choose the correct particle: 7時(___)おきます。",
            choices: ["に", "で", "を", "へ"],
            answer: "に",
            explanation: "に marks a specific point in time. 7時に = at 7 o'clock. Note: do NOT add に after 今日 / 昨日 / 明日 / 毎日."
        },
        {
            id: "seed-16",
            label: "Week2",
            question: "Choose the correct particle: でんしゃ(___)がっこうへ いきます。",
            choices: ["で", "に", "を", "と"],
            answer: "で",
            explanation: "で marks the means/method (here: transportation). でんしゃで = by train. Exception: 歩いて (on foot) does NOT take で."
        },
        {
            id: "seed-17",
            label: "Week2",
            question: "Choose the correct particle: ともだち(___)えいがを みます。",
            choices: ["と", "に", "で", "から"],
            answer: "と",
            explanation: "と means 'together with (a person)'. ともだちと = with a friend. Used for the person you do something with."
        },
        {
            id: "seed-18",
            label: "Week2",
            question: "Choose the correct particle: わたしは とうきょう(___)いきます。",
            choices: ["へ", "で", "を", "から"],
            answer: "へ",
            explanation: "へ marks direction/destination of movement. に also works here, but へ is more strongly tied to direction. Read as 'え', not 'へ'."
        },
        {
            id: "seed-19",
            label: "Week2",
            question: "Choose the correct particles: わたし(A)ほん(B)よみます。",
            choices: ["A=は, B=を", "A=を, B=は", "A=は, B=に", "A=が, B=を"],
            answer: "A=は, B=を",
            explanation: "は marks the topic (the person/thing the sentence is about). を marks the direct object of an action verb."
        },
        {
            id: "seed-20",
            label: "Week2",
            question: "What is the past affirmative form of |たべます|?",
            choices: ["たべました", "たべませんでした", "たべません", "たべて"],
            answer: "たべました",
            explanation: "ます form conjugation: ます (present) → ました (past) → ません (negative) → ませんでした (past negative)."
        },
        {
            id: "seed-21",
            label: "Week2",
            question: "What is the past negative form of |いきます|?",
            choices: ["いきませんでした", "いきません", "いきました", "いかない"],
            answer: "いきませんでした",
            explanation: "Past negative = ませんでした. So いきます → いきませんでした (did not go)."
        },
        {
            id: "seed-22",
            label: "Week2",
            question: "What does |おきます| mean?",
            choices: ["wake up / get up", "go to bed", "go out", "come home"],
            answer: "wake up / get up",
            explanation: "おきます (起きます) = wake up. Pair with ねます (寝ます) = go to bed."
        },
        {
            id: "seed-23",
            label: "Week2",
            question: "What is |電車|?",
            choices: ["train", "car", "bus", "bicycle"],
            answer: "train",
            explanation: "電車 (でんしゃ) = (electric) train. 電 = electricity, 車 = vehicle."
        },
        {
            id: "seed-24",
            label: "Week2",
            question: "|毎日| べんきょうします。 What does 毎日 mean?",
            choices: ["every day", "today", "tomorrow", "yesterday"],
            answer: "every day",
            explanation: "毎日 (まいにち) = every day. Note: do NOT add に after 毎日 — say 毎日 おきます, not 毎日に おきます."
        },
        {
            id: "seed-25",
            label: "Week2",
            question: "|何時| ですか。 What does 何時 mean?",
            choices: ["what time", "what day", "how long", "how much"],
            answer: "what time",
            explanation: "何時 (なんじ) = what time. 何 (なん/なに) = what + 時 (じ) = hour."
        },
        {
            id: "seed-26",
            label: "Week2",
            question: "これは |いくら| ですか。 What does いくら mean?",
            choices: ["how much (price)", "how many", "what color", "what kind"],
            answer: "how much (price)",
            explanation: "いくら = how much (used for price). Standard reply: 〜円です. Example: 500円です."
        },
        {
            id: "seed-27",
            label: "Week2",
            question: "Choose the correct particles: 9時(A)5時(B)はたらきます。",
            choices: ["A=から, B=まで", "A=まで, B=から", "A=に, B=に", "A=で, B=へ"],
            answer: "A=から, B=まで",
            explanation: "から = from (start point), まで = until (end point). Works for both time and place: とうきょうから おおさかまで."
        },

        // ===== Week 2 — Imported set (numbers, days, verbs, particles) =====
        {
            id: "w2-001",
            label: "Week2",
            question: "What is the meaning of |一|?",
            choices: ["one", "two", "three", "ten"],
            answer: "one",
            explanation: "一 = one. Readings: いち (on'yomi), ひと (kun, as in 一つ ひとつ = one item)."
        },
        {
            id: "w2-002",
            label: "Week2",
            question: "What is the meaning of |二|?",
            choices: ["two", "four", "six", "eight"],
            answer: "two",
            explanation: "二 = two. Readings: に / ふた (二つ ふたつ = two items)."
        },
        {
            id: "w2-003",
            label: "Week2",
            question: "What is the meaning of |三|?",
            choices: ["three", "five", "seven", "nine"],
            answer: "three",
            explanation: "三 = three. Readings: さん / みっ (三つ みっつ = three items)."
        },
        {
            id: "w2-004",
            label: "Week2",
            question: "What is the meaning of |五|?",
            choices: ["five", "four", "six", "eight"],
            answer: "five",
            explanation: "五 = five. Readings: ご / いつ (五つ いつつ = five items)."
        },
        {
            id: "w2-005",
            label: "Week2",
            question: "What is the meaning of |七|?",
            choices: ["seven", "five", "nine", "ten"],
            answer: "seven",
            explanation: "七 = seven. Readings: しち / なな. In time, use しち (7時=しちじ)."
        },
        {
            id: "w2-006",
            label: "Week2",
            question: "What is the meaning of |九|?",
            choices: ["nine", "seven", "six", "ten"],
            answer: "nine",
            explanation: "九 = nine. Readings: く / きゅう. In time, use く (9時=くじ, NOT きゅうじ)."
        },
        {
            id: "w2-007",
            label: "Week2",
            question: "What is the meaning of |十|?",
            choices: ["ten", "one", "thousand", "hundred"],
            answer: "ten",
            explanation: "十 = ten. Readings: じゅう / とお (十日 とおか = the 10th)."
        },
        {
            id: "w2-008",
            label: "Week2",
            question: "What is the meaning of |日|?",
            choices: ["day, sun", "month, moon", "year", "week"],
            answer: "day, sun",
            explanation: "日 = day or sun. Readings: にち / ひ. 日本 (にほん) = Japan ('origin of the sun')."
        },
        {
            id: "w2-009",
            label: "Week2",
            question: "What is the meaning of |月|?",
            choices: ["month, moon", "day, sun", "year", "fire"],
            answer: "month, moon",
            explanation: "月 = month or moon. Readings: げつ / がつ / つき."
        },
        {
            id: "w2-010",
            label: "Week2",
            question: "What is the meaning of |火|?",
            choices: ["fire", "water", "tree", "earth"],
            answer: "fire",
            explanation: "火 = fire. Readings: か / ひ. Used in 火曜日 (かようび) = Tuesday."
        },
        {
            id: "w2-011",
            label: "Week2",
            question: "What is the meaning of |水|?",
            choices: ["water", "fire", "wood", "gold"],
            answer: "water",
            explanation: "水 = water. Readings: すい / みず. Used in 水曜日 (すいようび) = Wednesday."
        },
        {
            id: "w2-012",
            label: "Week2",
            question: "What is the meaning of |木|?",
            choices: ["tree, wood", "earth", "mountain", "fire"],
            answer: "tree, wood",
            explanation: "木 = tree or wood. Readings: もく / き. Used in 木曜日 (もくようび) = Thursday."
        },
        {
            id: "w2-013",
            label: "Week2",
            question: "What is the meaning of |金|?",
            choices: ["gold, money", "silver, water", "tree, wood", "earth, soil"],
            answer: "gold, money",
            explanation: "金 = gold or money. Readings: きん / かね. お金 (おかね) = money. 金曜日 = Friday."
        },
        {
            id: "w2-014",
            label: "Week2",
            question: "What is the meaning of |土|?",
            choices: ["earth, soil", "water", "fire", "wood"],
            answer: "earth, soil",
            explanation: "土 = earth or soil. Readings: ど / つち. Used in 土曜日 (どようび) = Saturday."
        },
        {
            id: "w2-015",
            label: "Week2",
            question: "What is the meaning of |人|?",
            choices: ["person", "child", "friend", "self"],
            answer: "person",
            explanation: "人 = person. Readings: じん / にん / ひと. 日本人 = Japanese person, 三人 (さんにん) = 3 people."
        },
        {
            id: "w2-016",
            label: "Week2",
            question: "What is the meaning of |円|?",
            choices: ["yen, circle", "money in general", "coin", "ticket"],
            answer: "yen, circle",
            explanation: "円 = yen (Japanese currency); originally means 'circle' (まるい). 千円 = 1000 yen."
        },
        {
            id: "w2-017",
            label: "Week2",
            question: "How to read |山| alone?",
            choices: ["やま", "さん", "かわ", "うみ"],
            answer: "やま",
            explanation: "山 alone = やま. In compounds, often さん (富士山 ふじさん = Mt. Fuji)."
        },
        {
            id: "w2-018",
            label: "Week2",
            question: "How to read |水| alone?",
            choices: ["みず", "すい", "ひ", "き"],
            answer: "みず",
            explanation: "水 alone = みず (water). In compounds: すい (水曜日 すいようび)."
        },
        {
            id: "w2-019",
            label: "Week2",
            question: "How to read |火| alone?",
            choices: ["ひ", "か", "ほ", "ね"],
            answer: "ひ",
            explanation: "火 alone = ひ (fire). In compounds: か (火曜日 かようび)."
        },
        {
            id: "w2-020",
            label: "Week2",
            question: "How to read |木| alone?",
            choices: ["き", "もく", "ぎ", "こ"],
            answer: "き",
            explanation: "木 alone = き (tree). In compounds: もく (木曜日 もくようび)."
        },
        {
            id: "w2-021",
            label: "Week2",
            question: "How to read |お金|?",
            choices: ["おかね", "おきん", "おかな", "おがね"],
            answer: "おかね",
            explanation: "お金 (おかね) = money. The お is an honorific prefix. 金 alone = かね."
        },
        {
            id: "w2-022",
            label: "Week2",
            question: "How to read |日本|?",
            choices: ["にほん", "にっぽん", "Both にほん and にっぽん are correct", "にちほん"],
            answer: "Both にほん and にっぽん are correct",
            explanation: "日本 can be read either にほん or にっぽん. Both are official. にほん is more common in daily speech."
        },
        {
            id: "w2-023",
            label: "Week2",
            question: "How to read |日本人|?",
            choices: ["にほんじん", "にほんひと", "にっぽんにん", "にちほんじん"],
            answer: "にほんじん",
            explanation: "日本人 (にほんじん) = Japanese person. 人 in nationality compounds is じん."
        },
        {
            id: "w2-024",
            label: "Week2",
            question: "How to read |三人|?",
            choices: ["さんにん", "さんじん", "さんひと", "みんにん"],
            answer: "さんにん",
            explanation: "三人 (さんにん) = three people. Counter for people uses にん from 4 onwards. Exceptions: 一人 ひとり, 二人 ふたり."
        },
        {
            id: "w2-025",
            label: "Week2",
            question: "How to read |一人|?",
            choices: ["ひとり", "いちにん", "いちじん", "いっぴと"],
            answer: "ひとり",
            explanation: "⚠ Exception: 一人 = ひとり (one person), NOT いちにん. Means both 'one person' and 'alone'."
        },
        {
            id: "w2-026",
            label: "Week2",
            question: "How to read |二人|?",
            choices: ["ふたり", "ににん", "ふたにん", "にじん"],
            answer: "ふたり",
            explanation: "⚠ Exception: 二人 = ふたり (two people). Often used to mean 'a couple'."
        },
        {
            id: "w2-027",
            label: "Week2",
            question: "How to read |四人|?",
            choices: ["よにん", "しにん", "よんにん", "よっにん"],
            answer: "よにん",
            explanation: "四人 = よにん (four people). 4 in counters often uses よ/よん, not し (し sounds like 死 = death)."
        },
        {
            id: "w2-028",
            label: "Week2",
            question: "How to read |千円|?",
            choices: ["せんえん", "ちえん", "せんねん", "ちえん"],
            answer: "せんえん",
            explanation: "千円 (せんえん) = 1000 yen. 千 = せん (thousand)."
        },
        {
            id: "w2-029",
            label: "Week2",
            question: "How to read |三つ|?",
            choices: ["みっつ", "さんつ", "みつ", "さんっつ"],
            answer: "みっつ",
            explanation: "三つ (みっつ) = three (general counter). The general counter uses kun-yomi: 一つ ひとつ, 二つ ふたつ, 三つ みっつ, 四つ よっつ..."
        },
        {
            id: "w2-030",
            label: "Week2",
            question: "How to read |四つ|?",
            choices: ["よっつ", "よつ", "しつ", "よんつ"],
            answer: "よっつ",
            explanation: "四つ (よっつ) = four (general counter)."
        },
        {
            id: "w2-031",
            label: "Week2",
            question: "How to read |1時|?",
            choices: ["いちじ", "ひとじ", "いっじ", "いちとき"],
            answer: "いちじ",
            explanation: "1時 = いちじ (1 o'clock)."
        },
        {
            id: "w2-032",
            label: "Week2",
            question: "How to read |4時|?",
            choices: ["よじ", "しじ", "よんじ", "よっじ"],
            answer: "よじ",
            explanation: "⚠ EXCEPTION: 4時 = よじ. Memorize: 4時 よじ, 7時 しちじ, 9時 くじ."
        },
        {
            id: "w2-033",
            label: "Week2",
            question: "How to read |7時|?",
            choices: ["しちじ", "ななじ", "しっじ", "なのじ"],
            answer: "しちじ",
            explanation: "⚠ 7時 = しちじ. 7 has two readings (しち/なな) — for time, use しち."
        },
        {
            id: "w2-034",
            label: "Week2",
            question: "How to read |9時|?",
            choices: ["くじ", "きゅうじ", "ここのじ", "くうじ"],
            answer: "くじ",
            explanation: "⚠ 9時 = くじ, NOT きゅうじ. Most common time-reading mistake."
        },
        {
            id: "w2-035",
            label: "Week2",
            question: "How to read |10時半|?",
            choices: ["じゅうじはん", "じゅっじはん", "とおじはん", "じゅうとき はん"],
            answer: "じゅうじはん",
            explanation: "10時半 (じゅうじはん) = 10:30. 半 (はん) = half (used for :30)."
        },
        {
            id: "w2-036",
            label: "Week2",
            question: "How to read |4月|?",
            choices: ["しがつ", "よがつ", "よんがつ", "よげつ"],
            answer: "しがつ",
            explanation: "⚠ Months and time exceptions are different! 4月 = しがつ (April). Compare: 4時 = よじ."
        },
        {
            id: "w2-037",
            label: "Week2",
            question: "How to read |7月|?",
            choices: ["しちがつ", "ななつき", "ななかつ", "しちつき"],
            answer: "しちがつ",
            explanation: "7月 = しちがつ (July). All months use がつ + on'yomi number."
        },
        {
            id: "w2-038",
            label: "Week2",
            question: "How to read |9月|?",
            choices: ["くがつ", "きゅうがつ", "ここのがつ", "くうがつ"],
            answer: "くがつ",
            explanation: "⚠ 9月 = くがつ (September), NOT きゅうがつ. Same trick as 9時 = くじ."
        },
        {
            id: "w2-039",
            label: "Week2",
            question: "How to read |30分|?",
            choices: ["さんじゅっぷん", "さんじゅうふん", "さんとお ふん", "さんじゅうぶん"],
            answer: "さんじゅっぷん",
            explanation: "30分 (さんじゅっぷん) = 30 minutes. Also written さんじっぷん. Equivalent to 半 (はん)."
        },
        {
            id: "w2-040",
            label: "Week2",
            question: "How to read |午前|?",
            choices: ["ごぜん", "ごご", "あさ", "ひる"],
            answer: "ごぜん",
            explanation: "午前 (ごぜん) = AM, morning. 午後 (ごご) = PM, afternoon."
        },
        {
            id: "w2-041",
            label: "Week2",
            question: "How to read |月曜日|?",
            choices: ["げつようび", "がつようび", "つきようび", "げつようひ"],
            answer: "げつようび",
            explanation: "月曜日 (げつようび) = Monday. 月 here = moon (Mon = Moon-day)."
        },
        {
            id: "w2-042",
            label: "Week2",
            question: "How to read |火曜日|?",
            choices: ["かようび", "ひようび", "ほようび", "かようひ"],
            answer: "かようび",
            explanation: "火曜日 (かようび) = Tuesday. 火 = fire (Mars in planets, Mardi in French)."
        },
        {
            id: "w2-043",
            label: "Week2",
            question: "How to read |水曜日|?",
            choices: ["すいようび", "みずようび", "みずようひ", "すいよび"],
            answer: "すいようび",
            explanation: "水曜日 (すいようび) = Wednesday. 水 = water (Mercury in planets)."
        },
        {
            id: "w2-044",
            label: "Week2",
            question: "How to read |木曜日|?",
            choices: ["もくようび", "きようび", "ぼくようび", "もくようひ"],
            answer: "もくようび",
            explanation: "木曜日 (もくようび) = Thursday. 木 = wood (Jupiter in planets)."
        },
        {
            id: "w2-045",
            label: "Week2",
            question: "How to read |金曜日|?",
            choices: ["きんようび", "かねようび", "ぎんようび", "きんようひ"],
            answer: "きんようび",
            explanation: "金曜日 (きんようび) = Friday. 金 = gold (Venus in planets, Vendredi in French)."
        },
        {
            id: "w2-046",
            label: "Week2",
            question: "How to read |土曜日|?",
            choices: ["どようび", "つちようび", "とようび", "どうようび"],
            answer: "どようび",
            explanation: "土曜日 (どようび) = Saturday. 土 = earth/soil (Saturn in planets)."
        },
        {
            id: "w2-047",
            label: "Week2",
            question: "How to read |日曜日|?",
            choices: ["にちようび", "ひようび", "にっようび", "にちようひ"],
            answer: "にちようび",
            explanation: "日曜日 (にちようび) = Sunday. 日 = sun (Sun-day)."
        },
        {
            id: "w2-048",
            label: "Week2",
            question: "今日は |何曜日| ですか? — What is being asked?",
            choices: ["What day of the week", "What time", "What date", "What month"],
            answer: "What day of the week",
            explanation: "何曜日 (なんようび) = what day of the week. Reply: 月曜日です, 火曜日です, etc."
        },
        {
            id: "w2-049",
            label: "Week2",
            question: "If today is 水曜日, what day is tomorrow (明日)?",
            choices: ["木曜日", "火曜日", "金曜日", "月曜日"],
            answer: "木曜日",
            explanation: "水曜日 (Wed) → 木曜日 (Thu). Order: 月→火→水→木→金→土→日."
        },
        {
            id: "w2-050",
            label: "Week2",
            question: "If today is 月曜日, what day was yesterday (昨日)?",
            choices: ["日曜日", "火曜日", "土曜日", "金曜日"],
            answer: "日曜日",
            explanation: "月曜日 (Mon) ← 日曜日 (Sun). Sunday comes before Monday."
        },
        {
            id: "w2-051",
            label: "Week2",
            question: "Choose the correct particle: わたし(___)がくせいです。",
            choices: ["は", "が", "を", "に"],
            answer: "は",
            explanation: "は marks the topic. わたしは = 'as for me / I am'. Pronounced 'wa', not 'ha'."
        },
        {
            id: "w2-052",
            label: "Week2",
            question: "Choose the correct particle: パン(___)たべます。",
            choices: ["を", "は", "に", "で"],
            answer: "を",
            explanation: "を marks the direct object of an action verb. パンを たべます = (I) eat bread. Pronounced 'o'."
        },
        {
            id: "w2-053",
            label: "Week2",
            question: "Choose the correct particle: 6時(___)おきます。",
            choices: ["に", "で", "へ", "から"],
            answer: "に",
            explanation: "に marks a specific point in time (with clock times, days, dates)."
        },
        {
            id: "w2-054",
            label: "Week2",
            question: "Choose the correct particle: バス(___)いきます。",
            choices: ["で", "に", "を", "と"],
            answer: "で",
            explanation: "で marks the means/method (here: by bus). Exception: 歩いて (on foot) takes NO particle."
        },
        {
            id: "w2-055",
            label: "Week2",
            question: "Choose the correct particle: かいしゃ(___)いきます。",
            choices: ["へ", "で", "を", "から"],
            answer: "へ",
            explanation: "へ (read 'え') marks direction of movement. に also works; へ emphasizes direction more."
        },
        {
            id: "w2-056",
            label: "Week2",
            question: "Choose the correct particle: かぞく(___)ばんごはんを たべます。",
            choices: ["と", "に", "で", "を"],
            answer: "と",
            explanation: "と = 'together with (a person)'. かぞくと = with (my) family."
        },
        {
            id: "w2-057",
            label: "Week2",
            question: "Choose the correct particles: 9時(A)5時(B)はたらきます。",
            choices: ["A=から, B=まで", "A=まで, B=から", "A=に, B=に", "A=で, B=へ"],
            answer: "A=から, B=まで",
            explanation: "から = from (start), まで = until (end). Works for both time and place."
        },
        {
            id: "w2-058",
            label: "Week2",
            question: "Choose the correct particle: とうきょう(___)おおさかまで しんかんせんで いきます。",
            choices: ["から", "まで", "に", "で"],
            answer: "から",
            explanation: "から marks the starting point (place). Pair with まで (until/to)."
        },
        {
            id: "w2-059",
            label: "Week2",
            question: "Which sentence is INCORRECT?",
            choices: ["まいにちに べんきょうします。", "まいにち べんきょうします。", "7時に おきます。", "土曜日に いきます。"],
            answer: "まいにちに べんきょうします。",
            explanation: "⚠ Do NOT add に after まいにち, きょう, あした, きのう, いま. These already imply time on their own."
        },
        {
            id: "w2-060",
            label: "Week2",
            question: "Which sentence is INCORRECT?",
            choices: ["あるいてで いきます。", "あるいて いきます。", "でんしゃで いきます。", "バスで いきます。"],
            answer: "あるいてで いきます。",
            explanation: "⚠ 歩いて (on foot) does NOT take で. Just say あるいて いきます."
        },
        {
            id: "w2-061",
            label: "Week2",
            question: "Choose the correct particles: わたし(A)みず(B)のみます。",
            choices: ["A=は, B=を", "A=を, B=は", "A=は, B=に", "A=が, B=を"],
            answer: "A=は, B=を",
            explanation: "は (topic) + を (direct object). Standard SOV pattern: Subject は, Object を, Verb."
        },
        {
            id: "w2-062",
            label: "Week2",
            question: "Choose the correct particles: ともだち(A)えいが(B)みます。",
            choices: ["A=と, B=を", "A=を, B=と", "A=に, B=を", "A=で, B=を"],
            answer: "A=と, B=を",
            explanation: "ともだちと (with a friend) + えいがを (movie as object) みます (watch)."
        },
        {
            id: "w2-063",
            label: "Week2",
            question: "Choose the correct particle: これは いくら(___)か?",
            choices: ["です", "ます", "ません", "でした"],
            answer: "です",
            explanation: "Question pattern with noun + question word: いくらですか = how much is (it)?"
        },
        {
            id: "w2-064",
            label: "Week2",
            question: "Which particle marks the topic of a sentence?",
            choices: ["は", "を", "に", "で"],
            answer: "は",
            explanation: "は marks the topic. The topic is what the sentence is 'about'. Pronounced 'wa' as a particle."
        },
        {
            id: "w2-065",
            label: "Week2",
            question: "Which particle marks the direct object of a verb?",
            choices: ["を", "は", "に", "へ"],
            answer: "を",
            explanation: "を marks what receives the action of the verb. パンを たべます, ほんを よみます."
        },
        {
            id: "w2-066",
            label: "Week2",
            question: "Which particle marks the means / method (e.g., transportation, tools)?",
            choices: ["で", "に", "へ", "と"],
            answer: "で",
            explanation: "で marks how something is done (by train, with chopsticks, in Japanese)."
        },
        {
            id: "w2-067",
            label: "Week2",
            question: "What is the past affirmative form of |たべます|?",
            choices: ["たべました", "たべません", "たべませんでした", "たべて"],
            answer: "たべました",
            explanation: "ます (present) → ました (past affirmative). 'I ate'."
        },
        {
            id: "w2-068",
            label: "Week2",
            question: "What is the negative form (present) of |のみます|?",
            choices: ["のみません", "のみました", "のみませんでした", "のまない"],
            answer: "のみません",
            explanation: "ます → ません = present negative. 'do not drink'."
        },
        {
            id: "w2-069",
            label: "Week2",
            question: "What is the past negative form of |いきます|?",
            choices: ["いきませんでした", "いきません", "いきました", "いかない"],
            answer: "いきませんでした",
            explanation: "ました + でした → ませんでした = past negative. 'did not go'."
        },
        {
            id: "w2-070",
            label: "Week2",
            question: "What is the past affirmative of |ねます|?",
            choices: ["ねました", "ねません", "ねませんでした", "ねた"],
            answer: "ねました",
            explanation: "ねます → ねました = slept."
        },
        {
            id: "w2-071",
            label: "Week2",
            question: "What is the present negative of |おきます|?",
            choices: ["おきません", "おきました", "おきませんでした", "おきない"],
            answer: "おきません",
            explanation: "おきます → おきません = do not wake up."
        },
        {
            id: "w2-072",
            label: "Week2",
            question: "What is the past negative of |よみます|?",
            choices: ["よみませんでした", "よみません", "よみました", "よまない"],
            answer: "よみませんでした",
            explanation: "よみます → よみませんでした = did not read."
        },
        {
            id: "w2-073",
            label: "Week2",
            question: "Choose the correct sentence for: 'I read a book yesterday.'",
            choices: ["きのう ほんを よみました。", "きのう ほんを よみます。", "あした ほんを よみました。", "きのう ほんを よみません。"],
            answer: "きのう ほんを よみました。",
            explanation: "きのう = yesterday → past tense → よみました."
        },
        {
            id: "w2-074",
            label: "Week2",
            question: "Choose the correct sentence for: 'I do not eat breakfast.'",
            choices: ["あさごはんを たべません。", "あさごはんを たべました。", "あさごはんを たべませんでした。", "あさごはんを たべます。"],
            answer: "あさごはんを たべません。",
            explanation: "Habitual present negative = ません."
        },
        {
            id: "w2-075",
            label: "Week2",
            question: "Choose the correct sentence for: 'I did not work on Sunday.'",
            choices: ["にちようび はたらきませんでした。", "にちようび はたらきません。", "にちようび はたらきました。", "にちようびに はたらきませんでした。"],
            answer: "にちようび はたらきませんでした。",
            explanation: "Past negative + day of week. Note: に is optional after days of the week, but never used after まいにち / きょう / あした."
        },
        {
            id: "w2-076",
            label: "Week2",
            question: "What is the dictionary meaning of |おきます|?",
            choices: ["wake up / get up", "go to bed", "go out", "come home"],
            answer: "wake up / get up",
            explanation: "起きます (おきます) = wake up. Opposite: ねます (sleep)."
        },
        {
            id: "w2-077",
            label: "Week2",
            question: "What is the dictionary meaning of |ねます|?",
            choices: ["go to bed / sleep", "wake up", "rest", "stand up"],
            answer: "go to bed / sleep",
            explanation: "寝ます (ねます) = go to bed, sleep."
        },
        {
            id: "w2-078",
            label: "Week2",
            question: "What is the dictionary meaning of |いきます|?",
            choices: ["go", "come", "return", "leave"],
            answer: "go",
            explanation: "行きます (いきます) = go. Pair with きます (come) and かえります (return)."
        },
        {
            id: "w2-079",
            label: "Week2",
            question: "What is the dictionary meaning of |きます|?",
            choices: ["come", "go", "return", "wear"],
            answer: "come",
            explanation: "来ます (きます) = come. Watch out: also used for 着ます (wear) — different kanji, same kana."
        },
        {
            id: "w2-080",
            label: "Week2",
            question: "What is the dictionary meaning of |かえります|?",
            choices: ["return home / go back", "come", "go", "stay"],
            answer: "return home / go back",
            explanation: "帰ります (かえります) = return (home or to one's base place). Different from もどります (return generally)."
        },
        {
            id: "w2-081",
            label: "Week2",
            question: "What is the dictionary meaning of |たべます|?",
            choices: ["eat", "drink", "buy", "make"],
            answer: "eat",
            explanation: "食べます (たべます) = eat."
        },
        {
            id: "w2-082",
            label: "Week2",
            question: "What is the dictionary meaning of |のみます|?",
            choices: ["drink", "eat", "smoke", "swallow"],
            answer: "drink",
            explanation: "飲みます (のみます) = drink. Also used for taking medicine: くすりを のみます."
        },
        {
            id: "w2-083",
            label: "Week2",
            question: "What is the dictionary meaning of |よみます|?",
            choices: ["read", "write", "say", "listen"],
            answer: "read",
            explanation: "読みます (よみます) = read."
        },
        {
            id: "w2-084",
            label: "Week2",
            question: "What is the dictionary meaning of |みます|?",
            choices: ["watch / see", "listen", "read", "look for"],
            answer: "watch / see",
            explanation: "見ます (みます) = see, watch, look at."
        },
        {
            id: "w2-085",
            label: "Week2",
            question: "What is the dictionary meaning of |ききます|?",
            choices: ["listen / hear / ask", "read", "watch", "speak"],
            answer: "listen / hear / ask",
            explanation: "聞きます (ききます) = listen, hear. Also means 'ask (a question)'."
        },
        {
            id: "w2-086",
            label: "Week2",
            question: "What is the dictionary meaning of |はたらきます|?",
            choices: ["work", "study", "rest", "play"],
            answer: "work",
            explanation: "働きます (はたらきます) = work (at a job). Different from べんきょうします (study)."
        },
        {
            id: "w2-087",
            label: "Week2",
            question: "What is the dictionary meaning of |やすみます|?",
            choices: ["rest / take a day off", "study", "work", "wake up"],
            answer: "rest / take a day off",
            explanation: "休みます (やすみます) = rest, take a day off. かいしゃを やすみます = take off work."
        },
        {
            id: "w2-088",
            label: "Week2",
            question: "What is the meaning of |電車|?",
            choices: ["train", "car", "bus", "bicycle"],
            answer: "train",
            explanation: "電車 (でんしゃ) = (electric) train. 電 = electricity, 車 = vehicle."
        },
        {
            id: "w2-089",
            label: "Week2",
            question: "What is the meaning of |自転車|?",
            choices: ["bicycle", "motorcycle", "car", "scooter"],
            answer: "bicycle",
            explanation: "自転車 (じてんしゃ) = bicycle. Literally 'self-rotating vehicle'."
        },
        {
            id: "w2-090",
            label: "Week2",
            question: "What is the meaning of |新幹線|?",
            choices: ["bullet train", "regular train", "subway", "tram"],
            answer: "bullet train",
            explanation: "新幹線 (しんかんせん) = Shinkansen, the high-speed bullet train."
        },
        {
            id: "w2-091",
            label: "Week2",
            question: "What is the meaning of |飛行機|?",
            choices: ["airplane", "helicopter", "ship", "rocket"],
            answer: "airplane",
            explanation: "飛行機 (ひこうき) = airplane. 飛 = fly, 行 = go, 機 = machine."
        },
        {
            id: "w2-092",
            label: "Week2",
            question: "What is the meaning of |駅|?",
            choices: ["station (train)", "airport", "bus stop", "port"],
            answer: "station (train)",
            explanation: "駅 (えき) = train station. Common word: 東京駅 (とうきょうえき) = Tokyo Station."
        },
        {
            id: "w2-093",
            label: "Week2",
            question: "What is the meaning of |会社|?",
            choices: ["company / workplace", "school", "store", "bank"],
            answer: "company / workplace",
            explanation: "会社 (かいしゃ) = company. 会社員 (かいしゃいん) = company employee."
        },
        {
            id: "w2-094",
            label: "Week2",
            question: "What is the meaning of |毎日|?",
            choices: ["every day", "today", "tomorrow", "yesterday"],
            answer: "every day",
            explanation: "毎日 (まいにち) = every day. Note: do NOT add に (まいにち おきます, NOT まいにちに おきます)."
        },
        {
            id: "w2-095",
            label: "Week2",
            question: "What is the meaning of |今|?",
            choices: ["now", "today", "soon", "later"],
            answer: "now",
            explanation: "今 (いま) = now, the present moment. Different from きょう (today)."
        },
        {
            id: "w2-096",
            label: "Week2",
            question: "Where is the closest meaning of |ここ|?",
            choices: ["here (near me)", "there (near you)", "over there (far)", "where"],
            answer: "here (near me)",
            explanation: "こ-そ-あ-ど system: ここ (here, near speaker), そこ (there, near listener), あそこ (over there, far from both), どこ (where)."
        },
        {
            id: "w2-097",
            label: "Week2",
            question: "What does |あそこ| mean?",
            choices: ["over there (far from both speakers)", "here", "there (near you)", "somewhere"],
            answer: "over there (far from both speakers)",
            explanation: "あそこ refers to a place far from both speaker and listener. Note: irregular — it's あそこ, not あこ."
        },
        {
            id: "w2-098",
            label: "Week2",
            question: "What does |いくら| mean?",
            choices: ["how much (price)", "how many", "how long", "what"],
            answer: "how much (price)",
            explanation: "いくら = how much (specifically for price). Reply pattern: 〜円です."
        },
        {
            id: "w2-099",
            label: "Week2",
            question: "Pick the correct translation: 'I drink coffee every morning.'",
            choices: ["まいあさ コーヒーを のみます。", "まいあさに コーヒーを のみました。", "まいあさ コーヒーが のみます。", "まいあさ コーヒーを のみません。"],
            answer: "まいあさ コーヒーを のみます。",
            explanation: "まいあさ (every morning) takes no に. Object コーヒー takes を. Habitual present = ます."
        },
        {
            id: "w2-100",
            label: "Week2",
            question: "Pick the correct translation: 'I went to school by bicycle yesterday.'",
            choices: ["きのう じてんしゃで がっこうへ いきました。", "きのう じてんしゃに がっこうへ いきました。", "あした じてんしゃで がっこうへ いきます。", "きのう じてんしゃで がっこうを いきました。"],
            answer: "きのう じてんしゃで がっこうへ いきました。",
            explanation: "Means of transport = で. Direction = へ. Past tense = ました."
        },
        {
            id: "w2-101",
            label: "Week2",
            question: "Pick the correct translation: 'How much is this?'",
            choices: ["これは いくらですか。", "これは なんですか。", "これは どこですか。", "これは いつですか。"],
            answer: "これは いくらですか。",
            explanation: "いくら = how much (price). なん = what, どこ = where, いつ = when."
        },
        {
            id: "w2-102",
            label: "Week2",
            question: "Pick the correct translation: 'I do not work on Saturdays.'",
            choices: ["どようび はたらきません。", "どようびに はたらきます。", "どようび はたらきました。", "どようび はたらきませんでした。"],
            answer: "どようび はたらきません。",
            explanation: "Habitual present negative. Days of the week may take に optionally; here omitted."
        },
        {
            id: "w2-103",
            label: "Week2",
            question: "What time is being said: 'いま、ごご よじはん です。'",
            choices: ["4:30 PM", "4:30 AM", "4:00 PM", "14:30 (military)"],
            answer: "4:30 PM",
            explanation: "ごご = PM, よじ = 4 o'clock, はん = half (30). So 4:30 PM."
        },
        {
            id: "w2-104",
            label: "Week2",
            question: "Read this sentence: 'まいばん 11時に ねます。' What does it mean?",
            choices: ["I go to bed at 11 PM every night.", "I wake up at 11 AM every morning.", "I went to bed at 11 yesterday.", "I will sleep at 11 tomorrow."],
            answer: "I go to bed at 11 PM every night.",
            explanation: "まいばん = every night (note: まいばん takes に for the time, but まいばん itself does not). 11時に ねます = sleep at 11."
        },
        {
            id: "w2-105",
            label: "Week2",
            question: "Read this dialogue: 'A: なんようびに いきますか。 B: ___ いきます。' Which is most natural?",
            choices: ["きんようびに", "きんようびで", "きんようびを", "きんようびへ"],
            answer: "きんようびに",
            explanation: "Days of the week take に when used as a time marker (matches the question's に). Other particles don't fit this slot."
        }
    ],

    kanji: {
        "新": { reading: "しん, あたら(しい)", meaning: "new" },
        "学": { reading: "がく, まな(ぶ)", meaning: "study, learning" },
        "校": { reading: "こう", meaning: "school" },
        "車": { reading: "しゃ, くるま", meaning: "car, vehicle" },
        "日": { reading: "にち, び, ひ", meaning: "day, sun" },
        "本": { reading: "ほん, もと", meaning: "book, origin" },
        "語": { reading: "ご, かた(る)", meaning: "language, word" },
        "毎": { reading: "まい", meaning: "every" },

        // Numbers 1-10
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

        // Days of the week
        "月": { reading: "げつ, がつ, つき", meaning: "month, moon" },
        "火": { reading: "か, ひ", meaning: "fire" },
        "水": { reading: "すい, みず", meaning: "water" },
        "木": { reading: "もく, き", meaning: "tree, wood" },
        "金": { reading: "きん, かね", meaning: "gold, money" },
        "土": { reading: "ど, つち", meaning: "earth, soil" },

        // Other
        "人": { reading: "じん, にん, ひと", meaning: "person" },
        "円": { reading: "えん, まる(い)", meaning: "yen, circle" },
        "山": { reading: "さん, やま", meaning: "mountain" },

        // Common kanji used in questions
        "行": { reading: "こう, い(く), おこな(う)", meaning: "go, conduct" },
        "時": { reading: "じ, とき", meaning: "time, hour" },
        "曜": { reading: "よう", meaning: "weekday" },
        "電": { reading: "でん", meaning: "electricity" },
        "何": { reading: "なに, なん", meaning: "what" },
        "起": { reading: "き, お(きる)", meaning: "wake up, rise" },
        "寝": { reading: "しん, ね(る)", meaning: "sleep, lie down" },
        "来": { reading: "らい, く(る)", meaning: "come" },
        "帰": { reading: "き, かえ(る)", meaning: "return home" },
        "食": { reading: "しょく, た(べる)", meaning: "eat, food" },
        "飲": { reading: "いん, の(む)", meaning: "drink" },
        "読": { reading: "どく, よ(む)", meaning: "read" },
        "見": { reading: "けん, み(る)", meaning: "see, look" },
        "働": { reading: "どう, はたら(く)", meaning: "work" },
        "会": { reading: "かい, あ(う)", meaning: "meeting, meet" },
        "社": { reading: "しゃ", meaning: "company, shrine" },
        "駅": { reading: "えき", meaning: "station" },
        "自": { reading: "じ, し", meaning: "self" },
        "転": { reading: "てん, ころ(がる)", meaning: "turn, roll" },
        "飛": { reading: "ひ, と(ぶ)", meaning: "fly" },
        "機": { reading: "き", meaning: "machine, opportunity" },
        "幹": { reading: "かん, みき", meaning: "trunk, main" },
        "線": { reading: "せん", meaning: "line" },
        "千": { reading: "せん, ち", meaning: "thousand" },
        "今": { reading: "こん, いま", meaning: "now" },
        "午": { reading: "ご", meaning: "noon" },
        "前": { reading: "ぜん, まえ", meaning: "before, front" },
        "後": { reading: "ご, こう, あと, うし(ろ)", meaning: "after, behind" }
    },

    words: {
        "新しい": { reading: "あたらしい", meaning: "new" },
        "学校": { reading: "がっこう", meaning: "school" },
        "日本語": { reading: "にほんご", meaning: "Japanese language" },

        // Days of the week
        "月曜日": { reading: "げつようび", meaning: "Monday" },
        "火曜日": { reading: "かようび", meaning: "Tuesday" },
        "水曜日": { reading: "すいようび", meaning: "Wednesday" },
        "木曜日": { reading: "もくようび", meaning: "Thursday" },
        "金曜日": { reading: "きんようび", meaning: "Friday" },
        "土曜日": { reading: "どようび", meaning: "Saturday" },
        "日曜日": { reading: "にちようび", meaning: "Sunday" },
        "何曜日": { reading: "なんようび", meaning: "what day of the week" },

        // Time
        "何時": { reading: "なんじ", meaning: "what time" },
        "毎日": { reading: "まいにち", meaning: "every day" },
        "毎朝": { reading: "まいあさ", meaning: "every morning" },
        "毎晩": { reading: "まいばん", meaning: "every night" },
        "今": { reading: "いま", meaning: "now" },
        "午前": { reading: "ごぜん", meaning: "AM, morning" },
        "午後": { reading: "ごご", meaning: "PM, afternoon" },
        "半": { reading: "はん", meaning: "half (used for :30)" },

        // Verbs (ます form)
        "起きます": { reading: "おきます", meaning: "to wake up, get up" },
        "寝ます": { reading: "ねます", meaning: "to sleep, go to bed" },
        "行きます": { reading: "いきます", meaning: "to go" },
        "来ます": { reading: "きます", meaning: "to come" },
        "帰ります": { reading: "かえります", meaning: "to return home" },
        "食べます": { reading: "たべます", meaning: "to eat" },
        "飲みます": { reading: "のみます", meaning: "to drink" },
        "読みます": { reading: "よみます", meaning: "to read" },
        "見ます": { reading: "みます", meaning: "to watch, see" },
        "聞きます": { reading: "ききます", meaning: "to listen, hear, ask" },
        "働きます": { reading: "はたらきます", meaning: "to work" },
        "休みます": { reading: "やすみます", meaning: "to rest, take off" },

        // Transportation & places
        "電車": { reading: "でんしゃ", meaning: "train" },
        "新幹線": { reading: "しんかんせん", meaning: "bullet train" },
        "自転車": { reading: "じてんしゃ", meaning: "bicycle" },
        "飛行機": { reading: "ひこうき", meaning: "airplane" },
        "駅": { reading: "えき", meaning: "(train) station" },
        "会社": { reading: "かいしゃ", meaning: "company" },

        // Demonstratives & questions
        "ここ": { reading: "ここ", meaning: "here (near speaker)" },
        "そこ": { reading: "そこ", meaning: "there (near listener)" },
        "あそこ": { reading: "あそこ", meaning: "over there (far from both)" },
        "どこ": { reading: "どこ", meaning: "where" },
        "いくら": { reading: "いくら", meaning: "how much (price)" }
    }
};
