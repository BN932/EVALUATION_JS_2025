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
    let firstname = "";
    let lastname = "";
    let email = "";
    this.domElt.querySelector('.btn-delete').addEventListener('click', (e) =>{
        const contact = e.target.closest('.contact-row');
        this.deleteOneById({id: contact.dataset.id, contact: contact});
      });
    this.domElt.querySelector('.btn-edit').addEventListener('click', (e) =>{
        const contact = e.target.closest('.contact-row');
        const contactId = contact.id;
        contact.classList.toggle('isEditing');
        
      });
    }
    deleteOneById(data) {
    const contactId = data.id;
    const contact = data.contact;
    const contactIndex = window.ContactsList.contacts.findIndex((contact) => contact.id === contactId);
    if (contactIndex) {
      window.ContactsList.contacts.splice(contactIndex, 1);
      DB.deleteContact(contactId);
      contact.remove();
      window.ContactsList.getContactCount();
    }
  }
}