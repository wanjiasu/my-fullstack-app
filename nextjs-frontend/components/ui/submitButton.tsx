import { useFormStatus } from "react-dom";

export function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();

  return (
    <button 
      className="w-full rounded-xl px-4 py-3 text-sm bg-white text-bg1 font-semibold hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200" 
      type="submit" 
      disabled={pending}
    >
      {pending ? "处理中..." : text}
    </button>
  );
}
