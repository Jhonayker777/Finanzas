// ==================== CONFIGURACIÓN ====================
// Porcentajes de los límites por categoría (basados en el saldo total)
const CATEGORY_PERCENTAGES = {
    family: { name: 'Familiar', percentage: 10, emoji: '🏠', color: '#4edea3' },
    leisure: { name: 'Ocio', percentage: 5, emoji: '🎮', color: '#ffb95f' },
    savings: { name: 'Ahorro', percentage: 20, emoji: '💰', color: '#6ffbbe' },
    investments: { name: 'Inversiones', percentage: 30, emoji: '📈', color: '#bec6e0' }
};

// Umbrales de alerta para categorías
const ALERT_THRESHOLDS = {
    warning: 70,
    danger: 90,
    critical: 100
};

// ==================== FRASES MOTIVACIONALES ====================
const MOTIVATIONAL_PHRASES = {
    // Frases para cuando se ahorra o se tiene buen comportamiento
    saving: [
        "💪 ¡Cada peso que ahorras hoy es un peso que trabaja para tu futuro!",
        "🌟 Pequeños ahorros de hoy se convierten en grandes riquezas mañana.",
        "🎯 El mejor momento para ahorrar fue ayer. El segundo mejor es hoy.",
        "🏆 ¡Eres un ejemplo! Tus hábitos financieros están construyendo libertad.",
        "📈 El ahorro no es lo que sobra, es lo que priorizas.",
        "💡 No se trata de cuánto ganas, sino de cuánto conservas.",
        "🌅 La disciplina financiera de hoy es la tranquilidad del mañana.",
        "🎉 ¡Sigue así! Estás construyendo un futuro sólido."
    ],
    
    // Frases para cuando se hace un gasto
    expense: [
        "🤔 ¿Realmente necesitas esto? Reflexiona antes de gastar.",
        "⏰ Intenta esperar 24h antes de comprar. Muchos deseos desaparecen.",
        "📊 Cada gasto cuenta. Asegúrate de que valga la pena.",
        "💭 ¿Este gasto te acerca o aleja de tus metas?",
        "🎯 Gasta en experiencias, no en cosas que no necesitas.",
        "🔍 Compara precios. Un pequeño esfuerzo puede ahorrarte mucho."
    ],
    
    // Frases para cuando se recibe un ingreso
    income: [
        "💰 ¡Bien hecho! Registrar tus ingresos es el primer paso.",
        "📈 Recuerda ahorrar al menos el 20% de cada ingreso.",
        "🏦 El dinero que no gastas es libertad que ganas.",
        "🎯 Cada ingreso es una oportunidad para acercarte a tus metas.",
        "💡 Invierte en tu educación financiera, es la mejor inversión."
    ],
    
    // Frases diarias aleatorias (se muestran al iniciar)
    daily: [
        "💪 ",
        "🌟 ",
        "🎯 ",
        "🏆 ",
        "📈 ",
        "💡 ",
        "🌅 ",
        "🎉 "
    ]
};

// Banco de frases diarias completas
const DAILY_PHRASES = [
    "💪 El mejor activo que tienes eres tú mismo. Invierte en tu educación financiera.",
    "🌟 Un presupuesto no limita tu libertad, la construye.",
    "🎯 No ahorres lo que te sobra después de gastar, gasta lo que te sobra después de ahorrar.",
    "🏆 La riqueza no se mide por cuánto ganas, sino por cuánto conservas.",
    "📈 El interés compuesto es la octava maravilla del mundo. ¡Aprovecha el tiempo!",
    "💡 El dinero no es el objetivo, es el medio para alcanzar tus sueños.",
    "🌅 La libertad financiera no es un destino, es un camino de buenos hábitos.",
    "🎉 Cada día es una oportunidad para tomar mejores decisiones financieras.",
    "🔍 Revisa tus gastos hormiga. Un café diario suma $180.000 al año.",
    "🏦 Un fondo de emergencia de 3-6 meses de gastos te da tranquilidad.",
    "📊 La paciencia y la disciplina son las claves del éxito financiero.",
    "💪 El 80% del éxito financiero es comportamiento, no conocimiento."
];

