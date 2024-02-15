import { dateFormat } from "../helpers/utility.js";

export function Post(props) {
  //console.log(props);
  if (!props[0]) return false
  let { title, content, date } = props?.[0];
 


  return `
  <section id="post-page">
    <aside>
      <h2>${title.rendered}</h2>
      <time class="datetime">${dateFormat(date)}</time>
    </aside>
  <hr />
    <article>${content.rendered}</article>
  </section>
  `;
}
