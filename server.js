var express = require('express'),
    app = express(),
    server = require('http').createServer(app).listen(4555),
    io    = require('socket.io').listen(server),
    bodyParser = require('body-parser');

    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());

    var port = process.env.PORT || 8000;
    var router = express.Router();
    var emitir = function(req, res, next){
        var notify = req.query.notified || '';
        if(notify !== ''){
          io.emit('notification', notify);
          next();
        }else{
          next();
        }
    };
    app.use(emitir);
    app.use('/api',router);

    router.route('/notify').get(function(req, res){
        res.json({message:'Apenas uma rota para testar'});
    });
    app.get('/',function(req, res){

      res.sendFile(__dirname + '/notify.html');
    });


    app.listen(port);

    console.log('iniciado na porta >> ' + port);
