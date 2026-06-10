window.EnergyMeterUI = {
    update: () => {
        const health = window.BudgetCalculations.getOverallHealth();
        
        const energyValueEl = document.getElementById('energyValue');
        const energyCircleEl = document.getElementById('energyCircle');
        const energyMessageEl = document.getElementById('energyMessage');
        
        if (energyValueEl) {
            energyValueEl.textContent = `${Math.round(health)}%`;
        }
        
        if (energyCircleEl) {
            const circumference = 351.85;
            const offset = circumference - (health / 100) * circumference;
            energyCircleEl.style.strokeDashoffset = offset;
            energyCircleEl.setAttribute('stroke', window.BudgetCalculations.getEnergyColor());
        }
        
        if (energyMessageEl) {
            energyMessageEl.innerHTML = window.BudgetCalculations.getEnergyMessage();
        }
    }
};