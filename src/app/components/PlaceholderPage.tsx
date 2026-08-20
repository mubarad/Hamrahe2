import { Card } from "./ui/Card";
import { Construction } from "lucide-react";

export function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="max-w-[800px] mx-auto">
      <Card className="text-center py-20">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-violet-100 flex items-center justify-center mx-auto mb-4">
          <Construction className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-foreground mb-1">{title}</h2>
        <p className="text-sm text-muted-foreground">Coming soon. This section is under development.</p>
      </Card>
    </div>
  );
}
