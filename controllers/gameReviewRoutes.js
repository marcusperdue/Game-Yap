const express = require('express');
const axios = require('axios');
const router = express.Router();
const Comment = require('../models/Comment');
const Post = require('../models/Post'); 
const User = require('../models/User');
const withAuth = require('../utils/auth')

router.get('/:gameId', async (req, res) => {
  try {
     const gameId = req.params.gameId;
     const loggedIn = req.session.loggedIn;
 
     const response = await axios.get(`https://api.rawg.io/api/games/${gameId}`, {
       params: {
         key: process.env.RAWG_API_KEY,
       },
     });
 
     const gameData = response.data;
 
     if (!gameData || gameData.error) {
       console.error('Error fetching game details from RAWG API:', gameData.error || 'Unknown error');
       return res.status(404).render('error', { message: 'Game not found' });
     }
 
     const gameTitle = gameData.name;
     const gameSummary = gameData.description;
     const gameImage = gameData.background_image;
 
     const post = await Post.findOne({ where: { external_game_id: gameId } });
    
     // Fetch comments and include the User model to get the username
     let comments = [];
     if (post) {
       comments = await Comment.findAll({
         where: { post_id: post.id },
         include: [
           {
             model: User,
             attributes: ['username'], // Ensure 'username' matches the column name in the User table
           }
         ],
         order: [['created_at', 'DESC']], // This will ensure the newest comments are first
       });
     
       // Map over comments to format for the view
       comments = comments.map(comment => {
         return {
           text: comment.comment_text,
           username: comment.user ? comment.user.username : 'Anonymous',
           createdAt: comment.created_at
         };
       });
     }
 
     // Render the page with the comments included
     res.render('game-review', {
       gameTitle: gameData.name,
       gameSummary: gameData.description,
       gameImage: gameData.background_image,
       gameId,
       textClass: 'text-xs',
       loggedIn,
       comments, // Pass the comments array to the view
     });
   } catch (error) {
     console.error('Network error:', error);
     res.status(500).render('error', { message: 'Internal server error' });
   }
 });

 
 
 
 router.post('/:gameId/post-comment', withAuth, async (req, res) => {
  if (!req.session.loggedIn) {
    return res.status(401).json({ error: 'Unauthorized. Please sign in to comment.' });
  }

  const { commentText } = req.body;
  const externalGameId = req.params.gameId;

  if (!commentText) {
    return res.status(400).json({ error: 'Comment text is required.' });
  }

  try {
    // Find or create the post record based on the external game ID
    let post = await Post.findOne({ where: { external_game_id: externalGameId } });
    if (!post) {
      // If the post doesn't exist, create it
      post = await Post.create({ 
        title: 'Title based on game data', 
        content: 'Content based on game data', 
        external_game_id: externalGameId,
        user_id: req.session.userId, // or some default user ID
      });
    }

    // Now use the internal post ID to create the comment
    const newComment = await Comment.create({
      comment_text: commentText,
      user_id: req.session.userId,
      post_id: post.id,
    });

    // Fetch the username of the commenter
    const user = await User.findByPk(req.session.userId, {
      attributes: ['username']
    });

    // Include the username in the response
    const responseData = {
      message: 'Comment posted successfully.',
      newComment: {
        ...newComment.get({ plain: true }),
        username: user.username  // Include the username
      }
    };

    res.status(201).json(responseData);
  } catch (error) {
    console.error('Error posting comment:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});


 
module.exports = router;