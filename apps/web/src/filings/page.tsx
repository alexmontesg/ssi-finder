import FilingsTable from "./components/table.tsx";

export default function FilingsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <FilingsTable />
      </div>
    </main>
  );
}
