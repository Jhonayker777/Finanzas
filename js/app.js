// UI Global - Orquestador
window.UI = {
    refreshAll: () => {
        console.log('🔄 Refrescando UI...');
        if (window.BalanceUI) window.BalanceUI.update();
        if (window.CategoriesUI) window.CategoriesUI.update();
        if (window.EnergyMeterUI) window.EnergyMeterUI.update();
        if (window.TransactionsUI) window.TransactionsUI.update();
        if (window.Badges) window.Badges.updateUI();
    },
    
    setupEventListeners: () => {
        // Toggle balance
        const toggleBtn = document.getElementById('toggleBalanceBtn');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => window.BalanceUI.toggleVisibility());
        }
        
        // Reset
        const resetBtn = document.getElementById('resetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => window.Actions.resetAll());
        }
        
        // Add expense
        const addExpenseBtn = document.getElementById('addExpenseBtn');
        if (addExpenseBtn) {
            addExpenseBtn.addEventListener('click', () => {
                const concept = document.getElementById('expenseConcept').value;
                const amount = parseFloat(document.getElementById('expenseAmount').value);
                if (window.Actions.addExpense(concept, amount)) {
                    document.getElementById('expenseConcept').value = '';
                    document.getElementById('expenseAmount').value = '';
                }
            });
        }
        
        // Add income
        const addIncomeBtn = document.getElementById('addIncomeBtn');
        if (addIncomeBtn) {
            addIncomeBtn.addEventListener('click', () => {
                const concept = document.getElementById('incomeConcept').value;
                const amount = parseFloat(document.getElementById('incomeAmount').value);
                if (window.Actions.addIncome(concept, amount)) {
                    document.getElementById('incomeConcept').value = '';
                    document.getElementById('incomeAmount').value = '';
                }
            });
        }
        
        // Clear transactions
        const clearBtn = document.getElementById('clearTransactionsBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => window.Actions.clearTransactions());
        }
        
        // Category chips
        document.querySelectorAll('.chip-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.cat;
                window.Actions.switchCategory(category);
            });
        });
        
        // Stats modal
        const statsBtn = document.getElementById('statsBtn');
        const modal = document.getElementById('statsModal');
        const closeModalBtn = document.getElementById('closeModalBtn');
        
        if (statsBtn && modal) {
            statsBtn.addEventListener('click', () => {
                const health = window.BudgetCalculations.getOverallHealth();
                const statsContent = document.getElementById('statsContent');
                if (statsContent) {
                    statsContent.innerHTML = `
                        <div class="flex justify-between py-2 border-b border-white/10">
                            <span>💰 Saldo:</span>
                            <span>$${window.Formatters.formatCurrency(window.AppState.balance)}</span>
                        </div>
                        <div class="flex justify-between py-2 border-b border-white/10">
                            <span>📈 Ingresos:</span>
                            <span class="text-teal-400">$${window.Formatters.formatCurrency(window.AppState.totalIncome)}</span>
                        </div>
                        <div class="flex justify-between py-2 border-b border-white/10">
                            <span>📉 Gastos:</span>
                            <span class="text-red-400">$${window.Formatters.formatCurrency(window.AppState.totalExpenses)}</span>
                        </div>
                        <div class="flex justify-between py-2 border-b border-white/10">
                            <span>⚡ Salud:</span>
                            <span>${Math.round(health)}%</span>
                        </div>
                        <div class="flex justify-between py-2">
                            <span>🏆 Badges:</span>
                            <span>${Object.values(window.AppState.badges).filter(Boolean).length}/${Object.keys(window.CONFIG.BADGE_RULES).length}</span>
                        </div>
                    `;
                }
                modal.classList.remove('hidden');
            });
        }
        
        if (closeModalBtn && modal) {
            closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));
        }
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.classList.add('hidden');
            });
        }
        
        // Enter key support
        const expenseAmount = document.getElementById('expenseAmount');
        if (expenseAmount) {
            expenseAmount.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    document.getElementById('addExpenseBtn').click();
                }
            });
        }
        
        const incomeAmount = document.getElementById('incomeAmount');
        if (incomeAmount) {
            incomeAmount.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    document.getElementById('addIncomeBtn').click();
                }
            });
        }
    }
};

// Inicializar aplicación
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Iniciando MeMo Finanzas...');
    
    window.Storage.load();
    window.BalanceUI.init();
    window.ProductiveUI.init();
    window.UI.refreshAll();
    window.UI.setupEventListeners();
    window.Badges.checkAll();
    window.Alerts.showToast(`✨ ${window.CONFIG.APP_NAME} lista`, 'success');
    
    console.log('✅ App inicializada');
});