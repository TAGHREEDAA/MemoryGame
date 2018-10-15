let score = 0, remaining = 16, oldImage=null, newImage = null;

document.getElementById('score').innerHTML = score;
document.getElementById('remaining-clicks').innerHTML = remaining;

var overlays = document.getElementsByClassName('overlay');
for (const overlay of overlays) {
    overlay.addEventListener('click',clickImg);    
}
function clickImg(e){
    if(remaining > 0){
        const imageContainer = e.target.closest('.img-container');
        const img = imageContainer.getElementsByTagName('img')[0];

        toggleImageView(imageContainer);
        decreaseRemaining();
    
    if(newImage === null) // the second image
    {
        if( oldImage === null)// 1- put the image in old image and do nothing
        {
            oldImage = img;
        }
        else // 2nd click
        {
            newImage = img;
            // put the image in new image
            if(oldImage.src === newImage.src)
            {
                increaseScore();
            }
            else{
                console.log('elsse');
                
                // toggle the 2 images old and new 
                console.log("img.parentElement");
                console.log(img.parentElement);
                console.log(imageContainer);
                toggleImageView(imageContainer);
                toggleImageView(oldImage.parentElement);
                oldImage=newImage=null;
                
                
            }
        }
        
    }
    else{ // the first clicked image
        oldImage = img.src ; //https://www.w3schools.com/howto/img_avatar.png
    }


    
    
    // .img-container.active 
    // .fa-user.active

    
    }
    else
    {
        alert("You don't have enough moves");
        
        document.getElementById('game-area').classList.add('failed');
    }
}

function toggleImageView(imageContainer){
    imageContainer.classList.toggle('active');
    imageContainer.getElementsByTagName('i')[0].classList.toggle('active');
}



function increaseScore(){
    score++;
    document.getElementById('score').innerText = score;
}


function decreaseRemaining(){
    remaining--;
    document.getElementById('remaining-clicks').innerText = remaining;
    
}

let request = new XMLHttpRequest();
request.addEventListener("load", function(){
    if(request.status === 200 && request.readyState === 4){
        renderImages(request.responseText);
    }
});
request.open('GET','imgsData.json');
request.send();



/* <div class="img-container active">
                <img src="https://www.w3schools.com/howto/img_avatar.png" class="image" data-no="">
                <div class="overlay">
                    <a href="#" class="icon" title="Card">
                        <i class="fa fa-user"></i>
                    </a>
                </div>
            </div>
             */
function renderImages(imgsJson){
    let imgsArr = JSON.parse(imgsJson);
    
    for (const [i, img] of imgsArr.entries()) {

        let imgContainer = document.createElement('div');
        imgContainer.classList.add('img-container','active');
        
        let imgElement=document.createElement('img');
        imgElement.classList.add('image');
        imgElement.alt = "Card Image"; 
        //we will add imageElement URL and data no from for loop
    
        let overlayElement= document.createElement('div');
        overlayElement.classList.add('overlay');
        overlayElement.addEventListener('click',clickImg);    


        let a= document.createElement('a');
        a.href="#";
        a.classList.add('icon');
        a.title="Card";
    
        let i = document.createElement('i');
        i.classList.add('fa','fa-user');
    
        a.appendChild(i);
        overlayElement.appendChild(a);

        // console.log(img.URL);
        imgElement.src = img.URL;
        imgElement.setAttribute('data-no', i);


        imgContainer.appendChild(imgElement);
        imgContainer.appendChild(overlayElement);
        // console.log(imgContainer);
        
        document.getElementById('game-area').append(imgContainer);
    }

    
}