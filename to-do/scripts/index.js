
var fm = document.querySelector("form");
fm.addEventListener("submit", create);
var tb = document.querySelector("table");


function task(input){
  this.name=input;
  this.date= new Date()
  // .getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear();
  this.status= "false";
}
var count=0;

function create(e){
  count++;
  e.preventDefault(); 
  var taskname= document.getElementById("taskname").value;
  var x = new task(taskname);
  createRow(x);
  document.getElementById("count").value= count;
  document.getElementById("taskname").value = "";
}
function createRow(x) {
          var row = document.createElement("tr");
          var td1 = document.createElement('td');
          td1.textContent = x.name;
          var td2 = document.createElement('td');
          td2.textContent = x.date;
          var td3 = document.createElement('td');
          td3.textContent = x.status;
          td3.addEventListener("click", toggle);
          var td4 = document.createElement("td");
          td4.textContent = "Mark";
          td4.addEventListener("click", markComplete);
          var td5 = document.createElement("td");
          td5.textContent = "Delete";
          td5.addEventListener("click", makeDelete);

          row.append(td1, td2, td3, td4, td5);

          tb.appendChild(row);
      }

      
      function markComplete(e) {
          e.target.textContent = "Done";
          e.target.removeEventListener("click", markComplete);
          e.target.parentNode.style.backgroundColor = "green";
          e.target.parentNode.style.textDecoration = "line-through";
      }

      function makeDelete(e) {
          count--;
          document.getElementById("count").value= count;
          e.target.parentNode.remove();
      }
      function toggle(e){
          if(e.target.textContent=="false"){
              e.target.textContent="true";
          }
          else{
              e.target.textContent="false";
          }
      }




