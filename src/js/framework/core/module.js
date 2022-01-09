import { renderComponent } from "./renderComponent";
import { wfm } from "../tools/utill";
import { Routing } from "./routing/routing";

export class Module {
  constructor(config) {
    this.components = config.components;
    this.loadingComponent = config.loading;
    this.routes = config.routes;
  }
  start() {
    initComponents(this.loadingComponent, this.components);
    initRouting(this.routes);
  }
}

function initComponents(loadingComponent, components) {
  if (wfm.isUndefined(loadingComponent)) {
    throw new Error("loadingComponent is not defined");
  }
  [loadingComponent, ...components].forEach(renderComponent);
}

function initRouting(routes) {
  if (wfm.isUndefined(routes)) return;

  let routing = new Routing(routes);
  routing.init();
}
