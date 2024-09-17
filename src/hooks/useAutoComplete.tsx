import { TCityData } from "@/types";
import { useRef, useState } from "react";

const useAutoComplete = ({
  delay = 500,
  source,
  onChange,
}: {
  delay?: number;
  source: (search: string) => Promise<TCityData[]>;
  onChange: (option: TCityData, index: number) => void;
}) => {
  const [myTimeout, setMyTimeOut] = useState(setTimeout(() => {}, 0));
  const listRef = useRef({} as HTMLUListElement);
  const [suggestions, setSuggestions] = useState<TCityData[]>([]);
  const [isBusy, setBusy] = useState(false);
  const [textValue, setTextValue] = useState("");

  function delayInvoke(cb: () => void) {
    if (myTimeout) {
      clearTimeout(myTimeout);
    }
    setMyTimeOut(setTimeout(cb, delay));
  }

  function selectOption(index: number) {
    if (index > -1) {
      onChange(suggestions[index], index);
      setTextValue(suggestions[index].name);
    }
    clearSuggestions();
  }

  async function getSuggestions(searchTerm: string) {
    if (searchTerm && source) {
      const options = await source(searchTerm);
      setSuggestions(options);
    }
  }

  function clearSuggestions() {
    setSuggestions([]);
  }

  function onTextChange(searchTerm: string) {
    setBusy(true);
    setTextValue(searchTerm);
    clearSuggestions();
    delayInvoke(() => {
      getSuggestions(searchTerm);
      setBusy(false);
    });
  }

  return {
    bindOption: {
      onClick: (e: React.MouseEvent<HTMLElement>) => {
        const nodes = Array.from(listRef.current.children);
        selectOption(
          nodes.indexOf((e.target as Element).closest("li") as Element)
        );
      },
    },
    bindInput: {
      value: textValue,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        onTextChange(e.target.value),
    },
    bindOptions: {
      ref: listRef,
    },
    isBusy,
    suggestions,
  };
};

export default useAutoComplete;
