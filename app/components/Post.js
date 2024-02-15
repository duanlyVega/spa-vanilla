import { dateFormat } from "../helpers/utility.js";

export function Post(props) {
  //console.log(props);
  let { title, content, date } = props?.[0];
  console.log(props?.[0].lenght)
  console.log(props[0].lenght)

  if (props?.[0]) {
    alert("hola")
  }

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
