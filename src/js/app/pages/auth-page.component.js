import { Component } from "framework/core/component";
import { ValidForm } from "./validForm/validForm";
import { multiMedia } from "../../multimedia/multimedia";
import { TicketsUI } from "./home-page-view/ticket";
import { MyLocalStorage } from "../../lockalStorage/lockalStorage";
import {
  getKeytickets,
  getKeyticketsAll,
} from "../../lockalStorage/keyLocalstorage";

import { AppHeader } from "../common/app.header";
import { Server } from "../../service/server";
import { errMessager, soccessMessager } from "../../helpers/messagers";

class AuthPageComponent extends Component {
  constructor(config) {
    super(config);
    this.formForContact = null;
    this.validForm = null;

    this.storeTickets = {};
    this.renderElem = null;

    this.btnMinus = null;
    this.btnPlus = null;
    this.viewCountTickets = null;
    this.remBtn = null;
    this.removeTicket = null;
    this.key1 = "";
    this.key2 = "";
    this.forma = null;
    this.summa = null;
    this.mess = null;
  }

  afterInit() {
    // form
    this.formForContact = document.forms["letAsHelp"];
    this.validForm = new ValidForm(this.formForContact);
    this.validForm.startValid();
    // Bought tickets

    const key1 = getKeytickets();
    const key2 = getKeyticketsAll();
    this.key1 = key1;
    this.key2 = key2;
    this.storeTickets = MyLocalStorage.getStore(this.key1);
    this.renderElem = document.querySelector(".show-tickets");

    if (!this.storeTickets) {
      this.showEmptyMessage();
    } else {
      TicketsUI.clearContainer(this.renderElem);
      this.renderBoughtTickets();
    }
    AppHeader.onCountTickets();
  }

  onListener() {
    this.btnMinus = document.querySelectorAll(".button-minus");
    this.btnPlus = document.querySelectorAll(".button-plus");
    this.viewCountTickets = document.querySelectorAll(".view-count-tickets");
    this.remBtn = document.querySelectorAll(".button-remove");
    this.summa = document.querySelector(".summa");
    this.mess = document.querySelector(".message");

    this.remBtn.forEach((item) => {
      item.addEventListener("click", this.removeTickets.bind(this));
    });
    this.btnMinus.forEach((item) => {
      item.addEventListener("click", this.btnCountMinus.bind(this));
    });
    this.btnPlus.forEach((item) => {
      item.addEventListener("click", this.btnCountPlus.bind(this));
    });
  }

  events() {
    return {
      "submit .user-sub": "onUserFormSubmit",
    };
  }

  onUserFormSubmit(event) {
    event.preventDefault();
    const result = this.validForm.onValidForm();

    if (!result) {
      return;
    } else {
      soccessMessager(this.mess, "Спасибо, мы с Вами скоро свяжемся!");
      this.afterInit();
      this.sendInfo(result);
      MyLocalStorage.removeLocalStorage(this.key1);
      MyLocalStorage.removeLocalStorage(this.key2);
    }
  }

  async sendInfo(data) {
    let ticketInfo = this.storeTickets;
    if (!ticketInfo) {
      ticketInfo = await MyLocalStorage.getStore(this.key1);
    }
    let info = {
      user: data,
      tickets: ticketInfo,
    };
    console.log(info);
    const server = new Server(info);
    server.storeInfo();
  }

  showEmptyMessage() {
    const template = AuthPageComponent.emptyMesTemplate();
    this.renderElem.innerHTML = template;
  }

  static emptyMesTemplate() {
    return `
    <h3 style="color:red">Корзина пуста</h3>
    `;
  }

  addButtonCounter(ticket, articul, index) {
    return `
      <div class="button-box">
         <p>Артикул ${articul}${index}</p>
         <button class="button-plus btn-small waves-effect waves-light" data-id=${articul}${index} >+</button>
         <span class="view-count-tickets">${ticket.count}</span>
         <button class="button-minus btn-small waves-effect  waves-light" data-id=${articul}${index}>-</button>
         <p><button class="button-remove btn-small waves-effect waves-light" data-id=${articul}${index} >удалить</button></p>
      </div>
      `;
  }

