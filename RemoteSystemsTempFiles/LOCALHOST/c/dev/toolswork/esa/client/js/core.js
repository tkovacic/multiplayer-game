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
		$('#education').on('click', function() { $this.view_edu(); });
		$('#experience').on('click', function() { $this.view_exp(); });
		$('#projects').on('click', function() { $this.view_proj(); });
		$('#contact').on('click', function() { $this.view_contact(); });
		$('#education_down_arrow').on('click', function() { $this.view_edu(); });
		$('#experience_down_arrow').on('click', function() { $this.view_exp(); });
		$('#projects_down_arrow').on('click', function() { $this.view_proj(); });
		$('#site_down_arrow').on('click', function() { $this.view_site(); });
		$('#contact_down_arrow').on('click', function() { $this.view_contact(); });
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
	
	this.view_edu = function() {
		window.location.pathname = '/education';
		$('#home_li').removeClass('active');
		$('#education_li').addClass('active');
		$('#experience_li').removeClass('active');
		$('#projects_li').removeClass('active');
		$('#contact_li').removeClass('active');
	};
	
	this.view_exp = function() {
		window.location.pathname = '/experience';
		$('#home_li').removeClass('active');
		$('#education_li').removeClass('active');
		$('#experience_li').addClass('active');
		$('#projects_li').removeClass('active');
		$('#contact_li').removeClass('active');
	};
	
	this.view_proj = function() {
		window.location.pathname = '/projects';
		$('#home_li').removeClass('active');
		$('#education_li').removeClass('active');
		$('#experience_li').removeClass('active');
		$('#projects_li').addClass('active');
		$('#contact_li').removeClass('active');
	};
	
	this.view_site = function() {
		window.location.pathname = '/site';
		$('#home_li').removeClass('active');
		$('#education_li').removeClass('active');
		$('#experience_li').removeClass('active');
		$('#projects_li').addClass('active');
		$('#contact_li').removeClass('active');
	};
	
	this.view_contact = function() {
		window.location.pathname = '/contact';
		$('#home_li').removeClass('active');
		$('#education_li').removeClass('active');
		$('#experience_li').removeClass('active');
		$('#projects_li').removeClass('active');
		$('#contact_li').addClass('active');
	};
};