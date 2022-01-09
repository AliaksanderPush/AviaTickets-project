import { Component } from "framework/core/component";

class AppComponent extends Component {
  constructor(config) {
    super(config);
  }
}
export const appComponent = new AppComponent({
  selector: "app-root",
  template: `
   <app-header></app-header>
   <router-outlet></router-outlet>
   <app-footer></app-footer>
   
   `,
});
