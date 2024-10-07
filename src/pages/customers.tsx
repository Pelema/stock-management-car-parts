import {
  Button,
  Dropdown,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useState } from "react";
import { HiPencil, HiTrash } from "react-icons/hi";
import {
  ListSkeletalComponent,
  TableActionsComponent,
  TableFooterComponent,
  TableHeaderComponent,
} from "../components";
import useQuery from "../hooks/query";
import { AddCustomerModalComponent } from "../modals/add_customer";
import { Customer } from "../types";
import { tableTheme } from "./table_theme";
import useMutation from "../hooks/mutation";
import { toast } from "sonner";
import { ConfirmModal } from "../modals";

export function CustomersPage() {
  const [openedModal, setOpenedModal] = useState("");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const {
    data: customers,
    count,
    loading,
    search,
    refresh,
  } = useQuery<Customer[]>({
    table: "customers",
    is_single: false,
    from: start,
    to: end,
  });

  const onSearch = async (text: string) => {
    if (text.length > 0)
      search(
        `name.ilike.%${text}%,company_name.ilike.%${text}%,telephone.ilike.%${text}%,email.ilike.%${text}%`
      );
  };

  const { onDelete, loading: onDeleteLoading } = useMutation();

  const confirmDelete = async () => {
    const { data, error } = await onDelete(
      "customers",
      selectedCustomer?.id as number
    );
    if (data) {
      toast.success(`${selectedCustomer?.name} deleted`);
      setOpenedModal("");
      refresh();
    }

    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="overflow-x-auto rounded-md h-full flex flex-col">
        <TableHeaderComponent onSearch={onSearch}>
          <Button
            type="submit"
            className="uppercase"
            onClick={() => {
              setOpenedModal("customer-modal");
              setSelectedCustomer(null);
            }}
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
                  {customers?.map((item, key) => (
                    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {start + key + 1}
                      </TableCell>
                      <TableCell>{item?.name}</TableCell>
                      <TableCell>{item.company_name}</TableCell>
                      <TableCell>{item.telephone}</TableCell>
                      <TableCell>
                        <p className="line-clamp-2">{item.address}</p>
                      </TableCell>
                      <TableCell>
                        <TableActionsComponent>
                          <>
                            <Dropdown.Item
                              icon={HiPencil}
                              onClick={() => {
                                setSelectedCustomer(item);
                                setOpenedModal("customer-modal");
                              }}
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              icon={HiTrash}
                              onClick={() => {
                                setSelectedCustomer(item);
                                setOpenedModal("confirm-modal");
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

      <AddCustomerModalComponent
        refresh={refresh}
        openedModal={openedModal}
        setOpenedModal={setOpenedModal}
        customer={selectedCustomer}
      />
      <ConfirmModal
        openedModal={openedModal}
        setOpenedModal={setOpenedModal}
        confirm={confirmDelete}
        loading={onDeleteLoading}
      />
    </>
  );
}
