import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DashboardSummaryCard } from '../models/dashboard-summary-card.model';

const DASHBOARD_SUMMARY_CARDS: readonly DashboardSummaryCard[] = [
  {
    id: 'homeowners',
    label: 'Homeowners',
    value: 0,
    accentColor: '#1f7a52',
    iconBackground: 'rgba(31, 122, 82, 0.13)',
    decorativeBackground: 'rgba(31, 122, 82, 0.1)',
    icon: 'M3 10.75 12 4l9 6.75M5.5 9.75V20h13V9.75M9 20v-4.25a3 3 0 0 1 6 0V20',
    target: {
      key: 'homeowners-list',
      label: 'Homeowners List',
      path: ['Management', 'HOA Profile', 'Homeowners List'],
    },
  },
  {
    id: 'officers',
    label: 'Officers',
    value: 0,
    accentColor: '#256f8f',
    iconBackground: 'rgba(37, 111, 143, 0.13)',
    decorativeBackground: 'rgba(37, 111, 143, 0.1)',
    icon:
      'M8 4h8M10 4v3M14 4v3M6 7h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2ZM9.5 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM7 17a3.5 3.5 0 0 1 5 0M14.5 11h2.5M14.5 15h2.5',
    target: {
      key: 'officers-list',
      label: 'Officers List',
      path: ['Management', 'HOA Profile', 'Officers List'],
    },
  },
  {
    id: 'paid-dues',
    label: 'Paid Dues',
    value: 0,
    accentColor: '#0f766e',
    iconBackground: 'rgba(15, 118, 110, 0.13)',
    decorativeBackground: 'rgba(15, 118, 110, 0.1)',
    icon:
      'M6 3h12v18l-2-1.2-2 1.2-2-1.2-2 1.2-2-1.2L6 21V3ZM9 8h6M9 12h4M13.5 16l1.5 1.5 3-3',
    target: {
      key: 'payment-records',
      label: 'Payment Records',
      path: ['Finance', 'Monthly Dues', 'Payment Records'],
    },
  },
  {
    id: 'unpaid-dues',
    label: 'Unpaid Dues',
    value: 0,
    accentColor: '#b7791f',
    iconBackground: 'rgba(183, 121, 31, 0.14)',
    decorativeBackground: 'rgba(183, 121, 31, 0.11)',
    icon:
      'M6 3h12v10M6 3v18l2-1.2 2 1.2 2-1.2 2 1.2M9 8h6M9 12h4M12.5 21h8l-4-7-4 7ZM16.5 16.6v1.7M16.5 20.2h.01',
    target: {
      key: 'unpaid-dues',
      label: 'Unpaid Dues',
      path: ['Finance', 'Monthly Dues', 'Unpaid Dues'],
    },
  },
  {
    id: 'announcements',
    label: 'Announcements',
    value: 0,
    accentColor: '#2563eb',
    iconBackground: 'rgba(37, 99, 235, 0.12)',
    decorativeBackground: 'rgba(37, 99, 235, 0.09)',
    icon:
      'M4 13h3l8 4V7l-8 4H4v2ZM7 13v5h2.5l1-3.5M17 10.5a3 3 0 0 1 0 3M19 8.5a6 6 0 0 1 0 7',
    target: {
      key: 'all-announcements',
      label: 'All Announcements',
      path: ['Communication', 'Announcements', 'All Announcements'],
    },
  },
  {
    id: 'events',
    label: 'Upcoming Events',
    value: 0,
    accentColor: '#3f7d3a',
    iconBackground: 'rgba(63, 125, 58, 0.13)',
    decorativeBackground: 'rgba(63, 125, 58, 0.1)',
    icon:
      'M7 3v4M17 3v4M4.5 8h15M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2ZM8 12h3M8 16h5',
    target: {
      key: 'upcoming-events',
      label: 'Upcoming Events',
      path: ['Communication', 'Events/Scheduling', 'Upcoming Events'],
    },
  },
  {
    id: 'visitors',
    label: 'Visitors Today',
    value: 0,
    accentColor: '#7c3aed',
    iconBackground: 'rgba(124, 58, 237, 0.12)',
    decorativeBackground: 'rgba(124, 58, 237, 0.09)',
    icon:
      'M4.5 5.5h11a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-11v-13ZM8.5 12a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5ZM6.5 16a3 3 0 0 1 4 0M14 12h6M17.5 8.5 21 12l-3.5 3.5',
    target: {
      key: 'visitor-logs',
      label: 'Visitor Logs',
      path: ['Security', 'Visitor Logs'],
    },
  },
  {
    id: 'incidents',
    label: 'Incident Reports',
    value: 0,
    accentColor: '#b94a48',
    iconBackground: 'rgba(185, 74, 72, 0.13)',
    decorativeBackground: 'rgba(185, 74, 72, 0.1)',
    icon: 'M12 4 21 20H3L12 4ZM12 10v4M12 17.5h.01',
    target: {
      key: 'incident-reports',
      label: 'Incident Reports',
      path: ['Security', 'Incident Reports'],
    },
  },
];

@Injectable({
  providedIn: 'root',
})
export class DashboardSummaryService {
  getSummaryCards(): Observable<readonly DashboardSummaryCard[]> {
    return of(DASHBOARD_SUMMARY_CARDS);
  }
}
