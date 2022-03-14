# JS-Logging - html

A simple html console logging package.

Locally include and serve js file.
```
<script src="logging.js" integrity="sha256-vVXQ47i8WnKD800ntWYlhzd1a1Xw6fQKkCnVyQEthJU="></script>
```
Remotely include and server js file.
```
<script src="https://raw.githubusercontent.com/ConniBug/JS-Logging/html/logging_html.js" integrity="sha256-vVXQ47i8WnKD800ntWYlhzd1a1Xw6fQKkCnVyQEthJU=" crossorigin="anonymous"></script>
```
```
logging.setLogLevel("ALL");

logging.verbose(<message>);
logging.error(<message>);
logging.warning(<message>);
logging.debug(<message>);
logging.critical(<message>);

logging.log(<message>, <type>);
```

```
log("Thing");
critical("Thing");
```

![alt text](Assets/img.png)
