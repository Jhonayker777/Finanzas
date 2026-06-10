window.BalanceUI = {
    update: () => {
        const balanceEl = document.getElementById('balanceAmount');
        const totalIncomeEl = document.getElementById('totalIncome');
        const totalExpensesEl = document.getElementById('totalExpenses');
        
        if (balanceEl) {
            const formatted = window.Formatters.formatCurrency(window.AppState.balance);
            balanceEl.textContent = formatted;
            
            if (window.AppState.isBalanceVisible) {
                balanceEl.classList.remove('balance-hidden');
                balanceEl.classList.add('balance-visible');
            } else {
                balanceEl.classList.remove('balance-visible');
                balanceEl.classList.add('balance-hidden');
            }
        }
        
        if (totalIncomeEl) {
            totalIncomeEl.textContent = window.Formatters.formatCurrency(window.AppState.totalIncome);
        }
        
        if (totalExpensesEl) {
            totalExpensesEl.textContent = window.Formatters.formatCurrency(window.AppState.totalExpenses);
        }
    },
    
    toggleVisibility: () => {
        window.AppState.isBalanceVisible = !window.AppState.isBalanceVisible;
        
        const toggleText = document.getElementById('toggleText');
        const toggleIcon = document.getElementById('toggleIcon');
        
        if (toggleText) {
            toggleText.textContent = window.AppState.isBalanceVisible ? 'Ocultar' : 'Ver saldo';
        }
        
        if (toggleIcon) {
            toggleIcon.textContent = window.AppState.isBalanceVisible ? 'visibility_off' : 'visibility';
        }
        
        window.BalanceUI.update();
        window.Storage.save();
        window.Alerts.showToast(window.AppState.isBalanceVisible ? '💰 Saldo visible' : '👁️ Saldo oculto', 'info');
    },
    
    init: () => {
        const toggleText = document.getElementById('toggleText');
        const toggleIcon = document.getElementById('toggleIcon');
        
        if (toggleText) {
            toggleText.textContent = window.AppState.isBalanceVisible ? 'Ocultar' : 'Ver saldo';
        }
        
        if (toggleIcon) {
            toggleIcon.textContent = window.AppState.isBalanceVisible ? 'visibility_off' : 'visibility';
        }
        
        window.BalanceUI.update();
    }
};