// Función para obtener una frase aleatoria
const getRandomPhrase = (category) => {
    const phrases = MOTIVATIONAL_PHRASES[category] || MOTIVATIONAL_PHRASES.saving;
    return phrases[Math.floor(Math.random() * phrases.length)];
};

// Función para obtener una frase diaria
const getDailyPhrase = () => {
    return DAILY_PHRASES[Math.floor(Math.random() * DAILY_PHRASES.length)];
};

// ==================== ESTADO ====================
let state = {
    balance: 0,
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
    badges: { saver: false, consistent: false },
    lastDailyPhraseDate: null
};

// ==================== UTILIDADES ====================
const formatCurrency = (amount) => new Intl.NumberFormat('es-CO').format(amount);

const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1} ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
};

const showToast = (msg, type = 'info', duration = 4000) => {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    let bgColor = '';
    if (type === 'error') bgColor = 'bg-red-500/80';
    else if (type === 'warning') bgColor = 'bg-yellow-500/80';
    else if (type === 'success') bgColor = 'bg-teal-500/80';
    else bgColor = 'bg-gray-700/80';
    
    toast.className = `toast ${bgColor} text-xs px-4 py-2 rounded-full mb-2`;
    toast.innerHTML = msg;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, duration);
};

// Mostrar frase motivacional en el panel lateral
const updateMotivationalQuote = () => {
    const quoteElement = document.getElementById('motivationalQuote');
    if (quoteElement) {
        quoteElement.textContent = getDailyPhrase();
    }
};

// Mostrar frase según acción del usuario
const showMotivationalMessage = (action, extraInfo = '') => {
    let message = '';
    if (action === 'expense') {
        message = getRandomPhrase('expense');
        if (extraInfo) message += ` ${extraInfo}`;
        showToast(message, 'info', 5000);
    } else if (action === 'income') {
        message = getRandomPhrase('income');
        showToast(message, 'success', 5000);
    } else if (action === 'saving_good') {
        message = getRandomPhrase('saving');
        showToast(message, 'success', 5000);
    }
};

// Verificar si es un nuevo día para mostrar nueva frase
const checkDailyPhrase = () => {
    const today = new Date().toDateString();
    const lastDate = state.lastDailyPhraseDate;
    
    if (lastDate !== today) {
        state.lastDailyPhraseDate = today;
        saveToStorage();
        
        // Mostrar frase del día
        setTimeout(() => {
            const dailyPhrase = getDailyPhrase();
            showToast(`✨ FRASE DEL DÍA ✨\n${dailyPhrase}`, 'info', 8000);
        }, 1500);
    }
};

// ==================== CÁLCULOS DINÁMICOS ====================
const getCategoryLimit = (category) => {
    const totalMoney = state.balance + state.totalExpenses;
    const catConfig = CATEGORY_PERCENTAGES[category];
    return (catConfig.percentage / 100) * totalMoney;
};

const getCategoryPercentage = (category) => {
    const spent = state.categorySpent[category] || 0;
    const limit = getCategoryLimit(category);
    if (limit === 0) return 0;
    return (spent / limit) * 100;
};

const getCategoryRemaining = (category) => {
    const spent = state.categorySpent[category] || 0;
    const limit = getCategoryLimit(category);
    return Math.max(0, limit - spent);
};

const getCategoryStatus = (category) => {
    const percentage = getCategoryPercentage(category);
    if (percentage >= ALERT_THRESHOLDS.critical) return 'critical';
    if (percentage >= ALERT_THRESHOLDS.danger) return 'danger';
    if (percentage >= ALERT_THRESHOLDS.warning) return 'warning';
    return 'good';
};

const getRemainingBalancePercentage = () => {
    const totalMoney = state.balance + state.totalExpenses;
    if (totalMoney === 0) return 100;
    const percentage = (state.balance / totalMoney) * 100;
    return Math.max(0, Math.min(100, percentage));
};

const getTotalMoneyEntered = () => {
    return state.balance + state.totalExpenses;
};

