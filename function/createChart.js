const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const vg = require('vega');
const vl = require('vega-lite');
const {createDir} = require('./createDir');


module.exports = {

    createChart : function(folder, name, spec){


        const chartDir = path.join(__dirname, "../" + folder);
        createDir(chartDir);
        const pngFolderPath = path.join(chartDir , `/${name}.png`)
        const svgFolderPath = path.join(chartDir , `/${name}.svg`)
        
        let vegaSpec = vl.compile(spec).spec;
        var view = new vg.View(vg.parse(vegaSpec), {renderer : "none"});
    
        view
            .toSVG()
            .then((svg) => {
                view.finalize();
    
                fs.writeFileSync(svgFolderPath, svg);
    
                sharp(Buffer.from(svg))
                        .toFormat('png')
                        .toFile(pngFolderPath)
        }).catch(function(err){
            console.log(err);
        })

        console.log("Check !".green+ `Files are created in the directory './src/${folder}/${name}.png or .svg`.cyan);

    }

}
