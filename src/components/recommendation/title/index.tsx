import { Fragment, type PropsWithChildren, type ReactNode } from "react";

interface Props {
  name: string;
  text: string;
  component: (props: PropsWithChildren) => ReactNode;
}

export const RecommendationTitle = ({
  component: Component,
  name,
  text,
}: Props) => {
  if (!name || !text || !text.startsWith(name)) {
    return <>{text}</>;
  }

  const rest = text.slice(name.length);

  return (
    <>
      <Component>{name}</Component>
      {rest.split("\n").map((line, index) => (
        <Fragment key={String(index)}>
          {index > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </>
  );
};
