// ===== TANGO-CHO (単語帳) — Custom Kanji & Sentence Mode =====

const TANGO_STORAGE_KEY = 'tangoChoData';

let tangoData = {
    questions: [],
    kanji: {},
    words: {}
};

let tangoQuizState = {
    questions: [],
    index: 0,
    score: 0,
    correct: 0,
    wrong: 0
};

let pendingAnnotation = {
    kanji: [],
    words: [],
    afterSave: null
};

// ===== STORAGE =====
function loadTangoData() {
    const saved = localStorage.getItem(TANGO_STORAGE_KEY);
    if (saved) {
        try {
            tangoData = JSON.parse(saved);
            if (!tangoData.questions) tangoData.questions = [];
            if (!tangoData.kanji) tangoData.kanji = {};
            if (!tangoData.words) tangoData.words = {};
            if (typeof tangoData.seedVersion !== 'number') tangoData.seedVersion = 0;
        } catch (e) {
            tangoData = { questions: [], kanji: {}, words: {}, seedVersion: 0 };
        }
    } else {
        tangoData = { questions: [], kanji: {}, words: {}, seedVersion: 0 };
    }
    // Schema migration: ensure all entries have a label field
    Object.values(tangoData.kanji).forEach(v => { if (!('label' in v)) v.label = ''; });
    Object.values(tangoData.words).forEach(v => { if (!('label' in v)) v.label = ''; });
    mergeSeedData();
    mergeNotebookData();
    backfillLibraryFromQuestions();
}

// Ensure every kanji/marked-word that appears in any question has a library entry.
// Empty entries are added so the hint UI and library list can find them — the dev
// or user fills in reading/meaning later. Idempotent: only adds what's missing.
function backfillLibraryFromQuestions() {
    let changed = false;
    tangoData.questions.forEach(q => {
        const ext = extractFromQuestion(q);
        ext.kanji.forEach(k => {
            if (!tangoData.kanji[k]) {
                tangoData.kanji[k] = { reading: '', meaning: '', label: '' };
                changed = true;
            } else if (!('label' in tangoData.kanji[k])) {
                tangoData.kanji[k].label = '';
                changed = true;
            }
        });
        ext.words.forEach(w => {
            if (!tangoData.words[w]) {
                tangoData.words[w] = { reading: '', meaning: '', label: '' };
                changed = true;
            } else if (!('label' in tangoData.words[w])) {
                tangoData.words[w].label = '';
                changed = true;
            }
        });
    });
    if (changed) saveTangoData();
}

function mergeSeedData() {
    if (typeof TANGO_SEED_DATA === 'undefined') return;
    const seed = TANGO_SEED_DATA;
    if ((seed.version || 0) <= (tangoData.seedVersion || 0)) return;

    // Merge questions — skip if id or identical question text already exists.
    // For existing questions, backfill empty `explanation` from seed (never overwrite user content).
    const byId = {};
    const byText = {};
    tangoData.questions.forEach(q => {
        if (q.id) byId[q.id] = q;
        if (q.question) byText[q.question] = q;
    });
    (seed.questions || []).forEach(q => {
        if (!q.question || !q.choices || !q.answer) return;
        const existing = (q.id && byId[q.id]) || byText[q.question];
        if (existing) {
            if (!existing.explanation && q.explanation) existing.explanation = q.explanation;
            if (!existing.label && q.label) existing.label = q.label;
            return;
        }
        tangoData.questions.push({
            id: q.id || ('seed-' + Date.now() + Math.random().toString(36).slice(2, 7)),
            question: q.question,
            choices: [...q.choices],
            answer: q.answer,
            explanation: q.explanation || '',
            label: q.label || ''
        });
    });

    // Merge kanji & words. Add missing entries; for existing entries,
    // backfill only EMPTY fields (so user edits are never overwritten).
    // Per-entry `label` wins; if absent, falls back to seed.defaultLabel.
    const defaultLabel = seed.defaultLabel || '';
    const fillFromSeed = (target, seedMap) => {
        Object.entries(seedMap || {}).forEach(([k, v]) => {
            const lab = v.label || defaultLabel;
            if (!target[k]) {
                target[k] = {
                    reading: v.reading || '',
                    meaning: v.meaning || '',
                    label: lab
                };
            } else {
                if (!target[k].reading && v.reading) target[k].reading = v.reading;
                if (!target[k].meaning && v.meaning) target[k].meaning = v.meaning;
                if (!target[k].label && lab) target[k].label = lab;
            }
        });
    };
    fillFromSeed(tangoData.kanji, seed.kanji);
    fillFromSeed(tangoData.words, seed.words);

    tangoData.seedVersion = seed.version;
    saveTangoData();
}

function saveTangoData() {
    localStorage.setItem(TANGO_STORAGE_KEY, JSON.stringify(tangoData));
}

