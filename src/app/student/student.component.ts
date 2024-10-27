import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { studentdata } from './student.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  showAdd: boolean = true;
  showUpdate: boolean = false;
  studentModelObj: studentdata = new studentdata();
  formValue!: FormGroup;
  allStudentData: any;

  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      email: ['', Validators.required],
      roll: ['', Validators.required],
      mobile: ['', Validators.required],
      city: ['', Validators.required],
      score: ['', Validators.required]
    });
    this.getData();
  }

  add() {
    this.showAdd = true;
    this.showUpdate = false;
    this.formValue.reset();
  }

  edit(data: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.studentModelObj.id = data.id;
    this.formValue.controls['id'].setValue(data.id);
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['roll'].setValue(data.roll);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['city'].setValue(data.city);
    this.formValue.controls['score'].setValue(data.score);
  }

  deleteStudent(data: any) {
    if (confirm('Are you sure to delete?')) {
      this.api.deletestudent(data.id).subscribe(() => {
        alert('Record deleted successfully');
        this.getData();
      });
    }
  }

  onFormSubmit() {
    if (this.formValue.valid) {
      this.studentModelObj.id = this.formValue.value.id;
      this.studentModelObj.name = this.formValue.value.name;
      this.studentModelObj.email = this.formValue.value.email;
      this.studentModelObj.roll = this.formValue.value.roll;
      this.studentModelObj.mobile = this.formValue.value.mobile;
      this.studentModelObj.city = this.formValue.value.city;
      this.studentModelObj.score = this.formValue.value.score;


      if (this.showAdd) {
        this.api.poststudent(this.studentModelObj).subscribe(() => {
          this.formValue.reset();
          alert('Record added successfully');
          this.getData();
        });
      } else if (this.showUpdate) {
        this.api.updatestudent(this.studentModelObj, this.studentModelObj.id).subscribe(() => {
          this.formValue.reset();
          alert('Record updated successfully');
          this.getData();
        });
      }
    }
  }

  getData() {
    this.api.getstudent().subscribe((res: any) => {
      this.allStudentData = res;
    });
  }
}
