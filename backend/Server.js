const express = require('express');
const mysql   = require("mysql");
const bodyParser  = require("body-parser");
const config = require('./config/env.js')
const db = require('./config/db.js')
var engines = require('consolidate');
var md5 = require('MD5');
var rest = require("./Rest.js")

const app = express();

function REST(){
    var self = this;
    self.connectMysql();
};


REST.prototype.connectMysql = function() {
    var self = this;
    var hostInfo = {}
    if(config.mode == 'production'){
        hostInfo = db.production
    }else if(config.mode == 'development'){
        hostInfo = db.development
    }
    var pool      =    mysql.createPool({
        connectionLimit : 100,
        host: hostInfo.host,
        port: hostInfo.port,
        user: hostInfo.user,
        password : hostInfo.password,
        database : hostInfo.database,
        debug    :  false,
        multipleStatements: true,
        timezone: 'utc'
    });    

    pool.getConnection(function(err,connection){
        if(err) {
          self.stop(err);
        } else {
          self.configureExpress(connection);
        }
    });
}

REST.prototype.configureExpress = function(connection) {
    var self = this;
    app.use(bodyParser.urlencoded({ extended: true }));
    //   app.use(bodyParser.json());
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
    app.set('views', __dirname + '/views');
    app.engine('html', engines.mustache);
    app.set('view engine', 'html');
    var router = express.Router();
    app.use('/api', router);


    var rest_router = new rest(router,connection,md5);

    self.startServer();
}

REST.prototype.startServer = function() {
    app.listen(3080,function(){
        console.log("All right ! I am alive at Port 3080.");
    });
}

REST.prototype.stop = function(err) {
  console.log("ISSUE WITH MYSQL \n" + err);
  process.exit(1);
}

new REST();


// app.get('/', function(req,res){
//     res.json('Hello World')
//     // res.json({'Error': false, 'Message': 'Server access.'})
// })

// app.get('/get-list', function(req,res){
//     var result = [
//         {'name':'A', 'value':'A123'},
//         {'name':'B', 'value':'B123'},
//         {'name':'C', 'value':'C123'},
//         {'name':'D', 'value':'D123'},
//         {'name':'E', 'value':'E123'},
//         {'name':'F', 'value':'F123'},
//     ]
//     res.json({'Error': false, 'Message': 'Server access.', 'Request': result})
// })


// app.listen(3080,function(){
//     console.log("All right ! I am alive at Port 3080.");
// })