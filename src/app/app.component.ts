import {Component, OnInit} from '@angular/core';
import {RoadRunnerService} from "./services/road-runner/road-runner.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'road-runner-customer-app';

  result: any;
  constructor(private roadRunnerService: RoadRunnerService) {
  }

  ngOnInit(): void {
  }


}