// ==================== VALIDACIÓN DE GASTO ====================
const canAddExpense = (category, amount) => {
    if (amount > state.balance) {
        showToast(`❌ Saldo insuficiente. Solo tienes $${formatCurrency(state.balance)}`, 'error');
        return false;
    }
    
    const currentSpent = state.categorySpent[category] || 0;
    const limit = getCategoryLimit(category);
    const remainingInCategory = limit - currentSpent;
    
    if (amount > remainingInCategory) {
        const catName = CATEGORY_PERCENTAGES[category].name;
        const catPercent = CATEGORY_PERCENTAGES[category].percentage;
        showToast(`❌ Excedes el límite de ${catName} (${catPercent}% de tu saldo). Solo te quedan $${formatCurrency(remainingInCategory)}`, 'error');
        return false;
    }
    
    return true;
};

// ==================== STORAGE ====================
const saveToStorage = () => {
    localStorage.setItem('memo_state', JSON.stringify({
        balance: state.balance,
        totalIncome: state.totalIncome,
        totalExpenses: state.totalExpenses,
        transactions: state.transactions,
        categorySpent: state.categorySpent,
        badges: state.badges,
        lastDailyPhraseDate: state.lastDailyPhraseDate
    }));
};

const loadFromStorage = () => {
    const saved = localStorage.getItem('memo_state');
    if (saved) {
        try {
            const p = JSON.parse(saved);
            state.balance = p.balance ?? 0;
            state.totalIncome = p.totalIncome ?? 0;
            state.totalExpenses = p.totalExpenses ?? 0;
            state.transactions = p.transactions ?? [];
            state.categorySpent = p.categorySpent ?? { family: 0, leisure: 0, savings: 0, investments: 0 };
            state.badges = p.badges ?? { saver: false, consistent: false };
            state.lastDailyPhraseDate = p.lastDailyPhraseDate ?? null;
        } catch (e) { }
    }
};

// ==================== ACTUALIZAR UI ====================
const updateBalanceUI = () => {
    const balanceEl = document.getElementById('balanceAmount');
    if (balanceEl) {
        balanceEl.textContent = formatCurrency(state.balance);
    }
    document.getElementById('totalIncome').textContent = formatCurrency(state.totalIncome);
    document.getElementById('totalExpenses').textContent = formatCurrency(state.totalExpenses);
};

const updateCategoriesUI = () => {
    const category = state.currentCategory;
    const catConfig = CATEGORY_PERCENTAGES[category];
    const limit = getCategoryLimit(category);
    const spent = state.categorySpent[category] || 0;
    const pct = getCategoryPercentage(category);
    const remaining = getCategoryRemaining(category);
    const status = getCategoryStatus(category);

    document.getElementById('categoryName').innerHTML = `${catConfig.emoji} ${catConfig.name}`;
    document.getElementById('categoryLimit').textContent = formatCurrency(limit);
    document.getElementById('categoryPercent').textContent = `${Math.round(pct)}%`;
    document.getElementById('categorySpent').textContent = `$${formatCurrency(spent)}`;
    document.getElementById('categoryRemaining').textContent = formatCurrency(remaining);

    const bar = document.getElementById('categoryBar');
    bar.style.width = `${Math.min(pct, 100)}%`;
    
    if (status === 'critical') {
        bar.className = 'h-full bg-red-500 transition-all duration-500';
    } else if (status === 'danger') {
        bar.className = 'h-full bg-orange-500 transition-all duration-500';
    } else if (status === 'warning') {
        bar.className = 'h-full bg-yellow-500 transition-all duration-500';
    } else {
        bar.className = 'h-full bg-teal-400 transition-all duration-500';
    }

    const alertDiv = document.getElementById('categoryAlert');
    if (status === 'critical') {
        alertDiv.innerHTML = `<span class="text-xs">❌ ¡LÍMITE SUPERADO! Has excedido el presupuesto de ${catConfig.name} (${catConfig.percentage}% de tu saldo).</span>`;
        alertDiv.className = 'mt-3 p-2 rounded-lg bg-red-500/30 text-red-300 text-xs';
    } else if (status === 'danger') {
        alertDiv.innerHTML = `<span class="text-xs">⚠️ ¡CUIDADO! Has usado el ${Math.round(pct)}% del presupuesto de ${catConfig.name} (${catConfig.percentage}% de tu saldo).</span>`;
        alertDiv.className = 'mt-3 p-2 rounded-lg bg-orange-500/30 text-orange-300 text-xs';
    } else if (status === 'warning') {
        alertDiv.innerHTML = `<span class="text-xs">📊 Atención: Has usado el ${Math.round(pct)}% del presupuesto de ${catConfig.name}.</span>`;
        alertDiv.className = 'mt-3 p-2 rounded-lg bg-yellow-500/30 text-yellow-300 text-xs';
    } else {
        alertDiv.className = 'mt-3 hidden';
    }

    document.querySelectorAll('.chip-btn').forEach(btn => {
        if (btn.dataset.cat === category) btn.classList.add('chip-active');
        else btn.classList.remove('chip-active');
    });
};

