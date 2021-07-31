import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  open(): void {
    if(this.isOpen) {
      console.log("FECHAR")
      this.isOpen = false;
    } else {
      console.log("ABRIR")
      this.isOpen = true;
    }

    
  }

}
