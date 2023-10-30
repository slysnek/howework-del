import APIFetch from "./api.js";

export default class Controller {

  apiFetcher = new APIFetch();
  constructor(url){
    this.url = url;
  }

  async getData(){
    const response = await this.apiFetcher.getData(this.url);
    console.log('Getting data:');
    return response;
  }
  async addData(name, info, isCompleted, isImportant){
    const response = await this.apiFetcher.addData(this.url, name, info, isCompleted, isImportant);
    console.log('Adding data:');
    return response;
  }
  async changeData(id, name, info, isCompleted, isImportant){
    const response = await this.apiFetcher.changeData(this.url, id, name, info, isCompleted, isImportant)
    console.log('Changing data:');
    return response;
  }
  async changeDataPartially(info, id){
    const response = await this.apiFetcher.changeDataPartially(this.url, info, id)
    console.log('Changing data partially:');
    return response;
  }
  async deleteData(id){
    const response = await this.apiFetcher.deleteData(this.url, id);
    console.log('Deleted data.');
    return response;
  }

}
