import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { DataService } from '../../services/services.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  data: any;
  constructor(private dataService: DataService, private router: Router) {
    this.dataService.setApiUrl('http://localhost:8080');
  }
  ngOnInit(): void {
    this.dataService.getItems().subscribe((data: any) => {
      this.data = data;
    });
  }
  classCard: string = 'h-[12em] w-full border-2 border-[rgba(75,30,133,0.5)] rounded-xl bg-gradient-to-br from-[rgba(75,30,133,1)] to-[rgba(75,30,133,0.01)] text-white font-nunito p-[1em] flex justify-center items-left flex-col gap-[0.75em] backdrop-blur-[12px]';
}
