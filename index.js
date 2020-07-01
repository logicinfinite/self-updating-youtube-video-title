//const functions = require('firebase-functions');
const {google} = require('googleapis');

//exports.updateVideo = functions.pubsub.schedule('every 10 minutes').onRun(async () => {
  async function main()
  {
  const authClient = new google.auth.OAuth2({
    clientId: '643605803660-99dag1iji2gkdo4ibpu3qlpjrqupp1bv.apps.googleusercontent.com',
    clientSecret: 'BmphWA6Pd9_WZE0ABso9GN4J',
  });

  authClient.setCredentials({
    // in the video I used a sample (expired) token that will not work anymore
    refresh_token: '1//04-bfUhRrSaYnCgYIARAAGAQSNwF-L9IrwmctqARuBwZ1VoyUPMHvh1Rzknp9uU9IF9SqsH6jpH4xibF_EAL4qicW9eJ_pcr5bQQ',
  });

  const youtube = google.youtube({
    auth: authClient,
    version: 'v3',
  });

  const videoId = '_sNLV-oLm3k';

  const videoResult = await youtube.videos.list({
    id: videoId,
    part: 'snippet,statistics',
  });
console.log(JSON.stringify(videoResult, null,2,));


  const {statistics, snippet} = videoResult.data.items[0];

  const newTitle = `Self-Updating YouTube Video ! (Views: ${statistics.viewCount}, Likes: ${statistics.likeCount},Dislikes: ${statistics.dislikeCount},Comments: ${statistics.commentCount})`;
snippet.title=newTitle;
  console.log(newTitle);


  // this if statement helps to save on quota if the title has not changed


    await youtube.videos.update({
      part: 'snippet',
      requestBody: {
        id: videoId,
        snippet,
      },
    });
  

  console.log('Done!');
}
main();