import AdminNavbar from "@/components/admin/AdminNavbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen px-4 pb-12 pt-32 md:px-6">
        {children}
      </div>
    </>
  );
}