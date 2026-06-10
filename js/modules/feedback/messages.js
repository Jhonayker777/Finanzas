window.FeedbackMessages = {
    getDailyTip: () => {
        const tips = [
            '💡 Ahorra al menos el 20% de cada ingreso',
            '📊 Revisa tus gastos semanalmente',
            '🎯 Define metas financieras claras',
            '🏦 Crea un fondo de emergencia',
            '🚫 Evita compras impulsivas - espera 24h'
        ];
        return tips[Math.floor(Math.random() * tips.length)];
    },
    
    getProductiveMessage: (action) => {
        if (action === 'project') {
            return '🚀 ¡Excelente! Ejecutar proyecto es clave para tu futuro financiero.';
        }
        const health = window.BudgetCalculations.getOverallHealth();
        return `📊 Tu salud financiera es del ${Math.round(health)}%. ${health >= 60 ? '¡Vas por buen camino!' : 'Revisa tus gastos para mejorar.'}`;
    }
};