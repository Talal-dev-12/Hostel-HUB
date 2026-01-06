import { Plus, X } from "lucide-react";
import Layout from "../components/layout/Layout";
import { toast } from "sonner";
import { useState } from "react";

type Room = {
  roomNo: string;
  type: string;
  capacity: number;
  occupied: number;
  status: "Available" | "Full";
};

const initialRooms: Room[] = [
  { roomNo: "101", type: "Single", capacity: 1, occupied: 1, status: "Full" },
  { roomNo: "102", type: "Single", capacity: 1, occupied: 0, status: "Available" },
  { roomNo: "201", type: "Double", capacity: 2, occupied: 2, status: "Full" },

];

const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    roomNo: "",
    type: "Single",
    capacity: 1,
    occupied: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "capacity" || name === "occupied" ? Number(value) : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.roomNo) {
      toast.error("Room number is required");
      return;
    }

    const status =
      formData.occupied >= formData.capacity ? "Full" : "Available";

    setRooms((prev) => [
      ...prev,
      { ...formData, status },
    ]);

    toast.success("Room added successfully");
    setShowForm(false);
    setFormData({ roomNo: "", type: "Single", capacity: 1, occupied: 0 });
  };

  const getStatusBadge = (status: string) =>
    status === "Available" ? "badge-success" : "badge-danger";

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "Single": return "bg-info/10 text-info";
      case "Double": return "bg-primary/10 text-primary";
      case "Triple": return "bg-warning/10 text-warning";
      case "Deluxe": return "bg-purple-100 text-purple-600";
      default: return "";
    }
  };

  return (
    <Layout>
      <div className="page-header">
        <h1 className="page-title">Rooms Management</h1>
        <button onClick={() => setShowForm(true)} className="btn-primary">
          <Plus className="w-5 h-5" /> Add Room
        </button>
      </div>

      {/* ADD ROOM MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-card w-full max-w-md p-6 rounded-xl relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3"
            >
              <X />
            </button>

            <h2 className="text-lg font-semibold mb-4">Add Room</h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="roomNo"
                placeholder="Room Number"
                value={formData.roomNo}
                onChange={handleChange}
                className="form-input w-full"
              />

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="form-input w-full"
              >
                <option>Single</option>
                <option>Double</option>
                <option>Triple</option>
                <option>Deluxe</option>
              </select>

              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="form-input w-full"
                placeholder="Capacity"
              />

              <input
                type="number"
                name="occupied"
                value={formData.occupied}
                onChange={handleChange}
                className="form-input w-full"
                placeholder="Occupied"
              />

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
              <th>Room No</th>
              <th>Type</th>
              <th>Capacity</th>
              <th>Occupied</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.roomNo}>
                <td>{room.roomNo}</td>
                <td>
                  <span className={`badge ${getTypeBadge(room.type)}`}>
                    {room.type}
                  </span>
                </td>
                <td>{room.capacity}</td>
                <td>{room.occupied}/{room.capacity}</td>
                <td>
                  <span className={`badge ${getStatusBadge(room.status)}`}>
                    {room.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* STATS */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-card rounded-xl p-6 border border-border">Total Rooms: <b>{rooms.length}</b></div>
        <div className="bg-card rounded-xl p-6 border border-border">Available: <b>{rooms.filter(r => r.status === "Available").length}</b></div>
        <div className="bg-card rounded-xl p-6 border border-border">Full: <b>{rooms.filter(r => r.status === "Full").length}</b></div>
        <div className="bg-card rounded-xl p-6 border border-border">
          Capacity: <b>{rooms.reduce((a, r) => a + r.capacity, 0)}</b>
        </div>
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-card rounded-xl p-4 border border-border">
          <p className="text-sm text-muted-foreground">Total Rooms</p>
          <p className="text-2xl font-bold text-foreground text-green-500">
            {rooms.length}
          </p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <p className="text-sm text-muted-foreground">Available</p>

          <p className="text-2xl font-bold text-success "> 
            {rooms.filter(r => r.status === "Available").length}
</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <p className="text-sm text-">Occupied</p>
          <p className="text-xl font-bold text-red-700">
            {rooms.filter(r => r.status === "Full").length}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Rooms;
