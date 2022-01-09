import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

//Init navi
export const navi = (elems) => {
  M.Sidenav.init(elems);
};
// Init Autocomplete
export const autocomplete = (elems) => {
  M.Autocomplete.init(elems, {
    data: {
      Apple: null,
      Microsoft: null,
      Google: "https://placehold.it/250x250",
    },
  });
};
// Init datepickers
export const datepickers = (elems) => {
  M.Datepicker.init(elems, {
    showClearBtn: true,
    format: "yyyy-mm",
  });
};
// Init select
//const select = document.querySelectorAll('select');
//M.FormSelect.init(select);

export const getSelectInstance = (elem) => M.FormSelect.getInstance(elem);

export const getAutocompleteInstance = (elem) =>
  M.Autocomplete.getInstance(elem);

export const getDatePickerInstance = (elem) => M.Datepicker.getInstance(elem);
