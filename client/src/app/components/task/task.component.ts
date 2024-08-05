import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, RouterLink, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DataService } from '../../services/services.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, RouterLink, HttpClientModule, IonicModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent  implements OnInit {
  data: any = [];
  searchTerm = '';
  filteredData: any = [];
  taskForm: FormGroup;
  taskExits: boolean = false;
  selectedPersonnelIds: string[] = [];
  priorityUpdate: any;
  dateUpdate: any;
  selectedManagerId: any;
  idTaskUpdate: any;
  constructor(private dataService: DataService, private router: Router, private formBuilder: FormBuilder, private http: HttpClient) {
    this.dataService.setApiUrl('http://localhost:3080/tasks');
    this.taskForm = this.formBuilder.group({
      task: ['', Validators.required],
      project: ["", Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      priority: ['1', Validators.required]
    });
  }
 ngOnInit() {
    this.dataService.getItems().subscribe((data: any) => {
      this.data = data;
      this.filteredData = this.data.tasks;
    });
  }
  filterData() {
    this.filteredData = this.data.tasks.filter((item: any) => {
      const searchText = this.searchTerm.toLowerCase();
      return item.name.toLowerCase().includes(searchText);
    });    
  }
  blurInput() {
    const nameTask: HTMLInputElement | null = document.querySelector('#nameTaskInput');
    this.taskExits = this.data.tasks.some(
    (task: any) => task.name == nameTask?.value
    )
  }
  changeTypeMessage() {
    this.taskExits = false;
    const span = document.querySelector('#message__info');
    if(span) span.textContent = "";
  }
  getNameProject(id: any) {
    const project = this.data.projects.find((p: any) => p.id == id);
    return project ? project.name : '';
  }
  onSubmit() {
    if (this.taskForm.valid) {
      this.http.post('http://localhost:3080/postTask', this.taskForm.value).subscribe(        
        (response: any) => {
          if(response.message === "Success") {
            window.location.reload();
          }
        },
        (error) => {
          console.error('Error logging in:', error);
        });
    }else {
      const span = document.querySelector('#message__info');
      if(span) span.textContent = "Vui lòng điền đủ thông tin!";
    }
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
          this.idTaskUpdate = id;
          if(id) {
            this.renderPopUpDetail(id);
          }
        }
      }
    });
  }
  renderPopUpDetail(id: any) {
    this.data.personnels_task.filter((item: any) => {
      if(item.idTask == id) {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((element: any) => {
          const idEmployee = element.getAttribute('id');
          if (idEmployee == item.idPersonnel) {
            element.checked = true;
          }
        });
      }
    }); // render nguoi trong du an

    this.data.tasks.forEach((task: any) => {
      const selecteds = document.querySelectorAll('input[type="radio"]');
      selecteds.forEach((element: any) => {
        const id = element.getAttribute('id');
        if(id == task.taskManager) {
          element.checked = true;
        }
      });
    })

    const task = this.data.tasks.filter((task: any) => task.id == id);
    const optionDetails = document.querySelectorAll("#optionDetail");
    const progressOption = document.querySelectorAll("#progressOption");
    const optionDetailsArray: any = Array.from(optionDetails);
    const progressOptionsArray: any = Array.from(progressOption);

    optionDetailsArray[Number(task[0].priority) - 1].selected = true;
    progressOptionsArray[Number(task[0].progress) -1].selected = true;
    
    (document.querySelector("#idTaskDelete") as HTMLSpanElement).textContent = task[0].id;
    (document.querySelector("#nameTaskInputDetail") as HTMLInputElement).value = task[0].name;
    (document.querySelector("#date_endDetail") as HTMLInputElement).value = this.formatDayMonthYear(new Date(task[0].date), "ymd");
    (document.querySelector("#dateStartDetail") as HTMLSpanElement).textContent =  this.formatDayMonthYear(new Date(task[0].date_start), "dmy");
  }
  formatDayMonthYear(date: any, option: string): any {
      const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    if(option == "dmy") {
      return `${day}-${month}-${year}`;
    }else if(option == "ymd") {
      return `${year}-${month}-${day}`;
    }
  }
  updateSelectedPersonnel(id: string, isChecked: boolean) {
    if (isChecked) {
      this.selectedPersonnelIds.push(id);
    } else {
      const index = this.selectedPersonnelIds.indexOf(id);
      if (index !== -1) {
        this.selectedPersonnelIds.splice(index, 1);
      }
    }
  }
  isManagerSelected(): boolean {
    return this.selectedManagerId !== undefined && this.selectedManagerId !== '';
  }
  onSubmitUpdate() {
    this.priorityUpdate = (document.querySelector('#priorityUpdate') as HTMLSelectElement).value;
    this.dateUpdate = (document.querySelector('#date_endDetail') as HTMLInputElement).value;
    const progressUpdate = (document.querySelector('#progressUpdate') as HTMLSelectElement).value;
    const allInputs = document.querySelectorAll('input');

    // Lọc ra các checkbox và radio button được check
    const checkedInputs = Array.from(allInputs).filter(input => {
      return (input.type === 'checkbox' || input.type === 'radio') && input.checked;
    });
    if (checkedInputs.length == 0) {
      (document.querySelector("#message__infoUpdate") as HTMLSpanElement).textContent = "Vui lòng điền đủ thông tin!";
    }else if(checkedInputs.length > 0) {
      const dataUpdate = {
        id: this.idTaskUpdate,
        priority: this.priorityUpdate,
        dateEnd: this.dateUpdate,
        manager: this.selectedManagerId,
        progress: progressUpdate,
        employee: this.selectedPersonnelIds
      }
      this.http.post('http://localhost:3080/updateTask', dataUpdate).subscribe(        
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
  deleteTast() {
    const id = document.querySelector("#idTaskDelete")?.textContent;
    const taskSuccess = this.data.tasks.some((task: any) => task.id == id && task.progress == 3);
    if(taskSuccess) {
      this.http.post('http://localhost:3080/deleteTask', {id}).subscribe(        
          (response: any) => {
            if(response.message === "Success") {
              window.location.reload();
            }
          },
          (error) => {
            console.error('Error logging in:', error);
          });
    }else {
      (document.querySelector("#message__infoUpdate") as HTMLSpanElement).textContent = "Nhiệm vụ chưa hoàn thành!";
    }
  }
}
