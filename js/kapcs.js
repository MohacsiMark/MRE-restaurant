const nev=document.getElementById("name");
const email=document.getElementById("email");
const message=document.getElementById("message");
const btn=document.getElementById("send");

function Kuldes(){
    if(nev.value!=="" && email.value!=="" && message.value!==""){
        window.location.href="../html/uzenet.html";
    }
};

btn.addEventListener("click",Kuldes);