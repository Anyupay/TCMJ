'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "b660e160da4e6b001163222e2a1a3427",
"index.html": "921c16064560298e49eb767955bf7bd9",
"/": "921c16064560298e49eb767955bf7bd9",
"main.dart.js": "382c6e079549182c64d07e06e5d019f6",
"flutter.js": "a85fcf6324d3c4d3ae3be1ae4931e9c5",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "4301611657e2d0d2fd8693adf93158b1",
"assets/AssetManifest.json": "3e028156e86a3a003f89c86176d0f886",
"assets/NOTICES": "5b92ae9461e083f6bc547a3459dc1f21",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/assets/audios/herbal_medicine_room.mp3": "63e8dfdc4255b033e72e0c9f061d0491",
"assets/assets/audios/recognizing_medicine.mp3": "b4432e4c428a0dc3b763447ffa5851c1",
"assets/assets/audios/menu.mp3": "03d9c66144eac2d180de928ecf02d478",
"assets/assets/audios/acupuncture_room.mp3": "e940020903237a9a9215ee0b1394c1c8",
"assets/assets/audios/treatment_room.mp3": "4c4dd61d20ce03ffc7dba9c261be1783",
"assets/assets/images/backgrounds/acupuncture_room.jpg": "8c222bfe5550e5edd6becfaccccb20a9",
"assets/assets/images/backgrounds/treatment_room.jpg": "a794e6abecea9d9626b8a34fd9a8a922",
"assets/assets/images/backgrounds/tips.png": "f415e97c5dbb1fdad96e2ae2b01fdcd2",
"assets/assets/images/backgrounds/herbal_medicine_room.jpg": "077bde10f31d42d0ff24ce18457b9c35",
"assets/assets/images/backgrounds/plank.jpg": "de84ead04228b9d3fd9ba04a3191f7f3",
"assets/assets/images/backgrounds/back.png": "26044235d8be838e6731a1ebdd7893ea",
"assets/assets/images/backgrounds/cover_background.png": "863d92da64f5dff5e248b26717e71f06",
"assets/assets/images/cover.png": "1b9886761be0fbb2bdf8b82126968fe2",
"assets/assets/images/characters/angelica.png": "3c9c779c656725c4379518ad97b952e1",
"assets/assets/images/characters/chinese_doctor_wang.png": "ed9b70e9f25e914e05acbd31c5a73893",
"assets/assets/images/characters/book.png": "b8bf15ffd198f8051fa6f30558599c3b",
"assets/assets/images/characters/dried_tangerine.png": "423b36f44e2ad79677b66c50d8b52acb",
"assets/assets/images/characters/female_patient.png": "230f749addf65ec9c24f65805322bceb",
"assets/assets/images/characters/ginseng.png": "f4e2156ddb67150af6bf028d31a1cf51",
"assets/assets/images/characters/acupuncture_master.png": "85f002b341adf9a13ddfd3f94b7afdb4",
"assets/assets/images/characters/male_patient_half.png": "90761422572830e94f4323ee865218f3",
"assets/assets/images/characters/grandfather.png": "596d84976dade70c685f69be64cd9756",
"assets/assets/images/characters/old_man_li.png": "9c88e82e9a0270f3ea5068781630c913",
"assets/assets/images/characters/grandfather_half.png": "358b353f6863852ad79df73654c33b31",
"assets/assets/images/characters/female_patient_half.png": "ce76b707665748d0b488aebf9fdae472",
"assets/assets/images/characters/mentha_haplocalyx.png": "1887ff19b37d6c72990ac7850c8fc9d1",
"assets/assets/images/characters/male_patient.png": "f412022d3be118e7d1255f554c704eb9",
"assets/assets/images/characters/liquorice.png": "092863aae6db509a39ba933d2eb40c62",
"assets/assets/images/characters/astragalus_mongholicus.png": "b019a6b4c4d4a9d2d520543e5b5f1e93",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
