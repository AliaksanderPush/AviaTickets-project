import { homePageComponent } from "./pages/home-page.component";
import { informPageComponent } from "./pages/inform-page.component";
import { authPageComponent } from "./pages/auth-page.component";
import { notFound } from "../app/common/not-found";

export const appRoutes = [
  { path: "", component: homePageComponent },
  { path: "inform", component: informPageComponent },
  { path: "auth", component: authPageComponent },
  { path: "**", component: notFound },
];
