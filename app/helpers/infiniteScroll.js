import { PostCard } from "../components/PostCard.js";
import { SearchCard } from "../components/SearchCard.js";
import { Ajax } from "./ajax.js";
import { d, w } from "./utility.js";
import api from "./wp_api.js";

export async function infiniteScroll() {
  let query = localStorage.getItem("wpSearch"),
    apiURL,
    Component; //High Order Components

  w.addEventListener("scroll", async () => {
    let { scrollHeight } = d.documentElement,
      { hash } = w.location,
      { innerHeight, scrollY } = w;

    //console.log(innerHeight, scrollY, scrollHeight);

    if (scrollHeight - innerHeight === scrollY) {
      api.page++;

      if (!hash || hash === "#/") {
        apiURL = `${api.POSTS}&page=${api.page}`;
        Component = PostCard;
      } else if (hash.includes("#/search")) {
        apiURL = `${api.SEARCH}${query}&page=${api.page}`;
        Component = SearchCard;
      } else {
        return false;
      }
      d.querySelector(".loader").style.display = "block";

      await Ajax({
        url: apiURL,
        cbSuccess: (posts) => {
          //console.log(posts);
          if (!posts.length === 0) {
            return false;
          } else {
            let html = "";
            posts.forEach((post) => (html += Component(post)));
            d.getElementById("main").insertAdjacentHTML("beforeend", html);
            d.querySelector(".loader").style.display = "none";
          }
        },
      });
    }
  });
}
