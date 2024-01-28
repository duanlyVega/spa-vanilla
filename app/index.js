import api from "./helpers/wp_api.js";
import { App } from "./App.js";
import { d, w } from "./helpers/utility.js";

d.addEventListener("DOMContentLoaded", App);
w.addEventListener("hashchange", () => {
  api.page = 1;
  App();
});
