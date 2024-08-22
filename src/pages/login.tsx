import { Label, TextInput, Checkbox, Button } from "flowbite-react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  example: string;
  exampleRequired: string;
};

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {console.log(data);

    localStorage.setItem("logged_in", "true");
    window.location.href = "/"
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-96 flex-col gap-4"
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            placeholder="name@flowbite.com"
            required
            {...register("example")}
          />
          {errors.exampleRequired && <span>This field is required</span>}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput id="password1" type="password" required />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
