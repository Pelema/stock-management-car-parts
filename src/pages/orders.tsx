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
import { AddOrderModal, ConfirmModal } from "../modals";
import { useForm } from "react-hook-form";
import useQuery from "../hooks/query";
import { Order } from "../types";

export function OrdersPage() {
  const [openedModal, setOpenedModal] = useState("");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);

  const { data: orders, loading: isLoading, error: isError, refresh, count } = useQuery<Order[]>({
    table: 'sales_orders', from: start, to: end,
    filter: `
      id,
      order_number,
      order_date,
      status,
      total_amount,
      customer:customers(name, telephone, address, company_name),
      sales_order_items(
        quantity,
        unit_price,
        total_price,
        product:stock(OEM_number, description,manufacturer)
      )
    `
  });

  return (
    <>
      <div className="overflow-x-auto rounded-md h-full flex flex-col">
        <TableHeaderComponent>
          <Button
            type="submit"
            className="uppercase"
            onClick={() => setOpenedModal("order-modal")}
          >
            add order
          </Button>
        </TableHeaderComponent>
        <div className="h-full overflow-y-auto">
          <Table hoverable theme={tableTheme} className="table-fixed">
            <TableHead>
              <TableHeadCell className="w-20">id</TableHeadCell>
              <TableHeadCell>order #</TableHeadCell>
              <TableHeadCell>order date</TableHeadCell>
              <TableHeadCell>customer name</TableHeadCell>
              <TableHeadCell>telephone</TableHeadCell>
              <TableHeadCell>company name</TableHeadCell>
              <TableHeadCell className="w-24">
                <span className="sr-only">Actions</span>
              </TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {isLoading ? (
                <ListSkeletalComponent cols={5} />
              ) : (
                <>
                  {orders?.map((item) => (
                    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {item.id}
                      </TableCell>
                      <TableCell>{item.order_number}</TableCell>
                      <TableCell>{item.order_date.toString()}</TableCell>

                      <TableCell>
                        {item.customer?.name}
                      </TableCell>
                      <TableCell>{item?.customer?.telephone}</TableCell>
                      <TableCell>{item?.customer?.company_name}</TableCell>
                      <TableCell>
                        <TableActionsComponent>
                          <>
                            <Dropdown.Item
                              icon={HiPencil}
                              onClick={() => setOpenedModal("order-modal")}
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



      <AddOrderModal
        openedModal={openedModal}
        setOpenedModal={setOpenedModal}
        refresh={refresh}
      />

      <ConfirmModal
        openedModal={openedModal}
        setOpenedModal={setOpenedModal} confirm={undefined} loading={false} />
    </>
  );
}

