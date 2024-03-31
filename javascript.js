let key = false;
let room;
let item;
let newspaper = false;
let newspaperfireplace = false;
let fire = false;
let plant=false;
let fertilizer= false;
let morning=true;
let TV = false;
let trashflag = false;
let stool = 1;
let bottle = false;
let sinkflag = false;
let leaveroom = false;
let cuttingboard = false;
let fridgeflag = 0;
let cuttingboardfridge = false;
let draggedItem = "none";
let stoolmoved = false;
let bedbomb = false;
let explode = false;
let trashkey = false;
let stooldoor = false;
let dooropen = false;


function begin(){
    document.getElementById("startbutton").style.display = "none";
    document.getElementById("game").style.display = "block";
    document.getElementById("inventory").style.display = "flex";
    document.getElementById("text").innerHTML = "It is morning.";
    document.getElementById("textBox").style.height = "50px";
}

function roomSelect(x){
    room = x;
    switch(room){
        case 1:
            document.getElementById("room1").style.display = "block";
            document.getElementById("room2").style.display = "none";
            document.getElementById("room3").style.display = "none";
            if(sinkflag){
                leaveroom = true;
            }
            if(bedbomb){
                clearInterval(timerInterval);
                document.getElementById("text").innerHTML = "BOOM! You hear an explosion in the other room.";
                explode = true;
                document.getElementById("room2img").src = "images/room2explode.png";
            }
            break;
        case 2:
            document.getElementById("room1").style.display = "none";
            document.getElementById("room2").style.display = "block";
            document.getElementById("room3").style.display = "none";
            if(explode ){
                document.getElementById("text").innerHTML = "There is now a hole in the window. You can now escape!";
                document.getElementById("room2map").innerHTML = '<area shape="poly" coords="645,200,965,200,965,450,645,450" alt="room1" onclick="bombescape()">';
            }
            break;
        case 3:
            document.getElementById("room1").style.display = "none";
            document.getElementById("room2").style.display = "none";
            document.getElementById("room3").style.display = "block";
            if(leaveroom){
                document.getElementById("filledsink").style.display = "block";
            }
            if(cuttingboardfridge && !morning && stool<=3){
                if(trashflag && bottle){
                    document.getElementById("room3img").src = "images/room3morningtrashbottle.png";
                }
                else if(trashflag && !bottle){
                    document.getElementById("room3img").src = "images/room3morningtrash.png";
                }
                else{
                    document.getElementById("room3img").src = "images/room3morning.png";
                }
                document.getElementById("cuttingboardonfridge").style.display = "none";
                document.getElementById("text").innerHTML = "My owners took out the stool to get the cutting board.";
                document.getElementById("room3map").innerHTML += '<area shape="poly" coords="1075,520,1175,520,1185,585,1065,585" alt="stool" onclick="stoolmove()"></area>';
            }
            break;
    }

}

function addToInventory(x){
    switch(x){
        case "newspaper":
            document.getElementById("inventory").innerHTML += '<img id="newspaper" src="images/newspaper.png" alt="newspaper" draggable="true" ondragstart="drag(event,&quot;newspaper&quot;);">'
        break;
        case "fertilizer":
            document.getElementById("inventory").innerHTML += '<img id="fertilizer" src="images/fertilizer.png" alt="fertilizer" draggable="true" ondragstart="drag(event,&quot;fertilizer&quot;);" ondrop="combine(event,&quot;fertilizer&quot;)" ondragover="allowDrop(event)">'
        break;
        case "bottle":
            document.getElementById("inventory").innerHTML += '<img id="bottle" src="images/bottle.png" alt="bottle" draggable="true" ondragstart="drag(event,&quot;bottle&quot;);" ondrop="combine(event,&quot;bottle&quot;)" ondragover="allowDrop(event)">'
        break;
        case "cuttingboard":
            document.getElementById("inventory").innerHTML += '<img id="cuttingboard" src="images/cuttingboard.png" alt="cuttingboard" draggable="true" ondragstart="drag(event,&quot;cuttingboard&quot;);">'
        break;
        case "key":
            document.getElementById("inventory").innerHTML += '<img id="key" src="images/key.png" alt="key" draggable="true" ondragstart="drag(event,&quot;key&quot;);">'
        break;
    }
}

