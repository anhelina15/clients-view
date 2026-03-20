export const CompanyStatus = {
  POTENTIAL: 'A_POTENTIAL',
  ACTUAL: 'B_ACTUAL',
  DEFERRED: 'C_DEFERRED',
  UNATTRACTIVE: 'D_UNATTRACTIVE',
} as const;

export type CompanyStatus = (typeof CompanyStatus)[keyof typeof CompanyStatus];

export const CompanyRole = {
  SUBSCRIBER: 'A_SUBSCRIBER',
  PARTNER: 'B_PARTNER',
  SUPPLIER: 'C_SUPPLIER',
  RIVAL: 'D_RIVAL',
  OWNER: 'E_OWN',
} as const;

export type CompanyRole = (typeof CompanyRole)[keyof typeof CompanyRole];

export interface StatusConfig {
  label: string;
  color: string;
}

export interface RoleConfig {
  label: string;
}

export const STATUS_CONFIG: Record<string, StatusConfig> = {
  [CompanyStatus.POTENTIAL]: {
    label: 'Potenciální',
    color: '#C89A2E',
  },
  [CompanyStatus.ACTUAL]: {
    label: 'Aktuální',
    color: '#4CAF50',
  },
  [CompanyStatus.DEFERRED]: {
    label: 'Odložený',
    color: '#9E9E9E',
  },
  [CompanyStatus.UNATTRACTIVE]: {
    label: 'Nezajímavý',
    color: '#E53935',
  },
};

export const ROLE_CONFIG: Record<string, RoleConfig> = {
  [CompanyRole.SUBSCRIBER]: { label: 'Odběratel' },
  [CompanyRole.PARTNER]: { label: 'Partner' },
  [CompanyRole.SUPPLIER]: { label: 'Dodavatel' },
  [CompanyRole.RIVAL]: { label: 'Konkurent' },
  [CompanyRole.OWNER]: { label: 'Vlastní firma' },
};
