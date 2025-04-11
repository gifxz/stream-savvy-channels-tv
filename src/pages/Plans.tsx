
import React, { useState } from "react";
import { subscriptionPlans } from "@/data/mockData";
import PlanCard from "@/components/PlanCard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { SubscriptionPlan } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2 } from "lucide-react";

const Plans: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(
    user?.subscriptionPlan || null
  );
  const [isAnnual, setIsAnnual] = useState(false);
  
  const handleContinue = () => {
    if (!selectedPlan) {
      toast({
        title: "Select a plan",
        description: "Please select a subscription plan to continue",
        variant: "destructive",
      });
      return;
    }
    
    if (!isAuthenticated) {
      // Redirect to sign up with selected plan
      localStorage.setItem("selectedPlan", JSON.stringify(selectedPlan));
      window.location.href = "/signup";
      return;
    }
    
    // Mock subscription update
    toast({
      title: "Success",
      description: `Your subscription has been updated to ${selectedPlan.name}`,
    });
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Choose Your Plan</h1>
        <p className="text-tv-text-secondary mt-2">
          Select the plan that works best for you. Upgrade or downgrade anytime.
        </p>
      </div>
      
      {/* Billing Toggle */}
      <div className="flex justify-center items-center space-x-4 my-6">
        <span className={!isAnnual ? "font-medium" : "text-tv-text-secondary"}>
          Monthly
        </span>
        
        <Button
          variant="outline"
          className={`relative rounded-full w-[56px] h-[28px] ${
            isAnnual ? "bg-tv-primary" : "bg-muted"
          }`}
          onClick={() => setIsAnnual(!isAnnual)}
        >
          <span
            className={`absolute w-5 h-5 rounded-full bg-white transition-all ${
              isAnnual ? "left-[30px]" : "left-[6px]"
            }`}
          />
        </Button>
        
        <span className={isAnnual ? "font-medium" : "text-tv-text-secondary"}>
          Yearly
          <span className="ml-1 text-tv-primary text-sm">Save 20%</span>
        </span>
      </div>
      
      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subscriptionPlans.map((plan) => {
          const annualPrice = (plan.price * 12 * 0.8).toFixed(2);
          const displayPlan = {
            ...plan,
            price: isAnnual ? parseFloat(annualPrice) / 12 : plan.price,
            billingCycle: isAnnual ? "yearly" : "monthly" as "yearly" | "monthly"
          };
          
          return (
            <PlanCard
              key={plan.id}
              plan={displayPlan}
              isSelected={selectedPlan?.id === plan.id}
              onSelect={() => setSelectedPlan(plan)}
            />
          );
        })}
      </div>
      
      {/* Features Comparison */}
      <div className="mt-12 border border-muted rounded-lg overflow-hidden">
        <div className="bg-tv-card p-4">
          <h2 className="text-xl font-bold">Plan Features Comparison</h2>
        </div>
        
        <div className="grid grid-cols-4 gap-4 p-4">
          {/* Features Column */}
          <div className="col-span-1">
            <div className="font-medium p-2">Features</div>
            <div className="p-2">Number of Channels</div>
            <div className="p-2">Video Quality</div>
            <div className="p-2">Simultaneous Devices</div>
            <div className="p-2">Catch-up TV</div>
            <div className="p-2">Premium Sports</div>
          </div>
          
          {/* Plan Columns */}
          {subscriptionPlans.map((plan) => (
            <div key={plan.id} className="col-span-1">
              <div className="font-bold p-2 text-tv-primary">{plan.name}</div>
              <div className="p-2">{plan.channelCount}+</div>
              <div className="p-2">
                {plan.id === "basic" && "SD"}
                {plan.id === "standard" && "HD"}
                {plan.id === "premium" && "4K UHD"}
              </div>
              <div className="p-2">
                {plan.id === "basic" && "1"}
                {plan.id === "standard" && "2"}
                {plan.id === "premium" && "4"}
              </div>
              <div className="p-2">
                {plan.id === "basic" && "7 days"}
                {plan.id === "standard" && "45 days"}
                {plan.id === "premium" && "90 days"}
              </div>
              <div className="p-2">
                {plan.id === "premium" ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  "—"
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="flex justify-center mt-8">
        <Button 
          size="lg" 
          className="bg-tv-primary hover:bg-tv-primary/90 tv-btn"
          onClick={handleContinue}
        >
          {isAuthenticated
            ? "Update Subscription"
            : "Continue to Registration"}
        </Button>
      </div>
    </div>
  );
};

export default Plans;
