import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/services.service';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, RouterLink, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ImageUploadService } from '../../services/uploadFile.servie';

@Component({
  selector: 'app-personnel',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, RouterLink, HttpClientModule, IonicModule],
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss'],
})
export class PersonnelComponent  implements OnInit {
  data: any;
  searchTerm = '';
  filteredData: any = [];
  employeeForm: FormGroup;
  employeeForm2: FormGroup;
  employeeExits: boolean = false;
  infoAccountDetails: any = [];
  file: any;
  idEmployeeUpdate: any;
  constructor(private dataService: DataService, private router: Router, private formBuilder: FormBuilder, private http: HttpClient) {
    this.dataService.setApiUrl('http://localhost:3080/personnels');
    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['1', Validators.required],
      phone: ['', [Validators.required, this.phoneValidator()]]
    });
    this.employeeForm2 = this.formBuilder.group({
      nameUp: ['', Validators.required],
      emailUp: ['', [Validators.required, Validators.email]],
      roleUp: ['0', Validators.required],
      phoneUp: ['', [Validators.required, this.phoneValidator()]],
      passwordUp: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(36)]]
    });
   }
  phoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /^(03|05|07|08|09)\d{8}$/.test(control.value);
      return valid ? null : { invalidPhone: { value: control.value } };
    };
  }
  changeTypeMessageSubmit() {
    this.employeeExits = false;
    const span = document.querySelector("#message__info");
    if(span) span.textContent = "";
  }
  onSubmit() {
    const email: HTMLInputElement | null = document.querySelector('#inputEmail');
    const phone: HTMLInputElement | null = document.querySelector('#inputPhoneAdd');
    this.employeeExits = this.data.personnel.some(
      (account: any) => account.email === email?.value || account.phone == phone?.value
    );
    console.log(this.employeeExits, this.employeeForm.valid);
    
    if (this.employeeForm.valid && !this.employeeExits) {
      this.http.post('http://localhost:3080/addEmployee', this.employeeForm.value).subscribe(        
        (response: any) => {
          if(response.message === "Success") {
            window.location.reload();
          }
        },
        (error) => {
          console.error('Error logging in:', error);
        }
      );
    }else {
      const span = document.querySelector("#message__info");
      if(span) span.textContent = "Vui lòng điền đủ thông tin!"
    }
  }
  ngOnInit() {
    this.dataService.getItems().subscribe((data: any) => {
      this.data = data;
      this.filteredData = this.data.personnel;
    });
  }
  filterData() {
    this.filteredData = this.data.personnel.filter((item: any) => {
      const searchText = this.searchTerm.toLowerCase();
      return item.name.toLowerCase().includes(searchText);
    });    
  }
  showHiddenAdd() {
    const buttonShowHidden = document.querySelectorAll("#buttonShowHidden1");
    const buttonShowHidden2 = document.querySelectorAll("#buttonShowHidden2");
    buttonShowHidden.forEach((element: any, index: number) => {
      element.onclick = () => {
        const popupElement = document.querySelector('#sectionPopup');
        if (popupElement) {
          popupElement.classList.toggle('popUpAddActive');
        }
      }
    });
    buttonShowHidden2.forEach((element: any, index: number) => {
      element.onclick = () => {
        const popupElement = document.querySelector('#sectionPopup2');
        if (popupElement) {
          popupElement.classList.toggle('popUpAddActive');
          const id = element.children[0].textContent;
          if(id != "") {
            this.idEmployeeUpdate = id;
            this.renderPopupDetail(id);
          }
        }
      }
    });
  }
  renderPopupDetail(id: any) {
    const employee = this.data.personnel.filter((person: any) => person.id == id);
    this.infoAccountDetails = employee[0];
    (document.querySelector("#idPersonnelDelete") as HTMLSpanElement).textContent = employee[0].id;
    (document.querySelector("#nameDetail") as HTMLInputElement).value = employee[0].name;
    (document.querySelector("#emailDetail") as HTMLInputElement).value = employee[0].email;
    (document.querySelector("#phoneDetail") as HTMLInputElement).value = `0${employee[0].phone}`;
    (document.querySelector("#passwordDetail") as HTMLInputElement).value = employee[0].password;
  }
  checkEmailExist() {
    const emailNew = (document.querySelector("#emailDetail") as HTMLInputElement).value;
    const listAccounts = this.data?.personnel;
    if(listAccounts !== undefined) {
      const matchingAccounts = listAccounts.some((account: any) => account.id != this.idEmployeeUpdate && account.email === emailNew);
      return matchingAccounts;
    }
    return false;
  }
  checkPhoneExist() {
    const phoneNew = (document.querySelector("#phoneDetail") as HTMLInputElement).value;
    const listAccounts = this.data?.personnel;
    if(listAccounts !== undefined) {
      const matchingAccounts = listAccounts.some((account: any) => account.id != this.idEmployeeUpdate && `0${account.phone}` === phoneNew);
      return matchingAccounts;
    }
    return false;
  }
  onSubmitUpdate() {
    if(!this.employeeForm2.valid && !this.checkPhoneExist() && !this.checkEmailExist()) {
      const data: any = this.employeeForm2.value;
      if (!data.nameUp) {
        data.nameUp = this.infoAccountDetails.name;
      }
      if (!data.emailUp) {
        data.emailUp = this.infoAccountDetails.email;
      }
      if (!data.phoneUp) {
        data.phoneUp = this.infoAccountDetails.phone;
      }
      if (!data.passwordUp) {
        data.passwordUp = this.infoAccountDetails.password;
      }
      this.http.post('http://localhost:3080/updatePersonnel', {data: data, id: this.infoAccountDetails.id}).subscribe(        
        (response: any) => {
          if(response.message === "Success") {
            window.location.reload();
          }
        },
        (error) => {
          console.error('Error logging in:', error);
        });
    }
  }
  deletePersonnel(){
    const id = document.querySelector("#idPersonnelDelete")?.textContent;
    const spanMessage = document.querySelector("#message__info2") as HTMLInputElement;
    if(this.infoAccountDetails.role === 1) { // leader
      spanMessage.textContent = "Leader không thể xóa!";
    }else {
      // kiểm tra tài khoản có quản lí dự án nào không
      const listIdUserManagerProject = this.data.listIdUserManagerProject;
      const listIdUserManagerTask = this.data.listIdUserManagerTask;
      const isManagarProject = listIdUserManagerProject.some((item: any) => {
        return item.manager == this.infoAccountDetails.id;
      });
      const isManagerTask = listIdUserManagerTask.some((item: any) => {
        return item.taskmanager == this.infoAccountDetails.id;
      });
      if(isManagarProject) {
        spanMessage.textContent = "Người này đang quản lí dự án!";
        return;
      }
      if(isManagerTask) {
        spanMessage.textContent = "Người này đang quản lí nhiệm vụ!";
        return;
      }
      else {
        this.http.post('http://localhost:3080/deletePersonnel', {id}).subscribe(        
          (response: any) => {
            if(response.message === "Success") {
              window.location.reload();
            }
          },
          (error) => {
            console.error('Error logging in:', error);
          });
      }
    }
  }
}
