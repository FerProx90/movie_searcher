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
                console.log(genreBadge)
                return genreBadge
            }

            cardBody.innerHTML = `
                <h5 class="card-title mb-1">${data.Title}</h5>
                <h6 class="card-subtitle text-muted mb-2">${data.Type} | ${data.Year}</h6>
                <span class='card-subtitle text-start mb-2 col-12'>
                    <div class="row g-0">
                        ${getGenres(genres)}
                    </div>
                </span>
                <img class="card-img mb-2" src="${data.Poster}" alt="">
                <p class="card-text">${data.Plot}</p>
            `
    
        }
        else{
            cardBody.innerHTML = "<h2>Movie not found</h2>"
        }
    })
}

button.addEventListener('click', getMovie);