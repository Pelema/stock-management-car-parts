import {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Dropdown,
} from "flowbite-react";
import { tableTheme } from "./table_theme";
import { useEffect, useState } from "react";

import { AddSupplierModal } from "../modals";

import {
  ListSkeletalComponent,
  TableActionsComponent,
  TableFooterComponent,
  TableHeaderComponent,
} from "../components";

import { HiPencil, HiTrash } from "react-icons/hi";

export function SuppliersPage() {
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
            onClick={() => setOpenedModal("add-supplier-modal")}
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
              {loading ? (
                <ListSkeletalComponent cols={4} />
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
                      <TableCell>{item.telephone}</TableCell>
                      <TableCell>
                        {item.contact_person.last_name}{" "}
                        {item.contact_person.first_name}
                      </TableCell>
                      <TableCell>
                        <TableActionsComponent>
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
                                onClick={() => setOpenedModal("confirm-modal")}
                              >
                                Delete
                              </Dropdown.Item>
                            </>
                          </TableActionsComponent>
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
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <AddSupplierModal
        openedModal={openedModal}
        setOpenedModal={setOpenedModal}
      />
    </>
  );
}

const data = [
  {
    id: 1,
    first_name: "Artur",
    last_name: "Fountian",
    email: "dskrzynski0@wiley.com",
    telephone: "536-334-9740",
    contact_person: { first_name: "Darsie", last_name: "Skrzynski" },
  },
  {
    id: 2,
    first_name: "Hanny",
    last_name: "Drennan",
    email: "aaddy1@facebook.com",
    telephone: "779-806-9508",
    contact_person: { first_name: "Arden", last_name: "Addy" },
  },
  {
    id: 3,
    first_name: "Tabbie",
    last_name: "Pinch",
    email: "mebben2@symantec.com",
    telephone: "650-754-8883",
    contact_person: { first_name: "Marie-ann", last_name: "Ebben" },
  },
  {
    id: 4,
    first_name: "Breena",
    last_name: "Folger",
    email: "jpender3@xing.com",
    telephone: "512-414-0601",
    contact_person: { first_name: "Jedd", last_name: "Pender" },
  },
  {
    id: 5,
    first_name: "Alicia",
    last_name: "Bartak",
    email: "hcecchi4@aboutads.info",
    telephone: "767-988-2352",
    contact_person: { first_name: "Hurley", last_name: "Cecchi" },
  },
  {
    id: 6,
    first_name: "Rubetta",
    last_name: "Vyvyan",
    email: "vlacelett5@wufoo.com",
    telephone: "648-835-1431",
    contact_person: { first_name: "Vidovik", last_name: "Lacelett" },
  },
  {
    id: 7,
    first_name: "Clarance",
    last_name: "Stodit",
    email: "jhaswell6@accuweather.com",
    telephone: "226-714-8978",
    contact_person: { first_name: "Jacky", last_name: "Haswell" },
  },
  {
    id: 8,
    first_name: "Leanna",
    last_name: "Struis",
    email: "cjorgensen7@who.int",
    telephone: "645-302-5957",
    contact_person: { first_name: "Colas", last_name: "Jorgensen" },
  },
  {
    id: 9,
    first_name: "Cortney",
    last_name: "Zaniolo",
    email: "bivushkin8@blogspot.com",
    telephone: "458-309-6523",
    contact_person: { first_name: "Brigitte", last_name: "Ivushkin" },
  },
  {
    id: 10,
    first_name: "Barn",
    last_name: "Watford",
    email: "gbeetlestone9@tamu.edu",
    telephone: "674-662-3480",
    contact_person: { first_name: "Gelya", last_name: "Beetlestone" },
  },
  {
    id: 11,
    first_name: "Penny",
    last_name: "Kraft",
    email: "wklampta@craigslist.org",
    telephone: "717-863-3613",
    contact_person: { first_name: "Winifred", last_name: "Klampt" },
  },
  {
    id: 12,
    first_name: "Matthus",
    last_name: "Temblett",
    email: "nowthwaiteb@marriott.com",
    telephone: "663-481-7485",
    contact_person: { first_name: "Nicolette", last_name: "Owthwaite" },
  },
  {
    id: 13,
    first_name: "Dolli",
    last_name: "Boise",
    email: "khawgoodc@ucsd.edu",
    telephone: "303-441-2488",
    contact_person: { first_name: "Kaylyn", last_name: "Hawgood" },
  },
  {
    id: 14,
    first_name: "Virginie",
    last_name: "Lindenfeld",
    email: "tmozzinid@icq.com",
    telephone: "778-134-3742",
    contact_person: { first_name: "Terese", last_name: "Mozzini" },
  },
  {
    id: 15,
    first_name: "Constancia",
    last_name: "Ousbie",
    email: "eprene@canalblog.com",
    telephone: "763-590-0240",
    contact_person: { first_name: "Eliza", last_name: "Pren" },
  },
];
