import { d } from "../helpers/utility.js";

export function Loader({ $loader }) {
  $loader = d.createElement($loader);
  $loader.src = "./app/assets/ball-triangle.svg";
  $loader.alt = "Cargando...";
  $loader.classList.add("loader");
  return $loader;
}
