import { Button } from "@/components/ui/button";
import {
  Upload,
  FileType,
  Image,
  X,
  Plus,
} from "lucide-react";


export default function Step1({handleFileSimulate, handleImageSimulate, setFiles, setImages, setUploadStep, files, images}) {
    return (
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
        </div>)
}