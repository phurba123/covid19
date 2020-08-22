import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StatsComponent } from './stats/stats.component';
import { SharedModule } from './shared/shared.module';
import { AppService } from './app.service';

import {HttpClientModule} from '@angular/common/http';
import { MyJsonPipe } from './my-json.pipe';

// ng2-charts module import
import {ChartsModule} from 'ng2-charts';
import {FormsModule} from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StatsComponent,
    MyJsonPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    ChartsModule,
    FormsModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
