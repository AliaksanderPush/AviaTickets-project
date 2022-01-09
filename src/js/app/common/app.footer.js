import { Component } from "framework/core/component";

class AppFooter extends Component {
   constructor(config) {
      super(config);
   }
}

export const appFooter = new AppFooter({
  selector: 'app-footer', 
  template:`
    <footer class="page-footer ">
   <div class="footer-copyright">
      <div class="container">
         © 2021 Copyright Text
         <a class="white-text text-lighten-4 right" href="https://github.com/AliaksanderPush?tab=repositories" target="_blank" >Repo</a>
      </div>
   </div>
</footer>   
  `

});