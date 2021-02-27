const fs = require('fs');
const path = require('path');
const { createDir } = require('../function/createDir');
const { validParsedTweets } = require('../function/getAllTweets');
const { minimalObj } = require('../function/minimalizeObj');
const { filtration } = require('../function/filtrationSearch');
const color = require('colors');

module.exports = {
    tweetExtraction: async function (fileName, options, logger) {
        var arrTweets = validParsedTweets();

        var arrTweetFiltred = [];
        arrTweetFiltred = filtration(arrTweets, options, logger);

        const filePath = path.join(__dirname, '../extractedTweets');
        //will create the directory if it doesn't exist
        createDir(filePath);

        const fileNamePath = path.join(filePath, `/${fileName}.txt`);
        var i = 1;

        var stream = fs.createWriteStream(fileNamePath);
        arrTweetFiltred.forEach((tweet) => {
            stream.write(i + '.\n' + stringifyObj(minimalObj(tweet)) + "\n");
            i++;
        });
        stream.end();

        console.log(`\nTweets extracted as ./extractedTweets/${fileName}.txt.`.green);
    }
}

const stringifyObj = (obj) => {
    const keys = Object.keys(obj);
    const values = Object.values(obj);
    let stringOutput = '';

    for (var i = 0; i < keys.length; i++) {
        for (var j = 0; j < values.length; j++) {
            if (i === j) {
                stringOutput += keys[i] + ':' + values[i];
            }
        }
        stringOutput += '\n';
    }
    stringOutput += '\n';
    return stringOutput;
}