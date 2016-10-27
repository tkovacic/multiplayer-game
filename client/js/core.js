$( document ).ready(function() { //Init scripts when page is done loading
	var APP = new core();
	APP.init();
});

player_class = function(input_id, input_username, input_pressingRight, 
		input_pressingLeft, input_pressingUp, input_pressingDown, 
		input_clickFire, input_right, input_status, input_source, 
		input_frameIndex, input_tickCount, input_x, input_y) {
	self.id = input_id;
	self.username = input_username;
	self.pressingRight = input_pressingRight;
	self.pressingLeft = input_pressingLeft;
	self.pressingUp = input_pressingUp;
	self.pressingDown = input_pressingDown;
	self.clickFire = input_clickFire;
	self.right = input_right;
	self.status = input_status;
	self.img = {
		source:input_source,
		frameIndex:input_frameIndex,
		tickCount:input_tickCount,
	}
	self.x = input_x;
	self.y = input_y;
	
	return self;
}

core = function() {
	var $this = this;
	//this.local_url = 'tdk-portfolio-herokuapp.com';
	var width = $(document).width() - 20;
	var height = 200;
	var updateCounter = 0;
	var playerList = {
			players: [],
	}
	
	this.init = function() {
		var ctx = document.getElementById('ctx').getContext('2d');	//create 2d canvas
		var smallImgSize = 40;
		ctx.fillStyle = 'white';
		$('#ctx').css('width', width);
		var socket = io('https://multi-demo.herokuapp.com'); //https://multi-demo.herokuapp.com/      localhost:3000
		$this.initButtons(socket);
		socket.on('init', function(data) { //whenever new positions are sent out
			//initilization class package
			var temp_player = new player_class(data[0].id, data[0].username, 
					data[0].pressingRight, data[0].pressingLeft, data[0].pressingUp, 
					data[0].pressingDown, data[0].clickFire, data[0].right, data[0].status, 
					data[0].source, data[0].frameIndex, data[0].tickCount, data[0].x, data[0].y);
			playerList.players.push(temp_player);
		});
		socket.on('update', function(data) { //whenever new positions are sent out
			//update package
			if(playerList.players.length > updateCounter) {
				updateCounter = playerList.players.length;
//				console.log(data.player);
			}
			
			ctx.clearRect(0,0,width,height); //clear canvas
			for(var i = 0; i < data.player.length; i++) { //foreach player in the game
				$this.drawPlayer(data.player[i], smallImgSize, ctx);
			}
		});
		socket.on('remove', function(data) { //whenever new positions are sent out
			//remove package
			for(var i = 0; i < data.length; i++) {
				if(playerList.players[i] = data) {
					console.log('deleted: ' + playerList.players[i]);
					delete playerList.players[i];
				}
			}
		});
		
		document.onmousedown = function(e) {
			socket.emit('keypress', {inputID:'fire', state:true})
		}
		
		document.onmouseup = function(e) {
			socket.emit('keypress', {inputID:'fire', state:false})
		}
		
		document.onmousemove = function(e) {
			var x = e.clientX - 1000;
			var y = e.clientY - 250;
			var angle = Math.atan2(y,x) / Math.PI * 180;
			socket.emit('keypress', {inputID:'mouseangle', state:angle})
		}
		
		document.onkeydown = function(e) {
			if(e.keyCode == 68)//d
				socket.emit('keypress', {inputID:'right', state:true});
			else if(e.keyCode == 83)//s
				socket.emit('keypress', {inputID:'down', state:true});
			else if(e.keyCode == 65)//a
				socket.emit('keypress', {inputID:'left', state:true});
			else if(e.keyCode == 87)//w
				socket.emit('keypress', {inputID:'up', state:true});
		}
		
		document.onkeyup = function(e) {
			if(e.keyCode == 68)//d
				socket.emit('keypress', {inputID:'right', state:false});
			else if(e.keyCode == 83)//s
				socket.emit('keypress', {inputID:'down', state:false});
			else if(e.keyCode == 65)//a
				socket.emit('keypress', {inputID:'left', state:false});
			else if(e.keyCode == 87)//w
				socket.emit('keypress', {inputID:'up', state:false});
		}
		
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			window.location = 'https://tdk-portfolio.herokuapp.com'
		}
	};
	
	this.drawPlayer = function(playerObj, smallImgSize, ctx) {
		ctx.fillText(playerObj.username, playerObj.x + 5, playerObj.y + 5); //remap usernames
		var temp_img = document.createElement('img'); //generate image element
		temp_img.src = playerObj.img; //provide proper sprite
		temp_img.id = playerObj.id; //set id
		temp_img.width = (temp_img.width); //set width
		if(playerObj.status.localeCompare('running') == 0) {
			if(playerObj.frame <= 0) { //if frame is 0
				ctx.drawImage(temp_img, 0, 0, smallImgSize, smallImgSize, playerObj.x, playerObj.y, smallImgSize, smallImgSize); //cut first half of sprite sheet
			} else if(playerObj.frame == 1) {
				ctx.drawImage(temp_img, smallImgSize, 0, smallImgSize, smallImgSize, playerObj.x, playerObj.y, smallImgSize, smallImgSize); //cut second half of sprite sheet
			} else if(playerObj.frame == 2) {
				ctx.drawImage(temp_img, smallImgSize * 2, 0, smallImgSize, smallImgSize, playerObj.x, playerObj.y, smallImgSize, smallImgSize); //cut second half of sprite sheet
			} else if(playerObj.frame == 3) {
				ctx.drawImage(temp_img, smallImgSize * 3, 0, smallImgSize, smallImgSize, playerObj.x, playerObj.y, smallImgSize, smallImgSize); //cut second half of sprite sheet
			} else if(playerObj.frame == 4) {
				ctx.drawImage(temp_img, smallImgSize * 4, 0, smallImgSize, smallImgSize, playerObj.x, playerObj.y, smallImgSize, smallImgSize); //cut second half of sprite sheet
			} else if(playerObj.frame == 5) {
				ctx.drawImage(temp_img, smallImgSize * 4, 0, smallImgSize, smallImgSize, playerObj.x, playerObj.y, smallImgSize, smallImgSize); //cut second half of sprite sheet
			} else if(playerObj.frame == 6) {
				ctx.drawImage(temp_img, smallImgSize * 5, 0, smallImgSize, smallImgSize, playerObj.x, playerObj.y, smallImgSize, smallImgSize); //cut second half of sprite sheet
			} else if(playerObj.frame >= 7) {
				ctx.drawImage(temp_img, smallImgSize * 6, 0, smallImgSize, smallImgSize, playerObj.x, playerObj.y, smallImgSize, smallImgSize); //cut second half of sprite sheet
			}
		} else if(playerObj.status.localeCompare('standing') == 0) {
			if(playerObj.frame <= 4 ) { //if frame is 0
				ctx.drawImage(temp_img, 0, 0, smallImgSize, smallImgSize, playerObj.x, playerObj.y, smallImgSize, smallImgSize); //cut first half of sprite sheet
			} else if(playerObj.frame >= 5 ) { //if frame is 0
				ctx.drawImage(temp_img, smallImgSize, 0, smallImgSize, smallImgSize, playerObj.x, playerObj.y, smallImgSize, smallImgSize); //cut second half of sprite sheet
			}
		}
	}
	
	this.initButtons = function(socket) {
		$('#usernameBtn').on('click', function() {
			var user = $('#usernameText').val();
			console.log(user);
			socket.emit('changeUsername', {inputID:user});
			$('#username').modal('toggle');
		});
	}
};