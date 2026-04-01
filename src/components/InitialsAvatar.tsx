  import { cn } from "../lib/classMerge";

interface InitialsAvatarProps {
  name: string;
  className?: string;
}

export function InitialsAvatar({ name, className }: InitialsAvatarProps) {
  const initials = name
    .split(" ")
    .map((letter) => letter.charAt(0).toUpperCase());

  return (
    <p className={cn(["text-app-gray-600 text-sm uppercase", className])}>
      {initials}
    </p>
  );
}
