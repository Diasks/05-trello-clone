import $ from 'jquery';

// require('webpack-jquery-ui');
import '../css/styles.css';

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
    DOM.$lists = $('.list'); //listan
    DOM.$cards = $('.card'); //kortet i listan
    
    DOM.$newListButton = $('button#new-list'); //knappen för att skapa ny lista
    DOM.$deleteListButton = $('.list-header > button.delete'); //knappen för att ta bort lista

    DOM.$newCardForm = $('form.new-card'); //formuläret för att lägga till ett nytt kort
    DOM.$deleteCardButton = $('.card > button.delete');//knappen för att ta bort ett kort
  }

  function createTabs() {}
  function createDialogs() {}

  /*
  *  Denna metod kommer nyttja variabeln DOM för att binda eventlyssnare till
  *  createList, deleteList, createCard och deleteCard etc.
  */
  function bindEvents() {
    DOM.$newListButton.on('click', createList);
    DOM.$deleteListButton.on('click', deleteList);

    DOM.$newCardForm.on('submit', createCard);
    DOM.$deleteCardButton.on('click', deleteCard);
  }

  /* ============== Metoder för att hantera listor nedan ============== */
  function createList() {
    event.preventDefault();
    console.log("This should create a new list so much fun!");
  }

  function deleteList() {
    console.log("This should delete the list you clicked on!!!!");
    $(this).closest('.list').remove();
    // DOM.$lists.detach();
  }

  /* =========== Metoder för att hantera kort i listor nedan =========== */
  function createCard(event) {
    event.preventDefault();
    console.log("This should create a new card woho yabadooo!");
  }

  function deleteCard() {
    console.log("This should delete the card you clicked on yaooo");
  }

  // Metod för att rita ut element i DOM:en
  function render() {}

  /* =================== Publika metoder nedan ================== */

  // Init metod som körs först
  function init() {
    console.log(':::: Initializing JTrello ::::');
    // Förslag på privata metoder
    captureDOMEls();
    createTabs();
    createDialogs();

    bindEvents();
  }

  // All kod här
  return {
    init: init
  };
})();

//usage
$("document").ready(function() {
  jtrello.init();
});
