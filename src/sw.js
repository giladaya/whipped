// version: 1.0
"use strict";

console.log("Hello from SW");
const CACHE_NAME = "whipped-cache";
const assets = [
  "/index.html",
  "/index.js",
  "/index.css",
  "/manifest.json",
  "/assets/whip_crack.mp3",
  "/assets/whip.jpg",
  "/assets/whip2.jpg",
  "/assets/wood-plank-texture.jpg",
  "/assets/icons/icon-192x192.png",
  "/assets/icons/icon-384x384.png",
  "/assets/icons/icon-72x72.png",
  "/assets/icons/icon-96x96.png",
  "/assets/icons/icon-152x152.png",
  "/assets/icons/icon-512x512.png",
  "/assets/icons/icon-144x144.png",
  "/assets/icons/icon-128x128.png",
  "/assets/whip_whoosh.mp3"
];

self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log("Caching all the things!");
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        console.log(`Fetching ${event.request.url} from cache`);
        return response;
      } else {
        console.log(`Fetching ${event.request.url} from server`);
        return fetch(event.request);
      }
    })
  );
});
