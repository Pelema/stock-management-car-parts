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
import { useForm } from "react-hook-form";

export function OrdersPage() {
  const [openModal, setOpenModal] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

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
                add order
              </Button>
            </div>
          </caption>
          <TableHead>
            <TableHeadCell>id</TableHeadCell>
            <TableHeadCell>order #</TableHeadCell>
            <TableHeadCell>order date</TableHeadCell>
            <TableHeadCell>customer name</TableHeadCell>
            <TableHeadCell>telephone</TableHeadCell>
            <TableHeadCell>company name</TableHeadCell>
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
                <TableCell>{item.order_number}</TableCell>
                <TableCell>{item.created}</TableCell>

                <TableCell>
                  {item.customer.last_name} {item.customer.first_name}
                </TableCell>
                <TableCell>{item.telephone}</TableCell>
                <TableCell>{item.company}</TableCell>
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
        <Modal.Header>Add new order</Modal.Header>
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
    order_number: "#bc09aa",
    customer: { first_name: "Wallie", last_name: "Paris" },
    telephone: "546-342-2471",
    created: "2024-07-01 02:28:00",
    company: "Wordware",
  },
  {
    id: 2,
    order_number: "#151067",
    customer: { first_name: "Starlene", last_name: "McIlvoray" },
    telephone: "866-840-7595",
    created: "2023-11-04 12:18:14",
    company: "Thoughtworks",
  },
  {
    id: 3,
    order_number: "#60d13c",
    customer: { first_name: "Sena", last_name: "McGrouther" },
    telephone: "641-571-7895",
    created: "2023-10-05 19:26:52",
    company: "Gabvine",
  },
  {
    id: 4,
    order_number: "#0636e9",
    customer: { first_name: "Raquel", last_name: "Munton" },
    telephone: "559-500-9007",
    created: "2024-01-04 20:37:56",
    company: "Skyvu",
  },
  {
    id: 5,
    order_number: "#de1d11",
    customer: { first_name: "Ward", last_name: "Goodswen" },
    telephone: "385-242-0810",
    created: "2024-03-05 14:08:43",
    company: "Dabtype",
  },
  {
    id: 6,
    order_number: "#6b5c9a",
    customer: { first_name: "Gigi", last_name: "Muress" },
    telephone: "600-436-5240",
    created: "2023-10-15 12:16:26",
    company: "Gigazoom",
  },
  {
    id: 7,
    order_number: "#8d350d",
    customer: { first_name: "Nigel", last_name: "Farbrace" },
    telephone: "335-968-7121",
    created: "2023-11-03 08:32:11",
    company: null,
  },
  {
    id: 8,
    order_number: "#c5ff73",
    customer: { first_name: "Ibrahim", last_name: "Killiner" },
    telephone: "691-847-2450",
    created: "2023-12-30 07:13:28",
    company: "Katz",
  },
  {
    id: 9,
    order_number: "#8dd189",
    customer: { first_name: "Clair", last_name: "Stoke" },
    telephone: "380-257-3531",
    created: "2024-07-15 13:30:50",
    company: "Photobug",
  },
  {
    id: 10,
    order_number: "#07cd45",
    customer: { first_name: "Justin", last_name: "Giacomasso" },
    telephone: "171-298-2848",
    created: "2023-11-17 03:52:17",
    company: null,
  },
  {
    id: 11,
    order_number: "#e89baf",
    customer: { first_name: "Alexis", last_name: "Rosander" },
    telephone: "328-793-1307",
    created: "2023-12-30 06:24:49",
    company: null,
  },
  {
    id: 12,
    order_number: "#cd2487",
    customer: { first_name: "Rhianon", last_name: "Jenicke" },
    telephone: "169-519-5365",
    created: "2023-10-09 06:02:28",
    company: "Realpoint",
  },
  {
    id: 13,
    order_number: "#03cb56",
    customer: { first_name: "Keefe", last_name: "McSkeagan" },
    telephone: "147-644-5564",
    created: "2023-11-17 03:21:26",
    company: "Babbleset",
  },
  {
    id: 14,
    order_number: "#a23b7f",
    customer: { first_name: "Gipsy", last_name: "Gepheart" },
    telephone: "140-834-7199",
    created: "2023-09-25 05:26:12",
    company: "Shuffledrive",
  },
  {
    id: 15,
    order_number: "#926998",
    customer: { first_name: "Gertrudis", last_name: "Brookshaw" },
    telephone: "926-962-0856",
    created: "2024-01-24 01:46:38",
    company: "Edgewire",
  },
  {
    id: 16,
    order_number: "#a56d73",
    customer: { first_name: "Joshuah", last_name: "Motion" },
    telephone: "239-383-3396",
    created: "2023-10-07 09:41:41",
    company: "Yodel",
  },
  {
    id: 17,
    order_number: "#e18ebf",
    customer: { first_name: "Pierson", last_name: "Cazereau" },
    telephone: "467-771-0721",
    created: "2023-12-05 14:00:32",
    company: "Yoveo",
  },
  {
    id: 18,
    order_number: "#8d6963",
    customer: { first_name: "Kameko", last_name: "Supple" },
    telephone: "539-317-6420",
    created: "2024-03-28 00:10:28",
    company: "Mydo",
  },
  {
    id: 19,
    order_number: "#853878",
    customer: { first_name: "Carmita", last_name: "McLachlan" },
    telephone: "973-288-0184",
    created: "2024-01-26 14:52:07",
    company: "Zazio",
  },
  {
    id: 20,
    order_number: "#ba6971",
    customer: { first_name: "Deidre", last_name: "Deetch" },
    telephone: "408-912-3392",
    created: "2024-07-07 03:58:49",
    company: "Bluejam",
  },
  {
    id: 21,
    order_number: "#5f6770",
    customer: { first_name: "Rivi", last_name: "Durnford" },
    telephone: "622-327-8273",
    created: "2023-09-28 07:16:41",
    company: null,
  },
  {
    id: 22,
    order_number: "#744871",
    customer: { first_name: "Bobbee", last_name: "Eldered" },
    telephone: "122-734-1700",
    created: "2024-01-29 00:40:53",
    company: "Ainyx",
  },
  {
    id: 23,
    order_number: "#749d2b",
    customer: { first_name: "Rowe", last_name: "Wendover" },
    telephone: "828-995-0309",
    created: "2023-10-30 16:21:43",
    company: "Chatterpoint",
  },
  {
    id: 24,
    order_number: "#f07d02",
    customer: { first_name: "Delores", last_name: "MacCarrick" },
    telephone: "489-285-8277",
    created: "2023-11-27 12:37:23",
    company: null,
  },
  {
    id: 25,
    order_number: "#72daa7",
    customer: { first_name: "Carlita", last_name: "Mitskevich" },
    telephone: "840-415-7022",
    created: "2024-02-08 09:45:00",
    company: null,
  },
  {
    id: 26,
    order_number: "#f21f32",
    customer: { first_name: "Pavlov", last_name: "Scyner" },
    telephone: "766-801-5535",
    created: "2023-09-02 23:14:39",
    company: "Tagfeed",
  },
  {
    id: 27,
    order_number: "#548ede",
    customer: { first_name: "Iago", last_name: "Taffley" },
    telephone: "979-856-4967",
    created: "2024-03-10 23:01:09",
    company: "Feedfire",
  },
  {
    id: 28,
    order_number: "#20cab1",
    customer: { first_name: "Emmanuel", last_name: "Garth" },
    telephone: "274-881-4894",
    created: "2024-06-25 00:12:31",
    company: null,
  },
  {
    id: 29,
    order_number: "#29dad8",
    customer: { first_name: "Franklin", last_name: "Atkirk" },
    telephone: "848-889-5497",
    created: "2024-08-04 01:34:09",
    company: null,
  },
  {
    id: 30,
    order_number: "#d7017a",
    customer: { first_name: "Marco", last_name: "Steanson" },
    telephone: "562-248-6640",
    created: "2024-07-22 10:34:28",
    company: "Buzzbean",
  },
  {
    id: 31,
    order_number: "#99d894",
    customer: { first_name: "Leta", last_name: "Randales" },
    telephone: "538-896-0176",
    created: "2024-06-01 17:13:21",
    company: null,
  },
  {
    id: 32,
    order_number: "#545a16",
    customer: { first_name: "Farlee", last_name: "Woodrup" },
    telephone: "647-354-4877",
    created: "2023-09-12 07:16:08",
    company: null,
  },
  {
    id: 33,
    order_number: "#976748",
    customer: { first_name: "Marlena", last_name: "Eddowis" },
    telephone: "270-299-9689",
    created: "2024-02-18 21:13:00",
    company: "Babbleset",
  },
  {
    id: 34,
    order_number: "#10542e",
    customer: { first_name: "Laurence", last_name: "McGurgan" },
    telephone: "947-320-9580",
    created: "2023-10-14 03:18:45",
    company: "Innojam",
  },
  {
    id: 35,
    order_number: "#ad8e4e",
    customer: { first_name: "Norbert", last_name: "Winward" },
    telephone: "447-863-3396",
    created: "2023-12-06 11:02:11",
    company: "Dabfeed",
  },
  {
    id: 36,
    order_number: "#28ec58",
    customer: { first_name: "Lenard", last_name: "Mil" },
    telephone: "776-521-6338",
    created: "2024-02-14 12:22:07",
    company: "Digitube",
  },
  {
    id: 37,
    order_number: "#2fad95",
    customer: { first_name: "Tonye", last_name: "Marsy" },
    telephone: "469-757-3675",
    created: "2023-12-28 19:13:37",
    company: "Quimba",
  },
  {
    id: 38,
    order_number: "#347853",
    customer: { first_name: "Gwenny", last_name: "Beer" },
    telephone: "516-493-5119",
    created: "2023-11-02 14:08:17",
    company: "Kwilith",
  },
  {
    id: 39,
    order_number: "#fa50ed",
    customer: { first_name: "Wallie", last_name: "Alton" },
    telephone: "666-351-4725",
    created: "2023-08-27 01:37:20",
    company: null,
  },
  {
    id: 40,
    order_number: "#5339ef",
    customer: { first_name: "Dominique", last_name: "Sprey" },
    telephone: "492-931-8328",
    created: "2024-03-14 01:01:31",
    company: null,
  },
  {
    id: 41,
    order_number: "#b896a6",
    customer: { first_name: "Honey", last_name: "Franies" },
    telephone: "517-672-9776",
    created: "2024-02-27 01:32:27",
    company: "Mynte",
  },
  {
    id: 42,
    order_number: "#657ac1",
    customer: { first_name: "Philip", last_name: "Cavozzi" },
    telephone: "993-967-8494",
    created: "2024-02-20 15:11:17",
    company: "Ozu",
  },
  {
    id: 43,
    order_number: "#512caa",
    customer: { first_name: "Clarie", last_name: "Pinching" },
    telephone: "318-303-6700",
    created: "2024-07-25 13:09:01",
    company: "Livetube",
  },
  {
    id: 44,
    order_number: "#5c126c",
    customer: { first_name: "Ermin", last_name: "Biglin" },
    telephone: "287-902-5472",
    created: "2024-05-06 08:15:14",
    company: "Yakidoo",
  },
  {
    id: 45,
    order_number: "#2b5f7f",
    customer: { first_name: "Lyle", last_name: "Messier" },
    telephone: "877-243-4471",
    created: "2023-09-21 18:27:13",
    company: "Skaboo",
  },
  {
    id: 46,
    order_number: "#31d91d",
    customer: { first_name: "Omero", last_name: "Ruperto" },
    telephone: "387-525-2817",
    created: "2024-06-03 11:04:52",
    company: null,
  },
  {
    id: 47,
    order_number: "#85da42",
    customer: { first_name: "Pennie", last_name: "Eastbury" },
    telephone: "402-416-4809",
    created: "2024-07-17 08:11:27",
    company: "Eire",
  },
  {
    id: 48,
    order_number: "#c30a0e",
    customer: { first_name: "Georgeta", last_name: "Tavner" },
    telephone: "916-289-8381",
    created: "2024-03-29 04:28:49",
    company: "Kaymbo",
  },
  {
    id: 49,
    order_number: "#cbaabb",
    customer: { first_name: "Valida", last_name: "Lennard" },
    telephone: "713-802-1439",
    created: "2024-08-14 23:22:41",
    company: "Babbleopia",
  },
  {
    id: 50,
    order_number: "#0c9a8f",
    customer: { first_name: "Giacobo", last_name: "Ambridge" },
    telephone: "317-826-9570",
    created: "2024-03-10 14:02:57",
    company: "Quire",
  },
  {
    id: 51,
    order_number: "#02dfee",
    customer: { first_name: "Niko", last_name: "Johanchon" },
    telephone: "594-466-2587",
    created: "2023-09-13 18:28:24",
    company: null,
  },
  {
    id: 52,
    order_number: "#7c2bb9",
    customer: { first_name: "Agatha", last_name: "Lethbridge" },
    telephone: "575-564-0106",
    created: "2024-07-14 20:28:26",
    company: "Eamia",
  },
  {
    id: 53,
    order_number: "#0c26d6",
    customer: { first_name: "Agneta", last_name: "Axup" },
    telephone: "544-501-0516",
    created: "2024-05-02 23:19:38",
    company: "Gabtune",
  },
  {
    id: 54,
    order_number: "#ba8fb3",
    customer: { first_name: "Rozanna", last_name: "O'Hickee" },
    telephone: "292-922-7791",
    created: "2023-08-23 18:50:27",
    company: "Fadeo",
  },
  {
    id: 55,
    order_number: "#be8a94",
    customer: { first_name: "Bambi", last_name: "Winstone" },
    telephone: "226-150-7813",
    created: "2023-12-21 22:28:05",
    company: "Yotz",
  },
  {
    id: 56,
    order_number: "#9127d5",
    customer: { first_name: "Octavius", last_name: "Milbank" },
    telephone: "949-897-2142",
    created: "2023-09-20 22:38:13",
    company: null,
  },
  {
    id: 57,
    order_number: "#eb7d38",
    customer: { first_name: "Edie", last_name: "Goodier" },
    telephone: "958-580-9986",
    created: "2024-01-07 15:17:41",
    company: null,
  },
  {
    id: 58,
    order_number: "#5e828e",
    customer: { first_name: "Ferdinand", last_name: "Harrie" },
    telephone: "364-595-1577",
    created: "2024-05-15 20:39:24",
    company: null,
  },
  {
    id: 59,
    order_number: "#948127",
    customer: { first_name: "Ganny", last_name: "Laweles" },
    telephone: "775-994-4653",
    created: "2023-12-31 21:22:12",
    company: null,
  },
  {
    id: 60,
    order_number: "#6a298e",
    customer: { first_name: "Rainer", last_name: "Alekhov" },
    telephone: "984-925-0713",
    created: "2024-04-30 21:08:33",
    company: "Linktype",
  },
  {
    id: 61,
    order_number: "#d612ff",
    customer: { first_name: "Zelda", last_name: "Lechmere" },
    telephone: "507-239-8197",
    created: "2024-03-17 08:17:24",
    company: "Jaloo",
  },
  {
    id: 62,
    order_number: "#0b850f",
    customer: { first_name: "Killian", last_name: "Sparkwill" },
    telephone: "996-652-7507",
    created: "2024-03-07 09:40:21",
    company: "Ntags",
  },
  {
    id: 63,
    order_number: "#4b9053",
    customer: { first_name: "Parnell", last_name: "Curcher" },
    telephone: "781-878-0979",
    created: "2024-06-02 22:13:54",
    company: "Mybuzz",
  },
  {
    id: 64,
    order_number: "#b88cc3",
    customer: { first_name: "Garfield", last_name: "Hartles" },
    telephone: "407-775-9018",
    created: "2024-07-22 22:48:52",
    company: null,
  },
  {
    id: 65,
    order_number: "#4ec4dd",
    customer: { first_name: "Claire", last_name: "Kornes" },
    telephone: "802-660-5701",
    created: "2023-11-12 22:01:26",
    company: "Abata",
  },
  {
    id: 66,
    order_number: "#2169cd",
    customer: { first_name: "Melony", last_name: "Waith" },
    telephone: "444-855-8857",
    created: "2024-06-28 14:27:00",
    company: "Wordpedia",
  },
  {
    id: 67,
    order_number: "#6932df",
    customer: { first_name: "Towny", last_name: "Gillhespy" },
    telephone: "806-134-9267",
    created: "2023-10-10 04:50:56",
    company: null,
  },
  {
    id: 68,
    order_number: "#94a752",
    customer: { first_name: "Georgia", last_name: "Falvey" },
    telephone: "337-920-0352",
    created: "2023-12-09 11:02:06",
    company: "Jetwire",
  },
  {
    id: 69,
    order_number: "#47d105",
    customer: { first_name: "Kalina", last_name: "Hallet" },
    telephone: "252-867-6998",
    created: "2024-02-23 20:29:32",
    company: "Yodel",
  },
  {
    id: 70,
    order_number: "#43144e",
    customer: { first_name: "Viviyan", last_name: "Birtchnell" },
    telephone: "595-810-1534",
    created: "2024-01-30 16:56:09",
    company: null,
  },
  {
    id: 71,
    order_number: "#f1587b",
    customer: { first_name: "Daphne", last_name: "Wicken" },
    telephone: "709-223-1860",
    created: "2023-09-28 06:05:48",
    company: null,
  },
  {
    id: 72,
    order_number: "#c1ae56",
    customer: { first_name: "Norah", last_name: "Cannicott" },
    telephone: "956-923-9787",
    created: "2024-07-19 10:44:04",
    company: "Dabvine",
  },
  {
    id: 73,
    order_number: "#dcd3a2",
    customer: { first_name: "Lindsy", last_name: "MacEvilly" },
    telephone: "315-894-8234",
    created: "2023-10-10 20:33:46",
    company: "Babblestorm",
  },
  {
    id: 74,
    order_number: "#54544f",
    customer: { first_name: "Vicki", last_name: "Digle" },
    telephone: "102-955-2206",
    created: "2023-11-13 12:29:32",
    company: "Izio",
  },
  {
    id: 75,
    order_number: "#c74530",
    customer: { first_name: "Elvin", last_name: "Cortnay" },
    telephone: "133-771-4215",
    created: "2023-10-27 04:23:13",
    company: "Riffwire",
  },
  {
    id: 76,
    order_number: "#c8c8cc",
    customer: { first_name: "Maudie", last_name: "Edowes" },
    telephone: "110-402-6033",
    created: "2024-06-15 23:14:03",
    company: null,
  },
  {
    id: 77,
    order_number: "#4d11fc",
    customer: { first_name: "Tobi", last_name: "Murrison" },
    telephone: "806-749-8405",
    created: "2024-04-26 16:10:57",
    company: "Digitube",
  },
  {
    id: 78,
    order_number: "#59908d",
    customer: { first_name: "Bank", last_name: "Orridge" },
    telephone: "275-531-9538",
    created: "2024-03-07 00:45:34",
    company: null,
  },
  {
    id: 79,
    order_number: "#144a57",
    customer: { first_name: "Ody", last_name: "Ordelt" },
    telephone: "376-407-0013",
    created: "2023-10-05 19:50:24",
    company: "Yadel",
  },
  {
    id: 80,
    order_number: "#46587d",
    customer: { first_name: "Dame", last_name: "Peyes" },
    telephone: "896-629-6789",
    created: "2024-05-07 12:31:08",
    company: "Katz",
  },
  {
    id: 81,
    order_number: "#cd6170",
    customer: { first_name: "Marian", last_name: "Coltart" },
    telephone: "706-130-7647",
    created: "2024-07-04 03:56:07",
    company: "Gigazoom",
  },
  {
    id: 82,
    order_number: "#e46711",
    customer: { first_name: "Natalya", last_name: "Ferrieres" },
    telephone: "499-695-8650",
    created: "2024-06-03 18:52:13",
    company: null,
  },
  {
    id: 83,
    order_number: "#72b309",
    customer: { first_name: "Morganica", last_name: "Olivetti" },
    telephone: "479-302-9967",
    created: "2024-08-10 22:48:55",
    company: "Feednation",
  },
  {
    id: 84,
    order_number: "#ed1b28",
    customer: { first_name: "Adler", last_name: "Baughan" },
    telephone: "383-812-6511",
    created: "2024-07-07 02:30:37",
    company: null,
  },
  {
    id: 85,
    order_number: "#63b661",
    customer: { first_name: "Dione", last_name: "Londesborough" },
    telephone: "604-889-7663",
    created: "2023-09-08 14:26:41",
    company: "Midel",
  },
  {
    id: 86,
    order_number: "#748176",
    customer: { first_name: "Devy", last_name: "Gillice" },
    telephone: "229-536-8416",
    created: "2024-03-20 18:15:05",
    company: "Linktype",
  },
  {
    id: 87,
    order_number: "#b1ff42",
    customer: { first_name: "Doris", last_name: "Gell" },
    telephone: "682-322-3577",
    created: "2024-07-20 08:45:08",
    company: "BlogXS",
  },
  {
    id: 88,
    order_number: "#3c5725",
    customer: { first_name: "Cleavland", last_name: "Umpleby" },
    telephone: "637-525-2852",
    created: "2024-06-08 19:45:35",
    company: null,
  },
  {
    id: 89,
    order_number: "#696d51",
    customer: { first_name: "Mira", last_name: "Batchelder" },
    telephone: "444-863-1572",
    created: "2024-01-10 21:20:49",
    company: "Pixope",
  },
  {
    id: 90,
    order_number: "#b4e128",
    customer: { first_name: "Dallon", last_name: "Imesson" },
    telephone: "534-595-7553",
    created: "2023-12-22 23:30:51",
    company: "Thoughtstorm",
  },
  {
    id: 91,
    order_number: "#726e4f",
    customer: { first_name: "Gunner", last_name: "Hekkert" },
    telephone: "724-757-2237",
    created: "2024-05-24 02:54:09",
    company: "Meevee",
  },
  {
    id: 92,
    order_number: "#cc78d8",
    customer: { first_name: "Maribel", last_name: "Manntschke" },
    telephone: "916-992-1919",
    created: "2024-03-02 22:39:25",
    company: "Quatz",
  },
  {
    id: 93,
    order_number: "#b87154",
    customer: { first_name: "Maury", last_name: "Latan" },
    telephone: "990-844-1435",
    created: "2024-05-04 01:05:44",
    company: "Topicblab",
  },
  {
    id: 94,
    order_number: "#7f509c",
    customer: { first_name: "Ajay", last_name: "McKimmey" },
    telephone: "621-584-1702",
    created: "2024-05-11 18:55:48",
    company: "Oyoloo",
  },
  {
    id: 95,
    order_number: "#9e7c82",
    customer: { first_name: "Halie", last_name: "Dorracott" },
    telephone: "719-752-8906",
    created: "2023-10-02 10:27:07",
    company: "Wikizz",
  },
  {
    id: 96,
    order_number: "#7761c0",
    customer: { first_name: "Blanche", last_name: "Eloi" },
    telephone: "747-294-0980",
    created: "2024-05-30 19:26:36",
    company: "Zazio",
  },
  {
    id: 97,
    order_number: "#c41d0b",
    customer: { first_name: "Banky", last_name: "Dulany" },
    telephone: "838-979-8286",
    created: "2024-01-08 09:41:31",
    company: "Fadeo",
  },
  {
    id: 98,
    order_number: "#d1a8b9",
    customer: { first_name: "Lotti", last_name: "Broomhead" },
    telephone: "577-334-2368",
    created: "2023-09-07 17:40:53",
    company: null,
  },
  {
    id: 99,
    order_number: "#79ec21",
    customer: { first_name: "Pace", last_name: "Knottley" },
    telephone: "618-379-7773",
    created: "2024-08-05 09:59:41",
    company: "Midel",
  },
  {
    id: 100,
    order_number: "#39064f",
    customer: { first_name: "Talyah", last_name: "de Merida" },
    telephone: "953-523-2597",
    created: "2024-07-13 14:20:31",
    company: null,
  },
];
