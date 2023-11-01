let titleAdded = false; // Add a flag variable

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await axios.get('/gameroutes/games');
        const games = response.data.results;
        const gameCardsContainer = document.getElementById('gameCards');

        // Check if the title has been added
        if (!titleAdded) {
            const titleElement = document.createElement('h2');
            titleElement.textContent = 'Popular Games';
            titleElement.className = 'text-3xl text-center text-white font-semibold mt-4 mb-4';
            gameCardsContainer.parentNode.insertBefore(titleElement, gameCardsContainer);
            titleAdded = true; // Set the flag to true
        }

        games.forEach((game) => {
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

                gameDetails.appendChild(gameTitle);
                gameCard.appendChild(gameImage);
                gameCard.appendChild(gameDetails);

                gameCardsContainer.appendChild(gameCard);
            }
        });
    } catch (error) {
        console.error('Error fetching game data:', error);
    }
});
