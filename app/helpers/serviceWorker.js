export function serviceWorker() {
  const DOMAIN = "spa-duanly.netlify.app";
  
  if (location.host === DOMAIN) {
   

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("./sw.js")
        .then((res) => console.log("Register services SW  ", res))
        

        .catch((err) => console.log("Error al tratar de registrar el sw", err));
    }

    navigator.serviceWorker.addEventListener("message", (event) => {
      // event is a MessageEvent object
      console.log(`The service worker sent me a message: ${event.data}`);
    });

    navigator.serviceWorker.ready.then((registration) => {
      registration.active.postMessage("Hi service worker btk");
    });
  }

  }
   
  