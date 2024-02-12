"use client";
import Image from "next/image";
import Todo from "./components/Todo";
import Swal from "sweetalert2";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    Swal.fire({
      title: "Welcome!",
      text: `This is a simple Todo App built with Next.js and Tailwind CSS. You can add, edit, 
      delete and filter tasks based on their priority.
      Please note that the tasks are stored in the browser's local storage and will be lost if the browser's cache is cleared.`,
      icon: "info",
    });
  }, []);
  return (
    <main>
      <div className="flex items-center justify-center">
        <h1 className=" mt-5 p-4 text-center w-fit text-4xl bg-teal-500 text-white">
          Todo App
        </h1>
      </div>
      <Todo />
    </main>
  );
}
