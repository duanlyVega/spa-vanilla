export function serviceWorker() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("./sw.js")
        .then((res) => {
          res.installing.state = null;
          res.addEventListener=()=>{
            res.installing.state = true

          }
        })
        .catch((err) => console.log("Error al tratar de registrar el sw", err));
    }


    if ('PushManager' in window) {
        throw new Error('No Push API Support!')
    }
  }