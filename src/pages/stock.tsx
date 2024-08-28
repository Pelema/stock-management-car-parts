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
  Dropdown,
} from "flowbite-react";
import { tableTheme } from "./table_theme";
import { Key, SetStateAction, useEffect, useState } from "react";

import { HiPencil, HiTrash } from "react-icons/hi";
import {
  ListSkeletalComponent,
  TableActionsComponent,
  TableFooterComponent,
  TableHeaderComponent,
} from "../components";
import { AddStockModal } from "../modals";
import useQuery from "../hooks/query";
import { CarModel, StockItem, Supplier, VAT } from "../types";
import { formatCurrency } from "../functions";

export function StockPage() {
  const [openedModal, setOpenedModal] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const { data: stock, loading: isLoading, error: isError, refresh } = useQuery<StockItem[]>({
    table: 'stock', from: 0, to: 10,
    filter: "id,OEM_number,VIN,engine_number,manufacturer,model_range,cost,gross_price,supplier(name,email),car_model(make,model)"
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
              {/* <TableHeadCell>Other</TableHeadCell> */}
              <TableHeadCell className="w-24">
                <span className="sr-only">Actions</span>
              </TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {loading ? (
                <ListSkeletalComponent cols={6} />
              ) : (
                <>
                  {stock?.map((item, key: Key) => (
                    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800" key={key}>
                      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {item.id}
                      </TableCell>
                      <TableCell>{item.OEM_number}</TableCell>
                      <TableCell>{typeof item.car_model !== 'number' && item.car_model?.make}</TableCell>
                      <TableCell>{typeof item.car_model !== 'number' && item.car_model?.model}</TableCell>
                      <TableCell>{item.model_range}</TableCell>
                      <TableCell>{item.manufacturer}</TableCell>
                      <TableCell>{formatCurrency(item.gross_price)}</TableCell>
                      {/* <TableCell>
                        <div className="rounded-lg border text-xs px-2 overflow-auto">{item.VIN}</div>
                        <div className="rounded-lg border">{item.engine_number}</div>
                      </TableCell> */}
                      <TableCell>
                        <TableActionsComponent>
                          <>
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
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>

      <AddStockModal refresh={refresh} openedModal={openedModal} setOpenedModal={setOpenedModal} />
    </>
  );
}

