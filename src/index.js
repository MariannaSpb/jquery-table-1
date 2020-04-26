import "./style.css";
import {searchBtn, searchInput, ENTER_KEYCODE, filterTable} from './filter';
import {Product} from './product';
import {Api, apiKey} from './api'
import {ProductList} from './productList'

const REQUIRED_FIELD = "Please, fill this field";
const EMAIL_ERROR = "Email address is in the wrong format";
const SHORT_ERROR = "Name min lenght is 5 characters";
const LONG_ERROR = "Name max lenght is 15 characters";
const ONLY_NUMBERS = "You can enter only numbers";

export const overlay = document.querySelector('.modal-overlay');
export const formContainer = document.querySelector('.modal__container-form');
export const addBtn = document.querySelector('.btn-add');
export const cancelBtn = document.querySelector('.btn-cancel-popup');
export const form = document.querySelector('.modal-product');
export const formTitle = document.querySelector('.form__title');
//inputs
export const nameN = form.elements.name;
export const emailN = form.elements.email;
export const countN= form.elements.count;
export const priceN = form.elements.price;
export const deliveryN = form.elements.delivery;
export const optionArray = document.querySelectorAll('.select__option');
export const option = document.querySelector('.select__option');
export const optionContainer = document.querySelector('.select-delivery');
export const productContainer = document.querySelector('#tbody');
export const fullTable = document.querySelector('#myTable');
const select = document.querySelector('select');
const rusCity = ['Moscow', 'Saint-Petersburg', 'Kazan'];
const belCity = ['Vitebs', 'Minsk', 'Gomel'];
const usaCity = ['New York', 'San Francisco', 'Boston'];
const container = document.querySelector('.select-container__modal');





const api = new Api({
   baseUrl: 'https://api.jsonbin.io/b/5ea589892940c704e1dee3f3',
  headers: {
    "secret-key": apiKey,
    'Content-Type': 'application/json'
  }
});

api.getInitialProducts()
.then(result => {
  let arrayProducts = [];
  let deliveryArr = [] 
  result.forEach(element => {
    arrayProducts.push(element);
    deliveryArr.push(element.delivery)
  });
  let actualProductList = new ProductList(productContainer, arrayProducts)
  actualProductList.render()

 
  // sort
  fullTable.addEventListener('click', (event) => {
    if (event.target.tagName !== `TH`) {
      return;
    }
    document.querySelectorAll('.row-tabel').forEach((item) =>{
      item.innerHTML = '';
    });
    switch (event.target.dataset.columnName) {
      case 'name':
        event.target.classList.add('cell-title-sort');
        event.target.classList.remove('cell-title-sort-up')
        document.querySelector('[data-price="p"]').classList.remove('cell-title-sort')
        const sortedByName = arrayProducts.slice().sort((a, b) => {
            if (a.name < b.name) return -1;
            if (b.name < a.name) return 1;
          return 0;
        });

        let sortedByNameList = new ProductList(productContainer, sortedByName)
        sortedByNameList.render()
      
        break;
      case 'price':
        const sortedByPrice = arrayProducts.slice().sort((a, b) =>  a.price - b.price);
        document.querySelector('[data-name="n"]').classList.remove('cell-title-sort')
        
        event.target.classList.add('cell-title-sort')
        event.target.classList.remove('cell-title-sort-up')
        let sortedByPriceList = new ProductList(productContainer, sortedByPrice)
        sortedByPriceList.render()
      
        break;
    }
    
  })

})
.catch((err) => {
  console.log('error',  console.log(err))
})



const openPopupHendler = (event) => {
  form.reset();
  container.classList.add('hidden')
  if(event.target.closest('.root').querySelector('.form__title')) {
    formTitle.textContent='';
  }
  overlay.classList.remove('hidden');
  formContainer.classList.remove('hidden');
  
}
const closePopupHendler = () => {
  overlay.classList.add('hidden');
  formContainer.classList.add('hidden');
  form.reset();
}

const initialCards = api.getInitialProducts()
.then(result => {
  let arr = [];
  result.forEach(element => {
    arr.push(element);
    return arr
  });
  return arr
})
const productList = new ProductList(productContainer, initialCards)


const errorContainer = document.querySelector('.invalid-feedback')
const saveBtn = document.querySelector('.btn-save');

