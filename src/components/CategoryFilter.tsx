
import React from "react";
import { Category } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
  className?: string;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  className,
}) => {
  return (
    <div className={cn("w-full", className)}>
      <ScrollArea className="w-full whitespace-nowrap pb-4">
        <div className="flex space-x-2 p-1">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            className={cn(
              "rounded-full min-w-[80px] tv-focus",
              selectedCategory === null ? "bg-tv-primary hover:bg-tv-primary/90" : "hover:bg-muted"
            )}
            onClick={() => onSelectCategory(null)}
          >
            All
          </Button>
          
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={cn(
                "rounded-full min-w-[100px] tv-focus",
                selectedCategory === category.id ? "bg-tv-primary hover:bg-tv-primary/90" : "hover:bg-muted"
              )}
              onClick={() => onSelectCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default CategoryFilter;
