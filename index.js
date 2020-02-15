const config = require('./config')

const Twitter = require('twitter')
const twitterClient = new Twitter(config)

const streamUtils = require('./stream')

streamUtils.streamToFs(twitterClient, '#motivation')

/**
 * If your Twitter API credentials allow you to run multiple streams,
 * consider the example below
 * 
const hashtags = ['#motivation', '#lifegoals', '#habits']
hashtags.forEach(tag => {
  streamUtils.streamToFs(twitterClient, tag)
})

*/
