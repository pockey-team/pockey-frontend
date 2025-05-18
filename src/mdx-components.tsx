import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="mt-24px mb-32px text-gray-100 text-heading-24-semibold">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-16px mb-24px text-gray-100 text-heading-20-semibold">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-12px mb-16px text-gray-100 text-subtitle-18-medium">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="mb-8px text-gray-300 leading-7">{children}</p>
    ),
    a: ({ href, children }) => (
      <Link href={href || "#"} className="text-primary-500 hover:underline">
        {children}
      </Link>
    ),
    ul: ({ children }) => (
      <ul className="mb-8px ml-24px list-disc text-gray-300">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-8px ml-20px list-decimal text-gray-300">{children}</ol>
    ),
    li: ({ children }) => <li className="mb-2px">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="mb-8px border-gray-700 border-l-8px pl-8px text-gray-8px00">
        {children}
      </blockquote>
    ),
    hr: () => <hr className="my-32px border-gray-700" />,
    img: (props) => (
      <div className="my-32px">
        <Image
          src={props.src || ""}
          alt={props.alt || ""}
          width={1200}
          height={630}
          className="rounded-lg"
        />
        {props.alt && (
          <p className="mt-2 text-center text-gray-8px00 text-sm">
            {props.alt}
          </p>
        )}
      </div>
    ),
    table: ({ children }) => (
      <div className="my-32px overflow-x-auto">
        <table className="w-full border-collapse text-gray-300">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border border-gray-700 bg-gray-800 p-3 text-left font-semibold">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-gray-700 p-2px">{children}</td>
    ),
    // 코드 블록
    pre: ({ children }) => (
      <pre className="mb-8px overflow-x-auto rounded-lg bg-gray-800 p-8px text-gray-300">
        {children}
      </pre>
    ),
    code: ({ children }) => (
      <code className="rounded bg-gray-800 px-1 py-0.5 text-gray-300 text-sm">
        {children}
      </code>
    ),
    ...components,
  };
}