const updateEnergyUI = () => {
    const remainingPercent = getRemainingBalancePercentage();
    const totalMoney = getTotalMoneyEntered();
    const spentPercent = totalMoney === 0 ? 0 : ((totalMoney - state.balance) / totalMoney) * 100;
    
    const energyValue = document.getElementById('energyValue');
    const energyCircle = document.getElementById('energyCircle');
    const energyMessage = document.getElementById('energyMessage');

    if (energyValue) energyValue.textContent = `${Math.round(remainingPercent)}%`;

    if (energyCircle) {
        const circumference = 351.85;
        const offset = circumference - (remainingPercent / 100) * circumference;
        energyCircle.style.strokeDashoffset = offset;

        if (remainingPercent >= 70) {
            energyCircle.setAttribute('stroke', '#4edea3');
        } else if (remainingPercent >= 40) {
            energyCircle.setAttribute('stroke', '#ffb95f');
        } else if (remainingPercent >= 10) {
            energyCircle.setAttribute('stroke', '#ff7b4a');
        } else {
            energyCircle.setAttribute('stroke', '#ffb4ab');
        }
    }

    if (energyMessage) {
        if (totalMoney === 0) {
            energyMessage.innerHTML = '💰 Ingresa tu primer dinero para comenzar';
        } else if (remainingPercent >= 70) {
            energyMessage.innerHTML = `💪 Excelente! Te queda ${Math.round(remainingPercent)}% de tu dinero`;
        } else if (remainingPercent >= 40) {
            energyMessage.innerHTML = `⚠️ Has gastado el ${Math.round(spentPercent)}% de tu dinero. Revisa tus gastos.`;
        } else if (remainingPercent >= 10) {
            energyMessage.innerHTML = `🔴 ¡Alerta! Solo te queda ${Math.round(remainingPercent)}% de tu dinero.`;
        } else {
            energyMessage.innerHTML = `❌ ¡Crítico! Has gastado casi todo tu dinero.`;
        }
    }
};

const updateTransactionsUI = () => {
    const container = document.getElementById('transactionsList');
    if (state.transactions.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-500 text-sm py-4">No hay transacciones aún. ¡Ingresa tu primer dinero!</p>';
        return;
    }
    container.innerHTML = state.transactions.slice(0, 15).map(t => {
        const isExpense = t.type === 'expense';
        const catConfig = CATEGORY_PERCENTAGES[t.category];
        return `
            <div class="glass-card p-3 rounded-lg flex justify-between items-center">
                <div>
                    <p class="text-sm font-medium">${t.concept}</p>
                    <p class="text-xs text-gray-400">${formatDate(t.date)} ${catConfig ? `• ${catConfig.emoji} ${catConfig.name} (${catConfig.percentage}% de saldo)` : ''}</p>
                </div>
                <span class="${isExpense ? 'text-red-400' : 'text-teal-400'} font-bold">
                    ${isExpense ? '-' : '+'}$${formatCurrency(t.amount)}
                </span>
            </div>
        `;
    }).join('');
};

const updateBadgesUI = () => {
    document.querySelectorAll('.badge-item').forEach(el => {
        const badgeId = el.dataset.badge;
        if (state.badges[badgeId]) {
            el.classList.remove('opacity-40');
            el.classList.add('opacity-100');
        } else {
            el.classList.add('opacity-40');
            el.classList.remove('opacity-100');
        }
    });
};

