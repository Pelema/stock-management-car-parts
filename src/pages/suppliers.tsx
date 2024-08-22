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
} from "flowbite-react";
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
