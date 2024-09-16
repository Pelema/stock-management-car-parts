import { Button, Dropdown, Pagination } from "flowbite-react";
import { useEffect, useState } from "react";

type TTableFooterProps = {
  count: number;
  start?: number;
  setStart: React.Dispatch<React.SetStateAction<number>>;
  end?: number;
  setEnd: React.Dispatch<React.SetStateAction<number>>;
};

export default function TableFooterComponent({
  count,
  start = 0,
  setStart,
  setEnd
}: TTableFooterProps) {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page: number) => {
    setCurrentPage(page)
    const st = (page - 1) * rowsPerPage
    setStart(st)
    const en = Math.min(st + rowsPerPage - 1, count);
    setEnd(en)
  };

  useEffect(() => {
    const st = (currentPage - 1) * rowsPerPage
    setStart(st)
    const en = Math.min(st + rowsPerPage - 1, count);
    setEnd(en)
  }, [rowsPerPage])

  const onPageSizeChange = (rows: number) => {
    if (rows > count) {
      setRowsPerPage(rows);
      setCurrentPage(1)
    } else {
      setRowsPerPage(rows);
    }
  }

  return (
    <div className="flex justify-between items-center mt-2">
      <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
        Showing &nbsp;
        <span className="text-gray-900 dark:text-white">
          <b>{(currentPage - 1) * rowsPerPage + 1}</b>
          &nbsp;
          to
          &nbsp;
          <b>{Math.min((currentPage) * rowsPerPage, count)}</b>
          &nbsp;
        </span>
        of &nbsp;
        <span className="font-semibold text-gray-900 dark:text-white">
          {count}
        </span>
      </span>
      <div className="flex overflow-x-auto sm:justify-center items-center space-x-4">
        <div className="flex text-xs items-center space-x-4 font-normal text-gray-500 dark:text-gray-400">
          <div>Rows per page:</div>
          <Dropdown
            label={rowsPerPage}
            dismissOnClick={true}
            renderTrigger={() => (
              <Button outline size="sm">
                {rowsPerPage}
              </Button>
            )}
            className="w-32 !text-xs"
          >
            <Dropdown.Item onClick={() => onPageSizeChange(10)}>10</Dropdown.Item>
            <Dropdown.Item onClick={() => onPageSizeChange(50)}>50</Dropdown.Item>
            <Dropdown.Item onClick={() => onPageSizeChange(100)}>100</Dropdown.Item>
            <Dropdown.Item onClick={() => onPageSizeChange(1000)}>1000</Dropdown.Item>
          </Dropdown>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(count / rowsPerPage)}
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
