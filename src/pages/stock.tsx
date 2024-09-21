import {
  Button,
  Dropdown,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useState } from "react";
import { tableTheme } from "./table_theme";

import { HiPencil, HiTrash } from "react-icons/hi";
import {
  ListSkeletalComponent,
  TableActionsComponent,
  TableFooterComponent,
  TableHeaderComponent,
} from "../components";
import { formatCurrency } from "../functions";
import useQuery from "../hooks/query";
import { AddStockModal, ConfirmModal, RestockModal } from "../modals";
import { StockItem } from "../types";
import { toast } from "sonner";
import useMutation from "../hooks/mutation";

export function StockPage() {
  const [openedModal, setOpenedModal] = useState("");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const [selectedItem, setSelectedItem] = useState<StockItem>();

  const { onDelete, loading } = useMutation();

  const {
    data: stock,
    loading: isLoading,
    search,
    refresh,
    count,
  } = useQuery<StockItem[]>({
    table: "stock",
    from: start,
    to: end,
    filter:
      "id,name,description,min_stock_level,OEM_number,VIN,engine_number,manufacturer,model_range,selling_price, quantity_on_hand,supplier(name,email),car_model(make,model)",
  });

  const onSearch = async (text: string) => {
    if (text.length > 0)
      search(`OEM_number.ilike.%${text}%,VIN.ilike.%${text}%,engine_number.ilike.%${text}%,manufacturer.ilike.%${text}%,model_range.ilike.%${text}%`);
  }

  const confirmDelete = async () => {
    const { data, error } = await onDelete("stock", selectedItem?.id as number);
    if (data) {
      toast.success(`${selectedItem?.name} deleted`);
      setOpenedModal("");
      refresh();
    }
    if (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <div className="overflow-x-auto rounded-md h-full flex flex-col">
        <TableHeaderComponent onSearch={onSearch}>
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
              {isLoading ? (
                <ListSkeletalComponent cols={7} />
              ) : (
                <>
                  {stock?.map((item, key) => (
                    <TableRow
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      key={key + item.OEM_number}
                    >
                      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {start + key + 1}
                      </TableCell>
                      <TableCell>{item.OEM_number} - {item.name}</TableCell>
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
                              onClick={() => {
                                setSelectedItem(item);
                                setOpenedModal("stock-modal");
                              }}
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
        product={selectedItem ?? null}
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

      <ConfirmModal
        openedModal={openedModal}
        setOpenedModal={setOpenedModal} confirm={confirmDelete} loading={loading} />
    </>
  );
}
