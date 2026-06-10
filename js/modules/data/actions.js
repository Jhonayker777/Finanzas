window.Actions = {
    addExpense: (concept, amount) => {
        if (!window.Validators.isValidAmount(amount)) {
            window.Alerts.showToast('❌ Monto inválido', 'error');
            return false;
        }
        
        if (!concept || concept.trim() === '') {
            window.Alerts.showToast('❌ Concepto requerido', 'error');
            return false;
        }
        
        if (amount > window.AppState.balance) {
            window.Alerts.showToast('❌ Saldo insuficiente', 'error');
            return false;
        }
        
        const transaction = {
            id: Date.now(),
            type: 'expense',
            category: window.AppState.currentCategory,
            concept: concept.trim(),
            amount: amount,
            date: window.DateUtils.getCurrentISO()
        };
        
        window.AppState.transactions.unshift(transaction);
        window.AppState.totalExpenses += amount;
        window.AppState.balance -= amount;
        window.AppState.categorySpent[window.AppState.currentCategory] += amount;
        
        window.Storage.save();
        if (window.UI) window.UI.refreshAll();
        if (window.Badges) window.Badges.checkAll();
        
        window.Alerts.showToast(`✅ Gasto registrado: $${window.Formatters.formatCurrency(amount)}`, 'success');
        return true;
    },
    
    addIncome: (concept, amount) => {
        if (!window.Validators.isValidAmount(amount)) {
            window.Alerts.showToast('❌ Monto inválido', 'error');
            return false;
        }
        
        if (!concept || concept.trim() === '') {
            window.Alerts.showToast('❌ Concepto requerido', 'error');
            return false;
        }
        
        const transaction = {
            id: Date.now(),
            type: 'income',
            category: null,
            concept: concept.trim(),
            amount: amount,
            date: window.DateUtils.getCurrentISO()
        };
        
        window.AppState.transactions.unshift(transaction);
        window.AppState.totalIncome += amount;
        window.AppState.balance += amount;
        
        window.Storage.save();
        if (window.UI) window.UI.refreshAll();
        if (window.Badges) window.Badges.checkAll();
        
        window.Alerts.showToast(`✅ Ingreso registrado: $${window.Formatters.formatCurrency(amount)}`, 'success');
        return true;
    },
    
    clearTransactions: () => {
        if (confirm('¿Eliminar todas las transacciones?')) {
            window.AppState.transactions = [];
            window.AppState.totalExpenses = 0;
            window.AppState.totalIncome = 0;
            window.AppState.balance = 1000000;
            window.AppState.categorySpent = { family: 0, leisure: 0, savings: 0, investments: 0 };
            window.AppState.badges = { saver: false, consistent: false };
            window.Storage.save();
            if (window.UI) window.UI.refreshAll();
            window.Alerts.showToast('🗑️ Historial limpiado', 'info');
        }
    },
    
    switchCategory: (category) => {
        if (window.CONFIG.CATEGORIES[category]) {
            window.AppState.currentCategory = category;
            window.Storage.save();
            if (window.CategoriesUI) window.CategoriesUI.update();
            window.Alerts.showToast(`Cambiado a: ${window.CONFIG.CATEGORIES[category].name}`, 'info');
        }
    },
    
    resetAll: () => {
        if (confirm('¿Resetear todos los datos?')) {
            window.Storage.reset();
            if (window.UI) window.UI.refreshAll();
            window.Alerts.showToast('🔄 Datos reiniciados', 'info');
        }
    }
};