import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ManagerComponent } from './components/manager/manager.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TaskService } from './services/task.service';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertHandlerComponent } from './components/alert-handler/alert-handler.component';
import { AlertHandlerService } from './services/alert-handler.service';
import { ParseErrorInterceptor } from './interceptors/parse-error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ManagerComponent,
    EditTaskComponent,
    AlertHandlerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgbModalModule,
  ],
  providers: [
    TaskService,
    AlertHandlerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ParseErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
