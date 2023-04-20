import axios from 'axios';
let lang = 'vi';
const BaseURL = 'https://helpmiee.com/api';
const CheckPhoneApi = `/${lang}/phone-can-register.json`;
const SendOTPApi = `/${lang}/otp/send.json`;
const GetOTPApi = `/${lang}/otp/view/`;
const VerifyOTPApi = `/${lang}/otp/verify.json`;
const UpdatePasswordApi = `/${lang}/password/update.json`;
const UpdateProfileApi = `/${lang}/profile/update.json`;
export const CheckPhoneCanRegister = async (phone, callingCode) => {
  const res = await axios.post(BaseURL + CheckPhoneApi, {
    calling_code: callingCode,
    phone: phone,
  });
  // console.log(res.data);
  return res.data;
};
export const SendOTP = async (phone, callingCode) => {
  const res = await axios.post(BaseURL + SendOTPApi, {
    calling_code: callingCode,
    phone: phone,
  });
  return res.data;
};
export const GetOTP = async (calllingCode, phone) => {
  const res = await axios.get(BaseURL + GetOTPApi, {
    params: {
      calling_code: calllingCode,
      phone: phone,
    },
  });
  console.log('OTP response', res.data);
};
export const VerifyOTP = async (calllingCode, phone, otp, action) => {
  const res = await axios.post(BaseURL + VerifyOTPApi, {
    calling_code: calllingCode,
    phone: phone,
    otp: otp,
    action: action,
  });
  return res.data;
};
export const UpdatePassword = async (user, session_id, password) => {
  const res = await axios.post(BaseURL + UpdatePasswordApi, {
    user: user,
    session_id: session_id,
    password: password,
  });
  // console.log('Updated Password',res.data);
  return res.data;
};
export const UpdateProfile = async (
  user,
  session_id,
  username,
  gender,
  full_name,
  birthday,
  email,
) => {
  const res = await axios.post(BaseURL + UpdateProfileApi, {
    user,
    session_id,
    username,
    gender,
    full_name,
    birthday,
    email,
  });
  console.log('UpdateProfile', res.data);
  console.log(user, session_id, username, gender, full_name, birthday, email);
  return res.data;
};
