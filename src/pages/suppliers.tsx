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
import { Key, useState } from "react";
import {
  ListSkeletalComponent,
  TableActionsComponent,
  TableFooterComponent,
  TableHeaderComponent,
} from "../components";
import useQuery from "../hooks/query";
import { AddSupplierModal, ConfirmModal } from "../modals";
import { Supplier } from "../types";
import { tableTheme } from "./table_theme";
import { HiPencil, HiTrash } from "react-icons/hi";

export function SuppliersPage() {
  const [openedModal, setOpenedModal] = useState("");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  const {
    data: suppliers,
    count,
    loading: isLoading,
    // error: isError,
    refresh,
  } = useQuery<Supplier[]>({
    table: "suppliers",
    is_single: false,
    from: start,
    to: end,
  });

  return (
    <>
      <div className="overflow-x-auto rounded-md grow">
        <TableHeaderComponent>
          <Button
            type="submit"
            className="uppercase"
            onClick={() => setOpenedModal("supplier-modal")}
          >
            add supplier
          </Button>
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
                  {suppliers?.map((item, key: Key) => (
                    <TableRow
                      key={key}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {item.id}
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
                                setSelectedSupplier(item)
                                setOpenedModal("supplier-modal")
                              }}
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              icon={HiTrash}
                              onClick={() => {
                                setSelectedSupplier(item)
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

      <ConfirmModal openedModal={openedModal} setOpenedModal={setOpenedModal} confirm={undefined} loading={false} />
    </>
  );
}
