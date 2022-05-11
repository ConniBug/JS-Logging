const l = require('./index.js')
const test2 = require('./testing2.js')
l.setLogLevel("ALL");
l.setupFileLogging("./")

l.log("=====================");
l.log("Starting tests.");
l.log("=====================");
l.log("Testing log command.");
l.log("Testing prefix varients.");
l.verbose("verbose test.");
l.error("error test.");
l.warning("warning test.");
l.debug("debug test.");
l.critical("critical test.");

const { log, critical } = require("./index.js");

log("Thing");
critical("Thing");

l.setupWebPanel();
test2.go();