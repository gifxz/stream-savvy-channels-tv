
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { User, CreditCard, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Account: React.FC = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  
  const [billingForm, setBillingForm] = useState({
    name: user?.billingInfo?.name || "",
    address: user?.billingInfo?.address || "",
    city: user?.billingInfo?.city || "",
    state: user?.billingInfo?.state || "",
    zip: user?.billingInfo?.zip || "",
    country: user?.billingInfo?.country || "",
  });
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };
  
  const handleBillingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Billing Information Updated",
      description: "Your billing information has been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Account</h1>
      
      {user && (
        <Tabs defaultValue="subscription" className="space-y-6">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="subscription" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>Subscription</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Billing</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Subscription Tab */}
          <TabsContent value="subscription">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Plan</CardTitle>
                <CardDescription>
                  Manage your subscription plan and billing cycle.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Current Plan</h3>
                    <Badge variant="outline" className={user.subscriptionStatus === "active" ? "bg-green-600 text-white" : "bg-yellow-600 text-white"}>
                      {user.subscriptionStatus === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  
                  {user.subscriptionPlan ? (
                    <Card className="bg-muted">
                      <CardContent className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="space-y-1 pt-3">
                          <h4 className="font-bold text-xl">{user.subscriptionPlan.name} Plan</h4>
                          <p className="text-sm text-tv-text-secondary">
                            ${user.subscriptionPlan.price.toFixed(2)}/{user.subscriptionPlan.billingCycle}
                          </p>
                          <p className="text-sm">
                            {user.subscriptionPlan.channelCount}+ channels
                          </p>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <Button className="tv-btn bg-tv-primary hover:bg-tv-primary/90 w-full md:w-auto" asChild>
                            <Link to="/plans">Change Plan</Link>
                          </Button>
                          <Button variant="outline" className="tv-btn w-full md:w-auto">
                            Cancel Subscription
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="p-6 text-center">
                      <h3 className="text-lg font-medium mb-2">No Active Subscription</h3>
                      <p className="text-tv-text-secondary mb-4">
                        Subscribe to a plan to start watching your favorite channels.
                      </p>
                      <Button className="tv-btn bg-tv-primary hover:bg-tv-primary/90" asChild>
                        <Link to="/plans">View Plans</Link>
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Billing History</h3>
                  {user.subscriptionPlan ? (
                    <div className="border rounded-md">
                      <div className="grid grid-cols-4 p-3 border-b font-medium">
                        <div>Date</div>
                        <div>Amount</div>
                        <div>Status</div>
                        <div>Invoice</div>
                      </div>
                      <div className="grid grid-cols-4 p-3">
                        <div>Apr 01, 2023</div>
                        <div>${user.subscriptionPlan.price.toFixed(2)}</div>
                        <div>Paid</div>
                        <Button variant="link" className="text-tv-secondary justify-start p-0">
                          Download
                        </Button>
                      </div>
                      <div className="grid grid-cols-4 p-3">
                        <div>Mar 01, 2023</div>
                        <div>${user.subscriptionPlan.price.toFixed(2)}</div>
                        <div>Paid</div>
                        <Button variant="link" className="text-tv-secondary justify-start p-0">
                          Download
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-tv-text-secondary italic">No billing history available.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="bg-muted"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="bg-muted"
                    />
                  </div>
                  
                  <div className="flex justify-between items-center pt-4">
                    <Button variant="outline" type="button" onClick={logout}>
                      Sign Out
                    </Button>
                    <Button type="submit" className="bg-tv-primary hover:bg-tv-primary/90">
                      Save Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Billing Tab */}
          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>
                  Update your billing details and payment method.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBillingSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="billing-name">Name on Card</Label>
                    <Input
                      id="billing-name"
                      value={billingForm.name}
                      onChange={(e) => setBillingForm({ ...billingForm, name: e.target.value })}
                      className="bg-muted"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={billingForm.address}
                      onChange={(e) => setBillingForm({ ...billingForm, address: e.target.value })}
                      className="bg-muted"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={billingForm.city}
                        onChange={(e) => setBillingForm({ ...billingForm, city: e.target.value })}
                        className="bg-muted"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={billingForm.state}
                        onChange={(e) => setBillingForm({ ...billingForm, state: e.target.value })}
                        className="bg-muted"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input
                        id="zip"
                        value={billingForm.zip}
                        onChange={(e) => setBillingForm({ ...billingForm, zip: e.target.value })}
                        className="bg-muted"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={billingForm.country}
                        onChange={(e) => setBillingForm({ ...billingForm, country: e.target.value })}
                        className="bg-muted"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-lg font-medium mb-2">Payment Method</h3>
                    {user.billingInfo?.cardLast4 ? (
                      <div className="flex justify-between items-center p-3 border rounded-md">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5" />
                          <span>Card ending in {user.billingInfo.cardLast4}</span>
                        </div>
                        <Button variant="outline" size="sm">
                          Change
                        </Button>
                      </div>
                    ) : (
                      <Button variant="outline" className="w-full">
                        Add Payment Method
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex justify-end pt-4">
                    <Button type="submit" className="bg-tv-primary hover:bg-tv-primary/90">
                      Save Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Account;
