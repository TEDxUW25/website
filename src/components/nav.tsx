import Link from "next/link";

interface Nav {
  name: string,
  path: string,
}

const navItems: Nav[] = [
  {
    name: "Home",
    path: "/"},
  {
    name: "Speakers",
    path: "/speakers"},
  {
    name: "Organizers",
    path: "/organizers"},
  {
    name: "Sponsors",
    path: "/sponsors"},
];


export default function NavBar() {
  return (
    <div className="flex flex-rows justify-between p-8 sticky top-0 z-10 shadow-sm w-full">
      <div className="items-start md:gap-12 flex flex-rows">
      <Link href="/" ><img src = "logo.svg" width = "90px" alt = "logo"/></Link>
        {navItems.map(n => (
          <div key = {n.name} className="hover:underline underline-offset-2 transition ease-in-out ">
          <Link href={n.path} >{n.name}</Link> 
          </div>
        ))}  
      </div>
      <div className="flex flex-rows gap-8">
        <Link href="/buy_ticket" >
          <button className="border rounded-lg border-2 px-4 py-2 hover:bg-[var(--button-transition)] hover:border-[var(--button-transition)] transition ease-in-out ">Buy Ticket
          </button>
          </Link> 
        <Link href="/log_in">
          <button className="hover:underline underline-offset-2 transition ease-in-out pt-2">Log In</button>
        </Link>
      </div>
    </div>
  );
}