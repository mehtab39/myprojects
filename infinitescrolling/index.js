var counter = 0;
var container=  document.getElementById("container");
var body = document.querySelector('.body')

const addData = ()=>{
     console.log('container:', container)
     for(let i=0;i<25;i++){
         counter++;
         let div =  document.createElement("div");
         if(counter%20==0){
            div.innerHTML = `Infinite Scrolling using Throttling`;
            div.classList.add("scrollmsg")
         }  
         else div.innerHTML = `This is for javascript skills. Scroll  Number ${counter}`;
         container.appendChild(div)
     }
}
addData();


body.addEventListener('scroll',()=>{
 const {scrollHeight,scrollTop,clientHeight} = body;
 if(scrollTop + clientHeight > scrollHeight - 5){
   document.getElementById("msg").innerHTML="wait for more content!!!"
   setTimeout(()=>{
      addData();
       document.getElementById("msg").innerHTML= "";
   }
 ,1000);
 }
});

