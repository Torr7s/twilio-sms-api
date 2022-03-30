// interface IUser {
//   name: string;
//   email: string;
//   phone_number: string;
// }

declare namespace Express {
  export interface Request {
    user_id: string
  }
}