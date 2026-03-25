const nev = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");
const btn = document.getElementById("send");

function Kuldes() {
    if (nev.value !== "" && email.value !== "" && message.value !== "") {

        const ujUzenet = {
            nev: nev.value,
            email: email.value,
            uzenet: message.value,
            datum: new Date().toLocaleString()
        };

        let uzenetek = localStorage.getItem("uzenetek");

        if (uzenetek) {
            uzenetek = JSON.parse(uzenetek);
        } else {
            uzenetek = [];
        }

        uzenetek.push(ujUzenet);

        localStorage.setItem("uzenetek", JSON.stringify(uzenetek));

        window.location.href = "../html/uzenet.html";
    } else {
        alert("Tölts ki minden mezőt!");
    }
}

btn.addEventListener("click", Kuldes);