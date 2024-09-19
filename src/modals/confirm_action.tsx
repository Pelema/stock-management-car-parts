import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { TModalProps } from "../types";

export function ConfirmActionModalComponent({
  openedModal,
  setOpenedModal,
  confirm,
  loading,
  action = " delete this product"
}: TModalProps & { confirm: () => void, loading: boolean, action?: string }) {
  return (
    <Modal
      show={openedModal === "confirm-modal"}
      size="md"
      onClose={() => setOpenedModal("")}
      popup
    >
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to {action}?
          </h3>
          <div className="flex justify-center gap-4">
            <Button isProcessing={loading} color="failure" onClick={() => { confirm() }}>
              {"Yes, I'm sure"} &nbsp;
            </Button>
            <Button color="gray" onClick={() => setOpenedModal("")}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
