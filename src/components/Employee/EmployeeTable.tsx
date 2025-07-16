import { Link } from '@tanstack/react-router'
import type { Employee } from '../../types/employee'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table'
import { Button } from '../ui/Button'
import { Eye, Edit, Trash2 } from 'lucide-react'

interface EmployeeTableProps {
  employees: Employee[]
}

export function EmployeeTable({ employees }: EmployeeTableProps) {
  if (employees.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No employees found</p>
      </div>
    )
  }

  return (
    // BUG: Missing overflow-x-auto causes horizontal scroll issues on mobile
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            {/* BUG: Fixed width headers don't wrap properly */}
            <TableHead className="w-48">Name</TableHead>
            <TableHead className="w-64">Email</TableHead>
            <TableHead className="w-32">Department</TableHead>
            <TableHead className="w-32">Role</TableHead>
            <TableHead className="w-40">Phone</TableHead>
            <TableHead className="w-32">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell className="font-medium">
                {/* BUG: No text truncation - long names will overflow */}
                {employee.name}
              </TableCell>
              <TableCell>
                {/* BUG: Email addresses can be very long and will overflow */}
                {employee.email}
              </TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>{employee.role}</TableCell>
              <TableCell>
                {/* BUG: Phone numbers display without formatting */}
                {employee.phone}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Link
                    to="/employees/$employeeId"
                    params={{ employeeId: employee.id.toString() }}
                  >
                    <Button variant="outline" size="sm">
                      {/* BUG: Missing accessibility - no alt text or aria-label */}
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm">
                    {/* BUG: Missing onClick handler - button doesn't work */}
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    {/* BUG: Missing onClick handler - button doesn't work */}
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}