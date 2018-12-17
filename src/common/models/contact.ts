import { Party, FieldOffice } from './model';

export class Contact {
  id: string;
  name: string;
  phone: string;
  photoURL?: string;
  party: Party;
  state: string;
  reason: string;
  area?: string;
  fieldOffices?: FieldOffice[];
}

export const mockContact = Object.assign(new Contact(), {
  id: 123,
  name: 'Mock Contact III',
  phone: '4155551212',
  photoURL: undefined,
  party: 'Democrat',
  state: 'CA',
  reason: 'This is your mock representative',
  area: undefined,
  fieldOffices: []
});
