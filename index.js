
const {google} = require('googleapis');


  async function main()
  {
  const authClient = new google.auth.OAuth2({
    clientId: 'Enter your own client id here',
    clientSecret: 'Enter your own client secret key here',
  });

  authClient.setCredentials({
    //  I used a sample (expired) token that will not work anymore
    refresh_token: 'enter  refresh token',
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
