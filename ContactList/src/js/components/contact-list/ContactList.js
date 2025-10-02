import Contact from '../contact/Contact.js';
import templateList from './template.js';
import DB from '../../DB.js';

export default class ContactsList {
    constructor(data){
        this.target = document.querySelector(data.target);
        DB.setApiUrl(data.url);
        this.contacts = [];
        this.loadContacts();
    }
    async loadContacts() {
        const contactList = await DB.findAll();
        this.contacts = contactList.map((contact) => new Contact(contact));
        this.render();
        this.getContactCount();
    }
    render(){
        this.target.innerHTML = templateList(this);
        this.initEars();
    }

    getContactCount(){
      this.target.querySelector('.count').innerText = this.contacts.length;
    }

    initEars(){
      let firstname = "";
      let lastname = "";
      let email = "";
      this.target.querySelector('.form').addEventListener('click', (e) => {
        if(e.target.matches('.firstname')){
          e.target.addEventListener('change', () =>{
            firstname = e.target.value;
            e.target.value = "";
          })
        };
        if(e.target.matches('.lastname')){
          e.target.addEventListener('change', ()=>{
            lastname = e.target.value;
            e.target.value = "";
          })
        };
        if(e.target.matches('.email')){
          e.target.addEventListener('change', ()=>{
            email = e.target.value;
            e.target.value = "";
          })
        };
        if(e.target.matches('.addContact')){
          this.addContact({firstname: firstname, lastname: lastname, email: email});
        };
      });
      this.target.querySelector('.btn-delete').addEventListener('click', (e) =>{
        console.log(e.target.closest('.contact-row'));
      });
    };

    async addContact(data) {
    const contactDB = await DB.createNewContact(data);
    const newContact = new Contact(contactDB);
    this.contacts.push(newContact);
    const contactListElt = this.target.querySelector('.contactList');
    const newTr = document.createElement('div');
    contactListElt.append(newTr);
    newTr.outerHTML = newContact.render();
    this.getContactCount();
  }
  delete(data) {
    const contactId = data.id;
    const contact = data.contact.closest('li');
    const contactIndex = this.contacts.findIndex((contact) => contact.id === contactId);
    if (contactsIndex) {
      this.contacts.splice(contactIndex, 1);
      DB.deleteTodo(contactId);
      contact.remove();
    }
  }
};
