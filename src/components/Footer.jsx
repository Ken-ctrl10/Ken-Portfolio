
function Footer() {

  const currYear = new Date().getFullYear();
  const devName = "Ken Castillo";

  return <footer>
    <p>All rights reserved &#169; { currYear } { devName }</p>      
  </footer>
}

export default Footer;