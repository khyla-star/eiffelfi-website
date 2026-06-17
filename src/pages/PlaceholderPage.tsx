import { Link, useLocation } from 'react-router-dom';

export default function PlaceholderPage() {
  const { pathname } = useLocation();

  return (
    <main className="placeholder-page">
      <h1>{pathname}</h1>
      <p>This page is not built yet.</p>
      <Link to="/">Back to home</Link>
    </main>
  );
}
