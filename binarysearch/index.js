
const getId = (id)=>{
    return  document.getElementById(id)
}

const handleSubmit = (e) =>{
    e.preventDefault();
    let arr =getId("array").value.trim().split(" ").map(Number);
    let k = +document.getElementById("value").value;
    makeArray(arr,arr.length, k)
}

document.getElementById("form").addEventListener("submit", handleSubmit);

const container =getId("container");
const makeArray = (arr, n , k)=>{
    container.innerHTML = ""
     arr.forEach((el, i)=>{
         let div = document.createElement("div");
         div.class= "arrayDiv"
         div.title = `i:${i}`;
         div.innerHTML=el;
         div.id=i;
         container.append(div)
     })
     setTimeout(() => {
        if(k>arr[n-1]){
            getId("currentState").classList.add("red")
            getId("currentState").innerText = "target is bigger than all elements or array is not sorted"
              }
       else if(k<arr[0]){
            getId("currentState").classList.add("red")
            getId("currentState").innerText = "target is smaller than all elements or array is not sorted"
        }
        else{
            binarySearch(arr, n , k, 0, n-1);
            getId("currentState").innerText = "Iterating...."
            define(); 
        }
     
     }, 100);
    
}


function binarySearch(arr,n, k, low, high){
 
    if(low>high){
        getId("currentState").classList.add("red")
        getId("currentState").innerText = "target not found or array is not sorted"
        return
    }
      let mid = low + Math.floor((high-low)/2);
      addPrevClasses(mid, low, high)
      setTimeout(() => {
        if(arr[mid]==k){
            removePrevClasses(mid, low, high)
           getId(mid).classList.add("target1");
           getId("currentState").classList.add("green")
           getId("currentState").innerText = `Target found at ${mid} index`
        }
        else if(arr[mid]>k){
            removePrevClasses(mid, low, high)
            binarySearch(arr,n, k, low, mid-1)
        }
        else{
            removePrevClasses(mid, low, high)
            binarySearch(arr,n, k, mid+1, high)
        }
      }, 1000);      
}
const array = ["low", "high", "mid", "target"]
let defineDiv =getId("define")
const define  = () =>{
    defineDiv.innerHTML=""
    array.forEach(el=>{
        let parentDiv = document.createElement("div");
        let desc = document.createElement("p");
        desc.innerHTML = el;
        desc.className = el;
        let color = document.createElement("div");
        color.className= `${el}Div`;
        color.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
        parentDiv.append(desc, color);
        defineDiv.appendChild(parentDiv);
    })
}

const addPrevClasses = (mid, low, high) =>{
    getId(mid).classList.add("mid");
    getId(low).classList.add("low");
    getId(high).classList.add("high");
}

const removePrevClasses = (mid, low, high) =>{
     getId(mid).classList.remove("mid");
     getId(low).classList.remove("low");
     getId(high).classList.remove("high");

}
