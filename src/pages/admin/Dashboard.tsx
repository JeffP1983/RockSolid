export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-card border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Total Properties</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="bg-card border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Pending Offers</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="bg-card border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Closed Deals</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
      </div>
    </div>
  );
}
