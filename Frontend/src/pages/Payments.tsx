import { useState } from "react";
import Layout from "../components/layout/Layout";
import { toast } from "sonner";

const initialPaymentsData = [
  { id: "PAY001", studentName: "John Smith", amount: "$500", month: "January 2026", status: "Paid" },
  { id: "PAY002", studentName: "Sarah Johnson", amount: "$500", month: "January 2026", status: "Paid" },
  { id: "PAY003", studentName: "Mike Brown", amount: "$450", month: "January 2026", status: "Pending" },
  { id: "PAY004", studentName: "Emily Davis", amount: "$500", month: "January 2026", status: "Paid" },
  { id: "PAY005", studentName: "James Wilson", amount: "$450", month: "January 2026", status: "Pending" },
];

const Payments = () => {
  const [payments, setPayments] = useState(initialPaymentsData);

  const markAsPaid = (payment) => {
    const confirmPay = window.confirm(
      `Confirm Payment?\n\nPayment ID: ${payment.id}\nStudent: ${payment.studentName}\nAmount: ${payment.amount}`
    );

    if (!confirmPay) return;

    setPayments((prev) =>
      prev.map((p) =>
        p.id === payment.id ? { ...p, status: "Paid" } : p
      )
    );

    toast.success(`${payment.studentName} payment marked as Paid`);
  };

  const totalPaid = payments
    .filter((p) => p.status === "Paid")
    .reduce((acc, p) => acc + parseInt(p.amount.replace("$", "")), 0);

  const totalPending = payments
    .filter((p) => p.status === "Pending")
    .reduce((acc, p) => acc + parseInt(p.amount.replace("$", "")), 0);

  return (
    <Layout>
      <div className="page-header">
        <h1 className="page-title">Payments</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-card rounded-xl p-5 border border-border">
          <p className="text-sm text-muted-foreground mb-1">Total Collected</p>
          <p className="text-2xl font-bold text-success">${totalPaid}</p>
        </div>
        <div className="bg-card rounded-xl p-5 border border-border">
          <p className="text-sm text-muted-foreground mb-1">Pending Amount</p>
          <p className="text-2xl font-bold text-warning">${totalPending}</p>
        </div>
        <div className="bg-card rounded-xl p-5 border border-border">
          <p className="text-sm text-muted-foreground mb-1">Total Transactions</p>
          <p className="text-2xl font-bold text-foreground">{payments.length}</p>
        </div>
      </div>

      {/* Table */}
      <div className="data-table">
        <table className="w-full">
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Student Name</th>
              <th>Amount</th>
              <th>Month</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td className="font-medium">{payment.id}</td>
                <td>{payment.studentName}</td>
                <td className="font-semibold">{payment.amount}</td>
                <td className="text-muted-foreground">{payment.month}</td>
                <td>
                  {payment.status === "Paid" ? (
                    <span className="badge badge-success">Paid</span>
                  ) : (
                    <button
                      onClick={() => markAsPaid(payment)}
                      className="badge badge-warning hover:opacity-80"
                    >
                      Pending (Mark Paid)
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Payments;
