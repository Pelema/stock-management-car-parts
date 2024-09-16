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
import { AddUserModal, ConfirmModal } from "../modals";
import { tableTheme } from "./table_theme";
import { UserInputs } from "../types";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";

export function UsersPage() {
  const [openedModal, setOpenedModal] = useState("");
  const [user, setUser] = useState<UserInputs | null>(null);
  const [selectedUser, setSectedUser] = useState<string>("");

  const {
    data,
    loading,
    error,
    refresh,
    deleteUser
  } = useAdmin();

  const confirmDelete = async () => {
    const { error } = await deleteUser(selectedUser);
    if (error) {
      toast.error(error.message);
    } else {
      refresh();
      setOpenedModal("")
      toast.success("user deleted");
    }
  }

  return (
    <>
      <div className="overflow-x-auto rounded-md h-full flex flex-col">
        <TableHeaderComponent>
          <Button
            type="submit"
            className="uppercase"
            onClick={() => {
              setUser(null);
              setOpenedModal("user-modal");
            }}
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
                <ListSkeletalComponent cols={4} />
              ) : (
                <>
                  {data?.map((item, key) => (
                    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800" key={item.id}>
                      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {(key + 1)}
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
                              onClick={() => {
                                setUser({ id: item.id, email: item.email as string, fullname: item.user_metadata?.fullname, role: item.user_metadata?.role, password: "" })
                                setOpenedModal("user-modal");
                              }}
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              icon={HiTrash}
                              onClick={() => {
                                setSectedUser(item.id);
                                setOpenedModal('confirm-modal');
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
        {/* <TableFooterComponent
          count={count}
          setStart={setStart}
          setEnd={setEnd}
          start={start}
        /> */}
      </div>
      <AddUserModal user={user} openedModal={openedModal} setOpenedModal={setOpenedModal} />
      <ConfirmModal openedModal={openedModal} setOpenedModal={setOpenedModal} confirm={confirmDelete} loading={loading} />
    </>
  );
}
