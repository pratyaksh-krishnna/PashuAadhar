import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, Shield, Syringe, FileText, ExternalLink, User, Phone, Mail, Building2 } from "lucide-react";

interface Vaccination {
  name: string;
  date: string;
  nextDue?: string;
}

interface OwnerDetails {
  name: string;
  farmName: string;
  phone: string;
  email: string;
  address: string;
  registrationNumber: string;
}

interface PassportData {
  muzzleId: string;
  animalType: "cow" | "buffalo";
  photo: string;
  owner: OwnerDetails;
  location: string;
  birthDate: string;
  vaccinations: Vaccination[];
  healthRecords: string[];
  transactionHash?: string;
}

interface PassportCardProps {
  data: PassportData;
}

export const PassportCard = ({ data }: PassportCardProps) => {
  return (
    <Card className="overflow-hidden border-2 shadow-elegant animate-fade-in">
      <div className="h-2 bg-hero-gradient" />
      <CardHeader className="bg-card-gradient">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold">Digital Passport</CardTitle>
            <p className="text-sm text-muted-foreground">Verified on Solana Blockchain</p>
          </div>
          <Badge variant="default" className="gap-1">
            <Shield className="w-3 h-3" />
            Verified
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Photo and Basic Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted border-2 border-border">
              <img
                src={data.photo}
                alt="Animal"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Unique Muzzle ID</p>
              <p className="font-mono font-bold text-primary">{data.muzzleId}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-3">Animal Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-2xl">{data.animalType === "cow" ? "🐄" : "🐃"}</span>
                  <span className="capitalize font-medium">{data.animalType}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div className="text-sm">
                    <p className="text-muted-foreground">Birth Date</p>
                    <p className="font-medium">{data.birthDate}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div className="text-sm">
                    <p className="text-muted-foreground">Location</p>
                    <p className="font-medium">{data.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {data.transactionHash && (
              <div className="p-3 bg-secondary/10 rounded-lg border border-secondary/20">
                <p className="text-xs text-muted-foreground mb-1">Blockchain Tx</p>
                <div className="flex items-center justify-between gap-2">
                  <p className="font-mono text-xs truncate">{data.transactionHash}</p>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Farmer/Owner Details */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <User className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-lg">Farmer Details</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-lg space-y-3">
              <div className="flex items-start gap-2">
                <User className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div className="text-sm">
                  <p className="text-muted-foreground">Owner Name</p>
                  <p className="font-medium">{data.owner.name}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Building2 className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div className="text-sm">
                  <p className="text-muted-foreground">Farm Name</p>
                  <p className="font-medium">{data.owner.farmName}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div className="text-sm">
                  <p className="text-muted-foreground">Registration No.</p>
                  <p className="font-mono text-xs">{data.owner.registrationNumber}</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-muted rounded-lg space-y-3">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div className="text-sm">
                  <p className="text-muted-foreground">Phone</p>
                  <p className="font-medium">{data.owner.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div className="text-sm">
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-medium text-xs break-all">{data.owner.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div className="text-sm">
                  <p className="text-muted-foreground">Address</p>
                  <p className="font-medium text-xs">{data.owner.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Vaccinations */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Syringe className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-lg">Vaccination Records</h3>
          </div>
          <div className="space-y-2">
            {data.vaccinations.map((vac, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <div>
                  <p className="font-medium text-sm">{vac.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Administered: {vac.date}
                  </p>
                </div>
                {vac.nextDue && (
                  <Badge variant="outline" className="text-xs">
                    Due: {vac.nextDue}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Health Records */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-lg">Health History</h3>
          </div>
          <div className="space-y-2">
            {data.healthRecords.map((record, idx) => (
              <div key={idx} className="p-3 bg-muted rounded-lg">
                <p className="text-sm">{record}</p>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="w-full">
            Update Records
          </Button>
          <Button variant="outline" className="w-full">
            Transfer Ownership
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
