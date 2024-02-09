import api from "./helpers/wp_api.js";
import { App } from "./App.js";
import { d, w } from "./helpers/utility.js";
const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
   const navegador = await navigator.serviceWorker
      .register("./sw.js")
      const res = navegador.pushManager
      .then((res) => console.log("Register services SW  ", res))
      .catch((err) => console.log("Error al tratar de registar el sw", err));
  }
  if ('PushManager' in window) {
    throw new Error('No Push API Support!')
  }
 
}





d.addEventListener("DOMContentLoaded", (e) => {
  App();
});
w.addEventListener("hashchange", () => {
  api.page = 1;
  App();
});