//validation
const validateEmail = (email) => {
  const pattern = new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$');
  return pattern.test(email);
}

  saveBtn.addEventListener('click', (event) => {
  event.preventDefault();

  const name = event.target.closest('.modal__container-form').querySelector('.input-name').value;
  const email = event.target.closest('.modal__container-form').querySelector('.input-email').value;
  const count = event.target.closest('.modal__container-form').querySelector('.input-count').value;
  const price = event.target.closest('.modal__container-form').querySelector('.input-price').value;
  const delivery = event.target.closest('.modal__container-form').querySelector('option:checked').textContent;

  const namePattern = /^[\s]+$/
  const countPattern = /^\d+$/ //строка состоящая из одного или более символа входящего в диапазон 0-9(\d)
  const pricePattern = /^\.|[^\d\.]/g;
  if(name.length < 5) {
    errorContainer.style.display = "block";
    nameN.closest('.form-group').querySelector('.invalid-feedback').textContent = SHORT_ERROR;
    nameN.classList.add('error');
    return true;
  } 
  if(name.length > 15) {
    errorContainer.style.display = "block";
    nameN.closest('.form-group').querySelector('.invalid-feedback').textContent = LONG_ERROR;
    nameN.classList.add('error');
    return true;
  }
  if(namePattern.test(name)) {
    errorContainer.style.display = "block";
    nameN.closest('.form-group').querySelector('.invalid-feedback').textContent = REQUIRED_FIELD;
    nameN.classList.add('error');
  }
  if(name.length > 5 && name.length < 15 && !namePattern.test(name)) {
    errorContainer.style.display = "none";
    nameN.classList.remove('error');
   
  }

  //email
  if(!validateEmail(email)) {
    emailN.closest('.form-group').querySelector('.invalid-feedback').style.display = 'block';
    emailN.closest('.form-group').querySelector('.invalid-feedback').textContent = EMAIL_ERROR;
    emailN.classList.add('error');
    return true
  } 
  if(validateEmail(email)) {
    emailN.closest('.form-group').querySelector('.invalid-feedback').style.display = 'none';
    emailN.closest('.form-group').querySelector('.invalid-feedback').textContent = '';
    emailN.classList.remove('error');
  }

  //count
  if(!countPattern.test(count)) {
    countN.closest('.form-group').querySelector('.invalid-feedback').style.display = 'block';
    countN.closest('.form-group').querySelector('.invalid-feedback').textContent = ONLY_NUMBERS;
    countN.classList.add('error');
    return true;
  } 
  if(countPattern.test(count)) {
    countN.closest('.form-group').querySelector('.invalid-feedback').style.display = 'none';
    countN.closest('.form-group').querySelector('.invalid-feedback').textContent = '';
    countN.classList.remove('error');
    
  }

//price
  if(price.length === 0) {
    event.preventDefault();
    priceN.closest('.form-group').querySelector('.invalid-feedback').style.display = 'block';
    priceN.closest('.form-group').querySelector('.invalid-feedback').textContent = REQUIRED_FIELD;
    priceN.classList.add('error');
      
    return true
  }
  
  if(pricePattern.test(price)) {
    event.preventDefault();
    priceN.closest('.form-group').querySelector('.invalid-feedback').style.display = 'block';
    priceN.closest('.form-group').querySelector('.invalid-feedback').textContent = ONLY_NUMBERS;
    priceN.classList.add('error');
    return true;
      
    
  } 
  if(!pricePattern.test(price)) {
    priceN.closest('.form-group').querySelector('.invalid-feedback').style.display = 'none';
    priceN.closest('.form-group').querySelector('.invalid-feedback').textContent = '';
    priceN.classList.remove('error');
  } 


//временное решение
// productList.addProduct({name, count,  price, delivery});
// closePopupHendler();



//Localstorage    ----------------------------
localStorage.setItem("name", nameN.value);
localStorage.setItem("count", countN.value);
localStorage.setItem("price", priceN.value);
let itemsArray = localStorage.getItem('items') ? localStorage.getItem('items') : [];
 //---------------------------------------------------
 productList.addProduct({name, count,  price, delivery});
  closePopupHendler();
})

productList.addProduct(localStorage);


//clear localstorage
const btnClear = document.querySelector('.btn-clear')
let itemsArray = localStorage.getItem('items') ? localStorage.getItem('items') : [];
btnClear.addEventListener('click', function () {
  localStorage.clear();
  while (productContainer.firstChild) {
    productContainer.removeChild(productContainer.firstChild);
  }
  itemsArray = [];
});



//focus
nameN.addEventListener('blur', () => {
  if(nameN.value.length == 0) {
    nameN.classList.remove('error');
    nameN.closest('.form-group').querySelector('.invalid-feedback').style.display = 'none';
  }
  if(nameN.value.length < 15 && nameN.value.length > 5) {
    nameN.classList.remove('error');
    nameN.closest('.form-group').querySelector('.invalid-feedback').style.display = 'none';
  }
})






const fillCheckboxes = (cityArray) => {
  return cityArray.map((city, index) => `<div class="rows">
<input class="checkbox"  id="box${index + 1}" type="checkbox" />
<label class="checkbox__label" for="box${index + 1}">${city}</label>
</div>`).join('');
  }

$( "select" )
  .change(function () {
    
    $( "select option:selected" ).each(function() {
      container.classList.remove('hidden')
      if(select.value == "Russia") {
       container.innerHTML = `<div class="checkbox select-all">
       <input id="all" type="checkbox" />
       <label class="checkbox__label" for="all">Select all</label>
     </div>` + fillCheckboxes(rusCity)
   
      }
       if(select.value == "USA") {
        container.innerHTML = ''
         container.innerHTML = ''
       container.innerHTML = `<div class="checkbox select-all">
       <input id="all" type="checkbox" />
       <label class="checkbox__label" for="all">Select all</label>
     </div>` + fillCheckboxes(usaCity)
      }
         if(select.value == "Belarus") {
         container.innerHTML = ''
       container.innerHTML = `<div class="checkbox select-all">
       <input id="all" type="checkbox" />
       <label class="checkbox__label" for="all">Select all</label>
     </div>` + fillCheckboxes(belCity);

      } 
      if(document.querySelector('#all')) {
        const all = document.querySelector('#all')
        $('#all').change(function(e) {
          if (e.currentTarget.checked) {
          $('.rows').find('input[type="checkbox"]').prop('checked', true);
        } else {
            $('.rows').find('input[type="checkbox"]').prop('checked', false);
          }
        })
        
      }
     
    });
  
  })


const productName = document.querySelector('.product-name');

if(productName.textContent == '') {
  productName.parentNode.parentNode.remove()
}




  addBtn.addEventListener('click', openPopupHendler);
  cancelBtn.addEventListener('click', closePopupHendler);

























