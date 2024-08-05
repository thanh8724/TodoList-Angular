import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TaskComponent } from './components/task/task.component';
import { PersonnelComponent } from './components/personnel/personnel.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { LoginComponent } from './components/login/login.component';
import { IsLogin } from './guards/auth.guard';
import { IsLeader } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [IsLogin, IsLeader] }, // Trang chủ
  { path: 'personnels', component: PersonnelComponent, canActivate: [IsLogin] }, // Trang giới thiệu 
  { path: 'tasks', component: TaskComponent, canActivate: [IsLogin] }, // Trang sản phẩm
  { path: 'projects', component: ProjectsComponent, canActivate: [IsLogin, IsLeader] }, // Trang sản phẩm
  { path: 'login', component: LoginComponent}, // Trang sản phẩm
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
