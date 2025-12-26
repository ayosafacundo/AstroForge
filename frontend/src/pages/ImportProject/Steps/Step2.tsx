import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export default function Step2({categories, tagInput, setTagInput, addTag, removeTag, tags, setUploadStep}) {
  return (
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
  </div>)
}