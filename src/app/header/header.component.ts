import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // isBtnDisabled= true;
  constructor(private router:Router) { }

  ngOnInit(): void {
    // this.isBtnDisabled = true;
  }
  // logout(){
  //   this.router.navigate(['/login']);
  //   sessionStorage.removeItem("token");
  //   localStorage.removeItem("token");
  // }
}
