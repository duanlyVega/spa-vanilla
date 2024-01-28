import { d } from "../helpers/utility.js";

export function Main() {
  const $main = d.createElement("main");
  $main.id = "main";

  if (!location.hash.includes("#/search")) $main.classList.add("grid-fluid");

  $main.classList.add("flex-box");

  return $main;
}
