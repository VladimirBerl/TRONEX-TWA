import { SelectTrigger, Select, SelectValue, SelectContent, SelectItem } from "@/shared/ui/select";
import i18n from "@/shared/config/i18n/i18n.ts";

export const LanguageSelector = () => {
  const changeLanguage = (lng: string): void => {
    void i18n.changeLanguage(lng);
  };

  return (
    <Select onValueChange={(lng: string): void => changeLanguage(lng)}>
      <SelectTrigger className="[&>svg]:hidden bg-[#1B1D29] absolute top-[5px] right-[5px] z-50 flex justify-center min-w-[40px] p-2 border-[#535A64] cursor-pointer text-link-strong">
        <SelectValue className="text-link-strong" placeholder="EN" />
      </SelectTrigger>

      <SelectContent className="bg-[#1B1D29] text-link-strong">
        <SelectItem value="en">EN</SelectItem>
        <SelectItem value="ru">RU</SelectItem>
        <SelectItem value="zh">ZH</SelectItem>
      </SelectContent>
    </Select>
  );
};
