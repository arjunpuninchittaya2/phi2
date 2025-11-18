# Physics Equation Solver

A visual drag-and-drop physics equation solver built with React Flow. This feature allows you to solve physics equations symbolically and numerically with step-by-step derivations.

## Features

### Node Types

#### 1. Variable Node (Blue)
- **Purpose**: Define input variables with values and units
- **Inputs**:
  - Variable Name (e.g., v, a, t, m)
  - Numeric Value
  - Unit (e.g., m/s, kg, N, J)
- **Output**: Provides the variable to solver nodes

#### 2. Solver Node (Purple)
- **Purpose**: Select and solve physics equations
- **Features**:
  - Choose from 25+ standard physics equations organized by category
  - Select which variable to solve for
  - Automatic solving when inputs change
  - Step-by-step derivation display with LaTeX rendering
- **Inputs**: Connect Variable nodes for known values
- **Output**: Solution that can connect to Output or Plot nodes

#### 3. Output Node (Green)
- **Purpose**: Display final numeric results
- **Features**:
  - Shows calculated value with units
  - Displays any error messages
- **Input**: Connect from Solver node

#### 4. Plot Node (Orange)
- **Purpose**: Visualize equations vs. a variable across a range
- **Features**:
  - Plot mathematical expressions
  - Configure variable and range
  - Interactive charts using Recharts
- **Input**: Can connect from Solver or Variable nodes

## Equation Library

The solver includes equations from the following categories:

### Kinematics
- Displacement with acceleration: `Δx = ½at² + vᵢt`
- Final velocity: `v_f = vᵢ + at`
- Velocity squared relation: `v_f² – vᵢ² = 2aΔx`
- Average velocity (from velocities): `v_avg = (v_f + vᵢ)/2`
- Average velocity (from displacement): `v_avg = Δx / t`
- Speed: `s = d / t`

### Dynamics / Forces
- Newton's Second Law: `F = ma`
- Static Equilibrium: `ΣF = 0`

### Energy & Work
- Kinetic Energy: `KE = ½mv²`
- Gravitational Potential Energy: `PE_grav = mgh`
- Spring Potential Energy: `PE_spring = ½kx²`
- Work Done: `W = Fd cosθ`

### Momentum
- Momentum: `p = mv`
- Impulse-Momentum Theorem: `FΔt = Δp`

### Power
- Power from Work: `P = W / t`
- Power from Force and Velocity: `P = Fv`

### Circular Motion
- Centripetal Acceleration: `a_c = v² / r`
- Centripetal Force: `F_c = mv² / r`

### Electricity
- Ohm's Law: `V = IR`
- Electrical Power: `P = IV`, `P = I²R`, `P = V²/R`

## How to Use

### Basic Workflow

1. **Add Variable Nodes**: Click "+ Variable" to add nodes for known values
   - Enter variable name (matching the equation's variable)
   - Enter numeric value
   - Enter unit

2. **Add Solver Node**: Click "+ Solver" to add a solver
   - Select an equation from the dropdown
   - Choose which variable to solve for
   - Connect Variable nodes to the Solver inputs

3. **View Solution**: The solver automatically:
   - Shows the original equation
   - Displays the solved equation for your target variable
   - Shows value substitution
   - Displays the final numeric result
   
4. **Add Output Node** (optional): Click "+ Output" for a dedicated result display
   - Connect from Solver node output
   - Shows the final value with units

5. **Add Plot Node** (optional): Click "+ Plot" for visualization
   - Configure expression and variable
   - Set the range to plot

### Example: Solving for Final Velocity

Given:
- Initial velocity (vi) = 0 m/s
- Acceleration (a) = 2 m/s²
- Time (t) = 5 s

Find: Final velocity (vf)

Steps:
1. Add three Variable nodes:
   - vi = 0, unit: m/s
   - a = 2, unit: m/s^2
   - t = 5, unit: s

2. Add a Solver node:
   - Select "Final velocity" equation: vf = vi + at
   - Choose "vf" as the variable to solve for

3. Connect Variable nodes to Solver inputs

4. View the solution in the Solver node (should show vf = 10 m/s)

## Technology Stack

- **React 19**: Latest React for UI components
- **React Flow**: Node-based canvas interface
- **nerdamer**: Symbolic algebra and equation solving
- **mathjs**: Numeric evaluation and unit handling
- **react-katex + KaTeX**: LaTeX equation rendering
- **recharts**: Plotting and visualization
- **Chakra UI**: UI components

## Accessing the Physics Solver

Click the "Physics Solver Mode" button in the top-right corner of the chaiNNer interface to switch to the physics equation solver.

## Units

The solver uses SI units by default:
- Distance/Length: m (meters)
- Time: s (seconds)
- Mass: kg (kilograms)
- Force: N (Newtons)
- Energy: J (Joules)
- Power: W (Watts)
- Voltage: V (Volts)
- Current: A (Amperes)
- Resistance: Ω (Ohms)
- Velocity: m/s
- Acceleration: m/s²

Units are validated using mathjs to ensure dimensional correctness.

## Features in Detail

### Symbolic Manipulation
- Automatically rearranges equations to solve for any variable
- Shows algebraic steps
- Handles complex equations including quadratics

### Unit Support
- Input values with units
- Automatic unit validation
- Results shown in correct SI units

### Step-by-Step Solutions
- Original equation display
- Symbolic solution for target variable
- Value substitution step
- Final numeric result

### Auto-Solving
- Solver automatically recalculates when:
  - Input values change
  - Different equation is selected
  - Solve-for variable changes

## Limitations

- Currently supports standard high school physics equations
- SI units preferred (conversions not yet implemented)
- Plot node uses placeholder calculations (full expression evaluation coming soon)
- Some complex equations may not solve automatically

## Future Enhancements

- Unit conversion support
- More advanced physics equations (thermodynamics, optics, quantum mechanics)
- Enhanced plot node with full expression evaluation
- Multiple solution handling for quadratic equations
- Save/load functionality for physics problems
- Step-by-step explanation generator
