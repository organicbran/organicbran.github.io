window.onscroll = function() {scrollFunction()};
function scrollFunction() {
    let switchPoint = window.scrollY + document.getElementById("block-2").getBoundingClientRect().top - document.getElementById("bar").clientHeight;
    if (document.body.scrollTop > switchPoint || document.documentElement.scrollTop > switchPoint) {
        document.getElementById("bar").classList.add("dark")
        document.getElementById("icon").classList.add("dark");
        var links = document.getElementsByClassName("bar-link");
        for (var i = 0; i < links.length; i++) {
            links[i].classList.add("dark");
        }
    } else {
        document.getElementById("bar").classList.remove("dark")
        document.getElementById("icon").classList.remove("dark");
        var links = document.getElementsByClassName("bar-link");
        for (var i = 0; i < links.length; i++) {
            links[i].classList.remove("dark");
        }
    }
}