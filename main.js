song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist = 0;
scorerightWrist = 0;

function preload()
{
song = loadSound("music.mp3");
}

function play()
{
song.play();
song.setVolume(1);
song.rate(1);
}

function setup()
{
   canvas = createCanvas(400, 400);
   background("white"); 
   canvas.center();

   video = createCapture(VIDEO);
   video.hide();

   poseNet = ml5.poseNet(video, modelLoaded);
   poseNet.on("pose", gotPoses);
}

function modelLoaded(){
console.log('poseNet is intialized');   
}

function draw()
{
image(video, 0, 0, 400, 400);

fill("#000000");
stroke("#000000");

if(scorerightWrist > 0.2){
 circle(rightWristX, rightWristY, 20);

if(rightWristY > 0 && rightWristY <= 100)
{
   document.getElementById("danger_speed").innerHTML = "Speed = 0.5x";
   song.rate(0.5);
}

else if (rightWristY > 100 && rightWristY <= 200)
{
   document.getElementById("danger_speed").innerHTML = "Speed = 1x";
   song.rate(1);
}

else if (rightWristY > 200 && rightWristY <= 300)
{
   document.getElementById("danger_speed").innerHTML = "Speed = 1.5x";
   song.rate(1.5);
}

else if (rightWristY > 300 && rightWristY <= 400)
{
   document.getElementById("danger_speed").innerHTML = "Speed = 2x";
   song.rate(2);
}

else if (rightWristY > 400 && rightWristY <= 500)
{
   document.getElementById("danger_speed").innerHTML = "Speed = 2.5x";
   song.rate(2.5);
}
}

if(scoreleftWrist > 0.2)
{
circle(leftWristX, leftWristY, 20);
In_No_leftWristY = Number(leftWristY);
remove_decimals = floor(In_No_leftWristY);
volume = remove_decimals/500;
document.getElementById("danger_volume").innerHTML = "Volume = " + volume;
song.setVolume(volume);
}
}

function gotPoses(results){
   if(results.length > 0) 
   {
console.log(results);
scorerighttWrist = results[0].pose.keypoints[10].score;
scoreleftWrist = results[0].pose.keypoints[9].score;
console.log("scoreleftWrist = " + scoreleftWrist, "scorerightWrist = " + scorerightWrist);

leftWristX = results[0].pose.leftWrist.x;
leftWristY = results[0].pose.leftWrist.y;
console.log(" leftWristX =" + leftWristX  + " leftWristY = " + leftWristY);

rightWristX = results[0].pose.rightWrist.x;
rightWristY = results[0].pose.rightWrist.y;
console.log(" rightWristX =" + rightWristX  + " rightWristY = " + rightWristY);

   }
}