'use strict';

let filesToCache = [
  '.',
  'css/styles.css',
  'img/1.jpg',
  'img/2.jpg',
  'img/3.jpg',
  'img/4.jpg',
  'img/5.jpg',
  'img/6.jpg',
  'img/7.jpg',
  'img/8.jpg',
  'img/9.jpg',
  'img/10.jpg',
  'index.html',
  'restaurant.html',
  'js/main.js', 
  'js/restaurant_info.js',
  'data/restaurants.json'
];

let staticCacheName = 'restaurant-cache-v2';
//Adding cache
self.addEventListener('install', function(e){
	e.waitUntil(
		caches.open(staticCacheName).then(function(cache){
			cache.addAll(filesToCache);
		})	
	);
});
//Redirecting the fetch request to first look in the cache
self.addEventListener('fetch', function(e){
	e.respondWith(
		caches.match(e.request).then(function(response){
			if(response) return response;
			return fetch(e.request);
		})
	);
});

//Updating the cache
self.addEventListener('activate', function(e){
	e.waitUntil(
		caches.keys().then(function(cacheNames){
			return Promise.all(
				cacheNames.filter(function(cacheName){
				return cacheName.startsWith('restaurant-') && cacheName != staticCacheName
			}).map(function(cacheName){
				return caches.delete(cacheName);
				})
			);

		})
	);
});