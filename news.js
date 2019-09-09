let host = "http://localhost:8080";

let header1 = document.querySelector("#header1");
let div1 = document.querySelector("#div1");
let image = document.querySelector("#image");
let input = document.querySelector("#input");
let btnPrev = document.querySelector("#btnPrev");
let btnNext = document.querySelector("#btnNext");
let story = 0;

fetch(host + "/news/all", {
    method: "GET",
    headers: {
        "Content-Type": "application/json; charset=utf-8"
    },
})
    .then(response => response.json())
    .then(json => handleResponse(json))
    .catch(error => console.error("Error: ", error));

btnPrev.addEventListener("click", () => {
    fetch(host + "/news/all", {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
    })
        .then(response => response.json())
        .then(json => {story != 0 ? story-- : {}; handleResponse(json)})
        .catch(error => console.error("Error: ", error));
});

btnNext.addEventListener("click", () => {
    fetch(host + "/news/all", {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
    })
        .then(response => response.json())
        .then(json => {story < json.length - 1 ? story++ : {}; handleResponse(json)})
        .catch(error => console.error("Error: ", error));
});

function handleResponse(json) {
    header1.innerHTML = json[story].caption;
    div1.innerHTML = json[story].content;
    image.src = json[story].imageUrl != null ? json[story].imageUrl : "";
}