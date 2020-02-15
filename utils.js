const fs = require('fs')

function calculateTweetValue(tweet) {
  // let impress_multiplier = 0.1
  let retweet_multiplier = 3
  let like_multiplier = 1

  // console.log(' tweet.impression_count :', tweet.impression_count)
  console.log(' tweet.retweet_count :', tweet.retweet_count)
  console.log(' tweet.favorite_count :', tweet.favorite_count)

  const res =
    // tweet.impression_count * impress_multiplier +
    tweet.retweet_count * retweet_multiplier +
    tweet.favorite_count * like_multiplier
  console.log('Tweet value is :', res)

  return res
}

async function findBestTweets(twitterClient, filename, hashtag) {
  try {
    let bestsFile
    // check tweets values
    var tweetsArray = fs
      .readFileSync(filename)
      .toString()
      .split('\n')
    var bests = []
    for (let i = 0; i < tweetsArray.length; i++) {
      try {
        console.log(`Checking details of tweet ${tweetsArray[i]}`)
        // call to Twitter API to retrieve details
        const tweet = await twitterClient.get('statuses/show', {
          id: tweetsArray[i]
        })

        console.log(`Tweet details retrieved`)
        if (calculateTweetValue(tweet) > 0) {
          console.log(`FOUND GOOD TWEET: ${tweetsArray[i]}`)
          bests.push(tweetsArray[i] + '\n')
        }
      } catch (error) {
        console.log('error fetching tweet details :', error)
      }
    }

    if (bests.length) {
      now = new Date()
      const secondsSinceEpoch = Math.round(now.getTime() / 1000)
      bestsFile = `./bests/${secondsSinceEpoch}_${hashtag}_tweets.log`
      // saves bests in new file, each id in a line
      fs.writeFileSync(bestsFile, bests.join(''))
      console.log(`Bests file saved with ${bests.length} items`)
    } else {
      console.log('No good Tweets found :(')
    }
    // deletes original file
    // fs.unlinkSync(filename)

    // returns the filename
    return bestsFile
  } catch (error) {
    console.log('error finding bests :', error)
  }
}

async function interactWithTweets(twitterClient, filename) {
  try {
    // check tweets values
    var tweetsArray = fs
      .readFileSync(filename)
      .toString()
      .split('\n')
    for (let i = 0; i < tweetsArray.length; i++) {
      try {
        console.log(`Interacting with tweet ${tweetsArray[i]}`)
        twitterClient.post()
        const rt = await twitterClient.post('statuses/retweet', {
          id: tweetsArray[i]
        })
        const like = await twitterClient.post('favorites/create', {
          id: tweetsArray[i]
        })
      } catch (err) {
        console.error(`Error doing retweet/like`, err)
      }
    }
  } catch (error) {
    console.error(`Error reading bests file`, error)
  }
}

module.exports = { calculateTweetValue, findBestTweets, interactWithTweets }
