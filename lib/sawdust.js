/*
 * sawdust.js: A simple web crawler and scraper which can be used via a RESTful interface and jQuery as a syntax for selecting HTML data.
 * It is implemented using node.js, express, request and cheerio.
 *
 * (C) Copyright 2013 Benjamin Bestmann
 * MIT LICENSE
 *
 */

// Import required modules
var http = require('http');
var url = require('url');
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');

// Create new express app
var app = express();

// Add required express middleware
app.use(express.bodyParser());

// Request for scraping a page
app.post('/scrape', function (req, res) {
	// Setup HTTP response headers
    res.contentType('application/json;charset=utf-8');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST");
    res.header("Access-Control-Allow-Headers", "content-type");
    res.charset = 'utf-8';
    // Fetch website using request
    request({"url": req.query.url, "encoding": "utf-8"}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
        	// Load website body using cheerio
            $ = cheerio.load(body);
            var obj = req.body;
            // Iterate over all properties
            for(var prop in obj) {
            	console.log("Scraping for property: '" + prop + "' using selector rule: '" + obj[prop] + "'");
            	var results = [];
            	$(obj[prop]).each(function(i,elem) {
            		//console.log("Adding element: " + $(this).text());
            		results[i] = $(this).text();
            	});
            	assignValueToProperty(obj, prop, results);
            }
            res.send(200, obj);
    	}
    });
});

// Create a new http server on port 3000 using express
http.createServer(app).listen(3000);

// Utility function to assign a value to a certain property of an object
function assignValueToProperty(obj, prop, value) {
	if (typeof prop === "string") {
		prop = prop.split(".");
	}
        
    if (prop.length > 1) {
        var e = prop.shift();
        assign(obj[e] =
                 Object.prototype.toString.call(obj[e]) === "[object Object]"
                 ? obj[e]
                 : {},
               prop,
               value);
    } else {
        obj[prop[0]] = value;
    }
}