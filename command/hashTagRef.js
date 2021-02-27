const fs = require('fs')
const {validParsedTweets} = require('../function/getAllTweets');
const {createDir} = require('../function/createDir');
const path = require('path');
const Hashtify = require('../function/hashtify');
const {createChart} = require('../function/createChart');


module.exports={
    getHashTagRef : async function (args){
        var tweetArr = validParsedTweets();
        var HashtifyArr = new Array();
        var HashtifyArr_Sorted = new Array();
        var find = false;
        var idxRmd = 0; 
        //On regarde si le hashtag de reference existe et on retient l'index où on l'a trouvé
        for(var i = 0; i < tweetArr.length; i++){
            if(tweetArr[i].hashtags.includes(args)){
                find  = true;
                idxRmd = i;
                break;
            }
        }
        //si le hashtag existe, on retient les hashtags associés et leur occurence
        var here = false;
        if(find){
            for(var i = idxRmd; i < tweetArr.length; i++){
                var hashtagArr = tweetArr[i].hashtags;
                if(hashtagArr.includes(args) && hashtagArr.length > 1){
                    hashtagArr.forEach(el => {
                        if(el !== args){
                            if(HashtifyArr.length == 0){
                                HashtifyArr.push(new Hashtify(el));
                            }else{
                                for(var k = 0; k < HashtifyArr.length; k++){
                                    if(HashtifyArr[k].hashtag == el){
                                        here = true;
                                        HashtifyArr[k].count++;
                                    }
                                } 

                                if(!here){
                                    HashtifyArr.push(new Hashtify(el));
                                }
                            }

                        }
                    });
                }   
            }
            //trier le hashtifyarr
            for( i = 0;i < HashtifyArr.length;i++){
                var max = 0;
                var flag = 0;
                max = HashtifyArr[0].count;
                for( j = 0;j < HashtifyArr.length;j++){
                    if(max < HashtifyArr[j].count && !HashtifyArr_Sorted.includes(HashtifyArr[j])){
                        max = HashtifyArr[j].count;
                        flag = j;
                    }
                } 
                HashtifyArr_Sorted[i] = HashtifyArr[flag];
            }
            
            const filePath = path.join(__dirname, '../TopTens');
            //will create the directory if it doesn't exist
            createDir(filePath);

            const fileNamePath = path.join(filePath, '/HashtagAssociate' + args+'.txt');
            var i = 1;
            var stream = fs.createWriteStream(fileNamePath);
            stream.write("Reference Hashtag Associate: " + args + "\n\n");
            HashtifyArr_Sorted.forEach( (hashObj) => {
                stream.write(i + '.\n' + stringifyObj(hashObj) + "\n");
                i++;
            });
        
            stream.end();
            console.log(HashtifyArr_Sorted);

            // now for the chart 
            const dataVega_bar = {

                "title" : "Hashtag Associate" + args,
                    "data" : {
                            "values" : HashtifyArr_Sorted,		
                    },
                    "mark": "bar",
                    "encoding": {
                      "x": {"field": "hashtag", "type": "nominal", "title" : "Hashag Associate"},
                      "y": {"field": "count", "type": "quantitative", "title" : "Count"}
                    ,
                     "color" : 
                     {
                        "field" : "count", "type" :"nominal","scale": {"scheme": "bluegreen"}, "title": "Count"   
                    }
                  }
            }
           createChart('TopTens',"HashtagAssociate_Bar" + args, dataVega_bar);

            const dataVega_Donut = {

                "title" : "Hashtag Associate" + args,
                    "data" : {
                            "values" : HashtifyArr_Sorted,		
                    },
                    "mark": {"type": "arc", "innerRadius": 50},
                    "encoding": {
                        "theta": {"field": "count", "type": "quantitative"},
                         "color": {"field": "hashtag", "type": "nominal"}
                    },
                "view": {"stroke": null}
            }
            createChart('TopTens',"HashtagAssociate_Proportion" + args, dataVega_Donut);

            

        }else{
            throw new Error("This hashtag doesn't exist. (Try #EAW18 for example)");
        }



    }
} 

const stringifyObj = (obj) => {
    const keys = Object.keys(obj);
    const values = Object.values(obj);
    let stringOutput = '';

    for(var i = 0; i < keys.length; i++){
        for(var j = 0; j < values.length; j++){
            if(i === j){
                stringOutput += keys[i] + ':' + values[i];
            }
        }
        stringOutput += '\n';
    }
    stringOutput += '\n';
    return stringOutput;
}



