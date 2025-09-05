import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, Clock, BookOpen } from "lucide-react";

const classData = [
  { grade: 1, subjects: ["English", "Math", "Science"], students: 25, color: "from-red-400 to-red-600" },
  { grade: 2, subjects: ["English", "Math", "Science"], students: 28, color: "from-orange-400 to-orange-600" },
  { grade: 3, subjects: ["English", "Math", "Science", "Social Studies"], students: 30, color: "from-amber-400 to-amber-600" },
  { grade: 4, subjects: ["English", "Math", "Science", "Social Studies"], students: 27, color: "from-yellow-400 to-yellow-600" },
  { grade: 5, subjects: ["English", "Math", "Science", "Social Studies"], students: 32, color: "from-lime-400 to-lime-600" },
  { grade: 6, subjects: ["English", "Math", "Science", "Social Studies", "Art"], students: 29, color: "from-green-400 to-green-600" },
  { grade: 7, subjects: ["English", "Math", "Science", "History", "Geography"], students: 31, color: "from-emerald-400 to-emerald-600" },
  { grade: 8, subjects: ["English", "Math", "Science", "History", "Geography"], students: 26, color: "from-teal-400 to-teal-600" },
  { grade: 9, subjects: ["English", "Math", "Physics", "Chemistry", "Biology"], students: 33, color: "from-cyan-400 to-cyan-600" },
  { grade: 10, subjects: ["English", "Math", "Physics", "Chemistry", "Biology"], students: 28, color: "from-sky-400 to-sky-600" },
  { grade: 11, subjects: ["English", "Math", "Physics", "Chemistry", "Biology"], students: 24, color: "from-blue-400 to-blue-600" },
  { grade: 12, subjects: ["English", "Math", "Physics", "Chemistry", "Biology"], students: 22, color: "from-indigo-400 to-indigo-600" },
];

export function Classes() {
  const [selectedClass, setSelectedClass] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Classes
          </h1>
          <p className="text-muted-foreground mt-2">
            Select a class to view details and manage content
          </p>
        </div>
        
        <Button className="gradient-primary hover:shadow-hover transition-bounce text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Mode
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {classData.map((classItem) => (
          <div
            key={classItem.grade}
            className={`class-icon group ${selectedClass === classItem.grade ? 'ring-2 ring-primary shadow-glow' : ''}`}
            onClick={() => setSelectedClass(classItem.grade)}
          >
            <div className={`w-full h-32 rounded-lg bg-gradient-to-br ${classItem.color} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300`}>
              <span className="text-3xl font-bold text-white">
                {classItem.grade}
              </span>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-sm mb-1">Grade {classItem.grade}</h3>
              <div className="flex items-center justify-center space-x-1 text-xs text-muted-foreground">
                <Users className="w-3 h-3" />
                <span>{classItem.students}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedClass && (
        <Card className="shadow-card border-0 gradient-card animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span>Grade {selectedClass} Details</span>
            </CardTitle>
            <CardDescription>
              Class information and subject overview
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/10">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary">
                  {classData.find(c => c.grade === selectedClass)?.students}
                </div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200">
                <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">
                  {classData.find(c => c.grade === selectedClass)?.subjects.length}
                </div>
                <div className="text-sm text-muted-foreground">Subjects</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-blue-50 border border-blue-200">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">6</div>
                <div className="text-sm text-muted-foreground">Hours/Day</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Subjects</h4>
              <div className="flex flex-wrap gap-2">
                {classData.find(c => c.grade === selectedClass)?.subjects.map((subject, index) => (
                  <Badge key={index} variant="secondary" className="gradient-primary text-primary-foreground">
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <Button className="gradient-primary hover:shadow-hover transition-bounce text-white">
                View Timetable
              </Button>
              <Button variant="outline" className="hover:bg-secondary">
                Manage Students
              </Button>
              <Button variant="outline" className="hover:bg-secondary">
                Add Assignment
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}