export default class DB{
    static setApiUrl(url){
        this.url = url;
    }
    static async findAll(){
        const response = await fetch(this.url + "contactList");
        return response.json();
    }
}