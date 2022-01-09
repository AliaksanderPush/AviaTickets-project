import { multiMedia } from "../../../multimedia/multimedia";

export class ValidForm {
  constructor(form) {
    this.form = form;
    this.validEmail = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/;
    this.validTelephone = /^\+375(?:17|25|33|44|29)\d{3}\d{2}\d{2}$/;
    this.validPassword = /^[a-zA-Z0-9]{3,20}$/;
    this.inputsAll = this.form.elements;
  }

  startValid() {
    for (let elem of this.inputsAll) {
      if (elem.dataset.required) {
        elem.addEventListener("blur", () => {
          this.checkValid(elem);
        });
      }
    }
  }

  onValidForm() {
    let arr = [];
    for (let input of this.inputsAll) {
      if (input.dataset.required) {
        const isValidInput = this.checkInput(input);
        if (!isValidInput) {
          this.showErrMessage(input);
          arr.push(input);
          return false;
        }
      }
    }

    if (arr[0]) {
      arr[0].focus();
    }

    const formData = new FormData(this.form);
    const values = Object.fromEntries(formData.entries());
    return values;
  }

  checkValid(elem) {
    const isValidInput = this.checkInput(elem);
    if (!isValidInput) {
      this.showErrMessage(elem);
      multiMedia.errSound();
      multiMedia.vibro(100);
    } else {
      const parent = elem.parentElement;
      const err = parent.querySelector(".invalid");
      if (err) {
        elem.classList.remove("invalid_inp");
        err.remove();
      }
    }
  }

  checkInput(elem) {
    try {
      const value = elem.value.trim();
      const valueLength = value.length;
      const input = elem.dataset.required;

      switch (input) {
        case "text":
          return valueLength > 0 && valueLength < 20;
          break;
        case "email":
          return valueLength > 0 && this.validEmail.test(value);
          break;
        case "telephone":
          return valueLength > 0 && this.validTelephone.test(value);
          break;
        case "textarea":
          return valueLength > 0 && valueLength < 100;
          break;
        case "password":
          return valueLength > 3 && this.validPassword.test(value);
          break;
      }
    } catch {
      alert(
        "Что-то пошло не так, Пересмотрите заполнение формы, возможно, это всё из-за вас!"
      );
      return false;
    }
  }

  showErrMessage(elem) {
    if (!elem.classList.contains("invalid_inp")) {
      elem.classList.add("invalid_inp");
      const parent = elem.parentElement;
      const mes = elem.dataset.err;
      const span = document.createElement("span");
      span.innerHTML = mes || "Некоректно введены данные!";
      span.className = "invalid";
      parent.append(span);
    } else {
      return;
    }
  }
}
