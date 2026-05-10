export type HomeownerAccountStatus = 'active' | 'pending' | 'inactive' | 'suspended';
export type HomeownerResidentType = 'homeowner' | 'renter' | 'occupant';

export interface Homeowner {
  readonly id: string;
  readonly fullName: string;
  readonly block: string;
  readonly lot: string;
  readonly contactNumber: string;
  readonly email: string;
  readonly accountStatus: HomeownerAccountStatus;
  readonly residentType: HomeownerResidentType;
  readonly createdAt: string;
}

export type CreateHomeownerRequest = Omit<Homeowner, 'id' | 'createdAt'>;
