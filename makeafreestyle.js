function loadsong(event) {
      var selectedFile = event.target.files[0];
      var reader = new FileReader();

      var tunage = document.getElementById("music");

      reader.onload = function(event) {
        music.src = event.target.result;
      };

      reader.readAsDataURL(selectedFile);
}


function closeElement(el, bl){
  //el.innerHTML = "";
  el.style.display = "none";
  //bl.style.display = "none";
}

//////////////////New Trick Menu//////////////////////////////////

function toggleNewTrickMenu(bool){
  var menu = document.getElementsByClassName("newTrick")[0];
  var trickName = document.getElementsByClassName("addCustom-trickName")[0];
  var trickPresets = document.getElementById("trickPresets");

  //menu.style.display = "block";
  if(bool == true){
    //Open Menu
    menu.style.display = "block";
  }
  else if(bool == false){
    //Reset Fields
    trickName.value = "Custom trick";
    trickPresets.selectedIndex = 0;

    //Close Menu
    menu.style.display = "none";
  }
}

function addTextPreset(){
  var choiceParent = document.getElementById("trickPresets");

  //Make sure not to choose the default <Select> option
  if(choiceParent.selectedIndex != 0){
    document.getElementsByClassName("addCustom-trickName")[0].value = choiceParent.options[choiceParent.selectedIndex].value;
  }  
}

function appendNewTrick(){
  var trickName = document.getElementsByClassName("addCustom-trickName")[0];
  var el = document.createElement("li");
  el.innerHTML = '<li class="trick" onclick="select(this);" draggable="true" ondragenter="dragenter(event)" ondragstart="dragstart(event)">' + trickName.value + '</li>';
  document.getElementsByClassName("freestyle")[0].appendChild(el);

  //Reset and Close
  toggleNewTrickMenu(false);

  if($(".whenBlank")){
    $(".whenBlank").remove();
  }
}

////////////////////////////////////////////////////////////////////////

function addBreak(){
  document.getElementsByClassName("freestyle")[0].innerHTML += '<br class="trick" onclick="select(this);" draggable="true" ondragenter="dragenter(event)" ondragstart="dragstart(event)" />';
}

function save(){
  deselect();
  var list = document.getElementsByClassName("freestyle")[0];
  if(localStorage.getItem("freestyle") != null){
    var a = window.confirm("There is already a freestyle saved. Saving now will overwrite the previously saved freestyle. Do you want to save over it?");
    if(a == true){
      localStorage.setItem("freestyle", JSON.stringify(list.innerHTML));
    }
    else{
      //Dont Save
      //alert("test");
    }
  }
  else{
    localStorage.setItem("freestyle", JSON.stringify(list.innerHTML));
  }
}

function load(){
  var list = document.getElementsByClassName("freestyle")[0];
  if(localStorage.getItem("freestyle") != null){
    var a = window.confirm("If you load your previously saved freestyle you will lose any unsaved changes. Continue?");
    if(a == true){
      list.innerHTML = JSON.parse(localStorage.getItem("freestyle"));
    }
    else{
      //Dont Save
      //alert("test");
    }
  }
  else{
    window.alert("No saved freestyle available!");
  }
}

function deleteSave(){
  if(localStorage.getItem("freestyle") != null){
    var a = window.confirm("Are you sure you want to delete your freestyle? This cannot be undone!");

    if(a == true){
      localStorage.removeItem("freestyle");
    }
    else{
      //Do not delete
    }
  }
  else{
    window.alert("There is no saved freestyle available to delete!");
  }
}

function select(el){//perameter el
  
  if($(".selected") != null){
    if(isCTRL(event) != true){
      $(".selected").removeClass("selected");
    }
    
    document.getElementById("trickcolor").selectedIndex = getColor(el.style.backgroundColor);
  } 
  $(el).addClass("selected");
  document.getElementById("trickcolor").selectedIndex = getColor(el.style.backgroundColor);
}

function deselect(){
  if($(".selected") != null){
    $(".selected").removeClass("selected");
    document.getElementById("trickcolor").selectedIndex = 0;
  }
}

function removeEl(){
//NEED to rename this removeEL() instead of remove() because otherwise the jQuery remove()
//is called onclick and it deletes the "Remove" button on the UI
  if($(".trick")[0] == undefined || $(".selected")[0] == undefined){
    window.alert("No tricks selected.");
  }
  else{
    var q = window.confirm("Are you sure you want to delete all selected tricks?");
    
    if(q == true){
       $(".selected").remove();
    }
    else{
      //Keep
      //alert("testy");
      }
    }
}

function duplicate(){
  if($(".trick")[0] == undefined){
    window.alert("There's nothing to duplicate!");
  }
  else{
    if($(".selected") != null){
      $(".selected").clone().appendTo(".freestyle");
    }
  }
}

function centerOnBoth(element,width,height){
  var dispWidth = screen.width;
  var dispHeight = screen.height;
  element.style.position = "absolute";
  element.style.left = (dispWidth / 2) - (width / 2);
  element.style.top = (dispHeight / 2) - (height / 2);
}

function highlight(color){
  var selected = document.getElementsByClassName("selected");
  for(var i = 0; i < selected.length; i++){
    selected[i].style.backgroundColor = color;
  }
}

function getColor(color){
  switch(color){
    case "red":
      return 0;
    break;

    case "orange":
      return 1;
    break;

    case "green":
      return 2;
    break;

    case "lime":
      return 3;
    break;

    case "blue":
      return 4;
    break;

    case "purple":
      return 5;
    break;

    case "black":
      return 6;
    break;

    default:
      return 0;
    break;
  }
}

function whenBlank(){
  var freestyle = document.getElementsByClassName("freestyle")[0];
  //alert($(".trick"));

  if($(".trick")[0] == undefined){//} && localStorage.getItem("freestyle" == null)){
    freestyle.innerHTML = '<li class="whenBlank">You dont have any tricks yet! Click "Add" up on the toolbar to get started.<br />-OR-<br />If you have a freestyle saved, click "Load" up on the toolbar to get started.</li>';
  }
  else{
    if($(".whenBlank")){
      $(".whenBlank").remove();
    }
  }
  /*else if($(".trick")[0] == undefined && localStorage.getItem("freestyle" != null)){
    freestyle.innerHTML = '<li class="whenBlank">You don\'t have any tricks in this session, but you have a freestyle saved. Click "Load" up on the toolbar to get back to the grind.</li>';
  }
  else if($(".trick")[0] != undefined){
    //Dont do anything
  }*/
}

function isCTRL(event){
  //Returns if the CTRL key is pressed or not

  if(window.event.ctrlKey){ // IE         
    //alert(window.event.ctrlKey.toString());
    return window.event.ctrlKey;
  }else if(event.ctrlKey){ // Netscape/Firefox/Opera/Chrome         
    //alert(event.ctrlKey.toString());
    return event.ctrlKey;
  }
}

function customTrickText(el, bool){
  //True is on focus, false is on blur
  if(bool == true){
    if(el.value == 'Custom trick'){
      el.value = '';
    }
    $(el).removeClass('grayText');
  }
  else if(bool == false){
    if(el.value == ''){
      el.value = 'Custom trick';
    }
    $(el).addClass('grayText');
  }
}