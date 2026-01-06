import { Plus, Eye, Pencil, Trash2, X } from "lucide-react";
import Layout from "../components/layout/Layout";
import { toast } from "sonner";
import { useState , useEffect} from "react";
import { apiGet } from "../api/api";

type Student = {
  id: string;
  name: string;
  room: string;
  phone: string;
  status: "Active" | "Inactive" | "Pending";
};

const initialStudents: Student[] = [
  { id: "STU001", name: "John Smith", room: "101", phone: "+1 234-567-8901", status: "Active" },
  { id: "STU002", name: "Sarah Johnson", room: "205", phone: "+1 234-567-8902", status: "Active" },
  
];

const Students = () => {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet("/students")
      .then(setStudents)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    room: "",
    phone: "",
    status: "Active" as Student["status"],
  });

  const openAddForm = () => {
    setEditId(null);
    setFormData({ name: "", room: "", phone: "", status: "Active" });
    setShowForm(true);
  };

  const openEditForm = (student: Student) => {
    setEditId(student.id);
    setFormData(student);
    setShowForm(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.room || !formData.phone) {
      toast.error("Please fill all fields");
      return;
    }

    if (editId) {
      setStudents((prev) =>
        prev.map((s) => (s.id === editId ? { ...s, ...formData } : s))
      );
      toast.success("Student updated successfully");
    } else {
      const newStudent: Student = {
        id: `STU${students.length + 1}`.padStart(6, "0"),
        ...formData,
      };
      setStudents((prev) => [...prev, newStudent]);
      toast.success("Student added successfully");
    }

    setShowForm(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (!window.confirm(`Delete student?\n\n${name}`)) return;
    setStudents((prev) => prev.filter((s) => s.id !== id));
    toast.success("Student deleted");
  };

  const getStatusBadge = (status: string) =>
    status === "Active"
      ? "badge-success"
      : status === "Inactive"
      ? "badge-danger"
      : "badge-warning";

  return (
    <Layout>
      <div className="page-header">
        <h1 className="page-title">Students Management</h1>
        <button onClick={openAddForm} className="btn-primary">
          <Plus className="w-5 h-5" /> Add Student
        </button>
      </div>

      {/* ADD / EDIT MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-card w-full max-w-md rounded-xl p-6 relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3"
            >
              <X />
            </button>

            <h2 className="text-lg font-semibold mb-4">
              {editId ? "Edit Student" : "Add Student"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="name"
                placeholder="Student Name"
                value={formData.name}
                onChange={handleChange}
                className="form-input w-full"
              />

              <input
                name="room"
                placeholder="Room No"
                value={formData.room}
                onChange={handleChange}
                className="form-input w-full"
              />

              <input
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="form-input w-full"
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-input w-full"
              >
                <option>Active</option>
                <option>Inactive</option>
                <option>Pending</option>
              </select>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn-secondary"
                >
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
              <th>Room</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.SID}</td>
                <td>{student.name}</td>
                <td>{student.room}</td>
                <td>{student.phone}</td>
                <td>
                  <span className={`badge ${getStatusBadge(student.status)}`}>
                    {student.status}
                  </span>
                </td>
                <td className="flex gap-1">
                  <button className="btn-icon-view">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => openEditForm(student)}
                    className="btn-icon-edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(student.id, student.name)}
                    className="btn-icon-delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Students;
