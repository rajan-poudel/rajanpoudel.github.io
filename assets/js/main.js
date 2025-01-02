/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

// Menu Show
// Validate if constant exists
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

// Menu Hidden
// Validate if constant exists
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll(".nav__link");

const linkAction = () => {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav_link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
};

navLink.forEach((n) => n.addEventListener("click", linkAction));

/*=============== SHADOW HEADER ===============*/
const shadowHeader = () =>{
  const header = document.getElementById('header')
  // When the scroll is greater than 50 viewport height, add the class list
  this.scrollY >= 50
    ? header.classList.add("shadow-header")
    : header.classList.remove("shadow-header");
}
window.addEventListener('scroll', shadowHeader)

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
      contactMessage = document.getElementById('contact-message')

const sendEmail = (e) => {
  e.preventDefault()

  // serviceID - templateID - #form - publicKey
  emailjs.sendForm(
    "service_jbqc9yo",
    "template_cf81pgc",
    "#contact-form",
    "dHZ7QpTwL2xvsRVeL"
  ).then(() => {
    // Show sent message
    contactMessage.textContent = 'Message sent successfully'

    // Remove message after five seconds
    setTimeout(() => {
      contactMessage.textContent = ''
    }, 5000)

    // Clear input fields
    contactForm.reset()
  }, () =>{
    // Show error message
    contactMessage.textContent = 'Message not sent (service error)'
  });
}

contactForm.addEventListener('submit', sendEmail)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () => {
  const scrollUp = document.getElementById('scroll-up')
  // When the scroll is higher than 350 viewport height, add the class
  this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                      : scrollUp.classList.remove('show-scroll') 
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "ri-sun-line";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "ri-moon-line" : "ri-sun-line";

//  We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validate is fullfilled, we ask what the issues was to know if we activated
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "ri-moon-line" ? "add" : "remove"](
    iconTheme
  );
}

//  Active / deactive the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user choose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2500,
  delay: 400,
  // reset: true // Animation repeat
})

sr.reveal(`.home__perfil, .about__image, .contact__mail`, {origin: 'right'})
sr.reveal(`.home__name, .home__info, .about__container, .section__title-1, .about__info, .contact__social, .contact__data`, {origin: 'left'})
sr.reveal(`.services__card, .projects__card`, {interval: 100})






// Blogs

const sanitizeHTML = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

document.addEventListener("DOMContentLoaded", () => {
  const blogContainer = document.getElementById("blog-container");

  fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@rajan-poudel")
      .then(response => response.json())
      .then(data => {
        const latestArticles = data.items.slice(0, 6);
        latestArticles.forEach(article => {
              const blogCard = document.createElement("article");
              blogCard.classList.add("projects__card");
              
              const sanitizedDescription = sanitizeHTML(article.description);

              blogCard.innerHTML = `

              <article class="projects__card">
                  <div class="projects__image">
                     <img src="${article.description.match(/<img[^>]+src="([^">]+)"/)[1]}" class="projects__img">

                     <a href="${article.link}" class="projects__button button">
                        <i class="ri-arrow-right-up-line"></i>
                     </a>
                  </div>

                  <div class="projects__content">
                     <span class="projects__subtitle"> ${new Date(article.pubDate).toLocaleDateString()}</span>
                     <h2 class="projects__title">${article.title.substring(0, 50)}...</h2>

                     <p class="projects__description">
                     ${sanitizedDescription.substring(0, 100)}...
                     </p>
                  </div>

                  <div class="projects__buttons">
                        <i class="ri-user-3-line"></i>${article.author}
                     </a>

                     <a href="https://medium.com/@rajan-poudel" target="_blank" class="projects__link">
                        <i class="ri-dribbble-line"></i> All articles
                     </a>
                  </div>
               </article>
              `;

              blogContainer.appendChild(blogCard);
          });
      })
      .catch(error => console.error("Error fetching Medium blog posts:", error));
});
