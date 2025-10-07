import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  features?: string[];
}

export const FeatureCard = ({ icon, title, description, gradient, features }: FeatureCardProps) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border/50 hover:border-primary/30 overflow-hidden">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" 
           style={{ background: gradient }} />
      <CardHeader>
        <div 
          className="w-16 h-16 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg"
          style={{ background: gradient }}
        >
          {icon}
        </div>
        <CardTitle className="text-xl group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CardDescription className="text-sm leading-relaxed font-medium">
          {description}
        </CardDescription>
        {features && features.length > 0 && (
          <ul className="text-xs space-y-1 text-muted-foreground">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};