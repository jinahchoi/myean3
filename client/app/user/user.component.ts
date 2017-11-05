import { Component, OnInit } from '@angular/core';
import { UserDataServiceService} from './user-data-service.service';
import { User} from './user';

@Component({
  selector: 'app-user',
  template:require( './user.component.html'),
  providers:[UserDataServiceService]
})
export class UserComponent implements OnInit {

    userAge:number;
    userNameList:Array<Object> = [
      {userName:"홍길동" , userNo:6,
      userId:"tt2",
      userPwd:"1",
      userAge:30}
    ];

    userList:Array<User> = [
      {userId:"test1",
        userName:"테스트1" , 
        userNo:1,
        complete:true,
        userPwd:"test1"}
    ];


    
    

  userName:string = "최진아";
  userNum:number = 0;
  errorMsg:string='';

  constructor(private uds: UserDataServiceService) { }

  ngOnInit() {
  }

  addUser():void{
    
    this.userList=this.uds.addUser({
      userId:"tt",
      userNo:1,
      userPwd:"tt",
      userName:"tt",
      complete:true
    }).userList;

    console.log(this.userNameList);
  }

  selectUserList():void{
    this.userList = this.uds.getUserList2();
  }

  updateUser():void{
    this.userNameList[this.userNum]
    ={name:this.userName, age:this.userAge};
    alert('수정완료')
  }

  deleteUser():void{
    let delObj:Object = this.userNameList[this.userNum]  ;
    alert(delObj["name"] + '님 삭제완료');
    this.userNameList.splice(this.userNum,1);

  }

  outputUser(user : User):void{

    let uds2 : UserDataServiceService = this.uds.addUser(user);
    this.userList = uds2.userList; 

  }

  outputTest(isTest:boolean){
    alert(isTest);
  }

  getUsers():void{
   
    this.uds.getUsers().subscribe(
      users =>{
        this.userList = users
        console.log(users);

      },
      error => this.errorMsg = 
      <any>error);
    
  }

  }


