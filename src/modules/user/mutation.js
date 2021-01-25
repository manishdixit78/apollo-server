export default {
  loginUser: async (parent, args, context) => {
    const { payload: { email, password } } = args;
    const { dataSources: { userAPI } } = context;
    const response = await userAPI.loginUser({ email, password });
    const res = JSON.stringify(response);
    return res;
  }
};
