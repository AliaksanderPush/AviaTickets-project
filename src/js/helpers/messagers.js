import { multiMedia } from "../multimedia/multimedia";

export const errMessager = (container, str) => {
  container.innerHTML = str;
  container.classList.add("invalid");
  multiMedia.errSound();
  multiMedia.vibro(100);
};

export const soccessMessager = (container, str) => {
  container.innerHTML = str;
  container.classList.add("soccess");
  multiMedia.vibro(200);
  multiMedia.successSound();
};
