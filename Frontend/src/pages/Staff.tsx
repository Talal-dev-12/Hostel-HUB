import { Plus, Pencil, Trash2, X } from "lucide-react";
import Layout from "../components/layout/Layout";
import { toast } from "sonner";
import { useState } from "react";
import { time } from "console";
import { get } from "http";

const initialStaffData = [
  { id: "STF001", name: "Robert Wilson", position: "Manager", contact: "+1 234-567-1001", shift: "Day", status: "Active" },
  { id: "STF002", name: "Mary Thompson", position: "Receptionist", contact: "+1 234-567-1002", shift: "Day", status: "Active" },
  { id: "STF003", name: "James Anderson", position: "Security", contact: "+1 234-567-1003", shift: "Night", status: "Active" },

];

const Staff = () => {
  const [staff, setStaff] = useState(initialStaffData);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    position: "",
    contact: "",
    shift: "Day",
    status: "Active",
  });

  const openAddForm = () => {
    setEditId(null);
    setFormData({ name: "", position: "", contact: "", shift: "Day", status: "Active" });
    setShowForm(true);
  };

  const openEditForm = (member) => {
    setEditId(member.id);
    setFormData(member);
    setShowForm(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.position || !formData.contact) {
      toast.error("Please fill all fields");
      return;
    }

    if (editId) {
      setStaff((prev) =>
        prev.map((s) => (s.id === editId ? { ...s, ...formData } : s))
      );
      toast.success("Staff updated successfully");
    } else {
      setStaff((prev) => [
        ...prev,
        { id: `STF${prev.length + 1}`.padStart(6, "0"), ...formData },
      ]);
      toast.success("Staff added successfully");
    }

    setShowForm(false);
  };

  const handleDelete = (id: string, name: string) => {
    const confirmDelete = window.confirm(`Delete staff member?\n\n${name}`);
    if (!confirmDelete) return;

    setStaff((prev) => prev.filter((s) => s.id !== id));
    toast.success("Staff deleted");
  };

  const getStatusBadge = (status: string) =>
    status === "Active" ? "badge-success" : status === "On Leave" ? "badge-warning" : "badge-danger";

  function getDayNightStatus() {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 18 || hour < 6) {
    return 0;
  } else {
    return 1;
  }
}

// Example of how to use it:
const status = getDayNightStatus();
console.log(status); // Output will be either 'day' or 'night'

  return (
    <Layout>
      <div className="page-header">
        <h1 className="page-title">Staff Management</h1>
        <button onClick={openAddForm} className="btn-primary">
          <Plus className="w-5 h-5" /> Add Staff
        </button>
      </div>

      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-xl w-full max-w-md relative">
            <button onClick={() => setShowForm(false)} className="absolute top-3 right-3">
              <X />
            </button>

            <h2 className="text-lg font-semibold mb-4">
              {editId ? "Edit Staff" : "Add Staff"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="form-input w-full" />
              <input name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} className="form-input w-full" />

              <select name="position" value={formData.position} onChange={handleChange} className="form-input">
                <option value="">Select Position</option>
                <option>Manager</option>
                <option>Receptionist</option>
              </select>

              <select name="shift" value={formData.shift} onChange={handleChange} className="form-input">
                <option>Day</option>
                <option>Night</option>
              </select>

              <select name="status" value={formData.status} onChange={handleChange} className="form-input w-full">
                <option>Active</option>
                <option>On Leave</option>
                <option>Inactive</option>
              </select>

              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="data-table">
        <table className="w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Position</th>
              <th>Contact</th>
              <th>Shift</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.position}</td>
                <td>{s.contact}</td>
                <td>{s.shift}</td>
                <td><span className={`badge ${getStatusBadge(s.status)}`}>{s.status}</span></td>
                <td className="flex gap-1">
                  <button onClick={() => openEditForm(s)} className="btn-icon-edit">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(s.id, s.name)} className="btn-icon-delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-card rounded-xl p-4 border border-border">
          <p className="text-sm text-muted-foreground">Total Staff</p>
          <p className="text-2xl font-bold text-foreground text-green-600">{staff.length}</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <p className="text-sm text-muted-foreground">Available</p>

          <p className={`text-2xl font-bold ${
    staff.filter((s) => s.status === 'Active').length > 3 
    ? "text-success" 
    : "text-destructive"
  }`}> 
  {staff.filter((s) => s.status === "Active").length}
</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <p className="text-sm text-muted-foreground">Shift</p>
          <p className={`text-xl font-bold ${
            getDayNightStatus() === 0 ? "text-blue-700" : "text-yellow-600"
          }`}>
            {
              getDayNightStatus() === 0 ? "Night Shift" : "Day Shift"
            }
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Staff;
