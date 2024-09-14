import {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Label,
  TextInput,
  Modal,
  Dropdown,
} from "flowbite-react";
import { tableTheme } from "./table_theme";
import { useEffect, useState } from "react";

import { HiPencil, HiTrash } from "react-icons/hi";

import {
  ListSkeletalComponent,
  TableActionsComponent,
  TableFooterComponent,
  TableHeaderComponent,
} from "../components";
import useQuery from "../hooks/query";
import { Customer } from "../types";

export function CustomersPage() {
  const [openedModal, setOpenedModal] = useState("");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);

  const {
    data: customers,
    count,
    loading,
    error,
    refresh,
  } = useQuery<Customer[]>({
    table: "customers",
    is_single: false,
    from: start,
    to: end,
  });

  return (
    <>
      <div className="overflow-x-auto rounded-md h-full flex flex-col">
        <TableHeaderComponent>
          <Button
            type="submit"
            className="uppercase"
            onClick={() => setOpenedModal("user-modal")}
          >
            add customer
          </Button>
        </TableHeaderComponent>
        <div className="h-full overflow-y-auto">
          <Table hoverable theme={tableTheme} className="table-fixed">
            <TableHead>
              <TableHeadCell className="w-14">id</TableHeadCell>
              <TableHeadCell>name</TableHeadCell>
              <TableHeadCell>company</TableHeadCell>
              <TableHeadCell>telephone</TableHeadCell>
              <TableHeadCell>address</TableHeadCell>
              <TableHeadCell className="w-24">
                <span className="sr-only">Actions</span>
              </TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {loading ? (
                <ListSkeletalComponent cols={4} />
              ) : (
                <>
                  {customers?.map((item) => (
                    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {item.id}
                      </TableCell>
                      <TableCell>
                        {item?.name}
                      </TableCell>
                      <TableCell>{item.company_name}</TableCell>
                      <TableCell>{item.contact}</TableCell>
                      <TableCell>{item.address}</TableCell>
                      <TableCell>
                        <TableActionsComponent>
                          <>
                            <Dropdown.Item
                              icon={HiPencil}
                              onClick={() => setOpenedModal("user-modal")}
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              icon={HiTrash}
                              onClick={() => setOpenedModal("confirm-modal")}
                            >
                              Delete
                            </Dropdown.Item>
                          </>
                        </TableActionsComponent>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </div>
        <TableFooterComponent
          count={count}
          setStart={setStart}
          setEnd={setEnd}
          start={start}
        />
      </div>


    </>
  );
}
