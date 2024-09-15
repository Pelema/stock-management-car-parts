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
import { Key, useEffect, useState } from "react";

import { HiPencil, HiTrash } from "react-icons/hi";
import {
  ListSkeletalComponent,
  TableActionsComponent,
  TableFooterComponent,
  TableHeaderComponent,
} from "../components";
import { AddStockModal, RestockModal } from "../modals";
import useQuery from "../hooks/query";
import { StockItem } from "../types";
import { formatCurrency } from "../functions";

export function StockPage() {
  const [openedModal, setOpenedModal] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const [selectedItem, setSelectedItem] = useState<StockItem>();

  const {
    data: stock,
    loading: isLoading,
    error: isError,
    refresh,
    count,
  } = useQuery<StockItem[]>({
    table: "stock",
    from: 0,
    to: 10,
    filter:
      "id,OEM_number,VIN,engine_number,manufacturer,model_range,selling_price, quantity_on_hand,supplier(name,email),car_model(make,model)",
  });

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
            onClick={() => setOpenedModal("stock-modal")}
          >
            add item
          </Button>
        </TableHeaderComponent>
        <div className="h-full overflow-y-auto">
          <Table hoverable theme={tableTheme} className="table-fixed">
            <TableHead>
              <TableHeadCell className="w-14">id</TableHeadCell>
              <TableHeadCell>oem number</TableHeadCell>
              <TableHeadCell>make</TableHeadCell>
              <TableHeadCell>model</TableHeadCell>
              <TableHeadCell>model range</TableHeadCell>
              <TableHeadCell>manufacturer</TableHeadCell>
              <TableHeadCell>price (N$)</TableHeadCell>
              <TableHeadCell>quantity</TableHeadCell>
              <TableHeadCell className="w-24">
                <span className="sr-only">Actions</span>
              </TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {loading ? (
                <ListSkeletalComponent cols={7} />
              ) : (
                <>
                  {stock?.map((item, key: Key) => (
                    <TableRow
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      key={key}
                    >
                      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {item.id}
                      </TableCell>
                      <TableCell>{item.OEM_number}</TableCell>
                      <TableCell>
                        {typeof item.car_model !== "number" &&
                          item.car_model?.make}
                      </TableCell>
                      <TableCell>
                        {typeof item.car_model !== "number" &&
                          item.car_model?.model}
                      </TableCell>
                      <TableCell>{item.model_range}</TableCell>
                      <TableCell>{item.manufacturer}</TableCell>
                      <TableCell>{formatCurrency(item.selling_price)}</TableCell>
                      <TableCell>{item.quantity_on_hand}</TableCell>

                      {/* <TableCell>
                        <div className="rounded-lg border text-xs px-2 overflow-auto">{item.VIN}</div>
                        <div className="rounded-lg border">{item.engine_number}</div>
                      </TableCell> */}
                      <TableCell>
                        <TableActionsComponent>
                          <>
                            <Dropdown.Item
                              icon={HiPencil}
                              onClick={() => {
                                setSelectedItem(item);
                                setOpenedModal("restock-modal");
                              }}
                            >
                              Restock
                            </Dropdown.Item>
                            <Dropdown.Item
                              icon={HiPencil}
                              onClick={() => setOpenedModal("stock-modal")}
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
          count={count}
          setStart={setStart}
          setEnd={setEnd}
          start={start}
        />
      </div>

      <AddStockModal
        refresh={refresh}
        openedModal={openedModal}
        setOpenedModal={setOpenedModal}
      />

      <RestockModal
        refresh={refresh}
        openedModal={openedModal}
        setOpenedModal={setOpenedModal}
        item={selectedItem}
      />
    </>
  );
}
