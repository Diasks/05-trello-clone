import $ from 'jquery';

require('webpack-jquery-ui');
import '../css/styles.css';
// import { createReadStream } from 'fs';

/**
 * jtrello
 * @return {Object} [Publikt tillgänliga metoder som vi exponerar]
 */

// Här tillämpar vi mönstret reavealing module pattern:
// Mer information om det mönstret här: https://bit.ly/1nt5vXP
const jtrello = (function() {
  "use strict"; // https://lucybain.com/blog/2014/js-use-strict/

  // Referens internt i modulen för DOM element
  let DOM = {};

  /* =================== Privata metoder nedan ================= */
  function captureDOMEls() {
    DOM.$board = $('.board'); //rutan för alla columner
    DOM.$listDialog = $('#list-creation-dialog'); //formuläret för att göra en ny lista
    DOM.$columns = $('.column'); //alla columner för listor och kort
    console.log(DOM.$columns);
    DOM.$lists = $('.list'); //listan
    console.log(DOM.$lists);
    DOM.$cards = $('.card'); //kortet i listan
    console.log(DOM.$cards);
    
    DOM.$newListButton = $('button#new-list'); //knappen för att skapa ny lista
    DOM.$deleteListButton = $('#delete-list'); //knappen för att ta bort lista
    DOM.$newCardButton = $('button#new-card');
    DOM.$newCardForm = $('form.new-card'); //formuläret för att lägga till ett nytt kort
    DOM.$deleteCardButton = $('button#delete-card');//knappen för att ta bort ett kort
  }

  // function createTabs() {}
  // function createDialogs() {}

  /*
  *  Denna metod kommer nyttja variabeln DOM för att binda eventlyssnare till
  *  createList, deleteList, createCard och deleteCard etc.
  */
  function bindEvents() {
    $('.board').on('click', '#delete-button', deleteList);
    DOM.$newListButton.on('click', createList);
    DOM.$deleteListButton.on('click', deleteList);
    DOM.$newCardButton.on('submit', createCard);
    DOM.$deleteCardButton.on('click', deleteCard);
  }


  // Metod för att rita ut element i DOM:en
  // function render() {}

  /* =================== Publika metoder nedan ================== */

  // Init metod som körs först
  function init() {
    console.log(':::: Initializing JTrello ::::');
    // Förslag på privata metoder
    captureDOMEls();
    // createTabs();
    // createDialogs();
    bindEvents();
  }


  // All kod här

  function createList(event) {
    event.preventDefault();
    //kolumn
  var newColumn= $('<div class="column"></div>');

  //div med class list
 var listdiv = $('<div class="list"></div>'); 
 listdiv.appendTo(newColumn);
//div med class list-header
var listName= $('<div class="list-header"></div>'); 

var value=$('#text').val();
listName.html(value);
//knapp för att ta bort lista
var button=$('<button id="delete-list" class="button delete" button name="delete">X</button>');
button.appendTo(listName);
listName.appendTo(listdiv);
//ul med class list-cards
var newDiv =$('<div class="divdialog" id="divdialog"></div>');
    newDiv.appendTo(listdiv);
var newUl = $('<ul class="list-cards"></ul>');
newUl.appendTo(newDiv);


var liAdd = $('<li class="add-new"></li>');
liAdd.appendTo(newUl);


var form = $('<form class="new-card" action="index.html"></form>');
form.html('<input type="text" id="cardname" class="cardname" name="title" placeholder="Please name the card"> <br> <input type="text" id="datepicker" class="datepicker" placeholder="pick a duedate.." size="15"/>');
$( function() {
  $( ".datepicker" ).datepicker({ dateFormat: 'yy-mm-dd' });
});
form.appendTo(liAdd);
var buttonAdd=$('<button id="add-card" class="button add" name="add">Add New card</button>');
buttonAdd.appendTo(form);     

$('.board').append(newColumn);

$( function() {
  $( ".list-cards" ).sortable({
    connectWith: '.list-cards'
  }).disableSelection();
 
});

    console.log("This should create a new list so much fun!");


    var state = true;
    if ( state ) {
      $( ".list" ).animate({
        backgroundColor: "#FFC0CB",
        color: "#fff",
        width: 200
      }, 1000 );

  }}





$('body').on("click", "button[name=delete]", deleteList);
$('body').on("click", "button[name=add]", createCard);
$('body').on("click", "button[name=deletecard]", deleteCard);
$('body').on("click", "button[name=buttondialog]", openDialog);



    
  
	
 



  function createCard(event) {
    event.preventDefault();
var newLi=$('<li class="card" id="card"></li>');
var livalue=$('#cardname').val();
var datevalue=$( "#datepicker").val();


newLi.text(livalue + ' ' + datevalue);
var buttonDialog = $('<button id="open-dialog" class="button dialog" name="buttondialog">Y</button>');
var buttonDelete = $('<button id="delete-card" class="button delete" name="deletecard">X</button>');
newLi.append(buttonDialog, buttonDelete);
$(this).closest('.list-cards').append(newLi);

     console.log("This should create a new card woho ADJDAHyabadooo!");
  }




  function openDialog() {

    $("#card").dialog({
      title: "Your fabulous card!",
      autoOpen: true,
      modal: true,
      height: 300,
      width: 500,
      show: {
        effect: "fade",
        duration: 500
      },
      hide: {
        effect: "fade",
        duration: 500
      },
      buttons: {
        Cancel: function() {
        $(this).dialog("close");
      }
    }
    
  })
  createTabs();
  }

  
 function createTabs(){
 
var tabdiv=$('<div id="mytabs"><ul><li><a href="#tab1">Tab1</a></li><li><a href="#tab2">Tab2</a></li><li><a href="#tab3">Tab3</a></li></ul>');
var contentdiv=$('<div id="tab1"><p>this is content 1</p> </div><div id="tab2"><p>this is content 2 </p></div><div id="tab3"><p>this is content 3 </p></div>'); 
contentdiv.appendTo(tabdiv);
tabdiv.appendTo('#card').tabs();
}

  

  function deleteCard() {
    
    $(this).closest('.card').remove();
    console.log("This should delete the card you clicked on yaooo");
  
  }

  function deleteList () 
  {
    $(this).closest('.column').remove();
    console.log("ta bort mig!!");
  }




  return {
    init: init
};
})();


//usage
$("document").ready(function() {
  jtrello.init();


});
