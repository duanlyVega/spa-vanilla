import { Title } from "./Title.js";
import { Menu } from "./Menu.js";
import { SearchForm } from "./SearchForm.js";
import { d } from "../helpers/utility.js";

export function Header({ $header }) {
  $header = d.createElement("header");
  $header.classList.add("header");
  $header.appendChild(Title({ $h1: "h1" }));
  $header.appendChild(Menu());
  $header.appendChild(SearchForm({ $form: "form", $input: "input" }));

  return $header;
}
