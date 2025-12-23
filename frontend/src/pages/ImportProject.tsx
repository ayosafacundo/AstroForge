import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Link } from "react-router-dom";
import { useState } from "react";

const categories = [
  "Figurines",
  "Mechanical",
  "Functional",
  "Cosplay",
  "Decor",
  "Robotics",
  "Tools",
  "Jewelry",
  "Art",
  "Other",
];

const ImportProject = () => {
  const [files, setFiles] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [uploadStep, setUploadStep] = useState(1);

  const addTag = () => {
    if (tagInput && !tags.includes(tagInput) && tags.length < 10) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleFileSimulate = () => {
    setFiles(["dragon_model.stl", "dragon_model.obj", "README.pdf"]);
  };

  const handleImageSimulate = () => {
    setImages([
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    ]);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/profile">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="font-technical text-2xl text-primary uppercase tracking-wider">
              Import Project
            </h1>
            <p className="text-sm text-muted-foreground">
              Upload your 3D model to share with the community
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[
            { num: 1, label: "Upload Files" },
            { num: 2, label: "Add Details" },
            { num: 3, label: "Set Pricing" },
            { num: 4, label: "Review" },
          ].map((step, idx) => (
            <div key={step.num} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-technical ${
                  uploadStep >= step.num
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground"
                }`}
              >
                {uploadStep > step.num ? <CheckCircle className="w-5 h-5" /> : step.num}
              </div>
              <span
                className={`ml-2 text-sm hidden sm:block ${
                  uploadStep >= step.num ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
              {idx < 3 && (
                <div
                  className={`w-8 sm:w-16 h-0.5 mx-2 ${
                    uploadStep > step.num ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Upload Files */}
        {uploadStep === 1 && (
          <div className="space-y-6">
            <div className="blueprint-card p-8">
              <h3 className="font-technical text-primary uppercase tracking-wider mb-6">
                Upload 3D Model Files
              </h3>

              {/* File Drop Zone */}
              <div
                onClick={handleFileSimulate}
                className="border-2 border-dashed border-primary/30 rounded-lg p-12 text-center cursor-pointer hover:border-primary/60 transition-colors"
              >
                <FileType className="w-16 h-16 text-primary/50 mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">Drag & drop your files here</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Supports STL, OBJ, 3MF, STEP, and more
                </p>
                <Button variant="blueprint">
                  <Upload className="w-4 h-4 mr-2" />
                  Browse Files
                </Button>
              </div>

              {/* Uploaded Files */}
              {files.length > 0 && (
                <div className="mt-6 space-y-2">
                  <h4 className="text-sm font-medium mb-3">Uploaded Files</h4>
                  {files.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <FileType className="w-5 h-5 text-primary" />
                        <span>{file}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setFiles(files.filter((_, i) => i !== idx))}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="blueprint-card p-8">
              <h3 className="font-technical text-primary uppercase tracking-wider mb-6">
                Upload Preview Images
              </h3>

              {/* Image Drop Zone */}
              <div
                onClick={handleImageSimulate}
                className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center cursor-pointer hover:border-primary/60 transition-colors"
              >
                <Image className="w-12 h-12 text-primary/50 mx-auto mb-4" />
                <p className="font-medium mb-2">Add preview images</p>
                <p className="text-sm text-muted-foreground">
                  PNG, JPG up to 5MB each (max 10 images)
                </p>
              </div>

              {/* Preview Images */}
              {images.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-4">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative w-24 h-24">
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover rounded-lg border border-border"
                      />
                      <button
                        onClick={() => setImages(images.filter((_, i) => i !== idx))}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <button className="w-24 h-24 border-2 border-dashed border-border rounded-lg flex items-center justify-center hover:border-primary/50 transition-colors">
                    <Plus className="w-6 h-6 text-muted-foreground" />
                  </button>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <Button
                variant="blueprint"
                size="lg"
                onClick={() => setUploadStep(2)}
                disabled={files.length === 0}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Add Details */}
        {uploadStep === 2 && (
          <div className="space-y-6">
            <div className="blueprint-card p-8 space-y-6">
              <h3 className="font-technical text-primary uppercase tracking-wider">
                Project Details
              </h3>

              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input id="title" placeholder="Enter a descriptive title" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your project, print settings, and tips..."
                  rows={5}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat.toLowerCase()}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>License</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select license" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="personal">Personal Use Only</SelectItem>
                      <SelectItem value="commercial">Commercial Allowed</SelectItem>
                      <SelectItem value="cc-by">Creative Commons BY</SelectItem>
                      <SelectItem value="cc-by-nc">Creative Commons BY-NC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label>Tags (up to 10)</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  />
                  <Button variant="outline" onClick={addTag}>
                    Add
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="gap-1">
                        #{tag}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag(tag)} />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="blueprint-card p-8 space-y-6">
              <h3 className="font-technical text-primary uppercase tracking-wider">
                Print Specifications
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Recommended Material</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select material" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pla">PLA</SelectItem>
                      <SelectItem value="petg">PETG</SelectItem>
                      <SelectItem value="abs">ABS</SelectItem>
                      <SelectItem value="tpu">TPU</SelectItem>
                      <SelectItem value="resin">Resin</SelectItem>
                      <SelectItem value="any">Any</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="printTime">Estimated Print Time</Label>
                  <Input id="printTime" placeholder="e.g., 8-12 hours" />
                </div>

                <div className="space-y-2">
                  <Label>Supports Required</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="heavy">Heavy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dimensions">Dimensions (mm)</Label>
                  <Input id="dimensions" placeholder="e.g., 200 x 80 x 60" />
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setUploadStep(1)}>
                Back
              </Button>
              <Button variant="blueprint" size="lg" onClick={() => setUploadStep(3)}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Set Pricing */}
        {uploadStep === 3 && (
          <div className="space-y-6">
            <div className="blueprint-card p-8 space-y-6">
              <h3 className="font-technical text-primary uppercase tracking-wider">
                Pricing
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                  className="p-6 border-2 border-primary rounded-lg cursor-pointer bg-primary/5"
                >
                  <div className="font-technical text-lg text-primary mb-2">FREE</div>
                  <p className="text-sm text-muted-foreground">
                    Share your design for free with the community
                  </p>
                </div>

                <div className="p-6 border-2 border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                  <div className="font-technical text-lg mb-2">PAID</div>
                  <p className="text-sm text-muted-foreground">
                    Set your own price and earn from downloads
                  </p>
                </div>

                <div className="p-6 border-2 border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                  <div className="font-technical text-lg mb-2">PAY WHAT YOU WANT</div>
                  <p className="text-sm text-muted-foreground">
                    Let buyers choose how much to pay
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-dashed border-border">
                <div className="flex items-start gap-3 p-4 bg-warning/10 border border-warning/30 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-warning">Pricing Tips</p>
                    <p className="text-muted-foreground mt-1">
                      Consider the complexity, uniqueness, and time invested in your design.
                      Similar designs in your category sell for $5-$30 on average.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setUploadStep(2)}>
                Back
              </Button>
              <Button variant="blueprint" size="lg" onClick={() => setUploadStep(4)}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {uploadStep === 4 && (
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
        )}
      </div>
    </Layout>
  );
};

export default ImportProject;
