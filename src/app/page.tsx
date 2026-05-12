import Link from "next/link";

const tools = [
  { href: "/json-formatter", label: "JSON Formatter" },
  { href: "/base64", label: "Base64 Encoder / Decoder" },
  { href: "/jwt-decoder", label: "JWT Decoder" },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-semibold tracking-tight">Engineer Toolbox</h1>
      <p className="mt-3 text-muted-foreground">
        必要なツールを選択してください。
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="rounded-lg border border-border px-5 py-4 text-sm font-medium transition-colors hover:bg-muted"
          >
            {tool.label}
          </Link>
        ))}
      </div>
    </main>
  );
}
