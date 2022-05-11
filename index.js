/*
    Author: Conni!~#0920 (conni@spookiebois.club)
    Github: https://github.com/ConniBug/JS-Logging

*/
const mailLib = require("./mailer");

const { getDateTime } = require("./Utils");

var callerId = require('caller-id');

var strip = require('strip-color');  
const colors = require('colors');
var fileLogger = require("./fileLogger");
var sendMail = require("./mailer").sendMail;
var shouldMail = false;
var isMailSetup = false;
var isFileSetup = false;

function setupFileLogging(root) {
    isFileSetup = true;
    fileLogger.setupFileLogger(root);
}
function setupMail(host, port, email, email_pass, send_to) {
    if(isMailSetup) log("Already setup email server.", "ERROR");
    isMailSetup = true;

    mailLib.setupMail(host, port, email, email_pass, send_to);  
}
logLevel = "LEGITALL";
function getLogLevelNum(level) {
    if (level == "TESTING") return 0;
    if (level == "GENERIC") return 2;
    if (level == "DEBUG")   return 3;
    if (level == "WARNING") return 5;
    if (level == "ERROR")   return 7;
    if (level == "VERBOSE") return 9;
    if (level == "CRITICAL") return 11;
    if (level == "ALL")     return 15;
  
    // Debugging stuff.
    if (level == "TIMINGS") return 20;
  
    if (level == "LEGITALL") return 100;
  
    log("Unsure what log level " + level.red + " belongs to.", "GENERIC");
    return 4;
}

async function log(message, caller, type = "DEBUG", callingFunction = "N/A") {
    if (getLogLevelNum(type) > getLogLevelNum(logLevel)) {
        return;
    }
    maxSize = 54

    time = getDateTime().yellow;

    if (callingFunction == "N/A") {
        StartMessage = `[${time}] - [`;
    } else {
        StartMessage = `[${time}] - [${callingFunction.blue}] - [`;
    }

    if (type == "ERROR") {
        console.log(caller);

        StartMessage += type.red;
        if(isMailSetup) {
            sendMail(message, "Server Error");
        }
    }
    else if (type == "WARNING") StartMessage += type.blue;
    else if (type == "GENERIC") StartMessage += type.green;
    else if (type == "DEBUG") StartMessage += type.gray;
    else if (type == "VERBOSE") StartMessage += type.rainbow;
    else if (type == "TESTING") StartMessage += type.magenta;
    else if (type == "CRITICAL") StartMessage += type.bgRed
    else StartMessage += type.blue;

    left = maxSize - StartMessage.length;
    function balence() {
        tmp = "";
        space = " ";
        while(left >= 0) {
            left = left-1;
            tmp = tmp + space;
        }
        return tmp;
    }
    let toLog = StartMessage + "] " + balence(StartMessage) +  "-> " + message;
    if(isFileSetup) {
        fileLogger.logToFile(strip(toLog));
    }
    console.log(toLog);
}

function setupWebPanel() {
    const express = require("express")
    const app = express()
    let PORT = 1321;
    
    app.get("/latest", (req, res) => {
        const fs = require("fs");
        let data = fs.readFileSync(fileLogger.logFilePath, "utf8").toString().replace(/\n/g, "<br>");

        res.send(data);
        res.status(200);
    });
    
    app.listen(PORT, () => console.log(`Started listener on port ${PORT}`));
    
}
module.exports = {
    setupWebPanel: () => {
        return setupWebPanel();
    },
    setupFileLogging: (root) => {
        return setupFileLogging(root);
    },
    setupMail: (host, port, email, email_pass, send_to) => {
        return setupMail(host, port, email, email_pass, send_to);
    },
    setLogLevel: (Level) => {
        logLevel = Level
    },
    getLogLevelNum: (level) => {
        return getLogLevelNum(level);
    },
    log: async (message, type = "GENERIC", callingFunction = "N/A") => {        
        log(message, callerId.getData(), type, callingFunction);
    },
    verbose: async (message, callingFunction = "N/A") => {
        log(message, callerId.getData(), "VERBOSE", callingFunction);
    },
    error: async (message, callingFunction = "N/A") => {
        log(message, callerId.getData(), "ERROR", callingFunction);
    },
    warning: async (message, callingFunction = "N/A") => {
        log(message, callerId.getData(), "WARNING", callingFunction);
    },
    debug: async (message, callingFunction = "N/A") => {
        log(message, callerId.getData(), "DEBUG", callingFunction);
    },
    critical: async (message, callingFunction = "N/A") => {
        log(message, callerId.getData(), "CRITICAL", callingFunction);
    },
    char_count: (str, letter) => {
        return char_count(str, letter);
    },
    getDateTime: () => {
        return getDateTime();
    }
};