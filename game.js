// ===== JAPANESE KANA MASTER - GAME ENGINE =====

// Game State
let gameState = {
    currentMode: 'recognition',
    kanaType: 'hiragana',
    currentQuestion: 0,
    totalQuestions: 10,
    score: 0,
    streak: 0,
    bestStreak: 0,
    correct: 0,
    wrong: 0,
    currentKana: null,
    usedQuestions: [],
    lives: 3,
    timeLeft: 60,
    timerInterval: null,
    settings: {
        sound: true,
        hints: false,
        dakuten: true,
        combo: false,
        questionsPerRound: 10
    }
};

// User Progress (stored in localStorage)
let userProgress = {
    totalScore: 0,
    bestStreak: 0,
    gamesPlayed: 0,
    kanaStats: {} // Tracks correct/wrong for each kana
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    updateMainMenuStats();
    setupEventListeners();
});

function loadProgress() {
    const saved = localStorage.getItem('kanaGameProgress');
    if (saved) {
        userProgress = JSON.parse(saved);
    }
    
    const savedSettings = localStorage.getItem('kanaGameSettings');
    if (savedSettings) {
        gameState.settings = JSON.parse(savedSettings);
        applySettings();
    }
}

function saveProgress() {
    localStorage.setItem('kanaGameProgress', JSON.stringify(userProgress));
}

function saveSettings() {
    localStorage.setItem('kanaGameSettings', JSON.stringify(gameState.settings));
}

function applySettings() {
    document.getElementById('sound-toggle').checked = gameState.settings.sound;
    document.getElementById('hints-toggle').checked = gameState.settings.hints;
    document.getElementById('dakuten-toggle').checked = gameState.settings.dakuten;
    document.getElementById('combo-toggle').checked = gameState.settings.combo;
    document.getElementById('questions-count').value = gameState.settings.questionsPerRound;
}

function setupEventListeners() {
    // Typing input - Enter key
    const typeInput = document.getElementById('type-answer');
    if (typeInput) {
        typeInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkTypingAnswer();
            }
        });
    }
}

// ===== SCREEN NAVIGATION =====
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    
    // Special handling for screens
    if (screenId === 'study-mode') {
        showStudyTab('hiragana');
    } else if (screenId === 'progress-screen') {
        updateProgressScreen();
    }
}

function updateMainMenuStats() {
    document.getElementById('total-score').textContent = userProgress.totalScore;
    document.getElementById('streak-count').textContent = userProgress.bestStreak;
    
    // Calculate mastered kana (>80% accuracy with at least 5 attempts)
    let mastered = 0;
    for (const kana in userProgress.kanaStats) {
        const stats = userProgress.kanaStats[kana];
        const total = stats.correct + stats.wrong;
        if (total >= 5 && (stats.correct / total) >= 0.8) {
            mastered++;
        }
    }
    document.getElementById('mastered-count').textContent = mastered;
}

// ===== KANA TYPE TOGGLE =====
function toggleKanaType(type) {
    gameState.kanaType = type;
    document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`toggle-${type}`).classList.add('active');
}

// ===== GET KANA DATA =====
function getKanaPool() {
    let pool = [];
    
    const addKana = (kanaSet, type) => {
        pool = pool.concat(kanaSet.basic.map(k => ({...k, type})));
        if (gameState.settings.dakuten) {
            pool = pool.concat(kanaSet.dakuten.map(k => ({...k, type})));
        }
        if (gameState.settings.combo) {
            pool = pool.concat(kanaSet.combo.map(k => ({...k, type})));
        }
    };
    
    if (gameState.kanaType === 'hiragana' || gameState.kanaType === 'both') {
        addKana(KANA_DATABASE.hiragana, 'hiragana');
    }
    if (gameState.kanaType === 'katakana' || gameState.kanaType === 'both') {
        addKana(KANA_DATABASE.katakana, 'katakana');
    }
    
    return pool;
}

