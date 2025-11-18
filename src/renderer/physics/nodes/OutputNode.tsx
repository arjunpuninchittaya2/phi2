/**
 * Output Node Component
 * Displays the final numeric result with units
 */

import { Box, VStack, Text, HStack } from '@chakra-ui/react';
import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { OutputNodeData } from '../types';

interface OutputNodeProps {
    data: OutputNodeData;
    id: string;
}

export const OutputNode = memo(({ data }: OutputNodeProps) => {
    return (
        <Box
            bg="gray.800"
            border="2px solid"
            borderColor="green.500"
            borderRadius="md"
            minW="200px"
            p={4}
        >
            <VStack
                align="stretch"
                spacing={3}
            >
                <Text
                    color="green.300"
                    fontWeight="bold"
                    fontSize="sm"
                >
                    Output Node
                </Text>

                {data.label && (
                    <Text
                        color="gray.400"
                        fontSize="xs"
                    >
                        {data.label}
                    </Text>
                )}

                <Box
                    bg="gray.900"
                    borderRadius="md"
                    minH="60px"
                    p={3}
                >
                    {data.value !== undefined ? (
                        <VStack
                            align="start"
                            spacing={1}
                        >
                            <HStack>
                                <Text
                                    color="green.300"
                                    fontSize="2xl"
                                    fontWeight="bold"
                                >
                                    {data.value.toFixed(3)}
                                </Text>
                                {data.unit && (
                                    <Text
                                        color="gray.400"
                                        fontSize="md"
                                    >
                                        {data.unit}
                                    </Text>
                                )}
                            </HStack>
                        </VStack>
                    ) : (
                        <Text
                            color="gray.600"
                            fontSize="xs"
                        >
                            No result yet. Connect a solver node.
                        </Text>
                    )}
                </Box>
            </VStack>

            <Handle
                id="input"
                position={Position.Left}
                style={{ background: '#48bb78' }}
                type="target"
            />
        </Box>
    );
});
