/* ===========================
   English Grammar Rules
   =========================== */

const grammarRules = {
    rules: [
        {
            title: '📌 استخدام "a" و "an"',
            description: 'نستخدم "a" قبل الكلمات التي تبدأ بصوت ساكن، و"an" قبل الكلمات التي تبدأ بصوت متحرك.',
            examples: [
                'a cat (قطة)',
                'an apple (تفاحة)',
                'a book (كتاب)',
                'an elephant (فيل)'
            ]
        },
        {
            title: '📌 الأفعال في الزمن الحاضر البسيط',
            description: 'نضيف "s" أو "es" للفعل عند الحديث عن الشخص الثالث.',
            examples: [
                'He plays football (يلعب كرة القدم)',
                'She watches TV (تشاهد التلفاز)',
                'It goes to school (تذهب للمدرسة)',
                'He does homework (يعمل الواجب)'
            ]
        },
        {
            title: '📌 الفاعل والفعل',
            description: 'يجب أن يتطابق الفعل مع الفاعل في العدد.',
            examples: [
                'I am (أنا)',
                'You are (أنت)',
                'He/She/It is (هو/هي)',
                'We/They are (نحن/هم)'
            ]
        },
        {
            title: '📌 الحروف الكبيرة',
            description: 'نبدأ الجملة بحرف كبير، ونكتب أسماء الأشخاص والدول بحرف كبير.',
            examples: [
                'I love London (أنا أحب لندن)',
                'My name is Ali (اسمي علي)',
                'He lives in Egypt (يسكن في مصر)',
                'She is a teacher (هي معلمة)'
            ]
        },
        {
            title: '📌 علامات الترقيم',
            description: 'نستخدم النقطة في نهاية الجملة، والفاصلة بين أجزاء الجملة.',
            examples: [
                'I like apples, oranges, and bananas.',
                'Do you like cats? (هل تحب القطط؟)',
                'What is your name? (ما اسمك؟)',
                'I love you! (أنا أحبك!)'
            ]
        },
        {
            title: '📌 الضمائر الشخصية',
            description: 'هناك ضمائر مختلفة للمتكلم والمخاطب والغائب.',
            examples: [
                'I (أنا)',
                'You (أنت)',
                'He/She/It (هو/هي/هو)',
                'We (نحن)',
                'They (هم)'
            ]
        },
        {
            title: '📌 الأسماء المفردة والجمع',
            description: 'نضيف "s" أو "es" لجعل الاسم جمعاً.',
            examples: [
                'cat → cats (قطة - قطط)',
                'box → boxes (صندوق - صناديق)',
                'book → books (كتاب - كتب)',
                'dish → dishes (طبق - أطباق)'
            ]
        },
        {
            title: '📌 الصفات',
            description: 'الصفة تأتي قبل الاسم لوصفه.',
            examples: [
                'a big house (منزل كبير)',
                'a beautiful girl (فتاة جميلة)',
                'blue eyes (عيون زرقاء)',
                'smart students (طلاب أذكياء)'
            ]
        },
        {
            title: '📌 ترتيب الكلمات في الجملة',
            description: 'الترتيب الأساسي: الفاعل + الفعل + المفعول به',
            examples: [
                'I like pizza (أنا أحب البيتزا)',
                'She plays guitar (هي تعزف الجيتار)',
                'They read books (يقرأون الكتب)',
                'He watches movies (يشاهد الأفلام)'
            ]
        },
        {
            title: '📌 الأسئلة في الإنجليزية',
            description: 'نضع الفعل المساعد في البداية عند طرح سؤال.',
            examples: [
                'Do you like soccer? (هل تحب كرة القدم؟)',
                'Does he study? (هل يدرس؟)',
                'Are you happy? (هل أنت سعيد؟)',
                'What is your name? (ما اسمك؟)'
            ]
        }
    ],

    // Get all rules
    getAllRules() {
        return this.rules;
    },

    // Get rule by index
    getRuleByIndex(index) {
        return this.rules[index] || null;
    },

    // Get rules by level
    getRulesByLevel(level) {
        const rulesPerLevel = {
            1: [0, 3, 4],           // مبتدئ
            2: [1, 2, 6, 8],        // متوسط
            3: [7, 9],              // متقدم
            4: [5]                  // احترافي
        };
        return rulesPerLevel[level]?.map(i => this.rules[i]) || [];
    },

    // Render rules as HTML
    renderRules(level = null) {
        let rulesToRender = this.rules;
        if (level) {
            rulesToRender = this.getRulesByLevel(level);
        }

        const rulesContainer = document.getElementById('rulesContent');
        if (!rulesContainer) return;

        rulesContainer.innerHTML = rulesToRender.map(rule => `
            <div class="rule-card">
                <h3>${rule.title}</h3>
                <p>${rule.description}</p>
                <div class="rule-examples">
                    ${rule.examples.map(ex => `
                        <div class="rule-example">${ex}</div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = grammarRules;
}
