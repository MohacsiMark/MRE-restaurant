const loggedInUser = JSON.parse(localStorage.getItem("logged_in_user"));
const userAllergies = loggedInUser ? loggedInUser.allergies || [] : [];

function createItem(item, ul) {
    const li = document.createElement("li");

    const img = document.createElement("img");
    img.src = item.kep;
    img.className = "kep etlapelemek";
    img.title = item.nev;
    img.alt = item.nev;
    
    img.setAttribute("data-ingredients", item.ingredients || "");
    img.setAttribute("data-nev", item.nev || "");
    img.setAttribute("data-allergens", item.allergens || ""); 

    const text = document.createTextNode(" " + item.nev + " - ");

    const span = document.createElement("span");
    span.textContent = item.ar + " Ft";

    li.appendChild(img);
    li.appendChild(text);
    li.appendChild(span);

    ul.appendChild(li);
}

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("kep")) {
        const foodName = e.target.getAttribute("data-nev");
        const msg = e.target.getAttribute("data-ingredients");
        const foodAllergens = e.target.getAttribute("data-allergens") || "";

      
        const matches = userAllergies.filter(allergy => 
            foodAllergens.toLowerCase().includes(allergy.toLowerCase())
        );

        if (matches.length > 0) {

            const warningMsg = `⚠️ FIGYELEM! \n\nEz az étel (${foodName}) olyan összetevőket tartalmaz, amikre allergiás vagy: ${matches.join(", ")}!`;
            
            customAlert(warningMsg, true, () => {
                customAlert(`Összetevők listája (${foodName}):\n\n${msg}`, false);
            });
        } else {
            customAlert(`Összetevők (${foodName}):\n\n${msg}` || "Hamarosan elérhető!", false);
        }
    }
});

fetch("../json/eloetel.json").then(r => r.json()).then(data => {
    const ul = document.getElementById("eloetel");
    data.eloetelek.forEach(item => createItem(item, ul));
});

fetch("../json/leves.json").then(r => r.json()).then(data => {
    const ul = document.getElementById("leves");
    data.levesek.forEach(item => createItem(item, ul));
});

fetch("../json/foetel.json").then(r => r.json()).then(data => {
    const ul = document.getElementById("foetel");
    data.foetelek.forEach(item => createItem(item, ul));
});

fetch("../json/desszert.json").then(r => r.json()).then(data => {
    const ul = document.getElementById("desszert");
    data.desszertek.forEach(item => createItem(item, ul));
});

fetch("../json/imre.json").then(r => r.json()).then(data => {
    const ul = document.getElementById("imre");
    data.imre_special.forEach(item => createItem(item, ul));
});

function customAlert(uzenet, isWarning, onCloseCallback = null) {
    const regi = document.querySelector(".custom-alert");
    if (regi) regi.remove();

    const box = document.createElement("div");
    box.className = `custom-alert ${isWarning ? 'alert-warning' : ''}`;

    const formaltUzenet = uzenet.replace(/\n/g, "<br>");

    box.innerHTML = `
        <div class="alert-content">
            ${isWarning ? '<h2 style="color: #d63031; margin-top:0;">VESZÉLY!</h2>' : ''}
            <p>${formaltUzenet}</p>
            <button id="alert-close-btn">Rendben</button>
        </div>
    `;

    document.body.appendChild(box);

    document.getElementById("alert-close-btn").onclick = function() {
        box.remove();

        if (onCloseCallback) {
            onCloseCallback();
        }
    };
}