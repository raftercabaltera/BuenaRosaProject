export type ResidentAccountStatus = 'active' | 'pending' | 'inactive' | 'suspended';
export type ResidentPhase = 'phase-1' | 'phase-2';
export type ResidentType = 'homeowner' | 'renter' | 'authorized-occupant';

export interface Resident {
  readonly id: string;
  readonly fullName: string;
  readonly phase: ResidentPhase;
  readonly block: string;
  readonly lot: string;
  readonly contactNumber: string;
  readonly email: string;
  readonly accountStatus: ResidentAccountStatus;
  readonly residentType: ResidentType;
  readonly createdAt: string;
}

export type CreateResidentRequest = Omit<Resident, 'id' | 'createdAt'>;
