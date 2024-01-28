import api from "./helpers/wp_api.js";
import { App } from "./App.js";
import { d, w } from "./helpers/utility.js";

function serviceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("./sw.js")
      .then((res) => console.log("Register services SW  ", res))
      .catch((err) => console.log("Error al tratar de registar el sw", err));
  }
}

d.addEventListener("DOMContentLoaded", (e) => {
  serviceWorker();
  App();
});
w.addEventListener("hashchange", () => {
  api.page = 1;
  App();
});
