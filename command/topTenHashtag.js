
//  this function return in the console the top ten of the hashtags from the ./data
const { validParsedTweets } = require('../function/getAllTweets');
const {parseDate} = require('../function/date');
const color = require('colors');
const {createChart} = require('../function/createChart');
const path = require('path');
const fs = require('fs');
const {createDir} = require('../function/createDir');

module.exports ={

    topTenHashtag : async function(args){
        
        // initialize the different variables 
        var hashtagsCount = new Array();
        var topHash = new Array();
        const topN = parseInt(args.nbr) ? parseInt(args.nbr) : 10;
        const dateStart = parseDate(args.dateMin) != "Invalid Date" ? parseDate(args.dateMin) : new Date(0);
        const dateEnd = parseDate(args.dateMax) != "Invalid Date" ? parseDate(args.dateMax) : new Date();
        const date = {dateStart : dateStart ,dateEnd : dateEnd};
        
        validParsedTweets().forEach(ele =>{
            
            // first we check date and if we have a hashtag
            if(ele.created_at > date.dateStart && ele.created_at < date.dateEnd){
              
                ele.hashtags.forEach(newHashtag => {
                    const indexhashtags = hashtagsCount.findIndex(hash => hash.hashtag.includes(newHashtag.toLowerCase()));
                    if(indexhashtags != -1){
                        hashtagsCount[indexhashtags].number++;
                    }else{
                        hashtagsCount.push(new hashtagNbr(newHashtag.toLowerCase()));
                    }                  
                });
            }
        });

        // now the top ten
  
        hashtagsCount.forEach(ele =>{
            if(topHash.length < topN){
                topHash.push(ele);
            }else{
                const indexToChange = topHash.findIndex(nbr => nbr.number < ele.number );
                if(indexToChange != -1){
                    topHash[indexToChange] = ele;
                }
            }

        })
        
        // we sort the array
        const topHashSorted = topHash.sort(function(a, b) {
            if (a.number > b.number) {
              return -1;
            }
            if (a.number < b.number) {
              return 1;
            }
            return 0;
          });


        const filePath = path.join(__dirname, '../TopTens');
        //will create the directory if it doesn't exist
        createDir(filePath);

        const fileNamePath = path.join(filePath, '/HashtagsTop' + topN+'.txt');
        var i = 1;
        var stream = fs.createWriteStream(fileNamePath);
        stream.write("Hashtag Top " + topN +" :" + "\n\n");
        topHashSorted.forEach( (hash) => {
            stream.write("Hashtag : " + hash.hashtag  + ", number :" + hash.number+ "\n");
            i++;
        });
    
        stream.end();
        console.log(topHashSorted);
        // now for the chart 
        const dataVega_bar = {

            "title" : "Hashtag Top " + topN,
                "data" : {
                        "values" : topHashSorted,		
                },
                "mark": "bar",
                "encoding": {
                    "x": {"field": "hashtag", "type": "nominal", "title" : "Hashtag Name"},
                    "y": {"field": "number", "type": "quantitative", "title" : "Count"}
                ,
                    "color" : 
                    {
                    "field" : "number", "type" :"nominal","scale": {"scheme": "bluegreen"}, "title": "Count"   
                }
                }
        }
        createChart('TopTens',"Hashtag_Top_" + topN, dataVega_bar);


        

    }

}

const hashtagNbr = function(hashtag){
    this.hashtag = hashtag;
    this.number = 1;
}