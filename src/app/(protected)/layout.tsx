import { DashboardSidebar } from '@/components/dashboard-sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-muted/40 flex min-h-screen w-full flex-col">
      <DashboardSidebar />
      {/* sm:pl-14 ensures the content doesn't get hidden behind the 
        fixed sidebar on larger screens 
      */}
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">{children}</div>
    </div>
  );
}
