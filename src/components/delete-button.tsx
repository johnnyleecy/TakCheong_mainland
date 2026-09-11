"use client";

import { TrashIcon } from "@/components/icons";

export default function DeleteButton({
  id,
  action,
  label,
}: {
  id: string;
  action: (fd: FormData) => void | Promise<void>;
  label?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm("确定要删除吗？此操作无法复原。")) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
      >
        <TrashIcon className="h-3.5 w-3.5" />
        {label ?? "删除"}
      </button>
    </form>
  );
}
