import { Component } from "framework/core/component";
import { texAnimation } from "../../animations/textanimation";
import { ValidForm } from "./validForm/validForm";
import { TicketsUI } from "../pages/home-page-view/ticket";
import { errMessager, soccessMessager } from "../../helpers/messagers";

import a1 from "./../../../img/a1.jpg";
import a2 from "./../../../img/a2.jpg";
import a3 from "./../../../img/a3.jpg";
import lug from "./../../../img/lug.jpg";

class InformPageComponent extends Component {
  constructor(config) {
    super(config);
    this.validAuthForm = null;
    this.userNamePass = {};
    this.response = null;
    this.container = null;
    this.stringName = "PUSHNOV_PROJECT_AVIATICKETS";
    this.ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
    this.message = null;
    this.formForAuth = null;
    this.flag = false;
    this.routs = null;
  }
  afterInit() {
    //init animation
    this.container = document.querySelector(".ticket-inf");
    this.message = document.querySelector(".message-inf");

    const animations = document.querySelectorAll(".anim-items");
    texAnimation(animations);
    //init button
    this.informContent = document.querySelector(".text-content");

    this.routs = document.querySelectorAll(".route");
    // form
    this.formForAuth = document.forms["user-auth"];
    this.validAuthForm = new ValidForm(this.formForAuth);
    this.validAuthForm.startValid();
    this.cleanMessage();
  }

  events() {
    return {
      "submit .submit-auth": "onAuthFormSubmit",
      "click .inform-btn": "onShowInform",
    };
  }
  async restoreInfo() {
    await $.ajax({
      url: this.ajaxHandlerScript,
      type: "POST",
      cache: false,
      dataType: "json",
      data: { f: "READ", n: this.stringName },
      success: (data) => this.readReady(data),
      error: (err) => this.errorHandler(err),
    });
  }

  readReady(callresult) {
    if (callresult.error != undefined) alert(callresult.error);
    else if (callresult.result != "") {
      const response = JSON.parse(callresult.result);

      const { user, tickets } = response;
      const { userAuth, passAuth } = this.userNamePass;

      if (!tickets) {
        errMessager(
          this.message,
          "Извините по Вашему запросу ничего не найдено!"
        );
        return;
      } else if (userAuth === user["user"] && passAuth === user["password"]) {
        const res = Object.values(tickets);
        this.renderUserTickets(res);
        soccessMessager(this.message, `Ваши билеты: `);
        this.flag = true;
        this.confirmMess();
      } else {
        errMessager(
          this.message,
          "Имя пользователя или пароль введены неверно!"
        );
      }
    }
  }

  errorHandler(jqXHR, statusStr, errorStr) {
    alert(statusStr + " " + errorStr);
  }

  onAuthFormSubmit(event) {
    event.preventDefault();
    const result = this.validAuthForm.onValidForm();
    if (!result) {
      errMessager(this.message, "Проверьте правильность заполнения формы!");
    } else {
      this.userNamePass = result;
    }
    this.restoreInfo();
  }

  onShowInform() {
    this.informContent.classList.toggle("hide");
  }

  renderUserTickets(arr) {
    TicketsUI.clearContainer(this.container);
    let fragment = "";
    arr.forEach((ticket) => {
      const template = TicketsUI.ticketTemplate(ticket, "");
      fragment += template;
    });
    this.container.insertAdjacentHTML("beforeEnd", fragment);
  }
  cleanMessage() {
    [...this.formForAuth.elements].forEach((item) => {
      item.addEventListener("focus", () => {
        this.message.innerHTML = "";
      });
    });
  }

