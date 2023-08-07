import http from "../Inc/httpcommon";
import IUser from "../Model/user"

class UserDataService {
  getAll() {
    return http.get<Array<IUser>>("/users");
  }

  get(id: string) {
    return http.get<IUser>(`/users/${id}`);
  }

  create(data: IUser) {
    return http.post<IUser>("/user", data);
  }

//   update(data: IUser, id: any) {
//     return http.put<any>(`/tutorials/${id}`, data);
//   }

//   delete(id: any) {
//     return http.delete<any>(`/tutorials/${id}`);
//   }

//   deleteAll() {
//     return http.delete<any>(`/tutorials`);
//   }

//   findByTitle(title: string) {
//     return http.get<Array<IUser>>(`/tutorials?title=${title}`);
//   }
}

export default new UserDataService();