//Room 1 Functions
function exit(){
    if(dooropen){
        document.getElementById("game").style.display = "none";
        document.getElementById("inventory").style.display = "none";
        document.getElementById("text").innerHTML = "You escaped, and chased the bird for a bit. Then headed back inside to rest. WIN (Good Cat)";
    }
    else if(key && stooldoor){
        document.getElementById("text").innerHTML = "You can unlock the door now!";
    }
    else if(key && !stooldoor){
        document.getElementById("text").innerHTML = "You can't reach the door knob";
    }
    else{
        document.getElementById("text").innerHTML = "The door is locked.";
    }
}


function maintrash(){
    if(trashkey){
        document.getElementById("text").innerHTML = "You picked up the key.";
        addToInventory("key");
        key=true;
    }
    else{
        document.getElementById("text").innerHTML = "That is a trash can.";
    }
}

function keyholder(){
    if(morning && !trashkey){
        document.getElementById("text").innerHTML = "That is the key holder. But it seems to have no keys on it.";
    }
    else if(trashkey){
        document.getElementById("text").innerHTML = "The key is no longer on the holder.";
    }
    else{
        document.getElementById("text").innerHTML = "It looks like my owners put their keys back.";
    }
}

function coatrack(){
    if(morning){
        document.getElementById("text").innerHTML = "That is the coat rack. There are no coats on it right now."
    }
    else if(stoolmoved && !morning){
        document.getElementById("text").innerHTML = "You jumped onto the coats with the help of the stool."
        document.getElementById("coatrack").style.display = "block";
        document.getElementById("room1").style.display = "none";

    }
    else{
        document.getElementById("text").innerHTML = "My owners are home. There are coats on the rack now."
    }
    
}

function sidetable(){
    document.getElementById("text").innerHTML = "You jump up onto the side table."
    document.getElementById("room1").style.display = "none";
    document.getElementById("sidetable").style.display = "block";
    if(newspaper && !plant){
        document.getElementById("sidetableimg").src = "images/sidetablenewspapercollected.png";
    }
    else if(plant && !newspaper){
        document.getElementById("sidetableimg").src = "images/sidetablebrokenplant.png";
    }
    else if(newspaper && plant){
        document.getElementById("sidetableimg").src = "images/sidetablebrokenplantnewspapercollected.png";
    }
}

function collectfertilizer(){
    document.getElementById("text").innerHTML = "You picked up the fertilizer."
    fertilizer = true;
    addToInventory("fertilizer");
    document.getElementById("room1map").innerHTML = document.getElementById("room1map").innerHTML.substring(0,document.getElementById("room1map").innerHTML.indexOf('<area shape="poly" coords="440,680,515,680,500,735,430,730" alt="fertilizer" onclick="collectfertilizer()">'));
}

//Side Table Functions
function sidetableback(){
    document.getElementById("text").innerHTML = "You jump back down."
    document.getElementById("sidetable").style.display = "none";
    document.getElementById("room1").style.display = "block";
    
}

function knockplant(){
    if(morning){
    document.getElementById("text").innerHTML = "You didn't have to do that...";
    plant = true;
    document.getElementById("room1img").src = "images/room1morningbrokenplant.png";
    if(!fertilizer){
        document.getElementById("room1map").innerHTML += '<area shape="poly" coords="440,680,515,680,500,735,430,730" alt="fertilizer" onclick="collectfertilizer()">';
    }
    if(newspaper == false){
        document.getElementById("sidetableimg").src = "images/sidetablebrokenplant.png";
        document.getElementById("sidetablemap").innerHTML = '<area shape="poly" coords="645,260,665,165,840,165,860,260" alt="newspaper" onclick="collectnewspaper()">';
    }
    else{
        document.getElementById("sidetableimg").src = "images/sidetablebrokenplantnewspapercollected.png";
        document.getElementById("sidetablemap").innerHTML = '';
    }
}
else{
    document.getElementById("text").innerHTML = "You shouldn't do that with your owners around.";
}
}

