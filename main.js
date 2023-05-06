const apiKey = "605d28b4";

const userInput = document.getElementById('userInput');
const button = document.getElementById('button');
const result = document.getElementById('result');


function fetchOmdb(){
    const movieName = userInput.value
    let url = `https://omdbapi.com/?t=${movieName}&apikey=${apiKey}`;

    return fetch(url).then(response => response.json())
}

function getMovie (){
    const cardBody = document.getElementById('cardBody');

    fetchOmdb().then(data =>{
        console.log(data)
        if (data.Response == "True"){

            let genres = data.Genre.split(",");
            function getGenres(genresArray){
                let genreBadge = ""
                for (genre of genresArray){
                    genreBadge += `<h3 class="col-auto badge bg-dark rounded-pill me-1"> ${genre} </h3>`;
                }
                return genreBadge
            }

            let runtime = ""
            data.Type == "movie" ? runtime = ` (${data.Runtime})` : runtime

            cardBody.innerHTML = `
                <h5 class="card-title mb-1">${data.Title}</h5>
                <h6 class="card-subtitle text-muted mb-2">${data.Type}${runtime} | ${data.Year}</h6>
                <span class='card-subtitle text-start mb-2 col-12'>
                    <div class="row g-0">
                        ${getGenres(genres)}
                    </div>
                </span>
                <img class="card-img mb-2" src="${data.Poster}" alt="">
                <div class="row g-0 mb-1">
                    <p class="col-12 card-text fw-bold mb-0">Plot</p>
                    <p class="card-text"> ${data.Plot}</p>
                </div>
                <div class="row g-0 justify-content-center align-items-center text-center fw-bold border-top border-1 border-warning mt-3 p-2">
                    <p class="col-12 card-text mb-0">imdb Rating</p>
                    <img src="images/star.svg" class="col-1"  width="20" height="20">
                    <p class="card-text text-warning col-auto"> ${data.imdbRating}</p>
                </div>
            `
    
        }
        else{

            if(userInput.value.trim() != ""){
            cardBody.innerHTML = `
            <div class="text-center">
            <h2 class="card-title mb-2">Movie not found!</h2>
            <h6 class="card-subtitle text-muted">Mayba you wrote "<b> ${userInput.value} </b>" wrong.</h6>
            </div>
            `
            }
            else {
                userInput.setAttribute('placeholder', 'Type something to search');
            }
        }
    })
}

button.addEventListener('click', getMovie);