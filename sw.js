/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.0/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "assets/icons/icon-128x128.png",
    "revision": "665699ca3bd99d84d38c8838e199e649"
  },
  {
    "url": "assets/icons/icon-144x144.png",
    "revision": "113c40ed22596e7d93729d2a0802d5fc"
  },
  {
    "url": "assets/icons/icon-152x152.png",
    "revision": "f77a5412249f85441474bb7e6c564406"
  },
  {
    "url": "assets/icons/icon-192x192.png",
    "revision": "9ffd6d3373c1da05d791098974f1406c"
  },
  {
    "url": "assets/icons/icon-384x384.png",
    "revision": "084791c89c2cbc964e55c9d2b887f879"
  },
  {
    "url": "assets/icons/icon-512x512.png",
    "revision": "3a16c593d212a359881bd3f9396b6ddd"
  },
  {
    "url": "assets/icons/icon-72x72.png",
    "revision": "95e7914c7984415ad15edb57ea7ad5b9"
  },
  {
    "url": "assets/icons/icon-96x96.png",
    "revision": "14aa721b66b9d210f52ecbc973057379"
  },
  {
    "url": "assets/whip_crack.mp3",
    "revision": "883d1876ac85ca4d70a086f6ab2fefdb"
  },
  {
    "url": "assets/whip_whoosh.mp3",
    "revision": "af0885f071e3bbfc01eff696eaba6012"
  },
  {
    "url": "assets/whip.jpg",
    "revision": "5c458caceb0fe2c38552f67c88b7fa09"
  },
  {
    "url": "assets/whip2.jpg",
    "revision": "d1ff6ff1f14b6f91ce67de14a4a08e24"
  },
  {
    "url": "assets/wood-plank-texture.jpg",
    "revision": "e41e685444d1473a4c353360813f5bd6"
  },
  {
    "url": "index.css",
    "revision": "ef35e20dd099686eaab3d9b682b52d1f"
  },
  {
    "url": "index.html",
    "revision": "bbfcf868d81bc79fe84662616a834075"
  },
  {
    "url": "index.js",
    "revision": "c03d37f2e380b29ef80e0a90879cacb6"
  },
  {
    "url": "manifest.json",
    "revision": "5ab739c1cf54ca1b6232bea145ebdf0f"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