const checkBadges = () => {
    let badgeUnlocked = false;
    
    if (!state.badges.saver && state.totalIncome > 0 && state.totalExpenses < state.totalIncome * 0.5) {
        state.badges.saver = true;
        showToast('🎉 ¡Desbloqueaste el badge AHORRADOR!', 'success');
        showMotivationalMessage('saving_good');
        badgeUnlocked = true;
        saveToStorage();
    }
    if (!state.badges.consistent && state.transactions.length >= 10) {
        state.badges.consistent = true;
        showToast('🎉 ¡Desbloqueaste el badge CONSTANTE!', 'success');
        showMotivationalMessage('saving_good');
        badgeUnlocked = true;
        saveToStorage();
    }
    updateBadgesUI();
};

const refreshAllUI = () => {
    updateBalanceUI();
    updateCategoriesUI();
    updateEnergyUI();
    updateTransactionsUI();
};

// ==================== ACCIONES ====================
const addExpense = () => {
    const concept = document.getElementById('expenseConcept').value;
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const category = state.currentCategory;
    const catName = CATEGORY_PERCENTAGES[category].name;
    const catPercent = CATEGORY_PERCENTAGES[category].percentage;
    
    if (state.balance === 0) {
        showToast('❌ No tienes saldo. Primero ingresa dinero usando "Registrar Ingreso"', 'error');
        return;
    }
    
    if (!concept || isNaN(amount) || amount <= 0) { 
        showToast('❌ Concepto y monto válido requerido', 'error'); 
        return; 
    }
    
    if (!canAddExpense(category, amount)) return;
    
    state.transactions.unshift({
        id: Date.now(),
        type: 'expense',
        category: category,
        concept,
        amount,
        date: new Date().toISOString()
    });
    state.totalExpenses += amount;
    state.balance -= amount;
    state.categorySpent[category] += amount;

    saveToStorage();
    refreshAllUI();
    checkBadges();
    
    document.getElementById('expenseConcept').value = '';
    document.getElementById('expenseAmount').value = '';
    
    const remainingInCategory = getCategoryRemaining(category);
    const limit = getCategoryLimit(category);
    const pct = getCategoryPercentage(category);
    showToast(`✅ Gasto registrado en ${catName}: $${formatCurrency(amount)}. Te quedan $${formatCurrency(remainingInCategory)} de $${formatCurrency(limit)} (${Math.round(pct)}% de ${catPercent}% del saldo)`, 'success');
    
    // Mostrar frase motivacional después de un gasto
    setTimeout(() => {
        showMotivationalMessage('expense');
    }, 500);
    
    const status = getCategoryStatus(category);
    if (status === 'danger') {
        showToast(`⚠️ ¡Cuidado! Solo te queda $${formatCurrency(remainingInCategory)} para ${catName}`, 'warning');
    } else if (status === 'critical') {
        showToast(`❌ ¡Has superado el límite de ${catName} (${catPercent}% de tu saldo)!`, 'error');
    }
    
    const remainingPercent = (state.balance / (state.balance + state.totalExpenses)) * 100;
    if (remainingPercent < 30 && remainingPercent >= 10) {
        showToast(`⚠️ Solo te queda ${Math.round(remainingPercent)}% del dinero que has ingresado. ¡Cuidado!`, 'warning');
    } else if (remainingPercent < 10 && remainingPercent > 0) {
        showToast(`🔴 ¡ALERTA! Has gastado más del 90% del dinero que ingresaste.`, 'error');
    }
};

const addIncome = () => {
    const concept = document.getElementById('incomeConcept').value;
    const amount = parseFloat(document.getElementById('incomeAmount').value);
    if (!concept || isNaN(amount) || amount <= 0) { 
        showToast('❌ Concepto y monto válido requerido', 'error'); 
        return; 
    }

    state.transactions.unshift({
        id: Date.now(),
        type: 'income',
        category: null,
        concept,
        amount,
        date: new Date().toISOString()
    });
    state.totalIncome += amount;
    state.balance += amount;

    saveToStorage();
    refreshAllUI();
    checkBadges();
    document.getElementById('incomeConcept').value = '';
    document.getElementById('incomeAmount').value = '';
    
    const totalMoney = getTotalMoneyEntered();
    showToast(`✅ Ingreso registrado: $${formatCurrency(amount)}. Total de dinero: $${formatCurrency(totalMoney)}`, 'success');
    
    // Mostrar frase motivacional después de un ingreso
    setTimeout(() => {
        showMotivationalMessage('income');
    }, 500);
    
    // Mostrar resumen de límites
    setTimeout(() => {
        let limitsMsg = '📊 Límites actuales: ';
        for (const [key, cat] of Object.entries(CATEGORY_PERCENTAGES)) {
            const limit = getCategoryLimit(key);
            limitsMsg += `${cat.emoji} ${cat.name}: $${formatCurrency(limit)} (${cat.percentage}%) `;
        }
        showToast(limitsMsg, 'info', 6000);
    }, 800);
};

