import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Profile } from "@/components/Profile";
import { Classes } from "@/components/Classes";
import { Documents } from "@/components/Documents";

export type ActiveTab = "profile" | "classes" | "documents";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <Profile />;
      case "classes":
        return <Classes />;
      case "documents":
        return <Documents />;
      default:
        return <Profile />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;