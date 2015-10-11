var config = require('config');
var baseUrl = config.baseApiUrl;

module.exports = {
  getNextBatch(params, success) {
    $.get(baseUrl + 'users', params, function(result){
        if(success){ success(result); }
      }
    )

  }
};

