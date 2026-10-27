const typeInterval = 30;
const typePauseInterval = 200;

const projectDetails = document.getElementsByClassName("project-meta");
const modules = document.getElementsByClassName("map-layer");
const moduleParent = document.getElementsByClassName("map-container")[0];
var activeProjectID = -1;
var activeTimeouts = [];

function typeInfo(projectID) {
    if (projectID == -1) {
        return;
    }
    let fields = document.getElementsByClassName("map-field");
    for (let i = 0; i < activeTimeouts.length; i++) {
        clearTimeout(activeTimeouts[i]);
    }
    activeTimeouts = [];
    for (let i = 0; i < fields.length; i++) {
        fields[i].innerHTML = "";
        typeField(fields[i], projectDetails[projectID].children[i].innerText, i == 3);
    }
}

function typeField(field, text, hideOnEmpty) {
    if (hideOnEmpty) {
        if (text.length == 0) {
            field.parentNode.classList.add("hidden");
        } else {
            field.parentNode.classList.remove("hidden");
        }
    }
    let i = 0;
    function typeChar() {
        if (i < text.length) {
            let char = text.charAt(i);
            i++;
            if (char == '*') {
                field.innerHTML += '<br>';
                typeChar();
            } else if (char == '~') {
                activeTimeouts.push(setTimeout(typeChar, typePauseInterval));
            } else {
                field.innerHTML += char;
                activeTimeouts.push(setTimeout(typeChar, typeInterval));
            }
        }
    }
    typeChar();
}

function showModules(projectID) {
    if (projectID == -1) {
        return;
    }
    const values = projectDetails[projectID].children[4].innerText;
    for (let i = 0; i < 4; i++) {
        if (values.charAt(i) == 'Y') {
            modules[i].classList.remove("hidden");
        } else {
            modules[i].classList.add("hidden");
        }
    }
    if (values.charAt(4) == 'Y') {
        moduleParent.classList.add("shrink");
    } else {
        moduleParent.classList.remove("shrink");
    }
}

function projectInfo() {
    let newProjectID;
    let projects = document.getElementsByClassName("project");
    for (let i = 0; i < projects.length; i++) {
        let startPoint = window.scrollY + projects[i].getBoundingClientRect().top - window.innerHeight / 2;
        if (document.body.scrollTop > startPoint || document.documentElement.scrollTop > startPoint) {
            newProjectID = i;
        }
    }
    if (newProjectID != activeProjectID && newProjectID >= 0) {
        activeProjectID = newProjectID;
        typeInfo(activeProjectID);
        showModules(activeProjectID);
    }
}

window.addEventListener('scroll', projectInfo);
projectInfo();
