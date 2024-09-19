import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import useMutation from "../hooks/mutation";
import { Supplier, TModalProps } from "../types";

export default function AddSupplierModal({
  openedModal,
  setOpenedModal,
  refresh,
  supplier
}: TModalProps & { refresh: () => void, supplier: Supplier | null }) {

  const { insert, update, loading } = useMutation();
  const { register, handleSubmit, reset, setValue } = useForm<Supplier>()

  const onSubmit: SubmitHandler<Supplier> = async (values) => {
    const { data, error } = supplier ? await update('suppliers', supplier.id, values) : await insert('suppliers', values);
    if (error) {
      toast.error(error.message);
    }
    if (data) {
      reset();
      refresh();
      setOpenedModal("");
      toast.success(`supplier ${supplier ? "updated" : "added"}`);
    }
  }

  useEffect(() => {
    if (supplier?.id) {
      setValue("email", supplier.email);
      setValue("name", supplier.name);
      setValue("telephone", supplier.telephone);
      setValue("VAT_reg", supplier.VAT_reg);
      setValue("contact_person", supplier.contact_person);
      setValue("company_reg", supplier.company_reg);
      setValue("website", supplier.website);
      setValue("address", supplier.address);
    }
  }, [supplier])

  return (
    <Modal
      show={openedModal === "supplier-modal"}
      onClose={() => { setOpenedModal(""); reset(); }}
      size={"2xl"}
    >
      <Modal.Header>{supplier ? "Update" : "Add new"} supplier</Modal.Header>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <div className="flex space-x-2">

            <div className="grow">
              <div className="mb-2 block">
                <Label htmlFor="name" value="Name" />
              </div>
              <TextInput id="name" type="text" required
                {...register("name")}
              />
            </div>

            <div className="grow">
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput
                id="email"
                type="email"
                placeholder="name@company.com"
                required
                {...register("email")}
              />
            </div>

          </div>
          <div className="flex space-x-2">
            <div className="grow">
              <div className="mb-2 block">
                <Label htmlFor="telephone" value="Telephone" />
              </div>
              <TextInput
                id="telephone" type="tel" required
                {...register("telephone")}
              />
            </div>
            <div className="grow">
              <div className="mb-2 block">
                <Label htmlFor="address" value="Address" />
              </div>
              <TextInput id="address" type="text" required
                {...register("address")}
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <div className="grow">
              <div className="mb-2 block">
                <Label htmlFor="contact_person" value="Contact Person" />
              </div>
              <TextInput id="contact_person" type="text" required
                {...register("contact_person")}
              />
            </div>
            <div className="grow">
              <div className="mb-2 block">
                <Label htmlFor="website" value="Website URL" />
              </div>
              <TextInput id="website" type="url"
                {...register("website")}
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <div className="grow">
              <div className="mb-2 block">
                <Label htmlFor="VAT_reg" value="VAT Registration" />
              </div>
              <TextInput id="VAT_reg" type="text"
                {...register("VAT_reg")} />
            </div>
            <div className="grow">
              <div className="mb-2 block">
                <Label htmlFor="company_reg" value="Company Reg. Number" />
              </div>
              <TextInput id="company_reg" type="text"
                {...register("company_reg")} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-end">
          <Button isProcessing={loading} type="submit">Save</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
