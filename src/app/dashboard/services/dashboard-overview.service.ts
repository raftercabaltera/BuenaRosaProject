import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DashboardOverview } from '../models/dashboard-overview.model';

const DASHBOARD_OVERVIEW: DashboardOverview = {
  needsAttention: [
    {
      id: 'unpaid-dues',
      label: 'Unpaid Dues',
      value: 0,
      accentColor: '#b7791f',
      iconBackground: 'rgba(183, 121, 31, 0.13)',
      icon: 'M6 3h12v18l-2-1.2-2 1.2-2-1.2-2 1.2-2-1.2L6 21V3ZM9 8h6M9 12h4M14 16h6M17 13v6',
      target: {
        key: 'unpaid-dues',
        label: 'Unpaid Dues',
        path: ['Finance', 'Monthly Dues', 'Unpaid Dues'],
      },
    },
    {
      id: 'pending-incidents',
      label: 'Pending Incident Reports',
      value: 0,
      accentColor: '#b94a48',
      iconBackground: 'rgba(185, 74, 72, 0.13)',
      icon: 'M12 4 21 20H3L12 4ZM12 10v4M12 17.5h.01',
      target: {
        key: 'incident-reports',
        label: 'Incident Reports',
        path: ['Security', 'Incident Reports'],
      },
    },
    {
      id: 'visitors-not-checked-out',
      label: 'Visitors Not Checked Out',
      value: 0,
      accentColor: '#7c3aed',
      iconBackground: 'rgba(124, 58, 237, 0.12)',
      icon: 'M5 5.5h10.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5v-13ZM8.5 12a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6ZM6.5 16a3 3 0 0 1 4 0M14 12h7M18 8.5 21.5 12 18 15.5',
      target: {
        key: 'visitor-logs',
        label: 'Visitor Logs',
        path: ['Security', 'Visitor Logs'],
      },
    },
    {
      id: 'documents-review',
      label: 'Documents for Review',
      value: 0,
      accentColor: '#256f8f',
      iconBackground: 'rgba(37, 111, 143, 0.12)',
      icon: 'M7 3.5h7l4 4V20a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 20V5A1.5 1.5 0 0 1 7.5 3.5ZM14 3.5V8h4M9 12h6M9 16h4',
      target: {
        key: 'document-records',
        label: 'Document & Records',
        path: ['Management', 'Document & Records'],
      },
    },
    {
      id: 'payment-deadline',
      label: 'Upcoming Payment Deadline',
      value: 0,
      accentColor: '#3f7d3a',
      iconBackground: 'rgba(63, 125, 58, 0.13)',
      icon: 'M7 3v4M17 3v4M4.5 8h15M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2ZM9 13h3M9 17h5',
      target: {
        key: 'billing',
        label: 'Billing',
        path: ['Finance', 'Monthly Dues', 'Billing'],
      },
    },
  ],
  quickActions: [
    {
      id: 'add-resident',
      label: 'Add Resident',
      accentColor: '#1f7a52',
      iconBackground: 'rgba(31, 122, 82, 0.13)',
      icon: 'M15 19a6 6 0 0 0-12 0M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM18 8v8M14 12h8',
      target: {
        key: 'residents-list',
        label: 'Residents List',
        path: ['Management', 'HOA Profile', 'Residents List'],
      },
    },
    {
      id: 'record-payment',
      label: 'Record Payment',
      accentColor: '#0f766e',
      iconBackground: 'rgba(15, 118, 110, 0.13)',
      icon: 'M5 6h14v10H5V6ZM8 19h8M12 16v3M8.5 11.5h.01M12 11.5h3.5',
      target: {
        key: 'payment-records',
        label: 'Payment Records',
        path: ['Finance', 'Monthly Dues', 'Payment Records'],
      },
    },
    {
      id: 'create-announcement',
      label: 'Create Announcement',
      accentColor: '#2563eb',
      iconBackground: 'rgba(37, 99, 235, 0.12)',
      icon: 'M4 13h3l8 4V7l-8 4H4v2ZM7 13v5h2.5l1-3.5M18 9.5v5M20.5 12h-5',
      target: {
        key: 'create-announcement',
        label: 'Create Announcement',
        path: ['Communication', 'Announcements', 'Create Announcement'],
      },
    },
    {
      id: 'log-visitor',
      label: 'Log Visitor',
      accentColor: '#7c3aed',
      iconBackground: 'rgba(124, 58, 237, 0.12)',
      icon: 'M5 5.5h10.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5v-13ZM8.5 12a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6ZM6.5 16a3 3 0 0 1 4 0M14 12h7M17.5 8.5 21 12l-3.5 3.5',
      target: {
        key: 'visitor-logs',
        label: 'Visitor Logs',
        path: ['Security', 'Visitor Logs'],
      },
    },
    {
      id: 'upload-document',
      label: 'Upload Document',
      accentColor: '#256f8f',
      iconBackground: 'rgba(37, 111, 143, 0.12)',
      icon: 'M7.5 3.5H14l4 4V20a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 20V5A1.5 1.5 0 0 1 7.5 3.5ZM14 3.5V8h4M12 18v-6M9.5 14.5 12 12l2.5 2.5',
      target: {
        key: 'document-records',
        label: 'Document & Records',
        path: ['Management', 'Document & Records'],
      },
    },
    {
      id: 'add-event',
      label: 'Add Event',
      accentColor: '#3f7d3a',
      iconBackground: 'rgba(63, 125, 58, 0.13)',
      icon: 'M7 3v4M17 3v4M4.5 8h15M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2ZM12 12v6M9 15h6',
      target: {
        key: 'calendar',
        label: 'Calendar',
        path: ['Communication', 'Events/Scheduling', 'Calendar'],
      },
    },
  ],
  upcomingSchedule: [],
  viewEventsTarget: {
    key: 'upcoming-events',
    label: 'Upcoming Events',
    path: ['Communication', 'Events/Scheduling', 'Upcoming Events'],
  },
  monthlyDuesSnapshot: {
    metrics: [
      {
        id: 'paid',
        label: 'Paid',
        value: 0,
        accentColor: '#1f7a52',
        iconBackground: 'rgba(31, 122, 82, 0.13)',
        icon: 'M5 7h14v10H5V7ZM8 20h8M12 17v3M8.5 12h.01M12 12h3M14.5 15l1.2 1.2 2.3-2.4',
      },
      {
        id: 'unpaid',
        label: 'Unpaid',
        value: 0,
        accentColor: '#b7791f',
        iconBackground: 'rgba(183, 121, 31, 0.13)',
        icon: 'M6 3h12v18l-2-1.2-2 1.2-2-1.2-2 1.2-2-1.2L6 21V3ZM9 8h6M9 12h4M15.5 15.5l3 3M18.5 15.5l-3 3',
      },
      {
        id: 'overdue',
        label: 'Overdue',
        value: 0,
        accentColor: '#b94a48',
        iconBackground: 'rgba(185, 74, 72, 0.13)',
        icon: 'M12 6v6l3.5 2M21 12a9 9 0 1 1-3.4-7M18 3.5h3.5V7',
      },
    ],
    collectionProgress: 0,
  },
  recentActivity: [],
};

@Injectable({
  providedIn: 'root',
})
export class DashboardOverviewService {
  getOverview(): Observable<DashboardOverview> {
    return of(DASHBOARD_OVERVIEW);
  }
}
