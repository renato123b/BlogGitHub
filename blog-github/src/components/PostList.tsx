// src/components/PostList.tsx
import { GitHubIssue } from "../types/issue";
import { Link } from "react-router-dom";

interface PostListProps {
  issues: GitHubIssue[];
  onSearchChange: (value: string) => void;
  search: string;
}

export function PostList({ issues, onSearchChange, search }: PostListProps) {
  return (
    <div style={{ marginTop: 40 }}>
      <h2>Posts do Repositório</h2>
      <input
        type="text"
        placeholder="Buscar por título..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ padding: 8, marginBottom: 20, width: "100%", maxWidth: 400 }}
      />

      {issues.length === 0 ? (
        <p>Nenhum post encontrado.</p>
      ) : (
        issues.map((issue) => (
          <div key={issue.id} style={{ border: "1px solid #eee", padding: 16, marginBottom: 16, borderRadius: 8 }}>
            <Link to={`/post/${issue.number}`} style={{ textDecoration: "none", color: "black" }}>
              <h3>{issue.title}</h3>
            </Link>
            <p>
              <strong>Autor:</strong> {issue.user.login} |{" "}
              <strong>Data:</strong> {new Date(issue.created_at).toLocaleDateString()}
            </p>
            <p>{issue.body.slice(0, 140)}...</p>
          </div>
        ))
      )}
    </div>
  );
}
