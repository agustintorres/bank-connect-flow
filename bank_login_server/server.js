var express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening on port %s', port);
});

app.get('/bank_login_fields', function (req, res) {
    if (!req.query.institution_id) {
        res.status(400).send('institution_id param is required');
    }

    res.send({
        "login_fields": [
            {
                "title": "User ID",
                "name": "user_id",
                "placeholder": "Enter your online banking user ID",
                "mask": false
            },
            {
                "title": "Password",
                "name": "password",
                "placeholder": "Enter your online banking password",
                "mask": true
            }
        ]
    });
});


app.post('/bank_login_creds', function (req, res) {
    if (!req.body.user_id || !req.body.password) {
        res.status(400).send('user_id and password params are required');
    }

    if (req.body.user_id == 'bondstreet') {
        res.send({ 'error': false });
    } else {
        res.status(401).send({ 'error': 'User ID/Password combination does not exist' });
    }
});