const clearTransactions = () => {
    if (confirm('¿Eliminar todas las transacciones? Se reiniciarán todos los contadores.')) {
        state.transactions = [];
        state.totalExpenses = 0;
        state.totalIncome = 0;
        state.balance = 0;
        state.categorySpent = { family: 0, leisure: 0, savings: 0, investments: 0 };
        state.badges = { saver: false, consistent: false };
        saveToStorage();
        refreshAllUI();
        showToast('🗑️ Historial limpiado. El saldo vuelve a $0.', 'info');
    }
};

const resetAll = () => {
    if (confirm('¿Resetear todos los datos? Se perderán todos los gastos, ingresos y progreso.')) {
        localStorage.removeItem('memo_state');
        state = {
            balance: 0,
            totalIncome: 0,
            totalExpenses: 0,
            transactions: [],
            categorySpent: { family: 0, leisure: 0, savings: 0, investments: 0 },
            currentCategory: 'family',
            badges: { saver: false, consistent: false },
            lastDailyPhraseDate: null
        };
        refreshAllUI();
        showToast('🔄 Datos reiniciados. Saldo: $0', 'info');
    }
};

const switchCategory = (category) => {
    if (CATEGORY_PERCENTAGES[category]) {
        state.currentCategory = category;
        saveToStorage();
        updateCategoriesUI();
        const limit = getCategoryLimit(category);
        const remaining = getCategoryRemaining(category);
        const catPercent = CATEGORY_PERCENTAGES[category].percentage;
        showToast(`📂 Cambiado a: ${CATEGORY_PERCENTAGES[category].name} - Límite: $${formatCurrency(limit)} (${catPercent}% del saldo). Te quedan $${formatCurrency(remaining)}`, 'info');
    }
};

// ==================== INICIALIZAR EVENTOS ====================
document.getElementById('addExpenseBtn')?.addEventListener('click', addExpense);
document.getElementById('addIncomeBtn')?.addEventListener('click', addIncome);
document.getElementById('clearTransactionsBtn')?.addEventListener('click', clearTransactions);
document.getElementById('resetBtn')?.addEventListener('click', resetAll);

document.querySelectorAll('.chip-btn').forEach(btn => {
    btn.addEventListener('click', () => switchCategory(btn.dataset.cat));
});

