var hamburgerMenuButton;
var menuContainerMobile;
var mobileNavbar;

var dictionary;
var currentLanguage;
var languageBasedDictionary;
var gallery;
var previewContainer;
var preview;
var imageSources = [];

async function onload() {
    //await loadDictionary();
    await setLanguage();
    await populateSelections();
    hamburgerMenuButton = document.getElementById('hamburger-button');
    menuContainerMobile = document.querySelector('.menu-container-mobile');
    mobileNavbar = document.querySelector(".menu-container-mobile>nav");

    // try parse gallery
    gallery = document.getElementById("gallery-1");

    if(gallery){
        previewContainer = document.getElementById("preview-container");
        preview = document.getElementById("preview");

        console.log(previewContainer);
        console.log(preview);

        for(let i of gallery.children){
            imageSources.push(i.getAttribute("src"));
        }
    }
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

function galleryZoom(e){
    var img = e.target.getAttribute("src");
    previewContainer.style.display = "flex";

    preview.src = img;
    
}

function exitPreview(){
    preview.src = "";
    previewContainer.style.display = "none";
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
    
    const languageBasedDictionary = dictionary.texts.map(({ id, [currentLanguage]: langText }) => ({ id, text: langText }));

    languageBasedDictionary.forEach(element => {
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
