import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { RestaurentData } from './restaurent.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-dash',
  templateUrl: './restaurant-dash.component.html',
  styleUrls: ['./restaurant-dash.component.css']
})
export class RestaurantDashComponent implements OnInit {
  formValue!: FormGroup;
  restaurentModelObj: RestaurentData = new RestaurentData();
  allRestaurentData: any = [];
  showAdd!: boolean;
  showbtn!: boolean;
  redirectTo: string = './restaurent-dash';

  constructor(private formBuilder: FormBuilder, private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
    });

    this.getRestaurantData(); // Fetch initial restaurant data
  }

  getRestaurantData() {
    this.api.getRestaurent().subscribe(
      (res) => {
        this.allRestaurentData = res["results"];
        console.log('alldata', this.allRestaurentData);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  clickAddRestro() {
    this.formValue.reset();
    this.showAdd = true;
    this.showbtn = false;
  }

  addRestro() {
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.postRestraurent(this.restaurentModelObj).subscribe(
      (res) => {
        console.log(res);
        alert("Restaurant Records Added Successfully ");
        // Clear and reset the form
        let ref = document.getElementById('clear');
        ref.click();
        this.formValue.reset();

        // Fetch updated data
        this.getRestaurantData();
      },
      (err) => {
        console.error(err);
        alert("Something went wrong!");
      }
    );
  }

  onEditRestro(data: any, id: number) {
    this.showAdd = false;
    this.showbtn = true;
    this.restaurentModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }

  updateRestro() {
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.updateRestaurent(this.restaurentModelObj.id, this.restaurentModelObj).subscribe(
      (res) => {
        alert("Restaurant Records Updated");

        // Clear and reset the form
        let ref = document.getElementById('clear');
        ref.click();
        this.formValue.reset();

        // Fetch updated data
        this.getRestaurantData();
      },
      (err) => {
        console.error(err);
        alert("Something went wrong!");
      }
    );
  }

  deleteRestro(data: any) {
    this.api.deleteRestaurent(data.id).subscribe(
      (res) => {
        console.log("Record deleted:", res);
        alert("Restaurant Record Deleted");

        // Fetch updated data
        this.getRestaurantData();
      },
      (err) => {
        console.error(err);
        alert("Something went wrong!");
      }
    );
  }

  logout() {
    this.router.navigate(['/login']);
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
  }
}
