export const DateHelper = {
    getTodayTimestamp : function(){
        return (new Date()).getTime();
    },
    getTimestampFromDateString: function(s){
        return (new Date(s)).getTime();
    },
    getTodayDate: function(){
        var d = new Date();
        return this.getFormattedDate(d);
    },
    prependZero(n){
        if(n<10)    return "0"+n;
        return n;
    },
    getFormattedDate: function(d){
        return d.getFullYear()+"-"+this.prependZero(d.getMonth()+1)+"-"+this.prependZero(d.getDate());
    },
    getDateFromTimestamp: function(t){
        if(isNaN(parseInt(t))===false){
            return (new Date(parseInt(t)));
        }
        return new Date();
    },
    getFormattedDateFromTimestamp: function(t){
        return this.getFormattedDate(this.getDateFromTimestamp(t));
    },
    todayPlusTen: function(){
        var daysToAdd = 10;
        var d = new Date((new Date()).getTime() + daysToAdd*24*60*60*1000);
        return d.getTime();
    }
}