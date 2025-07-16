import { Link } from '@tanstack/react-router';
import { Users, UserPlus } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {companyName} Directory
              </h1>
              <p className="text-sm text-gray-500">
                Employee management system
              </p>
            </div>
          </div>

          <nav className="flex space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              activeProps={{
                className: 'text-blue-600 bg-blue-50',
              }}
            >
              All Employees
            </Link>
            <Link
              to="/add-employee"
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add Employee
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
