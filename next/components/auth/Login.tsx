import { ChangeEvent, FormEvent, useState } from "react";
import { isEmpty } from "lodash";
import { TbLoader } from "react-icons/tb";
import { useUser } from "../../hooks/useUser";
import Logo from "../../previews/Logo";
import { Alert, Card } from "../../../package";

const loginUser = async (payload: { email: string; password: string }) => {
  const response = await fetch("/api/chaibuilder/auth/login", { method: "POST", body: JSON.stringify(payload) }).then(
    (res) => res.json(),
  );
  if (!response.access_token) throw response;
  localStorage.setItem("access_token", response.access_token);
  return response;
};

const validateFrom = (email: string, password: string) => {
  const errors: any = {};
  if (isEmpty(email)) errors.email = "Please enter email";
  if (isEmpty(password)) errors.password = "Please enter password";
  else if (password.length < 6) errors.password = "Password length should be greater than or equal to 6";
  return errors;
};

const Login = () => {
  const [, setUser] = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
      if (!isEmpty(error) && !error.form) setError(validateFrom(value, password));
    } else {
      setPassword(value);
      if (!isEmpty(error) && !error.form) setError(validateFrom(email, value));
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateFrom(email, password);
    if (!isEmpty(errors)) {
      setError(errors);
      return;
    }

    setError("");
    setIsLoading(true);
    const payload = { email, password };
    try {
      const res = await loginUser(payload);
      setUser(res);
    } catch (err) {
      setError({ form: "Invalid email or password" });
    }
    setIsLoading(false);
  };

  return (
    <section className="h-screen w-screen bg-white">
      <div className="grid h-full w-full grid-cols-1">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <Card className="w-1/2 min-w-max p-8 shadow-2xl xl:w-1/3">
            <Logo />
            <h2 className="pt-1 text-3xl font-bold leading-tight text-black sm:text-3xl">Sign in to Chaibuilder</h2>

            {error.form ? (
              <Alert variant="destructive" className="my-3 flex flex-col">
                <div className="font-medium">{error.form}</div>
                <p className="text-xs">Please try again</p>
              </Alert>
            ) : (
              <div className="h-4 w-full" />
            )}

            <form method="POST" onSubmit={onSubmit}>
              <div className="space-y-5">
                <div>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                    Email address
                  </label>
                  <div className="relative mt-2.5 text-gray-400 focus-within:text-gray-600">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                    </div>

                    <input
                      type="text"
                      name="email"
                      value={email}
                      onChange={onChange}
                      placeholder="Enter email address"
                      disabled={isLoading}
                      className="block w-full rounded-md border border-gray-200 bg-gray-50 py-4 pl-10 pr-4 text-black placeholder-gray-500 caret-blue-600 transition-all duration-200 focus:border-blue-600 focus:bg-white focus:outline-none"
                    />
                  </div>
                  {error.email && <small className="text-red-500 ease-in-out">{error.email}</small>}
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label htmlFor="" className="text-base font-medium text-gray-900">
                      Password
                    </label>
                  </div>
                  <div className="relative mt-2.5 text-gray-400 focus-within:text-gray-600">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                        />
                      </svg>
                    </div>

                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={onChange}
                      placeholder="Enter your password"
                      disabled={isLoading}
                      className="block w-full rounded-md border border-gray-200 bg-gray-50 py-4 pl-10 pr-4 text-black placeholder-gray-500 caret-blue-600 transition-all duration-200 focus:border-blue-600 focus:bg-white focus:outline-none"
                    />
                  </div>
                  {error.password && <small className="text-red-500">{error.password}</small>}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-fuchsia-600 to-blue-600 px-4 py-4 text-base font-semibold text-white transition-all duration-200 hover:opacity-80 focus:opacity-80 focus:outline-none">
                    {isLoading ? <TbLoader className="animate-spin" size={20} /> : "Sign in"}
                  </button>
                </div>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Login;
