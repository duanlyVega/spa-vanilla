import { d } from "../helpers/utility.js";

export function SearchForm({ $form, $input }) {
  $form = d.createElement($form);
  $input = d.createElement($input);
  $input.name = "search";
  $input.type = "search";
  $input.placeholder = "Search";
  //$input.classList.add("prueba");
  $input.autocomplete = "off";
  $input.arialabel = "Search through site content";

  $form.classList.add("form-search");
  $form.appendChild($input);

  //creamos una condicion para que se quede lo que busca el client en el form-search lo que esta en localStorage
  if (location.hash.includes("#/search")) {
    $input.value = localStorage.getItem("wpSearch");
  }

  //para eliminar lo que introduce el client cuando aprienta tachecito x
  d.addEventListener("search", (e) => {
    if (!e.target.marches("input[type='search']")) return false;
    //elimina lo que esta guardado en localStorage
    if (!e.target.value) localStorage.removeItem("wpSearch");
  });

  d.addEventListener("submit", (e) => {
    if (!e.target.matches(".form-search")) return false;

    localStorage.setItem("wpSearch", e.target.search.value);
    location.hash = `#/search?search=${e.target.search.value}`;

    e.preventDefault();
  });
  return $form;
}
