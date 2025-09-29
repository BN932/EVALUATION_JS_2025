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
        this.contactsCount = this.contacts.length;
        this.render();
    }
    render(){
        this.target.innerHTML = templateList(this);
    }
};
