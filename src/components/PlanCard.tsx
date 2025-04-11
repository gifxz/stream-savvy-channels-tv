
import React from "react";
import { SubscriptionPlan } from "@/types";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PlanCardProps {
  plan: SubscriptionPlan;
  isSelected?: boolean;
  onSelect?: () => void;
  showSubscribeButton?: boolean;
  className?: string;
}

const PlanCard: React.FC<PlanCardProps> = ({ 
  plan, 
  isSelected = false,
  onSelect,
  showSubscribeButton = false,
  className 
}) => {
  return (
    <Card 
      className={cn(
        "border border-muted transition-all duration-300 h-full flex flex-col bg-tv-card",
        isSelected ? "ring-2 ring-tv-primary border-tv-primary" : "",
        className
      )}
      onClick={onSelect}
    >
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{plan.name}</CardTitle>
      </CardHeader>
      
      <CardContent className="text-center flex-grow">
        <div className="mb-6">
          <p className="text-4xl font-bold">${plan.price.toFixed(2)}</p>
          <p className="text-tv-text-secondary">per {plan.billingCycle}</p>
        </div>
        
        <div className="text-left">
          <p className="font-medium mb-3">{plan.name} includes:</p>
          <ul className="space-y-2">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check size={18} className="mr-2 flex-shrink-0 text-tv-primary" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      
      <CardFooter>
        {showSubscribeButton ? (
          <Button 
            variant="default" 
            className="w-full bg-tv-primary hover:bg-tv-primary/90 text-white tv-btn"
          >
            Subscribe Now
          </Button>
        ) : (
          <Button 
            variant={isSelected ? "default" : "outline"} 
            className={cn(
              "w-full tv-btn",
              isSelected ? "bg-tv-primary hover:bg-tv-primary/90 text-white" : ""
            )}
            onClick={onSelect}
          >
            {isSelected ? "Selected" : "Select Plan"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PlanCard;
