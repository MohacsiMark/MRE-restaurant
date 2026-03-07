const counter=document.getElementById("counter");
let time=5;

const timer=setInterval(()=>{
    time--;
    counter.textContent=time;

    if(time<=0){
        window.location.href="../html/kapcs.html";
    }
}, 1000);