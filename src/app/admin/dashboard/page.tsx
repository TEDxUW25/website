import { TicketAnalyticsChart } from "@/components/ticket-analytics-chart"
import { TicketsDataTable } from "@/components/tickets-data-table"
import { SectionCards } from "@/components/section-cards"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">TEDxUW 2025 ticket management</p>
        </div>
      </div>
      
      <SectionCards />
      <TicketAnalyticsChart />
      <TicketsDataTable />
    </div>
  )
}