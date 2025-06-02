import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, RotateCcw } from "lucide-react";

export const CircuitVisualizer = () => {
  const gateTypes = [
    { name: "H", label: "Hadamard", color: "bg-blue-500", description: "Creates superposition" },
    { name: "X", label: "Pauli-X", color: "bg-red-500", description: "Bit flip gate" },
    { name: "Z", label: "Pauli-Z", color: "bg-green-500", description: "Phase flip gate" },
    { name: "⊕", label: "CNOT", color: "bg-purple-500", description: "Controlled NOT" },
  ];

  const measurementResults = {
    "00": 0.25,
    "01": 0.25,
    "10": 0.25,
    "11": 0.25
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>Circuit Visualization</span>
          </CardTitle>
          <CardDescription>
            Visual representation of your quantum circuit
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Gate Palette */}
          <div>
            <h4 className="font-medium mb-3">Available Gates</h4>
            <div className="flex flex-wrap gap-2">
              {gateTypes.map((gate) => (
                <div key={gate.name} className="group relative">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`w-12 h-12 p-0 text-white ${gate.color} hover:opacity-80`}
                  >
                    {gate.name}
                  </Button>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {gate.label}: {gate.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Circuit Canvas */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">Circuit Diagram</h4>
              <Button variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-1" />
                Clear
              </Button>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 min-h-[200px]">
              <svg viewBox="0 0 400 150" className="w-full h-full">
                {/* Qubit lines */}
                <line x1="20" y1="40" x2="380" y2="40" stroke="#374151" strokeWidth="2" />
                <line x1="20" y1="110" x2="380" y2="110" stroke="#374151" strokeWidth="2" />
                
                {/* Qubit labels */}
                <text x="10" y="45" className="text-sm fill-gray-600">q₀</text>
                <text x="10" y="115" className="text-sm fill-gray-600">q₁</text>
                
                {/* Example gates */}
                <rect x="60" y="25" width="30" height="30" fill="#3b82f6" rx="4" />
                <text x="75" y="45" className="text-sm fill-white text-anchor-middle">H</text>
                
                <circle cx="150" cy="40" r="8" fill="#8b5cf6" />
                <line x1="150" y1="48" x2="150" y2="102" stroke="#8b5cf6" strokeWidth="2" />
                <circle cx="150" cy="110" r="12" fill="none" stroke="#8b5cf6" strokeWidth="2" />
                <line x1="144" y1="104" x2="156" y2="116" stroke="#8b5cf6" strokeWidth="2" />
                <line x1="144" y1="116" x2="156" y2="104" stroke="#8b5cf6" strokeWidth="2" />
                
                {/* Measurement */}
                <rect x="320" y="25" width="30" height="30" fill="#6b7280" rx="4" />
                <text x="335" y="45" className="text-xs fill-white text-anchor-middle">M</text>
                <rect x="320" y="95" width="30" height="30" fill="#6b7280" rx="4" />
                <text x="335" y="115" className="text-xs fill-white text-anchor-middle">M</text>
              </svg>
              <div className="text-center text-sm text-gray-500 mt-2">
                Drag gates from the palette above to build your circuit
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Measurement Probabilities</CardTitle>
          <CardDescription>
            Probability distribution of measurement outcomes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(measurementResults).map(([state, probability]) => (
              <div key={state} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="font-mono">|{state}⟩</Badge>
                  <span className="text-sm text-gray-600">
                    {(probability * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${probability * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs text-gray-500 font-mono">
                  {probability.toFixed(3)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Equal superposition state:</strong> All outcomes have equal probability (25% each), 
              indicating a perfect superposition created by the Hadamard gate.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
