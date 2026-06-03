export function Label({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-xs font-medium text-muted-foreground uppercase tracking-wide ${className ?? ""}`}>
      {children}
    </p>
  );
}
