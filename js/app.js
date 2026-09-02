/* ===========================
   Main Application Logic
   =========================== */

// Level and Vocabulary Data
const levelsData = {
    levels: [
        {
            id: 1,
            name: 'مبتدئ',
            description: 'الكلمات والعبارات الأساسية',
            difficulty: 'سهل',
            exercises: [
                { arabic: 'السلام عليكم', english: 'Hello' },
                { arabic: 'كيف حالك؟', english: 'How are you?' },
                { arabic: 'شكراً', english: 'Thank you' },
                { arabic: 'من فضلك', english: 'Please' },
                { arabic: 'أنا سعيد', english: 'I am happy' },
                { arabic: 'هذا كتاب', english: 'This is a book' },
                { arabic: 'أحب القراءة', english: 'I like reading' },
                { arabic: 'أنا طالب', english: 'I am a student' },
                { arabic: 'اسمي علي', english: 'My name is Ali' },
                { arabic: 'مرحباً بك', english: 'Welcome' }
            ]
        },
        {
            id: 2,
            name: 'متوسط',
            description: 'الجمل البسيطة والقواعد',
            difficulty: 'متوسط',
            exercises: [
                { arabic: 'أنا أحب اللغة الإنجليزية', english: 'I love the English language' },
                { arabic: 'هل تريد شرب القهوة؟', english: 'Do you want to drink coffee?' },
                { arabic: 'الطقس جميل اليوم', english: 'The weather is beautiful today' },
                { arabic: 'أين تسكن؟', english: 'Where do you live?' },
                { arabic: 'أنا أعمل مهندساً', english: 'I work as an engineer' },
                { arabic: 'هذا المنزل كبير جداً', english: 'This house is very big' },
                { arabic: 'هل تتحدث الفرنسية؟', english: 'Do you speak French?' },
                { arabic: 'أنا ذاهب للمدرسة', english: 'I am going to school' },
                { arabic: 'الكتاب على الطاولة', english: 'The book is on the table' },
                { arabic: 'ما رأيك في هذا الفيلم؟', english: 'What do you think about this movie?' }
            ]
        },
        {
            id: 3,
            name: 'متقدم',
            description: 'الجمل المعقدة والقواعد المتقدمة',
            difficulty: 'صعب',
            exercises: [
                { arabic: 'على الرغم من الصعوبات، استمر في محاولته', english: 'Despite the difficulties, he persisted in his attempts' },
                { arabic: 'لو كان لديك وقت أكثر، ستنهي المشروع', english: 'If you had more time, you would finish the project' },
                { arabic: 'يبدو أنه قد أنهى عمله قبل وصولي', english: 'It seems he had finished his work before I arrived' },
                { arabic: 'المكان الذي تسكن فيه جميل جداً', english: 'The place where you live is very beautiful' },
                { arabic: 'كلما درست أكثر، كلما تعلمت أفضل', english: 'The more you study, the better you learn' },
                { arabic: 'ليس فقط الذكاء، بل أيضاً الاجتهاد ضروري', english: 'Not only intelligence, but also hard work is necessary' },
                { arabic: 'لو لم يحذرني، كنت سأقع في الفخ', english: 'If he had not warned me, I would have fallen into the trap' },
                { arabic: 'بينما كان يقود السيارة، اتصلت به', english: 'While he was driving, she called him' },
                { arabic: 'كان ينبغي عليه أن يخبرنا عن القرار', english: 'He should have told us about the decision' },
                { arabic: 'بعد أن تخرج من الجامعة، بحث عن وظيفة', english: 'After graduating from university, he looked for a job' }
            ]
        },
        {
            id: 4,
            name: 'احترافي',
            description: 'الكتابة الأكاديمية والمهنية',
            difficulty: 'احترافي',
            exercises: [
                { arabic: 'يهدف هذا البحث إلى فحص تأثير التكنولوجيا على التعليم', english: 'This research aims to examine the impact of technology on education' },
                { arabic: 'كما يتضح من الدراسات السابقة، فإن هذا الاتجاه في ازدياد', english: 'As evident from previous studies, this trend is increasing' },
                { arabic: 'على الرغم من الاختلافات الثقافية، هناك أوجه تشابه كثيرة', english: 'Despite cultural differences, there are many similarities' },
                { arabic: 'يمكن القول أن الاستثمار في التعليم عائد ذو فائدة طويلة الأجل', english: 'It can be argued that investment in education is a long-term profitable return' },
                { arabic: 'تشير البيانات إلى أن هناك ارتباطاً قوياً بين المتغيرات', english: 'The data indicates that there is a strong correlation between the variables' },
                { arabic: 'من الناحية النظرية، يجب أن نأخذ في الاعتبار العوامل الآتية', english: 'From a theoretical perspective, we should consider the following factors' },
                { arabic: 'وفقاً للإحصائيات الرسمية، قد حدث انخفاض في معدل البطالة', english: 'According to official statistics, there has been a decline in the unemployment rate' },
                { arabic: 'في الخلاصة، يمكننا أن نستنتج أن الفرضية قد تم إثباتها', english: 'In conclusion, we can conclude that the hypothesis has been proven' },
                { arabic: 'هذا المفهوم ينطبق على معظم الحالات الواقعية', english: 'This concept applies to most real-world scenarios' },
                { arabic: 'بناءً على ما سبق، نوصي بإعادة النظر في السياسة الحالية', english: 'Based on the above, we recommend reconsidering the current policy' }
            ]
        }
    ]
};

