// Cargar artículos desde Local Storage
function loadArticles() {
    const articles = JSON.parse(localStorage.getItem('articles')) || [];
    const articlesContainer = document.getElementById('articles-container');
    
    articlesContainer.innerHTML = ''; // Limpiar artículos existentes

    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('article-box');
        articleElement.innerHTML = `
            <h3>${article.title}</h3>
            <img src="${article.image}" alt="Imagen del artículo" class="article-image">
            <p>${article.content}</p>
        `;
        articlesContainer.appendChild(articleElement);
    });
}

// Guardar artículo en Local Storage
function saveArticle(article) {
    const articles = JSON.parse(localStorage.getItem('articles')) || [];
    articles.push(article);
    localStorage.setItem('articles', JSON.stringify(articles));
}

// Manejar la publicación de artículos
document.getElementById('publish-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('article-title').value;
    const content = document.getElementById('article-content').value;
    const imageInput = document.getElementById('article-image');
    
    let reader = new FileReader();
    reader.onload = function() {
        const article = {
            title: title,
            content: content,
            image: reader.result
        };
        
        saveArticle(article);
        loadArticles(); // Recargar artículos después de guardar uno nuevo
    };

    if (imageInput.files[0]) {
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        alert('Por favor, sube una imagen para tu artículo.');
    }
});

// Inicializar la página cargando artículos desde Local Storage
window.addEventListener('load', loadArticles);
