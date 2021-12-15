const { getDateTime } = require("./Utils");
const fs = require('fs');
var setup = false
var logFilePath = "";

function makeDirIfNotExist(path) {
    if(!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true })
    }  
}

function getNewLogFilePath(root, date = new Date()) {  
    if(!root) {
        console.error("Log root not defined.")
        process.exit(1)
    }
    let path = root + "./logs";

    path += "/" + date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    path += "/" + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    path += "/" + day + "/";

    makeDirIfNotExist(path);

    return path;
}

function getNewLogFileName(date = new Date()) {
    var epoch  = date.getTime();
    let name = "./" + epoch + ".log";
    return name;
}

module.exports.setupFileLogger = async (root) => {
    let curDate = new Date()
    logPath = getNewLogFilePath(root, curDate);
    logFileName = getNewLogFileName(curDate);
    logFilePath = logPath + logFileName;
    //console.log(logFilePath);
    setup = true;
    return true;
}

module.exports.logToFile = async (content) => {
    if(!setup) return false;

    try {
        fs.appendFileSync(logFilePath, content + "\n")
    } catch (err) {
        console.error(err)
    }
}

var cron = require('node-cron');

var task = cron.schedule('0 0 */1 * * *', () =>  {
  this.setupFileLogger("./");
});
task.start();