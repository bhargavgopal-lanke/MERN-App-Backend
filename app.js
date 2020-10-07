var express = require('express');

const mysql = require('mysql');

const path = require('path');

const url = require('url');

var cors = require('cors');

/****************** Db Connection ******************************/

const db = require('./util/database');

const querystring = require('querystring');

const flash = require('connect-flash');  

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session'); 

const app = express(); 





/*app.options('*', cors());*/ // Enable preflight by using this middle ware before any other route. 

/*app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/');
  res.setHeader('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});*/

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const bcrypt = require('bcrypt');
const saltRounds = 10; 

app.set('view engine', 'ejs');

app.set('views', 'views');


app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.json());
app.use(express.json()); 

app.use(
	cors({
	
	origin: ["http://localhost:3000"],
	methods: ["GET", "POST"],
	credentials: true
	
}
));

app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}));

app.use(session({ 
	key: 'userId',
    secret:'subscribe', 
    cookie: { maxAge : 6000 },
    resave: false,
    saveUninitialized: false,
    cookie: {
    	expires : 60 * 60 * 24,
    }
})); 
  
app.use(flash()); 

const employeeUser = require('./routes/router');

app.use('/employee', employeeUser);


	app.get('/login', (req,res)=>{
		if (req.session.user) {
			res.send({loggedIn: true, user: req.session.user}); 
		} else{
			res.send({loggedIn: false});
		}
	});

app.post('/register', (req,res)=>{
	const username = req.body.username;
	const password = req.body.password;

	bcrypt.hash(password, saltRounds, (err, hash)=>{

		if(err) {
			console.log('err'); 
		}

		db.query('INSERT INTO testdb.users (username, password) VALUES (?, ?)',
		 [username, hash], 
		 (err, result)=> {
		console.log("data inserted");
	})

	})
	});



app.post('/login', (req,res)=>{
	const username = req.body.username;
	const password = req.body.password;
	db.query('SELECT * FROM testdb.users WHERE username = ?;',
	[username, password],

	(err, result)=>{
		if(err){
			res.send({err: err})
		} 

			if (result.length > 0) {
				bcrypt.compare(password, result[0].password, (err, response)=>{
					if(response) {
						req.session.user = result;
						console.log('req.session.user........////');
						console.log(req.session.user);
						res.send(result);
					}
					else{
						res.send({message: 'Wrong username/password combination!'});
					}
				})
				
			} else {
				res.send({message: 'User doesn"t exist!'});
			}
		
	});
});

const Port = process.env.PORT || 3001;
app.listen(Port, console.log(`Server is listening on ${Port}`));

/*app.listen(3000);
console.log("server is listening on 3000");*/