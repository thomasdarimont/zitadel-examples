import { useSession } from 'next-auth/react';

import orgStore from '../lib/org';

export default function UserGrant() {
  const org = orgStore((state) => (state as any).org);

  const { data: session } = useSession();

  let roles = [];
  if (session && session.user && org?.id && session.user.roles) {
    roles = Object.keys(session.user.roles).map((role) => {
      return session.user.roles[role][org.id] ? role : null;
    });
  }

  return (
    session && (
      <div className="py-4">
        You ({session.user.preferred_username}) have{" "}
        <strong
          className={`${
            roles && roles.length ? "text-green-500" : "text-red-500"
          }`}
        >
          {roles && roles.length ? roles.join(",") : "no"}
        </strong>{" "}
        roles for this application and the organization set above.
      </div>
    )
  );
}
