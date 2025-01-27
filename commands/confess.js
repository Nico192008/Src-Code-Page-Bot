const pageAccessToken = "YOUR_PAGE_ACCESS_TOKEN"; // Replace with your Page Access Token
const axios = require("axios"); // Ensure you install axios: npm install axios

// Command: First argument is the command, and the rest is the text to post
const command = args[0];
const postContent = args.slice(1).join(" "); // Combine the rest of the args as the post content

// Validate inputs
if (command !== "post" || !postContent) {
  return api.sendMessage(
    "Error: Use the correct format. Example: 'post This is the message to post on the Page timeline.'",
    event.threadID
  );
}

// Function to post on the Page timeline
async function postToPage(message) {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/v16.0/me/feed`,
      {
        message: message,
      },
      {
        headers: { Authorization: `Bearer ${pageAccessToken}` },
      }
    );

    if (response.data.id) {
      api.sendMessage("The message has been successfully posted on the Page timeline.", event.threadID);
    } else {
      throw new Error("Failed to post the message.");
    }
  } catch (error) {
    console.error("Error posting to the Page:", error);
    api.sendMessage("An error occurred while posting to the Page timeline. Please try again later.", event.threadID);
  }
}

// Post to Page
postToPage(postContent);
      
