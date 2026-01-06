import { Plus, CheckCircle, X } from "lucide-react";
import Layout from "../components/layout/Layout";
import { toast } from "sonner";
import { useState } from "react";

const Complaints = () => {
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    studentName: "",
    room: "",
    issue: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.studentName || !formData.room || !formData.issue) {
      toast.error("Please fill all fields");
      return;
    }

    toast.success("Complaint added successfully!");
    setShowForm(false);
    setFormData({ studentName: "", room: "", issue: "" });
  };

  return (
    <Layout>
      <div className="page-header">
        <h1 className="page-title">Complaints Management</h1>
        <button onClick={() => setShowForm(true)} className="btn-primary">
          <Plus className="w-5 h-5" />
          Add Complaint
        </button>
      </div>

      {/* ADD COMPLAINT MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-card w-full max-w-md rounded-xl p-6 border border-border relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
            >
              <X />
            </button>

            <h2 className="text-lg font-semibold mb-4">Add New Complaint</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm">Student Name</label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter student name"
                />
              </div>

              <div>
                <label className="text-sm">Room No</label>
                <input
                  type="text"
                  name="room"
                  value={formData.room}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Room number"
                  disabled
                />
              </div>

              <div>
                <label className="text-sm">Issue</label>
                <textarea
                  name="issue"
                  value={formData.issue}
                  onChange={handleChange}
                  className="form-input w-full min-h-[80px]"
                  placeholder="Describe the issue"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TABLE (same as tumhara) */}
      <div className="data-table mt-6">
        <table className="w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Room No</th>
              <th>Issue</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
            <tr>
            
              {/* Backend se data ayega */}
            </tr>
          </thead>
          <tbody>
            {/* Backend se data ayega */}
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-card rounded-xl p-4 border border-border">
          <p className="text-sm text-muted-foreground">Total Complaints</p>
          <p className="text-2xl font-bold text-foreground text-yellow-800">
            {/* {rooms.length} */}200
          </p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <p className="text-sm text-muted-foreground">Solved</p>

          <p className="text-2xl font-bold text-success "> 
            {/* {rooms.filter(r => r.status === "Available").length} */}
            12
</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <p className="text-sm text-muted-foreground">LEFT</p>
          <p className="text-xl font-bold text-red-700">
            5
            {/* {rooms.filter(r => r.status === "Full").length} */}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Complaints;
