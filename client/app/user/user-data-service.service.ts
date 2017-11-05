import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
 import { User } from './user';

@Injectable()
export class UserDataServiceService {

  userList:Array<User> = [];
  lastUserNo:number=0;
  usersUrl:string="api/users";
  
  
constructor(private _http:Http) { 
    let testUser : User = new User(
    {userId:"test1",
      userName:"테스트1",
      userNo:1,
      complete:true,
      userPwd:"test1"
    });

    this.userList.push(testUser);

    // this.userList.push({
    //   userId:"test2",
    //   userName:"테스트2",
    //   userNo:2,
    //   complete:true,
    //   userPwd:"test2"
    // });

    // this.userList.push({
    //   userId:"test3",
    //   userName:"테스트3",
    //   userNo:3,
    //   complete:false,
    //   userPwd:"test3"
    // });


  }

  getUserList2():Array<User>{
    return this.userList;
  }

  addUser(user:User): UserDataServiceService{
    this.lastUserNo++;
    
    user.setUserNo(this.lastUserNo);
    let tUser = new User(user);
    this.userList.push(tUser);
    return this;
  }

  private extractData(res:Response)
  {let body = res.json() || {};
  return body;
}

private handleError(res:Response | any)
{let errMsg : string = 'error';
console.error(errMsg);
return Promise.reject(errMsg);
}

getUsers() : Observable<User[]>{
  return this._http.get(this.usersUrl).map
  (this.extractData).catch
  (this.handleError);
}




}
