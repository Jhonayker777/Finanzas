window.TransactionsUI = {
    update: () => {
        const container = document.getElementById('transactionsList');
        if (!container) return;
        
        if (window.AppState.transactions.length === 0) {
            container.innerHTML = '<p class="text-center text-gray-500 text-sm py-4">No hay transacciones aún</p>';
            return;
        }
        
        container.innerHTML = window.AppState.transactions.slice(0, 15).map(t => {
            const isExpense = t.type === 'expense';
            const cfg = window.CONFIG.CATEGORIES[t.category];
            return `
                <div class="glass-card p-3 rounded-lg flex justify-between items-center">
                    <div>
                        <p class="text-sm font-medium">${t.concept}</p>
                        <p class="text-xs text-gray-400">
                            ${window.DateUtils.formatDate(t.date)}
                            ${cfg ? `• ${cfg.emoji} ${cfg.name}` : ''}
                        </p>
                    </div>
                    <span class="${isExpense ? 'text-red-400' : 'text-teal-400'} font-bold">
                        ${isExpense ? '-' : '+'}$${window.Formatters.formatCurrency(t.amount)}
                    </span>
                </div>
            `;
        }).join('');
    }
};