
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Play, RotateCcw, Download } from "lucide-react";
import { toast } from "sonner";

interface CodeEditorProps {
  activeExercise: string | null;
}

export const CodeEditor = ({ activeExercise }: CodeEditorProps) => {
  const [code, setCode] = useState(`# Quantum Computing with Qiskit
from qiskit import QuantumCircuit, Aer, execute
from qiskit.visualization import plot_histogram
import matplotlib.pyplot as plt

# Create a quantum circuit with 2 qubits and 2 classical bits
qc = QuantumCircuit(2, 2)

# Add a Hadamard gate to qubit 0 (creates superposition)
qc.h(0)

# Add a CNOT gate with qubit 0 as control and qubit 1 as target
qc.cx(0, 1)

# Measure the qubits
qc.measure([0, 1], [0, 1])

# Print the circuit
print(qc)

# Run the circuit on a simulator
simulator = Aer.get_backend('qasm_simulator')
job = execute(qc, simulator, shots=1024)
result = job.result()
counts = result.get_counts(qc)

print("Measurement results:", counts)
`);

  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState("");

  const exercises = {
    "Create a Qubit in Superposition": {
      title: "Create a Qubit in Superposition",
      description: "Use the Hadamard gate to put a qubit in superposition state",
      template: `from qiskit import QuantumCircuit, Aer, execute

# Create a quantum circuit with 1 qubit and 1 classical bit
qc = QuantumCircuit(1, 1)

# TODO: Add a Hadamard gate to create superposition
# qc.h(0)

# Measure the qubit
qc.measure(0, 0)

# Run simulation
simulator = Aer.get_backend('qasm_simulator')
result = execute(qc, simulator, shots=1024).result()
counts = result.get_counts(qc)
print(counts)`,
      difficulty: "Beginner"
    },
    "Implement CNOT Gate": {
      title: "Implement CNOT Gate",
      description: "Create entanglement using the CNOT gate",
      template: `from qiskit import QuantumCircuit, Aer, execute

# Create a quantum circuit with 2 qubits and 2 classical bits
qc = QuantumCircuit(2, 2)

# Put first qubit in superposition
qc.h(0)

# TODO: Add CNOT gate with qubit 0 as control, qubit 1 as target
# qc.cx(0, 1)

# Measure both qubits
qc.measure([0, 1], [0, 1])

# Run simulation
simulator = Aer.get_backend('qasm_simulator')
result = execute(qc, simulator, shots=1024).result()
counts = result.get_counts(qc)
print(counts)`,
      difficulty: "Intermediate"
    }
  };

  const handleRun = async () => {
    setIsRunning(true);
    // Simulate code execution delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setOutput(`Circuit:
     ┌───┐     ┌─┐   
q_0: ┤ H ├──■──┤M├───
     └───┘┌─┴─┐└╥┘┌─┐
q_1: ─────┤ X ├─╫─┤M├
          └───┘ ║ └╥┘
c: 2/═══════════╩══╩═
                0  1

Measurement results: {'00': 512, '11': 512}

Analysis: Perfect Bell state created! The qubits are maximally entangled.`);
    
    setIsRunning(false);
    toast.success("Code executed successfully!");
  };

  const handleReset = () => {
    if (activeExercise && exercises[activeExercise as keyof typeof exercises]) {
      setCode(exercises[activeExercise as keyof typeof exercises].template);
      setOutput("");
      toast.info("Code reset to template");
    }
  };

  const currentExercise = activeExercise && exercises[activeExercise as keyof typeof exercises] 
    ? exercises[activeExercise as keyof typeof exercises]
    : null;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <span>Quantum Code Editor</span>
                {currentExercise && (
                  <Badge variant={currentExercise.difficulty === "Beginner" ? "secondary" : "default"}>
                    {currentExercise.difficulty}
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                {currentExercise ? currentExercise.description : "Write and execute quantum circuits using Qiskit"}
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleReset} disabled={!currentExercise}>
                <RotateCcw className="w-4 h-4 mr-1" />
                Reset
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="font-mono text-sm min-h-[300px] resize-none"
              placeholder="Write your quantum circuit code here..."
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Lines: {code.split('\n').length} | Characters: {code.length}
            </div>
            <Button 
              onClick={handleRun} 
              disabled={isRunning}
              className="flex items-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>{isRunning ? "Running..." : "Run Circuit"}</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {output && (
        <Card>
          <CardHeader>
            <CardTitle>Output</CardTitle>
            <CardDescription>Simulation results and circuit visualization</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-50 p-4 rounded-lg text-sm font-mono whitespace-pre-wrap overflow-x-auto">
              {output}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
