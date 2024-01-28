export const d = document;
export const w = window;
export const $root = d.getElementById("root");

export const dateFormat = (date) => {
  return (date = new Date(date).toDateString());
};
