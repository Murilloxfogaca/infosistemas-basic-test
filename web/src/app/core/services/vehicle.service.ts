import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Vehicle } from '../../features/vehicles/vehicle.model';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  private readonly url = `${environment.apiUrl}/vehicles`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.url);
  }

  getById(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.url}/${id}`);
  }

  create(vehicle: Omit<Vehicle, 'id'>): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.url, vehicle);
  }

  update(id: number, vehicle: Omit<Vehicle, 'id'>): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${this.url}/${id}`, vehicle);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
