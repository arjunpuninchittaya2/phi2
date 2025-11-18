/**
 * Physics Equation Solver App
 * Main component that integrates all physics nodes with React Flow
 */

import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react';
import { memo, useCallback, useEffect, useState } from 'react';
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    Node,
    Edge,
    Connection,
    addEdge,
    useNodesState,
    useEdgesState,
    NodeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { VariableNode } from './nodes/VariableNode';
import { SolverNode } from './nodes/SolverNode';
import { OutputNode } from './nodes/OutputNode';
import { PlotNode } from './nodes/PlotNode';
import { PhysicsSolverProvider } from './PhysicsSolverContext';
import {
    VariableNodeData,
    SolverNodeData,
    OutputNodeData,
    PlotNodeData,
} from './types';

const nodeTypes: NodeTypes = {
    variable: VariableNode,
    solver: SolverNode,
    output: OutputNode,
    plot: PlotNode,
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

export const PhysicsSolverApp = memo(() => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [nodeIdCounter, setNodeIdCounter] = useState(1);

    // Handle connections between nodes
    const onConnect = useCallback(
        (connection: Connection) => {
            setEdges((eds) => addEdge(connection, eds));
        },
        [setEdges]
    );

    // Add new nodes
    const addVariableNode = useCallback(() => {
        const newNode: Node<VariableNodeData> = {
            id: `variable-${nodeIdCounter}`,
            type: 'variable',
            position: { x: 100, y: 100 + nodeIdCounter * 50 },
            data: {
                id: `variable-${nodeIdCounter}`,
                type: 'variable',
                variableName: '',
            },
        };
        setNodes((nds) => [...nds, newNode]);
        setNodeIdCounter((c) => c + 1);
    }, [nodeIdCounter, setNodes]);

    const addSolverNode = useCallback(() => {
        const newNode: Node<SolverNodeData> = {
            id: `solver-${nodeIdCounter}`,
            type: 'solver',
            position: { x: 400, y: 100 + nodeIdCounter * 50 },
            data: {
                id: `solver-${nodeIdCounter}`,
                type: 'solver',
                inputConnections: {},
            },
        };
        setNodes((nds) => [...nds, newNode]);
        setNodeIdCounter((c) => c + 1);
    }, [nodeIdCounter, setNodes]);

    const addOutputNode = useCallback(() => {
        const newNode: Node<OutputNodeData> = {
            id: `output-${nodeIdCounter}`,
            type: 'output',
            position: { x: 800, y: 100 + nodeIdCounter * 50 },
            data: {
                id: `output-${nodeIdCounter}`,
                type: 'output',
            },
        };
        setNodes((nds) => [...nds, newNode]);
        setNodeIdCounter((c) => c + 1);
    }, [nodeIdCounter, setNodes]);

    const addPlotNode = useCallback(() => {
        const newNode: Node<PlotNodeData> = {
            id: `plot-${nodeIdCounter}`,
            type: 'plot',
            position: { x: 800, y: 100 + nodeIdCounter * 50 },
            data: {
                id: `plot-${nodeIdCounter}`,
                type: 'plot',
                steps: 50,
            },
        };
        setNodes((nds) => [...nds, newNode]);
        setNodeIdCounter((c) => c + 1);
    }, [nodeIdCounter, setNodes]);

    // Handle custom events for updating node data
    useEffect(() => {
        const handleUpdateNodeData = (event: Event) => {
            const customEvent = event as CustomEvent;
            const { nodeId, data } = customEvent.detail;
            
            setNodes((nds) =>
                nds.map((node) => {
                    if (node.id === nodeId) {
                        return { ...node, data };
                    }
                    return node;
                })
            );
        };

        window.addEventListener('updateNodeData', handleUpdateNodeData);
        return () => {
            window.removeEventListener('updateNodeData', handleUpdateNodeData);
        };
    }, [setNodes]);

    return (
        <PhysicsSolverProvider
            edges={edges}
            nodes={nodes}
            onNodesChange={setNodes}
        >
            <VStack
                bg="gray.900"
                h="100vh"
                spacing={0}
                w="100vw"
            >
                {/* Header */}
                <Box
                    bg="gray.800"
                    borderBottom="1px solid"
                    borderColor="gray.700"
                    p={4}
                    w="full"
                >
                    <HStack
                        justify="space-between"
                        w="full"
                    >
                        <Text
                            color="white"
                            fontSize="xl"
                            fontWeight="bold"
                        >
                            Physics Equation Solver
                        </Text>
                        <HStack spacing={2}>
                            <Button
                                colorScheme="blue"
                                size="sm"
                                onClick={addVariableNode}
                            >
                                + Variable
                            </Button>
                            <Button
                                colorScheme="purple"
                                size="sm"
                                onClick={addSolverNode}
                            >
                                + Solver
                            </Button>
                            <Button
                                colorScheme="green"
                                size="sm"
                                onClick={addOutputNode}
                            >
                                + Output
                            </Button>
                            <Button
                                colorScheme="orange"
                                size="sm"
                                onClick={addPlotNode}
                            >
                                + Plot
                            </Button>
                        </HStack>
                    </HStack>
                </Box>

                {/* React Flow Canvas */}
                <Box
                    flex="1"
                    w="full"
                >
                    <ReactFlow
                        edges={edges}
                        fitView
                        nodeTypes={nodeTypes}
                        nodes={nodes}
                        onConnect={onConnect}
                        onEdgesChange={onEdgesChange}
                        onNodesChange={onNodesChange}
                    >
                        <Background />
                        <Controls />
                        <MiniMap
                            nodeColor={(node) => {
                                switch (node.type) {
                                    case 'variable':
                                        return '#3182ce';
                                    case 'solver':
                                        return '#805ad5';
                                    case 'output':
                                        return '#48bb78';
                                    case 'plot':
                                        return '#dd6b20';
                                    default:
                                        return '#718096';
                                }
                            }}
                        />
                    </ReactFlow>
                </Box>
            </VStack>
        </PhysicsSolverProvider>
    );
});
