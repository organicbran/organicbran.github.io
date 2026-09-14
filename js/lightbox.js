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
