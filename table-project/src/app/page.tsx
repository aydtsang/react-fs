import UsersTable from "~/components/UsersTable";

export default function Home() {
  return (
    <main>
      {/* @ts-expect-error Server Component */}
      <UsersTable/>
    </main>
  )
}
