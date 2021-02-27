const VisuaKeep = require('../function/VisuaKeep');

const { validParsedTweets } = require('../function/getAllTweets');
const {createDir} = require('../function/createDir');
const {createChart} = require('../function/createChart');
module.exports={
    /**
     * Will visualize all the data in our data folder with vega and vega lite 
     * Unless you know what you do with it not recommanded. The graph is way too long
     */
    visualFold: function(){
            //Search for tweets with the right hashtag
           
                var tweetArr = validParsedTweets();
                var visuDataArr = new Array();

                if(tweetArr.length != 0){
                    var indexRmd = -1;
                    var i = 0;
                    do{
                        if(tweetArr[i].user_location != ''){
                            visuDataArr.push(new VisuaKeep(tweetArr[i].user_location));
                            indexRmd = i;
                        }else{
                            i++;
                        }
                    }while((tweetArr[i].user_location == '') || (i == tweetArr.length));
                    if(indexRmd == -1){
                        console.log("fichier sans regions d'utilisateur");
                    }else{
                        if(indexRmd != (tweetArr.length -1)){

                            //Check in
                            for(var j = (indexRmd+1); j < tweetArr.length; j++){
                                var present = false;
                                if(tweetArr[j].user_location != ''){
                                    for(var k = 0; k < visuDataArr.length; k++){
                                        if(tweetArr[j].user_location ==  visuDataArr[k].location ){
                                            visuDataArr[k].count++;
                                            present = true;
                                            break;
                                        }
                                    }
                                    if(!present){
                                        visuDataArr.push(new VisuaKeep(tweetArr[j].user_location));
                                    }
                                }
                            }

                            //collected data login
                            for(var d = 0; d < visuDataArr.length; d++){
                                console.log(visuDataArr[d]);
                            }
                                
                            const vlSpec = {
                                title : "Proportion Tweet pro Country", 
                                data : {
                                    values : visuDataArr
                                },
                                mark : 'bar',
                                encoding : {
                                    x : {field : 'location', type : 'nominal'},
                                    y : {field : 'count', type : 'quantitative'}
                                }
                            };
                            createDir("charts");
                            createChart("charts", "proportionCntyAll", vlSpec);
                            
                        }else{
                            //The last line is the only one containing a region and so proportion is one
                            visualDataArr.push(new VisuaKeep(tweetArr[indexRmd].user_location));
                            console.log(visualDataArr[0]);
                        }
                        
                    }
                }else{
                    logger.info("fichier vide");
                }
    }
}

