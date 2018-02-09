// var schedule = require('node-schedule');

// module.exports.schedule = function () {
//   var date = new Date(2018, 01, 08, 18, 46, 0); // this is 24 hours time
//   console.log(date);
//   var j = schedule.scheduleJob(date, function () { console.log('The world is going to end today.'); });
// }
// // let startTime = new Date(Date.now() + 5000);
// // let endTime = new Date(startTime.getTime() + 10000);
// // var j = schedule.scheduleJob({ start: startTime, end: endTime, rule: '*/1 * * * * *' }, function(){
// //   console.log('Time for tea!');
// // });
var schedule = require('node-schedule');

// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    │
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)

// var j = schedule.scheduleJob('0 * * * * *', function(){ console.log('Time : ' + new Date()); });