import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {RoadRunnerService} from "../services/road-runner/road-runner.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {

  capacityFormControl = new FormControl('', [Validators.required]);
  materialTypeFormControl = new FormControl('', [Validators.required]);
  weightInKgFormControl = new FormControl('', [Validators.required]);
  addressFormControl = new FormControl('', [Validators.required]);
  landmarkFormControl = new FormControl('', [Validators.required]);

  constructor(private roadRunnerService: RoadRunnerService, private _snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit(): void {
  }


  saveOrder() {
    let orderObject = {
      "capacity": this.capacityFormControl.value,
      "customerId": "hariashok.1996@gmail.com",
      "materialType": this.materialTypeFormControl.value,
      "weight": this.weightInKgFormControl.value,
      "isRouteAllocated": false,
      "deliveryStatus": "transit",
      "expectedDeliveryTime": "",
      "address": this.addressFormControl.value,
      "landmark": this.landmarkFormControl.value,
      "orgin": {
        "type": "Point",
        "coordinates": [
          sessionStorage.getItem('originLat'),
          sessionStorage.getItem('originLng')
        ]
      },
      "destination": {
        "type": "Point",
        "coordinates": [
          sessionStorage.getItem('destinationLat'),
          sessionStorage.getItem('destinationLng')
        ]
      }
    };
    console.log(orderObject);
    this.roadRunnerService.saveOrders(orderObject).subscribe((result) => {
      this._snackBar.open('Data saved successfully', 'close');
      this.router.navigateByUrl('home');
      console.log(result);
    });
  }

}
