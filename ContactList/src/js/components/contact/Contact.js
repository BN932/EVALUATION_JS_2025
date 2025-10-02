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
    let firstname;
    let lastname;
    let email;
    this.domElt.querySelector('.btn-delete').addEventListener('click', () =>{
        this.deleteOneById({id: this.domElt.dataset.id});
      });
    this.domElt.querySelector('.btn-edit').addEventListener('click', () =>{
        this.domElt.classList.toggle('isEditing');
      });
    this.domElt.querySelector('.input-firstname').addEventListener('input', (e)=>{
            firstname = e.target.value;});
    this.domElt.querySelector('.input-lastname').addEventListener('input', (e)=>{
            lastname = e.target.value;});
    this.domElt.querySelector('.input-email').addEventListener('input', (e)=>{
            email = e.target.value;});
    this.domElt.querySelector('.btn-check').addEventListener('click', ()=>{
        const contactId = this.domElt.dataset.id;
        this.editOneById({firstname : firstname, lastname: lastname, email: email, id: contactId});
    });
        
    }
    deleteOneById(data) {
    const contactId = data.id;
    const contactIndex = window.ContactsList.contacts.findIndex((contact) => contact.id === contactId);
    if (contactIndex) {
      window.ContactsList.contacts.splice(contactIndex, 1);
      DB.deleteOneById(contactId);
      this.domElt.remove();
      window.ContactsList.getContactCount();
    }
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