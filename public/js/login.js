document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logout');
  if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
      try {
        // Send a logout request to the server (AJAX request)
        const response = await axios.post('/logout');
        
        if (response.status === 200) {
          // Logout successful, reload the page or perform any other actions
          window.location.reload(); // Reload the page for demonstration
        }
      } catch (error) {
        console.error('Logout error:', error);
      }
    });
  }
});
