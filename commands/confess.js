const axios = require('axios');

module.exports = {
  name: 'post',
  description: 'Post a message to the page timeline',
  usage: 'post [your message]',
  author: 'your_name',

  async execute(senderId, args, pageAccessToken) {
    try {
      // Join all parts of the message provided by the user
      const userMessage = args.join(' ');

      // Ensure the message is not empty
      if (!userMessage.trim()) {
        await axios.post(`https://graph.facebook.com/v12.0/me/messages?access_token=${pageAccessToken}`, {
          recipient: { id: senderId },
          message: { text: 'Please provide a message to post on the timeline.' }
        });
        return;
      }

      // Send the message as a post on the page's timeline
      const { data } = await axios.post(`https://graph.facebook.com/v12.0/me/feed?access_token=${pageAccessToken}`, {
        message: userMessage
      });

      // Respond to the user after posting
      await axios.post(`https://graph.facebook.com/v12.0/me/messages?access_token=${pageAccessToken}`, {
        recipient: { id: senderId },
        message: { text: `Your message has been posted: "${userMessage}"` }
      });
    } catch (error) {
      console.error('Error posting to timeline:', error);
      await axios.post(`https://graph.facebook.com/v12.0/me/messages?access_token=${pageAccessToken}`, {
        recipient: { id: senderId },
        message: { text: 'Sorry, there was an error posting your message.' }
      });
    }
  }
};
