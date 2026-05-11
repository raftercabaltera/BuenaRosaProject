import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CreateResidentRequest, Resident } from '../models/resident.model';

@Injectable({
  providedIn: 'root',
})
export class ResidentService {
  private readonly residents = new BehaviorSubject<readonly Resident[]>([]);

  getResidents(): Observable<readonly Resident[]> {
    return this.residents.asObservable();
  }

  createResident(resident: CreateResidentRequest): Observable<Resident> {
    const createdResident: Resident = {
      ...resident,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    this.residents.next([...this.residents.value, createdResident]);

    return of(createdResident);
  }
}
