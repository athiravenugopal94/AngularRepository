import { StudentDetailsComponent } from '../student-details/student-details.component';
import { Observable } from "rxjs";
import { StudentService } from "../student.service";
import { Student } from "../student";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { AuthenticationService } from '../login/auth.service';

@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.component.html", 
  styleUrls: ["./student-list.component.css"]
})
export class StudentListComponent implements OnInit {

  students: Observable<Student[]>;
  student: Student;
  submnitted=false;
  showBtn = false;

  constructor(private studentService: StudentService,
    private router: Router, private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.students = this.studentService.getStudentsList();
    if(this.authenticationService.username == "admin"){
        this.showBtn = true;
    }else if(this.authenticationService.username == "student"){
        this.showBtn = false;
    }
  }

  getStudent(id: number) {
    this.studentService.getStudent(id)
    .subscribe(data => {
      console.log(data)
      this.student = data;
      this.router.navigate(['/update/'+id]);
    }, error => console.log(error));
  }

  deleteStudent(id: number) {
    this.studentService.deleteStudent(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  studentDetails(id: number){
    this.router.navigate(['details', id]);
  }
}