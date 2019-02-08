// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

/*
Function URL (helloWorld): https://us-central1-baymax-ai-5bfac.cloudfunctions.net/helloWorld
*/

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();
var arrayDiff = function(a,b) {
    return a.filter(function(i) {return b.indexOf(i) < 0;});
};


const DateHelper = {
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
    addDays: function(daysToAdd){
        var d = new Date((new Date()).getTime() + daysToAdd*24*60*60*1000);
        return d.getTime();
    },
	getFullDay: function(dayId){
		var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		return days[dayId];
	},
	chartFormatDate: function(d){
		return this.getFullDay(d.getDay())+" "+this.prependZero(d.getDate())+"/"+this.prependZero(d.getMonth()+1);
	}
};


exports.getDoneItems = functions.https.onRequest((request, response) => {
	return cors(request, response, ()=>{
		/*response.send(request.query.userid);*/
		let userid = request.query.userid;
		if(userid !== undefined && typeof userid === "string"){
			admin.database().ref('/lists/'+userid).once('value').then(function(snap){
				var lists = snap.val();
				var masterListIDs = Object.keys(lists);
				admin.database().ref('/items/'+userid).once('value').then(function (snap) {
					var listData = snap.val();
					var listIDs = Object.keys(listData);
					var emptyLists = arrayDiff(masterListIDs, listIDs);
					var listCountObject = {};
					var totalItems, doneItems;
					if(emptyLists.length > 0){
						for(var i in emptyLists){
							listCountObject[emptyLists[i]] = { totalItems: 0, doneItems: 0 };
						}
					}
					for(var i in listIDs){
						/*listCountObject[listID] = listIDs[listID]*/
						totalItems=0;
						doneItems=0;
						var listID = listIDs[i];
						var itemIDs = Object.keys(listData[listID]);
						/*listCountObject[listID] = itemIDs;*/
						totalItems = itemIDs.length;
						if(totalItems===0){
							doneItems = 0;
							listCountObject[listID] = { totalItems: totalItems, doneItems: doneItems };
							continue;
						}
						for(var j in itemIDs){
							var itemID = itemIDs[j];
							if(listData[listID][itemID].done === true){
								doneItems++;
							}
						}
						listCountObject[listID] = { totalItems: totalItems, doneItems: doneItems };
					}

					response.send(listCountObject);
				});
			});
		}	
	})
});

exports.getItemsCreatedLastMonth = functions.https.onRequest((request, response) => {
	return cors(request, response, ()=>{
		/*response.send(request.query.userid);*/
		let userid = request.query.userid;
		if(userid !== undefined && typeof userid === "string"){
			
			admin.database().ref('/items/'+userid).once('value').then(function (snap) {
				var listData = snap.val();
				var listIDs = Object.keys(listData);
				var responseObj = {};
				var today = (new Date()).getTime();
				var todayMinus30 = (new Date(today - (30*24*60*60*1000))).getTime();
				
				var totalItems;
				/* {name: 'Mon', created: 40, due: 24, overdue: 24} */
				var d;
				for(var i = 29; i>=0; i--){
					d = DateHelper.getDateFromTimestamp(DateHelper.addDays(i*-1));
					responseObj[DateHelper.getFormattedDate(d)] = {name: DateHelper.chartFormatDate(d), created: 0};
				}
				for(var i in listIDs){
					var listID = listIDs[i];
					var itemIDs = Object.keys(listData[listID]);

					for(var j in itemIDs){
						var itemID = itemIDs[j];
						var t = listData[listID][itemID].created;
						var d = DateHelper.getFormattedDateFromTimestamp(t);
						if(t >= todayMinus30 && t <= today){
							responseObj[d].created = responseObj[d].created + 1;
						}
					}
				}
				var temp = [];
				var index = Object.keys(responseObj);
				for(var i in index){
					temp.push(responseObj[index[i]])
				}
				responseObj = temp;
				response.send(responseObj);
			});
		}	
	})
});