function getRandomKana(exclude = []) {
    const pool = getKanaPool().filter(k => !exclude.includes(k.kana));
    return pool[Math.floor(Math.random() * pool.length)];
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// ===== START GAME =====
function startGame(mode) {
    gameState.currentMode = mode;
    gameState.currentQuestion = 0;
    gameState.totalQuestions = gameState.settings.questionsPerRound;
    gameState.score = 0;
    gameState.streak = 0;
    gameState.bestStreak = 0;
    gameState.correct = 0;
    gameState.wrong = 0;
    gameState.usedQuestions = [];
    gameState.lives = 3;
    
    // Mode-specific setup
    if (mode === 'pairs') {
        startPairsGame();
        return;
    } else if (mode === 'wordBuilder') {
        startWordBuilderGame();
        return;
    } else if (mode === 'speed') {
        gameState.timeLeft = 60;
        gameState.totalQuestions = 999; // Unlimited in speed mode
    } else if (mode === 'endless') {
        gameState.totalQuestions = 999;
    }
    
    showScreen('game-screen');
    updateGameUI();
    nextQuestion();
}

function updateGameUI() {
    const modeNames = {
        recognition: 'Recognition',
        reverse: 'Reverse',
        typing: 'Typing Challenge',
        speed: 'Speed Round',
        listening: 'Listening',
        endless: 'Endless Mode'
    };
    
    document.getElementById('current-mode').textContent = modeNames[gameState.currentMode] || gameState.currentMode;
    document.getElementById('current-score').textContent = `Score: ${gameState.score}`;
    document.getElementById('current-streak').textContent = `🔥 ${gameState.streak}`;
    
    if (gameState.currentMode === 'speed') {
        document.getElementById('question-counter').textContent = `Time: ${gameState.timeLeft}s`;
        document.getElementById('timer-bar').classList.remove('hidden');
        startTimer();
    } else if (gameState.currentMode === 'endless') {
        document.getElementById('question-counter').textContent = `Lives: ${'❤️'.repeat(gameState.lives)}`;
        document.getElementById('timer-bar').classList.add('hidden');
    } else {
        document.getElementById('question-counter').textContent = `${gameState.currentQuestion + 1}/${gameState.totalQuestions}`;
        document.getElementById('timer-bar').classList.add('hidden');
    }
}

// ===== TIMER (Speed Mode) =====
function startTimer() {
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
    }
    
    gameState.timerInterval = setInterval(() => {
        gameState.timeLeft--;
        document.getElementById('question-counter').textContent = `Time: ${gameState.timeLeft}s`;
        document.getElementById('timer-fill').style.width = `${(gameState.timeLeft / 60) * 100}%`;
        
        if (gameState.timeLeft <= 0) {
            clearInterval(gameState.timerInterval);
            endGame();
        }
    }, 1000);
}

// ===== QUESTIONS =====
function nextQuestion() {
    if (gameState.currentMode !== 'speed' && gameState.currentMode !== 'endless') {
        if (gameState.currentQuestion >= gameState.totalQuestions) {
            endGame();
            return;
        }
    }
    
    gameState.currentKana = getRandomKana(gameState.usedQuestions);
    if (!gameState.currentKana) {
        // Reset used questions if we've gone through all
        gameState.usedQuestions = [];
        gameState.currentKana = getRandomKana();
    }
    gameState.usedQuestions.push(gameState.currentKana.kana);
    
    updateGameUI();
    hideFeedback();
    gameState.answered = false;

    switch (gameState.currentMode) {
        case 'recognition':
            showRecognitionQuestion();
            break;
        case 'reverse':
            showReverseQuestion();
            break;
        case 'typing':
            showTypingQuestion();
            break;
        case 'speed':
            showRecognitionQuestion(); // Speed uses recognition format
            break;
        case 'listening':
            showListeningQuestion();
            break;
        case 'endless':
            // Alternate between recognition and reverse
            if (Math.random() > 0.5) {
                showRecognitionQuestion();
            } else {
                showReverseQuestion();
            }
            break;
    }
}

function showRecognitionQuestion() {
    const content = document.getElementById('game-content');
    content.innerHTML = `
        <div class="kana-display">${gameState.currentKana.kana}</div>
        <p class="hint-text">What is the romaji for this ${gameState.currentKana.type}?</p>
    `;
    
    showAnswerOptions('romaji');
}

function showReverseQuestion() {
    const content = document.getElementById('game-content');
    content.innerHTML = `
        <div class="romaji-display">${gameState.currentKana.romaji}</div>
        <p class="hint-text">Select the correct ${gameState.kanaType === 'both' ? 'kana' : gameState.kanaType}</p>
    `;
    
    showAnswerOptions('kana');
}

