import { wfm } from "../tools/utill";
import { navi, autocomplete, datepickers } from "../../plagins/materialize";

export class Component {
  constructor(config) {
    this.template = config.template;
    this.selector = config.selector;
    this.elem = null;
    this.form = null;
  }

  initMaterializeDatapicker() {
    datepickers(document.querySelectorAll(".datepicker"));
  }

  initMaterializeAutocomplite() {
    autocomplete(document.querySelectorAll(".autocomplete"));
  }

  initMaterializeSideNav() {
    navi(document.querySelectorAll(".sidenav"));
  }

  render() {
    this.elem = document.querySelector(this.selector);
    if (!this.elem) {
      throw new Error(`Component with ${this.selector} wasn't found!`);
    } else {
      this.elem.innerHTML = this.template;
    }
    this.initMaterializeAutocomplite();
    this.initMaterializeDatapicker();
    this.initMaterializeSideNav();
    initEvens.call(this);
    this.getForm();
  }

  getForm() {
    this.form = document.forms[0];
  }
}
function initEvens() {
  if (wfm.isUndefined(this.events)) return;
  let events = this.events();
  Object.keys(events).forEach((key) => {
    let listener = key.split(" ");
    let item = this.elem.querySelector(listener[1]);

    item.onclick = this[events[key]].bind(this);
  });
}
