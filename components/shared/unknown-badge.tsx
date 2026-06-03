import { Badge } from "@/components/ui/badge";
import { STR } from "@/lib/i18n/strings";
import { cn } from "@/lib/utils";

export function isUnknown(value: string): boolean {
  return value.trim().toLowerCase() === "unknown";
}

export function UnknownBadge({ className }: { className?: string }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "border-dashed bg-muted/60 text-muted-foreground font-normal",
        className
      )}
    >
      {STR.unknown.value}
    </Badge>
  );
}

export function MetadataValue({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  if (isUnknown(value)) {
    return <UnknownBadge className={className} />;
  }
  return <span className={className}>{value}</span>;
}
