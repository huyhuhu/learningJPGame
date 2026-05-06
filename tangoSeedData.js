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
    version: 8,
    // Default label applied to every kanji/word in this seed (per-entry `label` overrides).
    defaultLabel: "No label",

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
    ],

    kanji: {
        "新": { reading: "しん, あたら(しい)", meaning: "new" },
    },

    words: {
        "新しい": { reading: "あたらしい", meaning: "new" },
    }
};
