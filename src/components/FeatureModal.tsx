import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface FeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  features: string[];
  gradient: string;
  icon: React.ReactNode;
}

export const FeatureModal = ({
  isOpen,
  onClose,
  title,
  description,
  features,
  gradient,
  icon,
}: FeatureModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center text-white shadow-lg"
              style={{ background: gradient }}
            >
              {icon}
            </div>
            <div>
              <DialogTitle className="text-2xl">{title}</DialogTitle>
              <Badge variant="secondary" className="mt-2">
                Interactive Demo
              </Badge>
            </div>
          </div>
          <DialogDescription className="text-base leading-relaxed">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <h4 className="font-semibold text-lg">મુખ્ય Features:</h4>
          <div className="grid gap-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm">{feature}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t">
            <Button className="w-full" size="lg" style={{ background: gradient }}>
              Try Live Demo
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