function showTypingQuestion() {
    const content = document.getElementById('game-content');
    content.innerHTML = `
        <div class="kana-display">${gameState.currentKana.kana}</div>
        <p class="hint-text">Type the romaji for this ${gameState.currentKana.type}</p>
    `;
    
    document.getElementById('answer-options').innerHTML = '';
    document.getElementById('typing-input').classList.remove('hidden');
    
    const input = document.getElementById('type-answer');
    input.value = '';
    input.focus();
}

function showListeningQuestion() {
    const content = document.getElementById('game-content');
    content.innerHTML = `
        <div class="kana-display">🔊</div>
        <button class="menu-btn" onclick="playKanaSound()">Play Sound</button>
        <p class="hint-text" style="margin-top: 20px;">Select the kana you hear</p>
    `;
    
    // Auto-play on question load
    setTimeout(() => playKanaSound(), 500);
    
    showAnswerOptions('kana');
}

function playKanaSound() {
    // Using Web Speech API for pronunciation
    const utterance = new SpeechSynthesisUtterance(gameState.currentKana.kana);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
}

function showAnswerOptions(type) {
    const optionsContainer = document.getElementById('answer-options');
    document.getElementById('typing-input').classList.add('hidden');
    
    // Generate wrong answers
    const wrongAnswers = [];
    while (wrongAnswers.length < 3) {
        const random = getRandomKana([gameState.currentKana.kana, ...wrongAnswers.map(w => w.kana)]);
        if (random && !wrongAnswers.find(w => w.romaji === random.romaji)) {
            wrongAnswers.push(random);
        }
    }
    
    // Combine and shuffle
    const allOptions = shuffleArray([gameState.currentKana, ...wrongAnswers]);
    
    optionsContainer.innerHTML = allOptions.map(option => {
        const display = type === 'romaji' ? option.romaji : option.kana;
        const value = type === 'romaji' ? option.romaji : option.kana;
        return `<button class="answer-btn" onclick="checkAnswer('${value}')">${display}</button>`;
    }).join('');
}

// ===== CHECK ANSWERS =====
function checkAnswer(selected) {
    const isCorrect = (selected === gameState.currentKana.romaji) || 
                      (selected === gameState.currentKana.kana) ||
                      (gameState.currentKana.alt && gameState.currentKana.alt.includes(selected));
    
    processAnswer(isCorrect, selected);
}

function checkTypingAnswer() {
    const input = document.getElementById('type-answer');
    const answer = input.value.toLowerCase().trim();
    
    const isCorrect = answer === gameState.currentKana.romaji ||
                      (gameState.currentKana.alt && gameState.currentKana.alt.includes(answer));
    
    processAnswer(isCorrect, answer);
}

function processAnswer(isCorrect, selected) {
    if (gameState.answered) return;
    gameState.answered = true;

    // Update kana stats
    if (!userProgress.kanaStats[gameState.currentKana.kana]) {
        userProgress.kanaStats[gameState.currentKana.kana] = { correct: 0, wrong: 0 };
    }
    
    // Disable buttons
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === gameState.currentKana.romaji || btn.textContent === gameState.currentKana.kana) {
            btn.classList.add('correct');
        } else if (btn.textContent === selected) {
            btn.classList.add('wrong');
        }
    });
    
    if (isCorrect) {
        gameState.correct++;
        gameState.streak++;
        if (gameState.streak > gameState.bestStreak) {
            gameState.bestStreak = gameState.streak;
        }
        
        // Score calculation (bonus for streaks)
        const baseScore = 10;
        const streakBonus = Math.min(gameState.streak, 10) * 2;
        gameState.score += baseScore + streakBonus;
        
        userProgress.kanaStats[gameState.currentKana.kana].correct++;
        
        showFeedback(true);
        playSound('correct');
    } else {
        gameState.wrong++;
        gameState.streak = 0;
        
        if (gameState.currentMode === 'endless') {
            gameState.lives--;
            if (gameState.lives <= 0) {
                setTimeout(() => endGame(), 1500);
            }
        }
        
        userProgress.kanaStats[gameState.currentKana.kana].wrong++;
        
        showFeedback(false);
        playSound('wrong');
    }
    
    gameState.currentQuestion++;
    saveProgress();

    // Show a Next button — user controls advancement so they can study the correct answer.
    if (gameState.currentMode === 'speed') {
        // Speed mode is timer-driven; auto-advance to keep pace.
        setTimeout(() => nextQuestion(), 600);
        return;
    }
    if (gameState.currentMode === 'endless' && gameState.lives <= 0) {
        return;
    }

    const isLast = gameState.currentMode !== 'endless' &&
                   gameState.currentQuestion >= gameState.totalQuestions;
    const label = isLast ? 'See Results →' : 'Next →';
    const action = isLast ? 'endGame()' : 'nextQuestion()';
    const feedback = document.getElementById('feedback');
    feedback.insertAdjacentHTML('beforeend',
        `<button class="menu-btn" onclick="${action}" style="margin-top: 12px;"><span class="btn-text">${label}</span></button>`);
}

