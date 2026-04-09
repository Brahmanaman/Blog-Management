import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { useBlog } from "../context/BlogContext";
import { setLocalStorage } from "../utils/localstorage";
import { useState } from "react";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  const [userExist, setUserExist] = useState(true);
  const { blogCurrentUser, setBlogCurrentUser, blogUsers } = useBlog();
  const navigate = useNavigate();
  const formHandler = (data) => {
    let userData = blogUsers.filter(
      (user) => user.email === data.email && user.password === data.password,
    )[0];
    if (!userData) {
      setUserExist(false);
      return;
    }
    setBlogCurrentUser({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role,
    });
    setLocalStorage("blog_current_user", {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role,
    });
    reset();
    navigate("/");
  };
  return (
    <>
      <div className="min-h-[calc(100vh-4rem)]">
        <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
          <div
            data-slot="card"
            className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm w-full max-w-md"
          >
            <div
              data-slot="card-header"
              className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-pen-line h-6 w-6 text-primary-foreground"
                  aria-hidden="true"
                >
                  <path d="M13 21h8"></path>
                  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
                </svg>
              </div>
              <div data-slot="card-title" className="font-semibold text-2xl">
                Welcome Back
              </div>
              <div
                data-slot="card-description"
                className="text-muted-foreground text-sm"
              >
                Sign in to your account to continue
              </div>
            </div>
            <form onSubmit={handleSubmit(formHandler)}>
              <div data-slot="card-content" className="px-6">
                <div
                  data-slot="field-group"
                  className="group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&amp;&gt;[data-slot=field-group]]:gap-4"
                >
                  <div
                    role="group"
                    data-slot="field"
                    data-orientation="vertical"
                    className="group/field flex w-full gap-3 data-[invalid=true]:text-destructive flex-col [&amp;&gt;*]:w-full [&amp;&gt;.sr-only]:w-auto"
                  >
                    <label className="items-center text-sm font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-[&gt;[data-slot=field]]:w-full has-[&gt;[data-slot=field]]:flex-col has-[&gt;[data-slot=field]]:rounded-md has-[&gt;[data-slot=field]]:border [&amp;&gt;*]:data-[slot=field]:p-4 has-data-[state=checked]:bg-primary/5 has-data-[state=checked]:border-primary dark:has-data-[state=checked]:bg-primary/10">
                      Email
                    </label>
                    <input
                      {...register("email", { required: "Email is required" })}
                      className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                      id="email"
                      placeholder="you@example.com"
                      type="email"
                    />
                    {errors.email && (
                      <span className="text-destructive">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                  <div
                    role="group"
                    data-orientation="vertical"
                    className="group/field flex w-full gap-3 data-[invalid=true]:text-destructive flex-col [&amp;&gt;*]:w-full [&amp;&gt;.sr-only]:w-auto"
                  >
                    <label
                      className="items-center text-sm font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-[&gt;[data-slot=field]]:w-full has-[&gt;[data-slot=field]]:flex-col has-[&gt;[data-slot=field]]:rounded-md has-[&gt;[data-slot=field]]:border [&amp;&gt;*]:data-[slot=field]:p-4 has-data-[state=checked]:bg-primary/5 has-data-[state=checked]:border-primary dark:has-data-[state=checked]:bg-primary/10"
                      for="password"
                    >
                      Password
                    </label>
                    <input
                      {...register("password", {
                        required: "Password is required",
                      })}
                      className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                      id="password"
                      placeholder="Enter your password"
                      type="password"
                    />
                    {errors.password && (
                      <span className="text-destructive">
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div
                data-slot="card-footer"
                className="items-center px-6 [.border-t]:pt-6 flex flex-col gap-4 mt-5"
              >
                {!userExist && (
                  <p className="text-destructive">Invalid email or password</p>
                )}
                <button
                  disabled={!isValid}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([className*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 has-[&gt;svg]:px-3 w-full"
                  type="submit"
                >
                  Sign In
                </button>
                <p className="text-center text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <NavLink
                    className="text-primary hover:underline"
                    to="/register"
                  >
                    Sign up
                  </NavLink>
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default Login;
