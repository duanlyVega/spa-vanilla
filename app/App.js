import { Header } from "./components/Header.js";
import { Main } from "./components/Main.js";
import { Loader } from "./components/Loader.js";
import { $root } from "./helpers/utility.js";
import { Rooter } from "./components/Rooter.js";
import { infiniteScroll } from "./helpers/infiniteScroll.js";

export function App() {
  $root.innerHTML = null;
  $root.appendChild(Header({ $header: "header" }));
  $root.appendChild(Main());
  $root.appendChild(Loader({ $loader: "img" }));

  //Aquí estas las cartPosts y la lógica
  Rooter();
  infiniteScroll();
}
