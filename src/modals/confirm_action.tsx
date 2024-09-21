import { Button, Modal } from "flowbite-react";
// import { HiOutlineExclamationCircle } from "react-icons/hi";
import { TModalProps } from "../types";

export function ConfirmActionModalComponent({
  openedModal,
  setOpenedModal,
  confirm,
  loading,
  action = "to delete the selected item? This action cannot be undone."
}: TModalProps & { confirm: () => void, loading: boolean, action?: string }) {
  return (
    <Modal
      show={openedModal === "confirm-modal"}
      size="sm"
      onClose={() => setOpenedModal("")}
      popup
    >
      <Modal.Header >
        <span className="capitalize text-base ml-4">Confirmation</span>
      </Modal.Header>
      <Modal.Body>
        <div className="text-start">
          {/* <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> */}
          <p className="mb-5 text-sm font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to {action}
          </p>
          <div className="flex gap-2">
            <Button className="grow" isProcessing={loading} color="failure" onClick={() => { confirm() }}>
              {"Yes, I'm sure"} &nbsp;
            </Button>
            <Button className="grow" color="gray" onClick={() => setOpenedModal("")}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
