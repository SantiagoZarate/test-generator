import { useTheme } from '@/hooks/useTheme';
import { Button } from '../ui/Button';
import { MoonMiniIcon } from '../ui/MoonMiniIcon';
import { SunIconMini } from '../ui/SunIconMini';

export function ThemeSwitcher() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <Button
      className="rounded-sm bg-inherit p-2 text-primary"
      onClick={() => toggleTheme()}
    >
      {isDark ? <MoonMiniIcon /> : <SunIconMini />}
    </Button>
  );
}
