import { useTheme } from "@/hooks/useTheme";
import { Button } from "../ui/Button";
import { MoonMiniIcon } from "../ui/MoonMiniIcon";
import { SunIconMini } from "../ui/SunIconMini";

export function ThemeSwitcher() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <Button
      className="bg-inherit text-primary p-2 rounded-sm"
      onClick={() => toggleTheme()}
    >
      {isDark ? <MoonMiniIcon /> : <SunIconMini />}
    </Button>
  );
}
