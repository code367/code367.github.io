let currentTab = "#";

const selector = (q) => document.querySelector(q);
const selectorAll = (q) => document.querySelector(q);

function beginTask() {
    selector("#spinner").style.visibility = "visible";
}

function endTask() {
    selector("#spinner").style.visibility = "hidden";
}

beginTask();

document.addEventListener("readystatechange", (evt) => {
    if (document.readyState === "complete") {
        endTask();
    }
});

const switchToTab = (tab) => {
    if (tab !== currentTab) {
        const oldTab = selector(".tab-selector-active");
        const newTab = selector(`nav ul a[href=\"${tab}\"]`).parentNode;

        oldTab.classList.remove("tab-selector-active");
        newTab.classList.add("tab-selector-active");

        currentTab = tab;
    }
};

const isOptionEnabled = (option) => selector(option).checked;

document.addEventListener("click", (evt) => {
    let ref = evt.target.href;
    const index = ref && ref.indexOf("#");

    if (index + 1) {
        ref = ref.substring(index);

        const oldTab = selector(".tab-selector-active");
        const newTab = selector(`nav ul a[href=\"${ref}\"]`).parentNode;

        const scrollOptions = {
            behavior: isOptionEnabled("#smooth-scroll") ? "smooth" : "auto",
            block: "start",
            inline: "nearest",
        };

        const target = selector(ref.length === 1 ? "#body" : ref);

        target.scrollIntoView(scrollOptions);

        evt.preventDefault();

        const nav = selector(".main-nav-collection");

        if (nav.style["visibility"]) {
            toggleMenu();
        }
    }
});

const handleClick = (evt) => {
    if (evt.target.id === "options") {
        const dialog = selector("#options-dialog");
        if (dialog.classList.contains("dialog-hidden")) {
            dialog.classList.remove("dialog-hidden");
            dialog.classList.add("dialog-transition");
        } else {
            dialog.classList.add("dialog-hidden");
        }
    } else if (evt.target.id === "options-dialog") {
        const dialog = selector("#options-dialog");
        dialog.classList.add("dialog-hidden");
    } else if (evt.target.id === "menu-popper" || evt.target.id === "menu-overlay") {
        toggleMenu();
    }
};

const handleChange = (evt) => {
    if (evt.target.id == "bgc-option") {
        selector("body").style.backgroundColor = evt.target.value;
    }
};

const toggleMenu = () => {
    const overlay = selector(".dialog-overlay");
    const nav = selector(".main-nav-collection");
    if (nav.style["visibility"] !== "visible") {
        nav.style["visibility"] = "visible";
        overlay.style["display"] = "block";
    } else {
        nav.style["visibility"] = "hidden";
        overlay.style["display"] = null;
    }
};

const switchTab = (evt) => {
    const oldTab = selector(".tab-selector-active");
    const newTab = evt.target.parentNode;

    oldTab.classList.remove("tab-selector-active");
    newTab.classList.add("tab-selector-active");

    const nav = selector(".main-nav-collection");
};

selector("#options").addEventListener("click", handleClick);
selector("#menu-popper").addEventListener("click", handleClick);
selector("#menu-overlay").addEventListener("click", handleClick);

// make sure that the nav is visible when the window is made bigger.
window.addEventListener("resize", () => {
    const overlay = selector(".dialog-overlay");
    const nav = selector(".main-nav-collection");
    if (nav.style["position"] !== "fixed") {
        nav.style["visibility"] = null;
        overlay.style["display"] = "none";
    }
});

document.querySelector("#options").addEventListener("click", handleClick);
document.querySelector("#options-dialog").addEventListener("click", handleClick);

document.addEventListener("scroll", (evt) => {
    let tab;

    if (window.scrollY <= selector("#lead").clientHeight / 2) {
        tab = "#";
    } else {
        ["#about", "#skills", "#projects"].forEach((ref) => {
            if (selector(ref).offsetTop - selector(ref).offsetTop / 8 <= window.scrollY) {
                tab = ref;
            }
        });
    }

    if (tab) {
        switchToTab(tab);
    }

    if (window.scrollY > selector(".tool-bar").clientHeight) {
        selector(".tool-bar").classList.add("opaque");
    } else {
        selector(".tool-bar").classList.remove("opaque");
    }
});