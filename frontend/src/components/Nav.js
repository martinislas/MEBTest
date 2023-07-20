
import { Navbar } from "react-bulma-components";

import "../index.css"

function Nav() {
  
  return (
    <nav>
        <div class="header">
          <h3>MEB Resources</h3>
        </div>
          <input type="checkbox" class="openSidebarMenu" id="openSidebarMenu"></input>
          <label for="openSidebarMenu" class="sidebarIconToggle">
            <div class="spinner diagonal part-1"></div>
            <div class="spinner horizontal"></div>
            <div class="spinner diagonal part-2"></div>
          </label>
          <div id="sidebarMenu">
            <ul class="sidebarMenuInner">
              <li>MEB Resources <span>Your Movile Employment resource</span></li>
              <li><a href="/" target="_blank">Home</a></li>
              <li><a href="/contact" target="_blank">Contact</a></li>
              <li><a href="/#one">About</a></li>
              <li><a href="/jobs" target="_blank">Jobs</a></li>

            
            </ul>
          </div>
  
    </nav>
  );
}

export default Nav;
