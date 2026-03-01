import LogoutButton from "@/components/auth/LogoutButton"
import { isAuthenticated } from "@/lib/auth";

export default async function Dashboard() {
  await isAuthenticated();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <LogoutButton />
    </div>
  );
}