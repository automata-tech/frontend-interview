import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3333;
const DELAY_MS = 500; // Configurable delay in milliseconds

// Middleware
app.use(cors());
app.use(express.json());

// Add artificial delay to all routes
const delayMiddleware = (req, res, next) => {
  setTimeout(() => {
    next();
  }, DELAY_MS);
};

app.use('/employees', delayMiddleware);

// Basic logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`\n[${timestamp}] ${req.method} ${req.url}`);

  if (req.body && Object.keys(req.body).length > 0) {
    console.log(`  Body:`, req.body);
  }

  // Override res.json to log responses
  const originalJson = res.json;
  res.json = function (obj) {
    console.log(`  Response: ${res.statusCode}`);
    if (res.statusCode >= 400) {
      console.log(`  Error:`, obj);
    }
    return originalJson.call(this, obj);
  };

  next();
});

// In-memory data storage
let employees = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@company.com',
    phone: '(555) 123-4567',
    website: 'johndoe.com',
    address: {
      street: '123 Main St',
      city: 'New York',
      zipcode: '10001',
    },
    company: {
      name: 'Tech Corp',
      catchPhrase: 'Innovation at its finest',
    },
    department: 'Engineering',
    role: 'Senior Developer',
    hireDate: '2022-01-15',
    salary: 85000,
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    phone: '(555) 234-5678',
    website: 'janesmith.com',
    address: {
      street: '456 Oak Ave',
      city: 'San Francisco',
      zipcode: '94102',
    },
    company: {
      name: 'Tech Corp',
      catchPhrase: 'Innovation at its finest',
    },
    department: 'Marketing',
    role: 'Marketing Manager',
    hireDate: '2021-08-20',
    salary: 70000,
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@company.com',
    phone: '(555) 345-6789',
    website: 'bobjohnson.com',
    address: {
      street: '789 Pine St',
      city: 'Chicago',
      zipcode: '60601',
    },
    company: {
      name: 'Tech Corp',
      catchPhrase: 'Innovation at its finest',
    },
    department: 'Sales',
    role: 'Sales Representative',
    hireDate: '2023-03-10',
    salary: 55000,
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice.brown@company.com',
    phone: '(555) 456-7890',
    website: 'alicebrown.com',
    address: {
      street: '321 Elm St',
      city: 'Austin',
      zipcode: '73301',
    },
    company: {
      name: 'Tech Corp',
      catchPhrase: 'Innovation at its finest',
    },
    department: 'HR',
    role: 'HR Specialist',
    hireDate: '2022-06-01',
    salary: 60000,
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'charlie.wilson@company.com',
    phone: '(555) 567-8901',
    website: 'charliewilson.com',
    address: {
      street: '654 Maple Ave',
      city: 'Seattle',
      zipcode: '98101',
    },
    company: {
      name: 'Tech Corp',
      catchPhrase: 'Innovation at its finest',
    },
    department: 'Engineering',
    role: 'Frontend Developer',
    hireDate: '2023-01-15',
    salary: 75000,
  },
];

let nextId = 6;

// Routes
// GET /employees - Get all employees
app.get('/employees', (req, res) => {
  res.json(employees);
});

// GET /employees/:id - Get employee by ID
app.get('/employees/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const employee = employees.find((emp) => emp.id === id);

  if (!employee) {
    return res.status(404).json({ error: 'Employee not found' });
  }

  res.json(employee);
});

// POST /employees - Create new employee
app.post('/employees', (req, res) => {
  const { name, email, phone, department, role, hireDate, salary } = req.body;

  // Basic validation
  if (!name || !email || !department || !role) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newEmployee = {
    id: nextId++,
    name,
    email,
    phone: phone || '',
    website: '',
    address: {
      street: '',
      city: '',
      zipcode: '',
    },
    company: {
      name: 'Tech Corp',
      catchPhrase: 'Innovation at its finest',
    },
    department,
    role,
    hireDate: hireDate || new Date().toISOString().split('T')[0],
    salary: salary || 0,
  };

  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

// PUT /employees/:id - Update employee
app.put('/employees/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const employeeIndex = employees.findIndex((emp) => emp.id === id);

  if (employeeIndex === -1) {
    return res.status(404).json({ error: 'Employee not found' });
  }

  const updatedEmployee = {
    ...employees[employeeIndex],
    ...req.body,
    id, // Ensure ID cannot be changed
  };

  employees[employeeIndex] = updatedEmployee;
  res.json(updatedEmployee);
});

// DELETE /employees/:id - Delete employee
app.delete('/employees/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const employeeIndex = employees.findIndex((emp) => emp.id === id);

  if (employeeIndex === -1) {
    return res.status(404).json({ error: 'Employee not found' });
  }

  employees.splice(employeeIndex, 1);
  res.status(204).send();
});

// Start server
app.listen(PORT, () => {
  console.log(`Employee Directory Server running on http://localhost:${PORT}`);
  console.log(`Available endpoints:`);
  console.log(`  GET    /employees     - Get all employees`);
  console.log(`  GET    /employees/:id - Get employee by ID`);
  console.log(`  POST   /employees     - Create new employee`);
  console.log(`  PUT    /employees/:id - Update employee`);
  console.log(`  DELETE /employees/:id - Delete employee`);
});
