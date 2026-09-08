import AdminNavbar from "@/components/admin/AdminNavbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SMBB - Admin"
};

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminNavbar />
      <div className="px-4 pb-12 mt-30 sm:mt-35 xl:mt-40 2xl:mt-45 md:px-6">
        {children}
      </div>
    </>
  );
}
