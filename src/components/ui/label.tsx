"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const labelVariants = cva("text-gray-500 text-body-16-regular mb-8px");

export interface LabelProps
  extends ComponentProps<"label">,
    VariantProps<typeof labelVariants> {}

const Label = ({ className, ...props }: LabelProps) => {
  return (
    <LabelPrimitive.Root
      className={cn(labelVariants(), className)}
      {...props}
    />
  );
};

export { Label };
