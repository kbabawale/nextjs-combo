import { autorun, set, toJS } from 'mobx';
var CryptoJS = require('crypto-js');

export function autoSave(_this: any, name: string) {
  const storedJson = localStorage.getItem(name);
  if (storedJson) {
    // var bytes = storedJson;
    // set(_this, JSON.parse(bytes));
    var bytes = CryptoJS.AES.decrypt(storedJson, process.env.ENCRYPT_KEY);
    set(_this, JSON.parse(bytes.toString(CryptoJS.enc.Utf8)));
  }
  autorun(() => {
    const value = toJS(_this);
    // localStorage.setItem(name, JSON.stringify(value));
    localStorage.setItem(
      name,
      CryptoJS.AES.encrypt(
        JSON.stringify(value),
        process.env.ENCRYPT_KEY
      ).toString()
    );
  });
}
