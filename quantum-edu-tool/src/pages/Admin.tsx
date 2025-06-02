import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Save, Users, BookOpen, BarChart3 } from "lucide-react";
import { Navigation } from "@/components/Navigation";

export default function Admin() {
  const [lessons, setLessons] = useState([
    { id: 1, title: "Quantum Basics", description: "Introduction to Quantum Computing", progress: 100, students: 45 },
    { id: 2, title: "Qubits & Superposition", description: "Understanding Qubits and Superposition", progress: 75, students: 32 },
    { id: 3, title: "Quantum Gates", description: "Quantum Gates and Operations", progress: 50, students: 28 }
  ]);

  const [newLesson, setNewLesson] = useState({
    title: "",
    description: "",
    content: ""
  });

  const [editingLesson, setEditingLesson] = useState<number | null>(null);

  const handleAddLesson = () => {
    if (newLesson.title && newLesson.description) {
      const lesson = {
        id: lessons.length + 1,
        title: newLesson.title,
        description: newLesson.description,
        progress: 0,
        students: 0
      };
      setLessons([...lessons, lesson]);
      setNewLesson({ title: "", description: "", content: "" });
    }
  };

  const handleDeleteLesson = (id: number) => {
    setLessons(lessons.filter(lesson => lesson.id !== id));
  };

  return (
    <div className="relative min-h-screen bg-gray-50 p-6">
      <Navigation />
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your quantum computing educational platform</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Lessons</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lessons.length}</div>
              <p className="text-xs text-muted-foreground">Active learning modules</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {lessons.reduce((sum, lesson) => sum + lesson.students, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Enrolled across all modules</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Completion</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(lessons.reduce((sum, lesson) => sum + lesson.progress, 0) / lessons.length)}%
              </div>
              <p className="text-xs text-muted-foreground">Average progress rate</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="lessons" className="space-y-6">
          <TabsList>
            <TabsTrigger value="lessons">Lesson Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="lessons" className="space-y-6">
            {/* Add New Lesson */}
            <Card>
              <CardHeader>
                <CardTitle>Add New Lesson</CardTitle>
                <CardDescription>Create a new quantum computing lesson module</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Lesson Title</label>
                    <Input
                      placeholder="Enter lesson title"
                      value={newLesson.title}
                      onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Description</label>
                    <Input
                      placeholder="Brief description"
                      value={newLesson.description}
                      onChange={(e) => setNewLesson({ ...newLesson, description: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Lesson Content</label>
                  <Textarea
                    placeholder="Enter lesson content (HTML supported)"
                    rows={6}
                    value={newLesson.content}
                    onChange={(e) => setNewLesson({ ...newLesson, content: e.target.value })}
                  />
                </div>
                <Button onClick={handleAddLesson} className="w-full md:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Lesson
                </Button>
              </CardContent>
            </Card>

            {/* Existing Lessons */}
            <Card>
              <CardHeader>
                <CardTitle>Existing Lessons</CardTitle>
                <CardDescription>Manage and edit your quantum computing lessons</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lessons.map((lesson) => (
                      <TableRow key={lesson.id}>
                        <TableCell className="font-medium">{lesson.title}</TableCell>
                        <TableCell>{lesson.description}</TableCell>
                        <TableCell>{lesson.students}</TableCell>
                        <TableCell>
                          <Badge variant={lesson.progress === 100 ? "default" : "secondary"}>
                            {lesson.progress}%
                          </Badge>
                        </TableCell>
                        <TableCell className="space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setEditingLesson(lesson.id)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleDeleteLesson(lesson.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Analytics</CardTitle>
                <CardDescription>Track student progress and engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">Analytics Dashboard</h3>
                  <p className="text-gray-500">Detailed analytics and reporting features coming soon.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>Configure your quantum computing platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Platform Name</label>
                    <Input defaultValue="Quantum Learn Explorer" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Welcome Message</label>
                    <Textarea 
                      defaultValue="Welcome to the Quantum Computing Educational Platform"
                      rows={3}
                    />
                  </div>
                  <Button>
                    <Save className="w-4 h-4 mr-2" />
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
