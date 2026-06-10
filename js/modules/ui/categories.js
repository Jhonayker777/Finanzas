window.CategoriesUI = {
    update: () => {
        const category = window.AppState.currentCategory;
        const catConfig = window.CONFIG.CATEGORIES[category];
        
        if (!catConfig) return;
        
        const spent = window.AppState.categorySpent[category] || 0;
        const percentage = window.BudgetCalculations.getCategoryPercentage(category);
        const remaining = window.BudgetCalculations.getCategoryRemaining(category);
        
        const categoryNameEl = document.getElementById('categoryName');
        const categoryLimitEl = document.getElementById('categoryLimit');
        const categoryPercentEl = document.getElementById('categoryPercent');
        const categorySpentEl = document.getElementById('categorySpent');
        const categoryRemainingEl = document.getElementById('categoryRemaining');
        const categoryBarEl = document.getElementById('categoryBar');
        
        if (categoryNameEl) {
            categoryNameEl.innerHTML = `${catConfig.emoji} ${catConfig.name}`;
        }
        
        if (categoryLimitEl) {
            categoryLimitEl.textContent = window.Formatters.formatCurrency(catConfig.limit);
        }
        
        if (categoryPercentEl) {
            categoryPercentEl.textContent = window.Formatters.formatPercentage(percentage);
        }
        
        if (categorySpentEl) {
            categorySpentEl.textContent = `$${window.Formatters.formatCurrency(spent)}`;
        }
        
        if (categoryRemainingEl) {
            categoryRemainingEl.textContent = window.Formatters.formatCurrency(remaining);
        }
        
        if (categoryBarEl) {
            categoryBarEl.style.width = `${Math.min(percentage, 100)}%`;
            
            if (percentage >= 90) {
                categoryBarEl.className = 'h-full bg-red-500 transition-all duration-500';
            } else if (percentage >= 70) {
                categoryBarEl.className = 'h-full bg-yellow-500 transition-all duration-500';
            } else {
                categoryBarEl.className = 'h-full bg-teal-400 transition-all duration-500';
            }
        }
        
        if (percentage >= 70) {
            window.Alerts.showCategoryAlert(category, percentage);
        }
        
        // Actualizar chips activos
        document.querySelectorAll('.chip-btn').forEach(btn => {
            if (btn.dataset.cat === category) {
                btn.classList.add('chip-active');
            } else {
                btn.classList.remove('chip-active');
            }
        });
    }
};