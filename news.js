let host = "http://localhost:8080";

let input = document.querySelector("#input");
let btnCategory = document.querySelector("#btnCategory");
let category = -1;

fetch(host + "/news/all", {
    method: "GET",
    headers: {
        "Content-Type": "application/json; charset=utf-8"
    },
})
    .then(response => response.json())
    .then(json => handleResponse(json))
    .catch(error => console.error("Error: ", error));

btnCategory.addEventListener("click", () => {
    category = parseInt(input.value, 10);
    fetch(host + "/news/" + (category >= 0 ? ("sort?category=" + category) : "all"), {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
    })
        .then(response => response.json())
        .then(json => handleResponse(json))
        .catch(error => console.error("Error: ", error));
});

function handleResponse(json) {
    var parentDiv = document.querySelector("#articles");
    var prevArticles = document.querySelectorAll(".article");
    for(var i = 0; i < prevArticles.length; i++)
    {
        parentDiv.removeChild(prevArticles[i]);
    }
    for (let i = 0; i < json.length; i++) {
        var div = document.createElement("DIV");
        div.className = "article";
        var header = document.createElement("H1");
        var content = document.createElement("DIV");
        var image = document.createElement("IMG");
        var headerText = document.createTextNode(json[i].caption);
        var contentText = document.createTextNode(json[i].content);
        header.appendChild(headerText);
        content.appendChild(contentText);
        image.src = json[i].imageUrl != null ? json[i].imageUrl : "";
        div.appendChild(header);
        div.appendChild(content);
        div.appendChild(image);
        parentDiv.appendChild(div);
    }
}