import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Upload, Search, Filter, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";

const documents = [
  {
    id: 1,
    name: "Mathematics Assignment - Chapter 5",
    type: "Assignment",
    size: "2.4 MB",
    date: "2024-01-15",
    subject: "Mathematics",
    grade: "10",
    status: "Active"
  },
  {
    id: 2,
    name: "Science Lab Report Template",
    type: "Template",
    size: "1.2 MB",
    date: "2024-01-12",
    subject: "Science",
    grade: "9",
    status: "Active"
  },
  {
    id: 3,
    name: "English Literature Notes",
    type: "Notes",
    size: "3.1 MB",
    date: "2024-01-10",
    subject: "English",
    grade: "11",
    status: "Draft"
  },
  {
    id: 4,
    name: "History Project Guidelines",
    type: "Guidelines",
    size: "0.8 MB",
    date: "2024-01-08",
    subject: "History",
    grade: "12",
    status: "Active"
  },
  {
    id: 5,
    name: "Chemistry Exam Paper",
    type: "Exam",
    size: "1.6 MB",
    date: "2024-01-05",
    subject: "Chemistry",
    grade: "11",
    status: "Active"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-50 text-green-700 border-green-200";
    case "Draft":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "Assignment":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "Exam":
      return "bg-red-50 text-red-700 border-red-200";
    case "Notes":
      return "bg-purple-50 text-purple-700 border-purple-200";
    case "Template":
      return "bg-green-50 text-green-700 border-green-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

export function Documents() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Documents
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage and organize your educational documents
          </p>
        </div>
        
        <Button className="gradient-primary hover:shadow-hover transition-bounce text-white">
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <Card className="shadow-card border-0 gradient-card">
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
          <CardDescription>
            Find specific documents quickly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                className="pl-10 transition-smooth focus:shadow-glow"
              />
            </div>
            <Button variant="outline" className="hover:bg-secondary">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {documents.map((doc) => (
          <Card key={doc.id} className="shadow-card border-0 gradient-card hover:shadow-hover transition-smooth">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary-foreground" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg truncate">{doc.name}</h3>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{doc.date}</span>
                      </div>
                      <span>•</span>
                      <span>{doc.size}</span>
                      <span>•</span>
                      <span>Grade {doc.grade}</span>
                      <span>•</span>
                      <span>{doc.subject}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-3">
                      <Badge variant="outline" className={getTypeColor(doc.type)}>
                        {doc.type}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(doc.status)}>
                        {doc.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="hover:bg-secondary">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm" className="hover:bg-secondary">
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-card border-0 gradient-card">
        <CardHeader>
          <CardTitle>Document Statistics</CardTitle>
          <CardDescription>
            Overview of your document library
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/10">
              <div className="text-2xl font-bold text-primary">{documents.length}</div>
              <div className="text-sm text-muted-foreground">Total Documents</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">
                {documents.filter(d => d.type === "Assignment").length}
              </div>
              <div className="text-sm text-muted-foreground">Assignments</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200">
              <div className="text-2xl font-bold text-green-600">
                {documents.filter(d => d.status === "Active").length}
              </div>
              <div className="text-sm text-muted-foreground">Active</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-purple-50 border border-purple-200">
              <div className="text-2xl font-bold text-purple-600">8.2</div>
              <div className="text-sm text-muted-foreground">MB Total Size</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}