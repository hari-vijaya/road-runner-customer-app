import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Order } from 'src/app/models/model';

@Injectable({
  providedIn: 'root'
})
export class RoadRunnerService {

  constructor(private httpClient: HttpClient) {
  }

  getAllVehicles() {
    return this.httpClient.get('https://road-runner-crud-7zjtqk6yoq-el.a.run.app?operation=UPDATE&collection=vehicles');
  }

  saveOrders(order: Order) {
    console.log(order);
    return this.httpClient.post('https://road-runner-crud-7zjtqk6yoq-el.a.run.app?operation=CREATE&collection=orders', order);
  }

}
