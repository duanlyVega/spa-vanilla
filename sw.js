import { CreateErrorPage } from "./app/components/CreateErrorPage.js";

const CACHE_NAME = "v1_cache_spa_vanilla",
  urlsToCache = [
    "./",
    "./index.html",
    "./app/assets/style.css",
    "./app/index.js",
    "./app/assets/ball-triangle.svg",
    "./app/assets/javascript.png",
    "./app/assets/android/android-launchericon-48-48.png",
    "./app/assets/android/android-launchericon-72-72.png",
    "./app/assets/android/android-launchericon-96-96.png",
    "./app/assets/android/android-launchericon-144-144.png",
    "./app/assets/android/android-launchericon-192-192.png",
    "./app/assets/android/android-launchericon-512-512.png",
    "./app/assets/ios/16.png",
    "./app/assets/ios/20.png",
    "./app/assets/ios/29.png",
    "./app/assets/ios/32.png",
    "./app/assets/ios/192.png",
    "./app/assets/ios/512.png",
  ];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache).then(() => self.skipWaiting()))
      .catch((err) => console.log("Falló registro de cache", err))
  );
});

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener("activate", (e) => {
  const cacheWhitelist = [CACHE_NAME];

  e.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  );
});

// controlling service worker
self.addEventListener("message", (e) => {
  // e.source is a client object
  console.log(`Message received: ${e.data}`);
});


// cuando el navegador recupera una url
self.addEventListener("fetch", (e) => {
  // Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) {
        // recuperar del cache
        return res;
      }
      // recuperar de la petición a la url
      return fetch(e.request)
        .then((fetchRes) => {
          // Verificar si la respuesta es válida
          if (
            !fetchRes ||
            fetchRes.status !== 200 ||
            fetchRes.type !== "basic"
          ) {
            return fetchRes; // Retornar la respuesta, que puede ser un error
          }

          // Clonar la respuesta para poder almacenarla en caché y retornarla
          const resToCache = fetchRes.clone();

          // Abrir el caché y almacenar la respuesta clonada
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, resToCache);
          });

          // Retornar la respuesta original
          return fetchRes;
        })
        .catch((err) => {
          console.error("Error al realizar la solicitud:", err);
          // Aquí podrías retornar una página de error personalizada
          // statico  return caches.match("./error.html")
          // dinamico
          return CreateErrorPage();
        });
    })
  );
});
