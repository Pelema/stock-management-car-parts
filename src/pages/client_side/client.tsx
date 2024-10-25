import {
  Badge,
  Button,
  Select,
  Sidebar,
  SidebarItem,
  TextInput,
} from "flowbite-react";
import { HiSearch } from "react-icons/hi";
import { LuCar, LuShoppingCart } from "react-icons/lu";
import { FaHeadset, FaUserCircle, FaPlus } from "react-icons/fa";
import { theme } from "../../components/sidebar_theme";

function ClientPage() {
  return (
    <div className="h-full flex">
      <Sidebar theme={theme}>
        <Sidebar.Logo img="/logo.webp" href="/">
          Aficasia
        </Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <SidebarItem>Car Parts</SidebarItem>
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup>
            <Sidebar.Collapse label="Brakes">
              <Sidebar.Item>Brake Pads</Sidebar.Item>
              <Sidebar.Item>Brake Calipers</Sidebar.Item>
              <Sidebar.Item>Brake Disks</Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Collapse label="Filters">
              <Sidebar.Item>Oil Filter</Sidebar.Item>
              <Sidebar.Item>Air Filter</Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Collapse label="Engine">
              <Sidebar.Item>Engine oil</Sidebar.Item>
              <Sidebar.Item>Engine mount</Sidebar.Item>
              <Sidebar.Item>Engine samp</Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Collapse label="Body">
              <Sidebar.Item>Tailgate struts</Sidebar.Item>
              <Sidebar.Item>Wing Mirror</Sidebar.Item>
              <Sidebar.Item>Rear Lights</Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Collapse label="Suspension">
              <Sidebar.Item>Wheel Bearing</Sidebar.Item>
              <Sidebar.Item>Anti-rollbar Link</Sidebar.Item>
            </Sidebar.Collapse>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <main className="grow m-2 overflow-y-auto">
        <div className="flex justify-between">
          <div>View our catalogue of more than 7000 car parts</div>
          <div className="flex items-center space-x-4">
            <Button size="small" color="transparent">
              <FaUserCircle className="text-xl" />
              <span>Sign In</span>
            </Button>
            <Button size="small" color="transparent">
              <FaHeadset className="text-xl" />
              <span>Contact Us</span>
            </Button>
          </div>
        </div>
        <div className="flex flex-row border-y border-gray-600 mt-2 divide-x-1">
          <div className="grow py-3 flex">
            <div className=" w-1/2 flex space-x-2">
              <TextInput
                id="search"
                type="search"
                placeholder="Search ..."
                required
                className="w-full"
                icon={HiSearch}
                // onChange={(event) => setSearchQuery(event.target.value.trim())}
              />
              <Button>Search</Button>
            </div>
          </div>
          <div className="w-44 border-l py-3 flex justify-center items-center">
            <LuCar className="text-4xl mr-2" />
            My Vehicles
          </div>
          <div className="w-44 border-l py-3 flex justify-center items-center">
            <LuShoppingCart className="text-4xl mr-2" />
            N$ 0.00
          </div>
        </div>
        <div className="w-4/6 space-y-2 py-4">
          <div>Find your car part</div>
          <div className="flex space-x-2">
            <div className="grow">
              <Select>
                <option>BMW</option>
                <option>Toyota</option>
              </Select>
            </div>
            <div className="grow">
              <Select>
                <option>Coupe</option>
                <option>Hatch back</option>
              </Select>
            </div>
            <div className="grow">
              <Select>
                <option>CBZ</option>
                <option>CBJ</option>
              </Select>
            </div>
            <Button>Search</Button>
          </div>
        </div>
        <div className="grid grid-cols-5 my-4 gap-x-4 gap-y-8">
          {[...Array(20).keys()].map((index) => (
            <div key={index} className="space-y-1">
              <img src="/logo.webp" />
              <div className="flex justify-between">
                <div className="text-lg">Oil filter</div>
                <Badge>In Stock</Badge>
              </div>
              <div className="flex justify-between">
                <div className="text-sm font-bold">N$ 249.99</div>
                <div className="flex items-center space-x-1">
                  <span className="text-xs">Add to Cart</span>
                  <FaPlus />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ClientPage;
