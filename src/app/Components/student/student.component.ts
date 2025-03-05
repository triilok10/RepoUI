import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiConfig } from '../../../apiConfig';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  url = ApiConfig.apiUrl;

  students: any[] = [];

  showModal = false;

  studentForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobileNumber: new FormControl('', [Validators.required]),
    address: new FormControl(''),
    gender: new FormControl('', [Validators.required])
  })



  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.PageLoad();
  }

  openModel(): void {
    this.showModal = true;
  }

  closeModel(): void {
    this.showModal = false;
  }

  formValue: any

  onSave(): void {
    if (this.studentForm.valid) {
      this.formValue = this.studentForm.value;
      this.http.post(this.url + 'api/Student/AddStudents', this.formValue)
        .subscribe({
          next: (response) => {
            console.log(response);
            this.closeModel();
            this.studentForm.reset();
          },
          error: (error) => {
            console.error('Error:', error);
          }
        });
    } else {
      console.log('Form is invalid');
    }
  }

  PageLoad() {
    debugger;
    this.http.get(this.url + 'api/Student/GetAllStudents').subscribe({
      next: (res: any) => {
        if (res.status == 1) {
          console.log("data", res.data)
          this.students = res.data;
          console.log("Data from API", this.students)
        }
      }
    })
  }

  EditDetails(studentID: any) {
    debugger;
    this.http.get(`${this.url}api/Student/GetRecord?studentID=${studentID}`).subscribe({
      next: (res: any) => {
        debugger;
        console.log('Response:', res);
        this.studentForm.patchValue({
          firstName: res.firstName,
          lastName: res.lastName,
          email: res.email,
          mobileNumber: res.mobileNumber,
          address: res.address,
          gender: res.gender,
        });
        this.openModel();

        console.log('st', this.studentForm)
      }
    })
    alert(studentID);
  }

  DeleteStudent(id: any) {
    debugger;
    alert(id);
  }


}
