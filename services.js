function setInfoBoxes(){
    console.log("settingInfoBoxes");
    let infoboxes = Array.from(document.getElementsByClassName("infobox"));

    infoboxes.forEach(element => {element.style.display = "none"; element.parentElement.style.display = "none"; })
}

function handleClick(e) {
    let currentlyActiveBox = null;
    let button = e.className.split(' ')[1]
    let infoboxes = Array.from(document.getElementsByClassName("infobox"));
    let infoBox = document.getElementsByClassName(button + "-content")[0];
    let currentInfoBoxContainer = infoBox.parentElement;

    infoboxes.forEach(element => {
        let parent = element.parentElement;

        if (!element.className.includes(button + "-content")) {
            element.style.display = "none";
        }
        else {
            if(element.style.display === "none" && parent.style.display === "none"){
                    element.style.animation = "slidedown 0.5s";
                    element.style.display = "block";

            }
            else{
                element.style.display = "none";
            }
        }

        currentInfoBoxContainer.style.display = infoBox.style.display;
    });
}