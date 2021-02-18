function setAttributes(el, attrs) {
    for(var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
}

/*
btnInfo= {
    groupId: string,
    barId: string,
    text: string,
    playerInd: number,
    start: number,
    end: number
}
*/
function insertBtn(btnInfo){
    var btnsGroup=document.getElementById(btnInfo.groupId);
    var btnProgress=document.createElement("div");
    var btnBar=document.createElement("div");
    if(btnInfo.playerInd !== undefined){
        setAttributes(btnProgress,{
            "class":"btnProgress",
            "onclick":`playDuration(${btnInfo.playerInd},${btnInfo.start},${btnInfo.end},"${btnInfo.barId}")`});    
    }
    else{
        btnProgress.setAttribute("class","btnProgress");
    }
    setAttributes(btnBar,{
        "class":"btnBar",
        "id":btnInfo.barId});
    var btnLabel=document.createElement("div");
    setAttributes(btnLabel,{"class":"textLabel"});

    var plainText=document.createElement("div");
    setAttributes(plainText,{"class":"plainText"});
    plainText.innerHTML=btnInfo.text;

    btnLabel.appendChild(plainText);
    btnProgress.appendChild(btnBar);
    btnProgress.appendChild(btnLabel);
    btnsGroup.appendChild(btnProgress);
}

function buildBtnGroup(btnList,listInd) {
    btnList.forEach((btn,btnInd) => {
        var groupId=`btnGroup${listInd}`;
        var playerInd=listInd-1;
        var barId=`btnBar${listInd}_${btnInd+1}`;
        btn["groupId"]=groupId;
        btn["barId"]=barId;
        btn["playerInd"]=playerInd;
        insertBtn(btn);
    });
}

function inverseDisplay(blockId){
    var btnsGroup=document.getElementById(blockId);
    if(btnsGroup.style.display === ""){
        btnsGroup.style.display = "block";
        adjustProgressesHeight(btnsGroup);
    }
    else if(btnsGroup.style.display === "none" || btnsGroup.style.display ==="" ){
        btnsGroup.style.display = "block";
    }
    else{
        btnsGroup.style.display = "none";
    }
}

function adjustProgressesHeight(btnsGroup) {
    var btnProgresses=btnsGroup.getElementsByClassName("btnProgress");
    var btnTextLabel,textHeight,textWidth;
    Array.from(btnProgresses).forEach( P => {
        btnTextLabel=P.getElementsByClassName("textLabel")[0];
        textHeight= window.getComputedStyle(btnTextLabel,null).getPropertyValue("height");
        textWidth= window.getComputedStyle(btnTextLabel,null).getPropertyValue("width");

        P.style.minWidth= `${parseInt(textWidth,10)}px`;
        P.style.minHeight=textHeight;
    });
}

var animateCss = document.createElement("link");
setAttributes(animateCss,{"rel":"stylesheet","href":"https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"})
document.head.appendChild(animateCss);

var btnCss = document.createElement("link");
setAttributes(btnCss,{"rel":"stylesheet","href":"/css/btn.css"})
document.head.appendChild(btnCss); 