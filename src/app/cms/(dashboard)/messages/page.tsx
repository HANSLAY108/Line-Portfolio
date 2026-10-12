import { connection } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { deleteMessage, markMessageRead } from "@/lib/actions/lists";
import { Card, PageTitle } from "@/components/cms/ui";
import FormattedDate from "@/components/cms/FormattedDate";

export const instant = false;

export default async function MessagesPage() {
  await connection();
  const { supabase } = await requireAdmin();
  const { data: messages } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      <PageTitle eyebrow="Inbox" title="Messages" />
      <div className="space-y-4">
        {(messages ?? []).length === 0 && (
          <p className="text-sm text-muted">No messages yet.</p>
        )}
        {(messages ?? []).map((message) => (
          <Card key={message.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-medium">
                  {message.full_name}{" "}
                  {!message.read && (
                    <span className="ml-2 rounded-full bg-accent-soft px-2 py-0.5 text-[10px] uppercase tracking-wide text-accent-text">
                      New
                    </span>
                  )}
                </p>
                <p className="text-sm text-muted">{message.email}</p>
              </div>
              <p className="text-xs text-muted-light">
                <FormattedDate dateString={message.created_at} />
              </p>
            </div>
            <p className="mt-3 text-sm font-semibold">{message.subject}</p>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-muted">
              {message.body}
            </p>
            <div className="mt-4 flex gap-4">
              <form
                action={async () => {
                  "use server";
                  await markMessageRead(message.id, !message.read);
                }}
              >
                <button type="submit" className="text-sm text-accent-text">
                  Mark as {message.read ? "unread" : "read"}
                </button>
              </form>
              <form
                action={async () => {
                  "use server";
                  await deleteMessage(message.id);
                }}
              >
                <button type="submit" className="text-sm text-muted-light hover:text-red-600">
                  Delete
                </button>
              </form>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
