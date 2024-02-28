const drop = document.getElementById('mailRno')
    document.querySelector('.mail').style.display='block';

    drop.addEventListener('change', ()=>{
        if(drop.value == 1){
            document.querySelector('.mail').style.display='block';
            document.querySelector('.number').style.display='none';
        }
        else if(drop.value == 2){            
            document.querySelector('.number').style.display='block';
            document.querySelector('.mail').style.display='none';
        }
    })