// Stats modal
const modal = document.getElementById('statsModal');
document.getElementById('statsBtn')?.addEventListener('click', () => {
    const remainingPercent = getRemainingBalancePercentage();
    const totalMoney = getTotalMoneyEntered();
    const spentAmount = totalMoney - state.balance;
    const spentPercent = totalMoney === 0 ? 0 : (spentAmount / totalMoney) * 100;
    
    let categoryStats = '';
    for (const [key, cat] of Object.entries(CATEGORY_PERCENTAGES)) {
        const spent = state.categorySpent[key] || 0;
        const limit = getCategoryLimit(key);
        const pct = limit === 0 ? 0 : (spent / limit) * 100;
        const status = getCategoryStatus(key);
        let statusIcon = '🟢';
        if (status === 'warning') statusIcon = '🟡';
        else if (status === 'danger') statusIcon = '🟠';
        else if (status === 'critical') statusIcon = '🔴';
        
        categoryStats += `
            <div class="flex justify-between py-1 border-b border-white/10 text-xs">
                <span>${statusIcon} ${cat.emoji} ${cat.name} (${cat.percentage}%):</span>
                <span>$${formatCurrency(spent)} / $${formatCurrency(limit)} (${Math.round(pct)}%)</span>
            </div>
        `;
    }
    
    document.getElementById('statsContent').innerHTML = `
        <div class="space-y-2">
            <div class="flex justify-between py-2 border-b border-white/10">
                <span>💰 Saldo actual:</span>
                <span>$${formatCurrency(state.balance)}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-white/10">
                <span>📊 Total ingresado:</span>
                <span>$${formatCurrency(totalMoney)}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-white/10">
                <span>📉 Total gastado:</span>
                <span class="text-red-400">$${formatCurrency(spentAmount)}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-white/10">
                <span>📈 Ingresos totales:</span>
                <span class="text-teal-400">$${formatCurrency(state.totalIncome)}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-white/10">
                <span>⚡ Saldo restante:</span>
                <span>${Math.round(remainingPercent)}%</span>
            </div>
            <div class="flex justify-between py-2 border-b border-white/10">
                <span>💸 Proporción gastada:</span>
                <span>${Math.round(spentPercent)}%</span>
            </div>
            <div class="pt-2">
                <div class="text-xs font-bold text-teal-400 mb-2">📋 LÍMITES DINÁMICOS (% del total ingresado)</div>
                ${categoryStats}
            </div>
            <div class="flex justify-between py-2 pt-2">
                <span>🏆 Badges:</span>
                <span>${Object.values(state.badges).filter(Boolean).length}/2</span>
            </div>
            <div class="pt-2 mt-2 border-t border-white/20">
                <div class="text-xs text-center text-gray-400 italic">✨ "${getDailyPhrase()}"</div>
            </div>
        </div>
    `;
    modal.classList.remove('hidden');
});

document.getElementById('closeModalBtn')?.addEventListener('click', () => modal.classList.add('hidden'));
modal?.addEventListener('click', (e) => { if (e.target === modal) modal.classList.add('hidden'); });

// Productive buttons
document.getElementById('projectBtn')?.addEventListener('click', () => {
    const msg = document.getElementById('productiveMessage');
    msg.textContent = '🚀 Recuerda: Los límites son Familiar 10%, Ocio 5%, Ahorro 20%, Inversiones 30% de tu saldo total';
    msg.classList.add('text-teal-400');
    setTimeout(() => { msg.textContent = ''; }, 3000);
});

document.getElementById('visualizeBtn')?.addEventListener('click', () => {
    const remainingPercent = getRemainingBalancePercentage();
    let recommendation = '';
    for (const [key, cat] of Object.entries(CATEGORY_PERCENTAGES)) {
        const pct = getCategoryPercentage(key);
        if (pct > 80) {
            recommendation = `⚠️ Tu categoría ${cat.name} está al ${Math.round(pct)}% del límite (${cat.percentage}% de tu saldo). ${getRandomPhrase('expense')}`;
            break;
        } else if (pct > 60) {
            recommendation = `📊 Tu categoría ${cat.name} está al ${Math.round(pct)}% del límite. ${getRandomPhrase('expense')}`;
        }
    }
    const msg = document.getElementById('productiveMessage');
    msg.textContent = recommendation || `📊 Te queda ${Math.round(remainingPercent)}% del dinero que ingresaste. ${getRandomPhrase('saving')}`;
    msg.classList.add('text-purple-400');
    setTimeout(() => { msg.textContent = ''; }, 5000);
});

// ==================== INICIALIZAR ====================
loadFromStorage();
refreshAllUI();
checkBadges();
updateMotivationalQuote();
checkDailyPhrase();

if (state.balance === 0 && state.totalExpenses === 0) {
    showToast('✨ Bienvenido a MeMo Finanzas. Comienza ingresando tu dinero en "Registrar Ingreso"', 'success');
    setTimeout(() => {
        showToast(`💡 Tip financiero: ${getDailyPhrase()}`, 'info', 8000);
    }, 2000);
} else {
    const totalMoney = getTotalMoneyEntered();
    showToast(`✨ MeMo Finanzas lista. Total ingresado: $${formatCurrency(totalMoney)}`, 'success');
    setTimeout(() => {
        showToast(`💡 ${getDailyPhrase()}`, 'info', 8000);
    }, 2000);
}

console.log('📊 Configuración de límites (% del total ingresado):');
for (const [key, cat] of Object.entries(CATEGORY_PERCENTAGES)) {
    console.log(`  ${cat.emoji} ${cat.name}: ${cat.percentage}% del saldo total`);
}