function collectnewspaper(){
    document.getElementById("text").innerHTML = "You picked up the newspaper."
    newspaper = true;
    addToInventory("newspaper");
    if(!plant){
        document.getElementById("sidetableimg").src = "images/sidetablenewspapercollected.png";
        document.getElementById("sidetablemap").innerHTML = '<area shape="poly" coords="580,450,725,360,880,450,810,645,645,645" alt="hallwayplant" onclick="knockplant()">';
    }
    else{
        document.getElementById("sidetableimg").src = "images/sidetablebrokenplantnewspapercollected.png";
        document.getElementById("sidetablemap").innerHTML = '';
    }
    
}

function movedstool(){
    if(key){
        document.getElementById("movedstool").style.display = "none";
        document.getElementById("doorstool").style.display = "block";
        document.getElementById("text").innerHTML = "You moved the stool under the door.";
        stooldoor=true;
    }
    else{
        document.getElementById("text").innerHTML = "You moved the stool under the coats.";
    }
}

function collectkey(){
    document.getElementById("text").innerHTML = "You knocked the key down."
    trashkey = true;
    document.getElementById("coatrackimg").src = "images/coatracknokey.png";
    document.getElementById("coatrackmap").innerHTML = '';
    document.getElementById("keyracknokey").style.display = "block";
}

function coatrackback(){
    document.getElementById("text").innerHTML = "You jump back down."
    document.getElementById("coatrack").style.display = "none";
    document.getElementById("room1").style.display = "block";
}

//Room 2 Functions

function clock(){
    if(morning){
        document.getElementById("text").innerHTML = "It is 10:27am.";
    }
    else{
        document.getElementById("text").innerHTML = "It is 7:12pm.";
    }
    
}

function catbed(){
    document.getElementById("text").innerHTML = 'That is my bed. Would you like to sleep? <button type="button" onclick="sleep(1)">Yes</button> <button type="button" onclick="sleep(2)">No</button> ';
}

function sleep(x){
    switch(x){
    case 1:
        if(morning){
        if(newspaperfireplace && !fire) {
            document.getElementById("room2img").src = "images/room2eveningnewspaper.png";
        }
        else if(fire){
            document.getElementById("room2img").src = "images/room2eveningnewspaper.png";
            lampstring= '<area shape="poly" coords="335,460,395,460,395,560,330,560" alt="lamp" onclick="lamp()">';
            document.getElementById("room2map").innerHTML += lampstring;
            fire = false;
        }
        else{
            document.getElementById("room2img").src = "images/room2evening.png";
        }
        
        document.getElementById("text").innerHTML = "You slept. It is now 7:12pm. Your owners cleaned everything up.";
        if(plant){
            document.getElementById("room1img").src = "images/room1evening.png";
            document.getElementById("sidetableimg").src = "images/sidetablenewspapercollected.png";
            plantstring= '<area shape="poly" coords="580,450,725,360,880,450,810,645,645,645" alt="hallwayplant" onclick="knockplant()">';
            document.getElementById("sidetablemap").innerHTML += plantstring;
            plant = false;
        }
        else{
            document.getElementById("room1img").src = "images/room1evening.png";
        }

        if(trashflag){
            document.getElementById("room3img").src = "images/room3morningnostool.png";
            trashflag = false;
            trashmapstring = '<area shape="poly" coords="200,540,250,490,270,510,270,620,225,665,200,660" alt="trash" onclick="trash()">';
            document.getElementById("room3map").innerHTML += trashmapstring;
        }
        coatrackstring = '<area shape="poly" coords="1040,260,1135,290,1135,310,1040,275" alt="coatrack" onclick="coatrack()">';
        document.getElementById("room1map").innerHTML = document.getElementById("room1map").innerHTML.substring(0,document.getElementById("room1map").innerHTML.indexOf(coatrackstring)) + document.getElementById("room1map").innerHTML.substring(document.getElementById("room1map").innerHTML.indexOf(coatrackstring) + coatrackstring.length, document.getElementById("room1map").innerHTML.length);
        document.getElementById("room1map").innerHTML += '<area shape="poly" coords="1040,260,1135,290,1115,500,1030,460" alt="coats" onclick="coatrack()">';
        morning = false;
    }
    else{
        console.log(document.getElementById("room1map").innerHTML);
        if(newspaperfireplace && !fire) {
            document.getElementById("room2img").src = "images/room2morningnewspaper.png";
        }
        else if(fire){
            document.getElementById("room2img").src = "images/room2morningfire.png";
        }
        else{
            document.getElementById("room2img").src = "images/room2morning.png";
        }
        document.getElementById("text").innerHTML = "You slept. It is now 10:27am.";
        
        if(plant){
            document.getElementById("room1img").src = "images/room1morningbrokenplant.png";
        }
        else{
            document.getElementById("room1img").src = "images/room1morning.png";
        }
        coatrackstring= '<area shape="poly" coords="1040,260,1135,290,1115,500,1030,460" alt="coats" onclick="coatrack()">';
        document.getElementById("room1map").innerHTML = document.getElementById("room1map").innerHTML.substring(0,document.getElementById("room1map").innerHTML.indexOf(coatrackstring)) + document.getElementById("room1map").innerHTML.substring(document.getElementById("room1map").innerHTML.indexOf(coatrackstring) + coatrackstring.length, document.getElementById("room1map").innerHTML.length);
        document.getElementById("room1map").innerHTML += '<area shape="poly" coords="1040,260,1135,290,1135,310,1040,275" alt="coatrack" onclick="coatrack()">';
        morning = true;
        console.log(document.getElementById("room1map").innerHTML);
    }
        break;
    case 2:
        document.getElementById("text").innerHTML = "You decided not to sleep.";
        break;
}
}

