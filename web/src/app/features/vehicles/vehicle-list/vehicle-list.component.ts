import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VehicleService } from '../../../core/services/vehicle.service';
import { Vehicle } from '../vehicle.model';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss',
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];

  constructor(private vehicleService: VehicleService, private router: Router, 
      private messageService: MessageService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.vehicleService.getAll().subscribe((data) => (this.vehicles = data));
  }

  newVehicle(): void {
    this.router.navigate(['/vehicles/new']);
  }

  editVehicle(id: number): void {
    this.router.navigate(['/vehicles/edit', id]);
  }

  deleteVehicle(id: number): void {
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Veículo removido com sucesso!' })
    this.vehicleService.delete(id).subscribe(() => this.load());
  }
}
