import { ReactNode, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ModuleSectionProps {
  title: string;
  icon: ReactNode;
  iconColor: string;
  description: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export const ModuleSection = ({ 
  title, 
  icon, 
  iconColor, 
  description, 
  children,
  defaultOpen = true 
}: ModuleSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section className="space-y-8">
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-4">
          <h2 className="text-4xl md:text-5xl font-bold flex items-center justify-center gap-3">
            <span className={iconColor}>
              {icon}
            </span>
            {title}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="text-muted-foreground hover:text-foreground"
          >
            {isOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
          </Button>
        </div>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{description}</p>
      </div>
      {isOpen && (
        <div className="animate-fade-in">
          {children}
        </div>
      )}
    </section>
  );
};