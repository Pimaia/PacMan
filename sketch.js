var pac;
var database, position;

function setup(){
    database = firebase.database();

    createCanvas(500,500);
    pac = createSprite(250,250,10,10);
    pac.shapeColor = "red";

    var pacPosition = database.ref("pac/position");
    pacPosition.on("value", readPosition, showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    database.ref("pac/position").set({
        "x": position.x + x,
        "y": position.y + y,
    })
}

function showError(){
    console.log("Ih, deu ruim!");
}

function readPosition(data){
    position = data.val();
    pac.x = position.x;
    pac.y = position.y;
}
