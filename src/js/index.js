import "./plagins";
import "../css/style.css";

import { renderStrap } from "./framework/core/renderStrap";
import { appModule } from "./app/app.module";
import { wfm } from "./framework/tools/utill";

wfm.delay().then(() => {
  renderStrap(appModule);
});
