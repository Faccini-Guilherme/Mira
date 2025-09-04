// Variáveis globais para armazenar o estado do jogo
window.currentPostIndex = 0;
window.exposureScoreForResult = 0;
window.gamePosts = [];
window.originalPostOrder = []; // Armazena a ordem original dos posts
window.currentLanguage = 'pt'; // Armazena o idioma atual

document.addEventListener('DOMContentLoaded', () => {
    // Elementos da interface da simulação
    const startBtn = document.getElementById("start-btn");
    const introScreen = document.getElementById('intro-screen');
    const gameScreen = document.getElementById('game-screen');
    const resultScreen = document.getElementById('result-screen');
    const restartBtn = document.getElementById('restart-btn');
    const protegeBtn = document.getElementById('protege-btn');
    const postaBtn = document.getElementById('posta-btn');
    const progressBar = document.getElementById('progress-bar');
    const protectionScoreEl = document.getElementById('protection-score');
    const cardContent = document.getElementById('card-content');
    const postType = document.getElementById('post-type');
    const postTime = document.getElementById('post-time');
    const readingOverlay = document.querySelector('.reading-overlay');
    const readingTimer = document.querySelector('.reading-timer');
    
    // Elementos de resultado
    const finalExposure = document.getElementById('final-exposure');
    const resultMessage = document.getElementById('result-message');
    const gaugeFill = document.getElementById('gauge-fill');
    const statusBadge = document.getElementById('status-badge');
    
    // Dados do jogo
    let currentIndex = 0;
    let exposureScore = 0;
    let exposureScoreForResult = 0;
    let gamePosts = [];
    let timerInterval;
    let firstPost = true;
    const MAX_POSTS = 12;
    
    // Obter o idioma atual
    const getCurrentLanguage = () => {
        return localStorage.getItem('preferredLanguage') || 'pt';
    };
    
    // Função para determinar se um post é inseguro
    function isUnsafePost(post) {
        // Lista de IDs de posts inseguros
        const unsafePostIds = [
            "vacation",
            "gym",
            "birthday",
            "house",
            "son",
            "boss"
        ];
        
        // Verificar se o ID do post está na lista de posts inseguros
        return unsafePostIds.includes(post.id);
    }
    
    // Iniciar o jogo
    startBtn.addEventListener('click', () => {
        introScreen.classList.remove('active');
        gameScreen.classList.add('active');
        startGame();
    });
    
    // Reiniciar o jogo
    restartBtn.addEventListener('click', () => {
        resultScreen.classList.remove('active');
        introScreen.classList.add('active');
        currentIndex = 0;
        exposureScore = 0;
        exposureScoreForResult = 0;
        firstPost = true;
        protectionScoreEl.textContent = null;
        window.currentPostIndex = 0;
        window.exposureScoreForResult = 0;
        window.originalPostOrder = [];
    });
    
    // Função para iniciar o jogo
    function startGame() {
        const lang = getCurrentLanguage();
        window.currentLanguage = lang;
        
        // Obter os posts no idioma atual
        const posts = getGamePosts(lang);
        
        // Se não houver uma ordem original definida, criar uma
        if (window.originalPostOrder.length === 0) {
            // Criar uma cópia dos índices originais
            const indices = Array.from({length: posts.length}, (_, i) => i);
            // Embaralhar os índices
            shuffleArray(indices);
            // Armazenar a ordem original
            window.originalPostOrder = indices;
        }
        
        // Aplicar a ordem original aos posts do idioma atual
        gamePosts = window.originalPostOrder.map(index => posts[index]);
        
        // Armazenar globalmente para acesso durante a mudança de idioma
        window.gamePosts = gamePosts;
        
        currentIndex = 0;
        exposureScore = 0;
        exposureScoreForResult = 0;
        firstPost = true;
        protectionScoreEl.textContent = null;
        updateProgressBar();
        showPost(currentIndex);
    }
    
    // Embaralhar array (Fisher-Yates)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // Mostrar post atual
    function showPost(index) {
        // Atualizar o índice global
        window.currentPostIndex = index;
        
        if (index >= gamePosts.length) {
            endGame();
            return;
        }
        
        const post = gamePosts[index];
        const lang = getCurrentLanguage();
        
        protegeBtn.disabled = true;
        postaBtn.disabled = true;
        
        if (firstPost) {
            readingOverlay.style.display = 'flex';
            readingTimer.textContent = '3';
        } else {
            readingOverlay.style.display = 'none';
        }
        
        // Atualizar o tipo de post com base no idioma
        let typeText = '';
        if (lang === 'en') {
            typeText = post.type.charAt(0).toUpperCase() + post.type.slice(1);
        } else {
            if (post.type === 'photo') typeText = 'Foto';
            else if (post.type === 'location') typeText = 'Localização';
            else if (post.type === 'text') typeText = 'Texto';
            else typeText = post.type.charAt(0).toUpperCase() + post.type.slice(1);
        }
        
        postType.innerHTML = `<i class="${post.icon}"></i> ${typeText}`;
        postTime.textContent = post.time;
        cardContent.innerHTML = post.content;
        
        if (post.text) {
            const textElement = document.createElement('div');
            textElement.className = 'post-text';
            textElement.innerHTML = `<p>${post.text}</p>`;
            cardContent.appendChild(textElement);
        }
        
        if (firstPost) {
            let timeLeft = 3;
            clearInterval(timerInterval);
            timerInterval = setInterval(() => {
                timeLeft--;
                readingTimer.textContent = timeLeft;
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    readingOverlay.style.display = 'none';
                    protegeBtn.disabled = false;
                    postaBtn.disabled = false;
                    firstPost = false;
                }
            }, 1000);
        } else {
            setTimeout(() => {
                protegeBtn.disabled = false;
                postaBtn.disabled = false;
            }, 100);
        }
    }
    
    // Atualizar barra de progresso
    function updateProgressBar() {
        const totalPosts = gamePosts.length;
        const progress = ((currentIndex + 1) / totalPosts) * 100;
        progressBar.style.width = `${progress}%`;
    }
    
    // Botão Protege
    protegeBtn.addEventListener('click', () => {
        handleChoice('protege');
    });
    
    // Botão Publica
    postaBtn.addEventListener('click', () => {
        handleChoice('posta');
    });
    
    // Processar escolha
    function handleChoice(choice) {
        protegeBtn.disabled = true;
        postaBtn.disabled = true;
        
        const post = gamePosts[currentIndex];
        const isUnsafe = isUnsafePost(post);
        let isSafeChoice = false;
        let explanation = post.explanation;
        
        if (choice === "protege") {
            isSafeChoice = true;
        } else {
            isSafeChoice = !isUnsafe;
        }
        
        if (isSafeChoice) {
            exposureScore++;
        } else if (isUnsafe && choice === "posta") {
            exposureScore++;
            if (currentIndex < MAX_POSTS) {
                exposureScoreForResult++;
            }
        }
        
        showFeedback(explanation, choice, isSafeChoice);
    }
    
    // Mostrar feedback
    function showFeedback(explanation, choice, isSafeChoice) {
        const feedback = document.createElement('div');
        const feedbackClass = isSafeChoice ? 'safe-feedback' : 'unsafe-feedback';
        const iconClass = choice === "protege" ? "fas fa-lock" : "fas fa-share-alt";
        const lang = getCurrentLanguage();
        
        let title = '';
        if (lang === 'en') {
            title = choice === "protege" ? "Protected!" : "Published!";
        } else {
            title = choice === "protege" ? "Protegido!" : "Publicado!";
        }
        
        feedback.className = `feedback ${feedbackClass}`;
        feedback.innerHTML = `
            <div class="feedback-content">
                <i class="${iconClass}"></i>
                <h3>${title}</h3>
                <p>${explanation}</p>
                <p class="continue-hint">${lang === 'en' ? 'Click to continue' : 'Clique para continuar'}</p>
            </div>
        `;
        
        document.querySelector('.card-container').appendChild(feedback);
        
        setTimeout(() => {
            feedback.classList.add('show');
            
            // Adicionar evento de clique para continuar
            feedback.addEventListener('click', function continueHandler() {
                feedback.classList.remove('show');
                setTimeout(() => {
                    feedback.remove();
                    currentIndex++;
                    updateProgressBar();
                    showPost(currentIndex);
                }, 300);
                
                // Remover o evento para não ser chamado novamente
                feedback.removeEventListener('click', continueHandler);
            });
        }, 50);
    }
    
    // Finalizar jogo
    function endGame() {
        gameScreen.classList.remove('active');
        resultScreen.classList.add('active');
        
        finalExposure.textContent = exposureScoreForResult;
        
        // Armazenar a pontuação globalmente
        window.exposureScoreForResult = exposureScoreForResult;
        
        let exposurePercentage = Math.round((exposureScoreForResult / MAX_POSTS) * 200);
        if (exposurePercentage === 0) {
            exposurePercentage = 10; // Barra seja visível quando 0
        }
        
        gaugeFill.style.width = `${exposurePercentage}%`;
        
        let color = 'var(--primary-color)'; // Cor padrão
        switch (exposureScoreForResult) {
            case 0: color = 'var(--primary-color)'; break; // Seguro
            case 1:
            case 2: color = 'var(--secondary-dark)'; break; // Moderado
            case 3:
            case 4: color = 'var(--secondary-color)'; break; // Exposto
            case 5:
            case 6: color = 'var(--ico)'; break; // Vulnerável
            default: color = 'var(--ico)'; break;
        }
        
        gaugeFill.style.backgroundColor = color;
        
        const lang = getCurrentLanguage();
        let message = "";
        let statusText = "";
        let statusClass = "";
        
        if (lang === 'en') {
            if (exposureScoreForResult >= 6) {
                message = "Vulnerable! Alert! Your level of digital exposure is very high. Urgently review your privacy settings.";
                statusText = "Vulnerable";
                statusClass = "status-vulnerable";
            } else if (exposureScoreForResult >= 3) {
                message = "Exposed! Be careful! You are exposing yourself more than you should.";
                statusText = "Exposed";
                statusClass = "status-exposed";
            } else if (exposureScoreForResult >= 1) {
                message = "Moderate! You have a good sense of digital security, but you can improve.";
                statusText = "Moderate";
                statusClass = "status-moderate";
            } else {
                message = "Safe! You have demonstrated excellent digital awareness.";
                statusText = "Safe";
                statusClass = "status-safe";
            }
        } else {
            if (exposureScoreForResult >= 6) {
                message = "Vulnerável! Alerta! O seu nível de exposição digital é muito alto. Reveja urgentemente as suas definições de privacidade.";
                statusText = "Vulnerável";
                statusClass = "status-vulnerable";
            } else if (exposureScoreForResult >= 3) {
                message = "Exposto! Cuidado! Está a expor-se mais do que deveria.";
                statusText = "Exposto";
                statusClass = "status-exposed";
            } else if (exposureScoreForResult >= 1) {
                message = "Moderado! Tem boa noção de segurança digital, mas pode melhorar.";
                statusText = "Moderado";
                statusClass = "status-moderate";
            } else {
                message = "Seguro! Demonstrou excelente consciência digital.";
                statusText = "Seguro";
                statusClass = "status-safe";
            }
        }
        
        resultMessage.textContent = message;
        statusBadge.textContent = statusText;
        statusBadge.className = `status-badge ${statusClass}`;
        
        setTimeout(() => {
            document.getElementById('exposure-meter').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }
    
    // Função para recarregar o conteúdo do jogo quando o idioma é alterado
    window.reloadGameContent = function(lang) {
        const gameScreen = document.getElementById('game-screen');
        const resultScreen = document.getElementById('result-screen');
        
        // Atualizar o idioma atual
        window.currentLanguage = lang;
        
        // Se estiver na tela de jogo
        if (gameScreen.classList.contains('active')) {
            // Obter os posts no novo idioma
            const newPosts = getGamePosts(lang);
            
            // Aplicar a ordem original aos novos posts
            const reorderedPosts = window.originalPostOrder.map(index => newPosts[index]);
            
            // Atualizar os posts globalmente e localmente
            window.gamePosts = reorderedPosts;
            gamePosts = reorderedPosts;
            
            // Recarregar o post atual
            const currentPostIndex = window.currentPostIndex || 0;
            showPost(currentPostIndex);
        }
        
        // Se estiver na tela de resultados
        if (resultScreen.classList.contains('active')) {
            // Atualizar as mensagens de resultado
            updateResultMessages(lang);
        }
    };
    
    // Função para atualizar as mensagens de resultado
    function updateResultMessages(lang) {
        // Obter as traduções
        const t = translations[lang];
        
        // Atualizar o título
        const resultTitle = document.querySelector('#result-screen h2');
        if (resultTitle && t['simulation-result-title']) {
            resultTitle.textContent = t['simulation-result-title'];
        }
        
        // Atualizar os labels do medidor
        const labels = document.querySelectorAll('.labels span');
        if (labels.length >= 4) {
            if (t['simulation-result-safe']) labels[0].textContent = t['simulation-result-safe'];
            if (t['simulation-result-moderate']) labels[1].textContent = t['simulation-result-moderate'];
            if (t['simulation-result-exposed']) labels[2].textContent = t['simulation-result-exposed'];
            if (t['simulation-result-vulnerable']) labels[3].textContent = t['simulation-result-vulnerable'];
        }
        
        // Atualizar o título do card de exposição
        const exposureTitle = document.querySelector('.score-card h3');
        if (exposureTitle && t['simulation-result-exposure']) {
            exposureTitle.textContent = t['simulation-result-exposure'];
        }
        
        // Atualizar o texto do card de exposição
        const exposureText = document.querySelector('.score-card p');
        if (exposureText && t['simulation-result-risky']) {
            exposureText.textContent = t['simulation-result-risky'];
        }
        
        // Atualizar o título das dicas
        const tipsTitle = document.querySelector('.tips h3');
        if (tipsTitle && t['simulation-tips-title']) {
            tipsTitle.textContent = t['simulation-tips-title'];
        }
        
        // Atualizar as dicas
        const tips = document.querySelectorAll('.tips li span');
        if (tips.length >= 4) {
            if (t['simulation-tip1']) tips[0].textContent = t['simulation-tip1'];
            if (t['simulation-tip2']) tips[1].textContent = t['simulation-tip2'];
            if (t['simulation-tip3']) tips[2].textContent = t['simulation-tip3'];
            if (t['simulation-tip4']) tips[3].textContent = t['simulation-tip4'];
        }
        
        // Atualizar o botão de reiniciar
        const restartBtn = document.getElementById('restart-btn');
        if (restartBtn && t['simulation-restart-btn']) {
            restartBtn.textContent = t['simulation-restart-btn'];
        }
        
        // Atualizar a mensagem de resultado com base na pontuação
        const resultMessage = document.getElementById('result-message');
        if (resultMessage && typeof window.exposureScoreForResult !== 'undefined') {
            let messageKey = 'simulation-result-message-safe';
            if (window.exposureScoreForResult >= 6) {
                messageKey = 'simulation-result-message-vulnerable';
            } else if (window.exposureScoreForResult >= 3) {
                messageKey = 'simulation-result-message-exposed';
            } else if (window.exposureScoreForResult >= 1) {
                messageKey = 'simulation-result-message-moderate';
            }
            if (t[messageKey]) {
                resultMessage.textContent = t[messageKey];
            }
        }
        
        // Atualizar o status badge
        const statusBadge = document.getElementById('status-badge');
        if (statusBadge && typeof window.exposureScoreForResult !== 'undefined') {
            let statusText = '';
            if (window.exposureScoreForResult >= 6) {
                statusText = t['simulation-result-vulnerable'] || 'Vulnerável';
            } else if (window.exposureScoreForResult >= 3) {
                statusText = t['simulation-result-exposed'] || 'Exposto';
            } else if (window.exposureScoreForResult >= 1) {
                statusText = t['simulation-result-moderate'] || 'Moderado';
            } else {
                statusText = t['simulation-result-safe'] || 'Seguro';
            }
            statusBadge.textContent = statusText;
        }
    }
});
