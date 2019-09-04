let host = "http://localhost:8080";

let header1 = document.querySelector("#header1");
let div1 = document.querySelector("#div1")

fetch(host + "/index", {
    method: "GET",
    headers: {
        "Content-Type": "application/json; charset=utf-8"
    },
})
    .then(response => response.json())
    .then(json => handleResponse(json))
    .catch(error => console.error("Error: ", error));

function handleResponse(json)
{
    header1.innerHTML = json[0].caption;
    div1.innerHTML = json[0].content;
}