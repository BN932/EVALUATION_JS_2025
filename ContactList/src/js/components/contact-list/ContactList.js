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
        this.render(this.contacts);
        this.getContactCount();
    }
    render(list){
        this.target.innerHTML = templateList();
        list.forEach((contact => {contact.render(this.target.querySelector('.contactList'))}));
        this.initEars();
    }

    getContactCount(){
      this.target.querySelector('.count').innerText = this.contacts.length;
    }
    filterByKey(contact){
      if(contact.firstname.includes(this)  || contact.lastname.includes(this) || contact.email.includes(this) ) {return contact};
    };

    initEars(){
      let firstname = "";
      let lastname = "";
      let email = "";
      const form = this.target.querySelector('.form');
      //Set up listener on the form fields, capture the event & store the form field in the matching variable.
      form.querySelector('.firstname').addEventListener('input', (e) =>{
            firstname = e.target;
      })
      form.querySelector('.lastname').addEventListener('input', (e) =>{
            lastname = e.target;
      });
      form.querySelector('.email').addEventListener('input', (e) =>{
            email = e.target;
      })
      //Set up listener on submit btn, capture event, launch method addContact with values collected earlier and reset form field values.
      form.querySelector('.addContact').addEventListener('click', () =>{
          this.addContact({firstname: firstname.value, lastname: lastname.value, email: email.value});
          firstname.value = "";
          lastname.value = "";
          email.value = "";
      })
      this.target.querySelector('.searchBar').addEventListener('change', (e) => {
          const filter = e.target.value;
          const filteredContactsList = this.contacts.filter(this.filterByKey, filter);
          this.render(filteredContactsList);
      })
      this.target.querySelector('.sort-firstname').addEventListener('click', (e) => {
        const contacts = this.contacts;
        const sortedContacts = contacts.sort((a,b) => a.firstname.localeCompare(b.firstname));
        this.render(sortedContacts);
      })

      this.target.querySelector('.sort-lastname').addEventListener('click', (e) => {
        const contacts = this.contacts;
        const sortedContacts = contacts.sort((a,b) => a.lastname.localeCompare(b.lastname));
        this.render(sortedContacts);
      })

      this.target.querySelector('.sort-email').addEventListener('click', (e) => {
        const contacts = this.contacts;
        const sortedContacts = contacts.sort((a,b) => a.email.localeCompare(b.email));
        this.render(sortedContacts);
      })

    };

    async addContact(data) {
      const contactDB = await DB.createNewContact(data);
      const newContact = new Contact(contactDB);
      this.contacts.push(newContact);
      const contactListElt = this.target.querySelector('.contactList');
      newContact.render(contactListElt);
      this.getContactCount();
  };
};
