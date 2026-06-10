window.DateUtils = {
    formatDate: (date) => {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1} ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
    },
    
    getCurrentISO: () => {
        return new Date().toISOString();
    }
};