// Global Variables
let currentLevel = 1;
let currentExerciseIndex = 0;
let exercises = [];
let userStats = {
    correct: 0,
    attempts: 0
};

// Initialize App
function initApp() {
    loadUserProgress();
    setupEventListeners();
    renderHome();
    loadRules();
}

// Setup Event Listeners
function setupEventListeners() {
    // Navigation Buttons
    document.getElementById('rulesBtn')?.addEventListener('click', showRulesScreen);
    document.getElementById('settingsBtn')?.addEventListener('click', showSettingsScreen);
    document.getElementById('profileBtn')?.addEventListener('click', showProfileScreen);

    // Close Buttons
    document.getElementById('closeRulesBtn')?.addEventListener('click', showHome);
    document.getElementById('closeSettingsBtn')?.addEventListener('click', showHome);
    document.getElementById('closeProfileBtn')?.addEventListener('click', showHome);

    // Learning Screen Buttons
    document.getElementById('checkBtn')?.addEventListener('click', checkAnswer);
    document.getElementById('skipBtn')?.addEventListener('click', skipExercise);
    document.getElementById('nextBtn')?.addEventListener('click', nextExercise);
    document.getElementById('backBtn')?.addEventListener('click', showHome);

    // Settings
    document.getElementById('soundToggle')?.addEventListener('change', updateSettings);
    document.getElementById('hintsToggle')?.addEventListener('change', updateSettings);
    document.getElementById('darkModeToggle')?.addEventListener('change', toggleDarkMode);
    document.getElementById('resetProgressBtn')?.addEventListener('click', resetProgress);

    // Input Events
    document.getElementById('englishInput')?.addEventListener('input', handleInput);
    document.getElementById('englishInput')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkAnswer();
    });

    // Level Cards
    document.querySelectorAll('.level-card').forEach(card => {
        card.addEventListener('click', () => startLevel(parseInt(card.dataset.level)));
    });
}

// Render Home Screen
function renderHome() {
    showScreen('homeScreen');
    updateProgressBars();
    aiBot.showMessage('اختر المستوى الذي تريد البدء به! 🎓');
}

// Start Level
function startLevel(level) {
    currentLevel = level;
    currentExerciseIndex = 0;
    exercises = levelsData.levels[level - 1].exercises;
    userStats = { correct: 0, attempts: 0 };
    
    showScreen('learningScreen');
    loadExercise();
    aiBot.animateBot('happy');
    aiBot.showMessage(`مرحباً بك في المستوى ${level}! 🚀`);
}

// Load Exercise
function loadExercise() {
    if (currentExerciseIndex >= exercises.length) {
        completeLevel();
        return;
    }

    const exercise = exercises[currentExerciseIndex];
    document.getElementById('arabicText').textContent = exercise.arabic;
    document.getElementById('englishInput').value = '';
    document.getElementById('englishInput').focus();
    document.getElementById('feedbackSection').style.display = 'none';
    document.getElementById('checkBtn').style.display = 'inline-flex';
    document.getElementById('skipBtn').style.display = 'inline-flex';
    document.getElementById('nextBtn').style.display = 'none';

    // Update level info
    document.getElementById('currentLevel').textContent = `المستوى ${currentLevel}`;
    document.getElementById('currentExercise').textContent = `التمرين ${currentExerciseIndex + 1} من ${exercises.length}`;

    // Update bot
    const levelName = levelsData.levels[currentLevel - 1].name;
    aiBot.showMessage(`اترجم: "${exercise.arabic}"`, 0);
}

// Check Answer
function checkAnswer() {
    const userAnswer = document.getElementById('englishInput').value.trim();
    
    if (!userAnswer) {
        aiBot.showMessage('الرجاء إدخال إجابة! ✍️');
        return;
    }

    const exercise = exercises[currentExerciseIndex];
    const feedback = aiBot.checkAnswer(userAnswer, exercise.english);
    
    userStats.attempts++;
    storage.updateProgress(currentLevel, feedback.isCorrect);

    if (feedback.isCorrect) {
        userStats.correct++;
        showFeedback(feedback, true);
        aiBot.animateBot('happy');
        document.getElementById('checkBtn').style.display = 'none';
        document.getElementById('skipBtn').style.display = 'none';
        document.getElementById('nextBtn').style.display = 'inline-flex';
        currentExerciseIndex++;
    } else {
        showFeedback(feedback, false);
        aiBot.animateBot('sad');
    }

    aiBot.showMessage(feedback.message);
}

