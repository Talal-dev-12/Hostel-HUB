import { Users, DoorOpen, DollarSign, AlertCircle } from "lucide-react";
import Layout from "../components/layout/Layout";
import StatCard from "../components/dashboard/StatCard";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Students",
      value: 248,
      icon: Users,
      iconBgColor: "bg-info/10",
      iconColor: "text-info",
      trend: { value: "12%", positive: true },
    },
    {
      title: "Available Rooms",
      value: 32,
      icon: DoorOpen,
      iconBgColor: "bg-success/10",
      iconColor: "text-success",
      trend: { value: "5 rooms", positive: true },
    },
    {
      title: "Monthly Revenue",
      value: "$45,680",
      icon: DollarSign,
      iconBgColor: "bg-warning/10",
      iconColor: "text-warning",
      trend: { value: "8%", positive: true },
    },
    {
      title: "Pending Complaints",
      value: 12,
      icon: AlertCircle,
      iconBgColor: "bg-destructive/10",
      iconColor: "text-destructive",
      trend: { value: "3", positive: false },
    },
  ];

  return (
    <Layout>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome to Hostel Hub Admin Panel
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your hostel today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Students */}
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Students</h2>
          <div className="space-y-4">
            {[
              { name: "John Smith", room: "101", status: "Active" },
              { name: "Sarah Johnson", room: "205", status: "Active" },
              { name: "Mike Brown", room: "312", status: "Pending" },
            ].map((student, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {student.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{student.name}</p>
                    <p className="text-sm text-muted-foreground">Room {student.room}</p>
                  </div>
                </div>
                <span
                  className={`badge ${
                    student.status === "Active" ? "badge-success" : "badge-warning"
                  }`}
                >
                  {student.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Complaints */}
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Complaints</h2>
          <div className="space-y-4">
            {[
              { issue: "AC not working", room: "205", status: "Pending" },
              { issue: "Water leakage", room: "101", status: "Resolved" },
              { issue: "WiFi issue", room: "312", status: "Pending" },
            ].map((complaint, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
              >
                <div>
                  <p className="font-medium text-foreground">{complaint.issue}</p>
                  <p className="text-sm text-muted-foreground">Room {complaint.room}</p>
                </div>
                <span
                  className={`badge ${
                    complaint.status === "Resolved" ? "badge-success" : "badge-warning"
                  }`}
                >
                  {complaint.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
