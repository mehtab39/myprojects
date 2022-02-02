function getId(id){
    return document.getElementById(id)
}

let calculator = getId("calculatorBody")
let btnArr = ["%", "CE", "C", "Del", "1/x", "sq", "2root", "/", 7,8,9,"*",4,5,6,"-", 1,2,3,"+", "%", 0, ".", "="];

const makeCalcular  = ()=>{
       let input = document.createElement("input");
       input.setAttribute("id", "input")
       let btnParent = document.createElement("div");
       btnParent.setAttribute("class", "btns")
       btnArr.forEach((el)=>{
             let button = document.createElement("button");
             el.id = el;
             el.class = "mybtn";
             button.innerHTML = el;
             btnParent.appendChild(button)
       })
       calculator.append(input, btnParent)
}
makeCalcular();


 
  function addFunctionalty(){
        let allBtns = document.querySelector(".btns").childNodes;
        allBtns.forEach((el)=>{
            el.addEventListener("click", ()=>{
                let x = getId("input").value;
                getId("input").value = x + el.innerHTML;
            })
    }
}
      
  addFunctionalty()


