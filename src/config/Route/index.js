const RouteName = {
  home: "/",
  forgetPassword: "/user/forgot-password",
  editProfile: "/user/edit-profile",
  login: "/user/login",
  register: "/user/register",
  sellerLogin: "/seller/login",
  sellerRegister: "/seller/register",
  sellerForgetPassword: "/seller/forgot-password",
  sellerEditProfile: "/seller/edit-profile",
};
const generateUrlWithParams = (data, oldUrl) => {
  let newUrl = oldUrl;
  let key;
  for (key in data) {
    newUrl = newUrl.replace(`:${key}`, data[key]);
  }
  return newUrl;
};

const generateRouteSet = () => {
  let resRouteSet = {};
  for (let key in RouteName) {
    resRouteSet[key] = (data) => {
      return generateUrlWithParams(data, RouteName[key]);
    };
  }
  return resRouteSet;
};

export const routeSet = generateRouteSet();

export default RouteName;
