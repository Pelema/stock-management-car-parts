import { Avatar, Badge, Button, Datepicker, Drawer, Dropdown, Label, List, Modal, Popover, Select, Spinner, TextInput, theme } from "flowbite-react";
import { Customer, Order, StockItem, TModalProps } from "../types";
import { SubmitHandler, useForm } from "react-hook-form";
import useMutation from "../hooks/mutation";
import { toast } from "sonner";
import { HiUserAdd, HiUser, HiSearch, HiPlus, HiX } from "react-icons/hi";
import { Key, useEffect, useState } from "react";
import { motion } from "framer-motion";
import useQuery from "../hooks/query";
import { animateItem, container } from "../constants";
import { formatCurrency } from "../functions";
import AddCustomer from "./add_customer";

export function AddOrderModalComponent({
    openedModal,
    setOpenedModal,
    refresh
}: TModalProps & { refresh: () => void }) {

    const [scaleItem, setScaleItem] = useState(0);
    const [heightItem, setHeightItem] = useState<number | string>(0);
    const [scaleCustomer, setScaleCustomer] = useState(0);
    const [heightCustomer, setHeightCustomer] = useState<number | string>(0);
    const [items, setItems] = useState<StockItem[]>([]);
    const [selectedAmount, setSelectedAmount] = useState(0);

    const [selectedCustomer, setSelectedCustomer] = useState<Customer>();

    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
    const [searchQueryCus, setSearchQueryCus] = useState('');
    const [debouncedQueryCus, setDebouncedQueryCus] = useState(searchQuery);

    const { insert, data: fetchData, loading, error } = useMutation();
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<Order>();
    const { data: stock, loading: isStockLoading, error: isStockError, search } = useQuery<StockItem[]>({
        table: 'stock',
        from: 0, to: 10,
        filter: "id,OEM_number,VIN,engine_number,manufacturer,model_range,cost,gross_price,supplier(name,email),car_model(make,model)",
    });

    const { data: customers, loading: isCustomerLoading, error: isCustomerError, search: searchCustomer, refresh: refreshCustomer } = useQuery<Customer[]>({
        table: 'customers',
        from: 0, to: 10
    });

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 300); // Delay of 300ms

        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQueryCus(searchQueryCus);
        }, 300); // Delay of 300ms

        return () => {
            clearTimeout(handler);
        };
    }, [searchQueryCus]);

    useEffect(() => {
        if (searchQuery.length > 0) {
            setScaleItem(1)
            setHeightItem("40vh");
            onSearch(debouncedQuery);
        } else {
            setScaleItem(0)
            setHeightItem(0);
        }
    }, [debouncedQuery]);

    useEffect(() => {
        if (searchQueryCus.length > 0) {
            setScaleCustomer(1)
            setHeightCustomer("40vh");
            onSearchCusomer(debouncedQueryCus);
        } else {
            setScaleCustomer(0)
            setHeightCustomer(0);
        }
    }, [debouncedQueryCus]);

    const onSearch = async (text: string) => {
        await search(`OEM_number.ilike.%${text}%,engine_number.ilike.%${text}%,manufacturer.ilike.%${text}%,VIN.ilike.%${text}%`);
        // ,car_model.make.ilike.%${text}%,car_model.model.ilike.%${text}%
    }

    const onSearchCusomer = async (text: string) => {
        await searchCustomer(`name.ilike.%${text}%,company_name.ilike.%${text}%`);
    }

    const onSubmit: SubmitHandler<Order> = async (values) => {
        await insert('order', values);
        if (error) {
            toast.error(error);
        }
        if (fetchData) {
            toast.success("order added");
            refresh();
        }
    }

    const onSelectItem = (item: StockItem) => {
        if (selectedAmount > 0) {
            // checking item exist in the list
            const check = items.find(value => value.id === item.id);
            if (check?.id) {
                const newItems = items.map((value) => value.id === item.id ? { ...item, quantity: selectedAmount } : value);
                setItems(newItems);
            } else {
                item["quantity"] = selectedAmount;
                setItems([...items, item]);
                setSelectedAmount(1);
            }
        }
    }

    const onChangeQuantity = (selectedItem: StockItem, action: '+' | '-') => {
        const check = items.find(value => value.id === selectedItem.id);
        if (check?.id) {
            const newItems = items
                .map((value) => {
                    if (value.id === selectedItem.id) {
                        const count = action === '+' ? value.quantity + 1 : value.quantity - 1;
                        if (count > 0) {
                            return { ...value, quantity: count }
                        }
                        return null;
                    } else {
                        return value
                    }
                })
                .filter(value => value !== null);
            setItems(newItems);
        }
    }

    const onClose = () => {
        setOpenedModal("")
        setScaleItem(0)
        setHeightItem("0vh")
        setScaleCustomer(0)
        setHeightCustomer("0vh")
    }

    const sub_total = items.reduce((total, item: StockItem) => total + (item.gross_price * item.quantity), 0)

    return (
        <Drawer
            open={openedModal === "order-modal"}
            onClose={onClose}
            position="right"
            className="w-1/2 flex flex-col gap-2"
        >
            <Drawer.Header title="Add new order" titleIcon={HiPlus} />

            {/* <Drawer.Items> */}
            <div className="flex gap-2 grow">
                <motion.div className="w-96 flex flex-col space-y-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                    }}
                >
                    <form className="flex flex-col gap-2 bg-gray-700/40 backdrop-blur-sm rounded-lg p-4" onSubmit={handleSubmit(onSubmit)}>
                        <Label className="text-xl" value="#Order" />
                        <div className="flex space-x-2">
                            <div className="grow">
                                <div className="mb-2 block">
                                    <Label htmlFor="order_number" value="Order Number" />
                                </div>
                                <TextInput
                                    id="order_number"
                                    type="text"
                                    placeholder="24566678"
                                    {...register("order_number", { required: "Order number is required" })}
                                    helperText={
                                        <>
                                            {errors.order_number && <span className="font-medium text-sm">{errors.order_number.message}</span>}
                                        </>
                                    }
                                />
                            </div>
                        </div>

                        <div className="flex space-x-2">
                            <div className="grow">
                                <div className="mb-2 block">
                                    <Label htmlFor="date" value="Date" />
                                </div>
                                <Datepicker
                                    id="date"
                                    {...register("date", { required: "date is required" })}
                                    helperText={
                                        <>
                                            {errors.date && <span className="font-medium text-sm">{errors.date.message}</span>}
                                        </>
                                    }
                                />
                            </div>
                            <div className="grow">
                                <div className="mb-2 block">
                                    <Label htmlFor="sales_type" value="Sales Type" />
                                </div>
                                <Select
                                    id="sales_type"
                                    {...register("sale_type", { required: "sales type is required" })}
                                    helperText={
                                        <>
                                            {errors.sale_type && <span className="font-medium text-sm">{errors.sale_type.message}</span>}
                                        </>
                                    }
                                >
                                    <option value="cash">Cash</option>
                                    <option value="laybye">Laybye</option>
                                    <option value="credit">Credit</option>
                                </Select>
                            </div>

                        </div>
                    </form>

                    {/* <hr /> */}

                    <div className="space-y-2 bg-gray-700/40 backdrop-blur-sm grow rounded-lg p-4">
                        <div className="space-y-2">
                            <div className="block">
                                <Label className="" htmlFor="searchCustomer" value="Search Customers" />
                            </div>
                            <div className="flex items-center gap-2">
                                <TextInput
                                    className="grow"
                                    id="searchCustomer"
                                    type="text"
                                    icon={HiSearch}
                                    placeholder="Search customer ..."
                                    onChange={(event) => setSearchQueryCus(event.target.value.trim())}
                                />

                                <AddCustomer refresh={refreshCustomer} />
                            </div>
                        </div>

                        <motion.div
                            initial={{ scale: 0, height: 0 }}
                            animate={{ scale: scaleCustomer, height: heightCustomer }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20
                            }}
                            className="h-96 rounded-lg bg-gray-50 dark:bg-gray-600 w-full px-2 py-4 flex flex-col"
                        >
                            <div className="flex justify-between pl-2">
                                <span className="text-xs text-gray-300">Search By Company Name, Customer Name, Contact Number</span>
                                <motion.button
                                    className="flex items-center justify-center p-2 hover:bg-white hover:dark:bg-gray-500 rounded-lg"
                                    onClick={() => { setScaleCustomer(0); setHeightCustomer(0) }}
                                    whileTap={{
                                        scale: 0.8,
                                        rotate: -60
                                    }}>
                                    <HiX />
                                </motion.button>
                            </div>
                            <List unstyled className=" divide-y divide-gray-200/20 dark:divide-gray-700/20 space-y-1 overflow-y-scroll grow">
                                {
                                    customers?.map((item, key: Key) => (
                                        <List.Item className="p-2 hover:bg-gray-500 cursor-pointer" key={key + item.company_name} onClick={() => { setSelectedCustomer(item); setScaleCustomer(0); setHeightCustomer(0); }}>
                                            <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                                <div className="grid place-items-center bg-gray-700 rounded-full w-8 h-8">
                                                    <HiUser />
                                                </div>
                                                <div className="grow">
                                                    <span className="truncate text-sm font-medium text-gray-900 dark:text-white capitalize">{item.name}</span>
                                                    <div className="text-gray-500 dark:text-white text-xs">{item.company_name} - {item.contact}</div>
                                                </div>
                                            </div>
                                        </List.Item>
                                    ))
                                }
                            </List>
                        </motion.div>

                        {selectedCustomer &&
                            <motion.div
                                className="space-y-2"
                                initial={{ scale: 0, height: 0 }}
                                animate={{ scale: 1, height: '100%' }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20
                                }}
                            >
                                <h3 className="text-xl font-bold">Customer</h3>
                                <div className="rounded-lg bg-gray-50 dark:bg-gray-600 w-fit p-4">
                                    <div className="flex gap-4">
                                        <div className="w-16 uppercase h-16 rounded-lg bg-gray-500 grid place-items-center">
                                            {selectedCustomer.name.slice(0, 2)}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <h5 className="text-xl font-bold capitalize">{selectedCustomer.name}</h5>
                                            <span className="text-sm">{selectedCustomer.company_name}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <span className="text-xs">{selectedCustomer.contact}</span>
                                        <p className="text-xs text-gray-500 font-semibold">{selectedCustomer.address}</p>
                                    </div>
                                </div>

                            </motion.div>}
                    </div>
                </motion.div>


                {/* items */}
                <div className="grow space-y-2 flex flex-col rounded-lg p-4 bg-gray-700/40 backdrop-blur-sm">
                    <div className="">
                        <div className="block">
                            <Label className="" htmlFor="search" value="Search for items" />
                        </div>
                        <TextInput
                            id="search"
                            type="text"
                            icon={HiSearch}
                            placeholder="Search ..."
                            onChange={(event) => setSearchQuery(event.target.value.trim())}
                        />
                    </div>

                    <motion.div
                        className="rounded-lg bg-gray-50 dark:bg-gray-600 w-full p-4 flex flex-col"
                        initial={{ scale: 0, height: 0 }}
                        animate={{ scale: scaleItem, height: heightItem }}
                        transition={{
                            type: "spring",
                            stiffness: 360,
                            damping: 20
                        }}
                    >
                        <div className="flex justify-between">
                            <span className="text-xs text-gray-300">Search By OEM Number, Manufacturer, VIN, CAR Model</span>
                            <motion.button
                                className="flex items-center justify-center p-2 hover:bg-white hover:dark:bg-gray-500 rounded-lg"
                                onClick={() => { setScaleItem(0); setHeightItem(0) }}
                                whileTap={{
                                    scale: 0.8,
                                    rotate: -60
                                }}>
                                <HiX />
                            </motion.button>
                        </div>

                        <List unstyled className=" divide-y divide-gray-100/5 dark:divide-gray-500/5 space-y-1 overflow-y-scroll grow pr-2">
                            {
                                stock?.map((item, key: Key) => (
                                    <List.Item className="py-2" key={key + item.OEM_number}>
                                        <div className="flex items-start space-x-2 rtl:space-x-reverse">
                                            <div className="grid place-items-center bg-gray-700/60 rounded-lg w-10 h-10">
                                                {(parseInt(key.toString()) + 1)}
                                            </div>
                                            <div className="grow">
                                                <div className="flex items-center gap-4">
                                                    <div className="grow">
                                                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white capitalize">{item.OEM_number} - {typeof item.car_model !== 'number' && item.car_model?.make}</p>
                                                        <div className="flex justify-between">
                                                            <p className="truncate text-xs text-gray-500 dark:text-gray-400">{item.manufacturer}</p>
                                                            <div className="font-semibold text-gray-900 dark:text-white text-xs">{formatCurrency(item.gross_price)}</div>
                                                        </div>
                                                    </div>
                                                    <div className="inline-flex space-x-1 rounded-lg bg-gray-700 pl-0.5 items-center">
                                                        <TextInput type="number" className="w-12 !rounded-r-none border-none" sizing={"sm"} defaultValue={1} placeholder="0" onChange={(e) => setSelectedAmount(parseInt(e.target.value))} />
                                                        <motion.button
                                                            whileTap={{ scale: .8, borderRadius: "30%" }}
                                                            className="!rounded-r-lg rounded-l-none p-2 bg-gray-900" onClick={() => {
                                                                onSelectItem(item)
                                                            }} >select
                                                        </motion.button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </List.Item>
                                ))
                            }
                        </List>
                    </motion.div>

                    <motion.div
                        className="pr-3 space-y-2 grow overflow-y-scroll"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                        }}
                        variants={container}
                    >
                        <Label htmlFor="item" value="Order List" className="text-xl" />

                        {
                            items?.map((item, key: Key) => (
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    variants={animateItem} className="flex gap-2 items-center" key={key}>
                                    <div className="w-24 h-20 rounded-lg bg-gray-50/50 dark:bg-gray-400/40"></div>
                                    <div className="space-y-1 grow">
                                        <h5 className="font-bold">{typeof item.car_model !== 'number' && item.car_model?.make}</h5>
                                        <span className="font-thin">{formatCurrency(item.gross_price * (typeof (item.quantity) == "number" ? item.quantity : 0))}</span>
                                        <div className="flex justify-between items-center">
                                            <Badge>{item.manufacturer}</Badge>
                                            <div className="rounded-full flex gap-3 items-center bg-gray-50 dark:bg-gray-400 p-1">
                                                <motion.button
                                                    className="flex items-center justify-center h-6 w-6 bg-white dark:bg-gray-700 rounded-full"
                                                    onClick={() => onChangeQuantity(item, '-')}
                                                    whileTap={{
                                                        scale: 0.8,
                                                        rotate: -90
                                                    }}>-</motion.button>
                                                <span className="">{item.quantity}</span>
                                                <motion.button
                                                    className="flex items-center justify-center h-6 w-6 bg-white dark:bg-gray-700 rounded-full font-bold"
                                                    onClick={() => onChangeQuantity(item, '+')}
                                                    whileTap={{
                                                        scale: 0.8,
                                                        rotate: -90
                                                    }} > +</motion.button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        }
                    </motion.div>

                    <div className="space-y-2 border-t border-gray-500/40">
                        <div className="flex items-center justify-between ">
                            <span className="font-semibold text-base">Sub Total</span>
                            <span className="font-semibold text-base">{formatCurrency(sub_total)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="font-normal text-sm text-gray-700 dark:text-gray-300">Tax (15%)</span>
                            <span className="font-normal text-sm text-gray-700 dark:text-gray-300">{formatCurrency(sub_total * 0.15)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-lg">Total</span>
                            <span className="font-bold text-lg">{formatCurrency(sub_total * 1.15)}</span>
                        </div>
                    </div>

                </div>
            </div>
            {/* </Drawer.Items > */}

            <div className="footer p-2 flex items-center justify-end gap-2 rounded-lg bg-gray-700/40 backdrop-blur-sm">
                <Button outline onClick={onClose}>Cancel</Button>
                <Button>Save</Button>
            </div>
        </Drawer >
    )
}