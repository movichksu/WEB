const express = require('express');
const app = express();



app.use('/api', express.static('api') , function(req, res){

    res.status(404);
    res.json({error:{code:404}})
});


var server = app.listen(3000, () => {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})