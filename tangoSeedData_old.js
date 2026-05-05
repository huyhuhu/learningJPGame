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
    version: 2,

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
        "毎": { reading: "まい", meaning: "every" }
    },

    words: {
        "新しい": { reading: "あたらしい", meaning: "new" },
        "学校": { reading: "がっこう", meaning: "school" },
        "日本語": { reading: "にほんご", meaning: "Japanese language" }
    }
};
