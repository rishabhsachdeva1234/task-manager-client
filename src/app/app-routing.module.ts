import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { ManagerComponent } from './components/manager/manager.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/task',
    pathMatch: 'full',
  },
  {
    path: 'task',
    component: ManagerComponent,
  },
  {
    path: 'task/:id',
    component: EditTaskComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
