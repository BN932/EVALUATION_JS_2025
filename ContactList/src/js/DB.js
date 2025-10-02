export default class DB{
    static setApiUrl(url){
        this.url = url;
    }
    static async findAll(){
        const response = await fetch(this.url + "contactList");
        return response.json();
    }
    static async createNewContact(content) {
        const response = await fetch(this.url + "contactList", {method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify({firstname: content.firstname, lastname: content.lastname, email: content.email}),})
        return response.json();
    }
    static async deleteContact(id){
        const response = await fetch(this.url + "contactList/" + id, {method: 'DELETE'});
    }
}