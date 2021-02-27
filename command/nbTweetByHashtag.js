const { validParsedTweets } = require('../function/getAllTweets');
const color = require('colors');

const dateFnsIsWithinInterval = require('date-fns/isWithinInterval');
const { parseDate } = require('../function/date');
const {createChart} = require('../function/createChart');
const { createDir } = require('../function/createDir');
const fs = require('fs');
/**
 * Indicateur numéro 1
 * Donner le nombre de tweets sur un hashtag par journée, et sur une période donnée.
 * |date|nB de tweet|
 * |***|************|
 */
module.exports = {
    getNbTweetByHashtagAndByDates: async function ({ options }) {
        let tweetArr = validParsedTweets();
        console.log(options.hashtag + " eee");
        const hashtagWanted = options.hashtag;
        
        try{
            // check and correct the date if we need it
            const periodBeginDate = parseDate(options.beginDate) != "Invalid Date" ? parseDate(options.beginDate) : new Date(0);
            const periodEndDate = parseDate(options.endDate)!= "Invalid Date" ? parseDate(options.endDate) : new Date();
            
            const filteredDate = tweetArr.filter((tweet) => 
                dateFnsIsWithinInterval(tweet.created_at, {
                    start: periodBeginDate,
                    end: periodEndDate,
                })
            );
            
            try {
                // check if the user enter a specific hashtag
                const filteredTweets = hashtagWanted != "all" ? filteredDate.filter(tweet => tweet.hashtags == `#${hashtagWanted}`) : filteredDate;
                const numberOfTweets = filteredTweets.length
                if (numberOfTweets == 0){
                    console.log("Oops !".yellow +" This hashtag doesn't exist yet. (Try EAW18 for example)");
                }else{
                    // we write the output in the console, in a chart and in a txt file

                    console.log(`There ${numberOfTweets > 1 ? 'are' : 'is'} ${color.cyan(numberOfTweets)} tweet${numberOfTweets > 1 ? 's' : ''} ${ (hashtagWanted != "all") ?  (" with the hashtag '" + hashtagWanted + "'") : " with all the hashtags" },
                    between the : ${color.cyan(periodBeginDate)} and the ${color.cyan(periodEndDate)}.`);

                    const mapTable = mapEveryDayTable(filteredTweets);
                    console.table(mapTable);
                    createDir('./nbrTweetByHashtag');
                    createChart("nbrTweetByHashtag", "nbrTweetByHashtag",  mapToVegaSpec(mapTable, "Number Tweets for #" + hashtagWanted));
                   
                    const msg = `There ${numberOfTweets > 1 ? 'are' : 'is'} ${numberOfTweets} tweet${numberOfTweets > 1 ? 's' : ''}${ hashtagWanted != "all" ?  " with the hashtag '" + hashtagWanted + "'" : " with all the hashtags" },
                    between the : ${periodBeginDate} and the ${periodEndDate}.\n`;

                    mapToTxtFile(mapTable, "./nbrTweetByHashtag/nbrTweet.txt",msg);

                }               
            } catch (error) {
                console.log("The .csv file contains error".red);
                console.error(error);
            }
    
        } catch(error) {
            console.log('Be careful !'.yellow +' The dates format is not correct. You should use this format : "YYYY-MM-DD HH:MM"'.cyan);
            console.log('And do not forget to put the dates in order.'.cyan);
        }
    }
}

function mapEveryDayTable(filteredTweets){
    const map = new Map();
    
    filteredTweets.forEach((tweet) => {
        const dayNumber = tweet.created_at.getDay();
        const day = numbersToDay[dayNumber]
        if(map.has(day)) {
            return map.set(day, map.get(day)+1)
        }
        return map.set(day, 1)
    })
    

    return map;
}

function mapToTxtFile(map, fileNamePath, inMsg){

    const stream = fs.createWriteStream(fileNamePath);
    //stream.write(`There ${numberOfTweets > 1 ? 'are' : 'is'} ${numberOfTweets} tweet${numberOfTweets > 1 ? 's' : ''} with the hashtag '${hashtagWanted}',
    //between the : ${options.beginDate} and the ${options.endDate}.`)

    stream.write(inMsg);
    map.forEach((value, day) => {

        stream.write('\n' + day + " : " + value);
    });

    stream.end();
}

function mapToVegaSpec(map, title){

    var preJson = new Array();
    var temp = {};
    map.forEach((value, day) => {

        temp["day"] = day;
        temp["value"] = value;
        preJson.push(temp);
        temp = {};
    });

    const jsonArray = JSON.stringify(preJson);

    // we return the data to be able to create a new Chart
    const dataVega = {

        "title" : title,
			"data" : {
					"values" : jsonArray,		
			},
            "mark": "bar",
            "encoding": {
              "x": {"field": "day", "type": "nominal"},
              "y": {"field": "value", "type": "quantitative"}
            ,
             "color" : 
             {
                "field" : "value", "type" :"nominal","scale": {"scheme": "bluegreen"}, "title": "Number"   
            }
          }
    }
    return dataVega;
}


const numbersToDay = Object.freeze({
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
})
