$( document ).ready(function() { //Init scripts when page is done loading
	var APP = new core();
	APP.init();
});

core = function() {
	var $this = this;
	//this.local_url = 'tdk-portfolio-herokuapp.com';
	var width = $(document).width() - 20;
	var height = 200;
	var updateCounter = 0;
	var clientPlayer = false;
	var playerList = {
			players: [],
	}
	
	this.init = function() {
		var ctx = document.getElementById('ctx').getContext('2d');	//create 2d canvas
		var smallImgSize = 40;
		ctx.fillStyle = 'white';
		$('#ctx').css('width', width);
		var socket = io('localhost:3000'); //https://multi-demo.herokuapp.com  //localhost:3000   
		$this.initButtons(socket);
		socket.on('init', function(data) { //whenever new positions are sent out
			//initilization class package
			var temp_player = new player_class(data[0].id, data[0].username, 
				data[0].pressingRight, data[0].pressingLeft, data[0].pressingUp, 
				data[0].pressingDown, data[0].clickFire, data[0].right, data[0].status, 
				data[0].hSource, data[0].bSource, data[0].frameIndex, data[0].tickCount, data[0].x, data[0].y);
			if(clientPlayer == false) {
				temp_player.myPlayer = true;
				clientPlayer = true;
			}
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
		var temp_head = document.createElement('img'); //generate image element
		var temp_body = document.createElement('img');
		temp_head.src = playerObj.hSrc; //provide proper sprite
		temp_body.src = playerObj.bSrc;
		temp_head.id = playerObj.id + '_head_img'; //set id
		temp_body.id = playerObj.id + '_body_img';
		if(playerObj.status.localeCompare('running') == 0) {
			if(playerObj.frame <= 0) { //if frame is 0
				ctx.drawImage(temp_head, 0, 0, smallImgSize, smallImgSize, playerObj.x, playerObj.y, smallImgSize, smallImgSize); //cut first half of sprite sheet
				ctx.drawImage(temp_body, 0, 0, smallImgSize, smallImgSize, playerObj.x, playerObj.y, smallImgSize, smallImgSize); //cut first half of sprite sheet
			} else if(playerObj.frame == 1) {
				ctx.drawImage(temp_head, 0, 0, smallImgSize, smallImgSize, playerObj.x, playerObj.y, smallImgSize, smallImgSize); //cut first half of sprite sheet
				ctx.drawImage(temp_body, smallImgSize, 0, smallImgSize, smallImgSize, playerObj.x, playerObj.y, smallImgSize, smallImgSize); //cut first half of sprite sheet
			} else if(playerObj.frame == 2) {
				ctx.drawImage(temp_head, 0, 0, smallImgSize, smallImgSize, playerObj.x, playerObj.y, smallImgSize, smallImgSize); //cut first half of sprite sheet
				ctx.drawImage(temp_body, smallImgSize * playerObj.frame, 0, smallImgSize, smallImgSize, playerObj.x, playerObj.y, smallImgSize, smallImgSize); //cut first half of sprite sheet
			} else if(playerObj.frame == 3) {
				ctx.drawImage(temp_head, 0, 0, smallImgSize, smallImgSize, playerObj.x, playerObj.y, smallImgSize, smallImgSize); //cut first half of sprite sheet
				ctx.drawImage(temp_body, smallImgSize * playerObj.frame, 0, smallImgSize, smallImgSize, playerObj.x, playerObj.y, smallImgSize, smallImgSize); //cut first half of sprite sheet
			} else if(playerObj.frame == 4) {
				ctx.drawImage(temp_head, 0, 0, smallImgSize, smallImgSize, playerObj.x, playerObj.y, smallImgSize, smallImgSize); //cut first half of sprite sheet
				ctx.drawImage(temp_body, smallImgSize * playerObj.frame, 0, smallImgSize, smallImgSize, playerObj.x, playerObj.y, smallImgSize, smallImgSize); //cut first half of sprite sheet
			} else if(playerObj.frame == 5) {
				ctx.drawImage(temp_head, 0, 0, smallImgSize, smallImgSize, playerObj.x, playerObj.y, smallImgSize, smallImgSize); //cut first half of sprite sheet
				ctx.drawImage(temp_body, smallImgSize * playerObj.frame, 0, smallImgSize, smallImgSize, playerObj.x, playerObj.y, smallImgSize, smallImgSize); //cut first half of sprite sheet
			}
		} else if(playerObj.status.localeCompare('standing') == 0) {
			if(playerObj.frame <= 2 ) { //if frame is 0
				ctx.drawImage(temp_head, 0, 0, smallImgSize, smallImgSize, playerObj.x, playerObj.y, smallImgSize, smallImgSize); //cut first half of sprite sheet
				ctx.drawImage(temp_body, 0, 0, smallImgSize, smallImgSize, playerObj.x, playerObj.y, smallImgSize, smallImgSize); //cut first half of sprite sheet
			} else if(playerObj.frame >= 3 ) { //if frame is 0
				ctx.drawImage(temp_head, smallImgSize, 0, smallImgSize, smallImgSize, playerObj.x, playerObj.y, smallImgSize, smallImgSize); //cut first half of sprite sheet
				ctx.drawImage(temp_body, smallImgSize, 0, smallImgSize, smallImgSize, playerObj.x, playerObj.y, smallImgSize, smallImgSize); //cut first half of sprite sheet
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