import Link from "next/link";
import { Badge, badgeVariants } from "~/components/ui/badge";


interface IUserCardProps {
  email: string | undefined;
  full_name: string | null;
  username: string | null;
  website: string | null;
}

export default function ReadOnlyAccountCard(props: IUserCardProps) {
  return (
    <div className="flex flex-col gap-y-2">
      <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">{"@" + props.username}</h1>
      <div className="flex flex-col w-fit gap-y-3">
        <Badge variant="default">{props.full_name}</Badge>
        <Badge variant="outline">{props.email}</Badge>
        <Link
          href={props.website ?? ""}
          className={badgeVariants({ variant: "link" })}
        >
          {props.website}
        </Link>
      </div>
    </div>
  )
}