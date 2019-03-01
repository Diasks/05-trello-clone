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

    DOM.$listDialog = $('#list-creation-dialog'); //formuläret för att göra en ny lista
    DOM.$newListButton = $('button#new-list'); //knappen för att skapa ny lista
   
  }

  /*
  *  Denna metod kommer nyttja variabeln DOM för att binda eventlyssnare till
  *  createList, deleteList, createCard och deleteCard etc.
  */
  function bindEvents() {
    DOM.$newListButton.on('click', createList);
  $('body').on("click", "button[name=delete]", deleteList);
  $('body').on("click", "button[name=add]", createCard);
  $('body').on("click", "button[name=deletecard]", deleteCard);
  $('body').on("click", "button[name=buttondialog]", openDialog);
  }





  /* =================== Publika metoder nedan ================== */

  // Init metod som körs först
  function init() {
    console.log(':::: Initializing JTrello ::::');
    // Förslag på privata metoder
    captureDOMEls();
    bindEvents();

  }









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





      $( ".list" ).animate({
        backgroundColor: "#FFC0CB",
        color: "#fff",
        width: 200
      }, 1000 );
    }








  (function($) {

    $.fn.helloWorld = function() {

        this.each(function() {
            $(this).css("color", "#2F4F4F");
             $(this).css("backgroundColor", "#FFEFD5"); 
             $(this).css("border", "2px solid #000000"); 

        });

    }

}(jQuery));
	
 



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



     $('.card').mouseover(function () {
      $( this ).css("color", "#696969");
      $( this ).css("backgroundColor", "#FFE4B5");
    })
   
     



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
var contentdiv=$('<div id="tab1"><p>kul att du är här</p> </div><div id="tab2"><p>suprise!</p></div><div id="tab3"><p>tredje gången gillt! </p></div>'); 
contentdiv.appendTo(tabdiv);
tabdiv.appendTo('.card').tabs();
}

  

  function deleteCard() {
    
    $(this).closest('.card').remove();

  
  }

  function deleteList () 
  {
    $(this).closest('.column').remove();

  }




  return {
    init: init
};
})();


//usage
$("document").ready(function() {
  jtrello.init();
  $('#new-list').helloWorld();
  $('#text').helloWorld();

});


