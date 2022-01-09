import { Component } from "framework/core/component";

class NotFound extends Component {
  constructor(config) {
    super(config);
  }
}

export const notFound = new NotFound({
  selector: "app-not-found",
  template: `
     <div class="not-found">
       <div>
       <h2>Страница не найдена</h2>
       <a href="#">Перейти на главную</a>
       </div>
     </div>
   `,
});
