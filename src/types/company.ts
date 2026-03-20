export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface PaginatedApiResponse<T> {
  success: boolean;
  totalCount: number;
  data: T[];
}

export interface Owner {
  id: number;
  fullName: string;
}

export interface SecurityLevel {
  id: number;
  name: string;
}

export interface Address {
  id: number;
  city: string;
  street?: string;
  zipCode?: string;
  country?: string;
}

export interface ContactInfo {
  email?: string;
  tel1?: string;
  tel2?: string;
  tel3?: string;
  www?: string;
}

export interface CompanyAddress {
  id: number;
  primary: boolean;
  contactAddress: boolean;
  extIds?: unknown;
  address: Address;
  contactInfo?: ContactInfo;
}

export interface Category {
  id: number;
  value: string;
  color?: string;
}

export interface Logo {
  id: number;
  contentType: string;
  fileName?: string;
  size?: number;
}

export interface SocialNetworkContact {
  facebook?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
  googleplus?: string | null;
  pinterest?: string | null;
  youtube?: string | null;
  instagram?: string | null;
  skype?: string | null;
}

export interface RowInfo {
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  rowState?: string | null;
  rowAccess?: string | null;
}

export interface Company {
  id: number;
  name: string;
  person: boolean;
  firstName?: string | null;
  lastName?: string | null;
  regNumber?: string;
  taxNumber?: string;
  taxNumber2?: string | null;
  taxPayer?: boolean | null;
  rating?: 'A' | 'B' | 'C' | 'D' | 'E';
  state?: string;
  role?: string;
  notice?: string;
  court?: string | null;

  owner?: Owner;
  securityLevel?: SecurityLevel;
  primaryAddress?: CompanyAddress;
  category?: Category | null;
  tags?: string[];
  rowInfo?: RowInfo;
  _version: number;
}

export interface CompanyDetail extends Company {
  databox?: string | null;
  legalForm?: string | null;
  employeesNumber?: number | null;
  turnover?: number | null;
  economyActivity?: string | null;
  birthday?: string | null;
  salutation?: string | null;
  titleBefore?: string | null;
  titleAfter?: string | null;
  originLead?: unknown;
  addresses?: CompanyAddress[];
  logo?: Logo | null;
  socialNetworkContact?: SocialNetworkContact;
  attachments?: unknown[];
  customFields?: Record<string, unknown>;
  inlineGdpr?: unknown[];
}
