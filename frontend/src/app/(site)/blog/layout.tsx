import ExitIntentModal from "@/components/shared/ExitIntentModal";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ExitIntentModal />
    </>
  );
}