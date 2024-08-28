import { Avatar, Badge, Button, Datepicker, Drawer, Label, List, Modal, Select, Spinner, TextInput, theme } from "flowbite-react";
import { Order, StockItem, TModalProps } from "../types";
import { SubmitHandler, useForm } from "react-hook-form";
import useMutation from "../hooks/mutation";
import { toast } from "sonner";
import { HiUserAdd, HiSearch, HiPlus } from "react-icons/hi";
import { Key, useEffect, useState } from "react";
import { motion } from "framer-motion";
import useQuery from "../hooks/query";
import { animateItem, container } from "../constants";
import { formatCurrency } from "../functions";

export function AddOrderModalComponent({
    openedModal,
    setOpenedModal,
    refresh
}: TModalProps & { refresh: () => void }) {

    const [items, setItems] = useState<StockItem[]>([]);
    const [scale, setScale] = useState(0);
    const [height, setHeight] = useState<number | string>(0);
    const [selectedAmount, setSelectedAmount] = useState(0);

    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<Order>();
    const { insert, data: fetchData, loading, error } = useMutation();
    const { data: stock, loading: isStockLoading, error: isStockError, search } = useQuery<StockItem[]>({
        table: 'stock',
        from: 0, to: 10,
        filter: "id,OEM_number,VIN,engine_number,manufacturer,model_range,cost,gross_price,supplier(name,email),car_model(make,model)",
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
        if (searchQuery.length > 0) {
            setScale(1)
            setHeight("40vh");
            onSearch(debouncedQuery);
        } else {
            setScale(0)
            setHeight(0);
        }
    }, [debouncedQuery]);

    const onSearch = async (text: string) => {
        await search(`OEM_number.ilike.%${text}%,engine_number.ilike.%${text}%,manufacturer.ilike.%${text}%,VIN.ilike.%${text}%,car_model.make.ilike.%${text}%,car_model.model.ilike.%${text}%`);
    }

    const onSubmit: SubmitHandler<Order> = async (values) => {
        await insert('stock', values);
        if (error) {
            toast.error(error);
        }
        if (fetchData) {
            toast.success("supplier added");
            refresh();
            setOpenedModal("");
        }
    }

    const onSelectItem = (item: StockItem) => {

        console.log("Item ", item);

        if (selectedAmount > 0) {
            item["quantity"] = selectedAmount;
            setItems([...items, item]);
        }
    }

    const onClose = () => {
        setOpenedModal("")
        setScale(1)
        setHeight("40vh")
    }

    return (
        <Drawer
            open={openedModal === "order-modal"}
            onClose={onClose}
            position="right"
            className="w-3/4"
        >
            <Drawer.Header title="Add new order" titleIcon={HiPlus} />

            <Drawer.Items>
                <div className="flex gap-8">
                    <motion.div className="w-1/2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                        }}
                    >
                        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
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
                            </div>

                            <div className="flex space-x-2">
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

                                <div className="grow">
                                    <div className="mb-2 block">
                                        <Label htmlFor="customer" value="Customer Name" />
                                    </div>
                                    <TextInput
                                        id="customer"
                                        type="text"
                                        placeholder="customer name"
                                        {...register("customer_name", { required: "customer name is required" })}
                                        helperText={
                                            <>
                                                {errors.customer_name && <span className="font-medium text-sm">{errors.customer_name.message}</span>}
                                            </>
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex space-x-2">
                                <div className="grow">
                                    <div className="mb-2 block">
                                        <Label htmlFor="customer_phone" value="Contact Number" />
                                    </div>
                                    <TextInput
                                        id="customer_phone"
                                        type="tel"
                                        placeholder="customer_phone"
                                        {...register("contact", { required: "customer phone name is required" })}
                                        helperText={
                                            <>
                                                {errors.contact && <span className="font-medium text-sm">{errors.contact.message}</span>}
                                            </>
                                        }
                                    />
                                </div>

                                <div className="grow">
                                    <div className="mb-2 block">
                                        <Label htmlFor="company_name" value="Company Name" />
                                    </div>
                                    <TextInput
                                        id="company_name"
                                        type="text"
                                        placeholder="company name"
                                        {...register("company_name", { required: "company name is required" })}
                                    />
                                </div>

                            </div>

                            <div className="flex space-x-2">
                                <div className="grow">
                                    <div className="mb-2 block">
                                        <Label htmlFor="company_reg" value="Company Reg #" />
                                    </div>
                                    <TextInput
                                        id="company_reg"
                                        type="text"
                                        placeholder="company registration number"
                                        {...register("company_reg")}
                                    />
                                </div>
                                <div className="grow">
                                    <div className="mb-2 block">
                                        <Label htmlFor="VAT_reg" value="VAT Reg Number" />
                                    </div>
                                    <TextInput
                                        id="VAT_reg"
                                        type="text"
                                        placeholder="VAT.regstriation number"
                                        {...register("VAT_reg")}
                                    />
                                </div>
                            </div>
                            <Button type="submit">Save {" "} {loading && <Spinner size="sm" />}</Button>
                        </form>
                    </motion.div>

                    <div className="grow space-y-2">
                        <div className="block">
                            <Label className="text-xl" htmlFor="search" value="Search for items" />
                        </div>
                        <TextInput
                            id="search"
                            type="text"
                            icon={HiSearch}
                            placeholder="Search ..."
                            onChange={(event) => setSearchQuery(event.target.value.trim())}
                        />

                        <motion.div
                            initial={{ scale: 0, height: 0 }}
                            animate={{ scale: scale, height: height }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20
                            }}
                            className="h-96 rounded-lg bg-gray-50 dark:bg-gray-600 w-full p-4"
                        >
                            <List unstyled className=" divide-y divide-gray-200 dark:divide-gray-700">
                                {
                                    stock?.map((item, key: Key) => (
                                        <List.Item className="pb-3 sm:pb-4" key={key + item.OEM_number}>
                                            <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                                <Avatar placeholderInitials={item.id?.toString()} bordered size="sm" />
                                                <div className="grow space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white capitalize">{item.OEM_number} - {typeof item.car_model !== 'number' && item.car_model?.make}</p>
                                                        <div className="text-base font-semibold text-gray-900 dark:text-white">{formatCurrency(item.gross_price)}</div>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <p className="truncate text-sm text-gray-500 dark:text-gray-400">{item.manufacturer}</p>
                                                        <div className="inline-flex space-x-1 rounded-lg bg-gray-700 pl-0.5 items-center">
                                                            <TextInput className="w-10 !rounded-r-none border-none" sizing={"sm"} placeholder="Amt" onChange={(e) => setSelectedAmount(parseInt(e.target.value))} />
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
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20
                            }}
                            variants={container}
                            className="pr-3 space-y-2">
                            <Label htmlFor="item" value="Order List" className="text-xl" />

                            {
                                items?.map((item, key: Key) => (
                                    <motion.div
                                        initial="hidden"
                                        animate="visible"
                                        variants={animateItem} className="flex gap-2 items-center" key={key}>
                                        <div className="w-24 h-20 rounded-lg bg-gray-50/50 dark:bg-gray-400/40"></div>
                                        <div className="space-y-1 grow">
                                            <h5 className="font-bold">{item.manufacturer}</h5>
                                            <span className="font-thin">{formatCurrency(item.gross_price * (typeof (item.quantity) == "number" ? item.quantity : 0))}</span>
                                            <div className="flex justify-between items-center">
                                                <Badge>VAT (15%) </Badge>
                                                <div className="rounded-full flex gap-3 items-center bg-gray-50 dark:bg-gray-400 p-1">
                                                    <motion.button className="flex items-center justify-center h-6 w-6 bg-white dark:bg-gray-700 rounded-full"
                                                        whileTap={{
                                                            scale: 0.8,
                                                            rotate: -90
                                                        }}>-</motion.button>
                                                    <span className="">{item.quantity}</span>
                                                    <motion.button className="flex items-center justify-center h-6 w-6 bg-white dark:bg-gray-700 rounded-full font-bold"
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

                        <div className="space-y-2 border-t bg-gray-800">
                            <div className="flex items-center justify-between ">
                                <span className="font-semibold text-lg">Sub Total</span>
                                <span className="font-semibold text-lg">{formatCurrency(600000)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-normal text-gray-700 dark:text-gray-300">Tax (15%)</span>
                                <span className="font-normal text-gray-700 dark:text-gray-300">{formatCurrency(600000 * 0.15)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-xl">Total</span>
                                <span className="font-bold text-xl">{formatCurrency(600000 * 1.15)}</span>
                            </div>
                        </div>

                    </div>
                </div>
            </Drawer.Items>
        </Drawer >
    )
}