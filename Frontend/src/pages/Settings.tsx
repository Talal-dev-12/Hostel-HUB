import { Save } from "lucide-react";
import Layout from "../components/layout/Layout";
import { toast } from "sonner";
import { useState } from "react";

const Settings = () => {
  //Settings  data
  const [settings, setSettings] = useState({
    hostelName: "Hostel Hub",
    hostelAddress: "123 University Avenue, Campus Town, ST 12345",
    contactNumber: "+1 234-567-8900",
    roomTypes: "Single, Double, Triple, Deluxe",
  });

  const handleSaveSettings = () => {
    toast.success("Settings Saved Successfully!");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Layout>
      <div className="page-header">
        <h1 className="page-title">System Settings</h1>
      </div>

      <div className="bg-card rounded-xl p-8 shadow-sm border border-border max-w-2xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveSettings();
          }}
          className="space-y-6"
        >
          <div>
            <label htmlFor="hostelName" className="form-label">
              Hostel Name
            </label>
            <input
              type="text"
              id="hostelName"
              name="hostelName"
              value={settings.hostelName}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter hostel name"
            />
          </div>

          <div>
            <label htmlFor="hostelAddress" className="form-label">
              Hostel Address
            </label>
            <textarea
              id="hostelAddress"
              name="hostelAddress"
              value={settings.hostelAddress}
              onChange={handleChange}
              className="form-input min-h-[100px] resize-none"
              placeholder="Enter hostel address"
            />
          </div>

          <div>
            <label htmlFor="contactNumber" className="form-label">
              Contact Number
            </label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={settings.contactNumber}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter contact number"
            />
          </div>

          <div>
            <label htmlFor="roomTypes" className="form-label">
              Room Types
            </label>
            <input
              type="text"
              id="roomTypes"
              name="roomTypes"
              value={settings.roomTypes}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter room types (comma separated)"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Separate multiple room types with commas
            </p>
          </div>

          <div className="pt-4 border-t border-border">
            <button type="submit" className="btn-primary">
              <Save className="w-5 h-5" />
              Save Settings
            </button>
          </div>
        </form>
      </div>

      {/* Additional Settings Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-4xl">
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Notification Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Email Notifications</span>
              <div className="w-10 h-6 bg-primary rounded-full relative cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">SMS Alerts</span>
              <div className="w-10 h-6 bg-muted rounded-full relative cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Payment Reminders</span>
              <div className="w-10 h-6 bg-primary rounded-full relative cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">System Info</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Version</span>
              <span className="font-medium text-foreground">1.0.0</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Last Updated</span>
              <span className="font-medium text-foreground">Jan 5, 2026</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">License</span>
              <span className="font-medium text-success">Active</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
