import { Ajax } from "../helpers/ajax.js";
import { d } from "../helpers/utility.js";
import api from "../helpers/wp_api.js";
import { PostCard } from "./PostCard.js";
import { Post } from "./Post.js";
import { SearchCard } from "./SearchCard.js";
import {ContactForm} from "./ContactForm.js"
export async function Rooter() {
  let { hash } = location;

  //console.log(hash);
  //Creo un variable html para poder recoger el contenido del PostCard
  let html = "",
    $main = d.getElementById("main"),
    components;

  $main.innerHTML = null;

  if (!hash || hash === "#/") {
    //Home
    await Ajax({
      url: api.POSTS,
      cbSuccess: (posts) => {
        //console.log(posts);
        posts.forEach(
          (post) => (html += PostCard(post)) /*, console.log(html)*/
        );

        $main.innerHTML = html;
      },
    });
  } else if (hash.includes("#/search")) {
    //Search interno

    let query = localStorage.getItem("wpSearch");

    if (!query) {
      d.querySelector(".loader").style.display = "none";

      return false;
    }

    await Ajax({
      url: `${api.SEARCH}${query}`,
      cbSuccess: (search) => {
        //console.log(search)

        // si no trae resultado de busqueda le mando un mensaje de error
        if (search.length === 0) {
          html = `
         <p class="error">
           No existen resultados de busquedas par el termindo 
           <mark>${query}</mark>
         </p>
        `;
        } else {
          search.forEach((getPost) => (html += SearchCard(getPost)));
        }
        $main.innerHTML = html;
      },
    });
  } else if (hash === "#/contact") {
    html += ContactForm()
    $main.innerHTML = html
  } else {
    await Ajax({
      url: `${api.POST}?slug=${hash.slice(2)}`,
      cbSuccess: (post) => {
        $main.innerHTML = Post(post);
      },
    });
  }

  d.querySelector(".loader").style.display = "none";
}
