var exp = require("express");
var app = exp();
var router = exp.Router();
var socketIO = require('socket.io');
var final_html;
var template_index = require("jade").compileFile(__dirname + "/views/index.jade");
var server = require('http').Server(app);

//views
app.set("views", __dirname + "/views");
app.set("view engine", "jade");

//middleware
router.use(function(req, res, next) {
	console.log("/" + req.method);
	next();
});

//routes
router.get("/", function(req, res, next) {
	try {
		final_html = template_index ({ title : "Demo" });
		res.send(final_html);
	} catch (e) {
		next(e);
	}
});
app.use(exp.static(__dirname + "/"), router);

router.get("/api", function(req, res) {
	res.json({"message": "API Page"});
});
app.use("/api", router);

//listening to port
server.listen(process.env.PORT || 3000, function() {
	console.log("listening at http://localhost:" + (process.env.PORT || 3000));
});
//-----------------------------------------------------------------------------------------------------------------------------------------------
//PUBLIC LIST OF SOCKETS
var SOCKET_LIST = {};
//CLASSES
//BEGINING OF ENTITY
var Entity = function() {
	var self = {
		id: "",
		x: 250,
		y: 250,
		spdX: 0,
		spdY: 0,
	}
	self.update = function() {
		self.updatePosition();
	}
	self.updatePosition = function() {
		self.y += self.spdY;
		self.x += self.spdX;
	}
	return self;
}
//END OF ENTITY
//BEGINING OF PLAYER
var Player = function(id) {
	var self = Entity();
	self.id = id;
	self.limiter = 0.3;
	self.number = "" + Math.floor(10 * Math.random());
	self.pressingRight = false;
	self.pressingLeft = false;
	self.pressingUp = false;
	self.pressingDown = false;
	self.maxSpd = 5;
	self.img = "../client/img/player/temp.png";
	var super_update = self.update;
	self.update = function() {
		self.updateSpd();
		super_update();
	}
	self.updateSpd = function() {
		if(self.pressingRight) {
			self.spdX = self.maxSpd;
			self.img = "../client/img/player/temp-r.png";
		}else if(self.pressingLeft) {
			self.spdX = -self.maxSpd;
			self.img = "../client/img/player/temp.png";
		}else{
			self.spdX = 0;
		}
		if(self.pressingUp) {
			self.spdY = -self.maxSpd;
		}else if(self.pressingDown) {
			self.spdY = self.maxSpd;
		}else{
			self.spdY = 0;
		}
	}
	Player.list[id] = self;
	return self;
}
Player.list = {};
Player.onConnect = function(socket) {
	var player = Player(socket.id);
	
	socket.on('keypress', function(data) {
		if(data.inputID === 'left') {
			player.pressingLeft = data.state;
		}else if(data.inputID === 'right')
			player.pressingRight = data.state;
		else if(data.inputID === 'up')
			player.pressingUp = data.state;
		else if(data.inputID === 'down')
			player.pressingDown = data.state;
	});
}
Player.onDisconnect = function(socket) {
	delete Player.list[socket.id];
}
Player.update = function() {
	var pack = [];
	for(var i in Player.list) {
		var player = Player.list[i];
		player.update();
		pack.push({
			x:player.x * player.limiter,
			y:player.y * player.limiter,
			img:player.img,
			facingRight:player.facingRight,
		});
	}
	return pack;
}
// END OF PLAYER
// BEGINNING OF BULLET
var Bullet = function(angle) {
	var self = Entity();
	self.id = Math.random();
	self.limiter = 0.3;
	self.spdX = Math.cos(angle/180*Math.PI) * 10;
	self.spdY = Math.sin(angle/180*Math.PI) * 10;
	self.timer = 0;
	self.toRemove = false;
	
	var super_update = self.update;
	self.update = function() {
		if(self.timer++ > 100)
			self.toRemove = true;
		super_update();
	}
	Bullet.list[self.id] = self;
	return self;
}
Bullet.list = {};
Bullet.update = function() {
	if(Math.random() < 0.1) {
		Bullet(Math.random()*360);
	}
	
	var pack = [];
	for(var i in Bullet.list) {
		var bullet = Bullet.list[i];
		bullet.update();
		pack.push({
			x:bullet.x * bullet.limiter,
			y:bullet.y * bullet.limiter,
		});
	}
	return pack;
}
//END OF BULLET
//socket.io server block
var io = socketIO(server);

io.on('connection', function (socket) { 
	socket.id = Math.random();
	SOCKET_LIST[socket.id] = socket;
	//use player class script to create player and onconnect event socket input
	Player.onConnect(socket);
	socket.on('disconnect', function() {
		delete SOCKET_LIST[socket.id];
		Player.onDisconnect(socket);
	});
});

setInterval(function() {
	var pack = {
		player:Player.update(),
		bullet:Bullet.update()
	}
	
	for(var i in SOCKET_LIST) {
		var socket = SOCKET_LIST[i];
		socket.emit('newPositions', pack);
	}
},1000/50); //1000/25