const fs = require('fs')

function calculateTweetValue(tweet) {
  let impress_multiplier = 0.1
  let retweet_multiplier = 3
  let like_multiplier = 1

  console.log(' tweet.impression_count :', tweet.impression_count)
  console.log(' tweet.retweet_count :', tweet.retweet_count)
  console.log(' tweet.like_count :', tweet.like_count)

  const res =
    tweet.impression_count * impress_multiplier +
    tweet.retweet_count * retweet_multiplier +
    tweet.like_count * like_multiplier
  console.log('Tweet value is :', res)

  return res
}

function findBestTweets(twitterClient, filename, hashtag) {
  // check tweets values
  var tweetsArray = fs
    .readFileSync(filename)
    .toString()
    .split('\n')
  let bests = []
  tweetsArray.forEach(element => {
    console.log(`Checking details of tweet ${element}`)
    twitterClient.get(
      'statuses/show',
      { id: element },
      (err, tweet, response) => {
        if (!err) {
          console.log(`Tweet details retrieved`)
          if (calculateTweetValue(element) > 5) {
            console.log(`FOUND GOOD TWEET: ${tweet.id}`)
            bests.push(tweet.id)
          }
        } else {
          console.log('err :', err)
        }
      }
    )
  })
  if (bests.length) {
    now = new Date().toString()
    bestsFile = `./bests/${now}_${hashtag}_tweets.log`
    // saves bests in new file
    fs.writeFileSync(bestsFile, bests)
    console.log(`Bests file saved with ${bests.length} items`)
  } else {
    console.log('No good Tweets found :(')
  }
  // deletes original file
  fs.unlinkSync(filename)
}

module.exports = { calculateTweetValue, findBestTweets }
