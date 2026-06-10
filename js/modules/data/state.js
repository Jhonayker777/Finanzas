window.AppState = {
    balance: 1000000,
    totalIncome: 0,
    totalExpenses: 0,
    transactions: [],
    categorySpent: {
        family: 0,
        leisure: 0,
        savings: 0,
        investments: 0
    },
    currentCategory: 'family',
    isBalanceVisible: true,
    badges: {
        saver: false,
        consistent: false
    },
    waitingItems: []
};

window.getState = function() {
    return window.AppState;
};

window.setState = function(newState) {
    window.AppState = { ...window.AppState, ...newState };
};

window.updateState = function(updater) {
    if (typeof updater === 'function') {
        window.AppState = updater(window.AppState);
    } else {
        window.AppState = { ...window.AppState, ...updater };
    }
};