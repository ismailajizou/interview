/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useLoginMutation } from "@/redux/apis/auth.api";
import { selectUser, setUser } from "@/redux/features/user.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { FunctionComponent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

interface LoginPageProps {}

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type TLoginForm = z.infer<typeof schema>;

const LoginPage: FunctionComponent<LoginPageProps> = () => {
  const redirect = useNavigate();
  const { isAuthenticated } = useAppSelector(selectUser);
  const form = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(schema),
  });

  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (isAuthenticated) {
      redirect("/");
    }
  }, [isAuthenticated, redirect]);

  const onSubmit = async (values: TLoginForm) => {
    try {
      const result = await login(values).unwrap();
      dispatch(setUser(result));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-lg w-full py-8 px-8 border rounded-md shadow-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <h1 className="text-2xl font-bold text-center">Login</h1>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@doe.com" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <Button className="w-full" type="submit">
                  {isLoading ? "Verifying ..." : "Login"}
                </Button>
              </FormItem>
              <Separator />
              <p className="text-sm text-center font-semibold">
                If you don't have an account, you can{" "}
                <Link to={"/register"} className="text-primary underline">Register</Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
