



export default function MainCategoryCard({ title, description, Icon }) {
    return (
        <div className="blueprint-card p-6 text-center">
          <div className="w-12 h-12 mx-auto border border-primary/50 rounded-full flex items-center justify-center mb-4">
            {Icon}
          </div>
          <h3 className="font-technical text-primary uppercase tracking-wider mb-2">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
    )
}