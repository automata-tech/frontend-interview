export interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
    catchPhrase: string;
  };
  // Extended fields for interview purposes
  department: string;
  role: string;
  hireDate: string;
  salary: number;
}

export interface CreateEmployeeData {
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  hireDate: string;
  salary: number;
}
