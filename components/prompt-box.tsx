import { useCreateStore } from "@/hooks/use-create";
import { usePathname, useRouter } from "next/navigation";
import React, { useRef } from "react";

function usePromptBox() {
  const router = useRouter();
  const pathname = usePathname();
  const { pristine, values, setValue, getValue } = useCreateStore((s) => s);

  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return {
    buttonRef,
    inputRef,
    onFocus: (e) => {
      if (pathname !== "/create") {
        router.push(`/create`);
      }
    },
    onBlur: (e) => {
      if (pathname === "/create" && pristine) {
        router.back();
      }
    },
    onKeyDown: (e) => {
      if (e.key === "Escape") {
        inputRef.current?.blur();
      }

      if (e.key === "Enter" && e.metaKey) {
        buttonRef.current?.click();
      }
    },
    getValue,
    onChange: (e) => {
      setValue("prompt", e.target.value);
    },
  };
}

export function PromptBox() {
  const { buttonRef, inputRef, getValue, ...inputProps } = usePromptBox();

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert(`Generating "${getValue("prompt")}"...`);
        }}
        {...inputProps}
      >
        <input placeholder="Create something..." />
        <button ref={buttonRef}>Generate</button>
      </form>
    </>
  );
}
