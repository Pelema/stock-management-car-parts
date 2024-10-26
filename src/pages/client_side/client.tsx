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
import { useNavigate } from "react-router-dom";
import { StockItem } from "../../types";
import useQuery from "../../hooks/query";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../functions";
import { toast } from "sonner";
import { CardSkeletal } from "../../components/skeletal";

export default function ClientPage() {
  const navigate = useNavigate();
  // const [start, setStart] = useState(0);
  // const [end, setEnd] = useState(10);
  const [cart, setCart] = useState<StockItem[]>([]);

  const {
    data: stock,
    loading: isLoading,
    search,
    // refresh,
    // count,
  } = useQuery<StockItem[]>({
    table: "stock",
    from: 0,
    to: 10,
    filter:
      "id,name,description,min_stock_level,OEM_number,VIN,engine_number,manufacturer,model_range,selling_price, quantity_on_hand,supplier(name,email),car_model(make,model)",
  });


  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300); // Delay of 300ms

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery]);

  const onSearch = async (text: string) => {
    if (text.length > 0)
      search(
        `name.ilike.%${text}%,OEM_number.ilike.%${text}%,VIN.ilike.%${text}%,engine_number.ilike.%${text}%,manufacturer.ilike.%${text}%,model_range.ilike.%${text}%`
      );
  };

  const addToCart = (stock: StockItem) => {
    setCart([...cart, stock]);
    toast.success(`Added ${stock.name} to cart`)
  }

  return (
    <div className="h-full flex">
      <Sidebar theme={theme} tabIndex={0} className="hidden lg:block">
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
      <main className="grow p-4 overflow-y-auto">
        <nav className="flex justify-between">

          <div className="flex items-center gap-2">
            <div tabIndex={0} role="button" className="lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>

            <div className="hidden lg:block">View our catalogue of more than 7000 car parts</div>
          </div>

          <div className="flex items-center space-x-4">
            <Button size="small" color="transparent">
              <div className="flex gap-2 items-center">
                <FaUserCircle className="text-xl" />
                <span>Sign In</span>
              </div>
            </Button>
            <Button size="small" color="transparent" onClick={() => navigate('/login')}>
              <div className="flex gap-2 items-center">
                <FaHeadset className="text-xl" />
                <span>Contact Us</span>
              </div>
            </Button>
          </div>
        </nav>

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
                onChange={(event) => setSearchQuery(event.target.value.trim())}
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

        <div className="lg:w-4/6 grow space-y-2 py-4">
          <div>Find your car part</div>
          <div className="flex space-x-2">
            <div className="grow">
              <Select onChange={(event) => setSearchQuery(event.target.value)}>
                <option value={'BMW'}>BMW</option>
                <option value={'Toyota'}>Toyota</option>
              </Select>
            </div>
            <div className="grow">
              <Select onChange={(event) => setSearchQuery(event.target.value)}>
                <option value={'coupe'}>Coupe</option>
                <option value={'hatch-back'}>Hatch back</option>
              </Select>
            </div>
            <div className="grow">
              <Select onChange={(event) => setSearchQuery(event.target.value)}>
                <option value={'cbz'}>CBZ</option>
                <option value={'cbj'}>CBJ</option>
              </Select>
            </div>
            <Button>Search</Button>
          </div>
        </div>

        {isLoading ?
          <CardSkeletal items={10} />
          :
          stock?.length === 0 ?
            <div className="text-center w-full h-52 p-10">No results found</div>
            :
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 my-4 gap-x-4 gap-y-8">
              {stock?.map((item, key) => (
                <div key={key} className="space-y-3">
                  <div className="overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-600 relative">
                    <img src="/logo.webp" />
                    <Badge color={item.quantity > 0 ? 'info' : 'failure'} className="absolute top-3 right-3">{item.quantity > 0 ? 'In Stock' : 'Out of Stock'}</Badge>
                  </div>
                  <div className="">
                    <div className="flex justify-between">
                      <div className="text-lg capitalize">{item.name}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-sm font-bold">{formatCurrency(item.selling_price)}</div>
                      <button className="flex items-center gap-2" onClick={() => addToCart(item)}>
                        <span className="text-xs">Add to Cart</span>
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        }
      </main>
    </div>
  );
}