// ===== EXPORT =====
function exportTangoJson() {
    const stripEntries = (m) => {
        const out = {};
        Object.entries(m || {}).forEach(([k, v]) => {
            out[k] = {
                reading: v.reading || '',
                meaning: v.meaning || '',
                label: v.label || ''
            };
        });
        return out;
    };
    const out = {
        version: tangoData.seedVersion || 1,
        questions: tangoData.questions.map(q => ({
            id: q.id,
            question: q.question,
            choices: q.choices,
            answer: q.answer,
            explanation: q.explanation || ''
        })),
        kanji: stripEntries(tangoData.kanji),
        words: stripEntries(tangoData.words)
    };
    const json = JSON.stringify(out, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tango-export-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ===== HUB =====
function openTangoCho() {
    loadTangoData();
    refreshTangoHub();
    showScreen('tango-hub');
}

function refreshTangoHub() {
    document.getElementById('tango-q-count').textContent = tangoData.questions.length;
    document.getElementById('tango-k-count').textContent = Object.keys(tangoData.kanji).length;
    document.getElementById('tango-w-count').textContent = Object.keys(tangoData.words).length;
}

// ===== EXTRACTION =====
function isKanjiChar(ch) {
    const code = ch.codePointAt(0);
    return (code >= 0x4e00 && code <= 0x9fff) ||
           (code >= 0x3400 && code <= 0x4dbf);
}

function extractKanjiFromText(text) {
    const set = new Set();
    for (const ch of text) {
        if (isKanjiChar(ch)) set.add(ch);
    }
    return [...set];
}

function extractMarkedWords(text) {
    const words = [];
    const re = /\|([^|]+)\|/g;
    let m;
    while ((m = re.exec(text)) !== null) {
        const w = m[1].trim();
        if (w && [...w].some(isKanjiChar)) words.push(w);
    }
    return [...new Set(words)];
}

function extractFromQuestion(q) {
    const allText = q.question + ' ' + q.choices.join(' ');
    return {
        kanji: extractKanjiFromText(allText),
        words: extractMarkedWords(q.question)
    };
}

// ===== ADD/SAVE QUESTIONS =====
function showTangoAddSingle() {
    document.getElementById('tango-q-text').value = '';
    for (let i = 0; i < 4; i++) {
        document.getElementById(`tango-c-${i}`).value = '';
    }
    document.getElementById('tango-q-explanation').value = '';
    document.querySelector('input[name="tango-correct"][value="0"]').checked = true;
    showScreen('tango-add-single');
}

function saveTangoSingleQuestion() {
    const qText = document.getElementById('tango-q-text').value.trim();
    const explanation = document.getElementById('tango-q-explanation').value.trim();
    const choices = [];
    for (let i = 0; i < 4; i++) {
        choices.push(document.getElementById(`tango-c-${i}`).value.trim());
    }
    const correctIdx = parseInt(document.querySelector('input[name="tango-correct"]:checked').value);

    if (!qText) {
        alert('Please enter the question text.');
        return;
    }
    if (choices.some(c => !c)) {
        alert('All 4 choices must be filled.');
        return;
    }

    const q = {
        id: Date.now() + Math.random().toString(36).slice(2, 7),
        question: qText,
        choices,
        answer: choices[correctIdx],
        explanation
    };

    addQuestionsAndAnnotate([q], () => {
        showScreen('tango-hub');
        refreshTangoHub();
    });
}

function addQuestionsAndAnnotate(newQuestions, after, providedAnnotations, defaultLabel) {
    tangoData.questions.push(...newQuestions);

    // Apply provided annotations first (from rich JSON imports)
    const ann = providedAnnotations || { kanji: {}, words: {} };
    Object.entries(ann.kanji || {}).forEach(([k, v]) => {
        if (!tangoData.kanji[k]) {
            tangoData.kanji[k] = {
                reading: v.reading || '',
                meaning: v.meaning || '',
                label: v.label || ''
            };
        } else {
            if (!tangoData.kanji[k].reading && v.reading) tangoData.kanji[k].reading = v.reading;
            if (!tangoData.kanji[k].meaning && v.meaning) tangoData.kanji[k].meaning = v.meaning;
            if (!tangoData.kanji[k].label && v.label) tangoData.kanji[k].label = v.label;
        }
    });
    Object.entries(ann.words || {}).forEach(([k, v]) => {
        if (!tangoData.words[k]) {
            tangoData.words[k] = {
                reading: v.reading || '',
                meaning: v.meaning || '',
                label: v.label || ''
            };
        } else {
            if (!tangoData.words[k].reading && v.reading) tangoData.words[k].reading = v.reading;
            if (!tangoData.words[k].meaning && v.meaning) tangoData.words[k].meaning = v.meaning;
            if (!tangoData.words[k].label && v.label) tangoData.words[k].label = v.label;
        }
    });

    const newKanji = new Set();
    const newWords = new Set();

    newQuestions.forEach(q => {
        const ext = extractFromQuestion(q);
        ext.kanji.forEach(k => {
            if (!tangoData.kanji[k]) {
                if (defaultLabel) {
                    tangoData.kanji[k] = { reading: '', meaning: '', label: defaultLabel };
                }
                newKanji.add(k);
            } else if (defaultLabel && !tangoData.kanji[k].label) {
                tangoData.kanji[k].label = defaultLabel;
            }
        });
        ext.words.forEach(w => {
            if (!tangoData.words[w]) {
                if (defaultLabel) {
                    tangoData.words[w] = { reading: '', meaning: '', label: defaultLabel };
                }
                newWords.add(w);
            } else if (defaultLabel && !tangoData.words[w].label) {
                tangoData.words[w].label = defaultLabel;
            }
        });
    });

    saveTangoData();

    if (newKanji.size === 0 && newWords.size === 0) {
        if (after) after();
        return;
    }

    pendingAnnotation = {
        kanji: [...newKanji],
        words: [...newWords],
        afterSave: after
    };
    renderAnnotationScreen();
    showScreen('tango-annotate');
}

function renderAnnotationScreen() {
    const list = document.getElementById('tango-annotate-list');
    let html = '';

    if (pendingAnnotation.kanji.length > 0) {
        html += '<h3 class="tango-section-h">New Kanji</h3>';
        pendingAnnotation.kanji.forEach((k, i) => {
            html += `
                <div class="tango-annotate-item">
                    <div class="tango-annotate-char">${k}</div>
                    <div class="tango-annotate-fields">
                        <input type="text" data-type="kanji" data-key="${k}" data-field="reading" placeholder="Reading (e.g. しん, あたら)" class="tango-input-field">
                        <input type="text" data-type="kanji" data-key="${k}" data-field="meaning" placeholder="Meaning (e.g. new)" class="tango-input-field">
                    </div>
                </div>
            `;
        });
    }

    if (pendingAnnotation.words.length > 0) {
        html += '<h3 class="tango-section-h">New Words</h3>';
        pendingAnnotation.words.forEach(w => {
            html += `
                <div class="tango-annotate-item">
                    <div class="tango-annotate-char">${w}</div>
                    <div class="tango-annotate-fields">
                        <input type="text" data-type="word" data-key="${w}" data-field="reading" placeholder="Reading (e.g. あたらしい)" class="tango-input-field">
                        <input type="text" data-type="word" data-key="${w}" data-field="meaning" placeholder="Meaning (e.g. new)" class="tango-input-field">
                    </div>
                </div>
            `;
        });
    }

    list.innerHTML = html;
}

function finishAnnotation() {
    document.querySelectorAll('#tango-annotate-list input').forEach(inp => {
        const type = inp.dataset.type;
        const key = inp.dataset.key;
        const field = inp.dataset.field;
        const val = inp.value.trim();
        const target = type === 'kanji' ? tangoData.kanji : tangoData.words;
        if (!target[key]) target[key] = { reading: '', meaning: '' };
        target[key][field] = val;
    });
    saveTangoData();
    const cb = pendingAnnotation.afterSave;
    pendingAnnotation = { kanji: [], words: [], afterSave: null };
    if (cb) cb();
    else { showScreen('tango-hub'); refreshTangoHub(); }
}

// ===== BULK IMPORT =====
function parseTangoImport() {
    const raw = document.getElementById('tango-import-text').value.trim();
    if (!raw) {
        alert('Please paste content first.');
        return;
    }

    let parsed = [];
    let errors = [];
    let importedAnnotations = { kanji: {}, words: {} };

    if (raw.startsWith('[') || raw.startsWith('{')) {
        try {
            const json = JSON.parse(raw);
            // Rich format: { questions: [...], kanji: {...}, words: {...} }
            // Simple format: [ {question,choices,answer}, ... ]
            let arr;
            if (Array.isArray(json)) {
                arr = json;
            } else if (Array.isArray(json.questions)) {
                arr = json.questions;
                const defLabel = json.defaultLabel || '';
                if (json.kanji && typeof json.kanji === 'object') {
                    Object.entries(json.kanji).forEach(([k, v]) => {
                        importedAnnotations.kanji[k] = {
                            reading: (v && v.reading) || '',
                            meaning: (v && v.meaning) || '',
                            label: (v && v.label) || defLabel
                        };
                    });
                }
                if (json.words && typeof json.words === 'object') {
                    Object.entries(json.words).forEach(([k, v]) => {
                        importedAnnotations.words[k] = {
                            reading: (v && v.reading) || '',
                            meaning: (v && v.meaning) || '',
                            label: (v && v.label) || defLabel
                        };
                    });
                }
            } else {
                arr = [json];
            }
            arr.forEach((item, i) => {
                if (!item.question || !item.choices || !item.answer) {
                    errors.push(`Item ${i + 1}: missing required fields`);
                    return;
                }
                if (!Array.isArray(item.choices) || item.choices.length < 2) {
                    errors.push(`Item ${i + 1}: choices must be array of 2+`);
                    return;
                }
                if (!item.choices.includes(item.answer)) {
                    errors.push(`Item ${i + 1}: answer not in choices`);
                    return;
                }
                parsed.push({
                    id: item.id || (Date.now() + Math.random().toString(36).slice(2, 7)),
                    question: String(item.question).trim(),
                    choices: item.choices.map(c => String(c).trim()),
                    answer: String(item.answer).trim(),
                    explanation: item.explanation ? String(item.explanation).trim() : ''
                });
            });
        } catch (e) {
            alert('JSON parse error: ' + e.message);
            return;
        }
    } else {
        const blocks = raw.split(/\n---+\n/).map(b => b.trim()).filter(Boolean);
        blocks.forEach((block, i) => {
            const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
            let question = '';
            let answer = '';
            let explanation = '';
            const choices = [];
            lines.forEach(line => {
                if (/^Q\s*:/i.test(line)) {
                    question = line.replace(/^Q\s*:\s*/i, '').trim();
                } else if (/^A\s*:/i.test(line)) {
                    answer = line.replace(/^A\s*:\s*/i, '').trim();
                } else if (/^E\s*:/i.test(line)) {
                    explanation = line.replace(/^E\s*:\s*/i, '').trim();
                } else if (/^[-*•]/.test(line)) {
                    choices.push(line.replace(/^[-*•]\s*/, '').trim());
                }
            });
            if (!question) { errors.push(`Block ${i + 1}: no Q: line`); return; }
            if (!answer) { errors.push(`Block ${i + 1}: no A: line`); return; }
            if (choices.length < 2) { errors.push(`Block ${i + 1}: need 2+ choices`); return; }
            if (!choices.includes(answer)) { errors.push(`Block ${i + 1}: answer "${answer}" not in choices`); return; }
            parsed.push({
                id: Date.now() + Math.random().toString(36).slice(2, 7) + '-' + i,
                question,
                choices,
                answer,
                explanation
            });
        });
    }

    const preview = document.getElementById('tango-import-preview');
    preview.classList.remove('hidden');

    let html = '';
    if (errors.length) {
        html += `<div class="import-errors"><strong>⚠️ ${errors.length} issue(s):</strong><ul>${errors.map(e => `<li>${e}</li>`).join('')}</ul></div>`;
    }
    if (parsed.length) {
        html += `<div class="import-success"><strong>✅ ${parsed.length} valid question(s) ready</strong></div>`;
        html += '<div class="import-q-list">';
        parsed.forEach((q, i) => {
            html += `<div class="import-q-item"><strong>Q${i + 1}.</strong> ${escapeHtml(q.question)}<br>` +
                    q.choices.map(c => `<span class="${c === q.answer ? 'q-correct' : ''}">• ${escapeHtml(c)}</span>`).join(' ') +
                    '</div>';
        });
        html += '</div>';
        html += `<button class="menu-btn" onclick="confirmTangoImport()"><span class="btn-text">Import ${parsed.length} Question(s)</span></button>`;
    }

    preview.innerHTML = html;
    pendingImportParsed = parsed;
    pendingImportAnnotations = importedAnnotations;

    const annKCount = Object.keys(importedAnnotations.kanji).length;
    const annWCount = Object.keys(importedAnnotations.words).length;
    if (annKCount + annWCount > 0) {
        const note = document.createElement('div');
        note.className = 'import-success';
        note.innerHTML = `<strong>📚 ${annKCount} kanji + ${annWCount} word annotation(s) included — no manual entry needed.</strong>`;
        preview.insertBefore(note, preview.firstChild);
    }
}

let pendingImportParsed = [];
let pendingImportAnnotations = { kanji: {}, words: {} };

function confirmTangoImport() {
    const parsed = pendingImportParsed;
    if (!parsed || parsed.length === 0) return;
    const defaultLabel = (document.getElementById('tango-import-default-label')?.value || '').trim();
    addQuestionsAndAnnotate(parsed, () => {
        document.getElementById('tango-import-text').value = '';
        document.getElementById('tango-import-default-label').value = '';
        document.getElementById('tango-import-preview').classList.add('hidden');
        document.getElementById('tango-import-preview').innerHTML = '';
        pendingImportAnnotations = { kanji: {}, words: {} };
        showScreen('tango-hub');
        refreshTangoHub();
    }, pendingImportAnnotations, defaultLabel);
}

// ===== NOTEBOOK DATA (auto-loaded from notebookData.js) =====
// mergeNotebookData() is called on every page load. It adds content from
// NOTEBOOK_DATA (generated by build-notebook.js) into the user's library.
// Existing entries are never overwritten — only missing fields are backfilled.
function mergeNotebookData() {
    if (typeof NOTEBOOK_DATA === 'undefined' || !NOTEBOOK_DATA) return;
    let changed = false;

    Object.entries(NOTEBOOK_DATA).forEach(([label, data]) => {
        const byId = {};
        const byText = {};
        tangoData.questions.forEach(q => {
            if (q.id) byId[q.id] = q;
            if (q.question) byText[q.question] = q;
        });

        (data.questions || []).forEach(q => {
            if (!q.question || !q.choices || !q.answer) return;
            const existing = (q.id && byId[q.id]) || byText[q.question];
            if (existing) {
                if (!existing.explanation && q.explanation) { existing.explanation = q.explanation; changed = true; }
                if (!existing.label && q.label) { existing.label = q.label; changed = true; }
                return;
            }
            tangoData.questions.push({
                id: q.id || ('nb-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7)),
                question: q.question,
                choices: [...q.choices],
                answer: q.answer,
                explanation: q.explanation || '',
                label: q.label || label
            });
            changed = true;
        });

        const fillMap = (target, srcMap) => {
            Object.entries(srcMap || {}).forEach(([k, v]) => {
                if (!target[k]) {
                    target[k] = { reading: v.reading || '', meaning: v.meaning || '', label };
                    changed = true;
                } else {
                    if (!target[k].reading && v.reading) { target[k].reading = v.reading; changed = true; }
                    if (!target[k].meaning && v.meaning) { target[k].meaning = v.meaning; changed = true; }
                    if (!target[k].label && label) { target[k].label = label; changed = true; }
                }
            });
        };
        fillMap(tangoData.kanji, data.kanji);
        fillMap(tangoData.words, data.words);
    });

    if (changed) saveTangoData();
}

function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
}

// ===== LIBRARY VIEW =====
let currentLibTab = 'kanji';

function openTangoLibrary() {
    bulkMode = false;
    bulkSelected.clear();
    document.getElementById('bulk-mode-label').textContent = 'Bulk Label';
    document.getElementById('tango-bulk-bar').classList.add('hidden');
    refreshLabelControls();
    showLibraryTab('kanji');
    showScreen('tango-library');
}

let bulkMode = false;
let bulkSelected = new Set();

function showLibraryTab(tab) {
    currentLibTab = tab;
    document.getElementById('lib-tab-kanji').classList.toggle('active', tab === 'kanji');
    document.getElementById('lib-tab-words').classList.toggle('active', tab === 'words');
    bulkSelected.clear();
    refreshLabelControls();
    renderLibrary();
}

function refreshLabelControls() {
    const labels = collectLabels();
    const filter = document.getElementById('lib-label-filter');
    if (filter) {
        const current = filter.value;
        filter.innerHTML = '<option value="">All labels</option>'
            + '<option value="__none__">(no label)</option>'
            + labels.map(l => `<option value="${escapeHtml(l)}">${escapeHtml(l)}</option>`).join('');
        filter.value = labels.includes(current) || current === '__none__' ? current : '';
    }
    const datalist = document.getElementById('tango-label-suggest');
    if (datalist) {
        datalist.innerHTML = labels.map(l => `<option value="${escapeHtml(l)}">`).join('');
    }
}

function toggleBulkMode() {
    bulkMode = !bulkMode;
    bulkSelected.clear();
    document.getElementById('bulk-mode-label').textContent = bulkMode ? 'Exit Bulk Mode' : 'Bulk Label';
    document.getElementById('tango-bulk-bar').classList.toggle('hidden', !bulkMode);
    renderLibrary();
}

function selectAllInLibrary(state) {
    document.querySelectorAll('#tango-library-list .tango-lib-bulk-cb').forEach(cb => {
        cb.checked = state;
        const k = cb.dataset.key;
        if (state) bulkSelected.add(k);
        else bulkSelected.delete(k);
    });
}

function toggleBulkSelect(cb) {
    const k = cb.dataset.key;
    if (cb.checked) bulkSelected.add(k);
    else bulkSelected.delete(k);
}

function applyBulkLabel() {
    if (bulkSelected.size === 0) {
        alert('Select at least one item first.');
        return;
    }
    const newLabel = document.getElementById('tango-bulk-label-input').value.trim();
    const target = currentLibTab === 'kanji' ? tangoData.kanji : tangoData.words;
    bulkSelected.forEach(k => {
        if (target[k]) target[k].label = newLabel;
    });
    saveTangoData();
    bulkSelected.clear();
    refreshLabelControls();
    renderLibrary();
    alert(`Applied label "${newLabel || '(empty)'}" to selected items.`);
}

function renderLibrary() {
    const list = document.getElementById('tango-library-list');
    const source = currentLibTab === 'kanji' ? tangoData.kanji : tangoData.words;
    const filterVal = document.getElementById('lib-label-filter')?.value || '';

    let keys = Object.keys(source);
    if (filterVal === '__none__') {
        keys = keys.filter(k => !source[k].label);
    } else if (filterVal) {
        keys = keys.filter(k => source[k].label === filterVal);
    }

    if (keys.length === 0) {
        list.innerHTML = `<p class="hint-text" style="text-align:center; padding: 40px;">No ${currentLibTab}${filterVal ? ' for this label' : ''} yet.</p>`;
        return;
    }

    list.innerHTML = keys.map(k => {
        const item = source[k];
        const checkbox = bulkMode
            ? `<input type="checkbox" class="tango-lib-bulk-cb" data-key="${escapeHtml(k)}" ${bulkSelected.has(k) ? 'checked' : ''} onchange="toggleBulkSelect(this)">`
            : '';
        return `
            <div class="tango-lib-item ${bulkMode ? 'bulk-mode' : ''}">
                ${checkbox}
                <div class="tango-lib-char">${k}</div>
                <div class="tango-lib-fields">
                    <input type="text" value="${escapeHtml(item.reading || '')}" placeholder="Reading" data-type="${currentLibTab}" data-key="${escapeHtml(k)}" data-field="reading" onchange="updateLibraryItem(this)" class="tango-input-field">
                    <input type="text" value="${escapeHtml(item.meaning || '')}" placeholder="Meaning" data-type="${currentLibTab}" data-key="${escapeHtml(k)}" data-field="meaning" onchange="updateLibraryItem(this)" class="tango-input-field">
                    <input type="text" value="${escapeHtml(item.label || '')}" placeholder="Label (e.g. Week2)" data-type="${currentLibTab}" data-key="${escapeHtml(k)}" data-field="label" onchange="updateLibraryItem(this); refreshLabelControls();" list="tango-label-suggest" class="tango-input-field tango-label-field">
                </div>
                <button class="tango-lib-del" onclick="deleteLibraryItem('${currentLibTab}', '${escapeHtml(k)}')" title="Delete">🗑️</button>
            </div>
        `;
    }).join('');
}

function updateLibraryItem(inp) {
    const type = inp.dataset.type;
    const key = inp.dataset.key;
    const field = inp.dataset.field;
    const target = type === 'kanji' ? tangoData.kanji : tangoData.words;
    if (!target[key]) target[key] = { reading: '', meaning: '', label: '' };
    target[key][field] = inp.value.trim();
    saveTangoData();
}

function deleteLibraryItem(type, key) {
    if (!confirm(`Remove "${key}" from My ${type === 'kanji' ? 'Kanji' : 'Words'}?`)) return;
    const target = type === 'kanji' ? tangoData.kanji : tangoData.words;
    delete target[key];
    saveTangoData();
    renderLibrary();
    refreshTangoHub();
}

// ===== QUESTIONS MANAGER =====
function openTangoQuestions() {
    renderQuestionsList();
    showScreen('tango-questions');
}

function renderQuestionsList() {
    const list = document.getElementById('tango-questions-list');
    if (tangoData.questions.length === 0) {
        list.innerHTML = '<p class="hint-text" style="text-align:center; padding: 40px;">No questions yet.</p>';
        return;
    }
    list.innerHTML = tangoData.questions.map((q, i) => `
        <div class="tango-q-item">
            <div class="tango-q-num">Q${i + 1}</div>
            <div class="tango-q-body">
                <div class="tango-q-prompt">${renderQuestionPreview(q.question)}</div>
                <div class="tango-q-choices">
                    ${q.choices.map(c => `<span class="${c === q.answer ? 'q-correct' : ''}">${escapeHtml(c)}</span>`).join(' · ')}
                </div>
            </div>
            <button class="tango-lib-del" onclick="deleteQuestion('${q.id}')" title="Delete">🗑️</button>
        </div>
    `).join('');
}

function renderQuestionPreview(text) {
    return escapeHtml(text).replace(/\|([^|]+)\|/g, '<span class="tango-mark">$1</span>');
}

function deleteQuestion(id) {
    if (!confirm('Delete this question?')) return;
    tangoData.questions = tangoData.questions.filter(q => q.id !== id);
    saveTangoData();
    renderQuestionsList();
    refreshTangoHub();
}

// ===== QUIZ SETUP =====
function renderTangoFilterOptions() {
    const mode = document.getElementById('tango-filter-mode').value;
    const list = document.getElementById('tango-filter-list');

    if (mode === 'all') {
        list.innerHTML = `<p class="hint-text">Quiz will use all ${tangoData.questions.length} question(s).</p>`;
        return;
    }

    if (mode === 'label') {
        const labels = collectLabels();
        if (labels.length === 0) {
            list.innerHTML = `<p class="hint-text">No labels yet. Questions get labels from their source data (e.g. notebook folders).</p>`;
            return;
        }
        list.innerHTML = `
            <p class="hint-text">Select label(s) to revise. Pool = questions with the chosen label(s):</p>
            <div class="tango-filter-chips">
                ${labels.map(l => `<label class="tango-chip"><input type="checkbox" value="${escapeHtml(l)}" data-filter="label"> ${escapeHtml(l)}</label>`).join('')}
            </div>
        `;
        return;
    }

    const source = mode === 'kanji' ? tangoData.kanji : tangoData.words;
    const keys = Object.keys(source);

    if (keys.length === 0) {
        list.innerHTML = `<p class="hint-text">No ${mode === 'kanji' ? 'kanji' : 'words'} in your library yet.</p>`;
        return;
    }

    list.innerHTML = `
        <p class="hint-text">Select ${mode === 'kanji' ? 'kanji' : 'words'} to revise (questions containing them will be quizzed):</p>
        <div class="tango-filter-chips">
            ${keys.map(k => {
                const lab = source[k].label ? ` <span class="lib-label-pill">${escapeHtml(source[k].label)}</span>` : '';
                return `<label class="tango-chip"><input type="checkbox" value="${escapeHtml(k)}" data-filter="${mode}"> ${escapeHtml(k)}${lab}</label>`;
            }).join('')}
        </div>
    `;
}

function collectLabels() {
    const set = new Set();
    tangoData.questions.forEach(q => { if (q.label) set.add(q.label); });
    return [...set].sort();
}

function startTangoQuiz() {
    if (tangoData.questions.length === 0) {
        alert('Add some questions first.');
        return;
    }

    const mode = document.getElementById('tango-filter-mode').value;
    let selected = [];
    if (mode !== 'all') {
        selected = [...document.querySelectorAll(`#tango-filter-list input[data-filter="${mode}"]:checked`)].map(i => i.value);
        if (selected.length === 0) {
            alert(`Select at least one ${mode} to filter by.`);
            return;
        }
    }
    const limit = parseInt(document.getElementById('tango-q-num').value);

    const pool = buildTangoQuizPool(mode, selected);
    if (!pool) return;
    if (pool.length === 0) {
        alert('No questions match the selected filter.');
        return;
    }

    // Remember settings so "Play Again" can re-draw fresh questions.
    lastTangoQuizSetup = { mode, selected, limit };

    launchTangoQuiz(pool, limit);
}

let lastTangoQuizSetup = null;

function buildTangoQuizPool(mode, selected) {
    let pool = [...tangoData.questions];

    if (mode === 'all') return pool;

    if (mode === 'label') {
        return pool.filter(q => selected.includes(q.label));
    }

    return pool.filter(q => {
        const text = q.question + ' ' + q.choices.join(' ');
        return selected.some(s => text.includes(s));
    });
}

function launchTangoQuiz(pool, limit) {
    pool = shuffleArray(pool);
    if (limit > 0 && pool.length > limit) pool = pool.slice(0, limit);

    tangoQuizState = {
        questions: pool,
        index: 0,
        score: 0,
        correct: 0,
        wrong: 0
    };

    showScreen('tango-quiz');
    renderTangoQuestion();
}

// ===== QUIZ RUNTIME =====
function renderTangoQuestion() {
    const q = tangoQuizState.questions[tangoQuizState.index];
    document.getElementById('tango-quiz-counter').textContent =
        `${tangoQuizState.index + 1}/${tangoQuizState.questions.length}`;
    document.getElementById('tango-quiz-score').textContent = `Score: ${tangoQuizState.score}`;

    const promptEl = document.getElementById('tango-question-text');
    promptEl.innerHTML = renderQuestionPreview(q.question);

    const hintRow = document.getElementById('tango-hint-row');
    const allText = q.question + ' ' + q.choices.join(' ');
    const kanjiInQ = extractKanjiFromText(allText);
    const wordsInQ = extractMarkedWords(q.question);
    const items = [
        ...wordsInQ.map(w => ({ key: w, type: 'word' })),
        ...kanjiInQ.filter(k => !wordsInQ.some(w => w.includes(k))).map(k => ({ key: k, type: 'kanji' }))
    ];

    if (items.length > 0) {
        hintRow.innerHTML = items.map(it => `
            <button class="tango-hint-btn" data-hint-key="${escapeHtml(it.key)}" data-hint-type="${it.type}" onclick="toggleHint('${escapeHtml(it.key)}', '${it.type}')">💡 ${escapeHtml(it.key)}</button>
        `).join('');
    } else {
        hintRow.innerHTML = '';
    }

    const hintPanel = document.getElementById('tango-hint-panel');
    hintPanel.classList.add('hidden');
    hintPanel.innerHTML = '';
    hintPanel.dataset.activeKey = '';
    hintPanel.dataset.activeType = '';

    const shuffled = shuffleArray(q.choices);
    tangoQuizState.currentShuffled = shuffled;
    const opts = document.getElementById('tango-answer-options');
    opts.innerHTML = shuffled.map((c, i) =>
        `<button class="answer-btn" data-idx="${i}" onclick="checkTangoAnswer(this, ${i})">${escapeHtml(c)}</button>`
    ).join('');

    const fb = document.getElementById('tango-feedback');
    fb.classList.add('hidden');
    fb.innerHTML = '<div id="tango-feedback-text"></div>';
    tangoQuizState.answered = false;
}

function toggleHint(key, type) {
    const panel = document.getElementById('tango-hint-panel');
    const sameItem = panel.dataset.activeKey === key && panel.dataset.activeType === type;

    if (sameItem && !panel.classList.contains('hidden')) {
        panel.classList.add('hidden');
        panel.innerHTML = '';
        panel.dataset.activeKey = '';
        panel.dataset.activeType = '';
        document.querySelectorAll('.tango-hint-btn').forEach(b => b.classList.remove('active'));
        return;
    }

    const source = type === 'kanji' ? tangoData.kanji : tangoData.words;
    const item = source[key] || { reading: '', meaning: '' };
    panel.classList.remove('hidden');
    panel.dataset.activeKey = key;
    panel.dataset.activeType = type;
    const labelLine = item.label
        ? `<span class="hint-detail"><strong>Label:</strong> <span class="lib-label-pill">${escapeHtml(item.label)}</span></span>`
        : '';
    panel.innerHTML = `
        <div class="hint-card">
            <span class="hint-char">${escapeHtml(key)}</span>
            <span class="hint-detail"><strong>Reading:</strong> ${escapeHtml(item.reading) || '<em>(not set)</em>'}</span>
            <span class="hint-detail"><strong>Meaning:</strong> ${escapeHtml(item.meaning) || '<em>(not set)</em>'}</span>
            ${labelLine}
        </div>
    `;

    document.querySelectorAll('.tango-hint-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.hintKey === key && b.dataset.hintType === type);
    });
}

function checkTangoAnswer(btn, idx) {
    if (tangoQuizState.answered) return;
    tangoQuizState.answered = true;

    const q = tangoQuizState.questions[tangoQuizState.index];
    const selected = tangoQuizState.currentShuffled[idx];
    const isCorrect = selected === q.answer;

    document.querySelectorAll('#tango-answer-options .answer-btn').forEach(b => {
        b.disabled = true;
        const bIdx = parseInt(b.dataset.idx);
        if (tangoQuizState.currentShuffled[bIdx] === q.answer) b.classList.add('correct');
        else if (b === btn) b.classList.add('wrong');
    });

    const fb = document.getElementById('tango-feedback');
    const fbText = document.getElementById('tango-feedback-text');
    fb.classList.remove('hidden', 'correct', 'wrong');
    fb.classList.add(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
        tangoQuizState.score += 10;
        tangoQuizState.correct++;
        fbText.innerHTML = `✅ Correct! <strong>${escapeHtml(q.answer)}</strong>`;
    } else {
        tangoQuizState.wrong++;
        fbText.innerHTML = `❌ Correct answer: <strong>${escapeHtml(q.answer)}</strong>`;
    }

    if (q.explanation) {
        fb.insertAdjacentHTML('beforeend',
            `<div class="tango-explanation">${escapeHtml(q.explanation).replace(/\n/g, '<br>')}</div>`);
    }

    const isLast = tangoQuizState.index >= tangoQuizState.questions.length - 1;
    const nextBtnHtml = isLast
        ? `<button class="menu-btn" onclick="endTangoQuiz()" style="margin-top: 12px;"><span class="btn-text">See Results →</span></button>`
        : `<button class="menu-btn" onclick="advanceTangoQuestion()" style="margin-top: 12px;"><span class="btn-text">Next →</span></button>`;
    fb.insertAdjacentHTML('beforeend', nextBtnHtml);
}

function advanceTangoQuestion() {
    tangoQuizState.index++;
    if (tangoQuizState.index >= tangoQuizState.questions.length) {
        endTangoQuiz();
    } else {
        renderTangoQuestion();
    }
}

function endTangoQuiz() {
    const total = tangoQuizState.correct + tangoQuizState.wrong;
    if (total === 0) {
        showScreen('tango-hub');
        return;
    }
    const accuracy = Math.round((tangoQuizState.correct / total) * 100);
    document.getElementById('final-score').textContent = tangoQuizState.score;
    document.getElementById('correct-count').textContent = tangoQuizState.correct;
    document.getElementById('wrong-count').textContent = tangoQuizState.wrong;
    document.getElementById('accuracy-percent').textContent = `${accuracy}%`;
    document.getElementById('best-streak').textContent = '—';
    document.getElementById('gameover-title').textContent = '単語帳 Complete!';
    lastQuizContext = 'tango';
    showScreen('gameover-screen');
}

// Track which mode produced the gameover screen so "Play Again" restarts the right thing.
let lastQuizContext = 'game';

// Override restartGame from game.js to route Tango quizzes back into Tango.
const _origRestartGame = window.restartGame;
window.restartGame = function () {
    if (lastQuizContext === 'tango') {
        // Re-run the original filter on the FULL library so a fresh batch is drawn.
        if (lastTangoQuizSetup) {
            const pool = buildTangoQuizPool(lastTangoQuizSetup.mode, lastTangoQuizSetup.selected);
            if (pool && pool.length > 0) {
                launchTangoQuiz(pool, lastTangoQuizSetup.limit);
                return;
            }
        }
        // Fallback: no remembered setup → go back to setup screen.
        showScreen('tango-quiz-setup');
        return;
    }
    if (typeof _origRestartGame === 'function') _origRestartGame();
};

// Wrap the original endGame so any non-Tango game marks context correctly.
const _origEndGame = window.endGame;
window.endGame = function () {
    lastQuizContext = 'game';
    if (typeof _origEndGame === 'function') _origEndGame();
};

// ===== INIT =====
document.addEventListener('DOMContentLoaded', loadTangoData);
