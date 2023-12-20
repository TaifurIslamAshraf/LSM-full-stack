"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ListPlus, Trash } from "lucide-react";
import { useFieldArray } from "react-hook-form";

interface INestedProps {
  nestedIndex: number;
  form: any;
}

const NestedLinkArray = ({ nestedIndex, form }: INestedProps) => {
  const { fields, append, remove } = useFieldArray({
    name: `courseData.${nestedIndex}.links`,
  });

  const handleLinkDelete = (linkId: string) => {
    const linkIndex = fields.findIndex((link) => link.id === linkId);
    console.log(linkIndex);
    if (linkIndex !== -1) {
      remove(linkIndex);
    }
  };

  const handleAddLinks = async (nestedIndex: number) => {
    const isValid = await form.trigger(`courseData.${nestedIndex}.links`);
    if (isValid) {
      append({
        title: "",
        url: "",
      });
    }
  };

  return (
    <div className="space-y-4">
      {fields.map((link, linkIndex) => (
        <div key={link.id}>
          <div key={linkIndex} className="space-y-4">
            <FormField
              control={form.control}
              name={`courseData.${nestedIndex}.links.${linkIndex}.title`}
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-primary">
                      Link {linkIndex + 1}
                    </FormLabel>
                    <Button
                      onClick={() => handleLinkDelete(link.id)}
                      className={cn("cursor-pointer")}
                      variant={"outline"}
                      disabled={linkIndex === 0}
                    >
                      <Trash size={20} />
                    </Button>
                  </div>
                  <FormControl>
                    <Input placeholder="Enter Link Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`courseData.${nestedIndex}.links.${linkIndex}.url`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter Link Url" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      ))}
      <Button
        className="flex items-center gap-1"
        onClick={() => handleAddLinks(nestedIndex)}
        variant={"link"}
      >
        <ListPlus className="cursor-pointer" />
        <p className="font-semibold">Add new Link</p>
      </Button>
    </div>
  );
};

export default NestedLinkArray;
