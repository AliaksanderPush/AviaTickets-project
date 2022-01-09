import {
  getDatePickerInstance,
  getAutocompleteInstance,
} from "../../../plagins/materialize";
import { storages } from "../../../storage/store";
import { TicketsUI } from "./ticket";
import { MyLocalStorage } from "../../../lockalStorage/lockalStorage";
import { getKeyticketsAll } from "../../../lockalStorage/keyLocalstorage";
import { multiMedia } from "../../../multimedia/multimedia";

export class FormControl {
  constructor(config) {
    this.$form = config.form;
    this.origin = config.origin;
    this.depart = config.depart;
    this.return = config.return;
    this.tickets = config.tickets;
    this.destination = config.destination;
    this.originAutocomplete = getAutocompleteInstance(this.origin);
    this.destinationAutocomplete = getAutocompleteInstance(this.destination);
    this.returnDatePicker = getDatePickerInstance(this.return);
    this.departDatePicker = getDatePickerInstance(this.depart);
  }

  originValue() {
    return this.origin.value;
  }

  destinationValue() {
    return this.destination.value;
  }

  departDateValue() {
    return this.departDatePicker.toString();
  }

  returnDateValue() {
    return this.departDatePicker.toString();
  }

  setAutocompleteData(data) {
    this.originAutocomplete.updateData(data);
    this.destinationAutocomplete.updateData(data);
  }

  async initApp() {
    await storages.init();
    this.setAutocompleteData(storages.shortCities);
  }

  async onFormSubmit() {
    const cityIn = this.originValue();
    const cityTo = this.destinationValue();
    const dateIn = this.departDateValue();
    const dateFrom = this.returnDateValue();

    if (!cityIn || !cityTo || !dateIn) return;

    const origin = storages.getCityCodeByKey(cityIn);
    const destination = storages.getCityCodeByKey(cityTo);
    const depart_date = dateIn;
    const return_date = dateFrom;

    await storages.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
    });

    const key2 = getKeyticketsAll();
    const allMyTickets = storages.lastSearch;

    MyLocalStorage.removeLocalStorage(key2);
    MyLocalStorage.setStore(key2, allMyTickets);

    const tickets = new TicketsUI(this.tickets);
    tickets.renderTickets(allMyTickets);

    if (!allMyTickets.length) {
      multiMedia.vibro(100);
      multiMedia.emptySound();
    } else {
      multiMedia.vibro(200);
      multiMedia.successSound();
    }
  }

  static renderForm() {
    return `
 <main>
   <div class="form-section bg">
     <form name="locationControls" id="formElem" >
         <div class="row">
            <div class="container">
               <div class="row wg">
                  <div class="input-field col s12 m6 l3 ">
                     <i class="material-icons prefix">flight_takeoff</i>
                     <input type="text" id="autocomplete-origin" class="autocomplete">
                     <label for="autocomplete-origin">Город вылета</label>
                  </div>
                  <div class="input-field col s12 m6 l3">
                     <i class="material-icons prefix">flight_land</i>
                     <input type="text" id="autocomplete-destination" class="autocomplete">
                     <label for="autocomplete-destination">Город прилета</label>
                  </div>
                  <div class="input-field col s12 m6 l3">
                     <i class="material-icons prefix">airplanemode_active</i>
                     <input type="text" class="datepicker" id="datepicker-depart" />
                     <label for="datepicker-depart">Туда</label>
                  </div>
                  <div class="input-field col s12 m6 l3">
                     <i class="material-icons prefix">flight</i>
                     <input type="text" class="datepicker" id="datepicker-return" />
                     <label for="datepicker-return">Обратно</label>
                  </div>
               </div>
            </div>
      
         </div>
            <div class="row">
               <div class="col s12 ">
                  <button class="btn waves-effect waves-light" type="submit" name="action">
                     Найти билеты
                  </button>
               </div>
            </div>
       </form>  
   </div>
     <h1 class="general-cont">Поисковик дешевых авиабилетов</h1>
      <div class= "map">
        <div id="map"></div>
         </div>
     <div class="clear-display"><p class="mes-keybord">Для быстрой очистки страницы нажмите Ctr+q</p></div> 
</main>
      `;
  }
}
