import { Pagination } from "flowbite-react";

type TTableFooterProps = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function TableFooterComponent({
  currentPage,
  setCurrentPage,
}: TTableFooterProps) {
  const onPageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="flex justify-between items-center mt-2">
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Showing &nbsp;
        <span className="font-semibold text-gray-900 dark:text-white">
          1-10 &nbsp;
        </span>
        of &nbsp;
        <span className="font-semibold text-gray-900 dark:text-white">
          1000
        </span>
      </span>
      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={100}
          onPageChange={onPageChange}
          showIcons
          previousLabel=""
          nextLabel=""
        />
      </div>
    </div>
  );
}
