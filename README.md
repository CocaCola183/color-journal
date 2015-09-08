# color-journal
Colorful journal

## usage
```
npm install color-journal
var logger = var logger = require('color-journal')();
logger.log('log');
logger.info('info');
logger.trace('trace');
logger.debug('debug');
logger.warn('warn');
logger.error('error');
```

Then you will get this:  
![color-journal](http://7xlmxe.com1.z0.glb.clouddn.com/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202015-09-08%20%E4%B8%8B%E5%8D%883.37.40.png)

## configuration
default:  
```js
{
  log_dir: './tmp/',
  record_level: 0, // write into files when method rank greater than record_level
  log_methods: {
    log: { color: 'white', rank: '0'},
    info: { color: 'green', rank: '1'},
    trace: { color: 'cyan', rank: '2'},
    debug: { color: 'blue', rank: '3'},
    warn: { color: 'yellow', rank: '4'},
    error: { color: 'red', rank: '5'},
  }
}
```

You want more color? See [this](https://www.npmjs.com/package/colors)

## Licence
Copyright (c) 2015, Kivi <s_f_dragon@163.com>