function remote(){
    if(!TV){
        document.getElementById("text").innerHTML = "You turned on the TV.";
        TV = true;
    }
    else{
        document.getElementById("text").innerHTML = "You turned off the TV.";
        TV = false;
    }
}

function fireplace(){
    if(newspaperfireplace && !fire){
        document.getElementById("text").innerHTML = "The fireplace has some newspaper in it.";
    }
    else if(fire){
        document.getElementById("text").innerHTML = "There is a fire.";
    }
    else{
        document.getElementById("text").innerHTML = "That is the fireplace.";
    }
}

function lamp(){
    if(newspaperfireplace && morning){
        document.getElementById("text").innerHTML = "You knock over the lamp, setting the newspaper on fire.";
        if(morning){
            document.getElementById("room2img").src = "images/room2morningfire.png";
        }
        else{
            document.getElementById("room2img").src = "images/room2eveningfire.png";
        }
        fire = true;
        lampstring= '<area shape="poly" coords="335,460,395,460,395,560,330,560" alt="lamp" onclick="lamp()">';
        document.getElementById("room2map").innerHTML = document.getElementById("room2map").innerHTML.substring(0,document.getElementById("room2map").innerHTML.indexOf(lampstring)) + document.getElementById("room2map").innerHTML.substring(document.getElementById("room2map").innerHTML.indexOf(lampstring) + lampstring.length, document.getElementById("room2map").innerHTML.length);
    }
    else if(newspaperfireplace  && !morning){
        document.getElementById("text").innerHTML = "You probably shouldn't do that when your owners are home.";
    }
    else{
        document.getElementById("text").innerHTML = "That is a lamp. You could knock it over, but better not to for now.";
    }
    
}

//Room 3 Functions

