var server = require('http').createServer();
var express = require('express');
var app = express();
var http = require('http').Server(app);
var mysql = require('mysql');

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var connection = function(){
    return mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  port     : '/Applications/MAMP/tmp/mysql/mysql.sock',
  database : 'election'
    })
};


app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/html/election.html');
});

//Post voters

app.post('/api/votant', function(req, res) {
        var _body = req.body;
        console.log(_body);
    var _c = connection();
        _q = "INSERT INTO votant (firstname, lastname, age) VALUES ('"+_body.firstname+"','"+_body.lastname+"','"+_body.age+"')"
        
          _c.connect();
          _c.query(_q, function(err, rows, fields) {
          if (err) res.status(500).send(err);
          res.status(201).send({status:'success'});
});
    
_c.end();
}); 

//Post Vote

app.post('/api/vote', function(req, res) {
        var _body = req.body;
        
        var _c = connection();
        _q = "INSERT INTO vote (candidat, votant) VALUES ('"+_body.candidat+"','"+_body.votant+"')";
        
          _c.connect();
         
        _c.query(_q, function(err, rows, fields) {
            if (err) throw err;
            res.send(rows);
});
    
_c.end();
}); 

//Get Candidat

app.get('/api/candidat', function(req, res){
    
    var _c = connection(),
       _q = 'SELECT * FROM candidat';
    
    _q += typeof req.query.id !== 'undefined' ? ' WHERE id=' + req.query.id:'';
    
    
  _c.connect();
  _c.query(_q, function(err, rows, fields) {
  if (err) throw err;
  res.send(rows);
});
    
_c.end();
});

//Get votant

app.get('/api/votant', function(req, res){
    
    var _c = connection(),
       _q = 'SELECT * FROM votant';
    
    _q += typeof req.query.id !== 'undefined' ? ' WHERE id=' + req.query.id:'';
    
    
  _c.connect();
  _c.query(_q, function(err, rows, fields) {
  if (err) throw err;
  res.send(rows);
});
    
_c.end();
});


//Get ID Vote

app.get('/api/vote2', function(req, res){
    
    var _c = connection(),
        _q = 'SELECT vote.candidat,candidat.firstname,candidat.lastname FROM vote LEFT JOIN votant ON votant.id = vote.votant LEFT JOIN candidat ON candidat.id = vote.candidat;'; 
        //_q = 'SELECT * FROM vote';
    /*SELECT Persons.Name, Persons.SS, Fears.Fear FROM Persons
LEFT JOIN Person_Fear ON Person_Fear.PersonID = Persons.PersonID
LEFT JOIN Fears ON Person_Fear.FearID = Fears.FearID */
    
    _q += typeof req.query.id !== 'undefined' ? ' WHERE id=' + req.query.id:'';
    
    
  _c.connect();
  _c.query(_q, function(err, rows, fields) {
  if (err) throw err;
  res.send(rows);
});
    
_c.end();
});

//Get Vote

app.get('/api/vote', function(req, res){
    
    var _c = connection(),
       /*_q = 'SELECT vote.id, candidat.firstname, votant.firstname FROM vote ON vote.candidat = candidat.id'; */
        _q = 'SELECT * FROM vote';
    
    _q += typeof req.query.id !== 'undefined' ? ' WHERE id=' + req.query.id:'';
    
    
  _c.connect();
  _c.query(_q, function(err, rows, fields) {
  if (err) throw err;
  res.send(rows);
});
    
_c.end();
});

//Count vote

/*app.get('/api/comptage', function(req, res){
    
    var _c = connection(),
       /*_q = 'SELECT vote.id, candidat.firstname, votant.firstname FROM vote ON vote.candidat = candidat.id'; */
        //_q = 'SELECT * FROM vote';
        /*_q= 'SELECT COUNT(*) FROM vote WHERE= SELECT firstname, SUM(candidat) FROM vote GROUP BY firstname' 
    
    _q += typeof req.query.id !== 'undefined' ? ' WHERE id=' + req.query.id:'';
    
    
  _c.connect();
  _c.query(_q, function(err, rows, fields) {
  if (err) throw err;
  res.send(rows);
});
    
_c.end();
}); **/



http.listen(1337, function(){
        console.log('listening on *:1337');
});

//SELECT vote.id, candidat.firstname, voter.firstname, vote.office FROM vote ON