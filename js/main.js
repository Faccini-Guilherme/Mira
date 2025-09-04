// Função para verificar se o jogo está ativo
function isGameActive() {
    const gameScreen = document.getElementById('game-screen');
    const resultScreen = document.getElementById('result-screen');
    return gameScreen.classList.contains('active') || resultScreen.classList.contains('active');
}

// Função para alterar o idioma
function changeLanguage(lang) {
    // Salvar o idioma atual
    const previousLang = localStorage.getItem('preferredLanguage') || 'pt';
    
    // Atualizar todos os elementos com o atributo data-translate
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });
    
    // Atualizar o título da página
    if (lang === 'pt') {
        document.title = 'MIRA - Plataforma de Cibersegurança';
    } else {
        document.title = 'MIRA - Cybersecurity Platform';
    }
    
    // Alterar a imagem com base no idioma
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        if (lang === 'en') {
            heroImage.setAttribute('src', 'assets/mira_en.png');
        } else {
            heroImage.setAttribute('src', 'assets/mira_pt.png');
        }
    }
    
    // Atualizar o atributo lang do HTML
    document.documentElement.lang = lang;
    
    // Salvar a preferência de idioma
    localStorage.setItem('preferredLanguage', lang);
    
    // Se o jogo estiver ativo e o idioma mudou, recarregar o conteúdo
    if (isGameActive() && previousLang !== lang) {
        reloadGameContent(lang);
    }
}

// Função para recarregar o conteúdo do jogo
function reloadGameContent(lang) {
    const gameScreen = document.getElementById('game-screen');
    const resultScreen = document.getElementById('result-screen');
    
    // Se estiver na tela de jogo
    if (gameScreen.classList.contains('active')) {
        // Recarregar o post atual
        const currentPostIndex = window.currentPostIndex || 0;
        showPost(currentPostIndex, lang);
    }
    
    // Se estiver na tela de resultados
    if (resultScreen.classList.contains('active')) {
        // Atualizar as mensagens de resultado
        updateResultMessages(lang);
    }
}

// Função para atualizar as mensagens de resultado
function updateResultMessages(lang) {
    // Atualizar o título
    const resultTitle = document.querySelector('#result-screen h2');
    if (resultTitle) {
        resultTitle.textContent = translations[lang]['simulation-result-title'];
    }
    
    // Atualizar os labels do medidor
    const labels = document.querySelectorAll('.labels span');
    if (labels.length >= 4) {
        labels[0].textContent = translations[lang]['simulation-result-safe'];
        labels[1].textContent = translations[lang]['simulation-result-moderate'];
        labels[2].textContent = translations[lang]['simulation-result-exposed'];
        labels[3].textContent = translations[lang]['simulation-result-vulnerable'];
    }
    
    // Atualizar o título do card de exposição
    const exposureTitle = document.querySelector('.score-card h3');
    if (exposureTitle) {
        exposureTitle.textContent = translations[lang]['simulation-result-exposure'];
    }
    
    // Atualizar o texto do card de exposição
    const exposureText = document.querySelector('.score-card p');
    if (exposureText) {
        exposureText.textContent = translations[lang]['simulation-result-risky'];
    }
    
    // Atualizar o título das dicas
    const tipsTitle = document.querySelector('.tips h3');
    if (tipsTitle) {
        tipsTitle.textContent = translations[lang]['simulation-tips-title'];
    }
    
    // Atualizar as dicas
    const tips = document.querySelectorAll('.tips li span');
    if (tips.length >= 4) {
        tips[0].textContent = translations[lang]['simulation-tip1'];
        tips[1].textContent = translations[lang]['simulation-tip2'];
        tips[2].textContent = translations[lang]['simulation-tip3'];
        tips[3].textContent = translations[lang]['simulation-tip4'];
    }
    
    // Atualizar o botão de reiniciar
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
        restartBtn.textContent = translations[lang]['simulation-restart-btn'];
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
        resultMessage.textContent = translations[lang][messageKey];
    }
    
    // Atualizar o status badge
    const statusBadge = document.getElementById('status-badge');
    if (statusBadge && typeof window.exposureScoreForResult !== 'undefined') {
        let statusText = '';
        if (window.exposureScoreForResult >= 6) {
            statusText = translations[lang]['simulation-result-vulnerable'];
        } else if (window.exposureScoreForResult >= 3) {
            statusText = translations[lang]['simulation-result-exposed'];
        } else if (window.exposureScoreForResult >= 1) {
            statusText = translations[lang]['simulation-result-moderate'];
        } else {
            statusText = translations[lang]['simulation-result-safe'];
        }
        statusBadge.textContent = statusText;
    }
}

