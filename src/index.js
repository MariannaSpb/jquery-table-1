import "./style.css";
import {searchBtn, searchInput, ENTER_KEYCODE, filterTable} from './filter'

const overlay = document.querySelector('.modal-overlay');
const formContainer = document.querySelector('.modal__container-form');
const addBtn = document.querySelector('.btn-add');
const cancelBtn = document.querySelector('.btn-cancel-popup');
const form = document.querySelector('.modal-product');
const formTitle = document.querySelector('.form__title');
//inputs
const nameN = form.elements.name;
const emailN = form.elements.email;
const countN= form.elements.count;
const priceN = form.elements.price;
const deliveryN = form.elements.delivery;
const optionArray = document.querySelectorAll('.select__option');
const option = document.querySelector('.select__option');
const optionContainer = document.querySelector('.select-delivery');

const formatPrice = (num) => {
  return `${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num)}`;
};



class Product {
    //constructor({name, productId, count, supplierEmail, price, delivery: {russia, usa, belarus}}) {
      constructor({name, count, supplierEmail, price, delivery}) {
        this.name = name;
        //this.productId = productId;
        this.count = count;
        this.price = price;
        this.supplierEmail = supplierEmail
        this.delivery = delivery; // [{…}, {…}, {…}]
        // this.russia = russia;
        // this.usa = usa;
        // this.belarus = belarus;
        
    }


    create() {
      const row = document.createElement('tr');
      const nameCell = document.createElement('td');
      const nameLink = document.createElement('a');
      const countCell = document.createElement('span');
      const priceCell = document.createElement('td');
      const actionsCell = document.createElement('td');
      const deleteBtn = document.createElement('button');
      const editeBtn = document.createElement('button');
      const emailCell = document.createElement('p');
      //const deliveryCell = document.createElement('p');
      emailCell.classList.add('product-email');
      emailCell.textContent = this.supplierEmail;
      // deliveryCell.classList.add('product-delivery');
      row.classList.add('row-tabel');
      nameLink.textContent = this.name;
     // nameLink.setAttribute('id', this.productId);
      nameLink.setAttribute('href', '#');
      nameLink.classList.add('product-name');
      countCell.textContent = this.count;
      priceCell.textContent = formatPrice(this.price);
      priceCell.classList.add('product-price');
      countCell.classList.add('count');





      deleteBtn.classList.add('btn-delete');
      editeBtn.classList.add('btn-edite');
      editeBtn.classList.add('btn');
      editeBtn.classList.add('btn-outline-secondary')
      deleteBtn.classList.add('btn');
      deleteBtn.classList.add('btn-outline-secondary')
      deleteBtn.textContent = 'Delete';
      editeBtn.textContent = 'Edite';
      nameCell.classList.add('name-cell')
      actionsCell.classList.add('action-cell')
      nameCell.appendChild(nameLink);
      nameCell.appendChild(countCell);
      nameCell.appendChild(emailCell);
      //nameCell.appendChild(deliveryCell);
      actionsCell.appendChild(editeBtn);
      actionsCell.appendChild(deleteBtn);

      row.appendChild(nameCell);
      row.appendChild(priceCell);
      row.appendChild(actionsCell);

      this.deleteBtn = deleteBtn;
      this.editeBtn = editeBtn;
      

      this.deleteBtn.addEventListener("click", this.delete)
      this.editeBtn.addEventListener("click", this.edite)
      

      // console.log('this.russia = russia', this.russia)
      // console.log('this.delivery', this.delivery)
      
      return row;
      
    }

    delete() {
      const overlay = document.querySelector('.modal-overlay');
      const modalContainer = document.querySelector('.modal__container');
      overlay.classList.remove('hidden');
      modalContainer.classList.remove('hidden');
      const bntAgree = document.querySelector('.btn-agree');
      const bntCancel = document.querySelector('.btn-cancel'); //дописать закрытие
      const titleName= document.querySelector('.modal__title-name')

      productContainer.addEventListener('click', (event) => { 
        if(event.target.closest('.row-tabel').querySelector('.product-name')) {
          titleName.textContent = event.target.closest('.row-tabel').querySelector('.product-name').textContent;
        }
      });
     

     
      bntAgree.addEventListener('click', () => {
        overlay.classList.add('hidden');
        modalContainer.classList.add('hidden')
        this.parentNode.parentNode.remove();
  
      });

      bntCancel.addEventListener('click', () => {
        overlay.classList.add('hidden');
        modalContainer.classList.add('hidden')
      });
     
    }

    edite() {
          overlay.classList.remove('hidden');
          formContainer.classList.remove('hidden');

          productContainer.addEventListener('click', (event) => {
            if(event.target.closest('.row-tabel').querySelector('.product-name')) {
              nameN.value = event.target.closest('.row-tabel').querySelector('.product-name').textContent;
              countN.value = event.target.closest('.row-tabel').querySelector('.count').textContent;
              emailN.value = event.target.closest('.row-tabel').querySelector('.product-email').textContent;
              priceN.value = event.target.closest('.row-tabel').querySelector('.product-price').textContent;
              formTitle.textContent = event.target.closest('.row-tabel').querySelector('.product-name').textContent;
              
          }
        })

        
       
    }

