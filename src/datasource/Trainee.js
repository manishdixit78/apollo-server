import { RESTDataSource } from 'apollo-datasource-rest';
import config from '../config/configurations';

export default class TraineeAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${config.SERVICE_URL}/api`;
  }

  willSendRequest(request) {
    request.headers.set('Authorization', this.context.token);
  }

  getTrainees({ skip, limit, sort }) {
    return this.get('/trainee', { skip, limit, sort });
  }

  createTrainee(payload) {
    return this.post('/trainee', payload);
  }

  updateTrainee(payload) {
    return this.put('/trainee', payload);
  }

  deleteTrainee(id) {
    return this.delete(`/trainee?originalId=${id}`);
  }
}
