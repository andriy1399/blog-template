import React from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import axios from "axios";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { useTheme } from "next-themes";

interface Option {
  value: string;
  label: string;
}

interface ResponseData {
  results: Option[];
  hasMore: boolean;
}

interface TagsMultiSelectProps
  extends ControllerRenderProps<FieldValues, string> {
  placeholder?: string;
  maxSelected?: number;
}

const TagsMultiSelect: React.FC<TagsMultiSelectProps> = ({
  onChange,
  value,
  name,
  maxSelected,
  placeholder = "Select options...",
}) => {
  const theme = useTheme();
  const loadOptions = async (
    searchQuery: string,
    loadedOptions: Option[],
    { page }: { page: number }
  ): Promise<{
    options: Option[];
    hasMore: boolean;
    additional: { page: number };
  }> => {
    try {
      const response = await axios.get<ResponseData>(`/api/tag`, {
        params: {
          page: page,
          search: searchQuery,
        },
      });

      const responseData = response.data;

      return {
        options: responseData.results,
        hasMore: responseData.hasMore,
        additional: {
          page: page + 1,
        },
      };
    } catch (error) {
      console.error("Error loading options:", error);
      return {
        options: [],
        hasMore: false,
        additional: {
          page: page,
        },
      };
    }
  };

  return (
    <AsyncPaginate
      isMulti
      value={value}
      loadOptions={(searchQuery, loadedOptions, additional) =>
        loadOptions(searchQuery, loadedOptions as Option[], {
          page: additional?.page || 1,
        })
      }
      onChange={onChange}
      additional={{ page: 1 }}
      placeholder={placeholder}
      name={name}
      menuIsOpen={
        maxSelected
          ? (value as Option[]).length < maxSelected
            ? undefined
            : false
          : undefined
      }
      classNames={{
        control: ({ isFocused }) =>
          `border !border-input !hover:border-input !focus:border-input rounded-md shadow-sm !focus:outline-none !bg-background ${
            isFocused ? "!border-ring ring-1 ring-ring" : ""
          }`,
        valueContainer: () => "flex flex-wrap gap-1 p-2",
        input: () =>
          "!bg-transparent !focus:outline-none !text-foreground !placeholder:text-muted-foreground",
        indicatorSeparator: () => "!hidden",
        indicatorsContainer: () => "!hidden",
        dropdownIndicator: () => "!hidden",
        clearIndicator: () => "!text-foreground !hover:text-destructive",
        multiValue: () => "flex items-center !bg-secondary  px-2 rounded",
        multiValueLabel: () => "text-sm !text-secondary-foreground",
        multiValueRemove: () =>
          "ml-1 cursor-pointer text-secondary-foreground hover:text-destructive",
        menu: () =>
          "mt-1 !bg-header border border-input rounded-md shadow-md z-10 overflow-auto",
        menuList: () => "!bg-background h-full",
        option: ({ isFocused, isSelected }) =>
          `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
            isSelected
              ? "bg-primary text-primary-foreground"
              : isFocused
              ? theme.theme === "dark"
                ? "!bg-accent !text-accent-foreground"
                : "!bg-accent !text-accent-foreground"
              : "text-popover-foreground"
          }`,
        noOptionsMessage: () => "px-4 py-2 text-sm text-muted-foreground",
        loadingMessage: () => "px-4 py-2 text-sm text-muted-foreground",
        placeholder: () => "text-muted-foreground",
        singleValue: () => "text-foreground",
      }}
    />
  );
};

export default TagsMultiSelect;
