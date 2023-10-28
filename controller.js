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
  async addData(title, body, userId){
    const response = await this.apiFetcher.addData(this.url, title, body, userId);
    console.log('Adding data:');
    return response;
  }
  async changeData(postId, title, body, userId){
    const response = await this.apiFetcher.changeData(this.url, postId, title, body, userId)
    console.log('Changing data:');
    return response;
  }
  async changeDataPartially(body, postId){
    const response = await this.apiFetcher.changeDataPartially(this.url, body, postId)
    console.log('Changing data partially:');
    return response;
  }
  async deleteData(postId){
    const response = await this.apiFetcher.deleteData(this.url, postId);
    console.log('Deleted data.');
    return response;
  }

}
