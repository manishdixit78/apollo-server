import pubsub from '../pubsub';
import constant from '../../lib/constant';

export default {
  createTrainee: async (parent, args, context) => {
    const { payload: { email, name, password } } = args;
    const { dataSources: { traineeAPI } } = context;
    const addedTrainee = await traineeAPI.createTrainee({ email, name, password });
    pubsub.publish(constant.subscriptions.TRAINEE_ADDED, { traineeAdded: addedTrainee.data });
    return addedTrainee.data;
  },
  updateTrainee: async (parent, args, context) => {
    const {
      payload: {
        email, name, id
      }
    } = args;
    const { dataSources: { traineeAPI } } = context;
    const updatedTrainee = await traineeAPI.updateTrainee({
      originalId: id, name, email
    });
    pubsub.publish(constant.subscriptions.TRAINEE_UPDATED, { traineeUpdated: updatedTrainee.data });
    return updatedTrainee.data;
  },
  deleteTrainee: async (parent, args, context) => {
    const {
      payload: { id }
    } = args;
    const { dataSources: { traineeAPI } } = context;
    const deletedID = await traineeAPI.deleteTrainee(id);
    pubsub.publish(constant.subscriptions.TRAINEE_DELETED, { traineeDeleted: deletedID });
    return deletedID;
  }
};
