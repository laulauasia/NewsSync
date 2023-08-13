const API_KEY = '1a062f870a8f42cfaa514ac3ad6eac38';
const url = 'https://newsapi.org/v2/everything?q=';

window.addEventListener('load', () => fetchNews('India'));

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('news-card-template');
    cardsContainer.innerHTML = '';

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    })
}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');
    const newsUrl = cardClone.querySelector('#news-url');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    const date = new Date(article.publishedAt).toLocaleString('en-US',{
        timeZone: 'Asia/Jakarta'
    });
    newsSource.innerHTML = `${article.source.name}  •  ${date}`;
    newsDesc.innerHTML = article.description; 
    newsUrl.href = article.url;
}


let currentSelectedNavItem = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    currentSelectedNavItem?.classList.remove('active');
    currentSelectedNavItem = navItem;
    currentSelectedNavItem.classList.add('active');
    NavLinksContainer.classList.remove('open');
}

const searchButton = document.getElementById('search-btn');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click',() => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    currentSelectedNavItem?.classList.remove('active');
    currentSelectedNavItem = null;
})

const hamIcon = document.getElementById('ham-icon');
const NavLinksContainer = document.getElementById('nav-links-container');
const bars = document.getElementById('bars');
hamIcon.addEventListener('click', () => {
    NavLinksContainer.classList.toggle('open');
    if(bars.classList.contains('fa-bars')){
        bars.classList.remove('fa-bars');
        bars.classList.add('fa-xmark');
    }else{
        bars.classList.remove('fa-xmark');
        bars.classList.add('fa-bars');
    }
})