// ===== COMPREHENSIVE JAPANESE KANA DATABASE =====
// This database contains ALL hiragana and katakana characters including:
// - Basic kana (gojūon)
// - Dakuten and handakuten variations
// - Combination kana (yōon)
// Plus 200+ Japanese vocabulary words for advanced practice

const KANA_DATABASE = {
    // ===== HIRAGANA - Basic (Gojūon) =====
    hiragana: {
        basic: [
            // Vowels
            { kana: 'あ', romaji: 'a', row: 'vowel' },
            { kana: 'い', romaji: 'i', row: 'vowel' },
            { kana: 'う', romaji: 'u', row: 'vowel' },
            { kana: 'え', romaji: 'e', row: 'vowel' },
            { kana: 'お', romaji: 'o', row: 'vowel' },
            // K-row
            { kana: 'か', romaji: 'ka', row: 'k' },
            { kana: 'き', romaji: 'ki', row: 'k' },
            { kana: 'く', romaji: 'ku', row: 'k' },
            { kana: 'け', romaji: 'ke', row: 'k' },
            { kana: 'こ', romaji: 'ko', row: 'k' },
            // S-row
            { kana: 'さ', romaji: 'sa', row: 's' },
            { kana: 'し', romaji: 'shi', row: 's', alt: ['si'] },
            { kana: 'す', romaji: 'su', row: 's' },
            { kana: 'せ', romaji: 'se', row: 's' },
            { kana: 'そ', romaji: 'so', row: 's' },
            // T-row
            { kana: 'た', romaji: 'ta', row: 't' },
            { kana: 'ち', romaji: 'chi', row: 't', alt: ['ti'] },
            { kana: 'つ', romaji: 'tsu', row: 't', alt: ['tu'] },
            { kana: 'て', romaji: 'te', row: 't' },
            { kana: 'と', romaji: 'to', row: 't' },
            // N-row
            { kana: 'な', romaji: 'na', row: 'n' },
            { kana: 'に', romaji: 'ni', row: 'n' },
            { kana: 'ぬ', romaji: 'nu', row: 'n' },
            { kana: 'ね', romaji: 'ne', row: 'n' },
            { kana: 'の', romaji: 'no', row: 'n' },
            // H-row
            { kana: 'は', romaji: 'ha', row: 'h' },
            { kana: 'ひ', romaji: 'hi', row: 'h' },
            { kana: 'ふ', romaji: 'fu', row: 'h', alt: ['hu'] },
            { kana: 'へ', romaji: 'he', row: 'h' },
            { kana: 'ほ', romaji: 'ho', row: 'h' },
            // M-row
            { kana: 'ま', romaji: 'ma', row: 'm' },
            { kana: 'み', romaji: 'mi', row: 'm' },
            { kana: 'む', romaji: 'mu', row: 'm' },
            { kana: 'め', romaji: 'me', row: 'm' },
            { kana: 'も', romaji: 'mo', row: 'm' },
            // Y-row
            { kana: 'や', romaji: 'ya', row: 'y' },
            { kana: 'ゆ', romaji: 'yu', row: 'y' },
            { kana: 'よ', romaji: 'yo', row: 'y' },
            // R-row
            { kana: 'ら', romaji: 'ra', row: 'r' },
            { kana: 'り', romaji: 'ri', row: 'r' },
            { kana: 'る', romaji: 'ru', row: 'r' },
            { kana: 'れ', romaji: 're', row: 'r' },
            { kana: 'ろ', romaji: 'ro', row: 'r' },
            // W-row
            { kana: 'わ', romaji: 'wa', row: 'w' },
            { kana: 'を', romaji: 'wo', row: 'w', alt: ['o'] },
            // N
            { kana: 'ん', romaji: 'n', row: 'special', alt: ['nn'] }
        ],
        // Dakuten (voiced) variations
        dakuten: [
            // G-row (from K)
            { kana: 'が', romaji: 'ga', row: 'g' },
            { kana: 'ぎ', romaji: 'gi', row: 'g' },
            { kana: 'ぐ', romaji: 'gu', row: 'g' },
            { kana: 'げ', romaji: 'ge', row: 'g' },
            { kana: 'ご', romaji: 'go', row: 'g' },
            // Z-row (from S)
            { kana: 'ざ', romaji: 'za', row: 'z' },
            { kana: 'じ', romaji: 'ji', row: 'z', alt: ['zi'] },
            { kana: 'ず', romaji: 'zu', row: 'z' },
            { kana: 'ぜ', romaji: 'ze', row: 'z' },
            { kana: 'ぞ', romaji: 'zo', row: 'z' },
            // D-row (from T)
            { kana: 'だ', romaji: 'da', row: 'd' },
            { kana: 'ぢ', romaji: 'ji', row: 'd', alt: ['di', 'dji'] },
            { kana: 'づ', romaji: 'zu', row: 'd', alt: ['du', 'dzu'] },
            { kana: 'で', romaji: 'de', row: 'd' },
            { kana: 'ど', romaji: 'do', row: 'd' },
            // B-row (from H)
            { kana: 'ば', romaji: 'ba', row: 'b' },
            { kana: 'び', romaji: 'bi', row: 'b' },
            { kana: 'ぶ', romaji: 'bu', row: 'b' },
            { kana: 'べ', romaji: 'be', row: 'b' },
            { kana: 'ぼ', romaji: 'bo', row: 'b' },
            // P-row (from H with handakuten)
            { kana: 'ぱ', romaji: 'pa', row: 'p' },
            { kana: 'ぴ', romaji: 'pi', row: 'p' },
            { kana: 'ぷ', romaji: 'pu', row: 'p' },
            { kana: 'ぺ', romaji: 'pe', row: 'p' },
            { kana: 'ぽ', romaji: 'po', row: 'p' }
        ],
        // Combination kana (Yōon)
        combo: [
            // K-combos
            { kana: 'きゃ', romaji: 'kya', row: 'combo-k' },
            { kana: 'きゅ', romaji: 'kyu', row: 'combo-k' },
            { kana: 'きょ', romaji: 'kyo', row: 'combo-k' },
            // S-combos
            { kana: 'しゃ', romaji: 'sha', row: 'combo-s', alt: ['sya'] },
            { kana: 'しゅ', romaji: 'shu', row: 'combo-s', alt: ['syu'] },
            { kana: 'しょ', romaji: 'sho', row: 'combo-s', alt: ['syo'] },
            // T-combos
            { kana: 'ちゃ', romaji: 'cha', row: 'combo-t', alt: ['tya'] },
            { kana: 'ちゅ', romaji: 'chu', row: 'combo-t', alt: ['tyu'] },
            { kana: 'ちょ', romaji: 'cho', row: 'combo-t', alt: ['tyo'] },
            // N-combos
            { kana: 'にゃ', romaji: 'nya', row: 'combo-n' },
            { kana: 'にゅ', romaji: 'nyu', row: 'combo-n' },
            { kana: 'にょ', romaji: 'nyo', row: 'combo-n' },
            // H-combos
            { kana: 'ひゃ', romaji: 'hya', row: 'combo-h' },
            { kana: 'ひゅ', romaji: 'hyu', row: 'combo-h' },
            { kana: 'ひょ', romaji: 'hyo', row: 'combo-h' },
            // M-combos
            { kana: 'みゃ', romaji: 'mya', row: 'combo-m' },
            { kana: 'みゅ', romaji: 'myu', row: 'combo-m' },
            { kana: 'みょ', romaji: 'myo', row: 'combo-m' },
            // R-combos
            { kana: 'りゃ', romaji: 'rya', row: 'combo-r' },
            { kana: 'りゅ', romaji: 'ryu', row: 'combo-r' },
            { kana: 'りょ', romaji: 'ryo', row: 'combo-r' },
            // G-combos
            { kana: 'ぎゃ', romaji: 'gya', row: 'combo-g' },
            { kana: 'ぎゅ', romaji: 'gyu', row: 'combo-g' },
            { kana: 'ぎょ', romaji: 'gyo', row: 'combo-g' },
            // Z-combos
            { kana: 'じゃ', romaji: 'ja', row: 'combo-z', alt: ['jya', 'zya'] },
            { kana: 'じゅ', romaji: 'ju', row: 'combo-z', alt: ['jyu', 'zyu'] },
            { kana: 'じょ', romaji: 'jo', row: 'combo-z', alt: ['jyo', 'zyo'] },
            // B-combos
            { kana: 'びゃ', romaji: 'bya', row: 'combo-b' },
            { kana: 'びゅ', romaji: 'byu', row: 'combo-b' },
            { kana: 'びょ', romaji: 'byo', row: 'combo-b' },
            // P-combos
            { kana: 'ぴゃ', romaji: 'pya', row: 'combo-p' },
            { kana: 'ぴゅ', romaji: 'pyu', row: 'combo-p' },
            { kana: 'ぴょ', romaji: 'pyo', row: 'combo-p' }
        ]
    },

    // ===== KATAKANA =====
    katakana: {
        basic: [
            // Vowels
            { kana: 'ア', romaji: 'a', row: 'vowel' },
            { kana: 'イ', romaji: 'i', row: 'vowel' },
            { kana: 'ウ', romaji: 'u', row: 'vowel' },
            { kana: 'エ', romaji: 'e', row: 'vowel' },
            { kana: 'オ', romaji: 'o', row: 'vowel' },
            // K-row
            { kana: 'カ', romaji: 'ka', row: 'k' },
            { kana: 'キ', romaji: 'ki', row: 'k' },
            { kana: 'ク', romaji: 'ku', row: 'k' },
            { kana: 'ケ', romaji: 'ke', row: 'k' },
            { kana: 'コ', romaji: 'ko', row: 'k' },
            // S-row
            { kana: 'サ', romaji: 'sa', row: 's' },
            { kana: 'シ', romaji: 'shi', row: 's', alt: ['si'] },
            { kana: 'ス', romaji: 'su', row: 's' },
            { kana: 'セ', romaji: 'se', row: 's' },
            { kana: 'ソ', romaji: 'so', row: 's' },
            // T-row
            { kana: 'タ', romaji: 'ta', row: 't' },
            { kana: 'チ', romaji: 'chi', row: 't', alt: ['ti'] },
            { kana: 'ツ', romaji: 'tsu', row: 't', alt: ['tu'] },
            { kana: 'テ', romaji: 'te', row: 't' },
            { kana: 'ト', romaji: 'to', row: 't' },
            // N-row
            { kana: 'ナ', romaji: 'na', row: 'n' },
            { kana: 'ニ', romaji: 'ni', row: 'n' },
            { kana: 'ヌ', romaji: 'nu', row: 'n' },
            { kana: 'ネ', romaji: 'ne', row: 'n' },
            { kana: 'ノ', romaji: 'no', row: 'n' },
            // H-row
            { kana: 'ハ', romaji: 'ha', row: 'h' },
            { kana: 'ヒ', romaji: 'hi', row: 'h' },
            { kana: 'フ', romaji: 'fu', row: 'h', alt: ['hu'] },
            { kana: 'ヘ', romaji: 'he', row: 'h' },
            { kana: 'ホ', romaji: 'ho', row: 'h' },
            // M-row
            { kana: 'マ', romaji: 'ma', row: 'm' },
            { kana: 'ミ', romaji: 'mi', row: 'm' },
            { kana: 'ム', romaji: 'mu', row: 'm' },
            { kana: 'メ', romaji: 'me', row: 'm' },
            { kana: 'モ', romaji: 'mo', row: 'm' },
            // Y-row
            { kana: 'ヤ', romaji: 'ya', row: 'y' },
            { kana: 'ユ', romaji: 'yu', row: 'y' },
            { kana: 'ヨ', romaji: 'yo', row: 'y' },
            // R-row
            { kana: 'ラ', romaji: 'ra', row: 'r' },
            { kana: 'リ', romaji: 'ri', row: 'r' },
            { kana: 'ル', romaji: 'ru', row: 'r' },
            { kana: 'レ', romaji: 're', row: 'r' },
            { kana: 'ロ', romaji: 'ro', row: 'r' },
            // W-row
            { kana: 'ワ', romaji: 'wa', row: 'w' },
            { kana: 'ヲ', romaji: 'wo', row: 'w', alt: ['o'] },
            // N
            { kana: 'ン', romaji: 'n', row: 'special', alt: ['nn'] }
        ],
        dakuten: [
            // G-row
            { kana: 'ガ', romaji: 'ga', row: 'g' },
            { kana: 'ギ', romaji: 'gi', row: 'g' },
            { kana: 'グ', romaji: 'gu', row: 'g' },
            { kana: 'ゲ', romaji: 'ge', row: 'g' },
            { kana: 'ゴ', romaji: 'go', row: 'g' },
            // Z-row
            { kana: 'ザ', romaji: 'za', row: 'z' },
            { kana: 'ジ', romaji: 'ji', row: 'z', alt: ['zi'] },
            { kana: 'ズ', romaji: 'zu', row: 'z' },
            { kana: 'ゼ', romaji: 'ze', row: 'z' },
            { kana: 'ゾ', romaji: 'zo', row: 'z' },
            // D-row
            { kana: 'ダ', romaji: 'da', row: 'd' },
            { kana: 'ヂ', romaji: 'ji', row: 'd', alt: ['di', 'dji'] },
            { kana: 'ヅ', romaji: 'zu', row: 'd', alt: ['du', 'dzu'] },
            { kana: 'デ', romaji: 'de', row: 'd' },
            { kana: 'ド', romaji: 'do', row: 'd' },
            // B-row
            { kana: 'バ', romaji: 'ba', row: 'b' },
            { kana: 'ビ', romaji: 'bi', row: 'b' },
            { kana: 'ブ', romaji: 'bu', row: 'b' },
            { kana: 'ベ', romaji: 'be', row: 'b' },
            { kana: 'ボ', romaji: 'bo', row: 'b' },
            // P-row
            { kana: 'パ', romaji: 'pa', row: 'p' },
            { kana: 'ピ', romaji: 'pi', row: 'p' },
            { kana: 'プ', romaji: 'pu', row: 'p' },
            { kana: 'ペ', romaji: 'pe', row: 'p' },
            { kana: 'ポ', romaji: 'po', row: 'p' }
        ],
        combo: [
            // K-combos
            { kana: 'キャ', romaji: 'kya', row: 'combo-k' },
            { kana: 'キュ', romaji: 'kyu', row: 'combo-k' },
            { kana: 'キョ', romaji: 'kyo', row: 'combo-k' },
            // S-combos
            { kana: 'シャ', romaji: 'sha', row: 'combo-s', alt: ['sya'] },
            { kana: 'シュ', romaji: 'shu', row: 'combo-s', alt: ['syu'] },
            { kana: 'ショ', romaji: 'sho', row: 'combo-s', alt: ['syo'] },
            // T-combos
            { kana: 'チャ', romaji: 'cha', row: 'combo-t', alt: ['tya'] },
            { kana: 'チュ', romaji: 'chu', row: 'combo-t', alt: ['tyu'] },
            { kana: 'チョ', romaji: 'cho', row: 'combo-t', alt: ['tyo'] },
            // N-combos
            { kana: 'ニャ', romaji: 'nya', row: 'combo-n' },
            { kana: 'ニュ', romaji: 'nyu', row: 'combo-n' },
            { kana: 'ニョ', romaji: 'nyo', row: 'combo-n' },
            // H-combos
            { kana: 'ヒャ', romaji: 'hya', row: 'combo-h' },
            { kana: 'ヒュ', romaji: 'hyu', row: 'combo-h' },
            { kana: 'ヒョ', romaji: 'hyo', row: 'combo-h' },
            // M-combos
            { kana: 'ミャ', romaji: 'mya', row: 'combo-m' },
            { kana: 'ミュ', romaji: 'myu', row: 'combo-m' },
            { kana: 'ミョ', romaji: 'myo', row: 'combo-m' },
            // R-combos
            { kana: 'リャ', romaji: 'rya', row: 'combo-r' },
            { kana: 'リュ', romaji: 'ryu', row: 'combo-r' },
            { kana: 'リョ', romaji: 'ryo', row: 'combo-r' },
            // G-combos
            { kana: 'ギャ', romaji: 'gya', row: 'combo-g' },
            { kana: 'ギュ', romaji: 'gyu', row: 'combo-g' },
            { kana: 'ギョ', romaji: 'gyo', row: 'combo-g' },
            // Z-combos
            { kana: 'ジャ', romaji: 'ja', row: 'combo-z', alt: ['jya', 'zya'] },
            { kana: 'ジュ', romaji: 'ju', row: 'combo-z', alt: ['jyu', 'zyu'] },
            { kana: 'ジョ', romaji: 'jo', row: 'combo-z', alt: ['jyo', 'zyo'] },
            // B-combos
            { kana: 'ビャ', romaji: 'bya', row: 'combo-b' },
            { kana: 'ビュ', romaji: 'byu', row: 'combo-b' },
            { kana: 'ビョ', romaji: 'byo', row: 'combo-b' },
            // P-combos
            { kana: 'ピャ', romaji: 'pya', row: 'combo-p' },
            { kana: 'ピュ', romaji: 'pyu', row: 'combo-p' },
            { kana: 'ピョ', romaji: 'pyo', row: 'combo-p' },
            // Extended katakana for foreign words
            { kana: 'ファ', romaji: 'fa', row: 'extended' },
            { kana: 'フィ', romaji: 'fi', row: 'extended' },
            { kana: 'フェ', romaji: 'fe', row: 'extended' },
            { kana: 'フォ', romaji: 'fo', row: 'extended' },
            { kana: 'ティ', romaji: 'ti', row: 'extended' },
            { kana: 'ディ', romaji: 'di', row: 'extended' },
            { kana: 'ヴァ', romaji: 'va', row: 'extended' },
            { kana: 'ヴィ', romaji: 'vi', row: 'extended' },
            { kana: 'ヴ', romaji: 'vu', row: 'extended' },
            { kana: 'ヴェ', romaji: 've', row: 'extended' },
            { kana: 'ヴォ', romaji: 'vo', row: 'extended' }
        ]
    }
};

