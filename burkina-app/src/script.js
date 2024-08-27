import languages from './languages.js';

const dropdowns = document.querySelectorAll(".dropdown-container"),
    inputLanguageDropdown = document.querySelector("#input-language"),
    outputLanguageDropdown = document.querySelector("#output-language");

function populateDropdown(dropdown, options) {
    dropdown.querySelector("ul").innerHTML = "";
    options.forEach((option) => {
        const li = document.createElement("li");
        //const title = option.name + " (" + option.native + ")";
        const title = option.name
        li.innerHTML = title;
        li.dataset.value = option.code;
        li.classList.add("option");
        dropdown.querySelector("ul").appendChild(li);
    });
}

populateDropdown(inputLanguageDropdown, languages);
populateDropdown(outputLanguageDropdown, languages);

dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", (e) => {
        dropdown.classList.toggle("active");
    });

    dropdown.querySelectorAll(".option").forEach((item) => {
        item.addEventListener("click", (e) => {
            dropdown.querySelectorAll(".option").forEach((option) => {
                option.classList.remove("active");
            });

            item.classList.add("active");
            const selected = dropdown.querySelector(".selected");
            selected.innerHTML = item.innerHTML;
            selected.dataset.value = item.dataset.value;
            translate();
        });
    });
});

document.addEventListener("click", (e) => {
    dropdowns.forEach((dropdown) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove("active");
        }
    });
});

// translator
const inputTextElem = document.querySelector("#input-text");
const outputTextElem = document.querySelector("#output-text");
//const inputLanguage = inputLanguageDropdown.querySelector(".selected");
//const outputLanguage = outputLanguageDropdown.querySelector(".selected");
const swapBtn = document.querySelector(".swap-position");

function translate() {
    const inputText = inputTextElem.value.value;
    const inputLanguage = inputLanguageDropdown.querySelector(".selected").dataset.value;
    const outputLanguage = outputLanguageDropdown.querySelector(".selected").dataset.value;

    const filePaths = [
        `/corpus/${inputLanguage}-${outputLanguage}/parallel/${inputText}.txt`,
        `/corpus/${inputLanguage}-${outputLanguage}/monolingual/${inputText}.txt`
    ];
    

    fetch(filePaths)
        .then((response) => response.text())
        .then((text) => {
            outputTextElem.value = text[0].map((item) => item[0].join(""));
        })
        .catch((error) => {
            console.log(error)
        })
}

inputTextElem.addEventListener("input", (e) => {
    if (inputTextElem.value.length > 10000) {
        inputTextElem.value = inputTextElem.value.slice(0, 10000);
    }
    translate();
});

swapBtn.addEventListener("click", () => {
    const tempInnerHTML = inputLanguageDropdown.querySelector(".selected").innerHTML;
    inputLanguageDropdown.querySelector(".selected").innerHTML = outputLanguageDropdown.querySelector(".selected").innerHTML;
    outputLanguageDropdown.querySelector(".selected").innerHTML = tempInnerHTML;

    const tempValue = inputLanguageDropdown.querySelector(".selected").dataset.value;
    inputLanguageDropdown.querySelector(".selected").dataset.value = outputLanguageDropdown.querySelector(".selected").dataset.value;
    outputLanguageDropdown.querySelector(".selected").dataset.value = tempValue;

    const tempInputText = inputTextElem.value;
    inputTextElem.value = outputTextElem.textContent;
    outputTextElem.textContent = tempInputText;

    translate();
});