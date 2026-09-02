/* ===========================
   AI Bot Logic and Responses
   =========================== */

const aiBot = {
    // Bot messages
    responses: {
        greeting: [
            'مرحباً! 👋',
            'أهلاً وسهلاً! 🎓',
            'يا هلا! 😊'
        ],
        correct: [
            'ممتاز! إجابة صحيحة تماماً! ✅',
            'رائع جداً! أنت تتعلم بسرعة! 🌟',
            'صحيح! عمل رائع! 👏',
            'مثالي! استمر بهذا المستوى! 💪'
        ],
        incorrect: [
            'حاول مرة أخرى! أنت قريب جداً! 🤔',
            'لا بأس، حاول مجدداً! 💪',
            'تحتاج إلى التركيز أكثر! 📝',
            'اقرأ القاعدة وحاول مرة أخرى! 📚'
        ],
        levelUp: [
            'مبروك! لقد أكملت المستوى! 🎉',
            'عظيم! انتقل للمستوى التالي! 🚀',
            'رائع! أنت متقدم جداً! 🏆'
        ],
        hint: [
            'تلميح: تحقق من الأحرف الكبيرة! 🔤',
            'تلميح: تحقق من علامات الترقيم! ✍️',
            'تلميح: أعد قراءة الجملة بعناية! 👀',
            'تلميح: استخدم القاموس إذا لزم الأمر! 📖'
        ]
    },

    // Analyze answer and provide feedback
    checkAnswer(userAnswer, correctAnswer) {
        const normUser = this.normalizeText(userAnswer);
        const normCorrect = this.normalizeText(correctAnswer);

        if (normUser === normCorrect) {
            return {
                isCorrect: true,
                message: this.getRandomMessage('correct'),
                errors: [],
                suggestions: []
            };
        }

        const feedback = this.findErrors(userAnswer, correctAnswer);
        return {
            isCorrect: false,
            message: this.getRandomMessage('incorrect'),
            errors: feedback.errors,
            suggestions: feedback.suggestions
        };
    },

    // Normalize text for comparison
    normalizeText(text) {
        return text
            .toLowerCase()
            .trim()
            .replace(/\s+/g, ' ')
            .replace(/[!؟\.،]/g, '');
    },

    // Find errors in user's answer
    findErrors(userAnswer, correctAnswer) {
        const errors = [];
        const suggestions = [];

        // Check length
        if (userAnswer.length < correctAnswer.length * 0.8) {
            errors.push('الإجابة قصيرة جداً');
            suggestions.push(`الإجابة الصحيحة: ${correctAnswer}`);
        }

        // Check for spelling errors
        const userWords = userAnswer.split(' ');
        const correctWords = correctAnswer.split(' ');

        userWords.forEach((word, index) => {
            if (index < correctWords.length) {
                if (!this.isSimilar(word, correctWords[index])) {
                    errors.push(`كلمة غير صحيحة: "${word}"`);
                    suggestions.push(`استخدم: "${correctWords[index]}"`);
                }
            }
        });

        // Check capitalization
        if (userAnswer[0] !== correctAnswer[0]) {
            if (userAnswer[0].toLowerCase() !== correctAnswer[0].toLowerCase()) {
                errors.push('الحرف الأول يجب أن يكون بحرف كبير');
            }
        }

        return { errors, suggestions };
    },

    // Check similarity between words (for typos)
    isSimilar(word1, word2) {
        const distance = this.levenshteinDistance(
            word1.toLowerCase(),
            word2.toLowerCase()
        );
        // Allow up to 1 character difference
        return distance <= 1;
    },

    // Levenshtein distance algorithm
    levenshteinDistance(str1, str2) {
        const matrix = [];

        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }

        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }

        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }

        return matrix[str2.length][str1.length];
    },

    // Get random message
    getRandomMessage(type) {
        const messages = this.responses[type];
        return messages[Math.floor(Math.random() * messages.length)];
    },

    // Bot animation states
    animateBot(state) {
        const robot = document.querySelector('.robot');
        if (!robot) return;

        robot.classList.remove('happy', 'sad', 'thinking');

        switch (state) {
            case 'happy':
                robot.classList.add('happy');
                break;
            case 'sad':
                robot.classList.add('sad');
                break;
            case 'thinking':
                robot.classList.add('thinking');
                break;
        }
    },

    // Show bot message
    showMessage(message, duration = 3000) {
        const botMessage = document.getElementById('botMessage');
        if (!botMessage) return;

        botMessage.innerHTML = `<p>${message}</p>`;
        botMessage.style.display = 'block';

        if (duration > 0) {
            setTimeout(() => {
                botMessage.style.display = 'none';
            }, duration);
        }
    },

    // Get suggestion based on level
    getSuggestion(level) {
        const suggestions = {
            1: 'ركز على الكلمات البسيطة والشائعة',
            2: 'تذكر ترتيب الكلمات في الجملة',
            3: 'استخدم القواعس النحوية الصحيحة',
            4: 'اهتم بالدقة والأسلوب الاحترافي'
        };
        return suggestions[level] || 'حاول مرة أخرى!';
    }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = aiBot;
}
