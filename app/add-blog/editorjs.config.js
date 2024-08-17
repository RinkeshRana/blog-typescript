//editorjs.config.js

import CheckList from "@editorjs/checklist";
import Code from "@editorjs/code";
import Embed from "@editorjs/embed";
import InlineCode from "@editorjs/inline-code";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import Image from "@editorjs/image";
import Underline from "@editorjs/underline";
import Delimiter from "@editorjs/delimiter";

const uploadImageToImgBB = async (file) => {
  const apiKey = "5f05dd558c48caa0c163e420fe6c18fe"; // Your imgbb API key

  // Create a FormData object to send the file
  const formData = new FormData();
  formData.append("image", file);

  try {
    // Make the POST request to upload the image
    const response = await fetch(
      "https://api.imgbb.com/1/upload?key=" + apiKey,
      {
        method: "POST",
        body: formData,
      }
    );

    // Parse the JSON response
    const data = await response.json();

    if (data.success) {
      // Return the image URL
      return data.data.url;
    } else {
      throw new Error("Image upload failed");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

const EDITOR_CONFIG = {
  code: Code,

  header: {
    class: Header,
    inlineToolbar: true,
    config: {
      placeholder: "Enter a Heading",
      levels: [1, 2, 3, 4, 5, 6], //configure heading tags (e.g. h1,h2,h3 etc) to be shown in editorjs component
      defaultLevel: 3,
    },
  },

  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },

  image: {
    class: Image,
    config: {
      uploader: {
        uploadByFile: async (file) => {
          //this function will be triggered when image gets selected
          return {
            success: 1,
            file: {
              // i'm creating a blob from the image file you can do your api call to upload the image somewhere and store the actual url
              url: await uploadImageToImgBB(file),

              raw: file,
            },
          };
        },
        uploadByUrl: async (url) => {
          //this function will be triggered when image gets selected
          return {
            success: 1,
            file: {
              url: url,
            },
          };
        },
      },
    },
  },

  checklist: CheckList,

  embed: Embed,
  underline: Underline,

  inlineCode: InlineCode,

  list: {
    class: List,
    inlineToolbar: true,
  },

  quote: Quote,
  delimiter: Delimiter,
};

export { EDITOR_CONFIG };
