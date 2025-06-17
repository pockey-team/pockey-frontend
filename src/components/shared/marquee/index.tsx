/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
"use client";

import { motion, type Variants } from "framer-motion";
import {
  type ComponentPropsWithoutRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

interface FramerMarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  reverse?: boolean;
  children: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  duration?: number;
  gap?: number;
}

export function FramerMarquee({
  className,
  reverse = false,
  children,
  vertical = false,
  repeat = 4,
  duration = 40,
  gap = 1,
  ...props
}: FramerMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentSize, setContentSize] = useState(0);

  useEffect(() => {
    const measureSizes = () => {
      if (containerRef.current && contentRef.current) {
        if (vertical) {
          setContentSize(contentRef.current.offsetHeight);
        } else {
          setContentSize(contentRef.current.offsetWidth);
        }
      }
    };

    measureSizes();

    const handleResize = () => {
      measureSizes();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [vertical]);

  const animationDistance = contentSize + gap * 16;

  const marqueeVariants: Variants = useMemo(() => {
    const animationConfig = {
      duration,
      repeat: Infinity,
      repeatType: "loop" as const,
      ease: "linear",
    };

    const movement = reverse ? [0, animationDistance] : [0, -animationDistance];

    if (vertical) {
      return {
        animate: {
          y: movement,
          transition: animationConfig,
        },
      };
    } else {
      return {
        animate: {
          x: movement,
          transition: animationConfig,
        },
      };
    }
  }, [vertical, reverse, animationDistance, duration]);

  return (
    <div
      ref={containerRef}
      {...props}
      className={cn(
        "relative overflow-hidden",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className,
      )}
    >
      <div
        className={cn("flex", {
          "flex-row": !vertical,
          "flex-col": vertical,
        })}
      >
        {Array(repeat)
          .fill(0)
          .map((_, index) => (
            <motion.div
              key={index}
              ref={index === 0 ? contentRef : undefined}
              className={cn("flex shrink-0", {
                "flex-row": !vertical,
                "flex-col": vertical,
              })}
              style={{
                [vertical ? "marginBottom" : "marginRight"]: `${gap}rem`,
              }}
              variants={marqueeVariants}
              animate="animate"
              initial="animate"
            >
              {children}
            </motion.div>
          ))}
      </div>
    </div>
  );
}
