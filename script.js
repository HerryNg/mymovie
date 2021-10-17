const API_KEY='api_key=5f0d63d531836d5bd9b1ad1657558761';
const BASE_URL='https://api.themoviedb.org/3';
const IMG_URL ='https://image.tmdb.org/t/p/w500';

const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const search_URL = BASE_URL + '/search/movie?' + API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const tagsEL = document.getElementById('tags');
const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
]
const selectGenrse = [];
const setGenre = () => {
    tagsEL.innerHTML = '';
    genres.forEach(genres => {
        const t = document.createElement('div');
        t.classList.add('tag');
        t.id=genres.id;
        t.innerText = genres.name;
        t.addEventListener('click', () => {
            if(selectGenrse.length == 0){
                selectGenrse.push(genres.id);
            }else{
                if(selectGenrse.includes(genres.id)){
                    selectGenrse.forEach((id, i) =>{
                        if(id == genres.id){
                            selectGenrse.splice(i, 1);
                        }
                    })
                }else{
                    selectGenrse.push(genres.id);
                }
            }
            console.log(selectGenrse);
            getMovies(API_URL + '&with_genres=' +encodeURI(selectGenrse.join(',')));
        })
        tagsEL.append(t);
    
    })
    }

setGenre();

const getMovies = (url) =>{

    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        showMovie(data.results);
    })

}
getMovies(API_URL);

const showMovie = (data) =>{
    main.innerHTML = '';

    data.forEach(movie => {
        const{title, poster_path, vote_average, overview} = movie;
        const movieEL = document.createElement('div');
        movieEL.classList.add('movie');
        movieEL.innerHTML =`
        <img src="${IMG_URL + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>   
             `
        main.appendChild(movieEL);
    });
}
const getColor= (vote) => {
    if(vote >= 8)
    {
        return 'green'
    }else if(vote >= 5){
        return 'orange'
    }else{
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchIerm = search.value;

    if(search){
        getMovies(search_URL + '&query=' + searchIerm)
    }else{
       
        getMovies(API_URL);
    }
})


