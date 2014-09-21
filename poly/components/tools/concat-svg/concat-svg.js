/*
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

#!/usr/bin/env node

var fs = require('fs');
var cheerio = require('cheerio');
var path = require('path');

var cheerioOptions = {xmlMode: true};
var files = process.argv.slice(2);

function read(file) {
  var content = fs.readFileSync(file, 'utf8');
  return cheerio.load(content, cheerioOptions);
}

function transmogrify($, name) {
  var node = $('svg');
  // remove spacer rectangles
  node.find('rect[fill], rect[style *= fill]').remove();
  // remove fill colors
  node.find('[fill]').each(function() {
    var e = $(this);
    var color = e.attr('fill');
    // some "white" nodes are extraneous
    if (color === '#FFFFFF') {
      e.remove();
    } else {
      e.removeAttr('fill');
    }
  });
  // remove adobe "save for web" elements
  node.find('sfw,metadata').remove();
  // remove empty groups
  var innerHTML = $.xml(node.find('*').filter(':not(g)'));
  // remove extraneous whitespace
  innerHTML = innerHTML.replace(/\t|\r|\n/g, '');
  // add parent group with icon name as id
  var output = '<g id="' + name + '">' + innerHTML + '</g>';
  // print icon svg
  console.log(output);
}

function path2IconName(file) {
  parts = path.basename(file).split('_');
  // remove ic_
  parts.shift();
  // remove _24px.svg
  parts.pop();
  return parts.join('-');
}

files.forEach(function(file) {
  var name = path2IconName(file);
  var $ = read(file);
  transmogrify($, name);
});
