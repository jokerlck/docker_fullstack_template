function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes = function(router,connection,md5) {

    router.get("/rcapps/get-list",getList);
    router.post("/rcapps/user",addUser)

    function getList(req,res){
        var query = `SELECT * FROM users WHERE weblogin = 'lungc4'`
        connection.query(query,function(err,rows){
            if(err){
                res.json({'Error': true, 'Message':  err})
            }else{
                res.json({'Error': false, 'Message': 'Server access.', 'Request': rows})
            }
        })
    }

    function addUser(req,res){
        var first_name = req.body.first_name
        var last_name = req.body.last_name
        var weblogin = req.body.weblogin
        var query = `INSERT INTO users (first_name, last_name, weblogin) VALUES ('` + first_name + `', '` + last_name + `','` + weblogin + `')`
        connection.query(query,function(err,rows){
            if(err){
                res.json({'Error': true, 'Message':  err})
            }else{
                res.json({'Error': false, 'Message': 'Server access.'})
            }
        })
    }

}
module.exports = REST_ROUTER;
