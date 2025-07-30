import { SelectTrigger, Select, SelectValue, SelectContent, SelectItem } from "@/shared/ui/select.tsx";
import i18n from "@/shared/config/i18n/i18n.ts";

export const LanguageSelector = () => {
  const changeLanguage = (lng: string)  => {
    void i18n.changeLanguage(lng);
  }

  return (
    <Select onValueChange={ (lng) => changeLanguage(lng) }>
      <SelectTrigger
        className="absolute top-[5px] right-[5px] w-[65px] p-2 bg-[#1B1D29] border-none cursor-pointer text-link-strong">
        <SelectValue placeholder="lng"/>
      </SelectTrigger>

      <SelectContent className="bg-[#1B1D29] text-link-strong">
        <SelectItem value="en">EN</SelectItem>
        <SelectItem value="ru">RU</SelectItem>
        <SelectItem value="zh">ZH</SelectItem>
      </SelectContent>
    </Select>
  );
};
