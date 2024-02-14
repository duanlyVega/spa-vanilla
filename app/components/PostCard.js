import { dateFormat } from "../helpers/utility.js";

export function PostCard(props) {
  //console.log(props);
  const { id, title, _embedded, date, slug } = props;
  let urlPost = _embedded["wp:featuredmedia"]
    ? _embedded["wp:featuredmedia"][0].source_url
    : "app/assets/favicon.ico";

  return `
    <article class="post-card">
     <img src="${urlPost}" alt="${title.rendered}" loading="lazy" >
     <h2>${title.rendered}</h2>
     <p>
      <time datetime="${dateFormat(date)}">${dateFormat(date)}</time>
      <a href="#/${slug}" data-id="${id}">Ver Publicación</a>

     </p>
    </article>
  `;
}
