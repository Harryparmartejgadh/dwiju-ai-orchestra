import { useEffect, useState } from 'react';
import { firebaseConfigured, watchUserDeviceStatus } from '@/integrations/firebase/realtime';

export function FirebaseConnectionPanel() {
  const [message, setMessage] = useState('Not connected');
  useEffect(() => {
    if (!firebaseConfigured()) {
      setMessage('Firebase not configured — live telemetry unavailable');
      return;
    }
    try {
      const stop = watchUserDeviceStatus('dwiju', data => {
        setMessage(data ? 'Authenticated Firebase device status received' : 'Connected; no device status yet');
      }, () => setMessage('Firebase read denied or connection failed'));
      return () => stop();
    } catch {
      setMessage('Sign in to Firebase to view live device status');
    }
  }, []);
  return <section aria-label="Firebase connection status" className="mx-auto max-w-5xl px-4 py-3 text-sm" role="status">
    <strong>Firebase realtime:</strong> {message}
  </section>;
}
