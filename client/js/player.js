player_class = function(input_id, input_owner, input_username, input_pressingRight, 
		input_pressingLeft, input_pressingUp, input_pressingDown, 
		input_clickFire, input_right, input_status, input_hSource, 
		input_bSource, input_frameIndex, input_tickCount, input_x, input_y) {
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
		headSource:input_hSource,
		bodySource:input_bSource,
		frameIndex:input_frameIndex,
		tickCount:input_tickCount,
	}
	self.x = input_x;
	self.y = input_y;
	
	return self;
}