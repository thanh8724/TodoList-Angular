import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { DataService } from '../../services/services.service';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, RouterLink, HttpClientModule, IonicModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent  implements OnInit {
  projectForm: FormGroup;
  data: any = {};
  searchTerm = '';
  filteredData: any = [];
  projectExits = false;
   constructor(private dataService: DataService, private router: Router, private formBuilder: FormBuilder, private http: HttpClient) {
    this.dataService.setApiUrl('http://localhost:3080/projects');
    this.projectForm = this.formBuilder.group({
      nameProject: ['', Validators.required],
      managerProject: ['1', Validators.required],
      descriptionProject: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.dataService.getItems().subscribe((data: any) => {
      this.data = data;
      this.filteredData = this.data.projects;
      this.updateProjectStatus(); // hàm cập nhật trạng thái project
    });
  }
  getNameManager(idManagar: any) {
    const person = this.data.personnel.find((p: any) => p.id === idManagar);
    return person ? person.name : '';
  }
  filterData() {
    this.filteredData = this.data.projects.filter((item: any) => {
      const searchText = this.searchTerm.toLowerCase();
      return item.name.toLowerCase().includes(searchText);
    });
  }
  classCard: string = 'h-[12em] w-full border-2 border-[rgba(75,30,133,0.5)] rounded-xl text-white font-nunito p-[1em] flex justify-center items-left flex-col gap-[0.75em] backdrop-blur-[12px]';
  showHiddenAdd() {
    const buttonShowHidden = document.querySelectorAll("#buttonShowHidden");
    buttonShowHidden.forEach((element: any) => {
      element.onclick = () => {
        const popupElement = document.querySelector('#sectionPopup');
        if (popupElement) {
          popupElement.classList.toggle('popUpAddActive');
        }
      }
    });
  }
  changeTypeProjectExits() {
    this.projectExits = false;
    const span = document.querySelector("#message__info");
    if(span) span.textContent = ""
  }
  onSubmit() {
    const nameProject: HTMLInputElement | null = document.querySelector("#inputNameProject");
    if(nameProject) {
      this.projectExits = this.data.projects.some((project: any) => project.name === nameProject.value);
    }
    
  if (this.projectForm.valid && !this.projectExits) {
    this.http.post('http://localhost:3080/postProject', this.projectForm.value).subscribe(        
        (response: any) => {
          if(response.message === "Success") {
            window.location.reload();
          }
        },
        (error) => {
          console.error('Error logging in:', error);
        }
      );
  } else {
    const span = document.querySelector("#message__info");
    if(span) span.textContent = "Vui lòng điền đủ thông tin!"
  }
  }
  getProgressByProject(projectId: any) {
    const projectProgress = this.data.progressTask.filter((task: any) => task.idProject === projectId);
    return projectProgress.map((task: any) => task.progress);
  }
  updateProjectStatus() {
    let dataUpdate: any = [];
    this.data.projects.forEach((project: any) => {
      const projectProgress = this.getProgressByProject(project.id);
      if(projectProgress.length == 0) {
        project.progress = 1;
      }else {
        if (projectProgress.every((progress: any) => progress === 3)) {
          project.progress = 2;
        } else if (projectProgress.some((progress: any) => progress === 1 || progress === 2)) {
          project.progress = 1;
        }
      }
      dataUpdate.push(project);
      this.http.post('http://localhost:3080/updateProgressProject', project).subscribe(        
          (response: any) => {
            // if(response.message === "Success") {
            //   window.location.reload();
            // }
          },
          (error) => {
            console.error('Error logging in:', error);
          });
    });
  }
  deleteProject(id: any) {
    const projectDone = this.data.projects.some((project: any) => project.id === id && project.progress == 2);
    if (projectDone) {
      this.http.post('http://localhost:3080/deleteProject', {id}).subscribe(        
          (response: any) => {
            if(response.message === "Success") {
              window.location.reload();
            }
          },
          (error) => {
            console.error('Error logging in:', error);
          });
    }else {
      alert("Dự án chưa hoàn thành không thể xóa!")
    }
  }
}
