import {
  ComponentProps,
  ComponentPropsWithoutRef,
  cloneElement,
  ElementType,
  JSXElementConstructor,
  ReactElement,
  useMemo,
} from "react";
import { cn } from "@/lib/utils";

type AnyComponent = ElementType | JSXElementConstructor<any>;

type PropsOf<C extends AnyComponent> = ComponentPropsWithoutRef<C>;

type PolymorphicComponentProps<
  DefaultComponent extends AnyComponent,
  OwnProps = Record<string, unknown>,
> = OwnProps & {
  as?: AnyComponent;
} & Omit<PropsOf<DefaultComponent>, "as" | keyof OwnProps>;

export const Page = <C extends AnyComponent = "div">({
  as,
  children,
  className,
  ...props
}: PolymorphicComponentProps<"div"> &
  PropsOf<C extends AnyComponent ? C : "div">) => {
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

// Header component with proper type inference
const Header = <C extends AnyComponent = "header">({
  as,
  children,
  className,
  ...props
}: PolymorphicComponentProps<"header"> &
  PropsOf<C extends AnyComponent ? C : "header">) => {
  const Component = as || "header";
  return (
    <Component className={cn("relative w-full px-16px", className)} {...props}>
      <div className="mx-auto flex h-[56px] w-full max-w-[1024px] items-center justify-start">
        {children}
      </div>
    </Component>
  );
};

// Header.Left with proper type inference
Header.Left = <C extends AnyComponent = "div">({
  as,
  children,
  className,
  ...props
}: PolymorphicComponentProps<"div"> &
  PropsOf<C extends AnyComponent ? C : "div">) => {
  const Component = as || "div";
  return (
    <Component className={cn("flex items-center", className)} {...props}>
      {children}
    </Component>
  );
};

// Header.Center with proper type inference
Header.Center = <C extends AnyComponent = "div">({
  as,
  children,
  className,
  ...props
}: PolymorphicComponentProps<"div"> &
  PropsOf<C extends AnyComponent ? C : "div">) => {
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

// Header.Right with proper type inference
Header.Right = <C extends AnyComponent = "div">({
  as,
  children,
  className,
  ...props
}: PolymorphicComponentProps<"div"> &
  PropsOf<C extends AnyComponent ? C : "div">) => {
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

// Container component with proper type inference
Page.Container = <C extends AnyComponent = "div">({
  as,
  children,
  className,
  noPadding,
  ...props
}: PolymorphicComponentProps<"div"> &
  PropsOf<C extends AnyComponent ? C : "div"> & { noPadding?: boolean }) => {
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

// Title component with proper type inference
Page.Title = <C extends AnyComponent = "h1">({
  as,
  children,
  className,
  ...props
}: PolymorphicComponentProps<"h1"> &
  PropsOf<C extends AnyComponent ? C : "h1">) => {
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

// SubTitle component with proper type inference
Page.SubTitle = <C extends AnyComponent = "h2">({
  as,
  children,
  className,
  ...props
}: PolymorphicComponentProps<"h2"> &
  PropsOf<C extends AnyComponent ? C : "h2">) => {
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

Page.ActionButton = <C extends AnyComponent = "div">({
  as,
  children,
  className,
  ...props
}: Omit<
  PolymorphicComponentProps<"div"> &
    PropsOf<C extends AnyComponent ? C : "div">,
  "children"
> & {
  children: (props: ComponentProps<"button">) => ReactElement<any>;
}) => {
  const Component = (as || "div") as AnyComponent;
  const button = useMemo(() => {
    const elem = children({});
    const className = cn(elem.props.className, "w-full");
    return cloneElement(elem, { ...elem.props, className });
  }, [children]);

  return (
    <Component
      className={cn(
        "mx-auto mt-auto mb-48px w-full max-w-[390px] px-16px",
        className,
      )}
      {...props}
    >
      {button}
    </Component>
  );
};
