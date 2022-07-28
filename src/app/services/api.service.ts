import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  addstudent(data:any){
    return this.http.post<any>("http://localhost:3000/StudentList",data)
  }
  getStudent(){
    return this.http.get("http://localhost:3000/StudentList")
  }
  putStudent(data:any , id : number){
    return this.http.put<any>("http://localhost:3000/StudentList/" + id,data)
  }
  deleteStudent(id : number){
    return this.http.delete<any>("http://localhost:3000/StudentList/" + id)
  }
}
