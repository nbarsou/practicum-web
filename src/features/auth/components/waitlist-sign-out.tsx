'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function WaitlistSignOut() {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/t'); // Redirect to login
          toast.success('Sesión cerrada correctamente');
        },
        onError: () => {
          toast.error('Error al cerrar sesión');
        },
      },
    });
  };

  return (
    <Button
      variant="outline"
      className="border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive w-full"
      onClick={handleSignOut}
    >
      Cerrar Sesión
    </Button>
  );
}
