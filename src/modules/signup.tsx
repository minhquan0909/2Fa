import axios from 'axios';
import {Phone, Profile} from './model';
const BaseURL = 'https://helpmiee.com/api';
const CheckPhoneApi = '/vi/phone-can-register.json';
const SendOTPApi = '/vi/otp/send.json';
const GetOTPApi = '/vi/otp/view/';
const VerifyOTPApi = '/vi/otp/verify.json';
const UpdatePasswordApi = '/vi/password/update.json';
const UpdateProfileApi = '/vi/profile/update.json';
const CheckExistAPI = '/vi/phone-exists.json';
const ReLoginAPI = '/vi/relogin.json';
const LoginAPI = '/vi/login.json';

export const PostFunc = async (TYPE: string, requestData: any) => {
  let POST_API = '';
  switch (TYPE) {
    case 'CheckPhoneCanRegister': //it can be better with enum, but now i dont have time
      POST_API = CheckPhoneApi;
      break;
    case 'SendOTP':
      POST_API = SendOTPApi;
      break;
    case 'VerifyOTP':
      POST_API = VerifyOTPApi;
      break;
    case 'UpdatePassword':
      POST_API = UpdatePasswordApi;
      break;
    case 'ReLogin':
      POST_API = ReLoginAPI;
      break;
    case 'Login':
      POST_API = LoginAPI;
      break;
    case 'UpdateProfile':
      POST_API = UpdateProfileApi;
      break;
    case 'CheckPhoneExist':
      POST_API = CheckExistAPI;
      break;
    default:
      break;
  }
  const res = await axios.post(BaseURL + POST_API, requestData);
  console.log('POST =>>>>>>>', TYPE, res.data);
  return res.data;
};
export const GetFunc = async (TYPE: string, requestData: any) => {
  let GET_API = '';
  switch (TYPE) {
    case 'GetOTP':
      GET_API = GetOTPApi;
      break;
    default:
      break;
  }
  const res = await axios.get(BaseURL + GET_API, {params: requestData});
  console.log('GET =>>>>>>>', TYPE, res.data);
  return res.data;
};