function showFeedback(isCorrect) {
    const feedback = document.getElementById('feedback');
    const feedbackText = document.getElementById('feedback-text');
    
    feedback.classList.remove('hidden', 'correct', 'wrong');
    feedback.classList.add(isCorrect ? 'correct' : 'wrong');
    
    if (isCorrect) {
        feedbackText.textContent = POSITIVE_FEEDBACK[Math.floor(Math.random() * POSITIVE_FEEDBACK.length)];
    } else {
        feedbackText.innerHTML = `${NEGATIVE_FEEDBACK[Math.floor(Math.random() * NEGATIVE_FEEDBACK.length)]}<br>
            <span style="font-size: 1rem; opacity: 0.8;">Correct: ${gameState.currentKana.kana} = ${gameState.currentKana.romaji}</span>`;
    }
}

function hideFeedback() {
    const fb = document.getElementById('feedback');
    fb.classList.add('hidden');
    fb.innerHTML = '<div id="feedback-text"></div>';
}

// ===== MEMORY MATCH GAME =====
let pairsState = {
    cards: [],
    flippedCards: [],
    matchedPairs: 0,
    moves: 0,
    timerInterval: null,
    seconds: 0
};

function startPairsGame() {
    pairsState = {
        cards: [],
        flippedCards: [],
        matchedPairs: 0,
        moves: 0,
        timerInterval: null,
        seconds: 0
    };
    
    // Get 8 random kana for pairs (16 cards total)
    const selectedKana = [];
    while (selectedKana.length < 8) {
        const kana = getRandomKana(selectedKana.map(k => k.kana));
        if (kana) selectedKana.push(kana);
    }
    
    // Create card pairs (kana and romaji)
    const cards = [];
    selectedKana.forEach((k, i) => {
        cards.push({ id: i * 2, content: k.kana, type: 'kana', pairId: i });
        cards.push({ id: i * 2 + 1, content: k.romaji, type: 'romaji', pairId: i });
    });
    
    pairsState.cards = shuffleArray(cards);
    
    showScreen('pairs-screen');
    renderPairsGrid();
    startPairsTimer();
}

function renderPairsGrid() {
    const grid = document.getElementById('pairs-grid');
    grid.innerHTML = pairsState.cards.map(card => `
        <div class="pair-card" data-id="${card.id}" onclick="flipCard(${card.id})">
            <span class="card-back">?</span>
            <span class="card-front">${card.content}</span>
        </div>
    `).join('');
    
    updatePairsUI();
}

