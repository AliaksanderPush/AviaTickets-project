import { Module } from "framework/core/module";
import { appComponent } from "./app.component";
import { appHeader } from "../app/common/app.header";
import { appRoutes } from "../app/app.routes";
import { appFooter } from "../app/common/app.footer";

class AppModule extends Module {
  constructor(config) {
    super(config);
  }
}
export const appModule = new AppModule({
  components: [appHeader, appFooter],
  loading: appComponent,
  routes: appRoutes,
});
