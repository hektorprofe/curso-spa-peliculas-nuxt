importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/08c24417fcd9848007b3.js",
    "revision": "1211a02c5abf042c797bef8aac57de5c"
  },
  {
    "url": "/_nuxt/35ade206fc11bdada228.js",
    "revision": "aae86d0c42b44723add9225af1a0efe8"
  },
  {
    "url": "/_nuxt/4c74ff89f833e2d76e17.js",
    "revision": "7df15419267f0b5022a76acf410bb487"
  },
  {
    "url": "/_nuxt/86d5a97a479a4df74564.js",
    "revision": "025195a071967be61da18705fa097c7c"
  },
  {
    "url": "/_nuxt/8b30317b16f388cdea4b.js",
    "revision": "9de983d7218c5a73ba1233287a54e2ac"
  },
  {
    "url": "/_nuxt/a787bd3e48c77062f99f.js",
    "revision": "e60d9d212b779bddc8296832181e1358"
  }
], {
  "cacheId": "cli_peliculas",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
