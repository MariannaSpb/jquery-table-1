
export const apiKey = "$2b$10$eSjzRPzLod56mDFXfkN3ReMSTAAo2XTZeqQn7pQVsdliQ6fq8pvZ.";

export class Api {
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
