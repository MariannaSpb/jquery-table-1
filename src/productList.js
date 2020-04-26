import {Product} from './product'

export class ProductList {
    constructor(container, productsArray) {
      this.container = container;
      this.productsArray = productsArray;
    }
    //создаем новый экземпляр товара  и добавляем его в container
    addProduct({name, count, supplierEmail, price, delivery} = product) {
      const product = new Product({name, count, supplierEmail, price, delivery});
      this.container.appendChild(product.create()); 
      // console.log('this.delivery', product.delivery)


      product.getDelivery()
    }
  
    render() {
      this.productsArray.forEach (({name, count, supplierEmail, price, delivery} = obj) => { 
        this.addProduct({name, count, supplierEmail, price, delivery})
      });
      
      
    }
  }