    getDelivery () {
      const createOption = (countryArray) => {
        return countryArray.map((country) => `<option class="select__option" value="">${country}</option>`).join('');
      };
 
      productContainer.addEventListener('click', (event) => {
        if(event.target.closest('.root').querySelector('.select-delivery')) {
        optionContainer.innerHTML = `<option class="select__option" selected></option>`+ createOption(this.delivery)
      }
    })

  

    }
}



class ProductList {
  constructor(container, productsArray) {
    this.container = container;
    this.productsArray = productsArray;
  }
  //создаем новый экземпляр товара  и добавляем его в container
  addProduct({name, count, supplierEmail, price, delivery} = product) {
    const product = new Product({name, count, supplierEmail, price, delivery});
    this.container.appendChild(product.create()); 
 
    product.getDelivery()
  }

  render() {
    this.productsArray.forEach (({name, count, supplierEmail, price, delivery} = obj) => { 
      this.addProduct({name, count, supplierEmail, price, delivery})
    });
  }
}

const productContainer = document.querySelector('#tbody');
const fullTable = document.querySelector('#myTable');



const apiKey = "$2b$10$eSjzRPzLod56mDFXfkN3ReMSTAAo2XTZeqQn7pQVsdliQ6fq8pvZ.";

class Api {
  constructor(optionObj) {
    this.optionObj = optionObj
    this.url = optionObj.baseUrl;
    
  }
  getInitialProducts() { 
    return fetch(`${this.url}`, { 
      headers: {
        method: 'GET',
        'secret-key': apiKey 
      }
    })

      .then(res => {
          if(res.ok) {
            return res.json();
          }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
          if (result) {  
          return result;
        }
    }) 
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
  }

  // addNewProduct() {
  //   return fetch(`${this.url}`, {
  //     method: 'POST',
  //     headers: {
  //       'secret-key': apiKey,
  //       'Content-Type': 'application/json'
  //     },
  
    
  //     body: JSON.stringify({
  //       name: name,
  //       count: count,
  //       price: price
  //     }) 
    
  // })

  // .then(res => {
  //   if (res.ok) {
  //     return res.json();
  //     }
  
  //   return Promise.reject(`Ошибка: ${res.status}`);
  // })

  // .then((result) => { //обрабатываем рузультат
  //   if (result) {
  //     return result
  //     }
  //   })
  // }
  addNewProduct() {
    return fetch(`${this.url}`, {
      method: 'POST',
      headers: {
        'secret-key': apiKey,
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        name: nameN.value,
        count: countN.value,
        price: priceN.value,
        //delivery: delivery
      }) 
    
  })

  .then(res => {
    if (res.ok) {
      return res.json();
      }
  
    return Promise.reject(`Ошибка: ${res.status}`);
  })

  .then((result) => { //обрабатываем рузультат
    if (result) {
      return result

      // productList.addProduct({name, productId, count, supplierEmail, price, delivery} = result);
      // overlay.classList.add('hidden');
      // formContainer.classList.add('hidden');
      // form.reset();
      }
    })
  }



}

const api = new Api({
   baseUrl: 'https://api.jsonbin.io/b/5ea3ec8d98b3d5375234328c', //delivery= [country]
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
    //console.log('elem', element.delivery) // [{…}, {…}, {…}]
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
        const sortedByName = arrayProducts.slice().sort((a, b) => {
            if (a.name < b.name) return -1;
            if (b.name < a.name) return 1;
          return 0;
        });
         console.log('sortedByName', sortedByName)

        let sortedByNameList = new ProductList(productContainer, sortedByName)
        sortedByNameList.render()
      
        break;
      case 'price':
        const sortedByPrice = arrayProducts.slice().sort((a, b) =>  a.price - b.price);
        //console.log('sortedByPrice', sortedByPrice) //массив объектов
        let sortedByPriceList = new ProductList(productContainer, sortedByPrice)
        sortedByPriceList.render()
      
        break;
    
    }
  })

})
.catch((err) => {
  console.log('error',  console.log(err))
})



const openPopupHendler = () => {
  form.reset();
  overlay.classList.remove('hidden');
  formContainer.classList.remove('hidden');
}
const closePopupHendler = () => {
  overlay.classList.add('hidden');
  formContainer.classList.add('hidden');
}

const initialCards = api.getInitialProducts()
.then(result => {
  // console.log('result', result) //[{} {} {}]
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

const REQUIRED_FIELD = "Please, fill this field";
const EMAIL_ERROR = "Email address is in the wrong format";
const SHORT_ERROR = "Name min lenght is 5 characters";
const LONG_ERROR = "Name max lenght is 15 characters";
const ONLY_NUMBERS = "You can enter only numbers";


// form.addEventListener('click', (event) => { 
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
    console.log('validSuccess')
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
//let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : {};
// localStorage.setItem('items', JSON.stringify(itemsArray));

// const data = localStorage.getItem('items');
// console.log('itemsArray', itemsArray)
console.log('localStorage', localStorage)
 //---------------------------------------------------
 productList.addProduct({name, count,  price, delivery});
  closePopupHendler();
})

// productList.addProduct({name, count,  price, delivery} = localStorage);


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


addBtn.addEventListener('click', openPopupHendler)
cancelBtn.addEventListener('click', closePopupHendler)

//All checkboxes
$('#all').change(function(e) {
  if (e.currentTarget.checked) {
  $('.rows').find('input[type="checkbox"]').prop('checked', true);
} else {
    $('.rows').find('input[type="checkbox"]').prop('checked', false);
  }
});







































