var exp = require("express");
var app = exp();
var router = exp.Router();
var template_index = require("jade").compileFile(__dirname + "/views/index.jade");
var template_education = require("jade").compileFile(__dirname + "/views/portfolio/education.jade");
var template_experience = require("jade").compileFile(__dirname + "/views/portfolio/experience.jade");
var template_projects = require("jade").compileFile(__dirname + "/views/portfolio/projects.jade");
var template_contact = require("jade").compileFile(__dirname + "/views/portfolio/contact.jade");

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
		var html = template_index ({ title : "TDK" });
		res.send(html);
	} catch (e) {
		next(e);
	}
});
router.get("/education", function(req, res, next) {
	try {
		var html = template_education ({ title : "TDK" });
		res.send(html);
	} catch (e) {
		next(e);
	}
});
router.get("/experience", function(req, res, next) {
	try {
		var html = template_experience ({ title : "TDK" });
		res.send(html);
	} catch (e) {
		next(e);
	}
});
router.get("/projects", function(req, res, next) {
	try {
		var html = template_projects ({ title : "TDK" });
		res.send(html);
	} catch (e) {
		next(e);
	}
});
router.get("/contact", function(req, res, next) {
	try {
		var html = template_contact ({ title : "TDK" });
		res.send(html);
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
app.listen(process.env.PORT || 3000, function() {
	console.log("listening at http://localhost:" + (process.env.PORT || 3000));
});