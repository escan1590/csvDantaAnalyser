const color = require('colors');

module.exports = {
    //filtration of tweets
    filtration: function (tweets, options, logger) {

        var filtredtweets = [];
        
        //node index extractTweet -p France -i 975508974836633601 -a Elise --idAuthor @Lizy1984 -t #TRIFORCE -l en 
        //-k hope --dateMin "2018-03-19 00:07:18 +0100" --dateMax "2018-03-19 00:07:18 +0100"
        for (let i=0;i<tweets.length;i++) {
            //check the place where the user lives
            if(options.place && tweets[i].user_location.indexOf(options.place) == -1) continue;
            //check the author
            if(options.author && tweets[i].user_name.indexOf(options.author) == -1) continue;
            //check the id of the author
            if(options.idAuthor && tweets[i].user_screen_name.indexOf(options.idAuthor.replace('@','')) == -1) continue;
            //check the hashtag
            if(options.hashtag && options.hashtag.indexOf('#')==-1) options.hashtag = '#'+options.hashtag; //if necessary, rectifies the format
            if(options.hashtag && tweets[i].hashtags.indexOf(options.hashtag)) continue;
            //check the id of the tweet 
            if(options.idTweet && tweets[i].id != parseInt(options.idTweet)) continue;
            //check the language of the tweet
            if(options.lang && tweets[i].lang.indexOf(options.lang) == -1) continue;
            //check if the text contains the keyword
            if(options.keyword && tweets[i].text.indexOf(options.keyword) == -1) continue;


            //Retrieves the dates of the command options and the tweet
            var tweetDate = tweets[i].created_at;
            var dateMin, dateMax;
            if (options.dateMin) dateMin = new Date(options.dateMin);
            if (options.dateMax) dateMax = new Date(options.dateMax);

            //Warns the user if the dates are in the wrong order
            if (!(String(dateMin) == 'Invalid Date' || String(dateMax) == 'Invalid Date') && options.dateMin > options.dateMax) {
                logger.error('The dates are in the wrong order!');
            }

            //Check the dateMin condition
            if (String(dateMin) == 'Invalid Date') {
                console.log("Oops! The --dateMin option is invalide, so it has been ignored.".yellow);
            }
            else if (dateMin>tweetDate) {
                //dateMin condition not satisfied
                continue;
            }

            //Check the dateMax condition
            if (String(dateMax) == 'Invalid Date') {
                console.log("Oops! The --dateMax option is invalide, so it has been ignored.".yellow);
            }
            else if (tweetDate>dateMax) {
                //dateMax condition not satisfied
                continue;
            }

            filtredtweets.push(tweets[i]) //executed if none of the 'continue' was been triggered
        }
        
        if (filtredtweets.length==0) console.log("No results found.".yellow);

        return filtredtweets;
    }
}