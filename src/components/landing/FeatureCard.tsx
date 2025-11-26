import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
  color: string;
}

export const FeatureCard = ({
  icon: Icon,
  title,
  description,
  link,
  color,
}: FeatureCardProps) => {
  return (
    <Link to={link}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors cursor-pointer">
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-mono font-semibold text-foreground">{title}</h3>
            </div>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
};
