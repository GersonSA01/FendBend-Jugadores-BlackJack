import { ButtonLink, Card } from "../ui";

export function UserCard({ user }) {

  return (
    <div className="flex justify-center">
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold mb-5">{user.nombres}</h1>
      </header>
      <p className="text-slate-300"><span className="text-blue-400 font-bold">Nombres:</span> {user.nombres}</p>
      <p className="text-slate-300"><span className="text-blue-400 font-bold">Cedula:</span>{user.cedula}</p>
      <p className="text-slate-300"><span className="text-blue-400 font-bold">Email:</span>{user.email}</p>
     
    </Card>

    </div>

  );
}