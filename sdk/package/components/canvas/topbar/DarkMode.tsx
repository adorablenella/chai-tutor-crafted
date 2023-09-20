import { useTranslation } from "react-i18next";
import { useDarkMode } from "../../../hooks";
import { Switch } from "../../../radix/components/ui/switch";
import { Label } from "../../../radix/components/ui/label";

export function DarkMode() {
  const [darkMode, setDarkMode] = useDarkMode();
  const { t } = useTranslation();

  return (
    <div className="flex items-center">
      <Label htmlFor="dark-mode-switch">{t("dark_mode")}</Label>
      <Switch
        id="dark-mode-switch"
        checked={darkMode}
        onCheckedChange={() => {
          setDarkMode(!darkMode);
        }}
        className={`${darkMode ? "bg-violet-600" : "bg-violet-300"}
          relative ml-2 inline-flex h-[20px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}>
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${darkMode ? "translate-x-5" : "translate-x-0"}
            pointer-events-none -mt-px inline-block h-[18px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
}
