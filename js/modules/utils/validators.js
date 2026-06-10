window.Validators = {
    isValidAmount: (amount) => {
        return !isNaN(amount) && amount > 0 && amount < 1000000000;
    },
    
    isValidString: (str) => {
        return str && typeof str === 'string' && str.trim().length > 0;
    },
    
    isValidCategory: (category) => {
        return window.CONFIG.CATEGORIES[category] !== undefined;
    }
};