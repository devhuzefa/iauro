import { Component, Inject, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private formbuild:FormBuilder, private api : ApiService , 
    @Inject(MAT_DIALOG_DATA) public editdata: any,
    private dailogref : MatDialogRef<RegistrationComponent>) { }



  labelPosition : any;
  StudentDetails !: FormGroup;
  res: any;
  actionbtn: string = 'save';
  updateStudent(){
    this.api.putStudent(this.StudentDetails.value , this.editdata.id).subscribe(
      (data)=>{
        
        alert("successfully edited" + data);
        this.StudentDetails.reset();
        this.dailogref.close('update');
      },err=>{
        alert('something gone wrong'+" "+"maye"+err);
      }
    )
  }
  
  saveStd(){
     if(!this.editdata){
      if(this.StudentDetails.valid){
        this.api.addstudent(this.StudentDetails.value).subscribe(
          (data)=>{
            data = this.StudentDetails;
            // console.log(data)
            alert("sucessfully added")
            this.StudentDetails.reset();
            this.dailogref.close('save');
          },
           (err)=>{
            alert("error while adding" + err)
          }
        )
      }else{
        this.updateStudent();
      }
     }
    }

 
  ngOnInit(): void {
    this.StudentDetails = this.formbuild.group({
      Firstname : ['', Validators.required],
      Lastname : ['', Validators.required],
      State :['', Validators.required],
      DOB : [''],
      Gender : ['', Validators.required]
  
    });
    if(this.editdata){
      this.actionbtn= 'update';
      this.StudentDetails.controls['Firstname'].setValue(this.editdata.Firstname);
      this.StudentDetails.controls['Lastname'].setValue(this.editdata.Lastname);
      this.StudentDetails.controls['State'].setValue(this.editdata.State);
      this.StudentDetails.controls['DOB'].setValue(this.editdata.DOB);
      this.StudentDetails.controls['Gender'].setValue(this.editdata.Gender);
    }
    
    
  }

}
