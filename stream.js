const fs = require('fs')

const utils = require('./utils')

function streamToFs(twitterClient, hashtag) {
  twitterClient.stream('statuses/filter', { track: hashtag }, stream => {
    let now = new Date()
    let secondsSinceEpoch = Math.round(now.getTime() / 1000)
    let filename = `./streamOutput/${secondsSinceEpoch}_${hashtag}_tweets.log`
    var fileStream = fs.createWriteStream(filename, { flags: 'a' })
    var counter = 0

    console.log(`Starting to stream tweets with hashtag ${hashtag}`)

    stream.on('data', async tweet => {
      console.log(
        `\n 🐦 = New Tweet from @${tweet.user.screen_name} - ${tweet.text}`
      )

      fileStream.write(tweet.id + '\n')
      counter++

      if (counter == 10) {
        // close current file
        fileStream.end()

        let bestsFile = await utils.findBestTweets(
          twitterClient,
          filename,
          hashtag
        )
        //RT + like tweets
        await utils.interactWithTweets(twitterClient, bestsFile)
        // start a new file
        now = new Date().toString()
        secondsSinceEpoch = Math.round(now.getTime() / 1000)
        filename = `./streamOutput/${secondsSinceEpoch}_${hashtag}_tweets.log`
        fileStream = fs.createWriteStream(filename, {
          flags: 'a'
        })
        counter = 0
      }
    })
  })
}

module.exports = { streamToFs }
