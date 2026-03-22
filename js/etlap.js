function createItem(item, ul) {
    const li = document.createElement("li");

    const img = document.createElement("img");
    img.src = item.kep;
    img.className = "kep etlapelemek";
    img.title = item.nev;
    img.alt = item.nev;
    img.setAttribute("data-ingredients", item.ingredients || "");

    const text = document.createTextNode(" " + item.nev + " - ");

    const span = document.createElement("span");
    span.textContent = item.ar + " Ft";

    li.appendChild(img);
    li.appendChild(text);
    li.appendChild(span);

    ul.appendChild(li);
}

fetch("../json/eloetel.json")
.then(r => r.json())
.then(data => {
    const ul = document.getElementById("eloetel");
    data.eloetelek.forEach(item => createItem(item, ul));
});

fetch("../json/leves.json")
.then(r => r.json())
.then(data => {
    const ul = document.getElementById("leves");
    data.levesek.forEach(item => createItem(item, ul));
});

fetch("../json/foetel.json")
.then(r => r.json())
.then(data => {
    const ul = document.getElementById("foetel");
    data.foetelek.forEach(item => createItem(item, ul));
});

fetch("../json/desszert.json")
.then(r => r.json())
.then(data => {
    const ul = document.getElementById("desszert");
    data.desszertek.forEach(item => createItem(item, ul));
});

fetch("../json/imre.json")
.then(r => r.json())
.then(data => {
    const ul = document.getElementById("imre");
    data.imre_special.forEach(item => createItem(item, ul));
});

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("kep")) {
        const msg = e.target.getAttribute("data-ingredients");

        customAlert(
            msg || "Ennek az ételnek az összetevői hamarosan elérhetőek lesznek!"
        );
    }
});

function customAlert(uzenet) {
    const regi = document.querySelector(".custom-alert");
    if (regi) regi.remove();

    const box = document.createElement("div");
    box.className = "custom-alert";

    box.innerHTML = `
        <div class="alert-content">
            <p>${uzenet}</p>
            <button onclick="this.parentElement.parentElement.remove()">Rendben</button>
        </div>
    `;

    document.body.appendChild(box);

    setTimeout(() => {
        if (box.parentNode) box.remove();
    }, 5000);
}