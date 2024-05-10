import React, { PropsWithChildren } from "react";
import { PromptBox } from "./prompt-box";
import Link from "next/link";

export function Layout(props: PropsWithChildren) {
  return (
    <div>
      <header className="h-12 bg-pink-200 flex justify-between items-center p-3 fixed top-0 left-0 right-0">
        <Link href="/">Home</Link>
        <PromptBox />
        <Link href="/profile">Profile</Link>
      </header>
      <main className='mt-12'>{props.children}</main>
    </div>
  );
}
