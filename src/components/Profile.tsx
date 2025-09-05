import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, School, BookOpen } from "lucide-react";

interface UserData {
  studentId: string;
  schoolName: string;
  name: string;
  email: string;
  grade: string;
  section: string;
}

export function Profile() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  if (!userData) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          Profile
        </h1>
        <p className="text-muted-foreground mt-2">
          View and manage your student profile information
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-card border-0 gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5 text-primary" />
              <span>Personal Information</span>
            </CardTitle>
            <CardDescription>
              Your basic profile details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Full Name</label>
              <p className="text-lg font-semibold">{userData.name}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Student ID</label>
              <p className="font-mono text-primary">{userData.studentId}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Email Address</label>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <p>{userData.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0 gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <School className="w-5 h-5 text-primary" />
              <span>Academic Information</span>
            </CardTitle>
            <CardDescription>
              Your educational institution details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Institution</label>
              <p className="text-lg font-semibold">{userData.schoolName}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Grade & Section</label>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="gradient-primary text-primary-foreground">
                  {userData.grade}
                </Badge>
                <span className="text-sm text-muted-foreground">Section {userData.section}</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-green-600" />
                <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">
                  Active Student
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card border-0 gradient-card">
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
          <CardDescription>
            Your academic overview at a glance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/10">
              <div className="text-2xl font-bold text-primary">12</div>
              <div className="text-sm text-muted-foreground">Total Subjects</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200">
              <div className="text-2xl font-bold text-green-600">8.5</div>
              <div className="text-sm text-muted-foreground">GPA</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">95%</div>
              <div className="text-sm text-muted-foreground">Attendance</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-purple-50 border border-purple-200">
              <div className="text-2xl font-bold text-purple-600">24</div>
              <div className="text-sm text-muted-foreground">Assignments</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}