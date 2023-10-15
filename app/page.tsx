"use client";

import { useChat } from "ai/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [name, setName] = useState<string>();

  useEffect(() => {
    if (typeof window === "undefined") return;

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
  const [userName] = useState(() => {
    if (typeof window === "undefined") return;

    return sessionStorage.getItem("name") || undefined;
  });

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: [
      {
        createdAt: new Date(),
        content: `Hi ${userName}, how are you?`,
        role: "assistant",
        id: "",
      },
    ],
  });

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
      <MessageBar messages={userName ? messages : []} />
      <form
        id="message-form"
        className="flex gap-4 mt-4"
        onSubmit={handleSubmit}
      >
        <input
          id="message-input"
          className="bg-white/10 px-4 py-3 flex-1"
          placeholder="Type a message"
          name="message"
          value={input}
          onChange={handleInputChange}
        />
        <button className="bg-[#600FFF] w-32 m-0.5 px-4 rounded font-medium">
          Send
        </button>
      </form>
    </div>
  );
}

function MessageBar({
  messages,
}: {
  messages: ReturnType<typeof useChat>["messages"];
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollDiv = ref.current;

    if (!scrollDiv) return;

    scrollDiv.scrollTop = scrollDiv.scrollHeight;
  }, [messages]);

  return (
    <div className="flex-1 mx-2 mt-8 relative">
      <div
        id="message-scrollbar"
        className="absolute inset-0 space-y-6 overflow-y-scroll no-scrollbar"
        ref={ref}
      >
        {messages.map((message) => (
          <div
            id={message.id}
            className={
              "flex" +
              (message.role === "user" ? " justify-end" : " justify-start")
            }
          >
            <div>
              <p
                className={
                  "p-4 rounded-xl" +
                  (message.role === "assistant"
                    ? " bg-white/10 rounded-tl-none"
                    : " bg-[#600FFFE6] rounded-tr-none")
                }
                key={JSON.stringify(message)}
              >
                {message.content}
              </p>
              <p
                className={
                  "text-xs font-thin m-2" +
                  (message.role === "assistant" ? " text-left" : " text-right")
                }
              >
                {message.createdAt &&
                  `${message.createdAt.getHours()}:${
                    message.createdAt.getMinutes() < 10
                      ? `0${message.createdAt.getMinutes()}`
                      : message.createdAt.getMinutes()
                  }`}
              </p>
            </div>
          </div>
        ))}
      </div>
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

            if (typeof window === "undefined") return;

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
