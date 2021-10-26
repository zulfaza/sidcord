const GetUserToken = async (CurrentUser) => {
  if (CurrentUser) return await CurrentUser.getIdToken();
  else return null;
};

export default GetUserToken;
