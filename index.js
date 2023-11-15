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

    await setText();
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