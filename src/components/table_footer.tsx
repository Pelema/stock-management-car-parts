import { Button, Dropdown, Pagination } from "flowbite-react";
import { useState } from "react";

type TTableFooterProps = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function TableFooterComponent({
  currentPage,
  setCurrentPage,
}: TTableFooterProps) {
  const onPageChange = (page: number) => setCurrentPage(page);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(19);

  return (
    <div className="flex justify-between items-center mt-2">
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Showing &nbsp;
        <span className="font-semibold text-gray-900 dark:text-white">
          {currentPage * rowsPerPage - rowsPerPage + 1}-
          {Math.min(currentPage * rowsPerPage, totalRows)}
          &nbsp;
        </span>
        of &nbsp;
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalRows}
        </span>
      </span>
      <div className="flex overflow-x-auto sm:justify-center items-center space-x-4">
        <div className="flex items-center space-x-4 text-sm font-normal text-gray-500 dark:text-gray-400">
          <div>Rows per page:</div>
          <Dropdown
            label={rowsPerPage}
            dismissOnClick={true}
            renderTrigger={() => (
              <Button outline size="sm">
                {rowsPerPage}
              </Button>
            )}
            className="w-32"
          >
            <Dropdown.Item onClick={() => setRowsPerPage(10)}>10</Dropdown.Item>
            <Dropdown.Item onClick={() => setRowsPerPage(50)}>50</Dropdown.Item>
            <Dropdown.Item onClick={() => setRowsPerPage(100)}>
              100
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setRowsPerPage(1000)}>
              1000
            </Dropdown.Item>
          </Dropdown>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalRows / rowsPerPage)}
          onPageChange={onPageChange}
          showIcons
          previousLabel=""
          nextLabel=""
          theme={{
            pages: {
              base: "xs:mt-0 mt-0 inline-flex items-center -space-x-px",
            },
          }}
        />
      </div>
    </div>
  );
}
