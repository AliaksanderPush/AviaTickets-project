export class Server {
  constructor(info, storage) {
    this.ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
    this.storage = storage;
    this.updatePassword = 0;
    this.stringName = "PUSHNOV_PROJECT_AVIATICKETS";
    this.info = info;
    this.response = null;
  }

  storeInfo() {
    this.updatePassword = Math.random();
    $.ajax({
      url: this.ajaxHandlerScript,
      type: "POST",
      cache: false,
      dataType: "json",
      data: { f: "LOCKGET", n: this.stringName, p: this.updatePassword },
      success: (data) => this.lockGetReady(data),
      error: (err) => this.errorHandler(err),
    });
  }

  lockGetReady(callresult) {
    if (callresult.error != undefined) alert(callresult.error);
    else {
      $.ajax({
        url: this.ajaxHandlerScript,
        type: "POST",
        cache: false,
        dataType: "json",
        data: {
          f: "UPDATE",
          n: this.stringName,
          v: JSON.stringify(this.info),
          p: this.updatePassword,
        },
        success: (data) => this.updateReady(data),
        error: (err) => this.errorHandler(err),
      });
    }
  }

  updateReady(callresult) {
    if (callresult.error != undefined) alert(callresult.error);
  }

  insertInfo() {
    $.ajax({
      url: this.ajaxHandlerScript,
      type: "POST",
      cache: false,
      dataType: "json",
      data: { f: "INSERT", n: this.stringName, v: JSON.stringify(this.info) },
      success: (data) => this.updateReady(data),
      error: (err) => this.errorHandler(err),
    });
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
      return JSON.parse(callresult.result);
    }
  }

  errorHandler(jqXHR, statusStr, errorStr) {
    alert(statusStr + " " + errorStr);
  }

  getResponse() {
    return this.response;
  }
}
const info = {
  user: "sasha",
  tickets: "tik",
};

//const server = new Server(info );
//server.storeInfo();