function flipCard(id) {
    const card = pairsState.cards.find(c => c.id === id);
    const cardEl = document.querySelector(`.pair-card[data-id="${id}"]`);
    
    // Ignore if already flipped or matched
    if (cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;
    if (pairsState.flippedCards.length >= 2) return;
    
    // Flip the card
    cardEl.classList.add('flipped');
    pairsState.flippedCards.push({ card, element: cardEl });
    
    // Check for match
    if (pairsState.flippedCards.length === 2) {
        pairsState.moves++;
        updatePairsUI();
        
        const [first, second] = pairsState.flippedCards;
        
        if (first.card.pairId === second.card.pairId && first.card.type !== second.card.type) {
            // Match!
            setTimeout(() => {
                first.element.classList.add('matched');
                second.element.classList.add('matched');
                pairsState.matchedPairs++;
                pairsState.flippedCards = [];
                updatePairsUI();
                playSound('correct');
                
                // Check for win
                if (pairsState.matchedPairs === 8) {
                    clearInterval(pairsState.timerInterval);
                    setTimeout(() => {
                        gameState.score = Math.max(1000 - (pairsState.moves * 10) - (pairsState.seconds * 2), 100);
                        gameState.correct = 8;
                        gameState.wrong = pairsState.moves - 8;
                        endGame();
                    }, 500);
                }
            }, 300);
        } else {
            // No match
            playSound('wrong');
            setTimeout(() => {
                first.element.classList.remove('flipped');
                second.element.classList.remove('flipped');
                pairsState.flippedCards = [];
            }, 1000);
        }
    }
}

function startPairsTimer() {
    pairsState.timerInterval = setInterval(() => {
        pairsState.seconds++;
        const mins = Math.floor(pairsState.seconds / 60);
        const secs = pairsState.seconds % 60;
        document.getElementById('pairs-timer').textContent = `Time: ${mins}:${secs.toString().padStart(2, '0')}`;
    }, 1000);
}

function updatePairsUI() {
    document.getElementById('pairs-moves').textContent = `Moves: ${pairsState.moves}`;
    document.getElementById('pairs-matched').textContent = `Matched: ${pairsState.matchedPairs}/8`;
}

// ===== WORD BUILDER GAME =====
let wordState = {
    currentWord: null,
    selectedKana: [],
    wordIndex: 0,
    totalWords: 10
};

function startWordBuilderGame() {
    wordState = {
        currentWord: null,
        selectedKana: [],
        wordIndex: 0,
        totalWords: 10
    };
    gameState.score = 0;
    
    showScreen('word-screen');
    nextWord();
}

function nextWord() {
    if (wordState.wordIndex >= wordState.totalWords) {
        endGame();
        return;
    }
    wordState.answered = false;
    
    // Get all vocabulary
    const allWords = [];
    for (const category in VOCABULARY) {
        VOCABULARY[category].forEach(word => {
            // Filter based on kana type
            if (gameState.kanaType === 'both' ||
                (gameState.kanaType === 'hiragana' && word.type !== 'katakana') ||
                (gameState.kanaType === 'katakana' && word.type === 'katakana')) {
                allWords.push(word);
            }
        });
    }
    
    // Pick random word
    wordState.currentWord = allWords[Math.floor(Math.random() * allWords.length)];
    wordState.selectedKana = [];
    
    updateWordUI();
}

function updateWordUI() {
    document.getElementById('word-counter').textContent = `${wordState.wordIndex + 1}/${wordState.totalWords}`;
    document.getElementById('word-score').textContent = `Score: ${gameState.score}`;
    document.getElementById('word-prompt').textContent = wordState.currentWord.romaji;
    document.getElementById('word-meaning').textContent = `(${wordState.currentWord.meaning})`;
    
    // Answer area
    const answerArea = document.getElementById('word-answer-area');
    answerArea.innerHTML = wordState.selectedKana.length > 0 
        ? wordState.selectedKana.map((k, i) => `<span class="kana-tile" onclick="removeKanaFromAnswer(${i})">${k}</span>`).join('')
        : '<span style="color: var(--text-secondary);">Click kana below to build the word</span>';
    
    // Options - show correct kana + some distractors
    const correctKana = [...wordState.currentWord.kana];
    const usedKana = [...correctKana];
    
    // Add some random distractor kana
    while (usedKana.length < correctKana.length + 4) {
        const random = getRandomKana(usedKana);
        if (random) usedKana.push(random.kana);
    }
    
    const shuffledOptions = shuffleArray(usedKana);
    
    document.getElementById('word-options').innerHTML = shuffledOptions.map(k => {
        const isUsed = wordState.selectedKana.filter(s => s === k).length >= 
                       shuffledOptions.filter(s => s === k).length;
        return `<span class="kana-tile ${isUsed ? 'used' : ''}" onclick="addKanaToAnswer('${k}')">${k}</span>`;
    }).join('');
}

function addKanaToAnswer(kana) {
    wordState.selectedKana.push(kana);
    updateWordUI();
}

function removeKanaFromAnswer(index) {
    wordState.selectedKana.splice(index, 1);
    updateWordUI();
}

function clearWordAnswer() {
    wordState.selectedKana = [];
    updateWordUI();
}

function checkWordAnswer() {
    if (wordState.answered) return;
    wordState.answered = true;

    const userAnswer = wordState.selectedKana.join('');
    const correctAnswer = wordState.currentWord.word;

    if (userAnswer === correctAnswer) {
        gameState.score += 50;
        gameState.correct++;
        playSound('correct');
        showWordFeedback(true);
    } else {
        gameState.wrong++;
        playSound('wrong');
        showWordFeedback(false, correctAnswer);
    }
    
    wordState.wordIndex++;

    const isLast = wordState.wordIndex >= wordState.totalWords;
    const label = isLast ? 'See Results →' : 'Next Word →';
    const action = isLast ? 'endGame()' : 'nextWord()';
    const answerArea = document.getElementById('word-answer-area');
    answerArea.insertAdjacentHTML('beforeend',
        `<button class="menu-btn" onclick="${action}" style="margin-top: 15px; flex-basis: 100%;"><span class="btn-text">${label}</span></button>`);
}

function showWordFeedback(correct, correctAnswer = '') {
    const answerArea = document.getElementById('word-answer-area');
    if (correct) {
        answerArea.innerHTML = `<span style="color: var(--success); font-size: 1.5rem;">✅ Correct! ${wordState.currentWord.word}</span>`;
    } else {
        answerArea.innerHTML = `<span style="color: var(--error); font-size: 1.5rem;">❌ Correct answer: ${correctAnswer}</span>`;
    }
}

// ===== END GAME =====
function endGame() {
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
    }
    if (pairsState.timerInterval) {
        clearInterval(pairsState.timerInterval);
    }
    
    // Update user progress
    userProgress.totalScore += gameState.score;
    if (gameState.bestStreak > userProgress.bestStreak) {
        userProgress.bestStreak = gameState.bestStreak;
    }
    userProgress.gamesPlayed++;
    saveProgress();
    
    // Show game over screen
    showScreen('gameover-screen');
    
    const accuracy = gameState.correct + gameState.wrong > 0 
        ? Math.round((gameState.correct / (gameState.correct + gameState.wrong)) * 100) 
        : 0;
    
    document.getElementById('final-score').textContent = gameState.score;
    document.getElementById('correct-count').textContent = gameState.correct;
    document.getElementById('wrong-count').textContent = gameState.wrong;
    document.getElementById('accuracy-percent').textContent = `${accuracy}%`;
    document.getElementById('best-streak').textContent = gameState.bestStreak;
    
    // Update main menu stats
    updateMainMenuStats();
}

