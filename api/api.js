var baseUrl = 'http://localhost:3000'

module.exports = {
  getNextCard(cardId, success) {
    $.get(baseUrl + '/users/' + cardId, function(result){
        if(success){ success(result); }
      }
    )
  },

  getAllCards(success) {
    $.get(baseUrl + '/users', function(result){
        if(success){ success(result); }
      }
    )

  }
};

