var prediction_1="";
var prediction_2="";
Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});
var camera=document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot() {
    Webcam.snap(function(data_uri)  {
       document.getElementById("result").innerHTML="<img id='capture_image' src='"+  data_uri+"'>";
    });
}
console.log("ml5 version is ",ml5.version);
var classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/dPjppGM8c/model.json",modelLoaded);
function modelLoaded(){
    console.log("model loaded");

}
function speak(){
    var synth=window.speechSynthesis;
    var speak_data1="the first prediction is: "+prediction_1;
    var speak_data2="the second prediction is: "+prediction_2;
    var utterThis=new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utterThis);

}
function check(){
    var img=document.getElementById("capture_image");
    classifier.classify(img,gotResult);
}
function gotResult(error,results){
if(error){
    console.error(error);
}
else{
    console.log(results);
    document.getElementById("result_name_1").innerHTML=results[0].label;
    document.getElementById("result_name_2").innerHTML=results[1].label;
    prediction_1=results[0].label;
    prediction_2=results[1].label;
    speak();
    if(results[0].label=="Happy"){
        document.getElementById("result_emoji_1").innerHTML="&#128522";
        
    }
    if(results[0].label=="Sad"){
        document.getElementById("result_emoji_1").innerHTML="&#128532";
        
    }
    if(results[0].label=="Angry"){
        document.getElementById("result_emoji_1").innerHTML="&#128548";
        
    }
    if(results[0].label=="Crying"){
        document.getElementById("result_emoji_1").innerHTML="&#128546";
        
    }
    if(results[1].label=="Happy"){
        document.getElementById("result_emoji_2").innerHTML="&#128522";
        
    }
    if(results[1].label=="Sad"){
        document.getElementById("result_emoji_2").innerHTML="&#128532";
        
    }
    if(results[1].label=="Angry"){
        document.getElementById("result_emoji_2").innerHTML="&#128548";
        
    }
    if(results[1].label=="Crying"){
        document.getElementById("result_emoji_2").innerHTML="&#128546";
        
    }
}
}