window.Recommendations = {
    getRecommendation: () => {
        const health = window.BudgetCalculations.getOverallHealth();
        if (health < 30) {
            return '🔴 Tus gastos superan tus ingresos. ¡Revisa tus finanzas urgentemente!';
        }
        if (health < 60) {
            return '🟡 Vas bien, pero puedes mejorar tu tasa de ahorro.';
        }
        return '🟢 Excelente salud financiera. Sigue así!';
    }
};