/* ===========================
   Local Storage Management
   =========================== */

const storage = {
    // User Profile
    getUserProfile() {
        const profile = localStorage.getItem('userProfile');
        return profile ? JSON.parse(profile) : this.createDefaultProfile();
    },

    createDefaultProfile() {
        const defaultProfile = {
            username: 'مستخدم جديد',
            totalExercises: 0,
            correctExercises: 0,
            currentLevel: 1,
            levels: {
                1: { completed: 0, total: 10, attempts: 0 },
                2: { completed: 0, total: 10, attempts: 0 },
                3: { completed: 0, total: 10, attempts: 0 },
                4: { completed: 0, total: 10, attempts: 0 }
            },
            achievements: [],
            lastSession: new Date().toISOString(),
            settings: {
                sound: true,
                hints: true,
                darkMode: false
            }
        };
        this.saveUserProfile(defaultProfile);
        return defaultProfile;
    },

    saveUserProfile(profile) {
        localStorage.setItem('userProfile', JSON.stringify(profile));
    },

    // Progress Tracking
    updateProgress(level, isCorrect) {
        const profile = this.getUserProfile();
        
        profile.totalExercises++;
        if (isCorrect) {
            profile.correctExercises++;
            profile.levels[level].completed++;
        }
        profile.levels[level].attempts++;
        profile.lastSession = new Date().toISOString();
        
        this.saveUserProfile(profile);
        return profile;
    },

    getProgress(level) {
        const profile = this.getUserProfile();
        const levelData = profile.levels[level];
        return {
            completed: levelData.completed,
            total: levelData.total,
            percentage: Math.round((levelData.completed / levelData.total) * 100)
        };
    },

    // Level Management
    completeLevel(level) {
        const profile = this.getUserProfile();
        if (level > profile.currentLevel) {
            profile.currentLevel = level;
        }
        this.saveUserProfile(profile);
    },

    // Settings
    getSettings() {
        const profile = this.getUserProfile();
        return profile.settings;
    },

    updateSettings(settings) {
        const profile = this.getUserProfile();
        profile.settings = { ...profile.settings, ...settings };
        this.saveUserProfile(profile);
    },

    // Achievements
    unlockAchievement(achievementId) {
        const profile = this.getUserProfile();
        if (!profile.achievements.includes(achievementId)) {
            profile.achievements.push(achievementId);
            this.saveUserProfile(profile);
        }
    },

    getAchievements() {
        const profile = this.getUserProfile();
        return profile.achievements;
    },

    // Statistics
    getStatistics() {
        const profile = this.getUserProfile();
        return {
            total: profile.totalExercises,
            correct: profile.correctExercises,
            accuracy: profile.totalExercises > 0 
                ? Math.round((profile.correctExercises / profile.totalExercises) * 100) 
                : 0,
            currentLevel: profile.currentLevel
        };
    },

    // Session Data
    saveSessionData(level, exerciseIndex, answer) {
        const sessionKey = `session_${level}_${exerciseIndex}`;
        const sessionData = {
            answer,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem(sessionKey, JSON.stringify(sessionData));
    },

    getSessionData(level, exerciseIndex) {
        const sessionKey = `session_${level}_${exerciseIndex}`;
        const data = localStorage.getItem(sessionKey);
        return data ? JSON.parse(data) : null;
    },

    // Clear All Data
    resetAll() {
        if (confirm('هل أنت متأكد من حذف جميع البيانات؟')) {
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('userProfile') || key.startsWith('session_')) {
                    localStorage.removeItem(key);
                }
            });
            this.createDefaultProfile();
            return true;
        }
        return false;
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = storage;
}
