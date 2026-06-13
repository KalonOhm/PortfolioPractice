class PortfolioHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <header>
      <div class="logo">
        <img src="" alt="" />
      </div>
      <button class="nav-toggle" aria-label="toggle navigation">
        <span class="hamburger"></span>
      </button>
      <nav class="nav">
        <ul class="nav__list">
          <li class="nav__item"><a href="#home" class="nav__link">Home</a></li>
          <li class="nav__item">
            <a href="#services" class="nav__link">Skills</a>
          </li>
          <li class="nav__item">
            <a href="#about" class="nav__link">About</a>
          </li>
          <li class="nav__item">
            <a href="#education" class="nav__link">Education</a>
          </li>
          <li class="nav__item">
            <a href="#work" class="nav__link">Projects</a>
          </li>
          <li class="nav__item">
            <a href="#contact" class="nav__link">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
        `
  }
}



class PortfolioFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = <footer class="footer" id="contact">
      <h3 class="section__title section__title--contact"></h3>
      <a href="mailto:kalonohmstede@gmail.com" class="footer__link">
        kalonohmstede@gmail.com
        <i class="fa-solid fa-envelope"></i>
      </a>
      <ul class="social-list">
        <li class="social-list__item">
          <a
            href="https://www.linkedin.com/in/kalonohmstede/"
            class="social-list__link"
          >
            <i class="fa-brands fa-linkedin-in"></i>
          </a>
        </li>
        <li class="social-list__item">
          <a href="https://github.com/KalonOhm" class="social-list__link">
            <i class="fa-brands fa-github"></i>
          </a>
        </li>
      </ul>
      <div class="footer__text">Copyright Kalon Ohmstede 2023 - All Rights Reserved</div>
    </footer>
  }
}

customElements.define ('portfolio-header', PortfolioHeader);

customElements.define ('portfolio-footer', PortfolioFooter);

