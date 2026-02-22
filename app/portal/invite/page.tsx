import { validateInviteToken } from "@/lib/invite";
import { InviteForm } from "./InviteForm";

type Props = {
  searchParams: Promise<{ token?: string }>;
};

export default async function PortalInvitePage({ searchParams }: Props) {
  const { token } = await searchParams;

  if (!token) {
    return <InviteError message="Invalid invite link" />;
  }

  const result = await validateInviteToken(token);

  if (!result.ok) {
    return <InviteError message={result.error} />;
  }

  return <InviteForm token={token.trim()} name={result.name} email={result.email} />;
}

function InviteError({ message }: { message: string }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-sm rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 text-center">
        <h1 className="text-xl font-semibold text-white">Invalid invite link</h1>
        <p className="mt-2 text-sm text-zinc-400">{message}</p>
        <a
          href="/portal/login"
          className="mt-6 inline-block text-sm font-medium text-rose-400 hover:text-rose-300"
        >
          Go to login
        </a>
      </div>
    </div>
  );
}
