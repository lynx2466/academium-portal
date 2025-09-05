import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
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

  // Attendance prototype state
  const { toast } = useToast();
  const [attendance, setAttendance] = useState<{ id: string; name: string; time: string; status: "Present" | "Absent" }[]>([]);
  const [scanId, setScanId] = useState("");
  const [zapierUrl, setZapierUrl] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);

  const getNameFromId = (id: string) => `Student ${id.slice(-3).padStart(3, "0")}`;

  const handleScan = () => {
    if (!scanId.trim()) {
      toast({
        title: "Scan required",
        description: "Enter or scan an RFID/card ID.",
        variant: "destructive",
      });
      return;
    }
    const id = scanId.trim();
    setAttendance((prev) => {
      const exists = prev.find((r) => r.id === id);
      const time = new Date().toLocaleTimeString();
      if (exists) {
        return prev.map((r) => (r.id === id ? { ...r, time, status: "Present" } : r));
      }
      return [{ id, name: getNameFromId(id), time, status: "Present" }, ...prev];
    });
    setScanId("");
    toast({
      title: "Scan recorded",
      description: `Marked ${getNameFromId(id)} present.`,
    });
  };

  const toggleStatus = (id: string) => {
    setAttendance((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: r.status === "Present" ? "Absent" : "Present" } : r))
    );
  };

  const clearAttendance = () => setAttendance([]);

  const exportCSV = () => {
    const header = ["Class", "Student ID", "Name", "Time", "Status"];
    const grade = selectedClass ?? "";
    const rows = attendance.map((r) => [grade, r.id, r.name, r.time, r.status]);
    const csv = [header, ...rows]
      .map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `attendance_grade_${grade}_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const syncToZapier = async () => {
    if (!zapierUrl) {
      toast({
        title: "Webhook required",
        description: "Enter your Zapier webhook URL.",
        variant: "destructive",
      });
      return;
    }
    if (attendance.length === 0) {
      toast({
        title: "No records",
        description: "Scan at least one ID before syncing.",
      });
      return;
    }
    try {
      setIsSyncing(true);
      await fetch(zapierUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "no-cors",
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          class_grade: selectedClass,
          records: attendance,
          source: window.location.origin,
        }),
      });
      toast({
        title: "Request sent",
        description: "Check your Zap's history to confirm Google Sheets received the data.",
      });
    } catch (error) {
      console.error("Error triggering webhook:", error);
      toast({
        title: "Error",
        description: "Failed to trigger the Zapier webhook. Please check the URL and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

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

            <section aria-labelledby="attendance-heading" className="space-y-4">
              <h4 id="attendance-heading" className="font-semibold">RFID Attendance (Prototype)</h4>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="zapierUrl">Zapier Webhook URL (for Google Sheets)</Label>
                  <Input
                    id="zapierUrl"
                    placeholder="https://hooks.zapier.com/hooks/catch/..."
                    value={zapierUrl}
                    onChange={(e) => setZapierUrl(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Optional: add your webhook to send attendance to Google Sheets.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scanId">Simulate RFID/Card ID</Label>
                  <div className="flex gap-2">
                    <Input
                      id="scanId"
                      placeholder="e.g. 1234567890"
                      value={scanId}
                      onChange={(e) => setScanId(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleScan()
                      }}
                    />
                    <Button type="button" className="gradient-primary text-white" onClick={handleScan}>Scan</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Type or scan a card ID and press Enter.</p>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendance.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground">No scans yet.</TableCell>
                      </TableRow>
                    ) : (
                      attendance.map((r) => (
                        <TableRow key={r.id}>
                          <TableCell>{r.id}</TableCell>
                          <TableCell>{r.name}</TableCell>
                          <TableCell>{r.time}</TableCell>
                          <TableCell>
                            <Badge variant={r.status === "Present" ? "default" : "secondary"}>{r.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" onClick={() => toggleStatus(r.id)}>Toggle</Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button type="button" className="gradient-primary text-white" onClick={syncToZapier} disabled={isSyncing}>
                  {isSyncing ? "Syncing..." : "Sync to Google Sheets"}
                </Button>
                <Button type="button" variant="outline" onClick={exportCSV}>Export CSV</Button>
                <Button type="button" variant="outline" onClick={clearAttendance}>Clear</Button>
              </div>
            </section>

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