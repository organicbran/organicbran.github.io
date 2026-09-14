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
