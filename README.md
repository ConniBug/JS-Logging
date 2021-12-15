# JS-Logging

A simple logging pckage that has built in email reporting and file logging.

```
const logging = require('@connibug/js-logging');
logging.setupMail("mail.example.com", 578, "mailer@example.com", "Password");

logging.setLogLevel("ALL");

logging.verbose(<message>);
logging.error(<message>);
logging.warning(<message>);
logging.debug(<message>);
logging.critical(<message>);

logging.log(<message>, <type>);
```

```
const { log, critical } = require("logging").log;

log("Thing");
critical("Thing");
```

![alt text](Assets/img.png)
