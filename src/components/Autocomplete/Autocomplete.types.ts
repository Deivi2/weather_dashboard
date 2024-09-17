import { TCityData } from "@/types";

export type AutocompleteProps = {
  onChange: (option: TCityData, index: number) => void;
};
