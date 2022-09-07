import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RoadRunnerService } from '../services/road-runner/road-runner.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Capacity, MaterialType, Order } from '../models/model';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
})
export class AddOrderComponent implements OnInit {
  originLat: number;
  originLng: number;
  destinationLat: number;
  destinationLng: number;
  capacities: Capacity[] = [
    { code: 'Small', value: 1 },
    { code: 'Medium', value: 2 },
    { code: 'Large', value: 3 },
    { code: 'Extra large', value: 5 },
  ];
  materialTypes: MaterialType[] = [
    { code: 'Dry', value: 1 },
    { code: 'Refridgerated', value: 2 },
    { code: 'Fragile', value: 3 },
  ];
  capacityFormControl = new FormControl('', [Validators.required]);
  materialTypeFormControl = new FormControl('', [Validators.required]);
  weightInKgFormControl = new FormControl('', [Validators.required]);
  contactFormControl = new FormControl('', [Validators.required]);
  addressFormControl = new FormControl('', [Validators.required]);
  pincodeFormControl = new FormControl('', [Validators.required]);
  landmarkFormControl = new FormControl('', [Validators.required]);

  constructor(
    private roadRunnerService: RoadRunnerService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.originLat = parseFloat(sessionStorage.getItem('originLat') ?? '');
    this.originLng = parseFloat(sessionStorage.getItem('originLng') ?? '');
    this.destinationLat = parseFloat(
      sessionStorage.getItem('destinationLat') ?? ''
    );
    this.destinationLng = parseFloat(
      sessionStorage.getItem('destinationLng') ?? ''
    );
  }

  saveOrder() {
    let orderObject: Order = {
      capacity: this.capacityFormControl.value,
      customerId: 'hariashok.1996@gmail.com',
      materialType: this.materialTypeFormControl.value,
      weight: this.weightInKgFormControl.value,
      isRouteAllocated: false,
      deliveryStatus: 'order-received',
      contactNo: this.contactFormControl.value,
      address: this.addressFormControl.value,
      pincode: this.pincodeFormControl.value,
      landmark: this.landmarkFormControl.value,
      orgin: {
        type: 'Point',
        coordinates: [this.originLat, this.originLng],
      },
      destination: {
        type: 'Point',
        coordinates: [this.destinationLat, this.destinationLng],
      },
    };
    console.log(orderObject);
    this.roadRunnerService.saveOrders(orderObject).subscribe((result) => {
      this._snackBar.open('Data saved successfully', 'close');
      this.router.navigateByUrl('home');
      console.log(result);
    });
  }
}
