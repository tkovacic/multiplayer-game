var Entity = require("./entity.js");

module.exports = {
	init: function(id, playerCount) {
		var self = Entity.init();
		self.place = playerCount + 1;
		self.id = id;
		self.username = 'Guest ' + playerCount;
		self.number = "" + Math.floor(10 * Math.random());
		self.pressingRight = false;
		self.pressingLeft = false;
		self.pressingUp = false;
		self.pressingDown = false;
		self.clickFire = false;
		self.mouseAngle = 0;
		self.pressingDown = false;
		self.maxSpd = 3;
		self.right = false;
		self.status = 'standing';
		self.img = {
				source:"../../client/img/player/template-still-l.png",
				frameIndex:0,
				tickCount:0,
		};
		var super_update = self.update;
		self.update = function() {
			self.updateSpd();
			super_update();
			
			self.img.tickCount += 1;
			if(self.img.tickCount > 3) {
				self.img.tickCount = 0;
				if(self.img.frameIndex <= 6) {
					self.img.frameIndex +=1;
				} else {
					self.img.frameIndex = 0;
				}
			}
			
			if(self.clickFire) {
				self.fireBullet(self.mouseAngle);
			}
		}
		self.fireBullet = function(angle) {
			console.log('bang');
		}
		
		self.updateSpd = function() {
			if(self.pressingRight) {
				self.spdX = self.maxSpd;
				self.status = 'running';
				self.right = true;
				self.img.source = "../../client/img/player/template-run-r.png";
			}else if(self.pressingLeft) {
				self.spdX = -self.maxSpd;
				self.status = 'running';
				self.right = false;
				self.img.source = "../../client/img/player/template-run-l.png";
			}else{
				self.spdX = 0;
				if(!self.pressingRight) {
					if(!self.pressingLeft) {
						self.status = 'standing';
						if(self.right == true) {
							self.img.source = "../../client/img/player/template-still-r.png";
						} else {
							self.img.source = "../../client/img/player/template-run-l.png";
						}
					}
				}
			}
			if(self.pressingUp) {
				self.status = 'running';
				self.spdY = -self.maxSpd;
				if(self.right == true) {
					self.img.source = "../../client/img/player/template-run-r.png";
				} else {
					self.img.source = "../../client/img/player/template-run-l.png";
				}
			}else if(self.pressingDown) {
				self.status = 'running';
				self.spdY = self.maxSpd;
				if(self.right == true) {
					self.img.source = "../../client/img/player/template-run-r.png";
				} else {
					self.img.source = "../../client/img/player/template-run-l.png";
				}
			}else{
				self.spdY = 0;
				if(!self.pressingRight) {
					if(!self.pressingLeft) {
						self.status = 'standing';
						if(self.right == true) {
							self.img.source = "../../client/img/player/template-still-r.png";
						} else {
							self.img.source = "../../client/img/player/template-still-l.png";
						}
					}
				}
			}
			
			if(self.pressingUp != true && self.pressingDown != true && self.pressingRight != true && self.pressingLeft != true) {
				
			}
		}
		
		return self;
	},
	socket_events: function(socket, player) {
		socket.on('keypress', function(data) {
			if(data.inputID === 'left') {
				player.pressingLeft = data.state;
			}else if(data.inputID === 'right')
				player.pressingRight = data.state;
			else if(data.inputID === 'up')
				player.pressingUp = data.state;
			else if(data.inputID === 'down')
				player.pressingDown = data.state;
			else if(data.inputID === 'fire')
				player.clickFire = data.state;
			else if(data.inputID === 'mouseangle')
				player.mouseAngle = data.state;
		});
		
		socket.on('changeUsername', function(data) {
			player.username = data.inputID;
		});
	},
	refresh_pack: function(playerList) {
		var pack = [];
		for(var i in playerList) {
			var player = playerList[i];
			player.update();
			pack.push({
				username:player.username,
				x:player.x,
				y:player.y,
				img:player.img.source,
				facingRight:player.facingRight,
				frame:player.img.frameIndex,
				status:player.status,
			});
		}
		return pack;
	}
}