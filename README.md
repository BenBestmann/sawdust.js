sawdust.js
==========

Sawdust.js is a simple web crawler and scraper which can be used via a RESTful interface and jQuery as a syntax for 
It is implemented using [node.js](http://nodejs.org/), [express](http://expressjs.com/), [request](https://github.com/mikeal/request) and [cheerio](https://github.com/MatthewMueller/cheerio).

If you interested in this project or my work, you can follow me on Twitter: [@BenBestmann](https://twitter.com/BenBestmann)
## Basic Usage
Sawdust.js can be used via a RESTful interface. It basically provides one simple endpoint for performing scraping jobs:
```
POST http://localhost:3000/scrape
```
This request allows to specify a parameter for passing the URL for the website you would like to scrape data from:
```
POST http://localhost:3000/scrape?url=http://news.ycombinator.com/
```
## Scraping Jobs
In order to extract information from websites you have to specify at least one scraping job. You do this by seting up a JSON object and append it to the body of the HTTP POST request. For example to fetch the current top stories from [Hacker News](https://news.ycombinator.com/), you could use the following JSON:
```javascript
{"stories":".title a"}
```
Every scraping job consist is represented by an attribute and it's accoring value. The attribute name is totally up to you. The attribute value has to be a valid [jQuery selector](http://api.jquery.com/category/selectors/). Here is the accoring HTML from the Hacker News homepage:
```html
<td class="title">
  <a href="http://docs.python.org/dev/whatsnew/3.4.html">What’s New In Python 3.4</a>
</td>
```
You can setup multiple scraping jobs at once, by adding more attributes to the JSON.

## Fetching Results
The results are contained in the repsonse body that is returned from the server. Basically this response contains a JSON object with the same structure as the one that was contained in the API request. However now the attributes values no longer contain your jQuery selector, but the data that has been retrieved from the website. This data takes the form of an array of strings, containg a plain text version of the contents of the selected HTML elements.
To continue the example from above:
```javascript
{
  "stories":[
    "What’s New In Python 3.4",
    "WYSIWTFFTWOMG",
    "The genius and folly of MongoDB",
    "This is a valid ipv4 address"
  ]
}
```

##Testing
Currently there are no automated tests implemented. I will do that with the next version.

##License
The MIT License (MIT)

Copyright (c) 2013 Benjamin Bestmann

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
