import { Component, HostListener, OnInit } from '@angular/core';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})



export class HeaderComponent implements OnInit {

  navBarFixed: boolean = false

  @HostListener('window:scroll', ['$event']) onScroll() {
    if (window.scrollY >= 1) {
      this.navBarFixed = true
    } else this.navBarFixed = false

  }

  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
  }



  get title(): string {
    return this.headerService.headerData.title
  }

  get routeUrl(): string {
    return this.headerService.headerData.routeUrl
  }

  get icon(): string {
    return this.headerService.headerData.icon
  }

}
