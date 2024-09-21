import {
  Button,
  Checkbox,
  Dropdown,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useState } from "react";
import { tableTheme } from "./table_theme";

import { BiUpload } from "react-icons/bi";
import {
  HiPencil,
  HiPlus,
  HiTrash,
} from "react-icons/hi";
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
import {
  ConfirmModal
} from "../modals";
import { Payment } from "../types";

export function PaymentsPage() {
  const [openedModal, setOpenedModal] = useState("");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const [selectedPayment, setSelectedPayment] = useState<Payment>();

  const {
    data: payments,
    count,
    loading,
    search,
    refresh
  } = useQuery<Payment[]>({
    table: "payments",
    is_single: false,
    from: start,
    to: end,
    filter: `
      payment_reference,
      payment_date,
      payment_method,
      amount_paid,
      invoice:invoices(
        id,
        invoice_number,
        total_amount,
        order:sales_orders( 
          customer:customers(name,company_name)
        )
      )
    `
  });

  const { onDelete, loading: isLoading } = useMutation();


  const confirmDelete = async () => {
    const { data, error } = await onDelete("payments", selectedPayment?.id as number);
    if (data) {
      toast.success(`${selectedPayment?.payment_reference} deleted`);
      setOpenedModal("");
      refresh();
    }

    if (error) {
      toast.error(error.message);
    }
  }

  const onSearch = async (text: string) => {
    if (text.length > 0)
      search(`payment_reference.ilike.%${text}%,payment_date.ilike.%${text}%,payment_method.ilike.%${text}%`);
  }

  return (
    <>
      <div className="overflow-x-auto rounded-md h-full flex flex-col">
        <TableHeaderComponent onSearch={onSearch}>
          <div className="flex space-x-2">
            <Button onClick={() => setOpenedModal("edit-modal")}>
              <HiPlus className="mr-2 h-5 w-5" />
              Add Payment
            </Button>
            <Button outline>
              <BiUpload className="mr-2 h-5 w-5" />
              Export
            </Button>
          </div>
        </TableHeaderComponent>
        <div className="h-full overflow-y-auto">
          <Table hoverable theme={tableTheme} className="table-fixed">
            <TableHead>
              <Table.HeadCell className="p-4 w-14">
                <Checkbox />
              </Table.HeadCell>
              <TableHeadCell className="w-20">id</TableHeadCell>
              <TableHeadCell>payment ref#</TableHeadCell>
              <TableHeadCell>Invoice</TableHeadCell>
              <TableHeadCell>date</TableHeadCell>
              <TableHeadCell>amount</TableHeadCell>
              <TableHeadCell>method</TableHeadCell>
              <TableHeadCell className="w-24">
                <span className="sr-only">actions</span>
              </TableHeadCell>
            </TableHead>

            <TableBody className="divide-y">
              {loading ? (
                <ListSkeletalComponent />
              ) : (
                <>
                  {
                    payments?.map((item, key) => (
                      <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800" key={item.payment_reference}>
                        <Table.Cell className="p-4">
                          <Checkbox />
                        </Table.Cell>
                        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {start + key + 1}
                        </TableCell>
                        <TableCell>{item.payment_reference}</TableCell>
                        <TableCell>{item?.invoice?.invoice_number} - {item?.invoice?.order?.customer?.name}</TableCell>
                        <TableCell>{item?.payement_date?.toString()}</TableCell>
                        <TableCell>{formatCurrency(item.amount_paid)}</TableCell>
                        <TableCell>{item.payment_method}</TableCell>
                        <TableCell>
                          <TableActionsComponent>
                            <>
                              <Dropdown.Item
                                icon={HiPencil}
                                onClick={() => setOpenedModal("edit-modal")}
                              >
                                Edit
                              </Dropdown.Item>
                              <Dropdown.Item
                                icon={HiTrash}
                                onClick={() => { setSelectedPayment(item); setOpenedModal("confirm-modal"); }}
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

      {/* <PaymentEditModalComponent
        openedModal={openedModal}
        setOpenedModal={setOpenedModal}
      /> */}

      <ConfirmModal
        openedModal={openedModal}
        setOpenedModal={setOpenedModal} confirm={confirmDelete} loading={isLoading} />
    </>
  );
}

