import Captcha from './controllers/Captcha';

const cap = new Captcha('php/http/createCheckCaptchaSession.php');

cap.create({name: 'captcha', callback: createCallback});
cap.add({imgAreaId: 'captchaImageArea', newImgId: 'myNewCaptchaImage', newImgClass: 'captchaImageClass', pathToImage: 'php/captchaImage/createImage.captchaImage.php'});

document.getElementById('newBtn').onclick = ()=>{
    cap.create({name: 'captcha', callback: createCallback});
    cap.add({imgAreaId: 'captchaImageArea', newImgId: 'myNewCaptchaImage', newImgClass: 'captchaImageClass', pathToImage: 'php/captchaImage/createImage.captchaImage.php'});
    document.getElementById('userInput').value = '';
};

document.getElementById('checkBtn').onclick = ()=>{ 
    const userIn = document.getElementById('userInput').value;
    cap.check({name: 'captcha', input: userIn, callback: checkCallback});
};

//CREATE CAPTCHA CALLBACK FUNCTION
function createCallback(data){ //result > 0 if captcha created successfully

    //DO SOME AWESOME STUFF HERE LIKE GENERATING A CSRF TOKEN.. csrfGeneratorChecker available here: https://github.com/nialloc9/csrfProtection
    
    //data booleon check
    if(data['data'] > 0){
        document.getElementById('info').innerHTML = 'Type the number you see above.';
    }
}


//CHECK CAPTCHA CALLBACK FUNCTION
function checkCallback(data){ //result > 0 user input is correct
    //DO SOME AWESOME STUFF HERE LIKE CHECKING ALL INPUTS ARE FILLED IN... inputChecker available here: https://github.com/nialloc9/inputChecker

    const info = document.getElementById('info');;
    //data booleon check
    if(data['data'] > 0){
        info.innerHTML = 'Its a match!..';
    }else{
        info.innerHTML = 'Please write the correct number.';
    }
}