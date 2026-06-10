window.Waiting24h = {
    addToWaiting: (category, concept, amount) => {
        const item = {
            id: Date.now(),
            category,
            concept,
            amount,
            expiresAt: Date.now() + 24 * 60 * 60 * 1000
        };
        window.AppState.waitingItems.push(item);
        window.Storage.save();
        window.Alerts.showToast(`⏰ Gasto en espera. Te recordaremos en 24h.`, 'info');
        return item.id;
    },
    
    checkExpiredItems: () => {
        const now = Date.now();
        let changed = false;
        
        window.AppState.waitingItems = window.AppState.waitingItems.filter(item => {
            if (item.expiresAt <= now) {
                changed = true;
                const shouldSpend = confirm(`¿Aún quieres gastar $${window.Formatters.formatCurrency(item.amount)} en ${item.concept}?`);
                if (shouldSpend) {
                    window.Actions.addExpense(item.concept, item.amount);
                }
                return false;
            }
            return true;
        });
        
        if (changed) window.Storage.save();
    }
};