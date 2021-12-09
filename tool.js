let toolsCont = document.querySelector(".tools-cont"); 
let optionsCont = document.querySelector(".options-cont");
let optionsFlag = true;
let pencilToolCont = document.querySelector(".pencil-tool-cont");
let eraserToolCont = document.querySelector(".eraser-tool-cont");
let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");
let sticky = document.querySelector(".stickynote");
let upload = document.querySelector(".upload");
let pencilFlag = false;//togle krne pr bnd rahe jb pencil pr click kre tabhi khule
let eraserFlag = false;

/*isme hm de rahe ki hme jb bhi addEventListener pr click krenge to hme eak activity perform krni hai 
ki jb bhi hm barr pr click kre to hme options dede*/

//true -> show tools , false -> hide tools
optionsCont.addEventListener("click", (e) => {
    optionsFlag = !optionsFlag;
    if(optionsFlag) openTools();
    
    else closeTools();
    
})

function openTools()
{   
    let iconElem = optionsCont.children[0];
    iconElem.classList.remove("fa-times");
    iconElem.classList.add("fa-bars");
    toolsCont.style.display = "flex"; //open krne ke liye tools bar ko

}
function closeTools()
{
    let iconElem = optionsCont.children[0];
    iconElem.classList.add("fa-times");
    iconElem.classList.remove("fa-bars");
    toolsCont.style.display = "none";

    penciToolCont.style.display = "none"; //close krna hai unhe jb fas-bar pr clickkre
    eraserToolCont.style.display = "none";
}

pencil.addEventListener("click", (e) =>
{
   //true -> show pencil tool, false -> hide pencil tool
   pencilFlag = !pencilFlag
   if(pencilFlag) pencilToolCont.style.display = "block";
   else pencilToolCont.style.display = "none"; 
})
  
eraser.addEventListener("click", (e) => {
    //true -> show eraser tool, false -> hide eraser tool
    eraserFlag = !eraserFlag;
    if(eraserFlag) eraserToolCont.style.display = "block";
    else eraserToolCont.style.display = "none";
})

/*upload krne ka kam */
upload.addEventListener("click", (e) => {
//sbse pehle file explorer ko kholna hai
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.addEventListener("change", (e) => {
        let file = input.files[0]; //array ke form mai hogyi file to zero index lene se pehli file ajayegi
        let url = URL.createObjectURL(file);
        
        let stickyTemplateHTML = `
        <div class="header-cont">
             <input  class = "heading" type="text" placeholder="Heading">
            <div class="minimize"></div>
            <div class="remove"></div>
       
        </div>
        <div class="note-cont">
            <img src="$(url)"/>
        </div>
        `;
        createSticky(stickyTemplateHTML);
    })
    
})



  /*stickynote ka kam yaha hua hai */
sticky.addEventListener("click", (e) => {
    let stickyTemplateHTML = `
    <div class="header-cont">
         <input  class = "heading" type="text" placeholder="Heading">
        <div class="minimize"></div>
        <div class="remove"></div>
       
    </div>
    <div class="note-cont">
        <textarea spellcheck="false"></textarea>
    </div>
    `;

    createSticky(stickyTemplateHTML);
})

//CODE BAAR BAAR REPEAT NA KRNA PADHE
function createSticky(stickyTemplateHTML) {
    let stickyCont = document.createElement("div");
    stickyCont.setAttribute("class", "sticky-cont");
     stickyCont.innerHTML = stickyTemplateHTML;
    document.body.appendChild(stickyCont);

    let minimize = stickyCont.querySelector(".minimize");
    let remove = stickyCont.querySelector(".remove");
    noteActions(minimize, remove, stickyCont);

    stickyCont.onmousedown = function(event) {

        dragAndDrop(stickyCont, event);
      
      };
      
      stickyCont.ondragstart = function() {
        return false;
      };
}

function noteActions(minimize, remove, stickyCont)
{
    remove.addEventListener("click", (e) =>{
        stickyCont.remove();
    })
    minimize.addEventListener("click", (e) => {
        //kisyi style ko read krne ke liye getComputedStyle use krenge
        let noteCont = stickyCont.querySelector(".note-cont");
        let display = getComputedStyle(noteCont).getPropertyValue("display");
        if(display === "none") noteCont.style.display = "block"; //agr display none hai to hide or block krdo nhi to none
        else noteCont.style.display = "none"
    })
}
function dragAndDrop(element , event)
{
    let shiftX = event.clientX -element.getBoundingClientRect().left;
        let shiftY = event.clientY -element.getBoundingClientRect().top;
      
        element.style.position = 'absolute';
        element.style.zIndex = 1000;
        
      
        moveAt(event.pageX, event.pageY);
      
        // moves the ball at (pageX, pageY) coordinates
        // taking initial shifts into account
        function moveAt(pageX, pageY) {
            element.style.left = pageX - shiftX + 'px';
            element.style.top = pageY - shiftY + 'px';
        }
      
        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
        }
      
        // move the ball on mousemove
        document.addEventListener('mousemove', onMouseMove);
      
        // drop the ball, remove unneeded handlers
        element.onmouseup = function() {
          document.removeEventListener('mousemove', onMouseMove);
          element.onmouseup = null;
        };
}