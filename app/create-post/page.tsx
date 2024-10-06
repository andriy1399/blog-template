import CreatePostForm from "@/components/forms/create-post-form";
import React from "react";

const CreatePost = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create a New Post</h1>
      <CreatePostForm />
    </div>
  );
};

export default CreatePost;
