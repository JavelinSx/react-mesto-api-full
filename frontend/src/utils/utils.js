import Api from "./Api";
export const api = new Api("https://api.javelin.nomoredomains.icu", {
  "Content-Type": "application/json",
  Accept: "application/json",
  Origin: "https://javelin.nomoredomains.icu"
});
