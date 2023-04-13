import Image from "next/image";
import React from "react";
import { getProviders, signIn as signIntoProvider } from "next-auth/react";
const Login = ({ providers: { google } }) => {
  return (
    <div
      key={google.name}
      className="flex flex-col items-center gap-6 py-5 w-screen h-screen justify-center"
    >
      <Image
        src="https://links.papareact.com/ocw"
        alt="logo"
        objectFit="contain"
        width={135}
        height={135}
      />
      <button
        onClick={() => {
          signIntoProvider(google.id, { callbackUrl: "/" });
        }}
        className="bg-blue-500 text-white py-2 px-4 rounded-3xl"
      >
        Sign in with {google.name}
      </button>
    </div>
  );
};
export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
export default Login;
