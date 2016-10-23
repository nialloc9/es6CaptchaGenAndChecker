import axios from 'axios';

class Captcha{
    
    constructor(pathToCreateCheck){
        
        //set path
        this.path = pathToCreateCheck;
        
    }
    
    //create captcha session
    create({name, callback}){
        axios.get(this.path, {
            params:{
                task: 'createCapthcaSession',
                name,
            }
        }).then((response)=>{
            if(callback !== '' && callback !==undefined){
                callback(response);
            }
        }).catch((error)=>{
            console.log(error);
        })
    }
    
    //add capthca image to screen
    add({imgAreaId, inputId, newImgId, newImgClass, pathToImage}){
        
        //cache the DOM
        const imgAId = document.getElementById(imgAreaId);
        const input = document.getElementById(inputId);

        //remove previous html
        while (imgAId.hasChildNodes()) {
            imgAId.removeChild(imgAId.firstChild);
        }
        
        //add image to DOM
        var x = document.createElement("IMG");
            x.setAttribute("src", pathToImage + '?' + Date.now());
            x.setAttribute("class", newImgClass);
            x.setAttribute("width", "50%");
            x.setAttribute("alt", "security code");
            imgAId.appendChild(x);
       
    }
    
    //check user input = captcha image number
    check({name, input, callback}){
        axios.get(this.path, {
            params:{
                task: 'checkCaptchaSession',
                input,
                name,
            }
        }).then((response)=>{
            if(callback !== '' && callback !==undefined){
                callback(response);
            }
            }).catch((error)=>{
                console.log(error);
            });
    }
}

export default Captcha;