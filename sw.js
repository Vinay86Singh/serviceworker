//importScripts('bower_components/sw-toolbox/sw-toolbox.js')
/*importScripts('node_modules/sw-toolbox/sw-toolbox.js');


var CACHE_VERSION = 1;
var CACHE_NAME = "common-cache" + CACHE_VERSION;

//var toolbox = new SWToolbox(CACHE_NAME, CACHE_VERSION);


self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

toolbox.options.debug = true;


var respondString = function(string) {
  return function() {
    return new Response(string);
  };
};

var respondOK = respondString('OK');
var respondError = function(reason) {
  return new Response('Error: ${reason}', {status: 500});
};

var rewrite = function(find, replace) {
  return function(request, values, options) {
    var req = new Request(request.url.replace(find, replace), request);
    var route = toolbox.router.match(req);
    if (!route) {
      return toolbox.router.default;
    }
    return route(req, values, options);
  }
};*/




var VERSION = 1;

var CACHES = {
    common: "common-cache" + VERSION
};

//var toolbox = new swtoolbox(CACHES, VERSION);
//console.log(toolbox);

// an array of file locations we want to cache
var filesToCache = [
    
    "./jquery-2.1.4.min.js",
    "./app.js"
   
];

var neededFiles = [
    "./index.html",
    
];

var errorResponse = function() {

    return new Response([
            "<h2>Failed to get file</h2>",
            "<p>Could not retrive response from cache</p>"
        ].join("\n"),
        500
    );
};

var networkFetch = function(request) {

    return fetch(request).then(function(response) {

        caches.open(CACHES["common"]).then(function(cache) {

            return cache.put(request, response);
        });

    }).catch(function() {
        console.error("Network fetch failed");
        return errorResponse();
    });
}

this.addEventListener("install", function(evt) {
    evt.waitUntil(
        caches.open(CACHES["common"]).then(function(cache) {

            // Cache before
            cache.addAll(filesToCache);
            return cache.addAll(neededFiles);
        })
    );
});

this.addEventListener("activate", function(event) {

    var expectedCacheNames = Object.keys(CACHES).map(function(key) {
        return CACHES[key];
    });

    console.log("Activate the worker");

    // Active worker won"t be treated as activated until promise resolves successfully.
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (expectedCacheNames.indexOf() === -1) {
                        console.log("Deleting out of date cache:",cacheName);
						console.log(caches);

                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", function(event) {
    console.log("Handling fetch event for", event.request.url);

    event.respondWith(

        // Opens Cache objects
        caches.open(CACHES["common"]).then(function(cache) {
            console.log("----");console.log(cache);
            return cache.match(event.request).then(function(response) {

                if (response) {
                    console.log("Found response in cache", response);

                    return response;
                } else {

                    return networkFetch(event.request);
                }
            }).catch(function(error) {

                // Handles exceptions that arise from match() or fetch().
                console.error("  Error in fetch handler:",error);

                return errorResponse();
            });
        })
    );
});


/*var mainHandler = function(request, values, options){
    console.log('main handlers');
   return new Response('Handled a request for ' + request.url +', where foo is "' + values.foo + '"'); 
 }*/
 
/*var getUpComingMoviesfun = function(upurl){
  console.log("----- upcoming movies fun----");
  console.log("url"+upurl);
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('GET', upurl);
    

    request.onload = function() {
      if (request.status == 200) {
        var arrayResponse = [];
        var result = JSON.parse(request.response);
        var movieData = result.result.data;
        resolve(movieData);
      } else {
        reject(Error(' error code:' + request.statusText));
      }
    };

    request.onerror = function() {
      reject(Error('There was a network error.'));
    };

    // Send the request
    request.send();
  });  
    
    
}*/
/*var getUpcomingMovies = function(){
    
    console.log("----- getUpcomingMovies movies fun----");
    
    var upcomingurl ='http://staging.matrix.popkorn.in/v1/movielanding?tab=1&city_id=1&city_name=Delhi+NCR&lat=28.5664852&lng=77.31830479999999&page=1&limit=18&source=web&device=Mozilla&deviceId=b37817ce&rid=b37817ce&city_id=1&city_name=Delhi';
    getUpComingMoviesfun(upcomingurl).then(function(res){
        console.log(res.length);
        console.log(res);
        if(res !=='undefined')
        {
            var div = document.getElementById('movielist');
            
            res.forEach(function(ele, index){
                var mainDiv = document.createElement('div');
                mainDiv.style.float = 'left';
                mainDiv.style.paddingRight = '15px';
                mainDiv.style.paddingLight = '15px';
                mainDiv.style.outline = "medium none";
                var childDiv = document.createElement('div');
                var imgEelement = document.createElement('img');
                imgEelement.src = (ele.media.portraits[0].url!='' && typeof ele.media.portraits[0].url)?ele.media.portraits[0].url:ele.media.images[0].url;
                var childDiv2 = document.createElement('div');
                childDiv2.style.float = "left";
                //childDiv2.style.float= 'left';
                childDiv2.appendChild(imgEelement);
                var childDiv3 = document.createElement('div');
                childDiv3.style.float="left";
                var textdiv = document.createElement('div');
                textdiv.appendChild(document.createTextNode(ele.movie_name));
                childDiv3.appendChild(textdiv);
                
                mainDiv.appendChild(childDiv2);
                mainDiv.appendChild(childDiv3);
                //div.appendChild(childDiv2);
                //div.appendChild(childDiv3);
                div.appendChild(mainDiv);
              
            });
        }
        
    });
    
}
    
    

 /*
 var upcomingHandler= function(request,values,options){
    console.log("--- upcoming handler ------");
    console.log(request);
    
     
 }


var respondString = function(string) {
  return function() {
    return new Response(string);
  };
};

var respondOK = respondString('OK');
var respondError = function(reason) {
  return new Response('Error: ${reason}', {status: 500});
};

var rewrite = function(find, replace) {
  return function(request, values, options) {
    var req = new Request(request.url.replace(find, replace), request);
    var route = toolbox.router.match(req);
    if (!route) {
      return toolbox.router.default;
    }
    return route(req, values, options);
  }
};


var upcominghandleroptions = {cache:{maxEntries:5,maxAgeSeconds:86400}};
var upcominghandler = function(request,values,upcominghandleroptions)
{
	console.log("--- upcoming handler function-----");
	return toolbox.cacheFirst(request).catch(function() {
		return toolbox.cacheOnly(request);
	});

};

//router paths
toolbox.precache(['/index.html',  '/serviceworkertest/jquery-2.1.4.min.js','/serviceworkertest/app.js','/serviceworkertest/app2.js']);
toolbox.router.get('/serviceworkertest/', toolbox.fastest);
toolbox.router.get('/serviceworkertest/upcoming-movies.html',upcominghandler);// toolbox.cacheFirst,{cache:{maxEntries:5,maxAgeSeconds:86400}});//,{cache:{maxEntries:5,maxAgeSeconds:86400}});
toolbox.router.get('/now-showing-movies.html', toolbox.fastest,{cache:{maxEntries:5,maxAgeSeconds:86400}});
toolbox.router.get('/theatres.html', toolbox.fastest,{cache:{maxEntries:5,maxAgeSeconds:86400}});*/



