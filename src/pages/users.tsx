import {
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
import { HiPencil, HiTrash } from "react-icons/hi";
import {
  ListSkeletalComponent,
  TableActionsComponent,
  TableHeaderComponent
} from "../components";
import useAdmin from "../hooks/admin";
import { AddUserModal } from "../modals";
import { tableTheme } from "./table_theme";

export function UsersPage() {
  const [openedModal, setOpenedModal] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);

  const {
    data,
    loading,
    error,
    deleteUser
  } = useAdmin();

  return (
    <>
      <div className="overflow-x-auto rounded-md h-full flex flex-col">
        <TableHeaderComponent>
          <Button
            type="submit"
            className="uppercase"
            onClick={() => setOpenedModal("user-modal")}
          >
            add user
          </Button>
        </TableHeaderComponent>
        <div className="h-full overflow-y-auto">
          <Table hoverable theme={tableTheme} className="table-fixed">
            <TableHead>
              <TableHeadCell className="w-14">id</TableHeadCell>
              <TableHeadCell>email</TableHeadCell>
              <TableHeadCell>name</TableHeadCell>
              <TableHeadCell>last login</TableHeadCell>
              <TableHeadCell>role</TableHeadCell>
              <TableHeadCell className="w-24">
                <span className="sr-only">Actions</span>
              </TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {loading ? (
                <ListSkeletalComponent cols={5} />
              ) : (
                <>
                  {data?.map((item) => (
                    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {item.id}
                      </TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>
                        {item.user_metadata?.fullname}
                      </TableCell>
                      <TableCell>{item.last_sign_in_at}</TableCell>
                      <TableCell>{item.user_metadata?.role}</TableCell>
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
                              onClick={() => deleteUser(item.id)}
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
        {/* <TableFooterComponent
          count={count}
          setStart={setStart}
          setEnd={setEnd}
          start={start}
        /> */}
      </div>

      <AddUserModal openedModal={openedModal} setOpenedModal={setOpenedModal} />

    </>
  );
}
