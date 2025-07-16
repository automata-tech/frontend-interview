import { createFileRoute } from '@tanstack/react-router';
import { EmployeeForm } from '../components/Employee/EmployeeForm';

export const Route = createFileRoute('/add-employee')({
  component: AddEmployeePage,
});

function AddEmployeePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add New Employee</h1>
        <p className="text-gray-600">
          Fill out the form below to add a new team member
        </p>
      </div>

      <EmployeeForm />
    </div>
  );
}
