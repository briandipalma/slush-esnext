"use strict";

var path = require("path");

var gulp = require("gulp");
var inquirer = require("inquirer");
var install = require("gulp-install");
var template = require("gulp-template");
var conflict = require("gulp-conflict");

var prompts = [{
	type: "input",
	name: "packageName",
	default: "esnext-package",
	message: "What do you want to call your new ES next package?"
}];

var templatesDirectory = path.join(__dirname, "templates", "**");

function questionsAnswered(done, answers) {
	console.info(answers);

	gulp.src(templatesDirectory)
		.pipe(template(answers))
		.pipe(conflict("./"))
		.pipe(gulp.dest("./"))
		.pipe(install())
		.on("end", function() {
			done();
		});
}

gulp.task("default", function(done) {
	inquirer.prompt(prompts, questionsAnswered.bind(null, done));
});
