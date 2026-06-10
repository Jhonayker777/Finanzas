window.ProductiveUI = {
    init: () => {
        const projectBtn = document.getElementById('projectBtn');
        const visualizeBtn = document.getElementById('visualizeBtn');
        const messageDiv = document.getElementById('productiveMessage');
        
        if (projectBtn) {
            projectBtn.addEventListener('click', () => {
                if (messageDiv) {
                    messageDiv.textContent = window.FeedbackMessages.getProductiveMessage('project');
                    messageDiv.classList.add('text-teal-400');
                    setTimeout(() => {
                        messageDiv.textContent = '';
                        messageDiv.classList.remove('text-teal-400');
                    }, 3000);
                }
            });
        }
        
        if (visualizeBtn) {
            visualizeBtn.addEventListener('click', () => {
                if (messageDiv) {
                    messageDiv.textContent = window.FeedbackMessages.getProductiveMessage('visualize');
                    messageDiv.classList.add('text-purple-400');
                    setTimeout(() => {
                        messageDiv.textContent = '';
                        messageDiv.classList.remove('text-purple-400');
                    }, 4000);
                }
            });
        }
    }
};