# TweetCatcher

A bot that stream tweets from a specific hashtag, writes them to file and then process the files to find the tweets with more likes/impressions/retweets

## Requirements
- A Twitter API key, secret, access token key and secret. Create a config.js file and include them:

```javascript
module.exports = {
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
}

```

## Installation and startup

- Run ``` npm i ``` to install all dependencies (just the twitter package)
- Modify the hashtag you want to stream in the index.js file:
```javascript
streamUtils.streamToFs(twitterClient, '#YOURHASHTAG')
```
- Run ```npm start``` to start streaming tweets


## How it works
- While running the program will create a new file in the streamOutput folder for each 100 tweets. The file will contain the tweet Id's of the tweets streamed for the choosen hashtag.

- Once 100 tweets Id's have been saved the file is closed and a new file is created.

- Once a file with 100 tweet Id's is closed, it's processed. The program will check the details of each tweet and calculate if its value based on the number of impressions, likes and retweets. 
- You can adjust the algorithm to calculate the tweeter value in the utils.js file.
- Tweets with a value higher than 5 will be saved in in a new file in the bests folder.


## Build wth
Node.js

# Author

Antonio Ufano - [uf4no.com]{https://uf4no.com}


