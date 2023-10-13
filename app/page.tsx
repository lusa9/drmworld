"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [name, setName] = useState<string>();

  useEffect(() => {
    const name = sessionStorage.getItem("name");

    if (name) {
      setName(name);
    }
  }, []);

  return (
    <div className="flex-1 relative">
      {!name && (
        <div className="absolute inset-0 flex items-center bg-black/80">
          <Prompt />
        </div>
      )}
    </div>
  );
}

function Prompt() {
  return (
    <div className="mx-auto px-8 max-w-lg w-full -mt-[15svh]">
      <form
        className="border border-white/20 w-full p-16 pb-12 xs:p-24 xs:pb-20 rounded-lg"
        onSubmit={(e) => {
          const formData = new FormData(e.target as any);
          const name = formData.get("name")?.toString().trim();

          if (!name) return;

          sessionStorage.setItem("name", name);
        }}
      >
        <p className="text-sm mx-1">Enter your name</p>
        <input
          className="bg-white/10 mt-4 px-4 py-3 w-full"
          name="name"
          autoFocus
        />
        <button
          className="mt-4 -mx-3 p-4 hover:opacity-80 text-center w-full"
          type="submit"
        >
          Proceed
        </button>
      </form>
    </div>
  );
}
