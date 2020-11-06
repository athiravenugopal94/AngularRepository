import { StudentService } from '../student.service';
import { Student } from '../student';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Passpercentage {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {

  student: Student = new Student();
  submitted = false;

  passpercent: Passpercentage[] = [
    {value: '0', viewValue: 'Pass'},
    {value: '1', viewValue: 'Fail'}
  ];

  constructor(private studentService: StudentService,
    private router: Router) { }

  ngOnInit() {
  }

  newstudent(): void {
    this.submitted = false;
    this.student = new Student();
  }

  save() {
    this.studentService
    .createStudent(this.student).subscribe(data => {
      console.log(data)
      this.student = new Student();
      this.gotoList();
    }, 
    error => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/students']);
  }
}
