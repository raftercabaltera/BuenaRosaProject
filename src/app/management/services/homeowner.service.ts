import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CreateHomeownerRequest, Homeowner } from '../models/homeowner.model';

@Injectable({
  providedIn: 'root',
})
export class HomeownerService {
  private readonly homeowners = new BehaviorSubject<readonly Homeowner[]>([]);

  getHomeowners(): Observable<readonly Homeowner[]> {
    return this.homeowners.asObservable();
  }

  createHomeowner(homeowner: CreateHomeownerRequest): Observable<Homeowner> {
    const createdHomeowner: Homeowner = {
      ...homeowner,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    this.homeowners.next([...this.homeowners.value, createdHomeowner]);

    return of(createdHomeowner);
  }
}