// Show Feedback
function showFeedback(feedback, isCorrect) {
    const feedbackSection = document.getElementById('feedbackSection');
    const feedbackContent = document.getElementById('feedbackContent');
    const exercise = exercises[currentExerciseIndex];

    let html = `<div class="feedback-item">`;
    
    if (isCorrect) {
        html += `<h4 style="color: var(--success-color);">✅ إجابة صحيحة!</h4>`;
        html += `<p style="color: var(--success-color);">الترجمة الصحيحة: <strong>${exercise.english}</strong></p>`;
    } else {
        html += `<h4 style="color: var(--error-color);">❌ إجابة غير صحيحة</h4>`;
        html += `<p>الترجمة الصحيحة: <strong>${exercise.english}</strong></p>`;
        
        if (feedback.errors.length > 0) {
            html += `<div style="margin-top: 1rem;">`;
            html += `<h5>الأخطاء:</h5>`;
            html += `<ul style="margin-top: 0.5rem;">`;
            feedback.errors.forEach(error => {
                html += `<li style="color: var(--error-color); margin: 0.3rem 0;">${error}</li>`;
            });
            html += `</ul></div>`;
        }

        if (feedback.suggestions.length > 0) {
            html += `<div style="margin-top: 1rem;">`;
            html += `<h5>التلميحات:</h5>`;
            html += `<ul style="margin-top: 0.5rem;">`;
            feedback.suggestions.forEach(suggestion => {
                html += `<li style="color: var(--info-color); margin: 0.3rem 0;">${suggestion}</li>`;
            });
            html += `</ul></div>`;
        }
    }

    html += `</div>`;
    feedbackContent.innerHTML = html;
    feedbackSection.classList.add('error');
    if (isCorrect) feedbackSection.classList.remove('error');
    feedbackSection.style.display = 'block';
}

// Skip Exercise
function skipExercise() {
    currentExerciseIndex++;
    storage.updateProgress(currentLevel, false);
    userStats.attempts++;
    loadExercise();
    aiBot.showMessage('تم التخطي! الانتقال للسؤال التالي... ⏭️');
}

// Next Exercise
function nextExercise() {
    if (currentExerciseIndex >= exercises.length) {
        completeLevel();
    } else {
        loadExercise();
    }
}

// Complete Level
function completeLevel() {
    const accuracy = Math.round((userStats.correct / userStats.attempts) * 100);
    const levelData = levelsData.levels[currentLevel - 1];
    
    storage.completeLevel(currentLevel);
    
    showScreen('learningScreen');
    document.getElementById('englishInput').parentElement.parentElement.style.display = 'none';
    document.getElementById('checkBtn').style.display = 'none';
    document.getElementById('skipBtn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';

    let feedbackHTML = `
        <div class="feedback-section">
            <div class="feedback-content">
                <h3 style="color: var(--success-color); text-align: center; margin-bottom: 1rem;">🎉 مبروك!</h3>
                <p style="text-align: center; font-size: 1.1rem; margin-bottom: 1.5rem;">لقد أكملت المستوى ${currentLevel}!</p>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 2rem 0;">
                    <div style="text-align: center; padding: 1rem; background: var(--light-bg); border-radius: 10px;">
                        <p style="font-size: 2rem; color: var(--success-color);">✅</p>
                        <p>${userStats.correct}</p>
                        <small>إجابات صحيحة</small>
                    </div>
                    <div style="text-align: center; padding: 1rem; background: var(--light-bg); border-radius: 10px;">
                        <p style="font-size: 2rem; color: var(--info-color);">📊</p>
                        <p>${userStats.attempts}</p>
                        <small>إجمالي المحاولات</small>
                    </div>
                    <div style="text-align: center; padding: 1rem; background: var(--light-bg); border-radius: 10px;">
                        <p style="font-size: 2rem; color: var(--primary-color);">🎯</p>
                        <p>${accuracy}%</p>
                        <small>نسبة النجاح</small>
                    </div>
                </div>
                <button id="nextLevelBtn" class="btn-primary btn-large" style="margin-top: 2rem; width: 100%;">
                    ${currentLevel < 4 ? '→ المستوى التالي' : '← العودة للرئيسية'}
                </button>
            </div>
        </div>
    `;

    document.querySelector('.learning-container').innerHTML = feedbackHTML;
    
    document.getElementById('nextLevelBtn').addEventListener('click', () => {
        if (currentLevel < 4) {
            startLevel(currentLevel + 1);
        } else {
            showHome();
        }
    });

    if (accuracy >= 80) {
        aiBot.showMessage(`ممتاز! نسبة نجاحك ${accuracy}%! 🏆`);
        storage.unlockAchievement(`level_${currentLevel}`);
    } else if (accuracy >= 60) {
        aiBot.showMessage(`جيد! حاول مرة أخرى لتحسين نسبتك! 💪`);
    } else {
        aiBot.showMessage(`لا تستسلم! استمر في المحاولة! 🚀`);
    }
}

// Handle Input Suggestions
function handleInput(e) {
    const input = e.target.value.trim();
    if (!input) {
        document.getElementById('suggestionsBox').classList.remove('show');
        return;
    }

    const exercise = exercises[currentExerciseIndex];
    if (!exercise) return;

    const words = exercise.english.split(' ');
    const suggestions = words.filter(word => 
        word.toLowerCase().includes(input.toLowerCase())
    );

    const suggestionsBox = document.getElementById('suggestionsBox');
    if (suggestions.length > 0) {
        suggestionsBox.innerHTML = suggestions.map(word => 
            `<div class="suggestion-item" onclick="insertSuggestion('${word}')">${word}</div>`
        ).join('');
        suggestionsBox.classList.add('show');
    } else {
        suggestionsBox.classList.remove('show');
    }
}

// Insert Suggestion
function insertSuggestion(word) {
    document.getElementById('englishInput').value = word;
    document.getElementById('suggestionsBox').classList.remove('show');
    document.getElementById('englishInput').focus();
}

// Load Rules
function loadRules() {
    grammarRules.renderRules();
}

// Show/Hide Screens
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId)?.classList.add('active');
}

