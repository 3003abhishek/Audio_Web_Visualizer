console.log("Junnu");
let inputFile = document.querySelector("input");
let audio = document.querySelector("audio");
let canvas = document.querySelector("canvas") ;
const context = canvas.getContext('2d') ;
inputFile.addEventListener("change", handleInputChange);


function handleInputChange() {  
    console.log(inputFile.files);
    // audio.setAttribute("src",inputFile.files.type).play();
    let file = inputFile.files[0];
    if(file){
        let fileUrl = URL.createObjectURL(file); 
        audio.setAttribute("src",fileUrl);
        audio.play();

//   1. create audioContext 
//   2. create audio source  
//   3 . create audio effects 
//   4 . create audio destination 

  const audioContext = new AudioContext();

  // sorceNode
  const audioSource = audioContext.createMediaElementSource(audio);

  // analyzer node 
  const audioAnalyzer = audioContext.createAnalyser();

  audioSource.connect(audioAnalyzer);

  // destination 
  audioAnalyzer.connect(audioContext.destination);

  audioAnalyzer.fftSize = 512 ; 

  const bufferDataLength = audioAnalyzer.frequencyBinCount; 

  const bufferDataArray = new Uint8Array(bufferDataLength);

  const barWidth = canvas.width/bufferDataLength ; 
  

  function DrawAnimationSoundbar() {
     let x = 0 ; 
      context.clearRect(0,0,canvas.width, canvas.height) ; 
      audioAnalyzer.getByteFrequencyData(bufferDataArray) ;



      bufferDataArray.forEach((data)=>{
        const barHeight = data; 
        context.fillStyle = "red" ; 
        context.fillRect(x,canvas.height- barHeight , barWidth, barHeight) ; 
        x += barWidth ; 
      });
      if(!audio.ended) requestAnimationFrame(DrawAnimationSoundbar);    

     
  }

  DrawAnimationSoundbar(); 





        
    }
    else{
        console.log("Something went wrong");
    }

    

}



//