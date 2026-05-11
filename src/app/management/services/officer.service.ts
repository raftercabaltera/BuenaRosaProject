import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CreateOfficerRequest, Officer } from '../models/officer.model';

@Injectable({
  providedIn: 'root',
})
export class OfficerService {
  private readonly officers = new BehaviorSubject<readonly Officer[]>([]);

  getOfficers(): Observable<readonly Officer[]> {
    return this.officers.asObservable();
  }

  createOfficer(officer: CreateOfficerRequest): Observable<Officer> {
    const createdOfficer: Officer = {
      ...officer,
      id: crypto.randomUUID(),
      officerStatus: 'active',
      createdAt: new Date().toISOString(),
    };

    this.officers.next([...this.officers.value, createdOfficer]);

    return of(createdOfficer);
  }
}