function trash(){
    if(morning){
        document.getElementById("text").innerHTML = "You knocked over the trash can.";
    if(cuttingboardfridge && !morning){
    if(stool == 1){
        document.getElementById("room3img").src = "images/room3morningtrash.png";
    }
    else if(stool == 2){
        document.getElementById("room3img").src = "images/room3morningtrashstool1.png";
    }
    else if(stool == 3){
        document.getElementById("room3img").src = "images/room3morningtrashstool2.png";
    }
    else{
        document.getElementById("room3img").src = "images/room3morningtrashstool3.png";
    }
    }
    else{
        document.getElementById("room3img").src = "images/room3morningtrashnostool.png";
    }

    trashflag = true;
    let trashmapstring = '<area shape="poly" coords="200,540,250,490,270,510,270,620,225,665,200,660" alt="trash" onclick="trash()">';
    document.getElementById("room3map").innerHTML = document.getElementById("room3map").innerHTML.substring(0,document.getElementById("room3map").innerHTML.indexOf(trashmapstring)) + document.getElementById("room3map").innerHTML.substring(document.getElementById("room3map").innerHTML.indexOf(trashmapstring) + trashmapstring.length, document.getElementById("room3map").innerHTML.length);
    if(!bottle){
        document.getElementById("room3map").innerHTML += '<area shape="poly" coords="365,670,380,670,355,700,335,690" alt="bottle" onclick="collectbottle()">';
    }
}
else{
    document.getElementById("text").innerHTML = "You shouldn't do that with your owners around.";
}
}

function collectbottle(){
    document.getElementById("text").innerHTML = "You picked up the bottle.";
    bottle = true;
    addToInventory("bottle");
    if(cuttingboardfridge && !morning){
    if(stool == 1){
        document.getElementById("room3img").src = "images/room3morningtrashbottle.png";
    }
    else if(stool == 2){
        document.getElementById("room3img").src = "images/room3morningtrashbottlestool1.png";
    }
    else if(stool == 3){
        document.getElementById("room3img").src = "images/room3morningtrashbottlestool2.png";
    }
    else{
        document.getElementById("room3img").src = "images/room3morningtrashbottlestool3.png";
    }
}
else{
    document.getElementById("room3img").src = "images/room3morningtrashbottlenostool.png";
}
    let bottlemapstring = '<area shape="poly" coords="365,670,380,670,355,700,335,690" alt="bottle" onclick="collectbottle()">';
    document.getElementById("room3map").innerHTML = document.getElementById("room3map").innerHTML.substring(0,document.getElementById("room3map").innerHTML.indexOf(bottlemapstring)) + document.getElementById("room3map").innerHTML.substring(document.getElementById("room3map").innerHTML.indexOf(bottlemapstring) + bottlemapstring.length, document.getElementById("room3map").innerHTML.length);
}

function sink(){
    document.getElementById("text").innerHTML = "You turned on the sink.";
    sinkflag = true;
}

function collectcuttingboard(){
    document.getElementById("text").innerHTML = "You picked up a cutting board.";
    cuttingboard = true;
    addToInventory("cuttingboard");
    document.getElementById("filledsink").src = "images/filledsinknocutting.png";
    document.getElementById("sinkmap").innerHTML = '';
}

