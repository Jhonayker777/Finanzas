window.CONFIG = {
    APP_NAME: 'MeMo Finanzas',
    VERSION: '2.0.0',
    
    CATEGORIES: {
        family: { name: 'Familiar', limit: 100000, emoji: '🏠', color: '#4edea3' },
        leisure: { name: 'Ocio', limit: 50000, emoji: '🎮', color: '#ffb95f' },
        savings: { name: 'Ahorro', limit: 200000, emoji: '💰', color: '#6ffbbe' },
        investments: { name: 'Inversiones', limit: 500000, emoji: '📈', color: '#bec6e0' }
    },
    
    ALERT_THRESHOLDS: {
        warning: 70,
        danger: 90,
        critical: 100
    },
    
    BADGE_RULES: {
        saver: {
            name: 'Ahorrador',
            condition: (state) => state.totalExpenses < state.totalIncome * 0.5 && state.totalIncome > 0,
            message: '🎉 ¡Desbloqueaste el badge AHORRADOR!'
        },
        consistent: {
            name: 'Constante',
            condition: (state) => state.transactions.length >= 10,
            message: '🎉 ¡Desbloqueaste el badge CONSTANTE!'
        }
    }
};