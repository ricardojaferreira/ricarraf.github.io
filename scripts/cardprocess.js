'use strict';

/*Card Area*/
let textFields = document.querySelectorAll('.card_area ul >li, .card_area p');
let img = document.querySelector('img');
let cardarea= document.querySelector('.card_area');

/*Drop Area*/
let errorMessage = document.querySelector('form fieldset:nth-child(2) legend');
let dropPhoto = document.querySelector('#drop_photo');
let dropBackground = document.querySelector('#drop_background');
let photoPath = '';
let backgroundPath = '';


/*Inputs Area*/
let formFields = document.querySelector('form');
formFields.reset();
let inputText = document.querySelectorAll('.textinput');
let backgroundSize = document.querySelector('#id_backgroundsize');
let textColor = document.querySelector('#id_textcolor');
let generateJSONbutton = document.querySelector("button[type=button]");
generateJSONbutton.addEventListener('click',generateJSON);

for(let i=0; i<inputText.length; i++){
    inputText[i].addEventListener('input', updatefield);
}

backgroundSize.addEventListener('change', function(){
    cardarea.style.backgroundSize=this.value;
});

textColor.addEventListener('change', function (){
    for(let i=0; i<textFields.length; i++){
        textFields[i].style.color=this.value;
    }
});

/*Output area*/
let cardObj = {
    name: 'name',
    job: 'job',
    company: 'company',
    email: 'email',
    description: 'description',
    photoPath: 'photoPath',
    backgroundPath: 'backgroundPath',
    backgroundSize: 'backgrounSize',
    textColor: 'textColor'
};

let outputJSON = document.querySelector('.JSONoutput')

function generateJSON(){
    let cardIdValue = document.querySelectorAll('input[type=text],input[type=email],select');
    for(let i=0; i<cardIdValue.length;i++){
        cardObj[cardIdValue[i].name]=cardIdValue[i].value;
    }
    cardObj.backgroundPath=backgroundPath;
    cardObj.photoPath=photoPath;
    outputJSON.innerHTML="<PRE>" + JSON.stringify(cardObj,null,'\t') + "</PRE>";
}

function updatefield(event){
    let inputCardText = document.querySelector("."+this.id);
    inputCardText.innerHTML = this.value;
}

function drop_handler(ev, droparea) {
    let mimeTypes = /\.(png|jpe?g)$/i;
    let reader = new FileReader();
    ev.preventDefault();
    let dt = ev.dataTransfer;

    if(dt.files.length<2){
        for (let i=0; i < dt.files.length; i++) {
            if(mimeTypes.test(dt.files[i].name)) {
                reader.readAsDataURL(dt.files[i]);
                if (droparea == 1){
                    reader.addEventListener("load", function () {
                        img.src = reader.result;
                        photoPath = dt.files[i].name;
                        errorMessage.innerHTML = 'Drop Images:';
                        errorMessage.style.color = '#000000';
                    }, false);
                }
                if(droparea == 2){
                    reader.addEventListener("load", function () {
                        cardarea.style.backgroundImage = "url('"+reader.result+"')";
                        cardarea.style.backgroundSize = backgroundSize.value;
                        backgroundPath = dt.files[i].name;
                        errorMessage.innerHTML = 'Drop Images:';
                        errorMessage.style.color = '#000000';
                    }, false);
                }


            }else{
                let errorMessage = document.querySelector('form fieldset:nth-child(2) legend');
                errorMessage.innerHTML = 'Drop Images: Only Images (jpg, png)';
                errorMessage.style.color = '#dc143c';
            }
        }
    }else{
        errorMessage.innerHTML = 'Drop Images: Only one file allowed';
        errorMessage.style.color = '#dc143c';
    }
}

function dragover_handler(ev) {
    ev.preventDefault();
    ev.dataTransfer.effectAllowed='copy';
    ev.dataTransfer.dropEffect='copy';
}

function dragend_handler(ev) {
    ev.dataTransfer.clearData();
}

window.addEventListener("drop", function(e) {
    if (e.target === dropPhoto) {
        drop_handler(e, 1);
        e.target.style.background = "";
    }else if(e.target === dropBackground){
        drop_handler(e, 2);
        e.target.style.background = "";
    }else{
        e.preventDefault();
    }
}, false);

window.addEventListener("dragover", function(e) {
    if (e.target != dropPhoto && e.target != dropBackground) {
        e.preventDefault();
    }else{
        dragover_handler(e);
    }
}, false);

window.addEventListener("dragend", function(e) {
    if (e.target != dropPhoto && e.target != dropBackground) {
        e.preventDefault();
    }else{
        dragend_handler(e);
    }
}, false);

window.addEventListener("dragenter", function(e) {
    if (e.target != dropPhoto && e.target != dropBackground) {
        e.preventDefault();
    }else{
        e.target.style.backgroundImage = "url('images/drag_and_drop.gif')";
    }
}, false);

window.addEventListener("dragleave", function(e) {
    if (e.target != dropPhoto && e.target != dropBackground) {
        e.preventDefault();
    }else{
        e.target.style.background = "";
    }
}, false);