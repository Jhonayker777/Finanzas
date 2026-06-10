window.Badges = {
    checkAll: () => {
        for (const [badgeId, rule] of Object.entries(window.CONFIG.BADGE_RULES)) {
            if (!window.AppState.badges[badgeId] && rule.condition(window.AppState)) {
                window.AppState.badges[badgeId] = true;
                window.Alerts.showToast(rule.message, 'success');
                window.Storage.save();
            }
        }
        window.Badges.updateUI();
    },
    
    updateUI: () => {
        document.querySelectorAll('.badge-item').forEach(el => {
            const badgeId = el.dataset.badge;
            if (window.AppState.badges[badgeId]) {
                el.classList.remove('opacity-40');
                el.classList.add('opacity-100');
            } else {
                el.classList.add('opacity-40');
                el.classList.remove('opacity-100');
            }
        });
    }
};