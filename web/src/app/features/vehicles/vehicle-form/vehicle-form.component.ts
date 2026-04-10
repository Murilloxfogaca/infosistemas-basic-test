import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VehicleService } from '../../../core/services/vehicle.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule],
  providers: [MessageService],
  templateUrl: './vehicle-form.component.html',
  styleUrl: './vehicle-form.component.scss',
})
export class VehicleFormComponent implements OnInit {
  form!: FormGroup;
  editingId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      placa: ['', Validators.required],
      chassi: ['', Validators.required],
      renavam: ['', Validators.required],
      modelo: ['', Validators.required],
      marca: ['', Validators.required],
      ano: ['', [Validators.required, Validators.min(1900), Validators.max(2100)]],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editingId = Number(id);
      this.vehicleService.getById(this.editingId).subscribe((v) => this.form.patchValue(v));
    }
  }

  get isEditing(): boolean {
    return this.editingId !== null;
  }

  submit(): void {
    if (this.form.invalid) return;
    const value = { ...this.form.value, ano: Number(this.form.value.ano) };

    if (this.isEditing) {
      this.vehicleService.update(this.editingId!, value).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Veículo atualizado com sucesso!' });
          setTimeout(() => this.router.navigate(['/']), 1500);
        },
        error: () => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao atualizar o veículo.' }),
      });
    } else {
      this.vehicleService.create(value).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Veículo cadastrado com sucesso!' });
          setTimeout(() => this.router.navigate(['/']), 1500);
        },
        error: () => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao cadastrar o veículo, possívelmente esses dados já estão cadastrados.' }),
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
