"use client";

import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container md:pl-64">
      <Sidebar />
      <div className="py-8 px-4 md:px-8">{children}</div>
    </div>
  );
}