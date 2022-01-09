import { wfm } from "../tools/utill";

export function renderComponent(c) {
  if (!wfm.isUndefined(c.onInit)) {
    c.onInit();
  }
  c.render();

  if (!wfm.isUndefined(c.afterInit)) {
    c.afterInit();
  }
}
