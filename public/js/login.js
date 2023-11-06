document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logout');
  if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
      try {
        console.log('Sending logout request...');
        const response = await axios.post('/logout');
        
        if (response.status === 200) {
          console.log('Logout successful');
          window.location.reload(); // Reload the page for demonstration
        } else {
          console.log('Logout request did not return 200 status:', response.status);
        }
      } catch (error) {
        console.error('Logout error:', error);
      }
    });
  }
});
