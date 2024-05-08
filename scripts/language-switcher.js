document.addEventListener("DOMContentLoaded", function() {
    const finnishFlag = document.getElementById("finnish-flag");
    const englishFlag = document.getElementById("english-flag");

    if (finnishFlag && englishFlag) {
        const pagePath = window.location.pathname;
        const selectedLanguage = pagePath.includes("/fi/") ? "fi" : "en";

        if (selectedLanguage === "fi") {
            finnishFlag.classList.add("selected-flag");
        } else {
            englishFlag.classList.add("selected-flag");
        }

        [finnishFlag, englishFlag].forEach(flag => {
            flag.addEventListener("click", function() {
                const selectedLanguage = this.dataset.language;
                const pagePath = window.location.pathname;
                const currentPage = pagePath.substring(pagePath.lastIndexOf('/') + 1);
                const currentDirectory = pagePath.substring(0, pagePath.lastIndexOf('/') + 1);
                let newPath;

                if (selectedLanguage === "en") {
                    if (currentPage.endsWith("_fi.html")) {
                        newPath = currentDirectory.replace("/fi/", "/en/") + currentPage.replace("_fi.html", ".html");
                    } else {
                        newPath = pagePath.replace(".html", ".html").replace("_fi", "");
                    }
                } else {
                    if (!currentPage.endsWith("_fi.html")) {
                        newPath = currentDirectory.replace("/en/", "/fi/") + currentPage.replace(".html", "_fi.html");
                    } else {
                        newPath = pagePath;
                    }
                }

                // Remove the 'selected-flag' class from both flags
                finnishFlag.classList.remove("selected-flag");
                englishFlag.classList.remove("selected-flag");

                // Add the 'selected-flag' class to the clicked flag
                this.classList.add("selected-flag");

                window.location.href = newPath;
            });
        });
    } else {
        console.error("Language select element not found!");
    }
});