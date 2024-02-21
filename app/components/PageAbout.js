export function PageAbout() {
  const $pageAbout = document.createElement("article");
  
  $pageAbout.classList.add("about");
  $pageAbout.innerHTML = `<h2>About Page</h2>`
  return $pageAbout
}