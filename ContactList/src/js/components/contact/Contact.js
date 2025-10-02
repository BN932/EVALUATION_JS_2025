import templateContact from './template.js';
export default class Contact{

    constructor(data){
        this.id = data.id;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.email = data.email;
    }
    render(){
        return templateContact(this);
    }
}