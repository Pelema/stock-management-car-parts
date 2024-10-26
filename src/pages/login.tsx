import { Label, TextInput, Checkbox, Button, Spinner } from "flowbite-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserInputs } from "../types";
import useAuth from "../hooks/auth";


export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInputs>();

  const { loading, error, signIn } = useAuth();

  const onSubmit: SubmitHandler<UserInputs> = async (values) => {
    const { data, error } = await signIn(values);
    // console.log("USer data ", data);
    
    if (error) {
      return
    }
    if (data) {
      localStorage.setItem("logged_in", "true");
      window.location.href = "/admin/dashboard"
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-96 flex-col gap-4"
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />
          </div>
          <TextInput
            id="email"
            type="email"
            placeholder="name@example.com"
            required
            {...register("email")}
          />
          {errors.email && <span>email is required</span>}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Password" />
          </div>
          <TextInput id="password" type="password" required {...register("password")} />
          {errors.password && <span>password is required</span>}
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div>
        <Button type="submit">Sign In &nbsp; {loading && <Spinner size={"sm"} />}</Button>
        {error && <span className="text-sm text-red-600">Invalid emal or password!</span>}
      </form>

    </div>
  );
}
