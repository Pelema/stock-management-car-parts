import { Dropdown } from "flowbite-react";
import { ReactNode } from "react";

import { HiOutlineDotsHorizontal } from "react-icons/hi";

type TTAbleActionsProps = {
  children: ReactNode;
};
function TableActionsComponent({ children }: TTAbleActionsProps) {
  return (
    <Dropdown
      label=""
      dismissOnClick={false}
      className="w-48"
      placement="bottom-start"
      renderTrigger={() => (
        <div>
          <HiOutlineDotsHorizontal className="cursor-pointer" />
        </div>
      )}
    >
      {children}
    </Dropdown>
  );
}

export default TableActionsComponent;
