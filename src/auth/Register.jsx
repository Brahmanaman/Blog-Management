import { set, useForm } from "react-hook-form";
import { useBlog } from "../context/BlogContext";
import { setLocalStorage } from "../utils/localstorage";
import { useState } from "react";
import { useNavigate } from "react-router";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "user",
    },
    mode: "onChange",
  });
  const [userExist, setUserExist] = useState(false);
  const { blogUsers, setBlogUsers, setBlogCurrentUser } = useBlog();
  const navigate = useNavigate();
  let updatedRole = watch("role");
  const formSubmit = (data) => {
    let isUserExist = blogUsers.find((user) => user.email === data.email);
    if (isUserExist) {
      reset();
      setUserExist(true);
      return;
    }

    let newData = [...blogUsers, data];
    setBlogUsers(newData);

    let loggedInUserData = {
      email: data.email,
      password: data.password,
      name: data.name,
      createdAt: new Date(),
      role: updatedRole,
    };
    setBlogCurrentUser(loggedInUserData);

    setLocalStorage("blog_users", newData);
    setLocalStorage("blog_current_user", loggedInUserData);

    reset();
    navigate("/");
  };
  return (
    <>
      <div className="min-h-[calc(100vh-4rem)]">
        <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
          <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm w-full max-w-md">
            <div className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 text-center">
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
              <div className="font-semibold text-2xl">Create an Account</div>
              <div className="text-muted-foreground text-sm">Join Inkwell to start reading or writing</div>
            </div>
            <form onSubmit={handleSubmit(formSubmit)}>
              <div data-slot="card-content" className="px-6">
                <div className="group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&amp;&gt;[data-slot=field-group]]:gap-4">
                  <div className="group/field flex w-full gap-3 data-[invalid=true]:text-destructive flex-col [&amp;&gt;*]:w-full [&amp;&gt;.sr-only]:w-auto">
                    <label className="items-center text-sm font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-[&gt;[data-slot=field]]:w-full has-[&gt;[data-slot=field]]:flex-col has-[&gt;[data-slot=field]]:rounded-md has-[&gt;[data-slot=field]]:border [&amp;&gt;*]:data-[slot=field]:p-4 has-data-[state=checked]:bg-primary/5 has-data-[state=checked]:border-primary dark:has-data-[state=checked]:bg-primary/10">
                      Name
                    </label>
                    <input
                      {...register("name", { required: "Name is required" })}
                      className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                      id="name"
                      placeholder="John Doe"
                      type="text"
                    />
                    {errors.name && <p className="text-destructive">{errors.name.message}</p>}
                  </div>
                  <div className="group/field flex w-full gap-3 data-[invalid=true]:text-destructive flex-col [&amp;&gt;*]:w-full [&amp;&gt;.sr-only]:w-auto">
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
                    {errors.email && <p className="text-destructive">{errors.email.message}</p>}
                  </div>
                  <div
                    data-orientation="vertical"
                    className="group/field flex w-full gap-3 data-[invalid=true]:text-destructive flex-col [&amp;&gt;*]:w-full [&amp;&gt;.sr-only]:w-auto"
                  >
                    <label className="items-center text-sm font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-[&gt;[data-slot=field]]:w-full has-[&gt;[data-slot=field]]:flex-col has-[&gt;[data-slot=field]]:rounded-md has-[&gt;[data-slot=field]]:border [&amp;&gt;*]:data-[slot=field]:p-4 has-data-[state=checked]:bg-primary/5 has-data-[state=checked]:border-primary dark:has-data-[state=checked]:bg-primary/10">
                      Password
                    </label>
                    <input
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                      id="password"
                      placeholder="Create a password"
                      type="password"
                    />
                    {errors.password && <p className="text-destructive">{errors.password.message}</p>}
                  </div>
                  <div
                    data-orientation="vertical"
                    className="group/field flex w-full gap-3 data-[invalid=true]:text-destructive flex-col [&amp;&gt;*]:w-full [&amp;&gt;.sr-only]:w-auto"
                  >
                    <label className="items-center text-sm font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-[&gt;[data-slot=field]]:w-full has-[&gt;[data-slot=field]]:flex-col has-[&gt;[data-slot=field]]:rounded-md has-[&gt;[data-slot=field]]:border [&amp;&gt;*]:data-[slot=field]:p-4 has-data-[state=checked]:bg-primary/5 has-data-[state=checked]:border-primary dark:has-data-[state=checked]:bg-primary/10">
                      Confirm Password
                    </label>
                    <input
                      {...register("confirmPassword", {
                        required: true,
                        validate: (value) => value === watch("password") || "Password do not match",
                      })}
                      className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                      id="confirmPassword"
                      placeholder="Confirm your password"
                      type="password"
                    />
                    {errors.confirmPassword && <p className="text-destructive">{errors.confirmPassword.message}</p>}
                  </div>
                  <div
                    role="group"
                    data-slot="field"
                    data-orientation="vertical"
                    className="group/field flex w-full gap-3 data-[invalid=true]:text-destructive flex-col [&amp;&gt;*]:w-full [&amp;&gt;.sr-only]:w-auto"
                  >
                    <label
                      data-slot="field-label"
                      className="items-center text-sm font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-[&gt;[data-slot=field]]:w-full has-[&gt;[data-slot=field]]:flex-col has-[&gt;[data-slot=field]]:rounded-md has-[&gt;[data-slot=field]]:border [&amp;&gt;*]:data-[slot=field]:p-4 has-data-[state=checked]:bg-primary/5 has-data-[state=checked]:border-primary dark:has-data-[state=checked]:bg-primary/10"
                    >
                      Account Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setValue("role", "user")}
                        type="button"
                        className={`rounded-lg border-2 p-4 text-center transition-all ${updatedRole === "user" ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"} `}
                      >
                        <p className="font-medium">Reader</p>
                        <p className="text-xs text-muted-foreground">Read articles</p>
                      </button>
                      <button
                        onClick={() => setValue("role", "author")}
                        type="button"
                        className={`rounded-lg border-2 p-4 text-center transition-all ${updatedRole === "author" ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}
                      >
                        <p className="font-medium">Author</p>
                        <p className="text-xs text-muted-foreground">Write &amp; publish</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="items-center px-6 [.border-t]:pt-6 flex flex-col gap-4 mt-5">
                {userExist && <p className="text-destructive">User Already Exist</p>}
                <button
                  disabled={!isValid}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([className*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 has-[&gt;svg]:px-3 w-full"
                  type="submit"
                >
                  Create Account
                </button>
                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <a className="text-primary hover:underline" href="/login">
                    Sign in
                  </a>
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default Register;
