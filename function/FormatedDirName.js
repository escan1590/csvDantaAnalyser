var FDirName = function(month,dayNum){
    if(dayNum <= 31 && dayNum >=1){
        this.dayNum =  dayNum ;
    }else{
        this.dayNum = -1;
    }

    if(month.includes('jan')){
        this.month = 1;
    }else if(month.includes('feb')){
        this.month = 2;
    }else if(month.includes('mar')){
        this.month = 3;
    }else if(month.includes('apr')){
        this.month = 4;
    }else if(month.includes('may')){
        this.month = 5;
    }else if(month.includes('jun')){
        this.month = 6;
    }else if(month.includes('jul')){
        this.month = 7;
    }else if(month.includes('aug')){
        this.month = 8;
    }else if(month.includes('sep')){
        this.month = 9;
    }else if(month.includes('oct')){
        this.month = 10;
    }else if(month.includes('nov')){
        this.month = 11;
    }else if(month.includes('dec')){
        this.month = 12;
    }

}

module.exports = FDirName;