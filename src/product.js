import {productContainer, overlay, formContainer, fullTable, optionContainer, nameN, emailN, countN, priceN, form, formTitle} from './index'

const formatPrice = (num) => {
    return `${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num)}`;
  };

export class Product {
      constructor({name, count, supplierEmail, price, delivery}) {
        this.name = name;
        this.count = count;
        this.price = price;
        this.supplierEmail = supplierEmail
        this.delivery = delivery;
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

      emailCell.classList.add('product-email');
      emailCell.textContent = this.supplierEmail;
      row.classList.add('row-tabel');
      nameLink.textContent = this.name;
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
      actionsCell.appendChild(editeBtn);
      actionsCell.appendChild(deleteBtn);

      row.appendChild(nameCell);
      row.appendChild(priceCell);
      row.appendChild(actionsCell);

      this.deleteBtn = deleteBtn;
      this.editeBtn = editeBtn;
      

      this.deleteBtn.addEventListener("click", this.delete)
      this.editeBtn.addEventListener("click", this.edite)
      nameLink.addEventListener('click', this.edite)
      
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
        return countryArray.map(country => `<option class="select__option" value="${country}">${country}</option>`).join('');
      };
      
      productContainer.addEventListener('click', (event) => {
        if(event.target.closest('.root').querySelector('.select-delivery') && this.delivery == !undefined) {
        optionContainer.innerHTML = `<option class="select__option" selected></option>` + createOption(this.delivery)
      }
    })




    
  }
}







