window.Alerts = {
    showToast: (message, type = 'info') => {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.className = `toast glass-card text-xs px-4 py-2 rounded-full mb-2`;
        toast.innerHTML = message;
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },
    
    showCategoryAlert: (category, percentage) => {
        const catConfig = window.CONFIG.CATEGORIES[category];
        if (percentage >= 70) {
            const message = `⚠️ Has usado el ${Math.round(percentage)}% del presupuesto de ${catConfig.name}`;
            window.Alerts.showToast(message, 'warning');
            
            const alertDiv = document.getElementById('categoryAlert');
            if (alertDiv) {
                alertDiv.innerHTML = `<span class="text-xs">${message}</span>`;
                alertDiv.className = 'mt-3 p-2 rounded-lg bg-red-500/20 text-red-300 text-xs';
            }
        } else {
            const alertDiv = document.getElementById('categoryAlert');
            if (alertDiv) alertDiv.className = 'mt-3 hidden';
        }
    }
};