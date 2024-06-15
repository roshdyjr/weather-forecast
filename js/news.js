const newsApiKey = "3929badf60f248cea00a5b4fda104664";
const newsApiUrl = `https://newsapi.org/v2/everything?q=weather&apiKey=${newsApiKey}`;

const newsContainer = document.querySelector(".news-container");


async function fetchNews() {
    try {
        let response = await fetch(newsApiUrl);
        let newsData = await response.json();
        displayNews(newsData.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
        newsContainer.innerHTML = `<p>Error fetching news. Please try again later.</p>`;
    }
}

function displayNews(articles) {
    let newsHTML = "";

    for (let i = 0; i < articles.length; i++) {
        let article = articles[i];

        newsHTML += `
            <div class="col-lg-4 col-md-6">
                <div class="news-card">
                    <img src="${article.urlToImage}" alt="${article.title}" class="img-fluid">
                    <div class="news-content">
                        <h3>${article.title}</h3>
                        <p>${article.description}</p>
                        <a href="${article.url}" target="_blank" class="btn">Read More</a>
                    </div>
                </div>
            </div>
        `;
    }

    newsContainer.innerHTML = newsHTML;
}

window.onload = fetchNews;