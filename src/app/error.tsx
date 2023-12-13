"use client";

import ErrorPage from "@/components/common/ErrorPage";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <ErrorPage onClick={() => reset()} />;
}
