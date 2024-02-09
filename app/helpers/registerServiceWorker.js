export const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
     const navegador = await navigator.serviceWorker
        .register("./sw.js")
        const res = navegador.pushManager
        .then((res) => console.log("Register services SW  ", res.pushManager))
        .catch((err) => console.log("Error al tratar de registar el sw", err));
    }
    if ('PushManager' in window) {
      throw new Error('No Push API Support!')
    }
}