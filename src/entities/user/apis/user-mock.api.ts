import { Observable } from "rxjs";
import { getAccessToken } from "src/shared";
import { UserModel, mockUserList } from "../user.model";
import { UserApi } from "./user.api";

export class UserMockApi implements UserApi {
    getUserProfile(): Observable<UserModel> {
        return new Observable(subscriber => {
            const accessToken = getAccessToken();
            if (!accessToken) {
                subscriber.error('Unauthorized 401');
                return;
            }
            const userId = accessToken.split('Bearer ').pop();
            console.log('user id: ', userId);
            const hasUser = mockUserList.find(user => user.id === userId);
            if (!hasUser) {
                subscriber.error('Not found 404');
                return;
            }
            subscriber.next(hasUser);
            subscriber.complete();
        });
    }
}