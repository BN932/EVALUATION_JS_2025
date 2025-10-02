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
        this.target.innerHTML = templateList();
        this.contacts.forEach((contact => {contact.render(this.target.querySelector('.contactList'))}));
        this.initEars();
    }

    getContactCount(){
      this.target.querySelector('.count').innerText = this.contacts.length;
    }

    initEars(){
      let firstname = "";
      let lastname = "";
      let email = "";
      const form = this.target.querySelector('.form');
        form.querySelector('.firstname').addEventListener('input', (e) =>{
            firstname = e.target;
          })
        form.querySelector('.lastname').addEventListener('input', (e) =>{
            lastname = e.target;
          });
          form.querySelector('.email').addEventListener('input', (e) =>{
            email = e.target;
          })
        form.querySelector('.addContact').addEventListener('click', () =>{
          this.addContact({firstname: firstname.value, lastname: lastname.value, email: email.value});
          firstname.value = "";
          lastname.value = "";
          email.value = "";
        })
    };

    async addContact(data) {
      const contactDB = await DB.createNewContact(data);
      const newContact = new Contact(contactDB);
      this.contacts.push(newContact);
      const contactListElt = this.target.querySelector('.contactList');
      newContact.render(contactListElt);
      this.getContactCount();
  }
};
