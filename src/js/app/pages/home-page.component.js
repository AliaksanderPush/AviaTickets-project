import { Component } from "framework/core/component";
import { flightanimation } from "../../animations/flightanimation";
import { FormControl } from "./home-page-view/formControl";
import { MyLocalStorage } from "../../lockalStorage/lockalStorage";
import { getKeyticketsAll } from "../../lockalStorage/keyLocalstorage";
import { TicketsUI } from "./home-page-view/ticket";

class HomePageComponent extends Component {
  constructor(config) {
    super(config);
    this.template = config.template;
    this.selector = config.selector;
    this.formControl = null;
    this.key2 = "";
    this.storageTicketAll = {};
    this.tickets;
  }

  afterInit() {
    flightanimation();
    const control = new FormControl({
      form: document.forms["locationControls"],
      origin: document.getElementById("autocomplete-origin"),
      destination: document.getElementById("autocomplete-destination"),
      return: document.getElementById("datepicker-return"),
      depart: document.getElementById("datepicker-depart"),
      tickets: document.querySelector(".tickets-sections .row"),
    });
    this.formControl = control;
    this.formControl.initApp();

    this.key2 = getKeyticketsAll();
    this.storageTicketAll = MyLocalStorage.getStore(this.key2);

    if (this.storageTicketAll) {
      this.tickets = new TicketsUI(
        document.querySelector(".tickets-sections .row")
      );
      this.tickets.renderTickets(this.storageTicketAll);
      this.tickets.reserchTicketStorage();
      this.onClearDisplay();
      document.querySelector(".clear-display").classList.add("show");
    }
  }

  events() {
    return {
      "submit .btn": "onButtonSubmit",
      "keyup .clear-display": "onClearDisplay",
      "touchmove .map": "onTouchMove",
    };
  }

  onTouchMove() {
    if (
      "ontouchmove" in window ||
      (window.DocumentTouch && document instanceof DocumentTouch)
    ) {
      document.getElementById("autocomplete-origin").focus();
    }
  }

  onButtonSubmit(event) {
    event.preventDefault();
    if (event.target.classList.contains("btn")) {
      this.formControl.onFormSubmit();
    }
  }

  onClearDisplay(event) {
    document.addEventListener("keydown", (event) => {
      if (event.ctrlKey && ["Q", "q"].includes(event.key)) {
        event.preventDefault();
        MyLocalStorage.removeLocalStorage(this.key2);
        this.storageTicketAll = {};
        this.tickets.renderTickets(this.storageTicketAll);

        document.querySelector(".clear-display").classList.remove("show");
      }
    });
  }
}
export const homePageComponent = new HomePageComponent({
  selector: "app-home-page",
  template: `
      ${FormControl.renderForm()}
       <div class="tickets-sections">
         <div class="container">
           <div class="row"></div>
         </div>
       </div>
   `,
});
