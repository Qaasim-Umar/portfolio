/**
 * Renders a project's `role` string, turning the `orgLabel` substring (if
 * present) into a hyperlink to `orgUrl` — e.g. "Team Project · Feature/mind"
 * with only "Feature/mind" clickable.
 */
export function RoleLine({
  role,
  orgLabel,
  orgUrl,
}: {
  role: string;
  orgLabel?: string;
  orgUrl?: string;
}) {
  if (!orgLabel || !orgUrl) return <>{role}</>;

  const index = role.indexOf(orgLabel);
  if (index === -1) return <>{role}</>;

  return (
    <>
      {role.slice(0, index)}
      <a
        href={orgUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-dotted underline-offset-2 hover:text-primary"
      >
        {orgLabel}
      </a>
      {role.slice(index + orgLabel.length)}
    </>
  );
}
