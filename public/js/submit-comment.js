document.getElementById('commentForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const gameId = this.dataset.gameid;
    const commentText = this.elements['commentText'].value;

    console.log('Submitting comment:', { gameId, commentText });

    fetch(`/game-review/${gameId}/post-comment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            commentText: commentText
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        // Update the comment list with the new comment
        const commentListElement = document.getElementById('commentList');
        const newCommentDiv = document.createElement('div');
        newCommentDiv.classList.add('comment', 'bg-gray-800', 'bg-opacity-50', 'p-4', 'rounded', 'mt-2');
        
        // Assume the username is a property of the newComment object
        // The actual property name will depend on how your server sends the username
        const username = data.newComment.username || 'Anonymous'; // Fallback to 'Anonymous' if username is not provided

        newCommentDiv.innerHTML = `
            <p class="text-gray-300">${data.newComment.comment_text}</p>
            <p class="text-white font-bold">${username}</p> <!-- Display the actual username -->
        `;
        commentListElement.appendChild(newCommentDiv);
        
        // Clear the form for the next comment
        this.reset();
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
});
