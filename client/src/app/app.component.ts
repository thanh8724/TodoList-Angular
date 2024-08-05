import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'TODO - LIST';
  liTag: any;
  role: any;
  ngOnInit() {
    this.liTag = document.querySelectorAll("li");
    
    this.liTag.forEach((li: any) => {
      li.onclick = () => {
        const pathParts = window.location.pathname.split('/');
        const nameUrl = pathParts[pathParts.length - 1];
         this.liTag.forEach((li: any) => {
          li.classList.remove("li-active");
         });
        document.querySelector("#"+nameUrl+"Nav")?.classList.toggle("li-active");
      }
    });
    this.role = sessionStorage.getItem("role");
    if(this.role == '0' ) {
      this.liTag[2].classList.toggle("li-active");
      (document.querySelector("#roleShow") as HTMLSpanElement).textContent =  "Nhân viên";   
    }else {
      this.liTag[0].classList.toggle("li-active");
      (document.querySelector("#roleShow") as HTMLSpanElement).textContent =  "Leader";   
    }
  }
  lockOut() {
    const roleSession = sessionStorage.getItem("role");
    const jwtSession = sessionStorage.getItem("jwt");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("jwt");
    window.location.href = "http://localhost:4200/login";
  }
}
