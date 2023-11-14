function hamburgerOnClick() {
    console.log("selamünaleyqe")

    let mobileNavbar = document.getElementById("mobile-navbar");

    console.log(mobileNavbar)
    if (!mobileNavbar) {
    }

    if (mobileNavbar.style.display == "none") {
        mobileNavbar.style.display = "flex";
    }
    else {
        mobileNavbar.style.display = "none"
    }
}