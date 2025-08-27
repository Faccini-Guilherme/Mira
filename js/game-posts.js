// Posts do jogo em português
const gamePostsPT = [
    {
        id: "vacation", // Identificador único
        type: "foto",
        icon: "fas fa-image",
        content: `<img src="https://images.pexels.com/photos/1049298/pexels-photo-1049298.jpeg" alt="Foto de férias">`,
        text: "As minhas férias na praia! 🏖️☀️ #melhoresferias",
        time: "Agora mesmo",
        explanation: "Publicar fotos de férias em tempo real revela que a sua casa está vazia, facilitando assaltos.",
        safeChoice: "protege"
    },
    {
        id: "gym", // Identificador único
        type: "localização",
        icon: "fas fa-map-marker-alt",
        content: `<div class="location">
            <i class="fas fa-map-marker-alt"></i>
            <div>
                <strong>Ginásio FitLife</strong>
                <p>Check-in realizado: Segunda e Quarta, 19h</p>
            </div>
        </div>
        <img src="https://images.pexels.com/photos/4498607/pexels-photo-4498607.jpeg" alt="Mapa do ginásio">`,
        text: "",
        time: "2 horas atrás",
        explanation: "Partilhar a sua rotina fixa permite que criminosos saibam onde está em determinados horários.",
        safeChoice: "protege"
    },
    {
        id: "birthday", // Identificador único
        type: "texto",
        icon: "fas fa-font",
        content: `<div class="post-text">
            <p>Feliz aniversário para mim! 🎉 Hoje completo 30 anos! 01/05/1993</p>
        </div>
        <img src="https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg" alt="Bolo de aniversário">`,
        text: "",
        time: "5 horas atrás",
        explanation: "Partilhar data de nascimento completa é uma informação valiosa para golpistas e pode ser usada em ataques de engenharia social.",
        safeChoice: "protege"
    },
    {
        id: "house", // Identificador único
        type: "foto",
        icon: "fas fa-image",
        content: `<img src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg" alt="Foto da casa">`,
        text: "Finalmente casa própria! 🏡 Acabei de me mudar para a Rua do Sol, Lisboa! #sonhorealizado",
        time: "Ontem",
        explanation: "Partilhar fotos da fachada da sua casa pode facilitar que criminosos identifiquem o seu endereço.",
        safeChoice: "protege"
    },
    {
        id: "son", // Identificador único
        type: "texto",
        icon: "fas fa-font",
        content: `<div class="post-text">
            <p>O meu filho Pedro entrou na Universidade de Lisboa! Tão orgulhoso! 😊 #maecoruja</p>
        </div>
        <img src="https://images.pexels.com/photos/3769708/pexels-photo-3769708.jpeg" alt="Biblioteca universitária">`,
        text: "",
        time: "2 dias atrás",
        explanation: "Revelar informações sobre familiares pode ser usado em golpes personalizados que exploram relacionamentos.",
        safeChoice: "protege"
    },
    {
        id: "boss", // Identificador único
        type: "foto",
        icon: "fas fa-image",
        content: `<img src="https://images.pexels.com/photos/4968681/pexels-photo-4968681.jpeg" alt="Foto de cartão">`,
        text: "O meu chefe é um inútil. Devia ser despedido já!",
        time: "3 dias atrás",
        explanation: "Comentários ofensivos sobre colegas ou superiores comprometem a tua reputação e podem ter consequências legais ou laborais.",
        safeChoice: "protege"
    },
    {
        id: "sunset", // Identificador único
        type: "texto",
        icon: "fas fa-font",
        content: `<div class="post-text">
            <p>A minha vista favorita ao fim da tarde 😍 #natureza #paz</p>
        </div>
        <img src="https://images.pexels.com/photos/70577/sunset-birds-flying-sky-70577.jpeg" alt="Pôr do sol">`,
        text: "",
        time: "1 hora atrás",
        explanation: "Publicações sobre paisagens naturais sem localização específica são seguras.",
        safeChoice: "posta"
    },
    {
        id: "course", // Identificador único
        type: "foto",
        icon: "fas fa-image",
        content: `<img src="https://images.pexels.com/photos/8093039/pexels-photo-8093039.jpeg" alt="Conclusão de curso">`,
        text: "Concluí o curso de Cibersegurança! 🎓 #conquista",
        time: "Ontem",
        explanation: "Partilhar conquistas profissionais sem dados sensíveis é seguro.",
        safeChoice: "posta"
    },
    {
        id: "coffee", // Identificador único
        type: "texto",
        icon: "fas fa-font",
        content: `<div class="post-text">
            <p>Começar o dia com leitura e café é tudo de bom! ☕📚 #rotinasaudavel</p>
        </div>
        <img src="https://images.pexels.com/photos/904616/pexels-photo-904616.jpeg" alt="Café e livro">`,
        text: "",
        time: "3 horas atrás",
        explanation: "Partilhar rotinas diárias sem localização específica é seguro.",
        safeChoice: "posta"
    },
    {
        id: "festival", // Identificador único
        type: "foto",
        icon: "fas fa-image",
        content: `<img src="https://images.pexels.com/photos/29393022/pexels-photo-29393022.jpeg" alt="Festival de tecnologia">`,
        text: "Foi incrível estar no festival de tecnologia! 🚀 #inovação",
        time: "2 dias atrás",
        explanation: "Partilhar experiências em eventos públicos sem localização em tempo real é seguro.",
        safeChoice: "posta"
    },
    {
        id: "cat", // Identificador único
        type: "foto",
        icon: "fas fa-image",
        content: `<img src="https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg" alt="Foto de gato">`,
        text: "O patrão cá de casa 🐱 #gato #pet",
        time: "Agora mesmo",
        explanation: "Fotos de animais de estimação sem pessoas identificáveis são seguras.",
        safeChoice: "posta"
    },
    {
        id: "knowledge", // Identificador único
        type: "texto",
        icon: "fas fa-font",
        content: `<div class="post-text">
            <p>Partilhar conhecimento é proteger. Leiam isto! 📖 #conscientizacao</p>
        </div>
        <img src="https://images.pexels.com/photos/16587315/pexels-photo-16587315.jpeg" alt="Livro de segurança digital">`,
        text: "",
        time: "Ontem",
        explanation: "Informações educativas sobre segurança digital são recomendadas.",
        safeChoice: "posta"
    }
];

