import { useRoute } from "wouter";

export default function AdminPropertyDetail() {
  const [, params] = useRoute("/admin/properties/:id");

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-4xl font-bold mb-6">Property Details</h1>
      <div className="bg-card border rounded-lg p-6">
        <p className="text-muted-foreground">Property ID: {params?.id}</p>
      </div>
    </div>
  );
}
