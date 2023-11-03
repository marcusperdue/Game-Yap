document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const gameResultsElement = document.getElementById('game-results');
  
    if (searchForm && searchInput && gameResultsElement) {
      searchForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent the form from submitting in the traditional way
  
        const searchQuery = searchInput.value.trim();
  
        try {
          // Make an AJAX GET request to your server's search endpoint
          const response = await axios.get(`/search?query=${encodeURIComponent(searchQuery)}`);
          const games = response.data.gameResults;
  
          // Clear previous search results
          gameResultsElement.innerHTML = ''; // Use innerHTML to clear content
  
          // Populate the game names and images in the HTML structure
          if (games && games.length > 0) {
            games.forEach((game) => {
              const gameCard = document.createElement('div'); // Create a card for each game
              gameCard.className = 'game-card';
  
              const gameImage = document.createElement('img'); // Create an image element
              gameImage.src = game.image; // Set the image source from the game data
              gameImage.alt = game.name; // Set alt text to the game name
              gameCard.appendChild(gameImage); // Append the image to the card
  
              const gameNameElement = document.createElement('p'); // Create a paragraph element for the game name
              gameNameElement.textContent = game.name; // Set the text content to the game name
              gameCard.appendChild(gameNameElement); // Append the name to the card
  
              gameResultsElement.appendChild(gameCard); // Append the card to the results element
            });
          } else {
            gameResultsElement.textContent = 'No games found.';
          }
        } catch (error) {
          console.error('Error performing search:', error);
        }
      });
    }
  });
  