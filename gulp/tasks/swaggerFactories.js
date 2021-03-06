var gulp    = require('gulp');
var fs      = require('fs');
var _       = require('lodash-node');
var parser  = require("swagger-parser");
var config  = require('../config');

// Need to be careful, any circular references or malformed files will
// throw an error. Also files that do not have definitions for objects
// will fail to generate. You should pay careful attention to the
// factories, especially child factories. Sometimes the naming scheme
// for the fields and the objects are not the same. In future I hope
// to make this more reliable.

var allFactoryLibs = [];

// Allow us to get a file as text. Used to load templates. This whole
// module is very hacked together but works. Will clean up the code
// at a later date.
function readModuleFile(path, err) {
  try {
    var filename = require.resolve(path);
    return fs.readFileSync(filename, 'utf8');
  } catch (e) {
    err(e);
  }
}

// Use multiprogramming to generate separate gulp functions for each of the apis
// we've specified in the config file.
_.map(config.swagger.src, function(source){

  var fileName = _.camelCase(source.moduleName) + 'Factories.js';
  var generateFactoryForTaskName = _.camelCase('generate factories for ' + source.moduleName);

  allFactoryLibs.push(generateFactoryForTaskName);

  function flattenSwaggerModelTree(swagger){
    var modelCache = [];

    _.forOwn(swagger.definitions, function parseModels(modelObject, modelName){
      // if were at the bottom layer of the tree break out of the recursion.
      if(!modelObject.properties){ return; }

      // We build the individual model to be turned into a factory.
      var processedModel = {};
      processedModel[modelName] = modelObject;
      modelCache.push(processedModel);

      // recurse down the tree and keep parsing.
      _.forOwn(modelObject, parseModels);
    });

    return { swagger : modelCache};
  }

  // This task parses the swagger files and generates test data factories.
  gulp.task(generateFactoryForTaskName, function(done) {

    parser.parse(source.url + source.filename, function(err, api, metadata) {
      if (!err) {
        console.log("API name: %s, Version: %s", api.info.title, api.info.version);
      }
      if(err){ console.log(source.url + source.filename); }

      var template = readModuleFile('./templates/factoryClass.template', console.log);

      var toBeRendered = _.template(template);

      var flattenedSwagger = flattenSwaggerModelTree(api);

      var factories = toBeRendered(flattenedSwagger);

      fs.writeFileSync('factories/' + fileName, factories);

      done();
    });

  });

});

// This is the generic task to generate all client libraries specified in the
// config files.
gulp.task('factories', allFactoryLibs);







