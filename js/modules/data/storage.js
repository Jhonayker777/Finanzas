window.Storage = {
    KEY: 'memo_state',
    
    save: () => {
        try {
            const toSave = {
                balance: window.AppState.balance,
                totalIncome: window.AppState.totalIncome,
                totalExpenses: window.AppState.totalExpenses,
                transactions: window.AppState.transactions,
                categorySpent: window.AppState.categorySpent,
                currentCategory: window.AppState.currentCategory,
                isBalanceVisible: window.AppState.isBalanceVisible,
                badges: window.AppState.badges,
                waitingItems: window.AppState.waitingItems
            };
            localStorage.setItem(window.Storage.KEY, JSON.stringify(toSave));
            console.log('✅ Datos guardados');
        } catch (e) {
            console.error('Error saving:', e);
        }
    },
    
    load: () => {
        try {
            const saved = localStorage.getItem(window.Storage.KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                window.AppState.balance = parsed.balance ?? 1000000;
                window.AppState.totalIncome = parsed.totalIncome ?? 0;
                window.AppState.totalExpenses = parsed.totalExpenses ?? 0;
                window.AppState.transactions = parsed.transactions ?? [];
                window.AppState.categorySpent = parsed.categorySpent ?? { family: 0, leisure: 0, savings: 0, investments: 0 };
                window.AppState.currentCategory = parsed.currentCategory ?? 'family';
                window.AppState.isBalanceVisible = parsed.isBalanceVisible ?? true;
                window.AppState.badges = parsed.badges ?? { saver: false, consistent: false };
                window.AppState.waitingItems = parsed.waitingItems ?? [];
                console.log('✅ Datos cargados');
            }
        } catch (e) {
            console.error('Error loading:', e);
        }
    },
    
    reset: () => {
        localStorage.removeItem(window.Storage.KEY);
        window.AppState.balance = 1000000;
        window.AppState.totalIncome = 0;
        window.AppState.totalExpenses = 0;
        window.AppState.transactions = [];
        window.AppState.categorySpent = { family: 0, leisure: 0, savings: 0, investments: 0 };
        window.AppState.currentCategory = 'family';
        window.AppState.isBalanceVisible = true;
        window.AppState.badges = { saver: false, consistent: false };
        window.AppState.waitingItems = [];
        window.Storage.save();
        console.log('🔄 Datos reseteados');
    }
};