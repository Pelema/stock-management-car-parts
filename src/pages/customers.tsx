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

export function CustomersPage() {
  const [openedModal, setOpenedModal] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <div className="overflow-x-auto rounded-md h-full flex flex-col">
        <TableHeaderComponent>
          <Button
            type="submit"
            className="uppercase"
            onClick={() => setOpenedModal("user-modal")}
          >
            add customer
          </Button>
        </TableHeaderComponent>
        <div className="h-full overflow-y-auto">
          <Table hoverable theme={tableTheme} className="table-fixed">
            <TableHead>
              <TableHeadCell className="w-14">id</TableHeadCell>
              <TableHeadCell>name</TableHeadCell>
              <TableHeadCell>email</TableHeadCell>
              <TableHeadCell>username</TableHeadCell>
              <TableHeadCell>telephone</TableHeadCell>
              <TableHeadCell>type</TableHeadCell>
              <TableHeadCell className="w-24">
                <span className="sr-only">Actions</span>
              </TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {loading ? (
                <ListSkeletalComponent cols={5}/>
              ) : (
                <>
                  {data.map((item) => (
                    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {item.id}
                      </TableCell>
                      <TableCell>
                        {item.last_name} {item.first_name}
                      </TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.username}</TableCell>
                      <TableCell>{item.telephone}</TableCell>
                      <TableCell>{item.type}</TableCell>
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
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>

      <Modal
        show={openedModal === "user-modal"}
        onClose={() => setOpenedModal("")}
        size={"2xl"}
      >
        <Modal.Header>Add new customer</Modal.Header>
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
          <Button onClick={() => setOpenedModal("")}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const data = [
  {
    id: 1,
    first_name: "Erskine",
    last_name: "Gowling",
    email: "egowling0@spiegel.de",
    type: "Physical Therapy Assistant",
    username: "egowling0",
    telephone: "583-874-8710",
  },
  {
    id: 2,
    first_name: "Vivien",
    last_name: "Brideau",
    email: "vbrideau1@microsoft.com",
    type: "Accounting Assistant I",
    username: "vbrideau1",
    telephone: "678-125-0142",
  },
  {
    id: 3,
    first_name: "Shanon",
    last_name: "Lentsch",
    email: "slentsch2@instagram.com",
    type: "Analog Circuit Design manager",
    username: "slentsch2",
    telephone: "713-314-0748",
  },
  {
    id: 4,
    first_name: "Janith",
    last_name: "Ogelbe",
    email: "jogelbe3@csmonitor.com",
    type: "Administrative Officer",
    username: "jogelbe3",
    telephone: "168-790-6583",
  },
  {
    id: 5,
    first_name: "Aldrich",
    last_name: "Mosson",
    email: "amosson4@livejournal.com",
    type: "Dental Hygienist",
    username: "amosson4",
    telephone: "811-736-6832",
  },
  {
    id: 6,
    first_name: "Chico",
    last_name: "Farryn",
    email: "cfarryn5@cisco.com",
    type: "Budget/Accounting Analyst II",
    username: "cfarryn5",
    telephone: "330-562-1071",
  },
  {
    id: 7,
    first_name: "West",
    last_name: "Margerison",
    email: "wmargerison6@123-reg.co.uk",
    type: "Quality Control Specialist",
    username: "wmargerison6",
    telephone: "203-820-6849",
  },
];
