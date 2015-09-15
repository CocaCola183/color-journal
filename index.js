var fs = require('fs-extra');
var tracer = require('tracer');
var colors = require('colors');

var default_conf = {
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

/**
 * color_journal
 * @param  opt options for logger
 * @return logger
 */
function color_journal(opt) {
  opt = opt || {};

  /*log dir*/
  var log_dir = opt.log_dir || default_conf.log_dir;

  /*log methods*/
  var log_methods = opt.log_methods || default_conf.log_methods;

  /*record_level*/
  var record_level = opt.record_level || 0;

  /*init dir*/
  try {
    if (!fs.existsSync(log_dir)) {
      fs.mkdirSync(log_dir, 0777);
    }
    for (var key in log_methods) {
      if (!fs.existsSync(log_dir + key))  fs.mkdirSync(log_dir + key, 0777);
    }
  } catch (e) {
    if(e) {
      console.log('color-journal init dir error:', e);
    }
  }

  /*logger*/
  return tracer.console({
    level: 0,
    format: "[{{timestamp}}] File:[{{file}}] Line:[{{line}}] Type:[{{title}}] \n {{message}}",
    dateformat: "yyyy-mm-dd HH:MM:ss",
    methods: Object.keys(log_methods),
    transport: function (data) {
      try {
        if (data.output[log_methods[data.title].color]) {
          console.log(data.output[log_methods[data.title].color]);
        } else {
          console.log(data.output)
        }
        if (data.level >= record_level) {
          var logPath = log_dir + data.title + "/" + data.timestamp.substring(0, 10) + ".log"
          var writeStream = fs.createWriteStream(logPath, {
              flags: "a",
              encoding: "utf8",
              mode: 0666
          });
          writeStream.write(data.output + "\n");
          writeStream.end();
        }
      } catch (e) {
        console.log('color-journal error', e);
      }
    }
  });

}

module.exports = color_journal;