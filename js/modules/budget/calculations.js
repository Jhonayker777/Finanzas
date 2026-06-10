window.BudgetCalculations = {
    getCategoryPercentage: (category) => {
        const spent = window.AppState.categorySpent[category] || 0;
        const limit = window.CONFIG.CATEGORIES[category]?.limit || 1;
        return (spent / limit) * 100;
    },
    
    getCategoryRemaining: (category) => {
        const spent = window.AppState.categorySpent[category] || 0;
        const limit = window.CONFIG.CATEGORIES[category]?.limit || 0;
        return Math.max(0, limit - spent);
    },
    
    getOverallHealth: () => {
        if (window.AppState.totalIncome === 0) return 100;
        const savingsRate = ((window.AppState.totalIncome - window.AppState.totalExpenses) / window.AppState.totalIncome) * 100;
        return Math.max(0, Math.min(100, savingsRate));
    },
    
    getEnergyMessage: () => {
        const health = window.BudgetCalculations.getOverallHealth();
        if (health >= 70) return '💪 Excelente! Sigue así';
        if (health >= 40) return '⚠️ Cuidado, revisa tus gastos';
        return '🔴 Alerta! Necesitas ajustar tus finanzas';
    },
    
    getEnergyColor: () => {
        const health = window.BudgetCalculations.getOverallHealth();
        if (health >= 70) return '#4edea3';
        if (health >= 40) return '#ffb95f';
        return '#ffb4ab';
    }
};