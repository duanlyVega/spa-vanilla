export function serviceWorker() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("./sw.js")
        .then((res) => console.log("Register services SW  ", res))
        navigator.serviceWorker.ready.then(register=>{
          register.active.postMessage("Test message sent immediately after creation")
        })

        .catch((err) => console.log("Error al tratar de registrar el sw", err));
    }

  /*swr.installing.state = "installing";
  swr.installing.onstatechange = () => {
  swr.installing = null;*/

  }
   
  