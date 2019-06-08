//------------------------------
//         DRAWING
//------------------------------
//much easier to build out th efront end with mock data, then fill it correct data//later

//player.locX = Math.floor(500*Math.random() + 10);
//player.locY = Math.floor(500*Math.random() + 10);
//this function will be recursively drawn(just like in tank game)
function draw(){
  //reset translation back to default
  context.setTransform(1,0,0,1,0,0)
  //this tells the screen, i want to start at 0,0
  //and I want to draw a rectangle down to canvasl/r
  //clears screen so bg new each time
  context.clearRect(0,0,canvas.width,canvas.height)
  //make camera follow player
  const camX = -player.locX + canvas.width/2
  const camY = -player.locY + canvas.width/2
    //translate allows us to move the canvas around (cumulative)
    context.translate(camX,camY)
 //draw the players
  players.forEach((p)=>{
    //context is a 2D thing to draw on the canvas.
    context.beginPath()
    //context.fillStyle = p.color
    context.fillStyle = p.color
    //arc is used to create circles or parts of circles
    //x,y,radius,startingangle
    //context.arc(p.locX,pr.locY,10,0,Math.PI*2)
    //Notice that in the original implementation, the radius is hard coded
    context.arc(p.locX,p.locY,p.radius,0,Math.PI*2)
    //reference circle
    //context.arc(200,200,10,0,Math.PI*2)
    context.fill()
    context.lineWidth = 3;
    //this is the border color of the player
    context.strokeStyle = 'rgb(0,255,0)'
    context.stroke()
  
  })

  //draw all the orbs
  orbs.forEach((orb)=>{
      context.beginPath()   
      context.fillStyle = orb.color
      context.arc(orb.locX,orb.locY,orb.radius,0,Math.PI*2)
      context.fill()
  })

  requestAnimationFrame(draw)
}

canvas.addEventListener('mousemove',(event)=>{
    //console.log(event)
    const mousePosition = {
        x: event.clientX,
        y: event.clientY
    };
    const angleDeg = Math.atan2(mousePosition.y - (canvas.height/2), mousePosition.x - (canvas.width/2)) * 180 / Math.PI;
    if(angleDeg >= 0 && angleDeg < 90){
        xVector = 1 - (angleDeg/90);
        yVector = -(angleDeg/90);
    }else if(angleDeg >= 90 && angleDeg <= 180){
        xVector = -(angleDeg-90)/90;
        yVector = -(1 - ((angleDeg-90)/90));
    }else if(angleDeg >= -180 && angleDeg < -90){
        xVector = (angleDeg+90)/90;
        yVector = (1 + ((angleDeg+90)/90));
    }else if(angleDeg < 0 && angleDeg >= -90){
        xVector = (angleDeg+90)/90;
        yVector = (1 - ((angleDeg+90)/90));
    }

    player.xVector = xVector;
    player.yVector = yVector;

}) 
