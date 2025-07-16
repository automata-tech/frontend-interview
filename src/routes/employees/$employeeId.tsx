import { createFileRoute } from '@tanstack/react-router'
import { EmployeeDetail } from '../../components/Employee/EmployeeDetail'

export const Route = createFileRoute('/employees/$employeeId')({
  component: EmployeeDetailPage,
})

function EmployeeDetailPage() {
  const { employeeId } = Route.useParams()
  
  return (
    <div className="space-y-6">
      <EmployeeDetail employeeId={parseInt(employeeId)} />
    </div>
  )
}