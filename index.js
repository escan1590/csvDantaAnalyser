const fs = require('fs');
const {getTopTenTweet} = require('./command/Top10Tweet');
const {getTopTenAuthor} = require('./command/Top10Author');
const cli = require("@caporal/core").default;
const {visualFold} = require('./command/visualOp');
const {getHashTagRef} = require('./command/hashTagRef');
const {topTenHashtag} = require('./command/topTenHashtag');
const {getNbTweetByHashtagAndByDates} = require('./command/nbTweetByHashtag');
const {visuali} = require('./command/visualOpAdv');
const {validParsedTweets} = require('./getAllTweets');
cli
	.version('csv-parser-cli')
	.version('0.18')
	// check csv
	.command('parsedTweets', 'return parsed tweets')
	.option('-s, --showSymbols', 'log the analyzed symbol at each step', { validator : cli.BOOLEAN, default: false })
	.option('-t, --showTokenize', 'log the tokenization results', { validator: cli.BOOLEAN, default: false })
	.action(({args, options, logger}) => {
		
		fs.readFile(args.file, 'utf8', function (err,data) {
			if (err) {
				return logger.warn(err);
			}
	  
			var analyzer = 
			analyzer.parse(data);
			
			if(analyzer.errorCount === 0){
				logger.info("The .csv file is a valid csv file".green);
			}else{
				logger.info("The .csv file contains error".red);
			}
		});
			
	})

	.command('viz-fd', 'used to visualize all the tweets in a folder')
	.action(visualFold)
	
	// viz-fld 'dayNum' 'monthString' 'dayNum' 'monthString' quotes are importants 
	.command('viz-fld', 'used to visualize all the tweets in a folder. The date in your data folder must be formated as "ddd mmm jj" exp: Mon Mar 28. Warning: Arguments are optionnal but if you do put one of them. precise the rest of them if not the command will generate an error')
	.argument('<minDay>','minimum day for the search\nex: 19')
	.argument('<minMonth>','minimum month for the search\nex: Mar')
	.argument('<maxDay>','maximum day for the search\nex: 26')
	.argument('<maxMonth>', 'maximum month for the search\nex: Apr')
	.action(({args}) => {
		visuali(args.minDay,args.minMonth, args.maxDay, args.maxMonth);
	})
	
	//topTenTweet '#hashtagName' quotes are important
	.command('topTenTweet', 'used to visualize the top ten tweet with most users ')
	.argument('<hashtag>', 'hashtag to make search about')	
	.action(({args}) => {
		getTopTenTweet(args.hashtag);
	})

	//topTenAuthor '#hashtag' quote is important
	.command('topTenAuthor', 'used to visualize the top ten Author with a most certain hashtag and the most retweet ')
	.argument('<hashtag>', 'hashtag to make search about')	
	.action(({args}) => {
		getTopTenAuthor(args.hashtag);
	})
	
	.command('nbTweetHashtag', 'get the number of tweets via one hashtag and between 2 dates')
	/*.argument('<hashtag>', 'hashtag to look into')
	.argument('<beginDate>', 'the start of the period to analyse, formated as following: "YYYY-MM-DD HH:MM"')
	.argument('<endDate>', 'the end of the period to analyse, formated as following: "YYYY-MM-DD HH:MM"')*/
	.option('--hashtag', "hashtag to look into default all", {validator: cli.STRING, default : "all"})
	.option('--beginDate', 'the start of the period to analyse, formated as following: "YYYY-MM-DD HH:MM', {validator: cli.STRING})
	.option('--endDate', 'the end of the period to analyse, formated as following: "YYYY-MM-DD HH:MM', {validator: cli.STRING})
	.action(getNbTweetByHashtagAndByDates)


	.command('topTenHashtag', 'return the top ten of the hashtags from the ./data ')
	.option('--dateMin', 'the minimum emission date of the tweet\nformat: "2018-03-19 00:07:18 +0100", "2018-03-19" and "2018-03-19 00:07" are licit', {validator: cli.STRING})
	.option('--dateMax', 'the maximum emission date of the tweet\nformat: "2018-03-19 00:07:18 +0100", "2018-03-19" and "2018-03-19 00:07" are licit', {validator: cli.STRING})
	.option('--nbr', "allows to change the number of hashtag in the top\n default: 10", {validator: cli.STRING})
	.action(({options}) => {
		topTenHashtag(options);
	})



	//refHash '#hashtagName' quotes are important
	.command('refHash', 'used to find the hashtags associated with the reference one, in addition, gives their occurence')
	.argument('<hashtag>', 'hashtag parameter used as reference\nex: #EAW18')
	.action(({args}) => {
		getHashTagRef(args.hashtag);
	})

	//Find one or more tweets according to search criteria.
	//node index searchTweet --dateMin 2000-01-01 --dateMax 2020-01-01 -k miel -t #EAW18 -i 007 -a James --idAuthor @bond -l en -p London
	.command('searchTweet', 'find one or more tweets according to search criteria')
	.option('--dateMin', 'the minimum emission date of the tweet\nformat: "2018-03-19 00:07:18 +0100", "2018-03-19" and "2018-03-19 00:07" are licit', {validator: cli.STRING})
	.option('--dateMax', 'the maximum emission date of the tweet\nformat: "2018-03-19 00:07:18 +0100", "2018-03-19" and "2018-03-19 00:07" are licit', {validator: cli.STRING})
	.option('-k, --keyword', 'keyword searched in the text of the tweet', {validator: cli.STRING})
	.option('-t, --hashtag', 'a restriction hashtag\nformat: "#EAW18" or "EAW18" are licit', {validator: cli.STRING})
	.option('-i, --idTweet', 'the identifier of the tweet', {validator: cli.STRING})
	.option('-a, --author', 'the person who wrote the tweet', {validator: cli.STRING})
	.option('--idAuthor', 'the identifier of the author\nformat: "@caramel" and "caramel" are licit', {validator: cli.STRING})
	.option('-l, --lang', 'the language of the user\nformat: "en", "fr" or "se" are licit', {validator: cli.STRING})
	.option('-p, --place', 'the place where the author lives', {validator: cli.STRING})
	.action(({options, logger}) => {
		getSearchResult(options, logger);
	})

	//Extract the result of a research
	.command('extractTweet', 'extracts tweets according to search criteria')
	.option('-f, --fileName', 'the name of the .txt file', {validator: cli.STRING, default: "search_result_(default file)"})
	.option('--dateMin', 'the minimum emission date of the tweet\nformat: "2018-03-19 00:07:18 +0100", "2018-03-19" and "2018-03-19 00:07" are licit', {validator: cli.STRING})
	.option('--dateMax', 'the maximum emission date of the tweet\nformat: "2018-03-19 00:07:18 +0100", "2018-03-19" and "2018-03-19 00:07" are licit', {validator: cli.STRING})
	.option('-k, --keyword', 'keyword searched in the text of the tweet', {validator: cli.STRING})
	.option('-t, --hashtag', 'a restriction hashtag\nformat: "#EAW18" or "EAW18" are licit', {validator: cli.STRING})
	.option('-i, --idTweet', 'the identifier of the tweet', {validator: cli.STRING})
	.option('-a, --author', 'the person who wrote the tweet', {validator: cli.STRING})
	.option('--idAuthor', 'the identifier of the author\nformat: "@caramel" and "caramel" are licit', {validator: cli.STRING})
	.option('-l, --lang', 'the language of the user\nformat: "en", "fr" or "se" are licit', {validator: cli.STRING})
	.option('-p, --place', 'the place where the author lives', {validator: cli.STRING})
	.action(({options, logger}) => {
		tweetExtraction(options.fileName, options, logger);
	})

cli.run(process.argv.slice(2));
