let canvas = document.querySelector("canvas");//excess to canvas
canvas.width = window.innerWidth;
canvas.height =window.innerHeight;
let pencilColorCont = document.querySelectorAll(".pencil-color");
let pencilWidthElem = document.querySelector(".pencil-width");
let eraserWidthElem = document.querySelector(".eraser-width");
let download = document.querySelector(".download");
let redo = document.querySelector(".redo");
let undo = document.querySelector(".undo");
let penColor = "red";
let eraserColor = "white";
let penWidth = pencilWidthElem.value;
let eraserWidth = eraserWidthElem.value;

let undoRedoTracker = [];//data
let track = 0; //represnt which action from tacker array

let mouseDown = false;
//drawing graphic eka path mai rahega -> API
let tool = canvas.getContext("2d");//api tool to perform the graphic

tool.strokeStyle = penColor;//color of line
tool.lineWidth = penWidth;//width or thickness of line

// tool.beginPath();//new path generate
// tool.moveTo(10, 10)//line ki start point
// tool.lineTo(100, 150);//end point of line
// tool.stroke();//color fill krne ke liye graphic mai

// tool.lineTo(200, 200);//path wahi hai , bs wahi se continue hojayega
// tool.stroke();

//mousedown = start new path, mousemove -> path ko fill krdo(graphics)
canvas.addEventListener("mousedown", (e) => {
    mouseDown = true;
    beginPath({
        x: e.clientX,
        y: e.clientY
    })
})

canvas.addEventListener("mousemove", (e) => {
    if(mouseDown) drawStroke({
      x: e.clientX,
      y: e.clientY ,
      color: eraserFlag ? eraserColor : penColor,
      width: eraserFlag ? eraserWidth : penWidth  
    })
    
})
canvas.addEventListener("mouseup", (e)  => {
    mouseDown = false;

    let url = canvas.toDataURL();
    undoRedoTracker.push(url);
    track = undoRedoTracker.length-1;
})
undo.addEventListener("click", (e) => {
    if (track > 0) track--;
    // track action
    let trackObj ={
        trackValue: track,
        undoRedoTracker
    }
    undoRedoCanvas(trackObj);
})

redo.addEventListener("click", (e) => {
    if(track < undoRedoTracker.length-1) track++;
    // track action
    let trackObj ={
        trackValue: track,
        undoRedoTracker
    }
    undoRedoCanvas(trackObj);
})

function undoRedoCanvas(trackObj) {
    track = trackObj.trackValue;
    undoRedoTracker = trackObj.undoRedoTracker;

    let url = undoRedoTracker[track];
    let img  = new Image(); //new image refrence element
    img.src = url;
    img.onload = (e) => {
        tool.drawImage(img, 0, 0, canvas.width, canvas.height);
    }

}

function beginPath(strokeObj) {
    tool.beginPath();
    tool.moveTo(strokeObj.x, strokeObj.y);
}

function drawStroke(strokeObj) {
    tool.strokeStyle = strokeObj.color;
    tool.lineWidth = strokeObj.width;
    tool.lineTo(strokeObj.x, strokeObj.y);
    tool.stroke();
}

pencilColorCont.forEach((colorElem) => {
    colorElem.addEventListener("click", (e) => {
        let color = colorElem.classList[0];
        penColor = color;
        tool.strokeStyle = penColor;
    })
})

pencilWidthElem.addEventListener("change", (e) => {
    penWidth = pencilWidthElem.value;
    tool.lineWidth= penWidth;

})

eraserWidthElem.addEventListener("change", (e) => {
    eraserWidth = eraserWidthElem.value;
    tool.lineWidth = eraserWidth;
    
})
eraser.addEventListener("click", (e) => {
    if(eraserFlag) {
        tool.strokeStyle = eraserColor;
        tool.lineWidth = eraserWidth;
    }
    else {
        tool.strokeStyle = penColor;
        tool.lineWidth = penWidth;
    }
})
// download the  canvas page
download.addEventListener("click", (e) => {
    let url = canvas.toDataURL();

    let a  = document.createElement("a");
    a.href = url;
    a.download = "board.jpg";
    a.click();
})