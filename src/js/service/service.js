import axios from "axios";

class Aviaservice {
  constructor() {
    this._apiBase = "https://aviasales-api.herokuapp.com";
  }
  async countries() {
    try {
      const response = await axios.get(`${this._apiBase}/countries`);
      return response.data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
  async cities() {
    try {
      const response = await axios.get(`${this._apiBase}/cities`);
      return response.data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
  async airlines() {
    try {
      const response = await axios.get(`${this._apiBase}/airlines`);
      return response.data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
  async prices(params) {
    try {
      const response = await axios.get(`${this._apiBase}/prices/cheap`, {
        params,
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
}

export const api = new Aviaservice();
