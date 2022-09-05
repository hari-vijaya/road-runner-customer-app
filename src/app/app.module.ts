import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {AddOrderComponent} from './add-order/add-order.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ToolBarComponent} from './tool-bar/tool-bar.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {AgmCoreModule} from "@agm/core";
import {HomeComponent} from './home/home.component';
import {BottomNavigationBarComponent} from './bottom-navigation-bar/bottom-navigation-bar.component';
import {MatInputModule} from '@angular/material/input';
import {AgmDirectionModule} from "agm-direction";
import {GooglePlaceModule} from "ngx-google-places-autocomplete";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent,
    AddOrderComponent,
    ToolBarComponent,
    HomeComponent,
    BottomNavigationBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBWNCWizzY1UcYKTG8bzSQxV-gSerIojjg',
      libraries: ['places']
    }),
    GooglePlaceModule,
    AgmDirectionModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
