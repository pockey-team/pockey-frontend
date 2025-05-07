import {
  ComponentProps,
  cloneElement,
  PropsWithChildren,
  ReactElement,
  useMemo,
} from "react";
import { cn } from "@/lib/utils";

interface Props extends PropsWithChildren<{ className?: string }> {
  noPadding?: boolean;
}

export const Page = ({ children, className }: Props) => {
  return (
    <div className={cn("flex h-screen flex-col transition-colors", className)}>
      {children}
    </div>
  );
};

const Header = ({ children, className }: Props) => {
  return (
    <header className={cn("relative w-full px-16px", className)}>
      <div className="mx-auto flex h-[56px] w-full max-w-[1024px] items-center justify-start">
        {children}
      </div>
    </header>
  );
};

Header.Left = ({ children, className }: Props) => {
  return <div className={cn("flex items-center", className)}>{children}</div>;
};

Header.Center = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        "-translate-x-1/2 absolute left-1/2 flex items-center",
        className,
      )}
    >
      {children}
    </div>
  );
};

Header.Right = ({ children, className }: Props) => {
  return (
    <div className={cn("ml-auto flex items-center", className)}>{children}</div>
  );
};

Page.Header = Header;

Page.Container = ({ children, className, noPadding }: Props) => {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[390px]",
        noPadding ? "px-0px" : "px-16px",
        className,
      )}
    >
      {children}
    </div>
  );
};

Page.Title = ({ children, className }: Props) => {
  return <h1 className={cn("text-center text-h1", className)}>{children}</h1>;
};

Page.SubTitle = ({ children, className }: Props) => {
  return (
    <h2 className={cn("text-center text-body-2", className)}>{children}</h2>
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
