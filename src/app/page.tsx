"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import { useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const inputRef = useRef(null as any);
  const [quote, setQuote] = useState("" as any);
  const [loading, setLoading] = useState(false as boolean);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    console.log("submitted");
    console.log(inputRef.current?.value);

    const response: any = await fetch("/api/generateAnswer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: inputRef.current?.value.toString().trim(),
      }),
    }).then((response: { json: () => void }) => response.json());

    console.log(response?.response);
    setQuote(response?.response);
    setLoading(false);
  };
  return (
    <main className="flex flex-col justify-center items-center gap-4 bg-purple-200 h-full w-screen px-8 my-10">
      <h1 className="text-3xl md:text-5xl font-bold">Motivate AI</h1>
      <h3 className="text-md md:text-lg text-center">
        Enter a topic and we'll generate a super cringy motivational quote for
        you
      </h3>
      <Image
        src={"/cat.jpg"}
        alt={""}
        width={400}
        height={100}
        className="rounded-2xl"
      ></Image>
      <p className="text-md md:text-lg text-center">
        Create a cringy quote about...
      </p>
      {/* input that accepts text */}
      <form method="post" onSubmit={handleSubmit}>
        <div className="">
          <input
            ref={inputRef}
            required
            type="text"
            id="desc"
            placeholder="eg. lemon, potatoes, water"
            className="w-80 max-w-sm p-2 bg-gray-50 rounded-lg border border-gray-300 text-gray-900 text-sm focus:ring-1 focus:outline-none focus:border-sky-500 focus:ring-sky-500 "
          />
        </div>
        {/* button that generates quote */}
        <div className=" flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 mt-4 border border-gray-300 rounded-lg bg-slate-50 ${
              loading ? " bg-slate-50/50" : ""
            }`}
          >
            {loading ? "Loading..." : "Generate Cringe"}
          </button>
        </div>
      </form>
      <div className="">{loading && <Skeleton count={2} />}</div>
      <div className="italic text-lg text-center max-w-sm">{quote}</div>
      <div className="text-xs mt-10 text-gray-500">Powered by ChatGPT-3.5</div>
    </main>
  );
}
