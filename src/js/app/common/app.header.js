import { Component } from "framework/core/component";
import logo from "../../../img/Logo1.svg";
import { MyLocalStorage } from "../../lockalStorage/lockalStorage";
import { getKeytickets } from "../../lockalStorage/keyLocalstorage";

export class AppHeader extends Component {
  constructor(config) {
    super(config);
  }

  static onCountTickets() {
    const countTikets = document.querySelector(".countTiket");
    const mobileCountTikets = document.getElementById("mobile-demo");
    const mobileCount = mobileCountTikets.querySelector(".countTiket");

    const key = getKeytickets();
    const count = MyLocalStorage.getLengthStorage(key);

    if (
      count === 0 &&
      countTikets.classList.contains("tiket-count") &&
      mobileCount.classList.contains("tiket-count")
    ) {
      countTikets.classList.remove("tiket-count");
      mobileCount.classList.remove("tiket-count");
      countTikets.innerHTML = count;
      mobileCount.innerHTML = count;
    } else {
      countTikets.classList.add("tiket-count");
      mobileCount.classList.add("tiket-count");
      countTikets.innerHTML = count;
      mobileCount.innerHTML = count;
    }
  }
}

export const appHeader = new AppHeader({
  selector: "app-header",
  template: `
  <nav>
      <div class="nav-wrapper ">
         <div class="container">
            <div class= "logo">
              <a href="#" class="route brand-logo "><img src="${logo}" width="64" height="64" alt="image"></a>
            </div>
            <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
       
            <ul class="right hide-on-med-and-down ml-auto">
               <li><a href="#" class="route">Главная</a></li>
               <li><a href="#inform" class="route">Информация</a></li>
               <li><a href="#auth" class="route">Корзина<span class="countTiket tiket-count">0</span></a></li>
              
            </ul>
            <ul class="sidenav" id="mobile-demo">
               <li><a href="#"class="route">Главная</a></li>
               <li><a href="#inform" class="route">Информация</a></li>
               <li><a href="#auth"class="route">Корзина<span class="countTiket tiket-count">0</span></a></li>
            </ul>
         </div>
      </div>
   </nav>
   `,
});
