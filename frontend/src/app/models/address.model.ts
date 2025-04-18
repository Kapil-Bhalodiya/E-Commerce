export interface Address {
  _id: string;
  fullName?: string; // Corrected to 'fullname' to match the data format
  phone?: string; // Optional phone number
  address1?: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  addressType: string;
  isDefault: boolean;
}