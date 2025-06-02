import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

interface LessonViewerProps {
  activeLesson: string | null;
}

export const LessonViewer = ({ activeLesson }: LessonViewerProps) => {
  const lessonContent = {
    "Quantum Basics": {
      title: "Introduction to Quantum Computing",
      description: "Learn the fundamental concepts that make quantum computing possible",
      content: `
        <h3>What is Quantum Computing?</h3>
        <p>Quantum computing harnesses the strange properties of quantum mechanics to process information in ways that classical computers cannot. While classical computers use bits that are either 0 or 1, quantum computers use quantum bits or "qubits" that can exist in multiple states simultaneously.</p>
        
        <h3>Key Concepts:</h3>
        <ul>
          <li><strong>Superposition:</strong> A qubit can be in a combination of both 0 and 1 states at the same time</li>
          <li><strong>Entanglement:</strong> Qubits can be correlated in ways that classical physics cannot explain</li>
          <li><strong>Measurement:</strong> Observing a quantum system forces it to "choose" a definite state</li>
        </ul>
        
        <h3>Why Quantum Computing Matters</h3>
        <p>Quantum computers could potentially solve certain problems exponentially faster than classical computers, with applications in cryptography, drug discovery, financial modeling, and optimization problems.</p>
      `,
      progress: 100
    },
    "Qubits & Superposition": {
      title: "Understanding Qubits and Superposition",
      description: "Explore how qubits differ from classical bits and the power of superposition",
      content: `
        <h3>What is a Qubit?</h3>
        <p>A qubit (quantum bit) is the basic unit of quantum information. Unlike a classical bit that must be either 0 or 1, a qubit can exist in a "superposition" of both states simultaneously.</p>
        
        <h3>The Bloch Sphere</h3>
        <p>We can visualize a qubit's state using the Bloch sphere - a unit sphere where every point represents a possible qubit state. The north pole represents |0⟩, the south pole represents |1⟩, and every other point represents a superposition.</p>
        
        <h3>Mathematical Representation</h3>
        <p>A qubit state can be written as: |ψ⟩ = α|0⟩ + β|1⟩</p>
        <p>Where α and β are complex numbers called amplitudes, and |α|² + |β|² = 1</p>
        
        <h3>Coin Flip Analogy</h3>
        <p>Think of a spinning coin - while it's spinning, it's neither heads nor tails, but both simultaneously. Only when it lands (measurement) does it "choose" a definite state.</p>
      `,
      progress: 75
    },
    "Quantum Gates": {
      title: "Quantum Gates and Operations",
      description: "Learn how quantum gates manipulate qubit states to perform computations",
      content: `
        <h3>What are Quantum Gates?</h3>
        <p>Quantum gates are the building blocks of quantum circuits. They are reversible operations that transform qubit states in specific ways.</p>
        
        <h3>Common Single-Qubit Gates:</h3>
        <ul>
          <li><strong>X Gate (NOT):</strong> Flips |0⟩ to |1⟩ and vice versa</li>
          <li><strong>H Gate (Hadamard):</strong> Creates superposition - turns |0⟩ into (|0⟩ + |1⟩)/√2</li>
          <li><strong>Z Gate:</strong> Applies a phase flip to |1⟩ state</li>
          <li><strong>Y Gate:</strong> Combination of X and Z gates</li>
        </ul>
        
        <h3>Two-Qubit Gates:</h3>
        <ul>
          <li><strong>CNOT Gate:</strong> Flips the target qubit if the control qubit is |1⟩</li>
          <li><strong>CZ Gate:</strong> Applies a phase flip to the target if control is |1⟩</li>
        </ul>
        
        <h3>Circuit Representation</h3>
        <p>Quantum circuits are read from left to right, with each line representing a qubit and boxes representing gates.</p>
      `,
      progress: 50
    }
  };

  if (!activeLesson || !lessonContent[activeLesson as keyof typeof lessonContent]) {
    return (
      <Card className="h-full">
        <CardContent className="p-8">
          <div className="text-center text-gray-500">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">Select a Lesson</h3>
            <p>Choose a topic from the sidebar to begin learning about quantum computing.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const lesson = lessonContent[activeLesson as keyof typeof lessonContent];

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{lesson.title}</CardTitle>
            <CardDescription>{lesson.description}</CardDescription>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 mb-1">Progress</div>
            <div className="text-2xl font-bold text-blue-600">{lesson.progress}%</div>
          </div>
        </div>
        <Progress value={lesson.progress} className="h-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: lesson.content }}
        />
        
        <div className="border-t pt-6">
          <div className="flex justify-between items-center">
            <Button variant="outline" className="flex items-center space-x-2">
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>
            <div className="text-sm text-gray-500">
              Lesson {Object.keys(lessonContent).indexOf(activeLesson) + 1} of {Object.keys(lessonContent).length}
            </div>
            <Button className="flex items-center space-x-2">
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