  renderBoughtTickets() {
    TicketsUI.clearContainer(this.renderElem);
    let fragment = "";
    Object.values(this.storeTickets).forEach((ticket) => {
      const template = TicketsUI.ticketTemplate(
        ticket,
        this.addButtonCounter(
          ticket,
          ticket["flight_number"],
          ticket["departure_at"].slice(0, 2)
        )
      );
      fragment += template;
    });
    this.renderElem.insertAdjacentHTML("beforeEnd", fragment);
    this.onListener();
    this.viewPriceTicket();
  }

  removeTickets(event, key = event.target.dataset.id) {
    event.preventDefault();
    if (key in this.storeTickets) {
      delete this.storeTickets[key];
      MyLocalStorage.setStore(this.key1, this.storeTickets);
      AppHeader.onCountTickets();
      this.renderBoughtTickets();
    }
  }

  btnCountMinus(event) {
    const id = event.target.dataset.id;
    const ticket = this.storeTickets[id];
    ticket["count"]--;
    this.renderBoughtTickets(ticket);

    if (ticket["count"] === 0) {
      this.removeTickets(event, id);
    }
  }

  btnCountPlus(event) {
    const id = event.target.dataset.id;
    const ticket = this.storeTickets[id];
    ticket["count"]++;
    this.renderBoughtTickets();

    if (ticket["count"] === 10) {
      alert("Зачем Вам столько билетов?");
      return;
    }
  }

  viewPriceTicket() {
    const boughtTickets = Object.values(this.storeTickets);
    let sum = 0;
    boughtTickets.forEach((item) => {
      sum += item["count"] * item["price"];
    });
    this.summa.innerHTML = sum;
  }
}

export const authPageComponent = new AuthPageComponent({
  selector: "app-auth-page",
  template: `
 <div class="wrap-auth">
   <div class="auth-h6">
     <h6>Оставьте свои данные и мы свяжемся с Вами</h6>
   </div>
     <div class="row">
   <div class="col xl6 l12  m12 s12 center-align ">
      <div class="show-tickets">
      </div>
      <p class="wind-summa">Стоимость купленных билетов:<span class="summa">0$</span>
   </div>
   <div class="col xl6 l12  m5 s12 ">
      <div class="row heit">
         <div class="col xl6 offset-xl2 l4 offset-l4 m12 offset-m8 s12 ">
            <form  name="letAsHelp" action="#">
               <div class="input-field ">
                  <i class="material-icons prefix">account_circle</i>
                  <input name="user"
                         id="user_name"
                         type="text"
                         data-required = "text"
                         data-err="Вы не заполнили поле, либо его длина превышает 20 символов!"
                         >
                        <label for="user_name">Name</label>
               </div>
               <div class="input-field">
               <i class="material-icons prefix">create</i>
               <input id="password"
                      type="password"
                      name="password"
                      data-required = "password"
                      data-err="Пароль должен содержать латиницу + цифры (минимум 1 цифру)!"
                       >
               <label for="password">Password</label>
               </div>
               <div class="input-field ">
                  <i class="material-icons prefix">email</i>
                  <input name="email"
                         id="user_email"
                         type="email"
                         data-required = "email"
                         data-err="Вы не заполнили поле, либо ввели email некоректно!"
                         >
                  <label for="user_email">Email</label>
               </div>
               <div class="input-field ">
                  <i class="material-icons prefix">phone</i>
                  <input name="telephone"
                         id="user_telephone"
                         type="tel"
                         data-required = "telephone"
                         data-err="Вы не заполнили поле, либо ввели номер телефона некоректно!" 
                         placeholder="                    +375291234567"
                         >
                  <label for="user_telephone">Telephone</label>
               </div>
               <div class="input-field ">
                  <i class="material-icons prefix">comment</i>
                  <textarea id="textarea1"
                            class="materialize-textarea"
                            name = "textarea"
                            data-required = "textarea"
                            data-err="Вы не заполнили поле, либо его длина превышает 200 символов!"
                            ></textarea>
                  <label for="textarea1">Comments</label>
               </div> 
               <div>
                  <button class="btn waves-effect waves-light user-sub" type="submit" name="action">Купить
                     <i class="material-icons right">send</i>
                  </button>
               </div>
            </form>
            <div class="message"></div>
            </div>
         </div>
      </div>
</div>
</div>
   `,
});
