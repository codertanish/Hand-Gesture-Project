Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach(camera);

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = "<img id='captured_image' src='" + data_uri + "'>";
    });
}

console.log('ml5 Version: ', ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/_1LLx4lwO/model.json", modelLoaded);

function modelLoaded() {
    console.log('Model Loaded');
}

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);

}

function gotResult(error, results) {
    if(error) {
        console.error(error);
    }

    else{
        console.log(results);
        document.getElementById("result_hand_gesture_meaning").innerHTML = results[0].label;
        document.getElementById("result_hand_gesture_confidence").innerHTML = results[0].confidence;
        prediction_1 = results[0].label
        speak();

        if(results[0].label == "Good") {
            document.getElementById("result_hand_gesture_icon").innerHTML = "&#128077;&#127995;";
        }

        else if(results[0].label == "Ok") {
            document.getElementById("result_hand_gesture_icon").innerHTML = "<img src='https://th.bing.com/th/id/R.19b2c23972621864ab516bcf05e35838?rik=u0TNu6QT351hmA&riu=http%3a%2f%2fclipart-library.com%2fimages%2f6Troz497c.png&ehk=BD15Zf0l%2f7ivknGCslxnf1KmZu4KpFlUCoKgyln3MWM%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1' height='30px' width='37.5px'></img>";
        }

        else if(results[0].label == "Bad") {
            document.getElementById("result_hand_gesture_icon").innerHTML = "&#128078;&#127995;";
        }

        else if(results[0].label == "I Agree") {
            document.getElementById("result_hand_gesture_icon").innerHTML = "&#129311;&#127995;"; 
        }

        else if(results[0].label == "Victory") {
            document.getElementById("result_hand_gesture_icon").innerHTML = "&#9996;&#127995;"; 
        }  
    }

}

function speak() {
    var synth = window.speechSynthesis;
    speak_data = "This hand gesture means" + prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

