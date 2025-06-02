
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Code, Layers } from "lucide-react";

interface QuantumDashboardProps {
  onLessonSelect: (lesson: string) => void;
  onExerciseSelect: (exercise: string) => void;
}

export const QuantumDashboard = ({ onLessonSelect, onExerciseSelect }: QuantumDashboardProps) => {
  const lessonProgress = [
    { title: "Quantum Basics", progress: 100, completed: true },
    { title: "Qubits & Superposition", progress: 75, completed: false },
    { title: "Quantum Gates", progress: 50, completed: false },
    { title: "Entanglement", progress: 0, completed: false },
    { title: "Grover's Algorithm", progress: 0, completed: false },
    { title: "Shor's Algorithm", progress: 0, completed: false },
  ];

  const recentExercises = [
    { title: "Create a Qubit in Superposition", type: "Coding", status: "Completed" },
    { title: "Implement CNOT Gate", type: "Coding", status: "In Progress" },
    { title: "Bell State Preparation", type: "Circuit", status: "Not Started" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-2xl">Learning Progress</CardTitle>
            <CardDescription>
              Track your journey through quantum computing concepts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lessonProgress.map((lesson, index) => (
                <div key={lesson.title} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{lesson.title}</span>
                    <span className="text-sm text-gray-500">{lesson.progress}%</span>
                  </div>
                  <Progress value={lesson.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">6</div>
              <div className="text-sm text-gray-600">Lessons Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">2</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">42%</div>
              <div className="text-sm text-gray-600">Overall Progress</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" 
              onClick={() => onLessonSelect("Qubits & Superposition")}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Continue Learning</h3>
                <p className="text-sm text-gray-600">Qubits & Superposition</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onExerciseSelect("CNOT Gate")}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">Code Exercise</h3>
                <p className="text-sm text-gray-600">Implement CNOT Gate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Layers className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Circuit Simulator</h3>
                <p className="text-sm text-gray-600">Build & Test Circuits</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Exercises</CardTitle>
          <CardDescription>
            Your latest coding and circuit exercises
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentExercises.map((exercise, index) => (
              <div key={exercise.title} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    exercise.status === 'Completed' ? 'bg-green-500' :
                    exercise.status === 'In Progress' ? 'bg-yellow-500' : 'bg-gray-300'
                  }`} />
                  <div>
                    <div className="font-medium">{exercise.title}</div>
                    <div className="text-sm text-gray-600">{exercise.type}</div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => exercise.type === 'Coding' ? onExerciseSelect(exercise.title) : null}
                >
                  {exercise.status === 'Not Started' ? 'Start' : 'Continue'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
