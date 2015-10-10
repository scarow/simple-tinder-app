var baseUrl = 'http://localhost:3000'

module.exports = {
  getNextBatch(params, success) {
    $.get(baseUrl + '/users', params, function(result){
        if(success){ success(result); }
      }
    )

  }
};

