import { createFileRoute } from '@tanstack/react-router'
import { EmployeeList } from '../components/Employee/EmployeeList'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Employee Directory</h1>
        <p className="text-gray-600">Manage your team members and their information</p>
      </div>
      
      <EmployeeList />
    </div>
  )
}
