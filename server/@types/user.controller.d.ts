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
  isSocialAuth: boolean;
  avatar: {
    public_id?: string;
    url?: string;
  };
}

export interface IActivationRequest {
  activation_token: string;
  activation_code: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface ISocialAuthBody {
  name: string;
  email: string;
  isSocialAuth: boolean;
  avatar: {
    public_id?: string;
    url?: string;
  };
}

export interface IUpdateUserInfo {
  name?: string;
  email?: string;
}

export interface IUpdatePassword {
  oldPassword: string;
  newPassword: string;
}

export interface IUpdateProfile {
  avatar: string;
}
