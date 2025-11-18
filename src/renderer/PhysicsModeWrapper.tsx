/**
 * Physics Mode Wrapper
 * Allows toggling between the original chaiNNer app and physics solver
 */

import { Box, Button, ChakraProvider, HStack, Text } from '@chakra-ui/react';
import { memo, useState } from 'react';
import { ReactFlowProvider } from 'reactflow';
import { PhysicsSolverApp } from './physics/PhysicsSolverApp';
import { darktheme } from './theme';

interface PhysicsModeWrapperProps {
    originalApp: React.ReactNode;
}

export const PhysicsModeWrapper = memo(({ originalApp }: PhysicsModeWrapperProps) => {
    const [isPhysicsMode, setIsPhysicsMode] = useState(false);

    if (isPhysicsMode) {
        return (
            <ChakraProvider theme={darktheme}>
                <ReactFlowProvider>
                    <Box
                        bg="gray.900"
                        h="100vh"
                        w="100vw"
                    >
                        <Box
                            bg="gray.800"
                            borderBottom="1px solid"
                            borderColor="gray.700"
                            p={2}
                        >
                            <HStack
                                justify="space-between"
                                px={4}
                            >
                                <Text
                                    color="gray.400"
                                    fontSize="sm"
                                >
                                    Physics Equation Solver Mode
                                </Text>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setIsPhysicsMode(false)}
                                >
                                    Back to chaiNNer
                                </Button>
                            </HStack>
                        </Box>
                        <PhysicsSolverApp />
                    </Box>
                </ReactFlowProvider>
            </ChakraProvider>
        );
    }

    return (
        <Box
            h="100vh"
            position="relative"
            w="100vw"
        >
            <Box
                position="absolute"
                right={4}
                top={4}
                zIndex={1000}
            >
                <Button
                    colorScheme="purple"
                    size="sm"
                    onClick={() => setIsPhysicsMode(true)}
                >
                    Physics Solver Mode
                </Button>
            </Box>
            {originalApp}
        </Box>
    );
});
