// Facility status enum.
export type FacilityStatus = 'ACTIVE' | 'INACTIVE' | 'CLOSED';

// Business model enum.
export type BusinessModel = 'YES' | 'NO';

// Point of Contact details
export type PocDetails = {
  name: string;
  mobile: string;
  email?: string;
};


export type Facility = {
  id: string;

  //Basic details
  code: string;
  name: string;
  address?: string;
  city?: string;
  state?: string;
  region?: string;
  pincode?: number;

  // Contact details
  primaryPoc: PocDetails;
  secondaryPoc?: PocDetails;
  clientAdminMobile?: string;
  srOwnerMobile?: string;

  // Location
  latitude?: number;
  longitude?: number;
  mapLink?: string;

  // Lifecycle dates
  openingDate: string;
  renovationDate?: string;
  closureDate?: string;

  // Area details
  builtUpAreaSqFt?: number;
  carpetAreaSqFt?: number;

  // Classification
  facilityType?: string;
  status: FacilityStatus;
  isFranchise: BusinessModel;
};
