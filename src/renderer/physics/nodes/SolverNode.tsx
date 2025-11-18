/**
 * Solver Node Component
 * Allows users to select an equation and solve for a specific variable
 */

import {
    Box,
    FormControl,
    FormLabel,
    Select,
    VStack,
    Text,
    Divider,
    Button,
} from '@chakra-ui/react';
import { memo, useCallback, useMemo } from 'react';
import { Handle, Position } from 'reactflow';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { SolverNodeData } from '../types';
import { PHYSICS_EQUATIONS, getAllCategories, getEquationsByCategory } from '../equations';

interface SolverNodeProps {
    data: SolverNodeData;
    id: string;
}

export const SolverNode = memo(({ data, id }: SolverNodeProps) => {
    const categories = useMemo(() => getAllCategories(), []);
    const selectedEquation = useMemo(
        () => PHYSICS_EQUATIONS.find((eq) => eq.id === data.equationId),
        [data.equationId]
    );

    const handleEquationChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            const equationId = e.target.value;
            const event = new CustomEvent('updateNodeData', {
                detail: {
                    nodeId: id,
                    data: { ...data, equationId, solveFor: undefined },
                },
            });
            window.dispatchEvent(event);
        },
        [id, data]
    );

    const handleSolveForChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            const event = new CustomEvent('updateNodeData', {
                detail: {
                    nodeId: id,
                    data: { ...data, solveFor: e.target.value },
                },
            });
            window.dispatchEvent(event);
        },
        [id, data]
    );

    const handleSolve = useCallback(() => {
        const event = new CustomEvent('solveEquation', {
            detail: { nodeId: id },
        });
        window.dispatchEvent(event);
    }, [id]);

    return (
        <Box
            bg="gray.800"
            border="2px solid"
            borderColor="purple.500"
            borderRadius="md"
            minW="300px"
            p={4}
        >
            <VStack
                align="stretch"
                spacing={3}
            >
                <Text
                    color="purple.300"
                    fontWeight="bold"
                    fontSize="sm"
                >
                    Solver Node
                </Text>

                <FormControl>
                    <FormLabel
                        color="gray.300"
                        fontSize="xs"
                    >
                        Select Equation
                    </FormLabel>
                    <Select
                        placeholder="Choose equation..."
                        size="sm"
                        value={data.equationId || ''}
                        onChange={handleEquationChange}
                    >
                        {categories.map((category) => (
                            <optgroup
                                key={category}
                                label={category}
                            >
                                {getEquationsByCategory(category).map((eq) => (
                                    <option
                                        key={eq.id}
                                        value={eq.id}
                                    >
                                        {eq.name}
                                    </option>
                                ))}
                            </optgroup>
                        ))}
                    </Select>
                </FormControl>

                {selectedEquation && (
                    <>
                        <Box
                            bg="gray.900"
                            borderRadius="md"
                            p={2}
                        >
                            <Text
                                color="gray.400"
                                fontSize="xs"
                                mb={1}
                            >
                                Equation:
                            </Text>
                            <Box color="white">
                                <InlineMath math={selectedEquation.equation} />
                            </Box>
                        </Box>

                        <FormControl>
                            <FormLabel
                                color="gray.300"
                                fontSize="xs"
                            >
                                Solve For
                            </FormLabel>
                            <Select
                                placeholder="Choose variable..."
                                size="sm"
                                value={data.solveFor || ''}
                                onChange={handleSolveForChange}
                            >
                                {Object.entries(selectedEquation.variables).map(
                                    ([varKey, varInfo]) => (
                                        <option
                                            key={varKey}
                                            value={varKey}
                                        >
                                            {varInfo.name} - {varInfo.description}
                                        </option>
                                    )
                                )}
                            </Select>
                        </FormControl>

                        <Divider />

                        <Text
                            color="gray.400"
                            fontSize="xs"
                        >
                            Connect input variables to this node
                        </Text>

                        <Button
                            colorScheme="purple"
                            isDisabled={!data.solveFor}
                            size="sm"
                            onClick={handleSolve}
                        >
                            Solve
                        </Button>
                    </>
                )}
            </VStack>

            {/* Input handles for each variable */}
            {selectedEquation &&
                Object.entries(selectedEquation.variables).map(([varKey], index) => {
                    if (varKey !== data.solveFor) {
                        return (
                            <Handle
                                key={varKey}
                                id={`input-${varKey}`}
                                position={Position.Left}
                                style={{
                                    background: '#805ad5',
                                    top: `${60 + index * 20}px`,
                                }}
                                type="target"
                            />
                        );
                    }
                    return null;
                })}

            <Handle
                id="output"
                position={Position.Right}
                style={{ background: '#805ad5' }}
                type="source"
            />
        </Box>
    );
});
