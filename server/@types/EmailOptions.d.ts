export interface IEmailOption {
  email: string;
  subject: string;
  templete: string;
  data: { [key: string]: any };
}