exports.getItemsDueNextMonth = functions.https.onRequest((request, response) => {
	return cors(request, response, ()=>{
		/*response.send(request.query.userid);*/
		let userid = request.query.userid;
		if(userid !== undefined && typeof userid === "string"){
			
			admin.database().ref('/items/'+userid).once('value').then(function (snap) {
				var listData = snap.val();
				var listIDs = Object.keys(listData);
				var responseObj = {};
				var today = (new Date()).getTime();
				var todayPlus30 = (new Date(today + (30*24*60*60*1000))).getTime();
				
				var totalItems;
				/* {name: 'Mon', created: 40, due: 24, overdue: 24} */
				var d;
				for(var i = 0; i<30; i++){
					d = DateHelper.getDateFromTimestamp(DateHelper.addDays(i));
					responseObj[DateHelper.getFormattedDate(d)] = {name: DateHelper.chartFormatDate(d), due: 0};
				}
				for(var i in listIDs){
					var listID = listIDs[i];
					var itemIDs = Object.keys(listData[listID]);

					for(var j in itemIDs){
						var itemID = itemIDs[j];
						var t = listData[listID][itemID].due;
						var d = DateHelper.getFormattedDateFromTimestamp(t);
						if(t <= todayPlus30 && t >= today){
							responseObj[d].due = responseObj[d].due + 1;
						}
					}
				}
				var temp = [];
				var index = Object.keys(responseObj);
				for(var i in index){
					temp.push(responseObj[index[i]])
				}
				responseObj = temp;
				response.send(responseObj);
			});
		}	
	})
});

exports.getListItemsStatus = functions.https.onRequest((request, response) => {
	return cors(request, response, ()=>{
		/*response.send(request.query.userid);*/
		let userid = request.query.userid;
		if(userid !== undefined && typeof userid === "string"){
			/*{name: 'List1', pending: 10, complete: 10, overdue: 20},*/
			admin.database().ref('/lists/'+userid).once('value').then(function(snap){
				var lists = snap.val();
				var masterListIDs = Object.keys(lists);
				admin.database().ref('/items/'+userid).once('value').then(function (snap) {
					var listData = snap.val();
					var listIDs = Object.keys(listData);
					var emptyLists = arrayDiff(masterListIDs, listIDs);
					var responseObj = {};
					var totalItems, pendingItems, completeItems, overdueItems;
					if(emptyLists.length > 0){
						for(var i in emptyLists){
							responseObj[emptyLists[i]] = {name: lists[emptyLists[i]].listName, pending: 0, complete: 0, overdue: 0};
						}
					}
					var today = DateHelper.getTodayTimestamp();
					for(var i in listIDs){
						/*responseObj[listID] = listIDs[listID]*/
						pendingItems=0;
						completeItems=0;
						overdueItems=0;
						var listID = listIDs[i];
						var itemIDs = Object.keys(listData[listID]);
						/*responseObj[listID] = itemIDs;*/
						totalItems = itemIDs.length;
						if(totalItems===0){
							doneItems = 0;
							responseObj[listID] = { name: lists[listID].listName, pending: 0, complete: 0, overdue: 0 };
							continue;
						}
						for(var j in itemIDs){
							var itemID = itemIDs[j];
							if(listData[listID][itemID].done === true){
								completeItems++;
							}
							if(listData[listID][itemID].due >= today && listData[listID][itemID].done === false){
								pendingItems++;
							}
							if(listData[listID][itemID].due < today && listData[listID][itemID].done === false){
								overdueItems++;
							}
						}
						responseObj[listID] = { name: lists[listID].listName, pending: pendingItems, complete: completeItems, overdue: overdueItems };
					}
					var temp = [];
					var index = Object.keys(responseObj);
					for(var i in index){
						temp.push(responseObj[index[i]])
					}
					responseObj = temp;
					response.send(responseObj);
				});
			});
		}	
	})
});