// Show Rules Screen
function showRulesScreen() {
    showScreen('rulesScreen');
    loadRules();
}

// Show Settings Screen
function showSettingsScreen() {
    showScreen('settingsScreen');
    const settings = storage.getSettings();
    document.getElementById('soundToggle').checked = settings.sound;
    document.getElementById('hintsToggle').checked = settings.hints;
    document.getElementById('darkModeToggle').checked = settings.darkMode;
}

// Show Profile Screen
function showProfileScreen() {
    showScreen('profileScreen');
    updateProfileStats();
    updateAchievements();
}

// Update Profile Stats
function updateProfileStats() {
    const stats = storage.getStatistics();
    document.getElementById('totalExercises').textContent = stats.total;
    document.getElementById('correctExercises').textContent = stats.correct;
    document.getElementById('successRate').textContent = stats.accuracy + '%';
    document.getElementById('highestLevel').textContent = stats.currentLevel;
}

// Update Achievements
function updateAchievements() {
    const achievements = [
        { id: 'level_1', icon: '🥉', name: 'المستوى الأول', desc: 'أكمل المستوى الأول' },
        { id: 'level_2', icon: '🥈', name: 'المستوى الثاني', desc: 'أكمل المستوى الثاني' },
        { id: 'level_3', icon: '🥇', name: 'المستوى الثالث', desc: 'أكمل المستوى الثالث' },
        { id: 'level_4', icon: '👑', name: 'الاحترافية', desc: 'أكمل المستوى الرابع' },
        { id: 'perfect', icon: '💯', name: '100%', desc: 'حقق 100% في جميع التمارين' }
    ];

    const unlockedAchievements = storage.getAchievements();
    const grid = document.getElementById('achievementsGrid');
    
    grid.innerHTML = achievements.map(ach => `
        <div class="achievement-badge ${unlockedAchievements.includes(ach.id) ? 'unlocked' : ''}">
            <div class="achievement-icon">${ach.icon}</div>
            <div class="achievement-name">${ach.name}</div>
        </div>
    `).join('');
}

// Update Settings
function updateSettings() {
    const settings = {
        sound: document.getElementById('soundToggle').checked,
        hints: document.getElementById('hintsToggle').checked,
        darkMode: document.getElementById('darkModeToggle').checked
    };
    storage.updateSettings(settings);
}

// Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Reset Progress
function resetProgress() {
    if (storage.resetAll()) {
        location.reload();
    }
}

// Load User Progress
function loadUserProgress() {
    const profile = storage.getUserProfile();
    currentLevel = profile.currentLevel;
}

// Update Progress Bars
function updateProgressBars() {
    for (let i = 1; i <= 4; i++) {
        const progress = storage.getProgress(i);
        const progressBar = document.getElementById(`progress-${i}`);
        const progressText = document.getElementById(`progress-text-${i}`);
        
        if (progressBar) {
            progressBar.style.width = progress.percentage + '%';
            progressText.textContent = `${progress.completed}/${progress.total}`;
        }
    }
}

// Initialize App on Load
document.addEventListener('DOMContentLoaded', initApp);

// Show Home
function showHome() {
    renderHome();
}
