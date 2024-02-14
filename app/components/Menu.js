import { d } from "../helpers/utility.js";

export function Menu() {
  const $menu = d.createElement("nav");

  $menu.classList.add("menu");
  $menu.innerHTML = `
  <a href="#/">Home</a>
  <span>-</span>
  <a href="#/search">Búsqueda</a>
  <span>-</span>
  <a href="https://github.com/duanlyVega/spa-vanilla" target="_blank" rel="noopener">Github</a>
  <span>-</span>
  <a href="#/contact">Contacto</a>
  <span>-</span>
  <a href="#/about">Aserca de Mi</a>


  `;

  return $menu;
}
