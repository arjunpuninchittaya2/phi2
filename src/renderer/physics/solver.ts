/**
 * Physics Equation Solver
 * Handles symbolic manipulation and solving for variables
 */

import * as math from 'mathjs';
import nerdamer from 'nerdamer';
import 'nerdamer/Solve';
import 'nerdamer/Algebra';
import { PhysicsEquation } from './equations';

export interface SolverStep {
    description: string;
    equation: string; // LaTeX format
}

export interface SolverResult {
    steps: SolverStep[];
    solvedEquation: string; // LaTeX in terms of target variable
    symbolicResult: string; // nerdamer format
    numericResult?: number;
    unit?: string;
    error?: string;
}

/**
 * Solve an equation for a specific variable
 */
export function solveEquation(
    equation: PhysicsEquation,
    solveFor: string,
    values: Record<string, { value: number; unit: string }>
): SolverResult {
    const steps: SolverStep[] = [];
    
    try {
        // Step 1: Show original equation
        steps.push({
            description: 'Original equation',
            equation: equation.equation,
        });

        // Step 2: Solve symbolically for the target variable
        const symbolic = equation.symbolic;
        
        // Parse the equation (assume it's in form of expression)
        // For equations like "F = m*a", we need to handle the solving
        let solvedExpr;
        try {
            // Parse left and right sides
            const parts = symbolic.split('=');
            if (parts.length === 2) {
                const left = parts[0].trim();
                const right = parts[1].trim();
                
                // Solve for solveFor using nerdamer
                try {
                    // Use nerdamer's solve method on the expression
                    const equation_expr = `${left}-(${right})`;
                    const solved = nerdamer(equation_expr).solveFor(solveFor);
                    solvedExpr = solved;
                } catch (e2) {
                    // If still failing, try to isolate the variable manually
                    // This is a simplified approach
                    if (left === solveFor) {
                        solvedExpr = nerdamer(right);
                    } else if (right === solveFor) {
                        solvedExpr = nerdamer(left);
                    } else {
                        throw new Error(`Cannot solve for ${solveFor}`);
                    }
                }
            } else {
                throw new Error('Invalid equation format');
            }
        } catch (e) {
            console.error('Error solving equation:', e);
            throw e;
        }

        // Convert to LaTeX
        const solvedLatex = convertNerdamerToLatex(solvedExpr.toString(), solveFor);
        
        steps.push({
            description: `Solve for ${equation.variables[solveFor]?.name || solveFor}`,
            equation: solvedLatex,
        });

        // Step 3: Substitute values
        const substitutedValues: Record<string, string> = {};
        Object.entries(values).forEach(([varName, varData]) => {
            if (varName !== solveFor) {
                substitutedValues[varName] = `${varData.value}`;
            }
        });

        steps.push({
            description: 'Substitute values',
            equation: generateSubstitutionLatex(solvedExpr.toString(), substitutedValues, equation),
        });

        // Step 4: Calculate numeric result
        let numericResult: number | undefined;
        let resultUnit: string | undefined;
        
        try {
            // Substitute all values into the solved expression
            let expr = solvedExpr;
            const substitutions: Record<string, number> = {};
            
            Object.entries(values).forEach(([varName, varData]) => {
                if (varName !== solveFor) {
                    substitutions[varName] = varData.value;
                }
            });
            
            // Substitute values into the expression
            expr = expr.evaluate(substitutions);
            
            const resultValue = parseFloat(expr.toString());
            if (!isNaN(resultValue)) {
                numericResult = resultValue;
                
                // Determine the unit for the result
                resultUnit = equation.variables[solveFor]?.unit || '';
                
                steps.push({
                    description: 'Final result',
                    equation: `${equation.variables[solveFor]?.name || solveFor} = ${formatNumber(numericResult)} \\text{ ${resultUnit}}`,
                });
            }
        } catch (e) {
            console.error('Error calculating numeric result:', e);
        }

        return {
            steps,
            solvedEquation: solvedLatex,
            symbolicResult: solvedExpr.toString(),
            numericResult,
            unit: resultUnit,
        };
    } catch (error) {
        return {
            steps,
            solvedEquation: '',
            symbolicResult: '',
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

/**
 * Convert nerdamer expression to LaTeX
 */
function convertNerdamerToLatex(expr: string, solveFor: string): string {
    // Basic conversion - replace common operators
    let latex = expr
        .replace(/\*/g, ' \\cdot ')
        .replace(/\^/g, '^')
        .replace(/sqrt\(([^)]+)\)/g, '\\sqrt{$1}');
    
    // Add the variable being solved for
    latex = `${solveFor} = ${latex}`;
    
    return latex;
}

/**
 * Generate LaTeX for substitution step
 */
function generateSubstitutionLatex(
    expr: string,
    values: Record<string, string>,
    equation: PhysicsEquation
): string {
    let latex = expr;
    
    // Replace variable names with their values
    Object.entries(values).forEach(([varName, value]) => {
        const varInfo = equation.variables[varName];
        const displayName = varInfo?.name || varName;
        const unit = varInfo?.unit || '';
        
        // Simple replacement (could be improved)
        const regex = new RegExp(`\\b${varName}\\b`, 'g');
        latex = latex.replace(regex, `${value}`);
    });
    
    latex = latex
        .replace(/\*/g, ' \\cdot ')
        .replace(/\^/g, '^');
    
    return latex;
}

/**
 * Format number for display
 */
function formatNumber(value: number): string {
    if (Math.abs(value) < 0.001 || Math.abs(value) > 10000) {
        return value.toExponential(3);
    }
    return value.toFixed(3);
}

/**
 * Validate units using mathjs
 */
export function validateUnits(
    equation: PhysicsEquation,
    values: Record<string, { value: number; unit: string }>
): { valid: boolean; error?: string } {
    try {
        // Create mathjs unit objects for each variable
        const unitValues: Record<string, any> = {};
        
        Object.entries(values).forEach(([varName, varData]) => {
            try {
                // Try to parse the unit with mathjs
                unitValues[varName] = math.unit(varData.value, varData.unit);
            } catch (e) {
                throw new Error(`Invalid unit for ${varName}: ${varData.unit}`);
            }
        });
        
        return { valid: true };
    } catch (error) {
        return {
            valid: false,
            error: error instanceof Error ? error.message : 'Unit validation error',
        };
    }
}
