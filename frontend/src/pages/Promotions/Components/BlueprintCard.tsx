


export default function BlueprintCard({icon, title, description}) {
    return (
    <div className="blueprint-card p-4 text-center">
      {icon}
      <div className="font-technical text-2xl text-primary">{title}</div>
      <div className="text-xs text-muted-foreground">{description}</div>
    </div>
    )
}