import {
  Upload,
  FileType,
  Image,
  X,
  Plus,
  ChevronLeft,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Step4({images, files, setUploadStep}) {
  return (
    <div className="space-y-6">
      <div className="blueprint-card p-8">
        <h3 className="font-technical text-primary uppercase tracking-wider mb-6">
          Review Your Project
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="aspect-square bg-secondary/30 rounded-lg flex items-center justify-center mb-4">
              {images.length > 0 ? (
                <img
                  src={images[0]}
                  alt=""
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <Image className="w-16 h-16 text-muted-foreground" />
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              {files.length} files • {images.length} images
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground">Title</div>
              <div className="font-medium">Your Project Title</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Category</div>
              <div className="font-medium">Figurines</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Price</div>
              <div className="font-technical text-xl text-primary">FREE</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">License</div>
              <div className="font-medium">Personal Use Only</div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-dashed border-border flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-success">Ready to publish!</p>
            <p className="text-muted-foreground mt-1">
              Your project will be reviewed and published within 24 hours.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setUploadStep(3)}>
          Back
        </Button>
        <Link to="/profile">
          <Button variant="blueprint" size="lg">
            <Upload className="w-4 h-4 mr-2" />
            Publish Project
          </Button>
        </Link>
      </div>
    </div>
  )
}