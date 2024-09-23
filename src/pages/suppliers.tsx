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
import { toast } from "sonner";
import {
  ListSkeletalComponent,
  TableActionsComponent,
  TableFooterComponent,
  TableHeaderComponent,
} from "../components";
import useMutation from "../hooks/mutation";
import useQuery from "../hooks/query";
import { AddSupplierModal, ConfirmModal } from "../modals";
import { Supplier } from "../types";
import { tableTheme } from "./table_theme";
import { AccessGuard } from "../components/access_guard";

export function SuppliersPage() {
  const [openedModal, setOpenedModal] = useState("");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );

  const {
    data: suppliers,
    count,
    loading: isLoading,
    // error: isError,
    search,
    refresh,
  } = useQuery<Supplier[]>({
    table: "suppliers",
    is_single: false,
    from: start,
    to: end,
  });

  const { onDelete, loading } = useMutation();

  const confirmDelete = async () => {
    const { data, error } = await onDelete(
      "suppliers",
      selectedSupplier?.id as number
    );
    if (data) {
      toast.success(`${selectedSupplier?.name} deleted`);
      setOpenedModal("");
      refresh();
    }

    if (error) {
      toast.error(error.message);
    }
  };

  const onSearch = async (text: string) => {
    if (text.length > 0)
      search(
        `email.ilike.%${text}%,telephone.ilike.%${text}%,contact_person.ilike.%${text}%,name.ilike.%${text}%`
      );
  };

  return (
    <>
      <div className="overflow-x-auto rounded-md grow">
        <TableHeaderComponent onSearch={onSearch}>
          <AccessGuard allowed_roles={["admin"]}>
            <Button
              type="submit"
              className="uppercase"
              onClick={() => setOpenedModal("supplier-modal")}
            >
              add supplier
            </Button>
          </AccessGuard>
        </TableHeaderComponent>
        <div className="h-full overflow-y-auto">
          <Table hoverable theme={tableTheme} className="table-fixed grow">
            <TableHead>
              <TableHeadCell className="w-14">id</TableHeadCell>
              <TableHeadCell>name</TableHeadCell>
              <TableHeadCell>email</TableHeadCell>
              <TableHeadCell>telephone</TableHeadCell>
              <TableHeadCell>contact person</TableHeadCell>
              <TableHeadCell className="w-24">
                <span className="sr-only">Actions</span>
              </TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {isLoading ? (
                <ListSkeletalComponent cols={4} />
              ) : (
                <>
                  {suppliers?.map((item, key) => (
                    <TableRow
                      key={key}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {start + key + 1}
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.telephone}</TableCell>
                      <TableCell>{item.contact_person}</TableCell>
                      <TableCell>
                        <TableActionsComponent>
                          <>
                            <Dropdown.Item
                              icon={HiPencil}
                              onClick={() => {
                                setSelectedSupplier(item);
                                setOpenedModal("supplier-modal");
                              }}
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              icon={HiTrash}
                              onClick={() => {
                                setSelectedSupplier(item);
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
          <TableFooterComponent
            count={count}
            setStart={setStart}
            setEnd={setEnd}
            start={start}
          />
        </div>
      </div>
      <AddSupplierModal
        openedModal={openedModal}
        setOpenedModal={setOpenedModal}
        refresh={refresh}
        supplier={selectedSupplier}
      />

      <ConfirmModal
        openedModal={openedModal}
        setOpenedModal={setOpenedModal}
        confirm={confirmDelete}
        loading={loading}
      />
    </>
  );
}
