export class MyLocalStorage {
  static setStore(key, object) {
    localStorage.setItem(key, JSON.stringify(object));
  }

  static getStore(key) {
    const el = localStorage.getItem(key);

    if (el) {
      const obj = JSON.parse(el);
      return obj;
    } else {
      return null;
    }
  }

  static getStoreValue(key) {
    const obj = MyLocalStorage.getStore(key);
    if (!obj) {
      return 0;
    } else {
      return Object.values(obj);
    }
  }

  static getLengthStorage(key) {
    let lengthStore = MyLocalStorage.getStoreValue(key);
    if (!lengthStore) {
      return 0;
    } else {
      return lengthStore.length;
    }
  }

  static removeLocalStorage(key) {
    localStorage.removeItem(key);
  }
}
