
import {
  /*  Button,*/
  /*  Columns,*/
    Container,
    Heading,
    Hero,
    Icon,
  /*  Image,*/
  /*  Level,*/
  } from "react-bulma-components";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faSpinner } from "@fortawesome/free-solid-svg-icons";
  import SiteFooter from "../components/Footer";
  import Nav from "../components/Nav";
  /*import Logo from "../landingLogo.png";*/
  import useContentful from "../hooks/useContentful";
  
  const query = `query {
    landing(id: "6tngxuPAoAgIMrZbi8W9L0") {
      title
      subTitle
      cta
      jobsButton
      contactUsButton
    }
  }`;
  
  function Landing() {
    let { data } = useContentful(query);
  
    if (!data) {
      return (
        <div>
          <Nav />
          <Hero size="fullheight" hasNavbar>
            <Hero.Header />
            <Hero.Body>
              <Container textAlign="center">
                <Heading spaced>Welcome to MEB Resources</Heading>
                <Icon align="center">
                  <FontAwesomeIcon icon={faSpinner} className={"fa-spin"} />
                </Icon>
                Fetching content...
              </Container>
            </Hero.Body>
            <Hero.Footer>
              <SiteFooter />
            </Hero.Footer>
          </Hero>
        </div>
      );
    }
  
    return (
      <div>
        <Nav />
        <main id="banner">
              <div class="inner">
                <h2>MEB Resources</h2>
                <p>We provide staffing management 
                and HR consulting.<br></br>in Rochester, 
                Austin, and St. Cloud MN.!</p>
                <ul class="actions special">
                  <li><a href="/jobs" target="blank" class="button primary">Available Jobs</a></li>
                  <li><a href="/contact" class="button primary">Contact Us</a></li>
                </ul>
                
              </div>
              
              <a href="#one" class="more scrolly">Learn More<i class="fa-solid fa-arrow-down-to-line"></i></a>
  
  
  
        </main>
  
        <section id="one" class="wrapper style1 ">
              <div class="inner">
                <header class="major">
                  <h2>We are 100% mobile,</h2>
                  <p>We provide staffing management and HR consulting.</p> 
                  <p>We are 100% mobile, wherever you are, we can be!</p>
                  <p>We're committed to providing great service to the clients we serve as well as the candidates and employees we partner with.</p>
                </header>
                <ul class="icons major">
                  <li><i class="big fa-solid fa-person-circle-check"></i></li>
                  <li><i class="big fa-solid fa-gear"></i></li>
                  <li><i class="big fa-solid fa-arrow-up-right-dots"></i></li>
                </ul>
              </div>
          </section>
  
          
            <section id="three" class="wrapper style2 ">
              <div class="inner">
                <header class="">
                  <h2>HR management and consulting</h2>
                  <p>We provide staffing management and HR consulting it on a mobile basis, we can be where you are. Recruiting, screening and servicing all of your staffing needs.</p>
                </header>
                <ul class="features">
                  <li>
                    <div>
                      <i class='fa-solid fa-gem'></i>
                      <h3>Everything but ordinary</h3> 
                    </div>
                    <p>In the past few years, we've been called a lot of things... We've been called a partner, a friend and once in a while even a lifesaver. But what we've never been called is ordinary.</p>
                  </li>
                  <li>
                    <div>
                      <i class='fa-solid fa-laptop'></i>
                      <h3>We don't "fill orders"</h3> 
                    </div>
                    <p>We focus on results... and the smartest ways to achieve them.</p>
                  </li>
                  <li>
                    <div>
                      <i class='fa-solid fa-paper-plane'></i>
                      <h3>We're not just about speed</h3> 
                    </div>
                    <p>We take the time to carefully match people and job opportunities. We'd rather take the time to get it right than just refer someone fast.</p>
                  </li>
                  <li>
                    <div>
                      <i class='fa-solid fa-comment'></i>
                      <h3>We won't refer anyone until we understand your business</h3> 
                    </div>
                    <p>We begin every client engagement with analysis of your workplace. By taking the time to really evaluate your needs, we can ensure we are the right people.</p>
                  </li>
                  <li>
                    <div>
                      <i class='fa-solid fa-heart'></i>
                      <h3>We don't think candidates are a commodity</h3> 
                    </div>
                    <p>Why do some staffing firms treat people like inventory? We don't get it. You're a unique individual and you'll be most successful in a job that fits your skills and interests. Our job is to help you find it!</p>
                  </li>
                  <li>
                    <div>
                      <i class='fa-solid fa-user-check'></i>
                      <h3>We are not some bureaucratic or gigantic firm bound to policy</h3> 
                    </div>
                    <p>We work here. We live here. We're committed to providing great service to the clients we serve as well as the candidates and employees we partner with.</p>
                  </li>
                  
                </ul>
              </div>
            </section>
  
            <section id="two" class="wrapper style3">
              <section class="spotlight">
                <div class="image one"><img /></div><div class="content">
                  <h2>Our Goal</h2>
                  <p>To ensure businesses succeed so communities can prosper.</p>
                </div>
              </section>
              <section class="spotlight">
                <div class="image two"><img  alt="" /></div><div class="content">
                  <h2>Vision and Mission</h2>
                  <p>To provide superior service to our employees, clients and all people that we come into contact with. We will strive to make a positive difference in people's lives and help out in any way possible. By doing so, we believe we can build a stronger community, one employee at a time.</p>
                </div>
              </section>
              <section class="spotlight">
                <div class="image three"><img  alt="" /></div><div class="content">
                  <h2>Core Values</h2>
                  <p>Leadership</p>
                  <p>Integrity</p>
                  <p>Collaboration</p>
                  <p>Excellence.</p>
  
                </div>
              </section>
            </section>
  
            <section id="cta" class="wrapper style4">
              <div class="inner">
                <header>
                  <h2>MEB Resources</h2>
                  <p>For staffing management or HR consulting services, call MEB Resources today!</p>
                </header>
                <ul class="actions stacked">
                  <li><a href="/jobs" class="button  primary fit">Available Jobs</a></li>
                  <li><a href="/contact" class="button  primary fit">Contact Us</a></li>
                </ul>
              </div>
            </section>
  
  
  
    
        <SiteFooter />
         
      </div>
    );
  }
  
  export default Landing;
  