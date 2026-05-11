export type OfficerPhase = 'phase-1' | 'phase-2';

export const OFFICER_STATUS_OPTIONS = ['active', 'inactive'] as const;
export type OfficerStatus = (typeof OFFICER_STATUS_OPTIONS)[number];

export const OFFICER_POSITION_OPTIONS = [
  { value: 'president', label: 'President', activeLimit: 1 },
  { value: 'vice-president', label: 'Vice President', activeLimit: 1 },
  { value: 'treasurer', label: 'Treasurer', activeLimit: 1 },
  { value: 'secretary', label: 'Secretary', activeLimit: 1 },
  { value: 'assistant-secretary', label: 'Assistant Secretary', activeLimit: 1 },
  { value: 'auditor', label: 'Auditor', activeLimit: 1 },
  { value: 'peace-and-order', label: 'Peace and Order', activeLimit: 1 },
  { value: 'board-of-directors', label: 'Board of Directors (BOD)', activeLimit: 2 },
] as const;

export type OfficerPosition = (typeof OFFICER_POSITION_OPTIONS)[number]['value'];

export const OFFICER_POSITION_LIMITS: Readonly<Record<OfficerPosition, number>> =
  OFFICER_POSITION_OPTIONS.reduce(
    (limits, option) => ({
      ...limits,
      [option.value]: option.activeLimit,
    }),
    {} as Record<OfficerPosition, number>,
  );

export interface Officer {
  readonly id: string;
  readonly residentId?: string;
  readonly fullName: string;
  readonly position: OfficerPosition;
  readonly phase: OfficerPhase;
  readonly block: string;
  readonly lot: string;
  readonly contactNumber: string;
  readonly email: string;
  readonly officerStatus: OfficerStatus;
  readonly termStart?: string;
  readonly termEnd?: string;
  readonly createdAt: string;
}

export type CreateOfficerRequest = Omit<Officer, 'id' | 'officerStatus' | 'createdAt'>;
