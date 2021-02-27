const { validParsedTweets } = require('../function/getAllTweets');
const { minimalObj } = require('../function/minimalizeObj');
const { filtration } = require('../function/filtrationSearch');

module.exports = {
    getSearchResult: async function (options, logger) {
        var tweetArr = validParsedTweets();

        var filtredTweet = [];
        filtredTweet = filtration(tweetArr, options, logger);

        var i = 1;
        filtredTweet.forEach((tweet) => {
            console.log(minimalObj(tweet));
            i++;
        });
    }
}