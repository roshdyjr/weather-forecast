const gnewsApiUrl = "https://gnews.io/api/v4/search?q=weather&token=dc40c86b11d1076778d28a95fd7cddfd";

const newsContainer = document.querySelector(".news-container");
const defaultImg = "../imgs/cloudy.png";

async function fetchWeatherNews() {
    try {
        let response = await fetch(gnewsApiUrl);
        let newsData = await response.json();
        displayWeatherNews(newsData.articles);
    } catch (error) {
        console.error("Error fetching weather news:", error);
        newsContainer.innerHTML = `<p>Error fetching weather news. Please try again later.</p>`;
    }
}

function displayWeatherNews(articles) {
    let newsHTML = "";

    for (let i = 0; i < articles.length; i++) {
        let article = articles[i];
        let imageUrl = article.image || defaultImg;

        newsHTML += `
            <div class="col-lg-4 col-md-6">
                <div class="news-card">
                    <img src="${imageUrl}" alt="${article.title}" class="img-fluid">
                    <div class="news-content">
                        <h3>${article.title}</h3>
                        <p>${article.description || 'No description available.'}</p>
                        <a href="${article.url}" target="_blank" class="btn btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        `;
    }

    newsContainer.innerHTML = newsHTML;
}

window.onload = fetchWeatherNews;
