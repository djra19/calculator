/*
		Service Worker para 'Calculadora'
		Version 1.0.0
*/
var CACHE_NAME = "calculator-cache-v1";
var CACHE_FILELIST = [
  "./",
  "./index.html",
  "./scripts/base/app.js",
  "./scripts/base/utils.js",
  "./scripts/thirdparty/polyfill.js",
  "./scripts/thirdparty/ripple.js",
  "./style/base/app.css",
  "./style/thirdparty/ripple.css",
  "./style/thirdparty/font-awesome.min.css",
  "./style/thirdparty/fonts/fontawesome-webfont.ttf"
];

self.addEventListener("install", function(e) {
	e.waitUntil(caches.open(CACHE_NAME)
		.then(function(cache) {
			return cache.addAll(CACHE_FILELIST);
	}));
});

self.addEventListener("fetch", function(e) {
  e.respondWith(caches.match(e.request)
    .then(function(req) {
    	if(req)
    		return req;
		  else
		    fetch(e.request).then(function(res) {
				  caches.open(CACHE_NAME).then(function(cache) {
						cache.put(e.request, res.clone());
						return res;
					});
				});
		}));
});