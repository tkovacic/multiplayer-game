$( document ).ready(function() { //Init scripts when page is done loading
	var APP = new core();
	APP.init();
});

core = function() {
	var $this = this;
	//this.local_url = 'tdk-portfolio-herokuapp.com';
	var width = $(document).width() - 20;
	var height = 200;
	
	this.init = function() {
		var ctx = document.getElementById('ctx').getContext('2d');	//create 2d canvas
		ctx.fillStyle = 'white';
		$('#ctx').css('width', width);
		var socket = io('localhost:3000'); //https://multi-demo.herokuapp.com/      localhost:3000
		$this.initButtons(socket);
		socket.on('newPositions', function(data) { //whenever new positions are sent out
			ctx.clearRect(0,0,width,height); //clear canvas
			for(var i = 0; i < data.player.length; i++) { //foreach player in the game
				ctx.fillText(data.player[i].username, data.player[i].x + 15, data.player[i].y); //remap usernames
				var temp_img = document.createElement('img'); //generate image element
				temp_img.src = data.player[i].img; //provide proper sprite
				temp_img.id = data.player[i].id; //set id
				temp_img.width = (temp_img.width); //set width
				if(data.player[i].frame == 0) { //if frame is 0
					ctx.drawImage(temp_img, 0, 0, 64, 64, data.player[i].x, data.player[i].y, 64, 64); //cut first half of sprite sheet
				} else {
					ctx.drawImage(temp_img, 64, 0, 64, 64, data.player[i].x, data.player[i].y, 64, 64); //cut second half of sprite sheet
				}
			}
			for(var i = 0; i < data.bullet.length; i++) {
				ctx.fillRect(data.bullet[i].x - 5, data.bullet[i].y - 5, 10, 10);
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
	
	this.initButtons = function(socket) {
		$('#usernameBtn').on('click', function() {
			var user = $('#usernameText').val();
			console.log(user);
			socket.emit('changeUsername', {inputID:user});
			$('#username').modal('toggle');
		});
	}
};