function stoolmove(){
    document.getElementById("text").innerHTML = "You pushed the stool.";
    if(stool == 1){
        if(trashflag && !bottle){
            document.getElementById("room3img").src = "images/room3morningtrashstool1.png";
        }
        else if(trashflag && bottle){
            document.getElementById("room3img").src = "images/room3morningtrashbottlestool1.png";
        }
        else{
            document.getElementById("room3img").src = "images/room3morningstool1.png";
        }
        stool++;
        let stoolmapstring = '<area shape="poly" coords="1075,520,1175,520,1185,585,1065,585" alt="stool" onclick="stoolmove()">';
        document.getElementById("room3map").innerHTML = document.getElementById("room3map").innerHTML.substring(0,document.getElementById("room3map").innerHTML.indexOf(stoolmapstring)) + document.getElementById("room3map").innerHTML.substring(document.getElementById("room3map").innerHTML.indexOf(stoolmapstring) + stoolmapstring.length, document.getElementById("room3map").innerHTML.length);
        document.getElementById("room3map").innerHTML += '<area shape="poly" coords="1030,680,1135,685,1140,750,1025,750" alt="stool" onclick="stoolmove()">';
    }
    else if(stool == 2){
        if(trashflag && !bottle){
            document.getElementById("room3img").src = "images/room3morningtrashstool2.png";
        }
        else if(trashflag && bottle){
            document.getElementById("room3img").src = "images/room3morningtrashbottlestool2.png";
        }
        else{
            document.getElementById("room3img").src = "images/room3morningstool2.png";
        }
        stool++;
        let stoolmapstring = '<area shape="poly" coords="1030,680,1135,685,1140,750,1025,750" alt="stool" onclick="stoolmove()">';
        document.getElementById("room3map").innerHTML = document.getElementById("room3map").innerHTML.substring(0,document.getElementById("room3map").innerHTML.indexOf(stoolmapstring)) + document.getElementById("room3map").innerHTML.substring(document.getElementById("room3map").innerHTML.indexOf(stoolmapstring) + stoolmapstring.length, document.getElementById("room3map").innerHTML.length);
        document.getElementById("room3map").innerHTML += '<area shape="poly" coords="190,715,290,715,300,780,180,780" alt="stool" onclick="stoolmove()">';
    }
    else{
        if(trashflag && !bottle){
            document.getElementById("room3img").src = "images/room3morningtrashstool3.png";
        }
        else if(trashflag && bottle){
            document.getElementById("room3img").src = "images/room3morningtrashbottlestool3.png";
        }
        else{
            document.getElementById("room3img").src = "images/room3morningstool3.png";
        }
        stool++;
        let stoolmapstring = '<area shape="poly" coords="190,715,290,715,300,780,180,780" alt="stool" onclick="stoolmove()">';
        document.getElementById("room3map").innerHTML = document.getElementById("room3map").innerHTML.substring(0,document.getElementById("room3map").innerHTML.indexOf(stoolmapstring)) + document.getElementById("room3map").innerHTML.substring(document.getElementById("room3map").innerHTML.indexOf(stoolmapstring) + stoolmapstring.length, document.getElementById("room3map").innerHTML.length);
        document.getElementById("movedstool").style.display = "block";
        stoolmoved = true;
        
    }
    console.log(document.getElementById("room3map").innerHTML);
}

function fridge(){
    if (cuttingboard && !cuttingboardfridge){
        document.getElementById("text").innerHTML = "You could probably put something on top of the fridge. Maybe my owners would need to get out a stool to reach.";
    }
    else if(cuttingboard && cuttingboardfridge){
        document.getElementById("text").innerHTML = "The cutting board is on top of the fridge.";
    }
    else{
        document.getElementById("text").innerHTML = "You're hungry. But not that hungry."
    }
    }

function heavystool(){
    document.getElementById("text").innerHTML = "Those stools are too heavy to push. I know there is a smaller one somewhere."
}

