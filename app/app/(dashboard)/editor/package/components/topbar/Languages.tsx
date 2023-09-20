import { FontFamilyIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../radix-ui";
import { useLanguages } from "../../hooks/useLanguages";

export const Languages = () => {
  const languages = useLanguages();

  if (languages.length === 1) {
    return null;
  }
  return (
    <div className="flex items-center">
      <Select>
        <SelectTrigger className="w-[150px] border-0">
          <SelectValue
            placeholder={
              <span className="flex items-center">
                <FontFamilyIcon className="w-4 h-4" />
                &nbsp;English(US)
              </span>
            }
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
