import { Link } from "react-router-dom";


export default function Footer() {

  return (
    <footer className="border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 border-2 border-primary rounded flex items-center justify-center">
                <span className="font-technical text-primary text-sm">3D</span>
              </div>
              <span className="font-technical text-primary text-lg tracking-wider">
                PRINTFORGE
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your gateway to endless 3D printing possibilities.
            </p>
          </div>

          <div>
            <h4 className="font-technical text-sm text-primary uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/categories" className="hover:text-primary transition-colors">Categories</Link></li>
              <li><Link to="/promotions" className="hover:text-primary transition-colors">Promotions</Link></li>
              <li><Link to="/community" className="hover:text-primary transition-colors">Community</Link></li>
              <li><Link to="/discover" className="hover:text-primary transition-colors">Discover</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-technical text-sm text-primary uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-technical text-sm text-primary uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Licenses</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-dashed border-border text-center">
          <p className="text-xs text-muted-foreground blueprint-annotation">
            © 2024 PRINTFORGE // ALL RIGHTS RESERVED // REV 3.0.1
          </p>
        </div>
      </div>
    </footer>
  )
}