var hamburgerMenuButton;
var menuContainerMobile;
var mobileNavbar;

var dictionary;
var currentLanguage;
var languageBasedDictionary;

async function onload() {
    //await loadDictionary();
    await setLanguage();
    await populateSelections();
    hamburgerMenuButton = document.getElementById('hamburger-button');
    menuContainerMobile = document.querySelector('.menu-container-mobile');
    mobileNavbar = document.querySelector(".menu-container-mobile>nav");
}

function handleHamburger() {
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
}

//#endregion HAMBURGER//


// SLIDER

function prevSlide() {
    handleScroll(-1);
}

function nextSlide() {
    handleScroll(1);
}

function handleScroll(amount) {
    var gallerySlider = document.getElementById("gallery");
    var gallerySliderWidth = gallerySlider.offsetWidth;
    var galleryChildCount = gallerySlider.children.length;

    if (gallerySlider) {
        gallerySlider.scrollLeft += amount * 2 * (gallerySliderWidth / galleryChildCount);
    }
}



// TRANSLATION
async function loadDictionary() {
    try {
        const response = await fetch('./dictionary.json');
        if (!response.ok) {
            throw new Error(`Failed to load dictionary.json (HTTP ${response.status})`);
        }
        dictionary = await response.json();

    } catch (error) {
        console.error('Error loading dictionary:', error.message);
    }
}

async function setLanguage() {
    await loadDictionary();

    var cookie = document.cookie;
    if (cookie === undefined || cookie.length === 0) {
        document.cookie = "lang=tr";
        currentLanguage = "tr";
    }
    else {
        currentLanguage = cookie.split('=')[1];
    }
    console.log(currentLanguage);
    const languageBasedDictionary = dictionary.texts.map(({ id, [currentLanguage]: langText }) => ({ id, text: langText }));
    console.log(languageBasedDictionary);

    languageBasedDictionary.forEach(element => {
        console.log(element.id + ">" + element.text);
        let htmlElement = document.getElementById(element.id)
        if(htmlElement){
            htmlElement.innerHTML = element.text;
        }
    });
}

async function populateSelections(){
    var desktopSelect = document.querySelector(".language-selector select");
    var mobileSelect = document.querySelector(".language-selector-mobile select");
    
    desktopSelect.innerHtml = "";
    mobileSelect.innerHTML = "";

    dictionary.languages.forEach(lang => {
        let option = document.createElement("option");
        let option_mobile = document.createElement("option");
        option.value = lang.short;
        option.textContent = lang.name;

        option_mobile.value = lang.short;
        option_mobile.textContent = lang.name;

        desktopSelect.appendChild(option)
        mobileSelect.appendChild(option_mobile);
    })

    desktopSelect.value = currentLanguage;
    mobileSelect.value = currentLanguage;
}

async function handleLanguageSelector(event){
    var changedSelect = event.target;

    document.cookie = "lang=" + changedSelect.value;
    await setLanguage();
}
