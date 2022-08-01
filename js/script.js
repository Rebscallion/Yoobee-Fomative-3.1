const endpointURL = "https://api.nytimes.com/svc/";
const mostPop = "mostpopular/v2/viewed/1.json?api-key=";
const userSearch = "search/v2/articlesearch.json?q=";
const key = "IzMWV2kSw5cDXLDuZxpsWBwW5kc2jTIa";

const result = document.getElementById("result");
const searchInput = document.getElementById("search-terms");
const searchBtn = document.getElementById("search");

let showArticles = (articles) => {
    // console.log("running");
    articles.forEach((item, index) => {
        // console.log(item);
        let metadata = item.media[0]['media-metadata'][2].url;
        let articleLink = item.url;
        //display 20 most popular articles
        result.innerHTML += `
        <div class="content-box">
        <img class="image" src="${metadata}" width="100%">
        <div class="bio">
        <h2 class="headline">${item.title}</h2>
        <h3 class="byline">${item.byline}</h3>
        <h3 class="abstract">${item.abstract}</h3>
        <h3 class="date">${item.updated}</h3>
        <a href="${articleLink}">View Full Article</a>
        </div>
        </div>
        `;
    });
}

let showSearchResults = (results) => {
    console.log("running");
    results.forEach((item, index) => {
        console.log(item);
        result.innerHTML == "";
    //     result.innerHTML += `
    //     <div class="content-box">
    //     <div class="bio">
    //     <h2 class="headline">${docs.headline}</h2>
    //     <h3 class="byline">${docs.byline.original}</h3>
    //     <h3 class="abstract">${docs.abstract}</h3>
    //     <h3 class="date">${docs.pub_date}</h3>
    //     </div>
    //     </div>
        // `;
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
        url: endpointURL + userSearch + searchString + "&page=2&sort=oldest&api-key=" + key,
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