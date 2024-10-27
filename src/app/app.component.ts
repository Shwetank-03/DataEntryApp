import { Component } from '@angular/core';
import { StudentComponent } from './student/student.component';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'student';
constructor(){

}
  openStudentComponent(){
    StudentComponent
  }
}
