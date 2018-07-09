import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { BasketComponent } from './basket/basket.component';
import { BasketService } from './services/basket.service';
import { ProductsRepositoryService } from './services/products-repository.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    HomeComponent,
    BasketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    ProductsRepositoryService,
    BasketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
