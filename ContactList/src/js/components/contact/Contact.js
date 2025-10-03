import './style.css';
import templateContact from './template.js';
import DB from '../../DB.js';
export default class Contact{

    constructor(data){
        this.id = data.id;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.email = data.email;
        this.domElt = null;
    }
    render(element){
        const template = document.createElement("template");
        template.innerHTML = templateContact(this);
        this.domElt = template.content.firstElementChild;
        element.append(this.domElt);
        this.initEars();
  
    }
    initEars(){
    //COLLECT DEFAULT VALUES FOR UPDATE ROUTE
    let firstname = this.domElt.querySelector('.input-firstname').value;
    let lastname = this.domElt.querySelector('.input-lastname').value;
    let email = this.domElt.querySelector('.input-email').value;
    //DELETE
    this.domElt.querySelector('.btn-delete').addEventListener('click', () =>{
        this.deleteOneById({id: this.domElt.dataset.id});
      });
    //TOGGLE ISEDITING
    this.domElt.querySelector('.btn-edit').addEventListener('click', () =>{
        this.domElt.classList.toggle('isEditing');
      });
    //CAPTURE INPUTS FOR UPDATE ROUTES
    this.domElt.querySelector('.input-firstname').addEventListener('input', (e)=>{
            firstname = e.target.value;});
    this.domElt.querySelector('.input-lastname').addEventListener('input', (e)=>{
            lastname = e.target.value;});
    this.domElt.querySelector('.input-email').addEventListener('input', (e)=>{
            email = e.target.value;});
    //SET UPDATE ROUTE IN MOTION WITH NECESSARY DATA
    this.domElt.querySelector('.btn-check').addEventListener('click', ()=>{
        const contactId = this.domElt.dataset.id;
        this.editOneById({firstname : firstname, lastname: lastname, email: email, id: contactId});
    });
        
    }
    deleteOneById(data) {
    // Collect contact id
    const contactId = data.id;
    //Identify index of the contact item in the contacts array.
    const contactIndex = window.ContactsList.contacts.findIndex((contact) => contact.id === contactId);
    //Update local array
      window.ContactsList.contacts.splice(contactIndex, 1);
    //Update API
      DB.deleteOneById(contactId);
    //Update display
      this.domElt.remove();
    //Update contacts count on display
      window.ContactsList.getContactCount();

  }
  editOneById(data){
    const index = window.ContactsList.contacts.findIndex((contact) => contact.id === data.id);
    //Locate the contact object, update its values.
    const contact = window.ContactsList.contacts[index];
    contact.firstname = data.firstame;
    contact.lastname = data.lastname;
    contact.email = data.email;
    //Update display
    this.domElt.querySelector('.label-firstname').innerText = data.firstname;
    this.domElt.querySelector('.label-lastname').innerText = data.lastname;
    this.domElt.querySelector('.label-email').innerText = data.email;
    this.domElt.classList.toggle('isEditing');

    //Update API
    DB.updateOneById(data);
  }
}