import { Component, OnInit , ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationComponent } from './registration/registration.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'STD';
  displayedColumns: string[] = [ 'id','Firstname', 'Lastname', 'State', 'DOB','Gender','Action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

constructor(private dailog : MatDialog, private ap:ApiService){

}
 
data:any;
addStudent() {
  const dialogRef = this.dailog.open(RegistrationComponent,{width:'40%'}).afterClosed().subscribe(val =>{
    if(val == 'save'){
      this.getAll();
    }
  });
 }
getAll(){
  return this.ap.getStudent().subscribe({
   next:(data)=>{
       this.data = data;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },error: (err)=>{
      alert("soething wrong"+err)
    }
  })
}
editStudent(row : any){
  this.dailog.open(RegistrationComponent,{width:'40%',data: row}).afterClosed().subscribe(val =>{
    if(val == 'update'){
      this.getAll();
    }
  });
  
}
del: any;
deletStudent(id : number){
this.ap.deleteStudent(id).subscribe( res=>{
  
  alert('deleted sucessfully' + res);
  this.getAll();
},(error)=>{
  alert("something went wrong" + error)
})

}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
ngOnInit(): void {
  
  this.getAll();
}
}
