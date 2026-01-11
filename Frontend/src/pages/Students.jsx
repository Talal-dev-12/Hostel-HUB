import { Plus, Eye, Pencil, Trash2, X } from "lucide-react";
import Layout from "../components/layout/Layout";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { getAPI, putAPI } from "../api/api";
import { set } from "date-fns";

const Students = () => {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        setStudents(await getAPI("http://localhost:5000/students"));
        setRooms(await getAPI("http://localhost:5000/rooms/available"));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching students:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    roomNo: "",
    phone: "",
    status: "Active",
  });

  const openAddForm = () => {
    setEditId(null);
    setFormData({ name: "", roomNo: "", phone: "", status: "Active" });
    setShowForm(true);
  };

  const openEditForm = (_id) => {
    const student = students.find((s) => s._id === _id);
    setEditId(student._id);
    setFormData({
      _id: student._id,
      name: student.name,
      roomNo: student.room?.roomNo || "",
      phone: student.phone,
      status: student.status,
    });
    setShowForm(true);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      try {
        putAPI(`http://localhost:5000/students/${editId}`, formData);
        const updatedStudents = students.map((student) =>
          student._id === editId ? { ...student, ...formData } : student
        );
        setStudents(updatedStudents);
        toast.success("Student updated");
      } catch (error) {
        toast.error("Failed to update student");
      }
    }

    setShowForm(false);
  };

  const handleDelete = (SID, name) => {
    if (!window.confirm(`Delete student?\n\n${name}`)) return;
    setStudents((prev) => prev.filter((s) => s.SID !== SID));
    toast.success("Student deleted");
  };

  const getStatusBadge = (status) =>
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

            <form className="space-y-3" onSubmit={handleSubmit}>
              <input
                name="name"
                placeholder="Student Name"
                value={formData.name}
                onChange={handleChange}
                className="form-input w-full"
              />

              <select
                name="roomNo"
                placeholder="Room No"
                value={formData.roomNo}
                onChange={handleChange}
                className="form-input w-full"
              >
                <option value="" disabled>
                  Select Available Room
                </option>
                {rooms.map((room) => (
                  <option key={room.roomNo} value={room.roomNo}>
                    {room.roomNo}
                  </option>
                ))}
              </select>

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
                <td>{student.room?.roomNo}</td>
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
                    onClick={() => openEditForm(student._id)}
                    className="btn-icon-edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(student._id, student.name)}
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
