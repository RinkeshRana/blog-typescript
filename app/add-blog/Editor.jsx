//Editor.jsx

"use client";
import EditorJS from "@editorjs/editorjs";
import classes from "./editorjs.module.css";
import { useEffect, useRef, useState } from "react";
import { EDITOR_CONFIG } from "./editorjs.config";
import { useRouter } from "next/navigation";
import { randomId } from "@/lib/utils";

const Editor = ({ holder }) => {
  const [data, setData] = useState({
    time: Date.now(),
    blocks: [
      {
        // generate a random id
        id: randomId(),
        type: "header",
        data: {
          text: "Start writing with your title...",
          level: 1,
        },
      },
      {
        id: randomId(),
        type: "header",
        data: {
          text: "and a subtitle",
          level: 2,
        },
      },
    ],
    version: "2.30.5",
  });

  const router = useRouter();

  const ref = useRef();

  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        inlineToolbar: true,
        holder: holder,
        tools: EDITOR_CONFIG,
        placeholder: "Start Writing...",
        data: data,
        async onChange(api, event) {
          const data = await api.saver.save();
          setData(data);
          console.log("Saved Data: ", data);
        },
        i18n: {
          toolNames: {
            Hyperlink: "Link",
          },
          tools: {
            hyperlink: {
              Save: "Salvar",
              "Select target": "Seleziona destinazione",
              "Select rel": "Wählen rel",
            },
          },
        },
      });

      ref.current = editor;
    }

    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  return (
    <>
      {" "}
      <div
        id={holder}
        className={classes.editorjs}
        py={4}
        border={"1px solid rgb(190, 195, 224, 0.4)"}
        borderradius={6}
      />
      <div className="flex justify-center ">
        <button
          className="
      bg-blue-500
      hover:bg-blue-700
      text-white
      font-bold
      py-2
      px-4
      rounded
    "
          onClick={async () => {
            const response = await addBlog(data);
            if (response.error) {
              return toast.error(response.error);
            }

            toast.success("Blog added successfully");
            router.push(`/blog/${response.slug}`);
          }}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default Editor;
