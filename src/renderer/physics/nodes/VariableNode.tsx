/**
 * Variable Node Component
 * Allows users to define variables with values and units
 */

import { Box, FormControl, FormLabel, Input, VStack, Text } from '@chakra-ui/react';
import { memo, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { VariableNodeData } from '../types';

interface VariableNodeProps {
    data: VariableNodeData;
    id: string;
}

export const VariableNode = memo(({ data, id }: VariableNodeProps) => {
    const handleVariableNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        // Update node data - this will be handled by the parent context
        const event = new CustomEvent('updateNodeData', {
            detail: {
                nodeId: id,
                data: { ...data, variableName: e.target.value },
            },
        });
        window.dispatchEvent(event);
    }, [id, data]);

    const handleValueChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        const event = new CustomEvent('updateNodeData', {
            detail: {
                nodeId: id,
                data: { ...data, value: isNaN(value) ? undefined : value },
            },
        });
        window.dispatchEvent(event);
    }, [id, data]);

    const handleUnitChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const event = new CustomEvent('updateNodeData', {
            detail: {
                nodeId: id,
                data: { ...data, unit: e.target.value },
            },
        });
        window.dispatchEvent(event);
    }, [id, data]);

    return (
        <Box
            bg="gray.800"
            border="2px solid"
            borderColor="blue.500"
            borderRadius="md"
            minW="200px"
            p={4}
        >
            <VStack
                align="stretch"
                spacing={3}
            >
                <Text
                    color="blue.300"
                    fontWeight="bold"
                    fontSize="sm"
                >
                    Variable Node
                </Text>

                <FormControl>
                    <FormLabel
                        color="gray.300"
                        fontSize="xs"
                    >
                        Variable Name
                    </FormLabel>
                    <Input
                        placeholder="e.g., v, a, t"
                        size="sm"
                        value={data.variableName || ''}
                        onChange={handleVariableNameChange}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel
                        color="gray.300"
                        fontSize="xs"
                    >
                        Value
                    </FormLabel>
                    <Input
                        placeholder="e.g., 5"
                        size="sm"
                        type="number"
                        value={data.value ?? ''}
                        onChange={handleValueChange}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel
                        color="gray.300"
                        fontSize="xs"
                    >
                        Unit
                    </FormLabel>
                    <Input
                        placeholder="e.g., m/s, kg, N"
                        size="sm"
                        value={data.unit || ''}
                        onChange={handleUnitChange}
                    />
                </FormControl>
            </VStack>

            <Handle
                id="output"
                position={Position.Right}
                style={{ background: '#3182ce' }}
                type="source"
            />
        </Box>
    );
});
