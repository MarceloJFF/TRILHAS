const home = document.querySelector(".button-home")
const regulation = document.querySelector('.button-regulation');
const faqs = document.querySelector('.button-faqs')

function removeClass() {
    document.querySelectorAll(".nav-button").forEach(button => {
        button.classList.remove("border-bottom", "border-primary", "border-3");
    })
}

const pagAtual = window.location.pathname.split('/').pop();
switch (pagAtual) {
    case "home.html":
        removeClass()
        home.classList.add("border-bottom", "border-primary", "border-3");
        break;
    case "regulation.html":
        removeClass()
        regulation.classList.add("border-bottom", "border-primary", "border-3");
        break;
    case "FAQs.html":
        removeClass()
        faqs.classList.add("border-bottom", "border-primary", "border-3");
        break;
    default:
        removeClass();
        break;
}
