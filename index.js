/* eslint-disable quotes */
/* eslint-disable no-undef */
'use strict';
const store = [
  {id: cuid(), name: "apples", checked: false},
  {id: cuid(), name: "oranges", checked: false},
  {id: cuid(), name: "milk", checked: true},
  {id: cuid(), name: "bread", checked: false}
];


function generateItemElement(item) {
  return `
    <li data-item-id="${item.id}">
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}

function generateItemString(shoppingList){
  const items = shoppingList.map((item) => generateItemElement(item));
  
  return items.join("");
}

//render the shopping list
function renderShoppingList(){
  const itemsString = generateItemString(store);
  
  $(`.js-shopping-list`).html(itemsString);
}

//handle the creation of new items
function addItemToShoppingList(itemName) {
  store.push({id: cuid(), name: itemName, checked: false});
}

function newItem(){
  //on submit take in the input from the button, assign an ID to the item, assign checked === false, and push this object to the store array
  $(`#js-shopping-list-form`).on('submit', function(e){
    e.preventDefault();
    addItemToShoppingList($(`.js-shopping-list-entry`).val());
    $('.js-shopping-list-entry').val('');
    renderShoppingList();
  });
}

//handles checks and unchecks the items in the list
function checkItem(){
  //upon click of the check button, check if the item in the list has a value of true or valse for checked and assign the opposite
  $(`.js-shopping-list`).on('click',`.js-item-toggle`, function(e){
    let itemId = $(this).closest('li').data(`item-id`);
    for(let i = 0; i < store.length; i++){
      if(itemId === store[i].id){
        store[i].checked = !store[i].checked;
      } 
    }
    renderShoppingList();
  });  
}


//handles deletion of items in the list
function deleteItem(){
  //upon click of the delete button, remove the item from the list and in turn the store array
  $(`.js-shopping-list`).on('click',`.js-item-delete`, function(e){
    let itemId = $(this).closest('li').data(`item-id`);
    for(let i = 0; i < store.length; i++){
      if(itemId === store[i].id){
        delete store[i];
        store.splice(i,1);
      } 
    }
    renderShoppingList();
    console.log(store);
  });
  
}

//calls the functions so they run
function initializeShoppingList(){
  renderShoppingList();
  newItem();
  checkItem();
  deleteItem();
}

$(initializeShoppingList);