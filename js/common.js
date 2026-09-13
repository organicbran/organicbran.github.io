barColor();
window.addEventListener('load', () => {
    document.getElementsByClassName("bar-container")[0].classList.add("animate");
});

window.addEventListener('scroll', barColor);

function barColor() {
    const barHeight = document.getElementsByClassName("bar-container")[0].clientHeight;
    let switchPoint = window.scrollY + document.getElementsByClassName("block-container")[0].getBoundingClientRect().top - barHeight;
    if (document.body.scrollTop > switchPoint || document.documentElement.scrollTop > switchPoint) {
        document.body.classList.add("alt");
        document.getElementsByClassName("bar-container")[0].classList.add("alt");
        let links = document.getElementsByClassName("bar-link");
        for (let i = 0; i < links.length; i++) {
            links[i].classList.add("alt");
        }
    } else {
        document.body.classList.remove("alt");
        document.getElementsByClassName("bar-container")[0].classList.remove("alt");
        let links = document.getElementsByClassName("bar-link");
        for (let i = 0; i < links.length; i++) {
            links[i].classList.remove("alt");
        }
    }
}

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");

document.addEventListener("click", (e) => {
    const image = e.target.closest("img.image-expandable");
    if (!image) return;

    const src = image.dataset.full || image.src;
    lightboxImage.src = src;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
});

lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
});

lightboxImage.addEventListener("click", close);

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("open")) close();
});

function close() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    document.body.style.overflow = "";
}
