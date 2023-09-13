export interface IRegistretion {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export interface IActivationInfo {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export interface IActivationRequest {
  activation_token: string;
  activation_code: string;
}
