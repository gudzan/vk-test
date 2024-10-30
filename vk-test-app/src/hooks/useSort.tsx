import React, { ReactNode, useContext, useState } from "react";
import Sort from "../types/sort";

const defaultValue = {
  sortField: "stars",
  sortOrder: "desc"
}

type SortContextType = {
  sort: Sort;
  setSortOrder: (newSortOrder: string) => void;
  setSortField: (newSortField: string) => void;
};

const SortContext = React.createContext<SortContextType | null>(null);

export const useSort = () => {
  return useContext(SortContext) as SortContextType;
};

export const SortProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sort, setSort] = useState<Sort>(defaultValue)

  const setSortOrder = (newSortOrder: string) => {
    setSort((prevState) => ({
      ...prevState,
      sortOrder: newSortOrder,
    }));
  };

  const setSortField = (newSortField: string) => {
    setSort((prevState) => ({
      ...prevState,
      sortField: newSortField,
    }));
  };

  return (
    <SortContext.Provider value={{ sort, setSortOrder, setSortField }}>
      {children}
    </SortContext.Provider>
  );
};
