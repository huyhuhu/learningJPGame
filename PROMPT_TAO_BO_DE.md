# PROMPT: Sinh bộ đề trắc nghiệm cho Kana Master (myNotebookData)

> Cách dùng: copy **toàn bộ** phần trong khối `=== PROMPT ===` bên dưới, dán vào chat, điền phần
> `INPUT` ở cuối rồi gửi kèm ảnh/text sách Minna no Nihongo. Không cần Claude đọc lại source code.

---

```text
=== PROMPT BẮT ĐẦU ===

Bạn là người soạn đề trắc nghiệm tiếng Nhật cho app "Kana Master" (project D:\learningJPGame).
Nhiệm vụ: từ nội dung sách Minna no Nihongo mà tôi cung cấp (ảnh hoặc text), sinh ra ĐÚNG 2 file JSON
trong 1 folder mới dưới `myNotebookData/`.

============================================================
1. INPUT TÔI SẼ CUNG CẤP
============================================================
- Nội dung bài học: ảnh trang sách (từ vựng / 文型 / 例文 / 練習) hoặc text đã gõ sẵn.
- Tên bài (name): ví dụ "Lession_9" hoặc "Week_4_1".
- Độ khó (difficulty): `basic` | `hard` | `n4-mix`  (mặc định: `hard`).
- (Tuỳ chọn) Số câu hỏi (mặc định 100), tiền tố id, tên file.

Nếu input là ẢNH: trước khi sinh đề, hãy liệt kê ngắn gọn (tối đa 15 dòng) những gì bạn đọc được —
danh sách từ vựng, các mẫu ngữ pháp (文型), kanji xuất hiện. Rồi sinh đề luôn trong cùng một lượt,
KHÔNG hỏi lại tôi, trừ khi ảnh mờ không đọc được.
Chỉ được dùng từ vựng / ngữ pháp trong phạm vi bài đó (cộng các bài trước). Không tự thêm từ ngoài bài;
nếu bắt buộc phải dùng từ ngoài phạm vi, phải ghi furigana trong ngoặc, ví dụ: 家賃(やちん).

============================================================
2. OUTPUT: 2 FILE, 1 FOLDER
============================================================
Tạo folder `myNotebookData/<Label>/` với `<Label>` = tên bài tôi đưa (tên folder CHÍNH LÀ label hiển thị
trong app — label ghi trong file JSON sẽ bị ghi đè bằng tên folder, nên tên folder phải đúng ngay từ đầu).

Quy ước đặt tên (theo các bài đã có):
- Bài theo lesson:  folder `Lession_9/`   → `bai9.json` + `bai9_sub.json`
- Bài theo tuần:    folder `Week_4_1/`    → `data6.json` + `data6_sub.json`  (số data tăng dần, không trùng file cũ)

FILE 1 — bộ câu hỏi (`bai<N>.json`):
{
  "questions": [
    {
      "id": "b9h-001",
      "question": "Classify: |きれい| is which type of adjective?",
      "choices": ["な-adjective", "い-adjective", "Both (depends on context)", "Neither — it's a noun"],
      "answer": "な-adjective",
      "explanation": "⚠ TOP TRAP: きれい ENDS in い-sound but kanji 綺麗 has no い-okurigana. Behaves as な-adj: きれいな花, きれいでした, きれいじゃない."
    }
  ]
}
- KHÔNG đặt `kanji` / `words` trong file này (toàn bộ nằm ở file _sub).

FILE 2 — từ vựng / kanji (`bai<N>_sub.json`):
{
  "questions": [],
  "kanji": {
    "温": {
      "reading": "オン, あたた(かい), あたた(まる)",
      "meaning": "warm, temperature — 温泉 (hot spring), 温度 (temperature), 温かい (warm)",
      "label": "i-adjective"
    }
  },
  "words": {
    "便利": {
      "reading": "べんり",
      "meaning": "convenient, handy — exception trap: ends in り but is a な-adjective (便利な物). Opposite: 不便 (ふべん)",
      "label": "na-adjective"
    }
  }
}
- `"questions": []` là BẮT BUỘC trong file _sub. Nếu thiếu key này, script build coi file là sai format
  và bỏ qua toàn bộ kanji + words (mất dữ liệu, không báo lỗi rõ ràng).

============================================================
3. RÀNG BUỘC BẮT BUỘC (script build sẽ loại câu sai)
============================================================
1. Mỗi câu phải có đủ `question`, `choices`, `answer`. Thiếu 1 trong 3 → bị bỏ.
2. `choices`: mảng ĐÚNG 4 phần tử string (tối thiểu 2, nhưng toàn bộ đề hiện có đều dùng 4 → giữ 4).
3. `answer` phải TRÙNG TUYỆT ĐỐI (từng ký tự, kể cả dấu cách) với 1 phần tử trong `choices`. Sai → bị bỏ.
4. `question` phải DUY NHẤT trên TOÀN BỘ project (dedup theo text, chạy chung tất cả folder,
   folder sau bị loại nếu trùng folder trước). ĐÂY LÀ LỖI PHỔ BIẾN NHẤT — data hiện có đã mất 50 câu vì nó.
   → TUYỆT ĐỐI không dùng câu hỏi chung chung trần trụi kiểu `"Find the INCORRECT sentence:"` /
     `"Find the INCORRECT conjugation:"` (đã bị dùng nhiều lần ở các bài trước). Luôn thêm định danh
     chủ đề vào cuối: `"Find the INCORRECT sentence (い-adj + noun):"`,
     `"Find the INCORRECT sentence — past negative of な-adjectives:"`.
   → Khi ôn lại điểm ngữ pháp đã có ở bài trước, phải đổi cách diễn đạt
     (vd: "What is the present negative of |X|?" ↔ "Choose the present negative form of |X|:").
5. `id` duy nhất toàn project (không chỉ trong 1 folder — Week_2/data1 và Week_2/data2 hiện đang trùng
   100 id nên bị đổi thành `auto_N`). Format `<prefix>-001` … `-100`, 3 chữ số, tăng liên tục, không nhảy số.
   Prefix: `b<N>h` cho Lession N độ khó hard (`b9h`), `w<N>h` cho Week, bỏ `h` nếu difficulty = basic (`b9`).
   Nếu prefix đó đã tồn tại, thêm hậu tố phân biệt (`b9hb`).
9. Trong 1 câu, 4 `choices` không được trùng text nhau.
6. `explanation`: khuyến nghị 60–200 ký tự, tối đa ~350. Không để rỗng.
7. JSON hợp lệ: UTF-8 không BOM, indent 2 space, không dấu phẩy thừa, không comment.
8. Trong string dùng nháy đơn `'...'` hoặc 「」, KHÔNG dùng nháy kép chưa escape. Không có ký tự `<` `>`
   (app render escape HTML). Không có ký tự newline thật trong `question` / `explanation` (viết 1 dòng liền).

============================================================
4. QUY ƯỚC VIẾT NỘI DUNG
============================================================
- Cú pháp `|...|`: bọc từ/cụm cần highlight trong câu hỏi → app tô sáng. Dùng cho mục tiêu chính của câu
  (từ được hỏi nghĩa, cách đọc, dạng chia). Khoảng 40–50% số câu nên có `|...|`. Không dùng `|` trong choices/answer.
- Chỗ trống trong câu điền: dùng `___` (3 dấu gạch dưới). Nhiều chỗ trống → đánh dấu bằng lựa chọn dạng
  `"A=は / B=で / C=を"`.
- Ngôn ngữ: câu hỏi + giải thích viết bằng TIẾNG ANH, phần tiếng Nhật giữ nguyên chữ Nhật.
  Dấu câu tiếng Nhật dùng full-width: 。、「」?
- Thứ tự choices: đặt đáp án đúng ở vị trí ĐẦU (app tự shuffle khi làm bài, nên không lo học vẹt vị trí).
- Distractor phải hợp lý: cùng độ dài / cùng dạng với đáp án, sai vì một lý do ngữ pháp cụ thể
  (chia sai, particle sai, đọc sai, dùng な cho い-adj…). Không dùng "All of the above" / "None of the above".
- `explanation` nên có: lý do đúng + bẫy thường gặp (mở đầu bằng `⚠` khi là bẫy) + từ trái nghĩa / từ dễ lẫn.
- Câu đọc hiểu: `"Read: 「…đoạn văn…」 What is true?"`. Nếu dùng ngữ pháp N4 trở lên phải chú thích trong ngoặc,
  vd: `(食べていません = haven't eaten yet, N4)`.
- Không lặp lại y nguyên một từ vựng làm trọng tâm quá 3 câu.

============================================================
5. BỐ CỤC 100 CÂU (difficulty = hard — mặc định)
============================================================
Chia theo block, đi từ nhận biết → vận dụng → đọc hiểu. Điều chỉnh tỷ lệ theo nội dung thực tế của bài
(bài nhiều động từ thì tăng block chia động từ, bài nhiều trợ từ thì tăng block particle):
- 001–010  Nghĩa & phân loại từ: "What does |X| mean?", "Classify: |X| is which type of…?",
           "Find the only い-adjective among these:"
- 011–020  Mẫu ngữ pháp / trợ từ / cách nối: "Choose: 母___ナイフ___りんご___切ります。",
           "Choose the correct attachment: 静か___町。"
- 021–030  Tìm lỗi: "Find the INCORRECT sentence:", "Find the INCORRECT conjugation:"
           (3 câu đúng + 1 câu sai; câu sai là lỗi kinh điển của bài)
- 031–045  Luyện chia dạng: hiện tại/quá khứ × khẳng định/phủ định, thể ます/て/ない theo bài
- 046–055  Cặp dễ lẫn: "What's the difference between |暑い| and |熱い|?",
           kanji cùng cách đọc, từ Hán–Nhật gần nghĩa
- 056–065  Phó từ & từ nghi vấn của bài (とても / あまり / どう / どんな / どれ / どの…)
- 066–075  Dịch Anh→Nhật: "Translate: 'This restaurant is not famous.'"
- 076–085  Cụm cố định & hội thoại: "What does |そろそろ失礼します| mean and when is it said?",
           "Choose the natural reply to 「…」", kèm chú thích văn hoá khi cần
- 086–099  Đọc hiểu đoạn ngắn 2–4 câu, hỏi ý chính / chi tiết / thái độ người nói
- 100      "Final challenge — read carefully: 「…」" — đoạn dài nhất, tổng hợp ngữ pháp cả bài

Biến thể theo độ khó:
- `basic`  : bỏ block tìm lỗi và đọc hiểu dài (chỉ 5 câu đọc hiểu 1–2 câu); tập trung nghĩa, cách đọc,
             trợ từ, chia dạng cơ bản; câu ngắn; prefix id không có `h`.
- `hard`   : như bố cục trên.
- `n4-mix` : giữ bố cục hard, thêm ~15 câu dùng ngữ pháp N4 (て form, ている, たい, から/ので, ~より…),
             mỗi câu N4 phải chú thích `(N4)` trong đề.

============================================================
6. FILE _SUB: SỐ LƯỢNG & CHUẨN GHI
============================================================
- `kanji`: 20–25 entry. Key = 1 ký tự kanji duy nhất, chỉ lấy kanji thực sự xuất hiện trong bài/đề.
  `reading`: on'yomi bằng KATAKANA trước, kun'yomi bằng HIRAGANA sau, okurigana trong ngoặc.
             vd `"ジュウ, チョウ, おも(い), かさ(ねる)"`. Kokuji không có on'yomi thì chỉ ghi kun (vd 込).
  `meaning`: nghĩa tiếng Anh + `—` + 2–3 từ ghép ví dụ kèm nghĩa. Ghi rõ bẫy nếu có
             (vd 辛い = からい spicy / つらい painful).
- `words`: 5–30 entry. Key = từ/cụm như xuất hiện trong sách (kanji hoặc kana, kể cả câu cố định
  như `そろそろ失礼します`). `reading` = toàn bộ hiragana. `meaning` = nghĩa + sắc thái dùng
  + trái nghĩa / từ dễ lẫn + lưu ý văn hoá (vd お元気ですか không dùng làm câu chào hằng ngày).
- `label`: 1 nhãn ngắn phân loại, chọn trong: `noun`, `verb`, `i-adjective`, `na-adjective`, `adverb`,
  `particle`, `counter`, `number`, `time`, `place`, `direction`, `color`, `noun-suffix`, `set-phrase`,
  `question-word`, `conjunction`.

============================================================
7. VIỆC PHẢI LÀM SAU KHI GHI 2 FILE
============================================================
1. Chạy validator (tại D:\learningJPGame) — nó so cả với toàn bộ bài cũ:
   `node check-notebook-data.js <Label>`
   Phải ra `OK — no issues`. Còn lỗi thì SỬA rồi chạy lại; không được bỏ qua bất kỳ dòng `✗` nào
   thuộc label mới. (Chạy `node check-notebook-data.js` không tham số sẽ hiện cả lỗi tồn đọng của
   các bài cũ — những lỗi đó KHÔNG phải việc của lần này, đừng sửa file cũ nếu tôi không yêu cầu.)
2. Chạy build: `node build-notebook.js`
   → phải in đúng số câu của label mới (vd `[Lession_9] 100 question(s)`) và KHÔNG có dòng `⚠` nào
     của label mới. Số câu in ra < số câu trong JSON nghĩa là đã bị loại âm thầm → phải viết lại.
3. Báo lại cho tôi: số câu, số kanji, số words, phân bố các block, và những điểm ngữ pháp/bẫy đã bao phủ.
   KHÔNG tự commit git nếu tôi không yêu cầu.

============================================================
8. INPUT CỦA LẦN NÀY
============================================================
- name (tên folder/label): ...
- difficulty: hard
- số câu: 100
- nội dung sách (ảnh/text):
  ...

=== PROMPT KẾT THÚC ===
```

---

## Ghi chú nhanh (cho người dùng, không cần dán vào prompt)

| Điều | Giá trị |
|---|---|
| Folder script đọc | `myNotebookData/` ở root project |
| Tên folder | = label hiển thị trong app, ghi đè mọi `label` trong JSON |
| Lệnh kiểm tra | `node check-notebook-data.js [Label]` (mới thêm, exit 1 nếu có lỗi) |
| Lệnh build | `node build-notebook.js` → ghi lại `notebookData.js` |
| Bộ đề hiện có | Lession_6/7/8, Week_2, Week_2_A, Week_3_1, Week_3_2 — 832 câu trong JSON |
| Vị trí đáp án | Không quan trọng: app shuffle `choices` mỗi lần chơi (`tango.js:1022`) |
| `\|...\|` | Highlight từ mục tiêu (`tango.js:862`) |

### Lỗi tồn đọng trong data hiện tại (validator phát hiện, chưa sửa)

832 câu trong JSON nhưng `notebookData.js` chỉ còn **782 câu** — 50 câu bị `build-notebook.js` loại âm thầm:

| Lỗi | Số lượng | Nguyên nhân |
|---|---|---|
| Trùng text câu hỏi | 50 câu bị loại | Stem chung chung lặp lại giữa các bài, nhiều nhất là `Find the INCORRECT sentence:` |
| Trùng `id` | 100 câu bị đổi thành `auto_N` | `Week_2/data1.json` và `Week_2/data2.json` đều dùng `w2-001`…`w2-100` |
| Trùng đáp án trong cùng câu | 2 câu | 2 phần tử `choices` giống nhau |

Mất câu nhiều nhất: `Week_3_1` (100 → 86), `Lession_8` (100 → 93), `Lession_6` (100 → 95).
Muốn sửa thì nói, tôi rename id + viết lại các stem bị trùng.
