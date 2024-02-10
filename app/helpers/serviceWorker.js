export function serviceWorker() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("./sw.js")
        .then((res) => {
          res.installing.state ="installing";
          console.log("Register services SW  ", res)
          res.installing.onstatechange=()=>{
            res.installing = null;
          console.log("Register services SW  ", res)

          }
        })
        .catch((err) => console.log("Error al tratar de registrar el sw", err));
    }

  /*swr.installing.state = "installing";
  swr.installing.onstatechange = () => {
  swr.installing = null;*/

  }
   
  