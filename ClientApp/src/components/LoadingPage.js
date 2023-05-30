import './LoadingPage.css' 

const LoadingPage = () => {

    function darkFunction() {
        //Change from light mode to dark mode
      
        //Define variables
        const checkBox = document.getElementById("myCheck");
        const dot = document.getElementById("dot4");
        const body = document.getElementsByTagName("BODY")[0];
        const svg = document.getElementById("svg");
        const label = document.getElementById("switchLabel");
        const label2 = document.getElementById("switchLabel2");
      
        //If user wants dark mode
        if (checkBox.checked == true) {
          dot.style.fill = "#ffffff"; //Dot turns white
          body.style.backgroundColor = "#000000"; //Background turns black
          svg.style.backgroundColor = "#000000"; //svg background turns black
          //The labels turn white
          label.style.color = "#ffffff";
          label2.style.color = "#ffffff";
      
          //If they want light mode/default
        } else {
          dot.style.fill = "#000000"; //Dot is black
          body.style.backgroundColor = "#ffffff"; //Background is white
          svg.style.backgroundColor = "#ffffff"; //svg background is white
          //Labels are white
          label.style.color = "#000000";
          label2.style.color = "#000000";
        }
      }
      function movementFunction() {
        //Change the way the dots move from circular to linear
      
        //Define variables
        const checkBox = document.getElementById("myCheck2");
        const dot1 = document.getElementById("dot1");
        const dot2 = document.getElementById("dot2");
        const dot3 = document.getElementById("dot3");
        const dot4 = document.getElementById("dot4");
        const body = document.getElementsByTagName("BODY")[0];
        const svg = document.getElementById("svg");
        const label = document.getElementById("switchLabel");
        const label2 = document.getElementById("switchLabel2");
      
        //If user wants linear
        if (checkBox.checked == true) {
          //Change each dots x and y values and their animation
          dot1.style.cy = 150;
          dot1.style.cx = 40;
          dot1.style.animation = "moveup 2s ease infinite alternate";
          dot2.style.cy = 150;
          dot2.style.cx = 80;
          dot2.style.animation = "moveup 2s ease 0.5s infinite alternate";
          dot3.style.cy = 150;
          dot3.style.cx = 120;
          dot3.style.animation = "moveup 2s ease 1s infinite alternate";
          dot4.style.cy = 150;
          dot4.style.cx = 160;
          dot4.style.animation = "moveup 2s ease 1.5s infinite alternate";
          svg.style.animation = "none"; //Turn off svg spinning animation
          svg.style.borderRadius = "0%"; //Make the svg back into a square
      
          //Spinning animation/default
        } else {
          //Set each dot to center of a quadrant of the square and reset their animations
          dot1.style.cy = 50;
          dot1.style.cx = 50;
          dot2.style.cy = 50;
          dot2.style.cx = 150;
          dot3.style.cy = 150;
          dot3.style.cx = 50;
          dot4.style.cy = 150;
          dot4.style.cx = 150;
          dot1.style.animation = "movein 5s ease infinite alternate";
          dot2.style.animation = "movein 5s ease infinite alternate";
          dot3.style.animation = "movein 5s ease infinite alternate";
          dot4.style.animation = "movein 5s ease infinite alternate";
          svg.style.animation = "spin 5s ease infinite alternate"; //Reset svg spin animation
          svg.style.borderRadius = "50%"; //Make svg a circle again
        }
      }
      

    return (
        <>
            <div id="loading-wrapper">
            <div id="loading-text">LOADING</div>
            <div id="loading-content"></div>
            </div>
        </>
    )
}

export default LoadingPage;