
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

import "../index.css";
function SiteFooter() {
  return (
    
    <footer>
			
			
    <section>
      
      <div>
        <h2>MEB Resources</h2>
        
      </div>
      <div>
        <h3>Contact Us</h3>
        <p>507-799-0076 / 507-313-4804</p>
        <p><a href="mailto:info@mebresources.com" target="_blank"><i class="fa-solid fa-envelope"></i> info@mebresources.com</a></p>
        
      </div>
      <div>
        <h3>Follow us</h3>
        <ul class="socialMedia">
          <li><a href="https://www.linkedin.com/company/meb-resources-llc/about/"><i class="icon fa-brands fa-linkedin"></i></a></li>
          <li><a href="https://www.facebook.com/MEBResources" target="_blank" ><i class="icon fa-brands fa-facebook"></i></a></li>
          <li><a href="https://www.instagram.com/mebresources/" target="_blank" ><i class="icon fa-brands fa-instagram"></i></a></li>
        </ul>
      </div>
      
    </section>
    
  </footer>	

  );
}

export default SiteFooter;



