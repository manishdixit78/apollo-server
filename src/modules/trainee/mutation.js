import pubsub from '../pubsub';
import constant from '../../lib/constant';

export default {
  createTrainee: async (parent, args, context) => {
    const { payload: { email, name, password } } = args;
    const { dataSources: { traineeAPI } } = context;
    const addedUser = await traineeAPI.createTrainee({ email, name, password });
    pubsub.publish(constant.subscriptions.TRAINEE_ADDED, { traineeAdded: addedUser });
    const addedUserData = JSON.stringify(addedUser.data);
    return addedUserData;
  },
  updateTrainee: async (parent, args, context) => {
    const {
      payload: {
        email, name, id, role, password
      }
    } = args;
    const { dataSources: { traineeAPI } } = context;
    const updatedUser = await traineeAPI.updateTrainee({
      id, name, email, role, password
    });
    pubsub.publish(constant.subscriptions.TRAINEE_UPDATED, { traineeUpdated: updatedUser });
    const UpdateUserData = JSON.stringify(updatedUser.data);
    return UpdateUserData;
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
