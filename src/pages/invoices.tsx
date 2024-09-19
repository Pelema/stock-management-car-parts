import {
  Avatar,
  Dropdown,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow
} from "flowbite-react";
import { useState } from "react";
import { HiEye, HiPencil, HiPrinter, HiShare, HiTrash, HiPlus } from "react-icons/hi";
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
import { AddPaymentModal, ConfirmModal, ViewInvoiceModal } from "../modals";
import { Invoice } from "../types";
import { tableTheme } from "./table_theme";

export function InvoicePage() {
  const [openedModal, setOpenedModal] = useState("");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice>();

  const { data: invoices, loading: isLoading, search, refresh, count } = useQuery<Invoice[]>({
    table: 'invoices', from: start, to: end,
    filter: `
      id,
      invoice_number,
      issue_date,
      due_date,
      status,
      total_amount,
      created_at,
      order:sales_orders( 
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
      )
    `
  });

  const { onDelete, loading } = useMutation();

  const onSearch = async (text: string) => {
    if (text.length > 0)
      search(`invoice_number.ilike.%${text}%,status.ilike.%${text}%,issue_date.ilike.%${text}%,due_date.ilike.%${text}%`);
  }

  const confirmDelete = async () => {
    const { data, error } = await onDelete("invoices", selectedInvoice?.id as number);
    if (data) {
      toast.success(`${selectedInvoice?.invoice_number} deleted`);
      setOpenedModal("");
      refresh();
    }

    if (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <div className="overflow-x-auto rounded-md h-full flex flex-col">
        <TableHeaderComponent onSearch={onSearch}>
          {/* <Button
            type="submit"
            className="uppercase"
            onClick={() => setOpenedModal("order-modal")}
          >
            add order
          </Button> */}
          <></>
        </TableHeaderComponent>

        <div className="h-full overflow-y-auto">
          <Table hoverable theme={tableTheme} className="table-fixed">
            <TableHead>
              <TableHeadCell className="w-20">id</TableHeadCell>
              <TableHeadCell>Items</TableHeadCell>
              <TableHeadCell>customer</TableHeadCell>
              <TableHeadCell>date</TableHeadCell>
              <TableHeadCell>Due Date</TableHeadCell>
              <TableHeadCell>Total</TableHeadCell>
              <TableHeadCell>status</TableHeadCell>
              <TableHeadCell className="w-24">
                <span className="sr-only">Actions</span>
              </TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {isLoading ? (
                <ListSkeletalComponent cols={6} />
              ) : (
                <>
                  {invoices?.map((item, key) => (
                    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800" key={item.invoice_number}>
                      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {key + 1}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-0.5">
                          <span className="line-clamp-1 max-w-md">{item?.order?.sales_order_items?.map(product => (<span key={product.product?.id + "INV-Item"}>{product?.product?.OEM_number}, </span>))}</span>
                          <span className="!text-xs">{item.invoice_number}</span>
                        </div>
                      </TableCell>

                      <TableCell>
                        {/* {item.customer?.name && */}
                        {/* <TablePopoverComponent customer={item?.customer as Customer}>
                            </TablePopoverComponent> */}
                        {/* } */}
                        {item.order?.customer && <div className="flex items-center gap-1">
                          <Avatar size={"xs"} placeholderInitials={item?.order?.customer?.name.slice(0, 2).toUpperCase()} rounded />
                          <span>
                            {item?.order?.customer?.name}
                          </span>
                        </div>}
                      </TableCell>

                      <TableCell>{item.issue_date.toString()}</TableCell>
                      <TableCell>{item.due_date.toString()}</TableCell>
                      <TableCell>{formatCurrency(item?.total_amount as number)}</TableCell>
                      <TableCell>{item?.status}</TableCell>
                      <TableCell>
                        <TableActionsComponent>
                          <>
                            <Dropdown.Item
                              icon={HiPlus}
                              onClick={() => { setSelectedInvoice(item); setOpenedModal("payment-modal") }}
                            >
                              Make Payment
                            </Dropdown.Item>
                            <Dropdown.Item
                              icon={HiEye}
                              onClick={() => { setSelectedInvoice(item); setOpenedModal("view-invoice-modal"); }}
                            >
                              View
                            </Dropdown.Item>
                            <Dropdown.Item
                              icon={HiPencil}
                              onClick={() => setOpenedModal("invoice-modal")}
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              icon={HiPrinter}
                              onClick={() => setOpenedModal("invoice-modal")}
                            >
                              Print
                            </Dropdown.Item>
                            <Dropdown.Item
                              icon={HiShare}
                              onClick={() => setOpenedModal("invoice-modal")}
                            >
                              Email
                            </Dropdown.Item>
                            <Dropdown.Item
                              icon={HiTrash}
                              onClick={() => {
                                setSelectedInvoice(item)
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

      {selectedInvoice &&
        <AddPaymentModal
          openedModal={openedModal}
          setOpenedModal={setOpenedModal}
          refresh={refresh}
          invoice={selectedInvoice}
        />
      }

      {selectedInvoice && <ViewInvoiceModal openedModal={openedModal} setOpenedModal={setOpenedModal} invoice={selectedInvoice as Invoice} />}

      <ConfirmModal
        openedModal={openedModal}
        setOpenedModal={setOpenedModal} confirm={confirmDelete} loading={loading} />
    </>
  );
}




