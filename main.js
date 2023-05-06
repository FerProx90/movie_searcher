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

        let genres = data.Genre.split();
        const genresMap = genres.map(genre => "<div class='d-inline'>" + genre + "</div>");

console.log(genresMap)
            cardBody.innerHTML = `
                <h5 class="card-title mb-1">${data.Title}</h5>
                <h6 class="card-subtitle text-muted mb-2">${data.Type} | ${data.Year}</h6>
                <h6 class='card-subtitle text-start mb-2'>${genresMap}</h6>
                <img class="card-img mb-2" src="${data.Poster}" alt="">
                <p class="card-text">${data.Plot}</p>
                `
        //    console.log(data);
        //    result.innerHTML = `
        //     <p>${data.Title}</p>
        //     <p>${data.Year}</p>
        //     <div>
        //     ${data.Ratings.map(rating => 
        //         "<p>" + rating.Value + "</p>"
        //     )}
        //     </div>
        //     <p>${data.Plot}</p>
        //     <img src=${data.Poster}>
        //    `
        }
        else{
            cardBody.innerHTML = "<h2>Movie not found</h2>"
        }
    })
}

button.addEventListener('click', getMovie);