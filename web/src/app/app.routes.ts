import { Routes } from '@angular/router';
import { VehicleListComponent } from './features/vehicles/vehicle-list/vehicle-list.component';
import { VehicleFormComponent } from './features/vehicles/vehicle-form/vehicle-form.component';

export const routes: Routes = [
  { path: '', component: VehicleListComponent },
  { path: 'vehicles/new', component: VehicleFormComponent },
  { path: 'vehicles/edit/:id', component: VehicleFormComponent },
];
