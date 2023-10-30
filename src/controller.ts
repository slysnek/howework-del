import Fetch from './fetchApi';
import { AddTaskForm, IAddTask, IGetTasks } from './types';
import XMLHTTP from './xmlHTTP';

export default class Controller {
  url: URL;
  dataFetcher: Fetch | XMLHTTP;

  constructor(url: URL, dataFetcher: Fetch | XMLHTTP) {
    this.url = url;
    this.dataFetcher = dataFetcher;
  }

  async getData(): Promise<IGetTasks[]> {
    const response = await this.dataFetcher.getData(this.url);
    console.log('Getting data:');
    return response;
  }
  async addData(formData: AddTaskForm): Promise<IAddTask> {
    const response = await this.dataFetcher.addData(this.url, formData);
    console.log('Adding data:');
    return response;
  }
  async changeData(id, name, info, isCompleted, isImportant) {
    const response = await this.dataFetcher.changeData(this.url, id, name, info, isCompleted, isImportant)
    console.log('Changing data:');
    return response;
  }
  async changeDataPartially(info, id) {
    const response = await this.dataFetcher.changeDataPartially(this.url, info, id)
    console.log('Changing data partially:');
    return response;
  }
  async deleteData(id) {
    const response = await this.dataFetcher.deleteData(this.url, id);
    console.log('Deleted data.');
    return response;
  }

}
