function hamburgerOnClick() {
    let mobileNavbar = document.getElementById("mobile-navbar");
    if (!mobileNavbar) {
    }

    if (mobileNavbar.style.display == "none") {
        mobileNavbar.style.display = "flex";
    }
    else {
        mobileNavbar.style.display = "none"
    }
}

async function firstLoad() {
    const cookie = document.cookie;

    const selects = document.getElementsByClassName("languageSelector");
    let dict = await parseLang();
    console.log(dict);
    for (let select of selects) {
        if (cookie != '') {
            select.value = cookie.split('=')[1];
        }
        else {
            select.value = "en";
            document.cookie = "Lang=en";
        }

        if (dict && dict.languages && dict.languages.length > 0) {
            dict.languages.forEach(x => {
                var opt = document.createElement('option');
                opt.value = x.short;
                opt.innerHTML = x.name;
                select.appendChild(opt);
            });
        }
    }

    //await setText();
}

function changelang(event) {
    let target = event.target;
    let value = target.value;
    document.cookie = `Lang=${value}`;

    setText();
}

async function parseLang() {
    let dict = {};

    await fetch('./dictionary.json')
        .then((response) => response.json())
        .then((json) => dict = json);

    return dict;
}

async function setText() {
    texts = Array.from(document.getElementsByClassName("text"));
    let lang = document.cookie.split('=')[1];
    let dict = await parseLang();

    for (let i = 0; i < texts.length; i++) {
        let id = texts[i].id;
        let textDict = dict.texts.find((x) => x.id == id);
        //console.log(id);
        //console.log(textDict);
        if (!textDict) {
            continue;
        }
        let text = textDict[lang];
        //console.log(text);
        texts[i].innerHTML = text;
    }
}


//#region HAMBURGER//

var hamburgerMenuButton;
var menuContainerMobile;
var mobileNavbar;

function onload() {
    console.log("loaded");
    hamburgerMenuButton = document.getElementById('hamburger-button');

    menuContainerMobile = document.querySelector('.menu-container-mobile');
    mobileNavbar = document.querySelector(".menu-container-mobile>nav");
    console.log(mobileNavbar)
    console.log(menuContainerMobile)
    console.log(hamburgerMenuButton)
}

function handleHamburger() {
    console.log(!hamburgerMenuButton.checked);
    if (!hamburgerMenuButton.checked) {
        menuContainerMobile.classList.remove("off");
        menuContainerMobile.classList.add("on");
        mobileNavbar.style.transition = "opacity 0.6s"
        mobileNavbar.style.opacity = "1";
    } else {
        menuContainerMobile.classList.remove("on");
        menuContainerMobile.classList.add("off");
        mobileNavbar.style.transition = "opacity 0.6s"
        mobileNavbar.style.opacity = "0";
    }

    console.log(!hamburgerMenuButton.checked);
}

//#endregion HAMBURGER//


// SLIDER

function prevSlide(e) {
    handleScroll(-1, e.target);
}

function nextSlide(e) {
    handleScroll(1, e.target);
}

function handleScroll(amount, t) {
    var target = t.id.split('-')[1];


    var gallerySlider = document.getElementById(`gallery-${target}`);
    var gallerySliderWidth = gallerySlider.offsetWidth;
    var galleryChildCount = gallerySlider.children.length;

    if (gallerySlider) {
        gallerySlider.scrollLeft += amount * 2 * (gallerySliderWidth / galleryChildCount);
    }
}