/**
 * Physics Equation Solver Node Types
 */

export interface PhysicsNodeData {
    id: string;
    type: 'variable' | 'solver' | 'output' | 'plot';
}

export interface VariableNodeData extends PhysicsNodeData {
    type: 'variable';
    variableName: string;
    value?: number;
    unit?: string;
}

export interface SolverNodeData extends PhysicsNodeData {
    type: 'solver';
    equationId?: string;
    solveFor?: string;
    inputConnections: Record<string, string>; // variable name -> source node id
}

export interface OutputNodeData extends PhysicsNodeData {
    type: 'output';
    value?: number;
    unit?: string;
    label?: string;
}

export interface PlotNodeData extends PhysicsNodeData {
    type: 'plot';
    expression?: string;
    variable?: string;
    rangeMin?: number;
    rangeMax?: number;
    steps?: number;
}
