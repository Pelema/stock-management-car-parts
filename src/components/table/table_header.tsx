import {
  TextInput,
  Popover,
  Checkbox,
  Label,
  Button,
  Datepicker,
} from "flowbite-react";

import { HiSearch, HiFilter } from "react-icons/hi";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck2All } from "react-icons/bs";
import { ReactNode, useEffect, useState } from "react";

type TTableHeaderProps = {
  children?: ReactNode;
  onSearch: (text: string) => void;
  filter?: boolean;
};

export default function TableHeaderComponent({ children, onSearch, filter = false }: TTableHeaderProps) {

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300); // Delay of 300ms

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
      onSearch(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <div className="p-5 uppercase text-md font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <form className="w-[300px]">
            <TextInput
              id="search"
              type="search"
              placeholder="Search ..."
              required
              className="w-full"
              icon={HiSearch}
              onChange={(event) => setSearchQuery(event.target.value.trim())}
            />
          </form>
          {
            filter &&
            <Popover
              aria-labelledby="default-popover"
              arrow={false}
              placement="bottom"
              content={
                <div
                  className="flex   flex-col gap-4 p-4 capitalize font-bold"
                  id="checkbox"
                >
                  <div className="flex space-x-4">
                    <div className="flex flex-col w-[200px] justify-between">
                      <div className="flex flex-col space-y-6">
                        <div>
                          <div className="mb-3">By status</div>
                          <div className="pl-2 flex flex-col space-y-2">
                            <div className="flex items-center gap-2">
                              <Checkbox id="accept" defaultChecked />
                              <Label htmlFor="accept" className="font-semibold">
                                Pending
                              </Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <Checkbox id="promotion" />
                              <Label
                                htmlFor="promotion"
                                className="font-semibold"
                              >
                                Processing
                              </Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <Checkbox id="promotion" />
                              <Label
                                htmlFor="promotion"
                                className="font-semibold"
                              >
                                Completed
                              </Label>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="mb-3">By amount</div>
                          <div className="pl-2 flex flex-col space-y-2">
                            <div className="flex items-center gap-2">
                              <Checkbox id="age" />
                              <Label htmlFor="age" className="font-semibold">
                                0 - 500
                              </Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <Checkbox id="age" />
                              <Label htmlFor="age" className="font-semibold">
                                500 - 1 000
                              </Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <Checkbox id="age" />
                              <Label htmlFor="age" className="font-semibold">
                                Above 1000
                              </Label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button type="submit" outline>
                        <BsCheck2All className="mr-2 h-5 w-5" />
                        Apply
                      </Button>
                    </div>
                    <div>
                      <div>By date</div>
                      <Datepicker inline />
                    </div>
                  </div>
                </div>
              }
            >
              <Button outline>
                <HiFilter className="mr-2 h-5 w-5" />
                Filter
                <BiChevronDown className="ml-2" />
              </Button>
            </Popover>
          }
        </div>
        {children}
      </div>
    </div>
  );
}
