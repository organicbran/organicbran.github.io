window.onscroll = function() {scrollFunction()};
function scrollFunction() {
    let switchPoint = window.scrollY + document.getElementsByClassName("block-2")[0].getBoundingClientRect().top - document.getElementById("bar-container").clientHeight;
    if (document.body.scrollTop > switchPoint || document.documentElement.scrollTop > switchPoint) {
        document.body.style.backgroundColor = getComputedStyle(document.body).getPropertyValue('--black');
        document.getElementById("bar-container").classList.add("dark")
        document.getElementById("icon").classList.add("dark");
        var links = document.getElementsByClassName("bar-link");
        for (var i = 0; i < links.length; i++) {
            links[i].classList.add("dark");
        }
        var links = document.getElementsByClassName("bar-link-fill");
        for (var i = 0; i < links.length; i++) {
            links[i].classList.add("dark");
        }
    } else {
        document.body.style.backgroundColor = getComputedStyle(document.body).getPropertyValue('--yellow');
        document.getElementById("bar-container").classList.remove("dark")
        document.getElementById("icon").classList.remove("dark");
        var links = document.getElementsByClassName("bar-link");
        for (var i = 0; i < links.length; i++) {
            links[i].classList.remove("dark");
        }
        var links = document.getElementsByClassName("bar-link-fill");
        for (var i = 0; i < links.length; i++) {
            links[i].classList.remove("dark");
        }
    }
}