// ===== JAPANESE VOCABULARY DATABASE =====
// 200+ words for Word Builder mode
const VOCABULARY = {
    // Basic greetings and expressions
    greetings: [
        { word: 'こんにちは', romaji: 'konnichiwa', meaning: 'Hello (daytime)', kana: ['こ', 'ん', 'に', 'ち', 'は'] },
        { word: 'おはよう', romaji: 'ohayou', meaning: 'Good morning', kana: ['お', 'は', 'よ', 'う'] },
        { word: 'こんばんは', romaji: 'konbanwa', meaning: 'Good evening', kana: ['こ', 'ん', 'ば', 'ん', 'は'] },
        { word: 'さようなら', romaji: 'sayounara', meaning: 'Goodbye', kana: ['さ', 'よ', 'う', 'な', 'ら'] },
        { word: 'ありがとう', romaji: 'arigatou', meaning: 'Thank you', kana: ['あ', 'り', 'が', 'と', 'う'] },
        { word: 'すみません', romaji: 'sumimasen', meaning: 'Excuse me / Sorry', kana: ['す', 'み', 'ま', 'せ', 'ん'] },
        { word: 'おやすみ', romaji: 'oyasumi', meaning: 'Good night', kana: ['お', 'や', 'す', 'み'] },
        { word: 'いただきます', romaji: 'itadakimasu', meaning: 'Thanks for the meal (before)', kana: ['い', 'た', 'だ', 'き', 'ま', 'す'] },
        { word: 'ごちそうさま', romaji: 'gochisousama', meaning: 'Thanks for the meal (after)', kana: ['ご', 'ち', 'そ', 'う', 'さ', 'ま'] },
        { word: 'はじめまして', romaji: 'hajimemashite', meaning: 'Nice to meet you', kana: ['は', 'じ', 'め', 'ま', 'し', 'て'] }
    ],
    // Numbers
    numbers: [
        { word: 'いち', romaji: 'ichi', meaning: 'One', kana: ['い', 'ち'] },
        { word: 'に', romaji: 'ni', meaning: 'Two', kana: ['に'] },
        { word: 'さん', romaji: 'san', meaning: 'Three', kana: ['さ', 'ん'] },
        { word: 'よん', romaji: 'yon', meaning: 'Four', kana: ['よ', 'ん'] },
        { word: 'ご', romaji: 'go', meaning: 'Five', kana: ['ご'] },
        { word: 'ろく', romaji: 'roku', meaning: 'Six', kana: ['ろ', 'く'] },
        { word: 'なな', romaji: 'nana', meaning: 'Seven', kana: ['な', 'な'] },
        { word: 'はち', romaji: 'hachi', meaning: 'Eight', kana: ['は', 'ち'] },
        { word: 'きゅう', romaji: 'kyuu', meaning: 'Nine', kana: ['き', 'ゅ', 'う'] },
        { word: 'じゅう', romaji: 'juu', meaning: 'Ten', kana: ['じ', 'ゅ', 'う'] },
        { word: 'ひゃく', romaji: 'hyaku', meaning: 'Hundred', kana: ['ひ', 'ゃ', 'く'] },
        { word: 'せん', romaji: 'sen', meaning: 'Thousand', kana: ['せ', 'ん'] }
    ],
    // Colors
    colors: [
        { word: 'あか', romaji: 'aka', meaning: 'Red', kana: ['あ', 'か'] },
        { word: 'あお', romaji: 'ao', meaning: 'Blue', kana: ['あ', 'お'] },
        { word: 'きいろ', romaji: 'kiiro', meaning: 'Yellow', kana: ['き', 'い', 'ろ'] },
        { word: 'みどり', romaji: 'midori', meaning: 'Green', kana: ['み', 'ど', 'り'] },
        { word: 'しろ', romaji: 'shiro', meaning: 'White', kana: ['し', 'ろ'] },
        { word: 'くろ', romaji: 'kuro', meaning: 'Black', kana: ['く', 'ろ'] },
        { word: 'ちゃいろ', romaji: 'chairo', meaning: 'Brown', kana: ['ち', 'ゃ', 'い', 'ろ'] },
        { word: 'むらさき', romaji: 'murasaki', meaning: 'Purple', kana: ['む', 'ら', 'さ', 'き'] },
        { word: 'ピンク', romaji: 'pinku', meaning: 'Pink', kana: ['ピ', 'ン', 'ク'], type: 'katakana' },
        { word: 'オレンジ', romaji: 'orenji', meaning: 'Orange', kana: ['オ', 'レ', 'ン', 'ジ'], type: 'katakana' }
    ],
    // Animals
    animals: [
        { word: 'いぬ', romaji: 'inu', meaning: 'Dog', kana: ['い', 'ぬ'] },
        { word: 'ねこ', romaji: 'neko', meaning: 'Cat', kana: ['ね', 'こ'] },
        { word: 'とり', romaji: 'tori', meaning: 'Bird', kana: ['と', 'り'] },
        { word: 'さかな', romaji: 'sakana', meaning: 'Fish', kana: ['さ', 'か', 'な'] },
        { word: 'うさぎ', romaji: 'usagi', meaning: 'Rabbit', kana: ['う', 'さ', 'ぎ'] },
        { word: 'うま', romaji: 'uma', meaning: 'Horse', kana: ['う', 'ま'] },
        { word: 'うし', romaji: 'ushi', meaning: 'Cow', kana: ['う', 'し'] },
        { word: 'ぶた', romaji: 'buta', meaning: 'Pig', kana: ['ぶ', 'た'] },
        { word: 'さる', romaji: 'saru', meaning: 'Monkey', kana: ['さ', 'る'] },
        { word: 'ぞう', romaji: 'zou', meaning: 'Elephant', kana: ['ぞ', 'う'] },
        { word: 'くま', romaji: 'kuma', meaning: 'Bear', kana: ['く', 'ま'] },
        { word: 'きつね', romaji: 'kitsune', meaning: 'Fox', kana: ['き', 'つ', 'ね'] },
        { word: 'たぬき', romaji: 'tanuki', meaning: 'Raccoon dog', kana: ['た', 'ぬ', 'き'] },
        { word: 'ねずみ', romaji: 'nezumi', meaning: 'Mouse', kana: ['ね', 'ず', 'み'] },
        { word: 'かめ', romaji: 'kame', meaning: 'Turtle', kana: ['か', 'め'] }
    ],
    // Food
    food: [
        { word: 'ごはん', romaji: 'gohan', meaning: 'Rice / Meal', kana: ['ご', 'は', 'ん'] },
        { word: 'みず', romaji: 'mizu', meaning: 'Water', kana: ['み', 'ず'] },
        { word: 'おちゃ', romaji: 'ocha', meaning: 'Tea', kana: ['お', 'ち', 'ゃ'] },
        { word: 'パン', romaji: 'pan', meaning: 'Bread', kana: ['パ', 'ン'], type: 'katakana' },
        { word: 'たまご', romaji: 'tamago', meaning: 'Egg', kana: ['た', 'ま', 'ご'] },
        { word: 'にく', romaji: 'niku', meaning: 'Meat', kana: ['に', 'く'] },
        { word: 'やさい', romaji: 'yasai', meaning: 'Vegetable', kana: ['や', 'さ', 'い'] },
        { word: 'くだもの', romaji: 'kudamono', meaning: 'Fruit', kana: ['く', 'だ', 'も', 'の'] },
        { word: 'りんご', romaji: 'ringo', meaning: 'Apple', kana: ['り', 'ん', 'ご'] },
        { word: 'みかん', romaji: 'mikan', meaning: 'Mandarin orange', kana: ['み', 'か', 'ん'] },
        { word: 'すし', romaji: 'sushi', meaning: 'Sushi', kana: ['す', 'し'] },
        { word: 'ラーメン', romaji: 'raamen', meaning: 'Ramen', kana: ['ラ', 'ー', 'メ', 'ン'], type: 'katakana' },
        { word: 'うどん', romaji: 'udon', meaning: 'Udon noodles', kana: ['う', 'ど', 'ん'] },
        { word: 'そば', romaji: 'soba', meaning: 'Buckwheat noodles', kana: ['そ', 'ば'] },
        { word: 'てんぷら', romaji: 'tenpura', meaning: 'Tempura', kana: ['て', 'ん', 'ぷ', 'ら'] }
    ],
    // Body parts
    body: [
        { word: 'あたま', romaji: 'atama', meaning: 'Head', kana: ['あ', 'た', 'ま'] },
        { word: 'め', romaji: 'me', meaning: 'Eye', kana: ['め'] },
        { word: 'みみ', romaji: 'mimi', meaning: 'Ear', kana: ['み', 'み'] },
        { word: 'はな', romaji: 'hana', meaning: 'Nose', kana: ['は', 'な'] },
        { word: 'くち', romaji: 'kuchi', meaning: 'Mouth', kana: ['く', 'ち'] },
        { word: 'て', romaji: 'te', meaning: 'Hand', kana: ['て'] },
        { word: 'あし', romaji: 'ashi', meaning: 'Leg / Foot', kana: ['あ', 'し'] },
        { word: 'かお', romaji: 'kao', meaning: 'Face', kana: ['か', 'お'] },
        { word: 'からだ', romaji: 'karada', meaning: 'Body', kana: ['か', 'ら', 'だ'] },
        { word: 'こころ', romaji: 'kokoro', meaning: 'Heart / Mind', kana: ['こ', 'こ', 'ろ'] }
    ],
    // Nature
    nature: [
        { word: 'やま', romaji: 'yama', meaning: 'Mountain', kana: ['や', 'ま'] },
        { word: 'かわ', romaji: 'kawa', meaning: 'River', kana: ['か', 'わ'] },
        { word: 'うみ', romaji: 'umi', meaning: 'Sea', kana: ['う', 'み'] },
        { word: 'そら', romaji: 'sora', meaning: 'Sky', kana: ['そ', 'ら'] },
        { word: 'つき', romaji: 'tsuki', meaning: 'Moon', kana: ['つ', 'き'] },
        { word: 'ほし', romaji: 'hoshi', meaning: 'Star', kana: ['ほ', 'し'] },
        { word: 'たいよう', romaji: 'taiyou', meaning: 'Sun', kana: ['た', 'い', 'よ', 'う'] },
        { word: 'はな', romaji: 'hana', meaning: 'Flower', kana: ['は', 'な'] },
        { word: 'き', romaji: 'ki', meaning: 'Tree', kana: ['き'] },
        { word: 'もり', romaji: 'mori', meaning: 'Forest', kana: ['も', 'り'] },
        { word: 'くも', romaji: 'kumo', meaning: 'Cloud', kana: ['く', 'も'] },
        { word: 'あめ', romaji: 'ame', meaning: 'Rain', kana: ['あ', 'め'] },
        { word: 'ゆき', romaji: 'yuki', meaning: 'Snow', kana: ['ゆ', 'き'] },
        { word: 'かぜ', romaji: 'kaze', meaning: 'Wind', kana: ['か', 'ぜ'] }
    ],
    // Family
    family: [
        { word: 'おかあさん', romaji: 'okaasan', meaning: 'Mother', kana: ['お', 'か', 'あ', 'さ', 'ん'] },
        { word: 'おとうさん', romaji: 'otousan', meaning: 'Father', kana: ['お', 'と', 'う', 'さ', 'ん'] },
        { word: 'あね', romaji: 'ane', meaning: 'Older sister', kana: ['あ', 'ね'] },
        { word: 'あに', romaji: 'ani', meaning: 'Older brother', kana: ['あ', 'に'] },
        { word: 'いもうと', romaji: 'imouto', meaning: 'Younger sister', kana: ['い', 'も', 'う', 'と'] },
        { word: 'おとうと', romaji: 'otouto', meaning: 'Younger brother', kana: ['お', 'と', 'う', 'と'] },
        { word: 'おばあさん', romaji: 'obaasan', meaning: 'Grandmother', kana: ['お', 'ば', 'あ', 'さ', 'ん'] },
        { word: 'おじいさん', romaji: 'ojiisan', meaning: 'Grandfather', kana: ['お', 'じ', 'い', 'さ', 'ん'] },
        { word: 'かぞく', romaji: 'kazoku', meaning: 'Family', kana: ['か', 'ぞ', 'く'] },
        { word: 'こども', romaji: 'kodomo', meaning: 'Child', kana: ['こ', 'ど', 'も'] }
    ],
    // Time
    time: [
        { word: 'きょう', romaji: 'kyou', meaning: 'Today', kana: ['き', 'ょ', 'う'] },
        { word: 'あした', romaji: 'ashita', meaning: 'Tomorrow', kana: ['あ', 'し', 'た'] },
        { word: 'きのう', romaji: 'kinou', meaning: 'Yesterday', kana: ['き', 'の', 'う'] },
        { word: 'いま', romaji: 'ima', meaning: 'Now', kana: ['い', 'ま'] },
        { word: 'あさ', romaji: 'asa', meaning: 'Morning', kana: ['あ', 'さ'] },
        { word: 'ひる', romaji: 'hiru', meaning: 'Noon / Daytime', kana: ['ひ', 'る'] },
        { word: 'よる', romaji: 'yoru', meaning: 'Night', kana: ['よ', 'る'] },
        { word: 'まいにち', romaji: 'mainichi', meaning: 'Every day', kana: ['ま', 'い', 'に', 'ち'] },
        { word: 'しゅうまつ', romaji: 'shuumatsu', meaning: 'Weekend', kana: ['し', 'ゅ', 'う', 'ま', 'つ'] }
    ],
    // Places
    places: [
        { word: 'いえ', romaji: 'ie', meaning: 'House', kana: ['い', 'え'] },
        { word: 'がっこう', romaji: 'gakkou', meaning: 'School', kana: ['が', 'っ', 'こ', 'う'] },
        { word: 'えき', romaji: 'eki', meaning: 'Station', kana: ['え', 'き'] },
        { word: 'みせ', romaji: 'mise', meaning: 'Shop', kana: ['み', 'せ'] },
        { word: 'びょういん', romaji: 'byouin', meaning: 'Hospital', kana: ['び', 'ょ', 'う', 'い', 'ん'] },
        { word: 'こうえん', romaji: 'kouen', meaning: 'Park', kana: ['こ', 'う', 'え', 'ん'] },
        { word: 'としょかん', romaji: 'toshokan', meaning: 'Library', kana: ['と', 'し', 'ょ', 'か', 'ん'] },
        { word: 'ゆうびんきょく', romaji: 'yuubinkyoku', meaning: 'Post office', kana: ['ゆ', 'う', 'び', 'ん', 'き', 'ょ', 'く'] },
        { word: 'ぎんこう', romaji: 'ginkou', meaning: 'Bank', kana: ['ぎ', 'ん', 'こ', 'う'] },
        { word: 'レストラン', romaji: 'resutoran', meaning: 'Restaurant', kana: ['レ', 'ス', 'ト', 'ラ', 'ン'], type: 'katakana' },
        { word: 'ホテル', romaji: 'hoteru', meaning: 'Hotel', kana: ['ホ', 'テ', 'ル'], type: 'katakana' },
        { word: 'コンビニ', romaji: 'konbini', meaning: 'Convenience store', kana: ['コ', 'ン', 'ビ', 'ニ'], type: 'katakana' }
    ],
    // Common verbs (dictionary form)
    verbs: [
        { word: 'たべる', romaji: 'taberu', meaning: 'To eat', kana: ['た', 'べ', 'る'] },
        { word: 'のむ', romaji: 'nomu', meaning: 'To drink', kana: ['の', 'む'] },
        { word: 'みる', romaji: 'miru', meaning: 'To see', kana: ['み', 'る'] },
        { word: 'きく', romaji: 'kiku', meaning: 'To listen', kana: ['き', 'く'] },
        { word: 'いく', romaji: 'iku', meaning: 'To go', kana: ['い', 'く'] },
        { word: 'くる', romaji: 'kuru', meaning: 'To come', kana: ['く', 'る'] },
        { word: 'する', romaji: 'suru', meaning: 'To do', kana: ['す', 'る'] },
        { word: 'ある', romaji: 'aru', meaning: 'To exist (things)', kana: ['あ', 'る'] },
        { word: 'いる', romaji: 'iru', meaning: 'To exist (living)', kana: ['い', 'る'] },
        { word: 'かく', romaji: 'kaku', meaning: 'To write', kana: ['か', 'く'] },
        { word: 'よむ', romaji: 'yomu', meaning: 'To read', kana: ['よ', 'む'] },
        { word: 'はなす', romaji: 'hanasu', meaning: 'To speak', kana: ['は', 'な', 'す'] },
        { word: 'わかる', romaji: 'wakaru', meaning: 'To understand', kana: ['わ', 'か', 'る'] },
        { word: 'おもう', romaji: 'omou', meaning: 'To think', kana: ['お', 'も', 'う'] },
        { word: 'あそぶ', romaji: 'asobu', meaning: 'To play', kana: ['あ', 'そ', 'ぶ'] }
    ],
    // Adjectives
    adjectives: [
        { word: 'おおきい', romaji: 'ookii', meaning: 'Big', kana: ['お', 'お', 'き', 'い'] },
        { word: 'ちいさい', romaji: 'chiisai', meaning: 'Small', kana: ['ち', 'い', 'さ', 'い'] },
        { word: 'あたらしい', romaji: 'atarashii', meaning: 'New', kana: ['あ', 'た', 'ら', 'し', 'い'] },
        { word: 'ふるい', romaji: 'furui', meaning: 'Old', kana: ['ふ', 'る', 'い'] },
        { word: 'たかい', romaji: 'takai', meaning: 'Expensive / Tall', kana: ['た', 'か', 'い'] },
        { word: 'やすい', romaji: 'yasui', meaning: 'Cheap', kana: ['や', 'す', 'い'] },
        { word: 'いい', romaji: 'ii', meaning: 'Good', kana: ['い', 'い'] },
        { word: 'わるい', romaji: 'warui', meaning: 'Bad', kana: ['わ', 'る', 'い'] },
        { word: 'あつい', romaji: 'atsui', meaning: 'Hot', kana: ['あ', 'つ', 'い'] },
        { word: 'さむい', romaji: 'samui', meaning: 'Cold', kana: ['さ', 'む', 'い'] },
        { word: 'たのしい', romaji: 'tanoshii', meaning: 'Fun', kana: ['た', 'の', 'し', 'い'] },
        { word: 'かわいい', romaji: 'kawaii', meaning: 'Cute', kana: ['か', 'わ', 'い', 'い'] },
        { word: 'おいしい', romaji: 'oishii', meaning: 'Delicious', kana: ['お', 'い', 'し', 'い'] },
        { word: 'すごい', romaji: 'sugoi', meaning: 'Amazing', kana: ['す', 'ご', 'い'] }
    ],
    // Common objects
    objects: [
        { word: 'ほん', romaji: 'hon', meaning: 'Book', kana: ['ほ', 'ん'] },
        { word: 'かばん', romaji: 'kaban', meaning: 'Bag', kana: ['か', 'ば', 'ん'] },
        { word: 'でんわ', romaji: 'denwa', meaning: 'Telephone', kana: ['で', 'ん', 'わ'] },
        { word: 'くるま', romaji: 'kuruma', meaning: 'Car', kana: ['く', 'る', 'ま'] },
        { word: 'じてんしゃ', romaji: 'jitensha', meaning: 'Bicycle', kana: ['じ', 'て', 'ん', 'し', 'ゃ'] },
        { word: 'かさ', romaji: 'kasa', meaning: 'Umbrella', kana: ['か', 'さ'] },
        { word: 'めがね', romaji: 'megane', meaning: 'Glasses', kana: ['め', 'が', 'ね'] },
        { word: 'とけい', romaji: 'tokei', meaning: 'Clock / Watch', kana: ['と', 'け', 'い'] },
        { word: 'かぎ', romaji: 'kagi', meaning: 'Key', kana: ['か', 'ぎ'] },
        { word: 'さいふ', romaji: 'saifu', meaning: 'Wallet', kana: ['さ', 'い', 'ふ'] },
        { word: 'テレビ', romaji: 'terebi', meaning: 'Television', kana: ['テ', 'レ', 'ビ'], type: 'katakana' },
        { word: 'パソコン', romaji: 'pasokon', meaning: 'Computer', kana: ['パ', 'ソ', 'コ', 'ン'], type: 'katakana' },
        { word: 'スマホ', romaji: 'sumaho', meaning: 'Smartphone', kana: ['ス', 'マ', 'ホ'], type: 'katakana' },
        { word: 'カメラ', romaji: 'kamera', meaning: 'Camera', kana: ['カ', 'メ', 'ラ'], type: 'katakana' }
    ],
    // Countries (mostly katakana)
    countries: [
        { word: 'にほん', romaji: 'nihon', meaning: 'Japan', kana: ['に', 'ほ', 'ん'] },
        { word: 'アメリカ', romaji: 'amerika', meaning: 'America', kana: ['ア', 'メ', 'リ', 'カ'], type: 'katakana' },
        { word: 'イギリス', romaji: 'igirisu', meaning: 'England', kana: ['イ', 'ギ', 'リ', 'ス'], type: 'katakana' },
        { word: 'フランス', romaji: 'furansu', meaning: 'France', kana: ['フ', 'ラ', 'ン', 'ス'], type: 'katakana' },
        { word: 'ドイツ', romaji: 'doitsu', meaning: 'Germany', kana: ['ド', 'イ', 'ツ'], type: 'katakana' },
        { word: 'ちゅうごく', romaji: 'chuugoku', meaning: 'China', kana: ['ち', 'ゅ', 'う', 'ご', 'く'] },
        { word: 'かんこく', romaji: 'kankoku', meaning: 'Korea', kana: ['か', 'ん', 'こ', 'く'] },
        { word: 'オーストラリア', romaji: 'oosutoraria', meaning: 'Australia', kana: ['オ', 'ー', 'ス', 'ト', 'ラ', 'リ', 'ア'], type: 'katakana' },
        { word: 'カナダ', romaji: 'kanada', meaning: 'Canada', kana: ['カ', 'ナ', 'ダ'], type: 'katakana' },
        { word: 'ブラジル', romaji: 'burajiru', meaning: 'Brazil', kana: ['ブ', 'ラ', 'ジ', 'ル'], type: 'katakana' }
    ],
    // Common expressions
    expressions: [
        { word: 'だいじょうぶ', romaji: 'daijoubu', meaning: "It's okay / Are you okay?", kana: ['だ', 'い', 'じ', 'ょ', 'う', 'ぶ'] },
        { word: 'なんですか', romaji: 'nandesuka', meaning: 'What is it?', kana: ['な', 'ん', 'で', 'す', 'か'] },
        { word: 'おねがいします', romaji: 'onegaishimasu', meaning: 'Please', kana: ['お', 'ね', 'が', 'い', 'し', 'ま', 'す'] },
        { word: 'わかりました', romaji: 'wakarimashita', meaning: 'I understand', kana: ['わ', 'か', 'り', 'ま', 'し', 'た'] },
        { word: 'ちょっとまって', romaji: 'chottomatte', meaning: 'Wait a moment', kana: ['ち', 'ょ', 'っ', 'と', 'ま', 'っ', 'て'] },
        { word: 'がんばって', romaji: 'ganbatte', meaning: 'Good luck / Do your best', kana: ['が', 'ん', 'ば', 'っ', 'て'] },
        { word: 'おめでとう', romaji: 'omedetou', meaning: 'Congratulations', kana: ['お', 'め', 'で', 'と', 'う'] },
        { word: 'ごめんなさい', romaji: 'gomennasai', meaning: "I'm sorry", kana: ['ご', 'め', 'ん', 'な', 'さ', 'い'] }
    ]
};

// Positive feedback messages
const POSITIVE_FEEDBACK = [
    '🎉 Correct!', '✨ Great job!', '🌟 Excellent!', '👏 Well done!', 
    '🔥 Amazing!', '💪 Perfect!', '⭐ Superb!', '🎯 Spot on!',
    'すごい! (Amazing!)', 'よくできました! (Well done!)', 'せいかい! (Correct!)'
];

// Negative feedback messages
const NEGATIVE_FEEDBACK = [
    '❌ Not quite...', '😅 Oops!', '🤔 Try again!', '💭 Close!',
    'ざんねん... (Too bad...)', 'もういちど! (One more time!)'
];

// Encouragement messages
const ENCOURAGEMENT = [
    'Keep going! 頑張って!', 'You\'re learning fast!', 'Practice makes perfect!',
    'Don\'t give up!', 'You\'ve got this!', 'Almost there!'
];