// Posts do jogo em inglês
const gamePostsEN = [
    {
        id: "vacation", // Mesmo identificador
        type: "photo",
        icon: "fas fa-image",
        content: `<img src="https://images.pexels.com/photos/1049298/pexels-photo-1049298.jpeg" alt="Vacation photo">`,
        text: "My vacation at the beach! 🏖️☀️ #bestvacation",
        time: "Just now",
        explanation: "Posting vacation photos in real time reveals that your home is empty, facilitating robberies.",
        safeChoice: "protege"
    },
    {
        id: "gym", // Mesmo identificador
        type: "location",
        icon: "fas fa-map-marker-alt",
        content: `<div class="location">
            <i class="fas fa-map-marker-alt"></i>
            <div>
                <strong>FitLife Gym</strong>
                <p>Check-in done: Monday and Wednesday, 7pm</p>
            </div>
        </div>
        <img src="https://images.pexels.com/photos/4498607/pexels-photo-4498607.jpeg" alt="Gym map">`,
        text: "",
        time: "2 hours ago",
        explanation: "Sharing your fixed routine allows criminals to know where you are at certain times.",
        safeChoice: "protege"
    },
    {
        id: "birthday", // Mesmo identificador
        type: "text",
        icon: "fas fa-font",
        content: `<div class="post-text">
            <p>Happy birthday to me! 🎉 Today I turn 30! 05/01/1993</p>
        </div>
        <img src="https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg" alt="Birthday cake">`,
        text: "",
        time: "5 hours ago",
        explanation: "Sharing your complete birth date is valuable information for scammers and can be used in social engineering attacks.",
        safeChoice: "protege"
    },
    {
        id: "house", // Mesmo identificador
        type: "photo",
        icon: "fas fa-image",
        content: `<img src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg" alt="House photo">`,
        text: "Finally my own house! 🏡 I just moved to Rua do Sol, Lisbon! #dreamcometrue",
        time: "Yesterday",
        explanation: "Sharing photos of your home's facade can make it easier for criminals to identify your address.",
        safeChoice: "protege"
    },
    {
        id: "son", // Mesmo identificador
        type: "text",
        icon: "fas fa-font",
        content: `<div class="post-text">
            <p>My son Peter entered the University of Lisbon! So proud! 😊 #proudmom</p>
        </div>
        <img src="https://images.pexels.com/photos/3769708/pexels-photo-3769708.jpeg" alt="University library">`,
        text: "",
        time: "2 days ago",
        explanation: "Revealing information about family members can be used in personalized scams that exploit relationships.",
        safeChoice: "protege"
    },
    {
        id: "boss", // Mesmo identificador
        type: "photo",
        icon: "fas fa-image",
        content: `<img src="https://images.pexels.com/photos/4968681/pexels-photo-4968681.jpeg" alt="Card photo">`,
        text: "My boss is useless. He should be fired right now!",
        time: "3 days ago",
        explanation: "Offensive comments about colleagues or superiors compromise your reputation and can have legal or work consequences.",
        safeChoice: "protege"
    },
    {
        id: "sunset", // Mesmo identificador
        type: "text",
        icon: "fas fa-font",
        content: `<div class="post-text">
            <p>My favorite view in the late afternoon 😍 #nature #peace</p>
        </div>
        <img src="https://images.pexels.com/photos/70577/sunset-birds-flying-sky-70577.jpeg" alt="Sunset">`,
        text: "",
        time: "1 hour ago",
        explanation: "Posts about natural landscapes without specific location are safe.",
        safeChoice: "posta"
    },
    {
        id: "course", // Mesmo identificador
        type: "photo",
        icon: "fas fa-image",
        content: `<img src="https://images.pexels.com/photos/8093039/pexels-photo-8093039.jpeg" alt="Course completion">`,
        text: "Completed the Cybersecurity course! 🎓 #achievement",
        time: "Yesterday",
        explanation: "Sharing professional achievements without sensitive data is safe.",
        safeChoice: "posta"
    },
    {
        id: "coffee", // Mesmo identificador
        type: "text",
        icon: "fas fa-font",
        content: `<div class="post-text">
            <p>Starting the day with reading and coffee is everything good! ☕📚 #healthyroutine</p>
        </div>
        <img src="https://images.pexels.com/photos/904616/pexels-photo-904616.jpeg" alt="Coffee and book">`,
        text: "",
        time: "3 hours ago",
        explanation: "Sharing daily routines without specific location is safe.",
        safeChoice: "posta"
    },
    {
        id: "festival", // Mesmo identificador
        type: "photo",
        icon: "fas fa-image",
        content: `<img src="https://images.pexels.com/photos/29393022/pexels-photo-29393022.jpeg" alt="Technology festival">`,
        text: "It was amazing to be at the technology festival! 🚀 #innovation",
        time: "2 days ago",
        explanation: "Sharing experiences at public events without real-time location is safe.",
        safeChoice: "posta"
    },
    {
        id: "cat", // Mesmo identificador
        type: "photo",
        icon: "fas fa-image",
        content: `<img src="https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg" alt="Cat photo">`,
        text: "The boss around here 🐱 #cat #pet",
        time: "Just now",
        explanation: "Photos of pets without identifiable people are safe.",
        safeChoice: "posta"
    },
    {
        id: "knowledge", // Mesmo identificador
        type: "text",
        icon: "fas fa-font",
        content: `<div class="post-text">
            <p>Sharing knowledge is protecting. Read this! 📖 #awareness</p>
        </div>
        <img src="https://images.pexels.com/photos/16587315/pexels-photo-16587315.jpeg" alt="Digital security book">`,
        text: "",
        time: "Yesterday",
        explanation: "Educational information about digital security is recommended.",
        safeChoice: "posta"
    }
];

// Função para obter os posts do jogo com base no idioma
function getGamePosts(lang) {
    if (lang === 'en') {
        return [...gamePostsEN];
    } else {
        return [...gamePostsPT];
    }
}