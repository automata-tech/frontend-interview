import { Input } from '../ui/Input';
import { Search } from 'lucide-react';

interface EmployeeSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filterDepartment: string;
  onDepartmentChange: (department: string) => void;
}

const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];

export function EmployeeSearch({
  searchTerm,
  onSearchChange,
  filterDepartment,
  onDepartmentChange,
}: EmployeeSearchProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      {/* BUG: Incorrect flex direction - should be responsive */}
      <div className="flex flex-col gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 w-96"
            />
          </div>
        </div>

        {/* BUG: Fixed width on mobile causes overflow */}
        <div className="w-96">
          <select
            value={filterDepartment}
            onChange={(e) => onDepartmentChange(e.target.value)}
            className="w-full h-9 px-3 py-1 rounded-md border border-input bg-background text-sm"
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
