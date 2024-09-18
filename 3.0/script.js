document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const userSection = document.getElementById('user-section');
    const welcomeMessage = document.getElementById('welcome-message');
    const preferencesInput = document.getElementById('new-preferences');
    const updatePreferencesButton = document.getElementById('update-preferences');
    const logoutButton = document.getElementById('logout');
    const articlesList = document.getElementById('articles');
    const articleContent = document.getElementById('article-content');
    const articleText = document.getElementById('article-text');
    const closeArticleButton = document.getElementById('close-article');
    
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');
    
    // Artículos de ejemplo (10 artículos por categoría)
    const allArticles = {
        'inodoro volador': [
            { title: 'La gran aventura del Inodoro Volador', content: 'Este artículo narra la increíble travesía del Inodoro Volador a través de mundos fantásticos...' },
            { title: 'El misterio del Inodoro Volador', content: 'Un misterio envuelve al Inodoro Volador. ¿Qué secretos guarda?' },
            { title: 'Inodoro Volador en el espacio', content: 'Explora el espacio con el Inodoro Volador en esta épica aventura intergaláctica...' },
            { title: 'Las hazañas del Inodoro Volador', content: 'El Inodoro Volador regresa con más hazañas sorprendentes...' },
            { title: 'Viaje del Inodoro Volador al centro de la Tierra', content: 'El Inodoro Volador se embarca en una peligrosa misión hacia el centro de la Tierra...' },
            { title: 'El regreso del Inodoro Volador', content: 'Descubre cómo el Inodoro Volador regresa tras desaparecer por años...' },
            { title: 'Inodoro Volador y el Imperio Perdido', content: 'El Inodoro Volador encuentra un imperio perdido en esta emocionante aventura...' },
            { title: 'La batalla del Inodoro Volador', content: 'El Inodoro Volador enfrenta a su mayor enemigo en esta épica batalla...' },
            { title: 'Inodoro Volador en el futuro', content: 'Un salto al futuro con el Inodoro Volador y las nuevas tecnologías...' },
            { title: 'La última misión del Inodoro Volador', content: 'El fin de las aventuras del Inodoro Volador. ¿O es solo el comienzo?' }
        ],
        'bucaramanga': [
            { title: 'La historia de la hinchada del Bucaramanga', content: 'Un vistazo a la apasionada hinchada del Bucaramanga y sus momentos más destacados...' },
            { title: 'Batalla épica: Bucaramanga vs. Nacional', content: 'Revive la épica batalla entre Bucaramanga y Nacional, un enfrentamiento lleno de emoción...' },
            { title: 'Los momentos más grandes del Bucaramanga', content: 'Una recopilación de los momentos más grandes en la historia del Bucaramanga...' },
            { title: 'Jugadores legendarios del Bucaramanga', content: 'Una lista de los jugadores más legendarios que han pasado por el Bucaramanga...' },
            { title: 'La hinchada que nunca se rinde', content: 'La historia de una hinchada que no se rinde nunca, apoyando al equipo en las buenas y en las malas...' },
            { title: 'Bucaramanga en la final', content: 'El Bucaramanga alcanza la final y su hinchada enloquece...' },
            { title: 'Los colores de Bucaramanga', content: 'Un análisis de los colores y símbolos que representan al Bucaramanga...' },
            { title: 'Las estrellas del Bucaramanga', content: 'Las estrellas que hicieron brillar al equipo...' },
            { title: 'Los entrenadores históricos del Bucaramanga', content: 'Un repaso por los entrenadores que han dejado huella en la historia del Bucaramanga...' },
            { title: 'Los títulos del Bucaramanga', content: 'Un repaso de todos los títulos y logros importantes del Bucaramanga...' }
        ],
        'lavanda': [
            { title: 'Lavanda y el misterio de las cumbias', content: 'Descubre el misterio que rodea a Lavanda y su relación con las cumbias...' },
            { title: 'La nueva era de Lavanda', content: 'Analiza cómo Lavanda ha evolucionado en la nueva era de la música...' },
            { title: 'Lavanda en la cima', content: 'Cómo Lavanda ha alcanzado la cima en el mundo de la música...' },
            { title: 'El origen de Lavanda', content: 'Una mirada a los primeros días de Lavanda y su ascenso a la fama...' },
            { title: 'Lavanda y las cumbias prohibidas', content: 'La historia de cómo Lavanda desafió las normas para tocar las cumbias prohibidas...' },
            { title: 'El regreso de Lavanda a los escenarios', content: 'Lavanda regresa a los escenarios con un nuevo estilo musical...' },
            { title: 'Las colaboraciones de Lavanda', content: 'Las mejores colaboraciones de Lavanda con otros artistas...' },
            { title: 'Lavanda: El álbum dorado', content: 'Un análisis de lo que muchos consideran el mejor álbum de Lavanda...' },
            { title: 'Lavanda en vivo', content: 'Las mejores actuaciones en vivo de Lavanda que hicieron vibrar al público...' },
            { title: 'Lavanda y su legado', content: 'Cómo Lavanda ha influido a las generaciones más jóvenes de músicos...' }
        ]
    };

    // Obtener usuarios de localStorage
    function getUsers() {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    }

    // Guardar usuarios en localStorage
    function saveUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Encontrar usuario por nombre de usuario
    function findUser(username) {
        const users = getUsers();
        return users.find(user => user.username === username);
    }

    // Guardar datos del usuario actual en la sesión
    function saveCurrentUser(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    // Obtener el usuario actual de la sesión
    function getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    // Cargar la sesión del usuario
    function loadUserData() {
        const currentUser = getCurrentUser();
        if (currentUser) {
            welcomeMessage.innerHTML = `Bienvenido, ${currentUser.username}!`;
            preferencesInput.value = currentUser.preferences.join(', ');
            userSection.style.display = 'block';
            loginForm.style.display = 'none';
            registerForm.style.display = 'none';
            loadRecommendedArticles(currentUser.preferences);
        } else {
            userSection.style.display = 'none';
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
        }
    }

    // Cargar artículos recomendados según preferencias
    function loadRecommendedArticles(preferences) {
        articlesList.innerHTML = '';
        preferences.forEach(pref => {
            const articles = allArticles[pref.trim().toLowerCase()] || [];
            articles.forEach(article => {
                const li = document.createElement('li');
                li.textContent = article.title;
                li.addEventListener('click', () => {
                    articleText.textContent = article.content;
                    articleContent.style.display = 'block';
                });
                articlesList.appendChild(li);
            });
        });
    }

    // Evento de inicio de sesión
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        const user = findUser(username);
        if (user && user.password === password) {
            saveCurrentUser(user);
            loadUserData();
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    });

    // Evento de registro
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;

        const preferences = Array.from(document.querySelectorAll('input[name="preference"]:checked')).map(checkbox => checkbox.value);
        const users = getUsers();
        
        if (findUser(username)) {
            alert('El usuario ya existe');
            return;
        }

        const newUser = { username, password, preferences };
        users.push(newUser);
        saveUsers(users);
        saveCurrentUser(newUser);
        loadUserData();
    });

    // Evento para cerrar sesión
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        loadUserData();
    });

    // Evento para actualizar preferencias
    updatePreferencesButton.addEventListener('click', () => {
        const currentUser = getCurrentUser();
        const newPreferences = preferencesInput.value.split(',').map(pref => pref.trim());
        currentUser.preferences = newPreferences;
        
        const users = getUsers();
        const userIndex = users.findIndex(user => user.username === currentUser.username);
        users[userIndex].preferences = newPreferences;

        saveUsers(users);
        saveCurrentUser(currentUser);
        loadRecommendedArticles(newPreferences);
    });

    // Cerrar contenido del artículo
    closeArticleButton.addEventListener('click', () => {
        articleContent.style.display = 'none';
    });

    // Mostrar formularios de registro e inicio de sesión
    showRegisterLink.addEventListener('click', () => {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    });

    showLoginLink.addEventListener('click', () => {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    });

    // Cargar los datos del usuario si ya está logueado
    loadUserData();
});
