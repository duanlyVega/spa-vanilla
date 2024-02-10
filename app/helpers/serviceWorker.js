export function serviceWorker() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("./sw.js")
        .then((res) => {
          res.installing.state = "installing";

          res.addEventListener=(e)=>{
            e.installing.state = null;
            console.log(" Se a registrar el sw", e)
            

          }
        })
        .catch((err) => console.error("Error al tratar de registrar el sw", err));
    }


    if ('PushManager' in window) {
        throw new Error('No Push API Support!')
    }
  }