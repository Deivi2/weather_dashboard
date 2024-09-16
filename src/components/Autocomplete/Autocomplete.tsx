import { Search } from "lucide-react";
import { getCityData } from "@/utils/services";
import useAutoComplete from "@/hooks/useAutoComplete";
import { AutocompleteProps } from "./Autocomplete.types";

const Autocomplete: React.FC<AutocompleteProps> = ({ onChange }) => {
  const { bindInput, bindOptions, bindOption, isBusy, suggestions } =
    useAutoComplete({
      onChange,
      source: async (search: string) => getCityData(search),
    });

  return (
    <div className="p-2 w-full z-10">
      <div className="flex  items-center isolate aspect-video rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5 h-10 px-3">
        <Search className="text-white" />

        <input
          placeholder="Search city"
          className="flex-grow  px-2 outline-none bg-transparent placeholder-white text-white"
          {...bindInput}
        />

        {isBusy && (
          <div className="w-4 h-4 border-2 border-dashed rounded-full border-white-500 animate-spin"></div>
        )}
      </div>

      <ul
        {...bindOptions}
        className="absolute max-h-[260px] bg-white overflow-x-hidden overflow-y-auto cursor-pointer rounded-lg mt-1"
      >
        {suggestions.map((item, index) => (
          <li
            className={"flex items-center h-[40px] p-1 hover:bg-slate-300"}
            key={index}
            {...bindOption}
          >
            <div className="flex items-center space-x-1">
              <div className="flex gap-3">
                <p>{item.name}</p> - <p>{item.state}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
