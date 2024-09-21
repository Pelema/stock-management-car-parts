import {
  Avatar,
  Button,
  Dropdown,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow
} from "flowbite-react";
import { useState } from "react";
import { HiEye, HiPencil, HiPlus, HiPrinter, HiShare, HiTrash } from "react-icons/hi";
import { toast } from "sonner";
import {
  ListSkeletalComponent,
  TableActionsComponent,
  TableFooterComponent,
  TableHeaderComponent,
} from "../components";
import { formatCurrency } from "../functions";
import useMutation from "../hooks/mutation";
import useQuery from "../hooks/query";
import { AddOrderModal, ConfirmModal, ViewOrderModal } from "../modals";
import { Order } from "../types";
import { tableTheme } from "./table_theme";

export function OrdersPage() {
  const [openedModal, setOpenedModal] = useState("");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState<Order>();

  const { data: orders, loading: isLoading, search, refresh, count } = useQuery<Order[]>({
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
        product:stock(OEM_number, description,manufacturer,id,name)
      )
    `
  });

  const { onDelete, loading, insert, update } = useMutation();

  const onSearch = async (text: string) => {
    if (text.length > 0)
      search(`order_number.ilike.%${text}%,status.ilike.%${text}%`);
    // customer.name.ilike.%${text}%
  }

  const confirmDelete = async () => {
    const { data, error } = await onDelete("sales_orders", selectedOrder?.id as number);
    if (data) {
      toast.success(`${selectedOrder?.order_number} deleted`);
      setOpenedModal("");
      refresh();
    }

    if (error) {
      toast.error(error.message);
    }
  }
  const onInvoice = async (item: Order) => {
    const { data: order, error: orderError } = await update('sales_orders', item.id, { status: "completed" });
    if (orderError) {
      toast.error(orderError.message);
      return
    }

    if (order) {
      const { data: invoice, error: invoiceError } = await insert('invoices', { sales_order_id: item.id, issue_date: new Date, due_date: new Date(), total_amount: item.total_amount, status: 'unpaid' });
      if (invoiceError) {
        toast.error(invoiceError.message);
      }
      if (invoice) {
        toast.success("Invoice created");
        refresh();
      }
    }
  }

  return (
    <>
      <div className="overflow-x-auto rounded-md h-full flex flex-col">
        <TableHeaderComponent onSearch={onSearch}>
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
              <TableHeadCell>order</TableHeadCell>
              <TableHeadCell>customer</TableHeadCell>
              <TableHeadCell>date</TableHeadCell>
              <TableHeadCell>total</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
              <TableHeadCell>items</TableHeadCell>
              <TableHeadCell className="w-24">
                <span className="sr-only">Actions</span>
              </TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {isLoading ? (
                <ListSkeletalComponent cols={6} />
              ) : (
                <>
                  {orders?.map((item, key) => (
                    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800" key={item.order_number}>
                      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {start + key + 1}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-0.5">
                          <span className="line-clamp-1 max-w-md">{item?.sales_order_items?.map(product => (<span key={product.product?.id + "ITMKEY"}>{product?.product?.name}, </span>))}</span>
                          <span className="!text-xs">{item.order_number}</span>
                        </div>
                      </TableCell>

                      <TableCell>
                        {/* {item.customer?.name && */}
                        {/* <TablePopoverComponent customer={item?.customer as Customer}>
                            </TablePopoverComponent> */}
                        {/* } */}
                        {item.customer && <div className="flex items-center gap-1">
                          <Avatar size={"xs"} placeholderInitials={item.customer?.name.slice(0, 2).toUpperCase()} rounded />
                          <span>
                            {item?.customer?.name}
                          </span>
                        </div>}
                      </TableCell>

                      <TableCell>{item.order_date.toString()}</TableCell>
                      <TableCell>{formatCurrency(item?.total_amount as number)}</TableCell>
                      <TableCell>{item?.status}</TableCell>
                      <TableCell>{item?.sales_order_items?.length}</TableCell>
                      <TableCell>
                        <TableActionsComponent>
                          <>
                            <Dropdown.Item
                              icon={HiPlus}
                              onClick={() => { onInvoice(item) }}
                            >
                              Create Invoice
                            </Dropdown.Item>
                            <Dropdown.Item
                              icon={HiEye}
                              onClick={() => { setSelectedOrder(item); setOpenedModal("view-order-modal"); }}
                            >
                              View
                            </Dropdown.Item>
                            <Dropdown.Item
                              icon={HiPencil}
                            // onClick={() => setOpenedModal("order-modal")}
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              icon={HiPrinter}
                            // onClick={() => setOpenedModal("order-modal")}
                            >
                              Print
                            </Dropdown.Item>
                            <Dropdown.Item
                              icon={HiShare}
                            // onClick={() => setOpenedModal("order-modal")}
                            >
                              Email
                            </Dropdown.Item>
                            <Dropdown.Item
                              icon={HiTrash}
                              onClick={() => {
                                setSelectedOrder(item)
                                setOpenedModal("confirm-modal")
                              }}
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

      <ViewOrderModal openedModal={openedModal} setOpenedModal={setOpenedModal} order={selectedOrder as Order} />

      <ConfirmModal
        openedModal={openedModal}
        setOpenedModal={setOpenedModal} confirm={confirmDelete} loading={loading} />
    </>
  );
}




