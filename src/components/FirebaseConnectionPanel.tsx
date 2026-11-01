import { useEffect, useState } from 'react';
import { firebaseConfigured, firebaseSignIn, firebaseSignOut, watchUserDeviceStatus } from '@/integrations/firebase/realtime';

export function FirebaseConnectionPanel() {
  const [message, setMessage] = useState('Not connected');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [session, setSession] = useState(0);
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
  }, [session]);
  return <section aria-label="Firebase connection status" className="mx-auto max-w-5xl px-4 py-3 text-sm" role="status">
    <p><strong>Firebase realtime:</strong> {message}</p>
    {firebaseConfigured() && <form className="flex flex-wrap gap-2 py-2" onSubmit={async e => {
      e.preventDefault();
      try {
        await firebaseSignIn(email, password);
        setPassword('');
        setSession(n => n + 1);
      } catch { setMessage('Firebase sign-in failed; check credentials and enabled provider'); }
    }}>
      <input aria-label="Firebase email" type="email" autoComplete="username" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Firebase email" className="border rounded px-2 py-1" />
      <input aria-label="Firebase password" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="border rounded px-2 py-1" />
      <button type="submit" className="border rounded px-3 py-1">Sign in</button>
      <button type="button" className="border rounded px-3 py-1" onClick={async () => {
        try { await firebaseSignOut(); setSession(n => n + 1); setMessage('Signed out'); }
        catch { setMessage('Sign-out failed'); }
      }}>Sign out</button>
    </form>}
  </section>;
}
