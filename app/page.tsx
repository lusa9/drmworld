"use client";

import Image from "next/image";
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
    <div className="flex flex-col flex-1 relative">
      <Chat />
      {!name && <Prompt />}
    </div>
  );
}

type Message = {
  message: string;
  sender: "AI" | "user";
};

function Chat() {
  const userName = sessionStorage.getItem("name") || undefined;

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!userName) return;

    if (messages.length === 0) {
      setMessages([{ message: `Hi ${userName}, how are you?`, sender: "AI" }]);
    }
  }, [userName]);

  return (
    <div className="maincol mt-4 flex flex-col flex-1 pb-8">
      <div className="flex items-center gap-7">
        <Image
          className="rounded-full aspect-square object-cover"
          width={80}
          height={80}
          src="/avatar.webp"
          alt="Lifestyle influencer just coming back from her last trip."
        />
        <p className="text-[1.4rem] relative -top-1 font-light tracking-wide">
          Bianca Moretti
        </p>
      </div>
      <div className="mt-6 border-t border-white/20" />
      <MessageBar messages={messages} />
      <form
        id="message-form"
        className="flex gap-4 mt-4"
        onSubmit={(e) => {
          e.preventDefault();

          const formData = new FormData(e.target as any);
          const message = formData.get("message")?.toString().trim();

          if (!message) return;

          setMessages((messages) => [...messages, { message, sender: "user" }]);

          (document.getElementById("message-form") as HTMLFormElement).reset();
        }}
      >
        <input
          id="message-input"
          className="bg-white/10 px-4 py-3 flex-1"
          placeholder="Type a message"
          name="message"
        />
        <button className="bg-[#600FFF] w-32 m-0.5 px-4 rounded font-medium">
          Send
        </button>
      </form>
    </div>
  );
}

function MessageBar({ messages }: { messages: Message[] }) {
  return (
    <div className="flex-1 mx-2 mt-8 overflow-y-scroll space-y-4">
      {messages.map((message) => (
        <div
          className={
            "flex" +
            (message.sender === "user" ? " justify-end" : " justify-start")
          }
        >
          <p
            className={
              "p-4 rounded-xl" +
              (message.sender === "AI"
                ? " bg-white/10 rounded-tl-none"
                : " bg-[#600FFFE6] rounded-tr-none")
            }
            key={JSON.stringify(message)}
          >
            {message.message}
          </p>
        </div>
      ))}
    </div>
  );
}

function Prompt() {
  return (
    <div className="absolute inset-0 flex items-center bg-black/70">
      <div className="mx-auto px-8 max-w-lg w-full -mt-[15svh]">
        <form
          className="border border-white/20 w-full p-16 pb-12 xs:p-24 xs:pb-20 rounded-lg bg-black"
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
          <button className="mt-4 -mx-3 p-4 hover:opacity-80 text-center w-full">
            Proceed
          </button>
        </form>
      </div>
    </div>
  );
}
