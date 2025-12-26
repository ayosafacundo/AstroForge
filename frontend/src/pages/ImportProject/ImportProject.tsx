import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
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
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import Step4 from "./Steps/Step4";

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

  const getStep = (uploadStep) => {
    switch (uploadStep){
      case 1:
        return <Step1 handleFileSimulate={handleFileSimulate} handleImageSimulate={handleImageSimulate} setFiles={setFiles} setImages={setImages} setUploadStep={setUploadStep} files={files} images={images} />
      case 2:
        return <Step2 categories={categories} tagInput={tagInput} setTagInput={setTagInput} addTag={addTag} removeTag={removeTag} tags={tags} setUploadStep={setUploadStep}/>
      case 3:
        return <Step3 setUploadStep={setUploadStep}/>
      case 4: 
        return <Step4 images={images} files={files} setUploadStep={setUploadStep} />
      default:
        setUploadStep(1);
    }
  }

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
        {/* Steps */}
        {getStep(uploadStep)}
      </div>
    </Layout>
  );
};

export default ImportProject;
