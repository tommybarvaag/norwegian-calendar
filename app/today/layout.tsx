import "styles/global.css";

export default function TodayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="w-full max-w-4xl grow">{children}</main>
    </>
  );
}
