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

var SOCKET_LIST = {};
var playerCount = 1;
var Player = require("./server/js/player.js");
var initPack = {
		player: []
}
var updatePack = {
		player: []
}
var removePack = {
		player: []
}
Player.list = {};

Player.onConnect = function(socket) {
	var player = Player.init(socket.id, playerCount);
	Player.list[socket.id] = player;
	Player.socket_events(socket, player);
	playerCount += 1;
	
	initPack.player.push(player);
}
Player.onDisconnect = function(socket) {
	playerCount -= 1;
	delete Player.list[socket.id];
	
	removePack.player.push(socket.id);
}


//socket.io server block
var io = socketIO(server);

io.on('connection', function (socket) { 
	socket.id = Math.random();
	SOCKET_LIST[socket.id] = socket;
	Player.onConnect(socket);
	socket.on('disconnect', function() {
		delete SOCKET_LIST[socket.id];
		Player.onDisconnect(socket);
	});
});

setInterval(function() {
	var pack = {
		player:Player.refresh_pack(Player.list)
	}
	
	for(var i in SOCKET_LIST) {
		var socket = SOCKET_LIST[i];
		if(removePack.player.length > 0) {
			socket.emit('remove', removePack.player);
		}
		if(initPack.player.length > 0) {
			socket.emit('init', initPack.player);
		}
		socket.emit('update', pack);
		initPack = {
				player: []
		}
		removePack = {
				player: []
		}
	}
},1000/25); //1000/25