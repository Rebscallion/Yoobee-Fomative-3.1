const endpointURL = "https://api.nytimes.com/svc/";
const mostPop = "mostpopular/v2/viewed/1.json?api-key=";
const userSearch = "search/v2/articlesearch.json?q=";
const key = "IzMWV2kSw5cDXLDuZxpsWBwW5kc2jTIa";

const result = document.getElementById("result");
const searchInput = document.getElementById("search-terms");
const searchBtn = document.getElementById("search");

let today = new Date();
let date = "Today's Date:" + ' ' + today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
const todaysDate = document.getElementById('display-date');

todaysDate.innerHTML = date;

let showArticles = (articles) => {
    // console.log("running");
    articles.forEach((item, index) => {
        // console.log(item);
        let metadata = item.media[0]['media-metadata'][2].url;
        let articleLink = item.url;
        //display 20 most popular articles
        let checkArticleImage = () => {
            if (item.metadata == "") {
                return "https://static01.nyt.com/vi-assets/images/share/1200x675_nameplate.png";
            } else {
                return metadata;
            }
        }
        result.innerHTML += `
        <div class="content-box">
        <img class="image" src="${checkArticleImage()}" width="100%">
        <div class="bio">
        <h2 class="headline">${item.title}</h2>
        <h3 class="byline">${item.byline}</h3>
        <h3 class="abstract">${item.abstract}</h3>
        <div class="link-container">
        <a class="article-link" href="${articleLink}">View Full Article <i class="bi bi-arrow-right-short"></i></a>
        <h3 class="date">${item.updated}</h3>
        </div>
        </div>
        </div>
        `;
    });
}

let showSearchResults = (results) => {
    console.log("running");
    result.innerHTML = "";
    results.docs.forEach((item, index) => {
        let checkArticleImage = () => {
            if (item.multimedia == "") {
                return "https://static01.nyt.com/vi-assets/images/share/1200x675_nameplate.png";
            } else {
                return "https://static01.nyt.com/" + item.multimedia[39].url;
            }
        }
        console.log(item);
        let articleLink = item.web_url;
        result.innerHTML += `
        <div class="content-box">
        <img class="image" src="${checkArticleImage()}" width="100%">
        <div class="bio">
        <h2 class="headline">${item.headline.main}</h2>
        <h3 class="byline">${item.byline.original}</h3>
        <h3 class="abstract">${item.abstract}</h3>
        <div class="link-container">
        <a class="article-link" href="${articleLink}">View Full Article <i class="bi bi-arrow-right-short"></i></a>
        </div>
        </div>
        </div>
        `;
    });
}

$.ajax({
    url: endpointURL + mostPop + key,
    type: 'GET',
    success: (data) => {
        console.log(data);
        showArticles(data.results);
    },
    error: (error) => {
        console.log(error);
    }
});

searchBtn.onclick = () => {
    searchString = searchInput.value;
    $.ajax({
        type: "GET",
        url: endpointURL + userSearch + searchString + "&page=2&begin_date=20200101&sort=newest&api-key=" + key,
        success: (data) => {
            console.log(data);
            showSearchResults(data.response);
        },
        error: (error) => {
            console.log("there's a problem");
            console.log(error);
        }
    });
}