import { useState } from "react";
import { Header } from "@/components/Header";
import { UploadZone } from "@/components/UploadZone";
import { PassportCard } from "@/components/PassportCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Database, Shield } from "lucide-react";
import farmBgPattern from "@/assets/farm-bg-pattern.jpg";
import heroFarm from "@/assets/hero-farm.jpg";

const mockPassportData = {
  muzzleId: "MUZ-ABC123XYZ",
  animalType: "cow" as const,
  photo: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&q=80",
  owner: "John Smith Farms",
  location: "Green Valley, Montana",
  birthDate: "March 15, 2022",
  vaccinations: [
    { name: "FMD Vaccine", date: "Jan 10, 2024", nextDue: "Jul 10, 2024" },
    { name: "Brucellosis", date: "Dec 5, 2023", nextDue: "Dec 5, 2024" },
    { name: "Anthrax", date: "Nov 20, 2023" },
  ],
  healthRecords: [
    "Regular checkup - February 2024: Excellent condition",
    "Treated for minor infection - January 2024: Fully recovered",
    "Birth record - March 2022: Healthy calf, 35kg",
  ],
  transactionHash: "5KJp4w8XvPz...9mNqR2sT",
};

const Index = () => {
  const [searchId, setSearchId] = useState("");
  const [currentPassport, setCurrentPassport] = useState(mockPassportData);
  const [showPassport, setShowPassport] = useState(false);

  const handleUploadComplete = (file: File, muzzleId: string) => {
    // Create preview URL for the uploaded file
    const photoUrl = URL.createObjectURL(file);
    
    setCurrentPassport({
      ...mockPassportData,
      muzzleId,
      photo: photoUrl,
    });
    setShowPassport(true);
  };

  const handleSearch = () => {
    if (searchId.trim()) {
      setShowPassport(true);
    }
  };

  return (
    <div 
      className="min-h-screen bg-background bg-cover bg-fixed bg-center"
      style={{ 
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.95)), url(${farmBgPattern})`,
      }}
    >
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative text-white py-16 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.85), rgba(29, 78, 216, 0.85)), url(${heroFarm})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
              Livestock Digital Passport System
            </h1>
            <p className="text-lg md:text-xl opacity-95 drop-shadow">
              Secure, blockchain-verified identification for cattle using advanced muzzle recognition technology
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4 drop-shadow-md">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-medium">Blockchain Verified</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                <Database className="w-5 h-5" />
                <span className="text-sm font-medium">Solana Network</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <Tabs defaultValue="create" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="create" className="gap-2">
              <Plus className="w-4 h-4" />
              Create Passport
            </TabsTrigger>
            <TabsTrigger value="search" className="gap-2">
              <Search className="w-4 h-4" />
              Search Passport
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Create New Digital Passport</CardTitle>
                <CardDescription>
                  Upload a clear photo of the animal's muzzle for identification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UploadZone onUploadComplete={handleUploadComplete} />
              </CardContent>
            </Card>

            {showPassport && (
              <div className="animate-fade-in">
                <PassportCard data={currentPassport} />
              </div>
            )}
          </TabsContent>

          <TabsContent value="search" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Search Existing Passport</CardTitle>
                <CardDescription>
                  Enter the Muzzle ID or transaction hash to retrieve passport
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter Muzzle ID (e.g., MUZ-ABC123XYZ)"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                  <Button onClick={handleSearch} className="gap-2">
                    <Search className="w-4 h-4" />
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>

            {showPassport && (
              <div className="animate-fade-in">
                <PassportCard data={currentPassport} />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>Powered by Solana Blockchain • Muzzle Recognition AI</p>
            <p className="mt-2">© 2024 LivestockID. Secure digital identification for livestock.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
