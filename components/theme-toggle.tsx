"use client";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {};

export default function ThemeToggle({}: Props) {
  const { theme, setTheme } = useTheme();
  const iconClasses =
    "text-zinc-600 hover:text-zinc-950 transition w-5 h-5 dark:text-zinc-500 dark:hover:text-zinv-300";
  return (
    <div className="w-fit">
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        <Sun
          className={cn(iconClasses, theme === "dark" ? "hidden" : "block")}
        />
        <Moon
          className={cn(iconClasses, theme !== "dark" ? "hidden" : "block")}
        />
      </button>
    </div>
  );
}
