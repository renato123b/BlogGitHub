import { useEffect, useState } from "react";
import { api } from "../services/api";
import { GitHubUser } from "../types/github";
import { GitHubIssue } from "../types/issue";
import { Summary } from "../components/Summary";
import { PostList } from "../components/PostList";

const USERNAME = "lucaspedronet";
const REPO = "BlogProfileGitHub";

export function Home() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [issues, setIssues] = useState<GitHubIssue[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [userRes, issuesRes] = await Promise.all([
          api.get(`/users/${USERNAME}`),
          api.get(`/repos/${USERNAME}/${REPO}/issues`)
        ]);
        setUser(userRes.data);
        setIssues(issuesRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filtered = issues.filter((i) =>
    i.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">BlogGitHub</h1>
      {loading && <p className="text-gray-500">Carregando dados...</p>}
      {!loading && user && <Summary user={user} />}
      {!loading && <PostList issues={filtered} search={search} onSearchChange={setSearch} />}
    </div>
  );
}
