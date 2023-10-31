// finish when server is finished

require('dotenv').config();

const apiKey = process.env.API_KEY;
let page = 1;
const pageSize = 10;

function fetchGames() {
    const apiUrl = `https://api.rawg.io/api/games?key=${apiKey}&ordering=-rating,-released&page=${page}&page_size=${pageSize}`;
    
    // Move the console.log inside the fetchGames function
    console.log("API URL:", apiUrl);

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const gameCardsContainer = document.getElementById('gameCards');

            data.results.forEach((game) => {
                if (game.background_image) {
                    const gameCard = document.createElement('div');
                    gameCard.className = 'game-card';

                    const gameImage = document.createElement('img');
                    gameImage.className = 'game-image';
                    gameImage.src = game.background_image;
                    gameImage.alt = game.name;

                    const gameDetails = document.createElement('div');
                    gameDetails.className = 'game-details';

                    const gameTitle = document.createElement('h3');
                    gameTitle.className = 'game-title text-center';
                    gameTitle.textContent = game.name;

                    gameCard.appendChild(gameImage);
                    gameCard.appendChild(gameDetails);
                    gameDetails.appendChild(gameTitle);

                    gameCardsContainer.appendChild(gameCard);
                }
            });

            page++;
        })
        .catch((error) => {
            console.error('Error fetching game data:', error);
        });
}

let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    if (currentScrollY > lastScrollY && currentScrollY + windowHeight >= document.body.offsetHeight - 100) {
        fetchGames();
    }

    lastScrollY = currentScrollY;
});

fetchGames();
