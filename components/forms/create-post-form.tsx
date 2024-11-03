"use client";
import React from "react";
import { z } from "zod";
import RichEditor from "@/components/rich-editor/rich-editor";
import { Input } from "@/components/ui/input";
import CoverImageUpload from "@/components/upload/cover-image-upload";
import { postSchema } from "@/lib/schemas/post";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import TagsMultiSelect from "../common/tags-multi-select";
import axios from "axios";
type PostFormData = z.infer<typeof postSchema>;

const CreatePostForm = () => {
  const form = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      coverImage: "",
      content: "",
      tags: [],
    },
  });

  const { handleSubmit, control, setValue } = form;

  const onSubmit = async (data: PostFormData) => {
    try {
      const response = await axios.post("/api/posts", data);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="shadow bg-header">
        <FormField
          control={control}
          name="coverImage"
          render={() => (
            <FormItem>
              <FormControl>
                <CoverImageUpload
                  onUploadComplete={(url) => setValue("coverImage", url)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pr-8 pl-28 pb-16 pt-8 z-0 lg:pr-8">
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="New Post Title ..."
                    className="bg-transparent focus-visible:ring-0 text-4xl px-0 font-bold w-full focus:outline-none border-none focus:border-none focus:shadow-none shadow-none mb-3"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TagsMultiSelect
                    maxSelected={3}
                    placeholder="Select tags..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <hr />
        <FormField
          control={control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RichEditor
                  onChange={(html) => setValue("content", html)}
                  initialContent={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-center py-5">
          <Button type="submit" variant="secondary" size="lg">
            Publish
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreatePostForm;
