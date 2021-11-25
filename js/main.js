let currentTab = "#";

const selector = (q) => document.querySelector(q);
const selectorAll = (q) => document.querySelectorAll(q);

function beginTask() {
    selector("#spinner").style.visibility = "visible";
}

function endTask() {
    selector("#spinner").style.visibility = "hidden";
}

beginTask();

function runTask(task) {
    beginTask();
    try {
        task();
    } finally {
        endTask();
    }
}

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
            toggleMenu(true);
        }
    }
});

const toggleOptionsDialog = () => {
    const dialog = selector("#options-dialog");
    if (dialog.classList.contains("dialog-hidden")) {
        dialog.classList.remove("dialog-hidden");
        dialog.classList.add("dialog-transition");
    } else {
        dialog.classList.add("dialog-hidden");
    }
};

const handleClick = (evt) => {
    if (
        evt.target.id === "options" ||
        evt.target.id === "options-dialog" ||
        evt.target.id === "dialog-close-btn"
    ) {
        toggleOptionsDialog();
    } else if (
        evt.target.id === "menu-popper" ||
        evt.target.id === "menu-overlay"
    ) {
        toggleMenu();
    } else if (evt.target.id === "dark-theme") {
        toggleTheme();
    }
};

const handleChange = (evt) => {
    if (evt.target.id == "bgc-option") {
        selector("body").style.backgroundColor = evt.target.value;
    }
};

const toggleMenu = (hide=false) => {
    const overlay = selector(".dialog-overlay");
    const nav = selector(".main-nav-collection");
    if (!hide && nav.style["visibility"] !== "visible") {
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
selector("#dark-theme").addEventListener("click", handleClick);

selector("#options-dialog").addEventListener("click", handleClick);

// make sure that the nav is visible when the window is made bigger.
window.addEventListener("resize", () => {
    const overlay = selector(".dialog-overlay");
    const nav = selector(".main-nav-collection");
    if (nav.style["position"] !== "fixed") {
        nav.style["visibility"] = null;
        overlay.style["display"] = "none";
    }
});

function toggleToolbar() {
    if (window.scrollY > selector(".tool-bar").clientHeight) {
        selector(".tool-bar").classList.add("opaque");
    } else {
        selector(".tool-bar").classList.remove("opaque");
    }
}

document.addEventListener("scroll", (evt) => {
    let tab;

    if (window.scrollY <= selector("#lead").clientHeight / 2) {
        tab = "#";
    } else {
        ["#about", "#skills", "#projects", "#contact-side"].forEach((ref) => {
            if (
                selector(ref).offsetLeft <= selector(".collection-main-left").offsetLeft && selector(ref).offsetTop - selector(ref).offsetTop / 8 <=
                window.scrollY
            ) {
                tab = ref;
            }
        });
    }

    console.log(tab);

    if (tab) {
        switchToTab(tab);
    }

    toggleToolbar();
});

let currentTheme = "light";

function setTheme(theme) {
    selectorAll(`.${currentTheme}`).forEach((item) => {
        item.classList.remove(currentTheme);
    });

    if (theme) {
        selectorAll("*").forEach((elm) => elm.classList.add(theme));
        currentTheme = theme;
    }
}

function toggleTheme() {
    if (isOptionEnabled("#dark-theme")) {
        runTask(() => setTheme(null));
    } else {
        runTask(() => setTheme(currentTheme));
    }
}

function init() {
    toggleToolbar();
    toggleTheme();
}

init();