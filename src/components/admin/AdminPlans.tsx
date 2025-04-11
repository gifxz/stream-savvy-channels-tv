
import React, { useState, useEffect } from "react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter 
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; 
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { SubscriptionPlan } from "@/types";
import { DatabaseService } from "@/services/DatabaseService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Edit, Trash2, Plus } from "lucide-react";

const planFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  billingCycle: z.enum(["monthly", "yearly"]),
  features: z.string(),
  channelCount: z.coerce.number().int().min(1, "Must have at least 1 channel"),
  isActive: z.boolean().default(true),
});

type PlanFormValues = z.infer<typeof planFormSchema>;

const AdminPlans: React.FC = () => {
  const { toast } = useToast();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<SubscriptionPlan | null>(null);

  const form = useForm<PlanFormValues>({
    resolver: zodResolver(planFormSchema),
    defaultValues: {
      name: "",
      price: 0,
      billingCycle: "monthly",
      features: "",
      channelCount: 1,
      isActive: true,
    },
  });

  // Load plans from database
  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = () => {
    const plans = DatabaseService.getPlans();
    setPlans(plans);
  };

  const handleOpenEditDialog = (plan: SubscriptionPlan) => {
    setCurrentPlan(plan);
    form.reset({
      name: plan.name,
      price: plan.price,
      billingCycle: plan.billingCycle,
      features: plan.features.join("\n"),
      channelCount: plan.channelCount,
      isActive: plan.isActive !== false,
    });
    setIsDialogOpen(true);
  };

  const handleOpenAddDialog = () => {
    setCurrentPlan(null);
    form.reset({
      name: "",
      price: 0,
      billingCycle: "monthly",
      features: "",
      channelCount: 1,
      isActive: true,
    });
    setIsDialogOpen(true);
  };

  const handleOpenDeleteDialog = (plan: SubscriptionPlan) => {
    setPlanToDelete(plan);
    setIsDeleteDialogOpen(true);
  };

  const handleDeletePlan = () => {
    if (!planToDelete) return;

    try {
      DatabaseService.deletePlan(planToDelete.id);
      loadPlans();
      toast({
        title: "Success",
        description: "Plan deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete plan",
        variant: "destructive",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setPlanToDelete(null);
    }
  };

  const onSubmit = (values: PlanFormValues) => {
    try {
      const features = values.features
        .split("\n")
        .map(feature => feature.trim())
        .filter(feature => feature.length > 0);

      if (currentPlan) {
        // Update existing plan
        const updatedPlan: SubscriptionPlan = {
          ...currentPlan,
          name: values.name,
          price: values.price,
          billingCycle: values.billingCycle,
          features,
          channelCount: values.channelCount,
          isActive: values.isActive,
        };
        DatabaseService.updatePlan(updatedPlan);
      } else {
        // Create new plan
        const newPlan: SubscriptionPlan = {
          id: `plan-${Date.now()}`,
          name: values.name,
          price: values.price,
          billingCycle: values.billingCycle,
          features,
          channelCount: values.channelCount,
          isActive: values.isActive,
        };
        DatabaseService.addPlan(newPlan);
      }

      loadPlans();
      setIsDialogOpen(false);
      toast({
        title: "Success",
        description: currentPlan 
          ? "Plan updated successfully" 
          : "Plan created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save plan",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage Subscription Plans</h2>
        <Button onClick={handleOpenAddDialog} className="flex items-center gap-2">
          <Plus size={16} />
          Add Plan
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Billing Cycle</TableHead>
            <TableHead>Channel Count</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {plans.map((plan) => (
            <TableRow key={plan.id}>
              <TableCell>{plan.name}</TableCell>
              <TableCell>${plan.price.toFixed(2)}</TableCell>
              <TableCell>{plan.billingCycle}</TableCell>
              <TableCell>{plan.channelCount}+</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded text-xs ${
                  plan.isActive !== false 
                    ? "bg-green-100 text-green-800" 
                    : "bg-gray-100 text-gray-800"
                }`}>
                  {plan.isActive !== false ? "Active" : "Inactive"}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleOpenEditDialog(plan)}
                >
                  <Edit size={16} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleOpenDeleteDialog(plan)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit/Add Plan Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentPlan ? "Edit Plan" : "Add New Plan"}
            </DialogTitle>
            <DialogDescription>
              {currentPlan 
                ? "Update the subscription plan details below." 
                : "Fill out the form to create a new subscription plan."}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plan Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Basic, Standard, Premium, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="9.99" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="billingCycle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Billing Cycle</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select billing cycle" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="channelCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Channel Count</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1" 
                        placeholder="Number of channels" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Features (one per line)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter features, one per line"
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Active Status</FormLabel>
                      <FormDescription>
                        Activate or deactivate this plan
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the "{planToDelete?.name}" plan? 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeletePlan}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPlans;
