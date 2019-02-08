const express = require('express');
const app = express();

app.get('/', function(req,res){
    res.json('Hello World')
    // res.json({'Error': false, 'Message': 'Server access.'})
})

app.get('/get-list', function(req,res){
    var result = [
        {'name':'A', 'value':'A123'},
        {'name':'B', 'value':'B123'},
        {'name':'C', 'value':'C123'},
        {'name':'D', 'value':'D123'},
        {'name':'E', 'value':'E123'},
        {'name':'F', 'value':'F123'},
    ]
    res.json({'Error': false, 'Message': 'Server access.', 'Request': result})
})


app.listen(3080,function(){
    console.log("All right ! I am alive at Port 3080.");
})