import {
  ComponentProps,
  ComponentPropsWithoutRef,
  cloneElement,
  ElementType,
  PropsWithChildren,
  ReactElement,
  useMemo,
} from "react";
import { cn } from "@/lib/utils";

type PolymorphicProps<E extends ElementType> = PropsWithChildren<
  ComponentPropsWithoutRef<E> & {
    as?: E;
  }
>;

interface Props extends PropsWithChildren<{ className?: string }> {
  noPadding?: boolean;
}

export const Page = ({
  as,
  children,
  className,
  ...props
}: Props & PolymorphicProps<"div">) => {
  const Component = as || "div";
  return (
    <Component
      className={cn("flex h-screen flex-col transition-colors", className)}
      {...props}
    >
      {children}
    </Component>
  );
};

const Header = ({
  as,
  children,
  className,
  ...props
}: Props & PolymorphicProps<"header">) => {
  const Component = as || "header";
  return (
    <Component className={cn("relative w-full px-16px", className)} {...props}>
      <div className="mx-auto flex h-[56px] w-full max-w-[1024px] items-center justify-start">
        {children}
      </div>
    </Component>
  );
};

Header.Left = ({
  as,
  children,
  className,
  ...props
}: Props & PolymorphicProps<"div">) => {
  const Component = as || "div";
  return (
    <Component className={cn("flex items-center", className)} {...props}>
      {children}
    </Component>
  );
};

Header.Center = ({
  as,
  children,
  className,
  ...props
}: Props & PolymorphicProps<"div">) => {
  const Component = as || "div";
  return (
    <Component
      className={cn(
        "-translate-x-1/2 absolute left-1/2 flex items-center",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

Header.Right = ({
  as,
  children,
  className,
  ...props
}: Props & PolymorphicProps<"div">) => {
  const Component = as || "div";
  return (
    <Component
      className={cn("ml-auto flex items-center", className)}
      {...props}
    >
      {children}
    </Component>
  );
};

Page.Header = Header;

Page.Container = ({
  as,
  children,
  className,
  noPadding,
  ...props
}: Props & PolymorphicProps<"div">) => {
  const Component = as || "div";
  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-[390px]",
        noPadding ? "px-0px" : "px-16px",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

Page.Title = ({
  as,
  children,
  className,
  ...props
}: Props & PolymorphicProps<"h1">) => {
  const Component = as || "h1";
  return (
    <Component
      className={cn("text-center text-heading-24-semibold", className)}
      {...props}
    >
      {children}
    </Component>
  );
};

Page.SubTitle = ({
  as,
  children,
  className,
  ...props
}: Props & PolymorphicProps<"h2">) => {
  const Component = as || "h2";
  return (
    <Component
      className={cn("text-center text-subtitle-18-medium", className)}
      {...props}
    >
      {children}
    </Component>
  );
};

Page.ActionButton = ({
  children,
  className,
  ...props
}: Omit<ComponentProps<"div">, "children"> & {
  children: (props: ComponentProps<"button">) => ReactElement<any>;
}) => {
  const button = useMemo(() => {
    const elem = children({});
    const className = cn(elem.props.className, "w-full");
    return cloneElement(elem, { ...elem.props, className });
  }, [children]);

  return (
    <div
      className={cn(
        "mx-auto mt-auto mb-48px w-full max-w-[390px] px-16px",
        className,
      )}
      {...props}
    >
      {button}
    </div>
  );
};
