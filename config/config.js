var convict = require('convict');
var config = convict({
  env: {
    doc: 'The Application Environment',
    format: ['production', 'development', 'mobile', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  build_destination: {
    doc: 'Destination to send built files',
    format: '*',
    default: './cordova/www/',
    env: 'Build_Destination'
  },
  mobile: {
    doc: 'Enable Mobile Conditional Settings/Code',
    format: '*',
    default: true,
    env: 'MOBILE'
  },
  app_title: {
    doc: 'App Title',
    format: '*',
    default: 'Community Title',
    env: 'App_Title'
  },
  api: {
    doc: 'API End Point',
    format: '*',
    default: 'http://localhost:3000/api/',
    env: 'API'
  },
  app_description: {
    doc: 'App Description',
    format: '*',
    default: 'Community Description',
    env: 'App_Description'
  }
});

//Load Environment Dependent Configuration
config.loadFile('./config/'+config.get('env')+'.json');

//Validate
config.validate();

module.exports = config;
