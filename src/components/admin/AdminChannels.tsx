
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
import { useToast } from "@/hooks/use-toast";
import { Channel, Category } from "@/types";
import { DatabaseService } from "@/services/DatabaseService";
import { Edit, Eye } from "lucide-react";

const AdminChannels: React.FC = () => {
  const { toast } = useToast();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);

  // Load channels and categories from database
  useEffect(() => {
    loadChannels();
    const categories = DatabaseService.getCategories();
    setCategories(categories);
  }, []);

  const loadChannels = () => {
    const channels = DatabaseService.getChannels();
    setChannels(channels);
  };

  const handleViewChannel = (channel: Channel) => {
    setCurrentChannel(channel);
    setIsViewDialogOpen(true);
  };

  const getCategoryNames = (categoryIds: string[]) => {
    return categoryIds.map(id => {
      const category = categories.find(c => c.slug === id);
      return category ? category.name : id;
    }).join(", ");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage Channels</h2>
        <p className="text-tv-text-secondary text-sm">
          In this demo, channel editing is limited. Full channel management would be implemented in a production version.
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Channel Name</TableHead>
            <TableHead>Categories</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Premium</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {channels.map((channel) => (
            <TableRow key={channel.id}>
              <TableCell>
                <img 
                  src={channel.logo} 
                  alt={channel.name} 
                  className="w-10 h-10 object-contain"
                />
              </TableCell>
              <TableCell className="font-medium">{channel.name}</TableCell>
              <TableCell>{getCategoryNames(channel.category)}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded text-xs ${
                  channel.isLive 
                    ? "bg-green-100 text-green-800" 
                    : "bg-gray-100 text-gray-800"
                }`}>
                  {channel.isLive ? "Live" : "Offline"}
                </span>
              </TableCell>
              <TableCell>
                {channel.isPremium ? "Premium" : "Standard"}
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleViewChannel(channel)}
                >
                  <Eye size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* View Channel Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Channel Details</DialogTitle>
          </DialogHeader>

          {currentChannel && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img 
                  src={currentChannel.logo} 
                  alt={currentChannel.name} 
                  className="w-16 h-16 object-contain"
                />
                <div>
                  <h3 className="text-lg font-bold">{currentChannel.name}</h3>
                  <p className="text-tv-text-secondary text-sm">
                    {getCategoryNames(currentChannel.category)}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Description</h4>
                <p>{currentChannel.description}</p>
              </div>

              {currentChannel.currentProgram && (
                <div className="space-y-2">
                  <h4 className="font-medium">Current Program</h4>
                  <div className="flex items-start space-x-3">
                    {currentChannel.currentProgram.thumbnail && (
                      <img 
                        src={currentChannel.currentProgram.thumbnail} 
                        alt={currentChannel.currentProgram.name}
                        className="w-20 h-auto rounded"
                      />
                    )}
                    <div>
                      <p className="font-medium">{currentChannel.currentProgram.name}</p>
                      <p className="text-sm text-tv-text-secondary">
                        {new Date(currentChannel.currentProgram.startTime).toLocaleTimeString()} - 
                        {new Date(currentChannel.currentProgram.endTime).toLocaleTimeString()}
                      </p>
                      <p className="text-sm mt-1">{currentChannel.currentProgram.description}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div className="border rounded p-3">
                  <p className="text-sm text-tv-text-secondary">Status</p>
                  <p className="font-medium">{currentChannel.isLive ? "Live" : "Offline"}</p>
                </div>
                <div className="border rounded p-3">
                  <p className="text-sm text-tv-text-secondary">Type</p>
                  <p className="font-medium">{currentChannel.isPremium ? "Premium" : "Standard"}</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsViewDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminChannels;
