import { d } from "./utility.js";

export async function Ajax({ url, cbSuccess }) {
  await fetch(url)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => cbSuccess(json))
    .catch((err) => {
      const message = err.statusText || "Ocurrió un error al acceder a la API";
      d.getElementById("main").innerHTML = `
          <div class="error">
            <p>Error ${err.status}: ${message}</p>
          </div>
        `;

      d.querySelector(".loader").style.display = "none";
      console.error(err);
    });
}
