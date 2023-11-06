let hasLoadedGames = false; // Add this variable to track if games have been loaded

window.addEventListener('DOMContentLoaded', async () => {
    if (!hasLoadedGames) {
        try {
            const response = await axios.get('/gameroutes/games');
            const games = response.data.results;
            const gameCardsContainer = document.getElementById('gameCards');

            if (Array.isArray(games)) {
                games.forEach((game) => {
                    if (game.background_image) {
                        const gameCard = document.createElement('div');
                        gameCard.className = 'game-card';

                        // Create a clickable link to the game review page
                        const gameLink = document.createElement('a');
                        gameLink.href = `/game-review/${game.id}`; // Set the correct URL
                        gameLink.className = 'block cursor-pointer';

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
                        gameLink.appendChild(gameImage);
                        gameLink.appendChild(gameDetails);
                        gameCard.appendChild(gameLink); // Append the link to the card

                        gameCardsContainer.appendChild(gameCard);
                        console.log(game);
                    }
                });
            } else {
                console.error('No game data found.');
            }

            // Set the flag to indicate that games have been loaded
            hasLoadedGames = true;
        } catch (error) {
            console.error('Error fetching game data:', error);

            // Display an error message to the user or handle the error gracefully
            // Example: gameCardsContainer.innerHTML = '<p>Error loading games.</p>';
        }
    }
});

