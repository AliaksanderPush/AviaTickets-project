 import { wfm } from "../../tools/utill";
import { router } from "./router";
import { renderComponent } from "../renderComponent";

 export class Routing {
    constructor(routes) {
     this.routes = routes;
    }
    init() {
       window.addEventListener('hashchange', renderRoute.bind(this));
       renderRoute.call(this);
    }

    
 }

 function renderRoute() {
    let url  = router.getUrl();
      let route = this.routes.find(r => r.path === url);

      if (wfm.isUndefined(route)) {
      route = this.routes.find(r => r.path === '**')
      }
      
      document.querySelector('router-outlet').innerHTML = `<${route.component.selector}></${route.component.selector}>`;
      renderComponent(route.component);
 }