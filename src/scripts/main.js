document.addEventListener('DOMContentLoaded', () => {
    const searchIcon = document.querySelector('.search-icon');
    const searchBar = document.querySelector('.search-bar');
    const searchInput = document.querySelector('.search-bar input');
    const backSearch = document.querySelector('.back-search');
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    const searchResults = document.querySelector('.search-results');

    // Search bar toggle
    searchIcon.addEventListener('click', () => {
        searchBar.classList.add('active');
        searchResults.classList.add('active');
        nav.classList.remove('active');
        displaySearchResults({results: [], isInitialState: true});
    });

    // Close search bar
    backSearch.addEventListener('click', () => {
        searchBar.classList.remove('active');
        searchResults.classList.remove('active');
        searchInput.value = '';
    });

    // Hamburger menu toggle
    const newHamburger = hamburger.cloneNode(true);
    hamburger.parentNode.replaceChild(newHamburger, hamburger);

    newHamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Search with delay functionality
    searchInput.addEventListener('input', debounce(performSearch, 300));
});

class NewsArticle {
    constructor(data) {
        this.source = data.source;
        this.author = data.author;
        this.title = data.title;
        this.description = data.description;
        this.url = data.url;
        this.urlToImage = data.urlToImage;
        this.publishedAt = new Date(data.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
        this.content = data.content;
    }

    get sourceName() {
        return this.source ? this.source.name : "";
    }

    get shortDescription() {
        return this.description.length > 100
        ? this.description.substring(0, 100) + "..."
        : this.description;
    }
}

function debounce(func, delay) {
    let timeoutId;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(context, args), delay);
    };
}

async function performSearch() {
    const query = this.value.trim();
    if (query.length === 0) {
        displaySearchResults({results: [], isInitialState: true});
        return;
    }
    if (query.length < 3) return;

    try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&from=2024-07-01&sortBy=popularity&apiKey=${process.env.API_KEY}`);
        const data = await response.json();
        const articles = data.articles.map(articleData => new NewsArticle(articleData));
        displaySearchResults({results: articles.slice(0, 10), isInitialState: false, totalResults: data.totalResults});
    } catch (error) {
        console.error('Search failed:', error);
        displaySearchResults({results: [], isInitialState: false, totalResults: null, errorMessage: 'An error occurred while searching. Please try again.'});
    }
}

function displaySearchResults({results, isInitialState = false, totalResults = null, errorMessage = null}) {
    const resultsContainer = document.querySelector('.search-results-container');
    resultsContainer.innerHTML = '';
    
    if (isInitialState) {
        const messageElement = document.createElement('p');
        messageElement.textContent = 'Make search to display news';
        resultsContainer.appendChild(messageElement);
        return;
    }

    if (errorMessage) {
        const errorElement = document.createElement('p');
        errorElement.textContent = errorMessage;
        resultsContainer.appendChild(errorElement);
        return;
    }
    
    if (totalResults === 0) {
        const noResultsElement = document.createElement('p');
        noResultsElement.textContent = 'Not found any news';
        resultsContainer.appendChild(noResultsElement);
        return;
    } 
    
    if (totalResults > 0) {
        results.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
    
            const titleElement = document.createElement('h2');
            const linkElement = document.createElement('a');
            linkElement.href = item.url;
            linkElement.target = '_blank';
            linkElement.textContent = `${item.title} | ${item.publishedAt}`;
            titleElement.appendChild(linkElement);
    
            const contentElement = document.createElement('p');
            contentElement.textContent = item.description;
    
            resultItem.appendChild(titleElement);
            resultItem.appendChild(contentElement);
    
            resultsContainer.appendChild(resultItem);
        });
    }
}