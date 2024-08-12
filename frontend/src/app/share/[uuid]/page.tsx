'use client';

import { Spinner } from '@/components/ui/spinner';
import { secureFetch } from '@/lib/connection';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ShareUuidPage() {
  const { uuid } = useParams<{ uuid: string }>();

  const router = useRouter();

  if (!uuid) {
    router.replace('/');
  }

  useEffect(() => {
    secureFetch(`/api/share/${uuid}`)
      .then((res) => {
        if (res.ok) {
          router.replace(`/doc/${uuid}`);
        }
        throw new Error('Failed to fetch');
      })
      .catch((err) => {
        console.error(err);
        router.replace('/');
      });
  }, [uuid, router]);

  return (
    <main className="w-full h-full flex-1 flex items-center justify-center">
      <Spinner />
    </main>
  );
}