// Função para mostrar um post em um idioma específico
function showPost(index, lang) {
    const cardContent = document.getElementById('card-content');
    const postType = document.getElementById('post-type');
    const postTime = document.getElementById('post-time');
    
    // Obter os posts no idioma especificado
    const posts = getGamePosts(lang);
    
    if (index >= posts.length) {
        return;
    }
    
    const post = posts[index];
    
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
}

// Seletor de idioma
const languageBtns = document.querySelectorAll('.language-btn');

// Adicionar eventos de clique aos botões de idioma
languageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remover a classe active de todos os botões
        languageBtns.forEach(b => b.classList.remove('active'));
        
        // Adicionar a classe active ao botão clicado
        btn.classList.add('active');
        
        // Obter o idioma selecionado
        const selectedLang = btn.getAttribute('data-lang');
        
        // Alterar o idioma
        changeLanguage(selectedLang);
    });
});

// Verificar preferência de idioma salva
const savedLanguage = localStorage.getItem('preferredLanguage');
if (savedLanguage && ['pt', 'en'].includes(savedLanguage)) {
    languageBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === savedLanguage) {
            btn.classList.add('active');
        }
    });
    // Aplicar o idioma salvo
    changeLanguage(savedLanguage);
} else {
    // Se não houver preferência salva, definir português como padrão
    changeLanguage('pt');
}

// Adicionar eventos de clique às abas
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // Remover a classe active de todas as abas e conteúdos
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        // Adicionar a classe active à aba clicada e ao conteúdo correspondente
        tab.classList.add('active');
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Adicionar eventos de clique aos botões de navegação
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remover a classe active de todos os botões
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        
        // Adicionar a classe active ao botão clicado
        btn.classList.add('active');
        
        // Rolar suavemente para a seção correspondente
        const sectionId = btn.getAttribute('href').substring(1);
        const section = document.getElementById(sectionId);
        
        if (section) {
            window.scrollTo({
                top: section.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Adicionar evento de clique ao logo para voltar ao topo
document.querySelector('.logo-link').addEventListener('click', (e) => {
    e.preventDefault();
    
    // Remover a classe active de todos os botões de navegação
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    
    // Rolar suavemente para o topo
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Destacar a seção atual durante o scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 200;
    
    // Se não houver seções, sair
    if (sections.length === 0) return;
    
    let activeSection = null;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            activeSection = sectionId;
        }
    });
    
    // Se nenhuma seção foi encontrada, verificar se estamos além da última seção
    if (!activeSection) {
        const lastSection = sections[sections.length - 1];
        const lastSectionTop = lastSection.offsetTop;
        if (scrollPosition >= lastSectionTop) {
            activeSection = lastSection.getAttribute('id');
        }
    }
    
    if (activeSection) {
        // Remover a classe active de todos os botões de navegação
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        
        // Adicionar a classe active ao botão correspondente à seção atual
        const correspondingBtn = document.querySelector(`.nav-btn[href="#${activeSection}"]`);
        if (correspondingBtn) {
            correspondingBtn.classList.add('active');
        }
    }
});

// Disparar o evento de scroll uma vez para garantir que a seção inicial esteja ativa
window.dispatchEvent(new Event('scroll'));
