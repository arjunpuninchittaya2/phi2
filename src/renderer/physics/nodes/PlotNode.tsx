/**
 * Plot Node Component
 * Plots equations vs. a variable across a range
 */

import {
    Box,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Text,
    NumberInput,
    NumberInputField,
} from '@chakra-ui/react';
import { memo, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PlotNodeData } from '../types';

interface PlotNodeProps {
    data: PlotNodeData;
    id: string;
}

export const PlotNode = memo(({ data, id }: PlotNodeProps) => {
    const handleExpressionChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const event = new CustomEvent('updateNodeData', {
                detail: {
                    nodeId: id,
                    data: { ...data, expression: e.target.value },
                },
            });
            window.dispatchEvent(event);
        },
        [id, data]
    );

    const handleVariableChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const event = new CustomEvent('updateNodeData', {
                detail: {
                    nodeId: id,
                    data: { ...data, variable: e.target.value },
                },
            });
            window.dispatchEvent(event);
        },
        [id, data]
    );

    const handleRangeMinChange = useCallback(
        (valueString: string) => {
            const value = parseFloat(valueString);
            const event = new CustomEvent('updateNodeData', {
                detail: {
                    nodeId: id,
                    data: { ...data, rangeMin: isNaN(value) ? undefined : value },
                },
            });
            window.dispatchEvent(event);
        },
        [id, data]
    );

    const handleRangeMaxChange = useCallback(
        (valueString: string) => {
            const value = parseFloat(valueString);
            const event = new CustomEvent('updateNodeData', {
                detail: {
                    nodeId: id,
                    data: { ...data, rangeMax: isNaN(value) ? undefined : value },
                },
            });
            window.dispatchEvent(event);
        },
        [id, data]
    );

    // Generate plot data
    const plotData = (() => {
        if (
            !data.expression ||
            !data.variable ||
            data.rangeMin === undefined ||
            data.rangeMax === undefined
        ) {
            return [];
        }

        const steps = data.steps || 50;
        const step = (data.rangeMax - data.rangeMin) / steps;
        const result = [];

        for (let i = 0; i <= steps; i++) {
            const x = data.rangeMin + i * step;
            // For now, just use a placeholder calculation
            // In a real implementation, this would evaluate the expression
            const y = x * x; // Placeholder
            result.push({ x, y });
        }

        return result;
    })();

    return (
        <Box
            bg="gray.800"
            border="2px solid"
            borderColor="orange.500"
            borderRadius="md"
            minW="400px"
            p={4}
        >
            <VStack
                align="stretch"
                spacing={3}
            >
                <Text
                    color="orange.300"
                    fontWeight="bold"
                    fontSize="sm"
                >
                    Plot Node
                </Text>

                <FormControl>
                    <FormLabel
                        color="gray.300"
                        fontSize="xs"
                    >
                        Expression
                    </FormLabel>
                    <Input
                        placeholder="e.g., x^2, sin(x)"
                        size="sm"
                        value={data.expression || ''}
                        onChange={handleExpressionChange}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel
                        color="gray.300"
                        fontSize="xs"
                    >
                        Variable
                    </FormLabel>
                    <Input
                        placeholder="e.g., x"
                        size="sm"
                        value={data.variable || ''}
                        onChange={handleVariableChange}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel
                        color="gray.300"
                        fontSize="xs"
                    >
                        Range Min
                    </FormLabel>
                    <NumberInput
                        size="sm"
                        value={data.rangeMin ?? ''}
                        onChange={handleRangeMinChange}
                    >
                        <NumberInputField />
                    </NumberInput>
                </FormControl>

                <FormControl>
                    <FormLabel
                        color="gray.300"
                        fontSize="xs"
                    >
                        Range Max
                    </FormLabel>
                    <NumberInput
                        size="sm"
                        value={data.rangeMax ?? ''}
                        onChange={handleRangeMaxChange}
                    >
                        <NumberInputField />
                    </NumberInput>
                </FormControl>

                {plotData.length > 0 && (
                    <Box
                        bg="gray.900"
                        borderRadius="md"
                        h="200px"
                        p={2}
                    >
                        <ResponsiveContainer
                            height="100%"
                            width="100%"
                        >
                            <LineChart data={plotData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="x"
                                    stroke="#a0aec0"
                                />
                                <YAxis stroke="#a0aec0" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#2d3748',
                                        border: '1px solid #4a5568',
                                    }}
                                />
                                <Line
                                    dataKey="y"
                                    dot={false}
                                    stroke="#ed8936"
                                    type="monotone"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </Box>
                )}
            </VStack>

            <Handle
                id="input"
                position={Position.Left}
                style={{ background: '#dd6b20' }}
                type="target"
            />
        </Box>
    );
});
