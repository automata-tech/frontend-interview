import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useCreateEmployee } from '../../hooks/useEmployees';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import type { CreateEmployeeData } from '../../types/employee';

export function EmployeeForm() {
  const navigate = useNavigate();
  const createEmployee = useCreateEmployee();

  const [formData, setFormData] = useState<CreateEmployeeData>({
    name: '',
    email: '',
    phone: '',
    department: '',
    role: '',
    hireDate: '',
    salary: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    // e.preventDefault()

    createEmployee.mutate(formData, {
      onSuccess: () => {
        navigate({ to: '/' });
      },
    });
  };

  const handleInputChange =
    (field: keyof CreateEmployeeData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: field === 'salary' ? Number(e.target.value) : e.target.value,
      }));
    };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange('name')}
              // required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              required
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone
            </label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange('phone')}
              required
            />
          </div>

          <div>
            <label
              htmlFor="department"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Department
            </label>
            <select
              id="department"
              value={formData.department}
              onChange={handleInputChange('department')}
              className="w-full h-9 px-3 py-1 rounded-md border border-input bg-background text-sm"
              required
            >
              <option value="">Select Department</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Role
            </label>
            <Input
              id="role"
              type="text"
              value={formData.role}
              onChange={handleInputChange('role')}
              required
            />
          </div>

          <div>
            <label
              htmlFor="hireDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Hire Date
            </label>
            <Input
              id="hireDate"
              type="date"
              value={formData.hireDate}
              onChange={handleInputChange('hireDate')}
              required
            />
          </div>

          <div>
            <label
              htmlFor="salary"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Salary
            </label>
            <Input
              id="salary"
              type="number"
              min="0"
              value={formData.salary}
              onChange={handleInputChange('salary')}
              required
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate({ to: '/' })}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={createEmployee.isPending}>
            {createEmployee.isPending ? 'Creating...' : 'Create Employee'}
          </Button>
        </div>
      </form>
    </div>
  );
}
