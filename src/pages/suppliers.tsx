import {
  Button,
  Dropdown,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Label,
  TextInput,
  Modal,
} from "flowbite-react";
import { useState } from "react";
import {
  ListSkeletalComponent,
  TableActionsComponent,
  TableFooterComponent,
  TableHeaderComponent
} from "../components";
import useQuery from "../hooks/query";
import { AddSupplierModal } from "../modals";
import { Supplier } from "../types";
import { tableTheme } from "./table_theme";
import { useState } from "react";

export function SuppliersPage() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="overflow-x-auto rounded-md grow">
        <Table hoverable theme={tableTheme}>
          <caption className="p-5 uppercase text-md font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            <div className="flex flex-row-reverse">
              <Button
                type="submit"
                className="uppercase"
                onClick={() => setOpenModal(true)}
              >
                add supplier
              </Button>
            </div>
          </caption>
          <TableHead>
            <TableHeadCell>id</TableHeadCell>
            <TableHeadCell>name</TableHeadCell>
            <TableHeadCell>email</TableHeadCell>
            <TableHeadCell>telephone</TableHeadCell>
            <TableHeadCell>contact person</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Edit</span>
            </TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {data.map((item) => (
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {item.id}
                </TableCell>
                <TableCell>
                  {item.last_name} {item.first_name}
                </TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.telephone}</TableCell>
                <TableCell>
                  {item.contact_person.last_name}{" "}
                  {item.contact_person.first_name}
                </TableCell>
                <TableCell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)} size={"2xl"}>
        <Modal.Header>Add new supplier</Modal.Header>
        <Modal.Body>
          <form className="flex flex-col gap-4">
            <div className="flex space-x-2">
              <div className="grow">
                <div className="mb-2 block">
                  <Label htmlFor="email1" value="Name" />
                </div>
                <TextInput
                  id="email1"
                  type="email"
                  placeholder="name@flowbite.com"
                  required
                />
              </div>
              <div className="grow">
                <div className="mb-2 block">
                  <Label htmlFor="password1" value="Email" />
                </div>
                <TextInput id="password1" type="password" required />
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="grow">
                <div className="mb-2 block">
                  <Label htmlFor="password1" value="Telephone" />
                </div>
                <TextInput id="password1" type="password" required />
              </div>
              <div className="grow">
                <div className="mb-2 block">
                  <Label htmlFor="password1" value="Address" />
                </div>
                <TextInput id="password1" type="password" required />
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="grow">
                <div className="mb-2 block">
                  <Label htmlFor="password1" value="Contact Person" />
                </div>
                <TextInput id="password1" type="password" required />
              </div>
              <div className="grow">
                <div className="mb-2 block">
                  <Label htmlFor="password1" value="Website URL" />
                </div>
                <TextInput id="password1" type="password" required />
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="grow">
                <div className="mb-2 block">
                  <Label htmlFor="password1" value="VAT Registration" />
                </div>
                <TextInput id="password1" type="password" required />
              </div>
              <div className="grow">
                <div className="mb-2 block">
                  <Label htmlFor="password1" value="Company Reg. Number" />
                </div>
                <TextInput id="password1" type="password" required />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="justify-end">
          <Button onClick={() => setOpenModal(false)}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
