
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import AdminUsers from "@/components/admin/AdminUsers";
import AdminPlans from "@/components/admin/AdminPlans";
import AdminChannels from "@/components/admin/AdminChannels";
import { ChevronLeft, Users, CreditCard, Tv } from "lucide-react";

const Admin = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("users");

  // If user is not an admin, redirect to home
  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h1 className="text-2xl font-bold">Unauthorized Access</h1>
        <p className="text-tv-text-secondary">
          You don't have permission to access this page.
        </p>
        <Button onClick={() => navigate("/")}>Go to Home</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2"
        >
          <ChevronLeft size={16} />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="w-[70px]" />
      </div>

      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users size={16} />
            <span>Users</span>
          </TabsTrigger>
          <TabsTrigger value="plans" className="flex items-center gap-2">
            <CreditCard size={16} />
            <span>Subscription Plans</span>
          </TabsTrigger>
          <TabsTrigger value="channels" className="flex items-center gap-2">
            <Tv size={16} />
            <span>Channels</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <AdminUsers />
        </TabsContent>

        <TabsContent value="plans" className="space-y-6">
          <AdminPlans />
        </TabsContent>

        <TabsContent value="channels" className="space-y-6">
          <AdminChannels />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
