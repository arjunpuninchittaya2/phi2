/**
 * Physics Solver Context
 * Manages state and computation for physics solver nodes
 */

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Node, Edge } from 'reactflow';
import { getEquationById } from './equations';
import { solveEquation, SolverResult } from './solver';
import {
    VariableNodeData,
    SolverNodeData,
    OutputNodeData,
    PlotNodeData,
} from './types';

interface PhysicsSolverContextType {
    calculateSolver: (solverId: string) => void;
    getSolverResult: (solverId: string) => SolverResult | undefined;
    updateOutput: (outputId: string, result: SolverResult) => void;
}

const PhysicsSolverContext = createContext<PhysicsSolverContextType | undefined>(undefined);

export function usePhysicsSolver() {
    const context = useContext(PhysicsSolverContext);
    if (!context) {
        throw new Error('usePhysicsSolver must be used within PhysicsSolverProvider');
    }
    return context;
}

interface PhysicsSolverProviderProps {
    children: React.ReactNode;
    nodes: Node[];
    edges: Edge[];
    onNodesChange: (nodes: Node[]) => void;
}

export function PhysicsSolverProvider({
    children,
    nodes,
    edges,
    onNodesChange,
}: PhysicsSolverProviderProps) {
    const [solverResults, setSolverResults] = useState<Map<string, SolverResult>>(new Map());

    // Get connected input nodes for a solver
    const getInputNodes = useCallback(
        (solverId: string): Record<string, VariableNodeData> => {
            const inputs: Record<string, VariableNodeData> = {};
            
            // Find all edges connected to this solver
            const connectedEdges = edges.filter((edge) => edge.target === solverId);
            
            connectedEdges.forEach((edge) => {
                const sourceNode = nodes.find((n) => n.id === edge.source);
                if (sourceNode && sourceNode.type === 'variable') {
                    const varData = sourceNode.data as VariableNodeData;
                    if (varData.variableName) {
                        inputs[varData.variableName] = varData;
                    }
                }
            });
            
            return inputs;
        },
        [nodes, edges]
    );

    const calculateSolver = useCallback(
        (solverId: string) => {
            const solverNode = nodes.find((n) => n.id === solverId);
            if (!solverNode || solverNode.type !== 'solver') return;

            const solverData = solverNode.data as SolverNodeData;
            if (!solverData.equationId || !solverData.solveFor) {
                console.warn('Solver node missing equation or solve variable');
                return;
            }

            const equation = getEquationById(solverData.equationId);
            if (!equation) {
                console.error('Equation not found:', solverData.equationId);
                return;
            }

            // Get input variables from connected nodes
            const inputNodes = getInputNodes(solverId);
            
            // Build values object for solver
            const values: Record<string, { value: number; unit: string }> = {};
            Object.entries(inputNodes).forEach(([varName, varData]) => {
                if (varData.value !== undefined && varData.unit) {
                    values[varName] = {
                        value: varData.value,
                        unit: varData.unit,
                    };
                }
            });

            // Check if we have all required variables
            const requiredVars = Object.keys(equation.variables).filter(
                (v) => v !== solverData.solveFor
            );
            const missingVars = requiredVars.filter((v) => !values[v]);
            
            if (missingVars.length > 0) {
                console.warn('Missing variables:', missingVars);
                const errorResult: SolverResult = {
                    steps: [],
                    solvedEquation: '',
                    symbolicResult: '',
                    error: `Missing variables: ${missingVars.join(', ')}`,
                };
                setSolverResults((prev) => new Map(prev).set(solverId, errorResult));
                return;
            }

            // Solve the equation
            const result = solveEquation(equation, solverData.solveFor, values);
            setSolverResults((prev) => new Map(prev).set(solverId, result));

            // Update connected output nodes
            const outputEdges = edges.filter((edge) => edge.source === solverId);
            outputEdges.forEach((edge) => {
                const outputNode = nodes.find((n) => n.id === edge.target);
                if (outputNode && outputNode.type === 'output') {
                    updateOutput(edge.target, result);
                }
            });
        },
        [nodes, edges, getInputNodes]
    );

    const getSolverResult = useCallback(
        (solverId: string): SolverResult | undefined => {
            return solverResults.get(solverId);
        },
        [solverResults]
    );

    const updateOutput = useCallback(
        (outputId: string, result: SolverResult) => {
            onNodesChange(
                nodes.map((node) => {
                    if (node.id === outputId) {
                        return {
                            ...node,
                            data: {
                                ...node.data,
                                value: result.numericResult,
                                unit: result.unit,
                                label: result.error || undefined,
                            } as OutputNodeData,
                        };
                    }
                    return node;
                })
            );
        },
        [nodes, onNodesChange]
    );

    const value = useMemo(
        () => ({
            calculateSolver,
            getSolverResult,
            updateOutput,
        }),
        [calculateSolver, getSolverResult, updateOutput]
    );

    return (
        <PhysicsSolverContext.Provider value={value}>{children}</PhysicsSolverContext.Provider>
    );
}
