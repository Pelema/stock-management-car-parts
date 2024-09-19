import { Dropdown } from "flowbite-react";
import { ReactNode } from "react";

import { HiOutlineEllipsisVertical } from "react-icons/hi2";

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
          <HiOutlineEllipsisVertical className="cursor-pointer" />
        </div>
      )}
    >
      {children}
    </Dropdown>
  );
}

export default TableActionsComponent;
