/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

/* -----------------------------------------
  "Visit Site" popup for projects that aren't hosted
 ---------------------------------------- */

const siteModal = document.querySelector("#site-modal");

if (siteModal) {
  const visitSiteLinks = document.querySelectorAll(".work__links .link__text");
  const closeEls = siteModal.querySelectorAll("[data-modal-close]");
  let lastFocusedEl = null;

  const openModal = () => {
    siteModal.classList.add("is-open");
    siteModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    const focusTarget = siteModal.querySelector(".modal__btn");
    if (focusTarget) requestAnimationFrame(() => focusTarget.focus());
  };

  const handleVisitClick = (e) => {
    const href = e.currentTarget.getAttribute("href");
    // Only intercept placeholder links; real hosted URLs navigate normally.
    if (href && href !== "#") return;
    e.preventDefault();
    lastFocusedEl = e.currentTarget;
    openModal();
  };

  const closeModal = () => {
    if (!siteModal.classList.contains("is-open")) return;
    siteModal.classList.remove("is-open");
    siteModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (lastFocusedEl) {
      lastFocusedEl.focus();
      lastFocusedEl = null;
    }
  };

  visitSiteLinks.forEach((link) => link.addEventListener("click", handleVisitClick));
  closeEls.forEach((el) => el.addEventListener("click", closeModal));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}
