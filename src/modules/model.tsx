export interface PhoneModel {
  calling_code: string;
  phone: string;
}

export interface ProfileModel {
  user: string;
  session_id: string;
  username: string;
  gender: string;
  full_name: string;
  birthday: string;
  email: string;
}
export interface ReLoginModel {
  user: string;
  session_id: string;
}
export interface LoginModel {
  calling_code: string;
  phone: string;
  password: string;
}
export interface VerifyOTPModel extends PhoneModel {
  otp: number;
  action: string;
}
export interface UpdatePasswordModel {
  user: string;
  session_id: string;
  password: string;
}
