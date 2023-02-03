export interface ContactDTOBase {
  name: string;
  avatar: string;
  email: string;
  phone: string;
  birthday: string;
}

export interface ContactDTO extends ContactDTOBase {
  createdAt?: string;
  id: string;
}

type ContactBaseDTOKeys = keyof ContactDTOBase;

export type ContactChanges = Record<ContactBaseDTOKeys, string>;