function restartGame() {
    startGame(gameState.currentMode);
}

// ===== STUDY MODE =====
function showStudyTab(type) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const content = document.getElementById('study-content');
    const kanaData = type === 'hiragana' ? KANA_DATABASE.hiragana : KANA_DATABASE.katakana;
    
    const vowelOrder = ['a', 'i', 'u', 'e', 'o'];
    const basicByRow = [];
    let currentRow = null;
    kanaData.basic.forEach(k => {
        if (!currentRow || currentRow.row !== k.row) {
            currentRow = { row: k.row, slots: [null, null, null, null, null] };
            basicByRow.push(currentRow);
        }
        const lastChar = k.romaji[k.romaji.length - 1];
        const col = vowelOrder.indexOf(lastChar);
        currentRow.slots[col !== -1 ? col : 0] = k;
    });
    const basicGridHTML = basicByRow.map(group =>
        group.slots.map(k => k
            ? `<div class="chart-item" onclick="speakKana('${k.kana}')">
                <span class="chart-kana">${k.kana}</span>
                <span class="chart-romaji">${k.romaji}</span>
               </div>`
            : '<div class="chart-item chart-filler"></div>'
        ).join('')
    ).join('');

    content.innerHTML = `
        <div class="kana-chart">
            <h3>Basic Characters (Gojūon)</h3>
            <div class="chart-grid">
                ${basicGridHTML}
            </div>
        </div>
        
        <div class="kana-chart">
            <h3>Dakuten & Handakuten (Voiced)</h3>
            <div class="chart-grid">
                ${kanaData.dakuten.map(k => `
                    <div class="chart-item" onclick="speakKana('${k.kana}')">
                        <span class="chart-kana">${k.kana}</span>
                        <span class="chart-romaji">${k.romaji}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="kana-chart">
            <h3>Combination Characters (Yōon)</h3>
            <div class="chart-grid">
                ${kanaData.combo.map(k => `
                    <div class="chart-item" onclick="speakKana('${k.kana}')">
                        <span class="chart-kana">${k.kana}</span>
                        <span class="chart-romaji">${k.romaji}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function speakKana(kana) {
    const utterance = new SpeechSynthesisUtterance(kana);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
}

// ===== PROGRESS SCREEN =====
function updateProgressScreen() {
    // Calculate progress
    const hiraganaTotal = KANA_DATABASE.hiragana.basic.length + 
                          KANA_DATABASE.hiragana.dakuten.length + 
                          KANA_DATABASE.hiragana.combo.length;
    const katakanaTotal = KANA_DATABASE.katakana.basic.length + 
                          KANA_DATABASE.katakana.dakuten.length + 
                          KANA_DATABASE.katakana.combo.length;
    
    let hiraganaLearned = 0;
    let katakanaLearned = 0;
    
    const allHiragana = [...KANA_DATABASE.hiragana.basic, ...KANA_DATABASE.hiragana.dakuten, ...KANA_DATABASE.hiragana.combo];
    const allKatakana = [...KANA_DATABASE.katakana.basic, ...KANA_DATABASE.katakana.dakuten, ...KANA_DATABASE.katakana.combo];
    
    allHiragana.forEach(k => {
        if (userProgress.kanaStats[k.kana]) {
            const stats = userProgress.kanaStats[k.kana];
            if (stats.correct >= 3) hiraganaLearned++;
        }
    });
    
    allKatakana.forEach(k => {
        if (userProgress.kanaStats[k.kana]) {
            const stats = userProgress.kanaStats[k.kana];
            if (stats.correct >= 3) katakanaLearned++;
        }
    });
    
    const hiraganaPercent = Math.round((hiraganaLearned / hiraganaTotal) * 100);
    const katakanaPercent = Math.round((katakanaLearned / katakanaTotal) * 100);
    
    document.getElementById('hiragana-progress').style.width = `${hiraganaPercent}%`;
    document.getElementById('hiragana-percent').textContent = `${hiraganaPercent}%`;
    document.getElementById('katakana-progress').style.width = `${katakanaPercent}%`;
    document.getElementById('katakana-percent').textContent = `${katakanaPercent}%`;
    
    // Mastery grid
    const masteryGrid = document.getElementById('mastery-grid');
    const allKana = [...allHiragana, ...allKatakana];
    
    masteryGrid.innerHTML = allKana.slice(0, 100).map(k => {
        const stats = userProgress.kanaStats[k.kana] || { correct: 0, wrong: 0 };
        const total = stats.correct + stats.wrong;
        const accuracy = total > 0 ? Math.round((stats.correct / total) * 100) : 0;
        
        let className = 'new';
        if (total >= 5 && accuracy >= 80) className = 'mastered';
        else if (total > 0) className = 'learning';
        
        return `
            <div class="mastery-item ${className}" title="${k.kana} = ${k.romaji}\nAccuracy: ${accuracy}%">
                ${k.kana}
                <span class="mastery-percent">${total > 0 ? accuracy + '%' : ''}</span>
            </div>
        `;
    }).join('');
}

function resetProgress() {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
        userProgress = {
            totalScore: 0,
            bestStreak: 0,
            gamesPlayed: 0,
            kanaStats: {}
        };
        saveProgress();
        updateProgressScreen();
        updateMainMenuStats();
        alert('Progress has been reset!');
    }
}

async function clearAppCache() {
    if (!confirm('Clear browser cache and reload?\n\nYour study data (scores, notebook) will NOT be affected.')) return;
    if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map(k => caches.delete(k)));
    }
    if ('serviceWorker' in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map(r => r.unregister()));
    }
    window.location.reload(true);
}

// ===== SETTINGS =====
function toggleSound() {
    gameState.settings.sound = document.getElementById('sound-toggle').checked;
    saveSettings();
}

function toggleHints() {
    gameState.settings.hints = document.getElementById('hints-toggle').checked;
    saveSettings();
}

function toggleDakuten() {
    gameState.settings.dakuten = document.getElementById('dakuten-toggle').checked;
    saveSettings();
}

function toggleCombo() {
    gameState.settings.combo = document.getElementById('combo-toggle').checked;
    saveSettings();
}

function setQuestionsCount() {
    gameState.settings.questionsPerRound = parseInt(document.getElementById('questions-count').value);
    saveSettings();
}

// ===== SOUND EFFECTS =====
function playSound(type) {
    if (!gameState.settings.sound) return;
    
    // Simple audio feedback using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (type === 'correct') {
        oscillator.frequency.value = 523.25; // C5
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    } else {
        oscillator.frequency.value = 200;
        oscillator.type = 'square';
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    }
}
