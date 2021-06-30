# JS-Logging

A simple logging pckage that has built in email reporting and file logging.
```
const logging = require('@connibug/js-logging');
logging.setupMail("mail.example.com", 578, "mailer.example.com", "Password");
logging.setLogLevel("ALL");

logging.verbose(<message>, <calling function>);
logging.error(<message>, <calling function>);
logging.warning(<message>, <calling function>);
logging.debug(<message>, <calling function>);

logging.log(<message>, <type>, <calling function>);
```

```
const logging = require("logging").log;

log("Thing");
```

If you modify `index.js` directly if you change [this line](https://github.com/ConniBug/JS-Logging/blob/63372d144bfd020dcd7e36f7bcb35e089b49e303/logging.js#L9) you can modify what the minimun error type will be output in the console.

![alt text](Assets/img.png)
