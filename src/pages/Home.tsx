
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { categories, channels, subscriptionPlans } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import ChannelCard from "@/components/ChannelCard";
import PlanCard from "@/components/PlanCard";

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  // Featured channels
  const featuredChannels = channels.slice(0, 4);
  
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-8 md:py-12 space-y-6 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Your Favorite TV Channels<br/>
          <span className="text-tv-primary">Anytime, Anywhere</span>
        </h1>
        
        <p className="text-xl text-tv-text-secondary max-w-[700px]">
          Stream live TV, catch up on your favorite shows, and discover new content with PPTV.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          {isAuthenticated ? (
            <Button 
              size="lg" 
              className="tv-btn bg-tv-primary hover:bg-tv-primary/90"
              asChild
            >
              <Link to="/channels">Browse Channels</Link>
            </Button>
          ) : (
            <>
              <Button 
                size="lg" 
                className="tv-btn bg-tv-primary hover:bg-tv-primary/90"
                asChild
              >
                <Link to="/signin">Start Watching</Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="tv-btn"
                asChild
              >
                <Link to="/plans">View Plans</Link>
              </Button>
            </>
          )}
        </div>
      </section>
      
      {/* Featured Channels Section */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">Featured Channels</h2>
          <Button variant="link" className="text-tv-secondary" asChild>
            <Link to="/channels">View All</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featuredChannels.map((channel) => (
            <ChannelCard 
              key={channel.id} 
              channel={channel} 
              onClick={() => {}} 
            />
          ))}
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div 
              key={category.id}
              className="bg-tv-card p-6 rounded-lg text-center hover:ring-2 hover:ring-tv-primary hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <h3 className="text-xl font-bold mb-2">{category.name}</h3>
              <p className="text-tv-text-secondary text-sm">{category.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Plans Section */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">Subscription Plans</h2>
          <Button variant="link" className="text-tv-secondary" asChild>
            <Link to="/plans">Compare Plans</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subscriptionPlans.map((plan) => (
            <PlanCard 
              key={plan.id} 
              plan={plan}
              showSubscribeButton={true}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
