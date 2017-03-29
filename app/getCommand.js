/* 
 * getCommand(command, callback)
 * 
 * pass a Bash command to getCommand, and receive
 * the main parts of the relevant man page!
 * 
 * Author: Peter Martinson
 * Date:   March 27, 2017
*/


const request = require('request'),
      cheerio = require('cheerio'),
      baseURL = 'http://man.he.net/man1/';

// get the command text from the URL
var fetchCommand = function(command, callback) {
  var mainURL = baseURL + command;
  request(mainURL, function(error, response, html) {
    if (error) callback(error);
    var $ = cheerio.load(html);
    callback(null, $('pre').html());
  });
}

module.exports = function(command, callback) {
  fetchCommand(command, function(error, man) {
    if (error) callback(error);

    var commandArray = man.split('\n'),
        toc          = [],
        sections     = [];

    // create TOC numbers
    commandArray.forEach(function(element, index) {
      if ( /^[A-Z]/.test(element) ) {
        toc.push(index);
      }
    });

    // create TOC section labels
    toc.forEach(function(element) {
      sections.push(commandArray[element]);
    });

    function createSection(title) {
      return commandArray.filter(function(element, index) {
        var sectionIndex    = toc[sections.indexOf(title.toUpperCase())];
        var nextSectionIndex = toc[sections.indexOf(title.toUpperCase())+1];
        if ( index > sectionIndex && index < nextSectionIndex ) {
          return element;
        }
      }).join('\n');
    }

    callback(null, {
      synopsis    : createSection('synopsis'),
      description : createSection('description'),
      options     : createSection('options'),
      examples    : createSection('examples')
    });
  });
}

// module.exports = function(man, callback) {
//   var commandArray = man.split('\n'),
//       toc          = [],
//       sections     = [],
//       synopsis     = '',
//       description  = '',
//       examples     = '',
//       seeAlso      = '';

//   // create TOC numbers
//   commandArray.forEach(function(element, index) {
//     if ( /^[A-Z]/.test(element) ) {
//       toc.push(index);
//     }
//   });

//   // create TOC section labels
//   toc.forEach(function(element) {
//     sections.push(commandArray[element]);
//   });

//   // function createSection(title) {
//   //   return commandArray.filter(function(element, index) {
//   //     var sectionIndex    = toc[sections.indexOf(title.toUpperCase())];
//   //     var nextSectionIndex = toc[sections.indexOf(title.toUpperCase())+1];
//   //     if ( index > sectionIndex && index < nextSectionIndex ) {
//   //       return element;
//   //     }
//   //   }).join('\n');
//   // }

//   synopsis = commandArray.filter(function(element, index) {
//     var synopsisIndex    = toc[sections.indexOf('SYNOPSIS')];
//     var nextSectionIndex = toc[sections.indexOf('SYNOPSIS')+1];
//     if ( index > synopsisIndex && index < nextSectionIndex ) {
//       return element;
//     }
//   }).join('\n');
  
//   description = commandArray.filter(function(element, index) {
//     var descriptionIndex = toc[sections.indexOf('DESCRIPTION')];
//     var nextSectionIndex = toc[sections.indexOf('DESCRIPTION')+1];
//     if ( index > descriptionIndex && index < nextSectionIndex ) {
//       return element;
//     }
//   }).join('\n');

//   options = commandArray.filter(function(element, index) {
//     var optionsIndex = toc[sections.indexOf('OPTIONS')];
//     var nextSectionIndex = toc[sections.indexOf('OPTIONS')+1];
//     if ( index > optionsIndex && index < nextSectionIndex ) {
//       return element;
//     }
//   }).join('\n');

//   examples = commandArray.filter(function(element, index) {
//     var examplesIndex = toc[sections.indexOf('EXAMPLES')];
//     var nextSectionIndex = toc[sections.indexOf('EXAMPLES')+1];
//     if ( index > examplesIndex && index < nextSectionIndex ) {
//       return element;
//     }
//   }).join('\n');

//   seeAlso = commandArray.filter(function(element, index) {
//     var seeAlsoIndex = toc[sections.indexOf('SEE ALSO')];
//     var nextSectionIndex = toc[sections.indexOf('SEE ALSO')+1];
//     if ( index > seeAlsoIndex && index < nextSectionIndex ) {
//       return element;
//     }
//   }).join('\n');

//   console.log("========== from getCommand ==========");
//   console.log("my Synopsis:\n" + synopsis + "\nmy Description:\n" + description);

//   callback({
//     synopsis    : synopsis,
//     description : description,
//     options     : options,
//     examples    : examples
//   });
//   // return {
//   //   synopsis    : synopsis,
//   //   description : description,
//   //   options     : options,
//   //   examples    : examples
//   // }
// }

// var fetchCommandText = function(url) {
//   var cmd = {
//     command     : '',
//     synopsis    : '',
//     description : '',
//     // options     : '',
//     examples    : '',
//     see_also    : ''
//   }
// }



// var parseCommand = function(command, callback) {
//   fetchCommand(command, function(error, man) {
//     if (!error) {
//       callback(man);
//     }
//   });

// module.exports = {

//   createTOC : function(man) {
//     var cmd        = {},
//         manByArray = man.split('\n'),
//         toc        = [],
//         sections   = [];

//     // create TOC numbers
//     manByArray.forEach(function(element, index) {
//       if ( /^[A-Z]/.test(element) ) {
//         toc.push(index);
//       }
//     });

//     // create TOC section labels
//     toc.forEach(function(element) {
//       sections.push(manByArray[element]);
//     });

//     var synopsis = '';
//     var description = '';

//     synopsis = manByArray.filter(function(element, index) {
//       var synopsisIndex    = toc[sections.indexOf('SYNOPSIS')];
//       var nextSectionIndex = toc[sections.indexOf('SYNOPSIS')+1];
//       if ( index > synopsisIndex && index < nextSectionIndex ) {
//         return element;
//       }
//     }).join('\n');
    
//     description = manByArray.filter(function(element, index) {
//       var descriptionIndex = toc[sections.indexOf('DESCRIPTION')];
//       var nextSectionIndex = toc[sections.indexOf('DESCRIPTION')+1];
//       if ( index > descriptionIndex && index < nextSectionIndex ) {
//         return element;
//       }
//     }).join('\n');

//     return "my Synopsis:\n" + synopsis + "\nmy Description:\n" + description;
//   },

//   parseManPage : function(man) {
//     var cmd = {},
//         manByArray = man.split('\n');

//     return manByArray;
//   }

// }


