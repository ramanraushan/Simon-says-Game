let gameSeq=[];
let userSeq=[];
let highScore = 0;

let btns=["red","green","yellow","blue"];
let started=false;
let level = 0;
let h2=document.querySelector("h2")
document.addEventListener("keypress",startGame);
document.addEventListener("touchstart",startGame);
document.addEventListener("click",startGame);
    
    function startGame(){
    if(started==false){
        console.log("game is started");
     started=true;
     levelup();
    }
    
};
function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}
function levelup(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level }`;
    let randIdx =Math.floor(Math.random() *4);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    
    gameSeq.push(randColor)
   
    btnFlash(randBtn);
    
    
}
function checkAns(idx){

if(userSeq[idx]===gameSeq[idx]){
    if(userSeq.length==gameSeq.length){
     setTimeout(levelup,1000); 
     
    }
}else{
    h2.innerHTML=`Game Over!<br>Your score was level <b>${level} </b> <br>Press any key to Play again the Game`
document.querySelector("body").style.backgroundColor="red";
setTimeout(function(){
document.querySelector("body").style.backgroundColor="white";
},200);
}
}
function btnPress(){

let btn=this;
btnFlash(btn);
userColor=btn.getAttribute("id");
userSeq.push(userColor);
checkAns(userSeq.length-1);
}
let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}
function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}
