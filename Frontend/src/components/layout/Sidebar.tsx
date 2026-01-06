import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  DoorOpen,
  CreditCard,
  MessageSquareWarning,
  UserCog,
  Settings,
  Building2,
} from "lucide-react";

const menuItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/students", label: "Students", icon: Users },
  { path: "/rooms", label: "Rooms", icon: DoorOpen },
  { path: "/payments", label: "Payments", icon: CreditCard },
  { path: "/complaints", label: "Complaints", icon: MessageSquareWarning },
  { path: "/staff", label: "Staff", icon: UserCog },
  { path: "/settings", label: "Settings", icon: Settings },
];

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar-bg flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-sidebar-hover">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Building2 className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-sidebar-foreground">Hostel Hub</h1>
          <p className="text-xs text-sidebar-muted">Admin Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-sidebar-hover">
        <p className="text-xs text-sidebar-muted">© 2026 Hostel Hub</p>
      </div>
    </aside>
  );
};

export default Sidebar;
