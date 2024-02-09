import api from "./helpers/wp_api.js";
import { App } from "./App.js";
import { d, w } from "./helpers/utility.js";
const registerServiceWorker = () => {
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

const requestNotificationPermission = async () => {
  const permission = await window.Notification.requestPermission();
  // value of permission can be 'granted', 'default', 'denied'
  // granted: user has accepted the request
  // default: user has dismissed the notification permission popup by clicking on x
  // denied: user has denied the request.
  if(permission !== 'granted'){
      throw new Error('Permission not granted for Notification');
  }
}
ServiceWorkerRegistration()
const permise = requestNotificationPermission().then(res=>{console.log(res)}).catch(err=>{console.log(err)})


d.addEventListener("DOMContentLoaded", (e) => {
  App();
});
w.addEventListener("hashchange", () => {
  api.page = 1;
  App();
});
