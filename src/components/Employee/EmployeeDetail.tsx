import { useEmployee } from '../../hooks/useEmployees'
import { LoadingSpinner } from '../ui/LoadingSpinner'
import { Button } from '../ui/Button'
import { ArrowLeft, Edit, Trash2 } from 'lucide-react'
import { Link } from '@tanstack/react-router'

interface EmployeeDetailProps {
  employeeId: number
}

export function EmployeeDetail({ employeeId }: EmployeeDetailProps) {
  const { data: employee, isLoading, error } = useEmployee(employeeId)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-8">
        <p>Error loading employee: {error.message}</p>
      </div>
    )
  }

  if (!employee) {
    return (
      <div className="text-center text-gray-500 p-8">
        <p>Employee not found</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Directory
          </Button>
        </Link>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{employee.name}</h2>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-500">Email</label>
                <p className="text-gray-900">{employee.email}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500">Phone</label>
                <p className="text-gray-900">{employee.phone}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500">Website</label>
                <p className="text-gray-900">{employee.website}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-500">Department</label>
              <p className="text-gray-900">{employee.department}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500">Role</label>
              <p className="text-gray-900">{employee.role}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500">Hire Date</label>
              <p className="text-gray-900">{employee.hireDate}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500">Salary</label>
              <p className="text-gray-900">${employee.salary.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Company Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">Company</label>
              <p className="text-gray-900">{employee.company.name}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500">Catch Phrase</label>
              <p className="text-gray-900">{employee.company.catchPhrase}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Address</h3>
          <p className="text-gray-900">
            {employee.address.street}, {employee.address.city} {employee.address.zipcode}
          </p>
        </div>
      </div>
    </div>
  )
}