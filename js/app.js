//ALL FILTERS VARIABLES 
const grayscale = document.getElementById('grayscale');
const sepia = document.getElementById('sepia');
const blur = document.getElementById('blur');
const hue = document.getElementById('hue');
const opacity = document.getElementById('opacity');
const saturate = document.getElementById('saturate');
const contrast = document.getElementById('contrast');
const brightness = document.getElementById('brightness');

// UPLOAD VARIABLE

const upload =  document.querySelector('#upload');
//img

const image = document.querySelector('#img');

//BUTTONS 
const download = document.querySelector('#download');
const reset = document.querySelector('#reset');

const downloadLink = document.getElementById('download-link')



//Canvas Variable to download 

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')   



// Window on load without Img

window.onload = function(){
    download.disabled = true ; 
    reset.disabled = true ;  
    downloadLink.disabled = true;
}


//DISPLAY IMAGES 


upload.onclick = function(){
    resetValues()

}

upload.addEventListener('change' , () =>{

    resetValues()
    canvas.style.width = '100%'

    download.disabled = false ; 
    reset.disabled = false ;
    downloadLink.disabled = false;
    
    let fileImg = new FileReader();
    fileImg.readAsDataURL(upload.files[0]);
    fileImg.onload = () =>{
        image.src = fileImg.result
    }
    image.onload = function() {
        canvas.width = image.width ;
        canvas.height = image.height ;
        ctx.drawImage(image, 0 , 0 , canvas.width , canvas.height);
        image.style.display = 'none'
    }

})



// EDITING PHOTOS 

let allFilters = document.querySelectorAll('ul li input');

allFilters.forEach(filter => {
    filter.addEventListener('input' , ()=>{
        ctx.filter = `
        grayscale(${grayscale.value}%)
        sepia(${sepia.value}%)
        blur(${blur.value}px)
        hue-rotate(${hue.value}deg)
        opacity(${opacity.value}%)
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        `
        ctx.drawImage(image, 0 , 0 , canvas.width , canvas.height);
    })

})




// Reset the values 
function resetValues(){
    ctx.filter = 'none' ;
    grayscale.value =  '0'
    sepia.value = '0'
    blur.value =  '0'
    hue.value = '0'
    opacity.value = '100'
    saturate.value = '100'
    contrast.value = '100'
    brightness.value = '100 '

    ctx.drawImage(image, 0 , 0 , canvas.width , canvas.height);
}

// Reset button 


reset.addEventListener('click' , ()=>{
    resetValues()
}) 

//Download The Image 

download.addEventListener('click' , ()=>{
    download.href = canvas.toDataURL()
}) 


