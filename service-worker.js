const CACHE_NAME = "jeomchu-v11.0";

const CACHE_FILES = [
    "./",
    "./index.html",
    "./manifest.json",
    "./service-worker.js",
    "./저메추.png"
];


/* =========================
   설치
========================= */

self.addEventListener(
    "install",
    event => {

        event.waitUntil(

            caches
                .open(CACHE_NAME)
                .then(
                    cache =>
                        cache.addAll(
                            CACHE_FILES
                        )
                )

        );

        self.skipWaiting();

    }
);


/* =========================
   활성화
========================= */

self.addEventListener(
    "activate",
    event => {

        event.waitUntil(

            caches
                .keys()
                .then(
                    cacheNames => {

                        return Promise.all(

                            cacheNames
                                .filter(
                                    name =>
                                        name !==
                                        CACHE_NAME
                                )
                                .map(
                                    name =>
                                        caches.delete(
                                            name
                                        )
                                )

                        );

                    }
                )

        );

        self.clients.claim();

    }
);


/* =========================
   요청
========================= */

self.addEventListener(
    "fetch",
    event => {

        event.respondWith(

            caches
                .match(
                    event.request
                )
                .then(
                    cachedResponse => {

                        if (
                            cachedResponse
                        ) {

                            return cachedResponse;

                        }


                        return fetch(
                            event.request
                        );

                    }
                )

        );

    }
);