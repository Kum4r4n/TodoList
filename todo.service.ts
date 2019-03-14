import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

import { environment } from 'src/environments/environment';
import { Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import { map, filter, switchMap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todo : Todo

  todoList : Todo []

  constructor(private http : Http) { }

  


  postEmployee(emp : Todo){

    var body = JSON.stringify(emp);
    var headerOptions = new Headers({'content-type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
     return this.http.post('http://localhost:17136/api/todo',body,requestOptions).pipe(map(x => x.json()));

  }



  getEmployeeList(){

    this.http.get('http://localhost:17136/api/todo').pipe(map((data : Response)=>{

    return data.json() as Todo[];

    })).toPromise().then(x=>{

      this.todoList = x;

    })
  }


  putEmployee(id, emp){

    var body = JSON.stringify(emp);
    var headerOptions = new Headers({'content-type':'application/json'});
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers : headerOptions});
     return this.http.put('http://localhost:17136/api/todo/'+id, body, requestOptions).pipe(map(
       
     res=>res.json()));

  }

  deleteEmployee(id:number){

    return this.http.delete('http://localhost:17136/api/todo/'+id).pipe(map(
      
    res=>res.json()));

 }

}
