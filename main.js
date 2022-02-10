img = "";
status = "";
objects = [];

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(640, 420);
    video.hide();
    
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("Status").innerHTML = "Status: Detecting Objects"
}

function modelLoaded(){
    console.log("Model Is Loaded");
    status = true;
}

function gotResult(error, results ) 
{
    if (error){
        console.log(error);

        objects = results;
    }
    else {
        console.log(results);
    }
}

function preload() {
    img = loadImage("dog_cat.jpg");
}

function draw() {
    image(video, 0, 0, 640, 420);
    
    if ( status != ""){
        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(video, gotResult);
        for ( var i = 0; i < objects.length; i++) {

            document.getElementById("Status").innerHTML = "Status: Object Detected";
            document.getElementById("Number_Of_Objects").innerHTML = "Number Of Objects Detected:" + objects.lenght;

            fill(r, g, b);
            percent = floor(objects[i].confidence * 100); 
            text(objects[i].label + "" + percent + "%" + objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }
    }
}