$( document ).ready(function() {
	var APP = new core();
	APP.init();
});

core = function() {
	var $this = this;
	//this.local_url = 'tdk-portfolio-herokuapp.com';
	
	this.init = function() {
		console.log('core.js reporting');
		$this.initButtons();
		
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			$('[id^=column]').removeClass('list-column');
			$('[id$=down_arrow]').css('width', '30%');
		}
	};
	
	this.initButtons = function() {
		$('#home').on('click', function() { $this.view_home(); });
		$('#home_down_arrow').on('click', function() { $this.view_home(); });
		$('#top_page_btn').on('click', function() { $("html, body").animate({ scrollTop: 0 }, 500); });
	};
	
	this.view_home = function() {
		window.location.pathname = '/';
		$('#home_li').addClass('active');
		$('#education_li').removeClass('active');
		$('#experience_li').removeClass('active');
		$('#projects_li').removeClass('active');
		$('#contact_li').removeClass('active');
	};
};