// src/components/Summary.tsx
import { GitHubUser } from "../types/github";

interface SummaryProps {
  user: GitHubUser;
}

export function Summary({ user }: SummaryProps) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 16, borderRadius: 8 }}>
      <img src={user.avatar_url} alt={user.name} width={100} />
      <h2>{user.name}</h2>
      <p><strong>Login:</strong> {user.login}</p>
      <p><strong>Bio:</strong> {user.bio}</p>
      <p><strong>Empresa:</strong> {user.company}</p>
      <p><strong>Seguidores:</strong> {user.followers}</p>
      <a href={user.html_url} target="_blank" rel="noreferrer">Ver perfil no GitHub</a>
    </div>
  );
}