  confirmMess() {
    if (this.routs) {
      this.routs.forEach((route) => {
        route.addEventListener("click", this.confirmQustion.bind(this));
      });
    }
  }
  confirmQustion(event) {
    if (this.flag) {
      const conf = confirm("Если Вы покините страницу, данные будут утеряны!");
      if (!conf) {
        event.preventDefault();
        window.location.hash = "#inform";
      } else {
        this.flag = false;
        this.routs.forEach((route) => {
          route.removeEventListener("click", this.confirmQustion);
        });
      }
    }
  }
}
export const informPageComponent = new InformPageComponent({
  selector: "app-inform-page",
  template: `
    <body>
   <div class="container">
      <form name="user-auth"> 
         <div class="row">
            <div class="col s12 m6">
               <div class="input-field">
                  <i class="material-icons prefix">account_circle</i>
                  <input id="userAuth"
                   name = "userAuth"
                   type="text"
                   data-required = "text"
                   data-err="Вы не заполнили поле, либо его длина превышает 20 символов!"
                    >
                  <label for="userAuth">First Name</label>
               </div>
            </div>
            <div class="col col s12 m6">
               <div class="input-field">
                  <i class="material-icons prefix">create</i>
                  <input id="passAuth"
                   type="password"
                   name="passAuth"
                   data-required = "password"
                   data-err="Пароль должен содержать латиницу + цифры (минимум 1 цифру)!"
                   >
                   <label for="passAuth">Password</label>
               </div>
            </div>
         </div>
         <div class="row">
            <div class="col s12 center-align mess-users"><span>Введите имя и пароль что бы просмотреть Ваши билеты</span></div>
            <div class="col s12 center-align ">
             
               <button class="btn waves-effect waves-light submit-auth" type="submit" name="action">показать купленные билеты
                  <i class="material-icons right">flight</i>
               </button>
              
            </div>
         </div>
      </form>  
      <div class="row">
         <div class="col s12 center-align"> 
           <button class="btn waves-effect waves-light inform-btn">Информация о провозе багажа
                  <i class="material-icons right">flight</i>
           </button>
         </div>
      </div> 
   <div class="row">
    <div class= 'col s12 message-inf'></div>
   </div>
   <div class="row">
      <div class="ticket-inf"></div>
   </div>
      <div class="row">
         <div class="text-content">
            <div class="anim-items">
               <h5 class="anim-show">1. ЧТО МОЖНО ВЗЯТЬ В САМОЛЕТ БЕСПЛАТНО СВЕРХ НОРМЫ</h5>
            </div>
               
                  <ul class="anim-items">
                     <li class="anim-show">Рюкзак/дамскую сумочку/мужской портфель с вложенными вещами. Однако,обратите внимание, что вес рюкзака не должен
                        превышать 5 кг, габариты по сумме трех измерений не более 80 см.</li>
                     <li class="anim-show">Один (!) запечатанный пакет с покупками из магазинов Duty Free с габаритами, не превышающими 115 см по сумме трех
                        измерений</li>
                     <li class="anim-show">Верхнюю одежду</li>
                     <li class="anim-show">Костюм в портпледе</li>
                     <li class="anim-show">Букет цветов</li>
                  </ul>
                  <ul class="anim-items" >
                     <li class="anim-show text" >Устройство для переноски ребенка. К ним относятся: детская люлька, удерживающие системы (устройства) для детей до двух
                           лет, складная детская коляска с габаритами не более 50х42х20см при перевозке ребенка, которую можно безопасно разместить
                           в салоне воздушного судна на полке над пассажирским креслом, либо под сидением впереди стоящего пассажирского кресла. В
                           качестве удерживающего устройства и при наличии отдельного оплаченного места для ребенка, может провозиться
                           устанавливаемое на пассажирское кресло сертифицированное для использования на воздушном транспорте переносное детское
                           кресло, оборудованное ремнями безопасности.</li>
                     <li>Детское питание для кормления ребенка во время полета</li>
                  </ul>
                  <ul class="anim-items">
                     <li class="anim-show text">Костыли, трости, ходунки, роллаторы, складное кресло-коляска, съемные протезы конечностей (рук, ног), по
                           предварительному согласованию портативный концентратор кислорода, медицинское оборудование для жизнеобеспечения
                           пассажира в полете. Указанные предметы должны иметь габариты, позволяющие безопасно разместить их в салоне воздушного
                           судна. Складное кресло-коляска провозится в салоне воздушного судна при наличии места для его безопасного размещения, в
                           ином случае сдается в багаж без взимания дополнительной платы.</li>
                     <li>Лекарственные препараты, специальные диетические потребности, необходимые на время полета.</li>
                  </ul>
               
            <div id="one" class="anim-items ">
               <p class="anim-show text">Внимание:самокаты, скейтборды и роликовые коньки не допускаются к перевозке в салоне воздушного судна и оформляются
                   только в качестве регистрируемого багажа.</p>
           </div>
         <div class="anim-items">
            <h5 class="anim-show text">2. ПРОВОЗ БАГАЖА</h5>
            </div>
               <div class="anim-items">
                  <p class="anim-show text">Бизнес класс 2 места не более 32 кг и каждое 1 место не более 15 кг</p>
                  <p class="anim-show text"> Комфорт класс 2 места не более 23 кг и каждое 1 место не более 10 кг</p>
                  <p class="anim-show text">Эконом-класс (Премиум) 2 места не более 23 кг каждое 1 место не более 10 кг</p>
                  <p class="anim-show text">Эконом-класс 1 место не более 23 кг 1 место не более 10 кг</p>
                  <p class="anim-show text">Внимание: Норма и вес бесплатного провоза регистрируемого багажа не должна превышать 158 см по сумме 3-х измерений.
                  Норма и вес бесплатного провоза нерегистрируемого багажа в салоне воздушного судна (ручной клади) не должна превышать
                  габариты 55 см в длину, 40 см в ширину, 25 см в высоту.</p>
                  <p class="anim-show text"><strong>Нормы провоза багажа для рейсов с нумерацией FV5501-5949:</strong></p>
                  <p class="anim-show text">В рейсах с нумерацией FV5501-5949 весовую норму бесплатного провоза багажа необходимо уточнять у туроператора.
                  Габаритная норма бесплатного провоза 1 места багажа составляет не более 203 см в сумме трех измерений. Для детей в
                  возрасте до 2 лет (без предоставления отдельного места) норма провоза регистрируемого багажа составляет 10 кг.</p>
            </div>
                  <div class="moment-items row ">
                     <div class="col s12 m4 moment-item anim-items center-align">
                        <img class="air responsive-img circle " alt="a1" src="${a1}">
                        <span class="service">Быстрый заказ билетов</span>
                     </div>
                     <div class="col s12 m4 moment-item anim-items center-align">
                        <img class="air responsive-img circle" alt="a2" src="${a2}">
                        <span class="service">Лучший сервис</span>
                     </div>
                     <div class="col s12 m4 moment-item anim-items center-align">
                       <img class="air responsive-img circle" alt="a3" src="${a3}">
                        <span class="service" >Билеты во все точки мира</span>
                     </div>
               </div>
                  <div class="anim-items">
                    <h6 class="anim-show text">Бесплатный провоз ручной клади:</h6>
                  </div>
                     <div class="content anim-items">
                        <ul class="anim-show text">
                           <li><b>Эконом — 1 место до 5 кг, не более 55х40х20 см</b></li>
                           <li><b>Бизнес — 1 место до 10 кг, не более 55х40х20 см</b></li>
                           <li>Сверхнормативный багаж – багаж, вес которого превышает норму бесплатного провоза багажа, при этом вес каждого места не
                              более 32 кг / размер не более 203 см в сумме 3х измерений
                           </li>
                           <li>Только для рейсов внутри РФ — 750 руб/кг</li>
                           <li>Для международных рейсов из других зарубежных пунктов — 12 USD/кг</li>
                           <li>Тяжеловесный багаж/спортинвентарь – вес одного места свыше 32 кг и не более 50 кг. Багаж, вес одного места которого
                           превышает 50 кг, к перевозке не допускается</li>
                           <li>Только для рейсов внутри РБ — 400 руб/кг</li>
                           <li>Для международных рейсов из других зарубежных пунктов — 8 USD/кг</li>
                           <li>Только для международных рейсов из РБ и рейсов из зарубежных пунктов Еврозоны — 6 EUR/кг</li>
                           <li></li>
                        </ul>
               </div>
               <div class="anim-items">
                 <h5 class="anim-show text">3. ПРОВОЗ РУЧНОЙ КЛАДИ</h5>
               </div>
                  <ul class="ul2 anim-items ">
                        <li class="anim-show text">Бесплатный провоз ручной клади на рейсах SU 6001-6999 — 10 кг (эконом-класс), 15 кг (бизнес-класс)</li>
                        <li class="anim-show text">Бесплатный провоз ручной клади на рейсах FV5501-5949 — 5 кг (эконом-класс), 10 кг (бизнес-класс)</li>
                  </ul>
              <div class="anim-items">
               <h5 class="anim-show text">4. ПЕРЕВОЗКА СПОРТИВНОГО ОБОРУДОВАНИЯ</h5>
              </div>
              
               <ul class="anim-items "></ul>
                  <li class="anim-show text">В качестве одного места ручной клади в соответствии с установленными ограничениями по габаритам и весу, может
                  провозиться один из следующих предметов:</li>
                  <li>одна ракетка для большого тенниса/игры в сквош, упакованная в чехол;</li>
               <li class="anim-show text">набор для игры в бадминтон, состоящий из двух простых ракеток и 3-х перьевых воланов, упакованных в один чехол.</li>
               </ul>
               <div class="row">
                  <div class="col s12">
                     <img class="responsive-img" src="${lug}">
                  </div>
               </div>
            </div>
      </div>
   </div>
      
   `,
});
