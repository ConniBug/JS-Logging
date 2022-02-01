const cron = require('node-cron');
const { getDateTime } = require("./Utils");
const fs = require('fs');
var logFilePath = "./";

function makeDirIfNotExist(path) {
    if(!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true })
    }  
}

function getNewLogFilePath(root, date = new Date()) {  
    let path = root + "./logs/" + date.getFullYear();

    let month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    path += "/" + month;

    let day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    path += "/" + day + "/";

    makeDirIfNotExist(path);

    return path;
}

function getNewLogFileName(date = new Date()) {
    return "./" + date.getTime() + ".log";
}

module.exports.setupFileLogger = async (root) => {
    if(!root) {
        console.error("[fileLogger.js] root dir not defined.")
        process.exit(1)
    }
    
    let curDate = new Date()
    logPath = getNewLogFilePath(root, curDate);
    logFileName = getNewLogFileName(curDate);
    logFilePath = logPath + logFileName;
    return true;
}

module.exports.logToFile = async (content) => {
    try {
        fs.appendFileSync(logFilePath, content + "\n")
    } catch (err) {
        console.error(err)
    }
}

// Setup a new file to log to every X
var task = cron.schedule('0 0 */1 * * *', () =>  {
  this.setupFileLogger("./");
});
task.start();
