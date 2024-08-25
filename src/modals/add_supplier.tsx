import { Modal, Label, TextInput, Button } from "flowbite-react";

type TAddSupplierModalProps = {
  openedModal: string;
  setOpenedModal: React.Dispatch<React.SetStateAction<string>>;
};

export default function AddSupplierModal({
  openedModal,
  setOpenedModal,
}: TAddSupplierModalProps) {
  return (
    <Modal
      show={openedModal === "add-supplier-modal"}
      onClose={() => setOpenedModal("")}
      size={"2xl"}
    >
      <Modal.Header>Add new supplier</Modal.Header>
      <Modal.Body>
        <form className="flex flex-col gap-4">
          <div className="flex space-x-2">
            <div className="grow">
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Name" />
              </div>
              <TextInput
                id="email1"
                type="email"
                placeholder="name@flowbite.com"
                required
              />
            </div>
            <div className="grow">
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Email" />
              </div>
              <TextInput id="password1" type="password" required />
            </div>
          </div>
          <div className="flex space-x-2">
            <div className="grow">
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Telephone" />
              </div>
              <TextInput id="password1" type="password" required />
            </div>
            <div className="grow">
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Address" />
              </div>
              <TextInput id="password1" type="password" required />
            </div>
          </div>
          <div className="flex space-x-2">
            <div className="grow">
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Contact Person" />
              </div>
              <TextInput id="password1" type="password" required />
            </div>
            <div className="grow">
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Website URL" />
              </div>
              <TextInput id="password1" type="password" required />
            </div>
          </div>
          <div className="flex space-x-2">
            <div className="grow">
              <div className="mb-2 block">
                <Label htmlFor="password1" value="VAT Registration" />
              </div>
              <TextInput id="password1" type="password" required />
            </div>
            <div className="grow">
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Company Reg. Number" />
              </div>
              <TextInput id="password1" type="password" required />
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className="justify-end">
        <Button onClick={() => setOpenedModal("")}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}
