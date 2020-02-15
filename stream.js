const fs = require('fs')

const utils = require('./utils')

function streamToFs(twitterClient, hashtag) {
  twitterClient.stream('statuses/filter', { track: hashtag }, stream => {
    let now = new Date().toString()
    let filename = `./streamOutput/${now}_${hashtag}_tweets.log`
    var fileStream = fs.createWriteStream(filename, { flags: 'a' })
    var counter = 0

    console.log(`Starting to stream tweets with hashtag ${hashtag}`)

    stream.on('data', tweet => {
      console.log(
        `\n 🐦 = New Tweet from @${tweet.user.screen_name} - ${tweet.text}`
      )

      fileStream.write(tweet.id + '\n')
      counter++

      if (counter == 100) {
        // close current file
        fileStream.end()

        // utils.findBestTweets(twitterClient, filename, hashtag)

        // start a new file
        now = new Date().toString()
        filename = `./streamOutput/${now}_${hashtag}_tweets.log`
        fileStream = fs.createWriteStream(filename, {
          flags: 'a'
        })
        counter = 0
      }
    })
  })
}

function processFiles() {}

module.exports = { streamToFs }