//Drag
function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev,x) {
    draggedItem = x;
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function fireplacedrop(ev) {
    if(draggedItem == "newspaper"){
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        document.getElementById(data).parentElement.removeChild(document.getElementById(data))
        if(morning){
            document.getElementById("room2img").src = "images/room2morningnewspaper.png";
        }
        else{
            document.getElementById("room2img").src = "images/room2eveningnewspaper.png";
        }
        document.getElementById("text").innerHTML = "You put the newspaper in the fireplace.";
        newspaperfireplace = true;
    }
    else if(draggedItem == "bottlefertilizer" && fire){
        document.getElementById("text").innerHTML = "You lit the fertilizer on fire. You have 5 seconds before it explodes. Place it near the window!";
        timer("start");
        document.getElementById("bottlefertilizer").src = "images/bottlefertilizerfire.png";
        document.getElementById("inventory").innerHTML = document.getElementById("inventory").innerHTML.replace('id="bottlefertilizer"','id="bomb"');
        document.getElementById("inventory").innerHTML = document.getElementById("inventory").innerHTML.replace('drag(event,&quot;bottlefertilizer&quot;)','drag(event,&quot;bomb&quot;)')
    }
    else{
        document.getElementById("text").innerHTML = "You cannot place that here.";
    }
  }

  function timer(x){
    if(x == "start"){
        document.getElementById("bombtimer").style.display="flex";
        let starttime = Date.now();
        timerInterval = setInterval(function(){
            let time = Date.now() - starttime;
            document.getElementById("bombtimer").innerHTML = Math.floor(time/1000);
            if(Math.floor(time/1000) == 6){
                clearInterval(timerInterval);
                document.getElementById("game").style.display = "none";
                document.getElementById("inventory").style.display = "none";
                document.getElementById("bombtimer").style.display="none";
                document.getElementById("text").innerHTML = "You died.";
            }
        }, 1000)
    }
    else{
        clearInterval(timerInterval);
    }

  }

  function fridgedrop(ev) {
    if(draggedItem == "cuttingboard"){
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        document.getElementById(data).parentElement.removeChild(document.getElementById(data))
        // ev.target.appendChild(document.getElementById(data));
        document.getElementById("cuttingboardonfridge").style.display = "block";
        document.getElementById("text").innerHTML = "You put the cutting board on the fridge";
        cuttingboardfridge = true;
    }
    else{
        document.getElementById("text").innerHTML = "You cannot place that here.";
    }
  }

  function beddrop(ev) {
    console.log(draggedItem);
    if(draggedItem == "bomb"){
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        document.getElementById(data).parentElement.removeChild(document.getElementById(data))
        // ev.target.appendChild(document.getElementById(data));
        document.getElementById("room2img").src = "images/room2bombbed.png"
        document.getElementById("text").innerHTML = "You put the bomb on your bed. Quick leave the room!";
        bedbomb = true;
    }
    else{
        document.getElementById("text").innerHTML = "You cannot place that here.";
    }
  }

  function doordrop(ev) {
    if(draggedItem == "key" && stooldoor){
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        document.getElementById(data).parentElement.removeChild(document.getElementById(data))
        // ev.target.appendChild(document.getElementById(data));
        document.getElementById("opendoor").style.display = "block";
        document.getElementById("text").innerHTML = "You unlocked the door.";
        dooropen = true;
    }
    else if(draggedItem == "key" && !stooldoor)
    {
        document.getElementById("text").innerHTML = "You can't reach the doorknob.";
    }
    else{
        document.getElementById("text").innerHTML = "You cannot place that here.";
    }
  }


  function combine(ev,x){
    console.log(x);
    if(x == "fertilizer" && draggedItem=="bottle"){
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
        document.getElementById("inventory").innerHTML = document.getElementById("inventory").innerHTML.replace('id="fertilizer"','id="bottlefertilizer"');
        document.getElementById("inventory").innerHTML = document.getElementById("inventory").innerHTML.replace('src="images/fertilizer.png"','src="images/bottlefertilizer.png"');
        document.getElementById("inventory").innerHTML = document.getElementById("inventory").innerHTML.replace('drag(event,&quot;fertilizer&quot;)','drag(event,&quot;bottlefertilizer&quot;)')
        console.log(document.getElementById("inventory").innerHTML);
        document.getElementById("text").innerHTML = "You combined the fertilizer and the bottle.";
    }
    else if(x == "bottle" && draggedItem=="fertilizer"){
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
        document.getElementById("inventory").innerHTML = document.getElementById("inventory").innerHTML.replace('id="bottle"','id="bottlefertilizer"');
        document.getElementById("inventory").innerHTML = document.getElementById("inventory").innerHTML.replace('src="images/bottle.png"','src="images/bottlefertilizer.png"')
        document.getElementById("inventory").innerHTML = document.getElementById("inventory").innerHTML.replace('drag(event,&quot;bottle&quot;)','drag(event,&quot;bottlefertilizer&quot;)')
        console.log(document.getElementById("inventory").innerHTML);
        document.getElementById("text").innerHTML = "You combined the fertilizer and the bottle.";
    }
    else{
        document.getElementById("text").innerHTML = "You cannot combine these.";
    }
  }

  function bombescape(){
    document.getElementById("game").style.display = "none";
    document.getElementById("inventory").style.display = "none";
    document.getElementById("bombtimer").style.display="none";
    document.getElementById("text").innerHTML = "You escaped, but the bird is nowhere to be found. You've cost your owners $10,000 in property damage. WIN (Bad Cat)";
  }