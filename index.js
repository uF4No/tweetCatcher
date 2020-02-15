const config = require('./config')

const Twitter = require('twitter')
const twitterClient = new Twitter(config)

const streamUtils = require('./stream')

let params = {
  result_type: 'recent',
  count: 10,
  q: 'motivation'
}

const hashtags = ['#motivation', '#lifegoals', '#habits']

streamUtils.streamToFs(twitterClient, '#habits')

// hashtags.forEach(tag => {
//   streamUtils.streamToFs(twitterClient, tag)
// })
