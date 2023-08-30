import Image from "next/image";
import RegisterButton from "./register-button";
import { Suspense } from "react";
import { Divider } from "@tremor/react";
import RegisterWithEmail from "./register-email";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="mx-5 border border-stone-200 py-10 dark:border-stone-700 sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg sm:shadow-md">
      <Image
        alt="Platforms Starter Kit"
        width={100}
        height={100}
        className="relative mx-auto h-12 w-auto dark:scale-110 dark:rounded-full dark:border dark:border-stone-400"
        src="https://ik.imagekit.io/n0uvizrukm2/chai-builder-logo-b-w_s_VR37ggn.png?updatedAt=1692613727383"
      />
      <h1 className="mt-6 text-center font-cal text-3xl dark:text-white">Chai Builder</h1>
      <p className="mt-2 text-center text-sm text-stone-600 dark:text-stone-400">
        Create your FREE account <br />
        <br />
      </p>

      <div className="mx-auto mt-4 w-11/12 max-w-xs sm:w-full">
        <Suspense
          fallback={
            <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-800" />
          }>
          <RegisterWithEmail />
          <Divider> sd</Divider>
          <RegisterButton />
        </Suspense>
        <br />
        <br />
        <p className="px-8 text-center text-sm text-white">
          <Link className="hover:text-brand underline underline-offset-4" href="/login">
            Already have an account? Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
