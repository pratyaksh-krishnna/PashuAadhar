import { useState, useCallback } from "react";
import { Upload, Image as ImageIcon, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  onUploadComplete: (file: File, muzzleId: string) => void;
}

// Configure your backend URL here
const API_URL = "http://localhost:8080";

export const UploadZone = ({ onUploadComplete }: UploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files?.[0]) {
      processFile(files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.[0]) {
      processFile(files[0]);
    }
  };

  const processFile = (selectedFile: File) => {
    setError(null);
    
    // Validate file
    if (!selectedFile.type.startsWith("image/")) {
      setError("Please upload an image file (JPG, PNG, WEBP)");
      return;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return;
    }

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setUploading(true);
    setProgress(0);
    setError(null);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          return prev;
        }
        return prev + 10;
      });
    }, 300);

    try {
      // Prepare form data - use "image" as field name to match backend
      const formData = new FormData();
      formData.append("image", file);

      // Send to backend
      const response = await fetch(`${API_URL}/muzzle-detect`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Server error: ${response.status}`);
      }

      const data = await response.json();
      
      // Complete progress
      setProgress(100);
      clearInterval(progressInterval);

      // Expecting backend response like:
      // { success: true, muzzleId: "MUZ-123XYZ", confidence: 0.97 }
      if (data.success && data.muzzleId) {
        // Wait a moment to show 100% before completing
        setTimeout(() => {
          onUploadComplete(file, data.muzzleId);
        }, 500);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      clearInterval(progressInterval);
      console.error("Analysis error:", err);
      setError(
        err instanceof Error 
          ? err.message 
          : "Failed to analyze muzzle pattern. Please try again."
      );
      setProgress(0);
    } finally {
      clearInterval(progressInterval);
      setUploading(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setPreview(null);
    setProgress(0);
    setError(null);
  };

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-xl p-8 transition-all",
          isDragging
            ? "border-primary bg-primary/5 scale-105"
            : "border-border hover:border-primary/50",
          preview && "bg-muted/20"
        )}
      >
        {!preview ? (
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground mb-1">
                Upload Animal Photo
              </p>
              <p className="text-sm text-muted-foreground">
                Drag and drop or click to browse
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                JPG, PNG or WEBP (max. 10MB)
              </p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button variant="outline" asChild>
                <span className="cursor-pointer gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Browse Files
                </span>
              </Button>
            </label>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative rounded-lg overflow-hidden bg-muted">
              <img
                src={preview}
                alt="Animal preview"
                className="w-full h-64 object-contain"
              />
            </div>
            
            {uploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Analyzing muzzle pattern...
                  </span>
                  <span className="font-semibold text-foreground">
                    {progress}%
                  </span>
                </div>
                <Progress value={progress} />
              </div>
            )}
            
            {!uploading && (
              <div className="flex gap-2">
                <Button 
                  onClick={handleAnalyze} 
                  className="flex-1"
                  disabled={uploading}
                >
                  Analyze Muzzle Pattern
                </Button>
                <Button
                  variant="outline"
                  onClick={handleClear}
                  disabled={uploading}
                >
                  Clear
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};