
import React, { useState } from "react";
import { channels, categories } from "@/data/mockData";
import ChannelCard from "@/components/ChannelCard";
import CategoryFilter from "@/components/CategoryFilter";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Channel } from "@/types";

const Channels: React.FC = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  
  // Filter channels based on category and search query
  const filteredChannels = channels.filter((channel) => {
    // Category filter
    const categoryMatch = !selectedCategory || channel.category.includes(selectedCategory);
    
    // Search filter
    const searchMatch = channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        channel.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Premium filter - if user doesn't have premium subscription, filter out premium channels
    const premiumMatch = !channel.isPremium || (user?.subscriptionPlan && user.subscriptionPlan.id === "premium");
    
    return categoryMatch && searchMatch && premiumMatch;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">TV Channels</h1>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="w-full md:w-auto flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search channels..."
              className="pl-10 bg-muted"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          className="w-full md:w-auto md:flex-1"
        />
      </div>
      
      {/* Channel Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredChannels.map((channel) => (
          <ChannelCard
            key={channel.id}
            channel={channel}
            onClick={() => setSelectedChannel(channel)}
          />
        ))}
      </div>
      
      {filteredChannels.length === 0 && (
        <div className="text-center py-10">
          <h3 className="text-xl font-semibold mb-2">No channels found</h3>
          <p className="text-tv-text-secondary mb-4">
            Try adjusting your filters or search query
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSelectedCategory(null);
              setSearchQuery("");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
      
      {/* Channel Details Dialog */}
      <Dialog open={!!selectedChannel} onOpenChange={(open) => !open && setSelectedChannel(null)}>
        <DialogContent className="bg-tv-card max-w-3xl">
          {selectedChannel && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center gap-3">
                  <img src={selectedChannel.logo} alt={selectedChannel.name} className="w-8 h-8" />
                  {selectedChannel.name}
                </DialogTitle>
                <DialogDescription>
                  {selectedChannel.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                {selectedChannel.currentProgram && (
                  <div className="p-4 bg-tv-bg rounded-lg">
                    <h3 className="font-bold mb-2">Currently Playing</h3>
                    <div className="flex gap-4">
                      {selectedChannel.currentProgram.thumbnail && (
                        <img 
                          src={selectedChannel.currentProgram.thumbnail} 
                          alt={selectedChannel.currentProgram.name} 
                          className="w-24 h-16 object-cover rounded"
                        />
                      )}
                      <div>
                        <p className="font-medium">{selectedChannel.currentProgram.name}</p>
                        <p className="text-sm text-tv-text-secondary">
                          {selectedChannel.currentProgram.startTime} - {selectedChannel.currentProgram.endTime}
                        </p>
                        <p className="text-sm mt-1">{selectedChannel.currentProgram.description}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end">
                  <Button className="bg-tv-primary hover:bg-tv-primary/90 tv-btn">
                    {selectedChannel.isLive ? "Watch Live" : "View Channel"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Channels;
