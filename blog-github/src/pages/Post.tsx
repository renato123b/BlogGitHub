import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../services/api";
import { GitHubIssue } from "../types/issue";

const USERNAME = "lucaspedronet";
const REPO = "BlogProfileGitHub";

export function Post() {
  const { id } = useParams();
  const [issue, setIssue] = useState<GitHubIssue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      setError(false);
      try {
        const response = await api.get(`/repos/${USERNAME}/${REPO}/issues/${id}`);
        setIssue(response.data);
      } catch (err) {
        console.error("Erro ao carregar post:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchPost();
  }, [id]);

  if (loading) {
    return <p className="p-6 text-gray-500">Carregando post...</p>;
  }

  if (error || !issue) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Link to="/" className="text-blue-500 underline mb-4 block">← Voltar</Link>
        <p className="text-red-500">Erro ao carregar o post ou ele não existe.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/" className="text-blue-500 underline mb-4 block">← Voltar</Link>
      <h1 className="text-2xl font-bold mb-2">{issue.title}</h1>
      <p className="text-sm text-gray-600 mb-4">
        Postado por <strong>{issue.user.login}</strong> em{" "}
        {new Date(issue.created_at).toLocaleDateString()}
      </p>
      <div className="bg-gray-100 p-4 rounded shadow">
        <pre className="whitespace-pre-wrap">{issue.body}</pre>
      </div>
    </div>
  );
}
