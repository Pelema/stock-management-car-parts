import { Badge, Button, Drawer } from "flowbite-react";
import { motion } from "framer-motion";
import { HiDocument, HiOutlineCloudArrowDown, HiOutlinePrinter, HiOutlineXMark, HiPlus } from "react-icons/hi2";
import { formatCurrency } from "../functions";
import { Invoice, OrderItem, TModalProps } from "../types";

export function ViewInvoiceModalComponent({
    openedModal,
    setOpenedModal,
    invoice
}: TModalProps & { invoice: Invoice }) {

    const sub_total = invoice?.order?.sales_order_items?.reduce((total, item: OrderItem) => total + (item.unit_price * item.quantity), 0)

    return (
        <Drawer className="h-screen flex flex-col" open={openedModal === "view-invoice-modal"} onClose={() => setOpenedModal("")} position="bottom">
            <Drawer.Header
                closeIcon={HiOutlineXMark}
                title={invoice?.invoice_number}
                titleIcon={HiDocument}
                onClick={() => setOpenedModal("")}
                className="cursor-pointer px-4 pt-4 hover:bg-gray-50 dark:hover:bg-gray-700"
            />

            <div className="flex justify-between mt-4 container mx-auto grow overflow-y-scroll">
                <div className="rounded-xl h-fit bg-gray-500 p-4 space-y-2">
                    <h4 className="text-2xl font-bold">{formatCurrency(invoice?.total_amount as number)}</h4>
                    <div className="bg-gray-500/20 rounded backdrop-blur-sm flex flex-col gap-1 w-fit">
                        <Button>
                            <div className="flex gap-2 items-center">
                                <HiPlus /> <span>Make Payment</span>
                            </div>
                        </Button>
                        <Button.Group >
                            <Button>
                                <div className="flex gap-2 items-center">
                                    <HiOutlineCloudArrowDown /> <span>Download</span>
                                </div>
                            </Button>
                            <Button>
                                <div className="flex gap-2 items-center">
                                    <HiOutlinePrinter /> <span>Print</span>
                                </div>
                            </Button>
                        </Button.Group>
                    </div>

                    {invoice?.order?.customer?.name && <motion.div
                        className="space-y-2"
                        initial={{ scale: 0, height: 0 }}
                        animate={{ scale: 1, height: '100%' }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                        }}
                    >
                        <div className="rounded-lg bg-gray-50 dark:bg-gray-600 w-fit p-4 space-y-1">
                            <h6 className="text-xs">Customer</h6>
                            <div className="flex gap-2 items-center">
                                <div className="w-12 h-12 uppercase  rounded-full bg-gray-500 grid place-items-center text-2xl font-bold">
                                    {invoice?.order?.customer?.name.slice(0, 2)}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h5 className="text-xl font-bold capitalize">{invoice?.order?.customer?.name}</h5>
                                    <span className="text-sm">{invoice?.order?.customer?.company_name}</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <span className="text-xs">{invoice?.order?.customer?.telephone}</span>
                                <p className="text-xs text-gray-300 font-semibold">{invoice?.order?.customer?.address}</p>
                            </div>
                        </div>
                    </motion.div>
                    }
                </div>

                <div className="grow mx-auto max-w-xl space-y-4">
                    <div className="bg-gray-100 dark:bg-gray-700 p-6 flex justify-between">
                        <div className="flex gap-2 items-start">
                            <div className="space-y-2">
                                <img className="h-14 rounded-lg" src="/logo.webp" alt="signature" />
                                <Badge>{invoice?.status}</Badge>
                            </div>
                            <div className="flex flex-col gap-.5">
                                <h2 className="text-xl font-semibold">Inventory System Inc</h2>
                                <span className="text-sm">Sirgil Co.</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex flex-col gap-0.5">
                                <h3 className="text-base font-semibold">Invoive Number</h3>
                                <span className="text-xs">{invoice?.invoice_number}</span>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex flex-col gap-.5">
                                    <span className="text-base font-semibold">Date</span>
                                    <span className="text-xs">{invoice?.issue_date.toString()}</span>
                                </div>
                                <div className="flex flex-col gap-.5">
                                    <span className="text-base font-semibold">Due Date</span>
                                    <span className="text-xs">{invoice?.issue_date.toString()}</span>
                                </div>
                            </div>
                        </div>

                    </div>


                    <div className="mx-auto space-y-4">

                        <div className="flex items-end justify-between">
                            {invoice?.order?.customer &&
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-xs">To: </span>
                                    <h3 className="text-base font-semibold capitalize">{invoice?.order?.customer?.name}</h3>
                                    <span className="text-xs">{invoice?.order?.customer?.company_name}</span>
                                    <span className="text-xs max-w-xs">{invoice?.order?.customer?.address}</span>
                                    <span className="text-xs font-medium">{invoice?.order?.customer?.telephone}</span>
                                </div>
                            }
                        </div>

                        <div className="overflow-x-auto p-4 rounded-xl bg-gray-100 dark:bg-gray-700">
                            <div>
                                <div className="flex gap-3">
                                    <div className="grow text-sm">
                                        <div className="rounded-full py-1 px-4 bg-gray-200 dark:bg-gray-900 w-fit font-semibold">Description</div>
                                    </div>
                                    <div className="text-center rounded-full py-1 px-4 w-20 bg-gray-200 dark:bg-gray-900 font-semibold text-sm">Qty</div>
                                    <div className="text-center rounded-full py-1 px-4 bg-gray-200 dark:bg-gray-900 w-32 font-semibold text-sm">Price</div>
                                    <div className="text-center rounded-full py-1 px-4 bg-gray-200 dark:bg-gray-900 w-32 font-semibold text-sm">Total</div>
                                </div>
                                <div className="space-y-2 py-2">
                                    {
                                        invoice?.order?.sales_order_items?.map((item, key) => (
                                            <div className="flex gap-4" key={item.id + "INVITM" + key}>
                                                <div className="whitespace-nowrap dark:text-white grow text-sm">
                                                    {item.product?.OEM_number}-
                                                    {item.product?.name}
                                                </div>
                                                <div className="text-center w-20 text-sm">{item.quantity}</div>
                                                <div className="text-center w-32 text-sm">{formatCurrency(item.unit_price)}</div>
                                                <div className="text-center w-32 text-sm">{formatCurrency(item.total_price)}</div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="binvoice-t flex gap-4 justify-end">
                                    <div className="w-32 text-start text-sm pl-5">
                                        Subtotal
                                    </div>
                                    <div className="w-32 text-sm font-semibold">
                                        {formatCurrency(sub_total || 0)}
                                    </div>
                                </div>
                                <div className="flex gap-4 justify-end">
                                    <div className="w-32 text-sm text-start pl-5">
                                        VAT (15%)
                                    </div>
                                    <div className="w-32 text-sm font-semibold">
                                        {formatCurrency((sub_total || 0) * 0.15)}
                                    </div>
                                </div>
                                <div className="flex gap-4 justify-end">
                                    <div className="w-32 text-start font-semibold pl-5">
                                        Total
                                    </div>
                                    <div className="w-32 text-base font-bold">
                                        {formatCurrency((sub_total || 0) * 1.15)}
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="flex justify-between ">

                        <div className="">
                            <h3 className="font-bold text-base">Terms and Conditions</h3>
                            <p className="text-xs max-w-60">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed eveniet, reprehenderit exercitationem labore officiis eum.</p>
                        </div>

                        <div className="signature flex flex-col gap-.5 justify-end items-end mr-6">
                            <img className="h-20" src="/signature.png" alt="signature" />
                            <span className="text-sm font-semibold">Isaac Makosa</span>
                            <span className="text-xs">Finance Manager</span>
                        </div>


                    </div>

                    <div className="bg-gray-100 dark:bg-gray-700 p-6 flex justify-between text-xs">
                        <div className="flex flex-col gap-2">
                            <div className="bg-gray-200 dark:bg-gray-900 px-3 py-1 rounded-full text-xs">Payment Information</div>
                            <div className="flex flex-col gap-0.5 ml-2">
                                <span className="text-xs">Bank: FNB/NEDBANK</span>
                                <span className="text-xs">Account Name: I M</span>
                                <span className="text-xs max-w-md">Code: 776FRM9XX</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-0.5">
                            <span className="font-semibold">Company Name</span>
                            <span>+264 61 385678</span>
                            <span className="text-xs">www.website.com</span>
                            <p className="text-xs max-w-xs">
                                Khomas Medical Service 4758 Zwartz Rd <br />
                                Windhoek, <br />
                                Namibia
                            </p>
                        </div>
                    </div>

                </div>
            </div>

        </Drawer>
    )
}