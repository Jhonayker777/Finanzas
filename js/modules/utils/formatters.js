window.Formatters = {
    formatCurrency: (amount) => {
        return new Intl.NumberFormat('es-CO').format(amount);
    },
    
    formatPercentage: (value) => {
        return `${Math.round(value)}%`;
    }
};