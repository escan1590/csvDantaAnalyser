
const { validParsedTweets, allFile } = require('../function/getAllTweets');
const color = require('colors');
module.exports = {

    check : function(){

        const startDate = new Date();
        const nbrFolder = allFile().length;
        const nbrTweet = validParsedTweets().length;
        const endDate = new Date();

        console.log('We have found ' + color.green(nbrTweet)+ (nbrTweet < 2 ? " tweet in " : " tweets in ") + (nbrFolder > 1 ?  color.green(nbrFolder) +" differents folders" : "the folder " + color.cyan(allFile()[0])) + " from " + color.yellow("./data") +
        "\nIn " + color.yellow(endDate - startDate) + "ms." );

    }
   
}