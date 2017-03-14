/*
* @Author: kyy
* @Date:   2017-03-07 14:42:01
* @Last Modified by:   kyy
* @Last Modified time: 2017-03-07 17:45:21
*/
var webpack = require("webpack");
var webpackConfig = require("../webpack.config.js");
var fs = require("fs");
var MemoryFs = require("memory-fs");

let compiler = webpack(webpackConfig);
/*compiler.run((err, stats)=>{ // 线上

});
*/
compiler.watch({
  aggregateTimeout: 300
}, function (err, stats){
  if (err) {
      console.error(err + '\n');
    } else {
      var data = stats.toJson();
      //console.log(data);
      if (data.errors.length > 0) {
        console.error(data.errors, data.errors.length.toString() + '\n');
      } else if (data.warnings.length > 0) {
        console.warn(data.warnings.toString() + '\n');
      } else { // 编译成功
        (function exe(dir, done) {
          var results = [];
          memFs.readdir(dir, function(err, list) {
            if (err) return done(err)
            var pending = list.length;
            if (!list.length) done(null, results);

            (list || []).forEach(function(file) {
              file = path.resolve(dir, file);
              memFs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                  exe(file, function(err, res) {
                    results = results.concat(res);
                    if (!--pending) done(null, results);
                  });
                } else {
                  results.push(file);
                  if (!--pending) done(null, results);
                }
              });
            })
          })
        })(OUTPUT_PATH, function(err, result) {
          (result || []).forEach(function(filePath) {
            let fileContent = memFs.readFileSync(filePath);
            fileContent = fileContent.toString('utf8');

            fs.writeFileSync(filePath, fileContent, {
              "encoding": "utf8",
              "mode": 0o777
            });
            console.info("Info: " + filePath + " build success!\n");
          })
        }); // 立即执行函数
      }
    }
})