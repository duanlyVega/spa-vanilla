export function serviceWorker() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("./sw.js")
        .then((res) => console.log("Register services SW  ", res))
        .catch((err) => console.log("Error al tratar de registrar el sw", err));
    }


    if ('PushManager' in window) {
        throw new Error('No Push API Support!')
    }
  }