import { MyLocalStorage } from "../../../lockalStorage/lockalStorage";
import { AppHeader } from "../../common/app.header";
import { getKeytickets } from "../../../lockalStorage/keyLocalstorage";

export class TicketsUI {
  constructor(container) {
    this.container = container;
    this.tickets = null;
    this.storage = {};
    this.buttonRout = null;
    this.countTikets = 0;
  }

  renderTickets(tickets) {
    TicketsUI.clearContainer(this.container);

    if (!tickets.length) {
      this.showEmptyMsg();
      return;
    }

    let fragment = "";
    this.tickets = tickets;

    const btnUi = this.addButtonTickets();
    this.tickets.forEach((ticket) => {
      const template = TicketsUI.ticketTemplate(ticket, btnUi);
      fragment += template;
    });

    this.container.insertAdjacentHTML("afterbegin", fragment);

    document.querySelectorAll(".btn-buy").forEach((element, index) => {
      element.onclick = () => this.onBuyTicket(index);
    });
  }

  static clearContainer(container) {
    container.innerHTML = "";
  }

  showEmptyMsg() {
    const template = TicketsUI.emptyMsgTemplate();
    this.container.insertAdjacentHTML("afterbegin", template);
  }

  static emptyMsgTemplate() {
    return `
    <div class="tickets-empty-res-msg">
      По вашему запросу билетов не найдено.
    </div>
    `;
  }

  onBuyTicket(index) {
    const ticket = this.tickets[index];
    ticket["count"] = 1;
    const key = `${ticket["flight_number"]}${ticket["departure_at"].slice(
      0,
      2
    )}`;
    this.storage[key] = ticket;
    const lecketKey = getKeytickets();
    MyLocalStorage.setStore(lecketKey, this.storage);
    this.countTikets = document.querySelector(".countTiket");
    AppHeader.onCountTickets();
  }

  addButtonTickets() {
    return `
     <a class="waves-effect waves-light btn-small btn-buy">Купить</a>
    `;
  }

  reserchTicketStorage() {
    const key1 = getKeytickets();
    this.key1 = key1;
    this.storage = MyLocalStorage.getStore(this.key1);
  }

  static ticketTemplate(ticket, btnBox) {
    return `
   <div class='bought-ticket'>  
    <div class="col s12 m6">
      <div class="card ticket-card">
        <div class="ticket-airline d-flex align-items-center">
          <img
            src="${ticket.airline_logo}"
            class="ticket-airline-img"
          />
          <span class="ticket-airline-name"
            >${ticket.airline_name}</span
          >
        </div>
        <div class="ticket-destination d-flex align-items-center">
          <div class="d-flex align-items-center mr-auto">
            <span class="ticket-city">${ticket.origin_name}</span>
            <i class="medium material-icons">flight_takeoff</i>
          </div>
          <div class="d-flex align-items-center">
            <i class="medium material-icons">flight_land</i>
            <span class="ticket-city">${ticket.destination_name}</span>
          </div>
        </div>
        <div class="ticket-time-price d-flex align-items-center">
          <span class="ticket-time-departure">${ticket.departure_at}</span>
          <span class="ticket-price ml-auto">${ticket.price}$</span>
        </div>
        <div class="ticket-additional-info">
          <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
          <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
        </div>
        <div class="buy-ticket">
           ${btnBox}
        </div>
      </div>
    </div>
   </div> 
    `;
  }
}
