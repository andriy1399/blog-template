import { Separator } from "../ui/separator";

const OR = () => {
  return (
    <div className="relative mb-6">
      <Separator />
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-header px-2 text-xs text-muted-foreground">
        OR
      </span>
    </div>
  );
};

export default OR;
