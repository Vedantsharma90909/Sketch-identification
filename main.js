function setup(){
    canvas = createCanvas(280 ,280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas)
    synth = window.speechSynthesis;
}

function clearCanvas(){
    background("white");
}
function preload(){
    classifier = ml5.imageClassifier("DoodleNet");
}
function draw(){
     stroke(0);
     strokeWeight(13);
     if (mouseIsPressed){
         line(pmouseX,pmouseY,mouseX,mouseY);
     }
}

function classifyCanvas(){
  classifier.classify(canvas,gotResult);
}

function gotResult(error,results){
       if (error){
           console.log(error);
       }
       else{
           console.log(results);
           document.getElementById("label").innerHTML = "lable: "+ results[0].label;
           document.getElementById("Confidence").innerHTML = "Confidence: " + Math.round(results[0].confidence*100)+"%";
           utterthis = new SpeechSynthesisUtterance(results[0].label);
           synth.speak(utterthis);
       }
}

