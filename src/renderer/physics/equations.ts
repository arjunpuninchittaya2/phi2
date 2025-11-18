/**
 * Physics Equation Library
 * Contains standard physics equations organized by category
 */

export interface PhysicsEquation {
    id: string;
    name: string;
    category: string;
    equation: string; // LaTeX format
    symbolic: string; // nerdamer format
    variables: {
        [key: string]: {
            name: string;
            description: string;
            unit: string;
        };
    };
}

export const PHYSICS_EQUATIONS: PhysicsEquation[] = [
    // Kinematics (SUVAT)
    {
        id: 'kinematics_displacement_1',
        name: 'Displacement with acceleration',
        category: 'Kinematics',
        equation: '\\Delta x = \\frac{1}{2}at^2 + v_i t',
        symbolic: 'dx = (1/2)*a*t^2 + vi*t',
        variables: {
            dx: { name: 'Δx', description: 'Displacement', unit: 'm' },
            a: { name: 'a', description: 'Acceleration', unit: 'm/s^2' },
            t: { name: 't', description: 'Time', unit: 's' },
            vi: { name: 'vᵢ', description: 'Initial velocity', unit: 'm/s' },
        },
    },
    {
        id: 'kinematics_velocity',
        name: 'Final velocity',
        category: 'Kinematics',
        equation: 'v_f = v_i + at',
        symbolic: 'vf = vi + a*t',
        variables: {
            vf: { name: 'v_f', description: 'Final velocity', unit: 'm/s' },
            vi: { name: 'vᵢ', description: 'Initial velocity', unit: 'm/s' },
            a: { name: 'a', description: 'Acceleration', unit: 'm/s^2' },
            t: { name: 't', description: 'Time', unit: 's' },
        },
    },
    {
        id: 'kinematics_velocity_squared',
        name: 'Velocity squared relation',
        category: 'Kinematics',
        equation: 'v_f^2 - v_i^2 = 2a\\Delta x',
        symbolic: 'vf^2 - vi^2 = 2*a*dx',
        variables: {
            vf: { name: 'v_f', description: 'Final velocity', unit: 'm/s' },
            vi: { name: 'vᵢ', description: 'Initial velocity', unit: 'm/s' },
            a: { name: 'a', description: 'Acceleration', unit: 'm/s^2' },
            dx: { name: 'Δx', description: 'Displacement', unit: 'm' },
        },
    },
    {
        id: 'kinematics_avg_velocity',
        name: 'Average velocity',
        category: 'Kinematics',
        equation: 'v_{avg} = \\frac{v_f + v_i}{2}',
        symbolic: 'vavg = (vf + vi)/2',
        variables: {
            vavg: { name: 'v_avg', description: 'Average velocity', unit: 'm/s' },
            vf: { name: 'v_f', description: 'Final velocity', unit: 'm/s' },
            vi: { name: 'vᵢ', description: 'Initial velocity', unit: 'm/s' },
        },
    },
    {
        id: 'kinematics_avg_velocity_2',
        name: 'Average velocity from displacement',
        category: 'Kinematics',
        equation: 'v_{avg} = \\frac{\\Delta x}{t}',
        symbolic: 'vavg = dx/t',
        variables: {
            vavg: { name: 'v_avg', description: 'Average velocity', unit: 'm/s' },
            dx: { name: 'Δx', description: 'Displacement', unit: 'm' },
            t: { name: 't', description: 'Time', unit: 's' },
        },
    },
    {
        id: 'speed_distance_time',
        name: 'Speed from distance and time',
        category: 'Kinematics',
        equation: 's = \\frac{d}{t}',
        symbolic: 's = d/t',
        variables: {
            s: { name: 's', description: 'Speed', unit: 'm/s' },
            d: { name: 'd', description: 'Distance', unit: 'm' },
            t: { name: 't', description: 'Time', unit: 's' },
        },
    },

    // Dynamics / Forces
    {
        id: 'newtons_second_law',
        name: "Newton's Second Law",
        category: 'Dynamics',
        equation: 'F = ma',
        symbolic: 'F = m*a',
        variables: {
            F: { name: 'F', description: 'Force', unit: 'N' },
            m: { name: 'm', description: 'Mass', unit: 'kg' },
            a: { name: 'a', description: 'Acceleration', unit: 'm/s^2' },
        },
    },
    {
        id: 'equilibrium',
        name: 'Static Equilibrium',
        category: 'Dynamics',
        equation: '\\Sigma F = 0',
        symbolic: 'Fsum = 0',
        variables: {
            Fsum: { name: 'ΣF', description: 'Sum of forces', unit: 'N' },
        },
    },

    // Energy & Work
    {
        id: 'kinetic_energy',
        name: 'Kinetic Energy',
        category: 'Energy',
        equation: 'KE = \\frac{1}{2}mv^2',
        symbolic: 'KE = (1/2)*m*v^2',
        variables: {
            KE: { name: 'KE', description: 'Kinetic energy', unit: 'J' },
            m: { name: 'm', description: 'Mass', unit: 'kg' },
            v: { name: 'v', description: 'Velocity', unit: 'm/s' },
        },
    },
    {
        id: 'gravitational_potential_energy',
        name: 'Gravitational Potential Energy',
        category: 'Energy',
        equation: 'PE_{grav} = mgh',
        symbolic: 'PEgrav = m*g*h',
        variables: {
            PEgrav: { name: 'PE_grav', description: 'Gravitational potential energy', unit: 'J' },
            m: { name: 'm', description: 'Mass', unit: 'kg' },
            g: { name: 'g', description: 'Gravitational acceleration', unit: 'm/s^2' },
            h: { name: 'h', description: 'Height', unit: 'm' },
        },
    },
    {
        id: 'spring_potential_energy',
        name: 'Spring Potential Energy',
        category: 'Energy',
        equation: 'PE_{spring} = \\frac{1}{2}kx^2',
        symbolic: 'PEspring = (1/2)*k*x^2',
        variables: {
            PEspring: { name: 'PE_spring', description: 'Spring potential energy', unit: 'J' },
            k: { name: 'k', description: 'Spring constant', unit: 'N/m' },
            x: { name: 'x', description: 'Displacement from equilibrium', unit: 'm' },
        },
    },
    {
        id: 'work',
        name: 'Work Done',
        category: 'Energy',
        equation: 'W = Fd\\cos\\theta',
        symbolic: 'W = F*d*cos(theta)',
        variables: {
            W: { name: 'W', description: 'Work', unit: 'J' },
            F: { name: 'F', description: 'Force', unit: 'N' },
            d: { name: 'd', description: 'Displacement', unit: 'm' },
            theta: { name: 'θ', description: 'Angle between force and displacement', unit: 'rad' },
        },
    },

    // Momentum
    {
        id: 'momentum',
        name: 'Momentum',
        category: 'Momentum',
        equation: 'p = mv',
        symbolic: 'p = m*v',
        variables: {
            p: { name: 'p', description: 'Momentum', unit: 'kg*m/s' },
            m: { name: 'm', description: 'Mass', unit: 'kg' },
            v: { name: 'v', description: 'Velocity', unit: 'm/s' },
        },
    },
    {
        id: 'impulse',
        name: 'Impulse-Momentum Theorem',
        category: 'Momentum',
        equation: 'F\\Delta t = \\Delta p',
        symbolic: 'F*dt = dp',
        variables: {
            F: { name: 'F', description: 'Average force', unit: 'N' },
            dt: { name: 'Δt', description: 'Time interval', unit: 's' },
            dp: { name: 'Δp', description: 'Change in momentum', unit: 'kg*m/s' },
        },
    },

    // Power
    {
        id: 'power_work_time',
        name: 'Power from Work',
        category: 'Power',
        equation: 'P = \\frac{W}{t}',
        symbolic: 'P = W/t',
        variables: {
            P: { name: 'P', description: 'Power', unit: 'W' },
            W: { name: 'W', description: 'Work', unit: 'J' },
            t: { name: 't', description: 'Time', unit: 's' },
        },
    },
    {
        id: 'power_force_velocity',
        name: 'Power from Force and Velocity',
        category: 'Power',
        equation: 'P = Fv',
        symbolic: 'P = F*v',
        variables: {
            P: { name: 'P', description: 'Power', unit: 'W' },
            F: { name: 'F', description: 'Force', unit: 'N' },
            v: { name: 'v', description: 'Velocity', unit: 'm/s' },
        },
    },

    // Circular Motion
    {
        id: 'centripetal_acceleration',
        name: 'Centripetal Acceleration',
        category: 'Circular Motion',
        equation: 'a_c = \\frac{v^2}{r}',
        symbolic: 'ac = v^2/r',
        variables: {
            ac: { name: 'a_c', description: 'Centripetal acceleration', unit: 'm/s^2' },
            v: { name: 'v', description: 'Tangential velocity', unit: 'm/s' },
            r: { name: 'r', description: 'Radius', unit: 'm' },
        },
    },
    {
        id: 'centripetal_force',
        name: 'Centripetal Force',
        category: 'Circular Motion',
        equation: 'F_c = \\frac{mv^2}{r}',
        symbolic: 'Fc = m*v^2/r',
        variables: {
            Fc: { name: 'F_c', description: 'Centripetal force', unit: 'N' },
            m: { name: 'm', description: 'Mass', unit: 'kg' },
            v: { name: 'v', description: 'Tangential velocity', unit: 'm/s' },
            r: { name: 'r', description: 'Radius', unit: 'm' },
        },
    },

    // Electricity
    {
        id: 'ohms_law',
        name: "Ohm's Law",
        category: 'Electricity',
        equation: 'V = IR',
        symbolic: 'V = I*R',
        variables: {
            V: { name: 'V', description: 'Voltage', unit: 'V' },
            I: { name: 'I', description: 'Current', unit: 'A' },
            R: { name: 'R', description: 'Resistance', unit: 'Ω' },
        },
    },
    {
        id: 'electrical_power_1',
        name: 'Electrical Power (VI)',
        category: 'Electricity',
        equation: 'P = IV',
        symbolic: 'P = I*V',
        variables: {
            P: { name: 'P', description: 'Power', unit: 'W' },
            I: { name: 'I', description: 'Current', unit: 'A' },
            V: { name: 'V', description: 'Voltage', unit: 'V' },
        },
    },
    {
        id: 'electrical_power_2',
        name: 'Electrical Power (I²R)',
        category: 'Electricity',
        equation: 'P = I^2R',
        symbolic: 'P = I^2*R',
        variables: {
            P: { name: 'P', description: 'Power', unit: 'W' },
            I: { name: 'I', description: 'Current', unit: 'A' },
            R: { name: 'R', description: 'Resistance', unit: 'Ω' },
        },
    },
    {
        id: 'electrical_power_3',
        name: 'Electrical Power (V²/R)',
        category: 'Electricity',
        equation: 'P = \\frac{V^2}{R}',
        symbolic: 'P = V^2/R',
        variables: {
            P: { name: 'P', description: 'Power', unit: 'W' },
            V: { name: 'V', description: 'Voltage', unit: 'V' },
            R: { name: 'R', description: 'Resistance', unit: 'Ω' },
        },
    },
];

export function getEquationById(id: string): PhysicsEquation | undefined {
    return PHYSICS_EQUATIONS.find((eq) => eq.id === id);
}

export function getEquationsByCategory(category: string): PhysicsEquation[] {
    return PHYSICS_EQUATIONS.filter((eq) => eq.category === category);
}

export function getAllCategories(): string[] {
    const categories = new Set(PHYSICS_EQUATIONS.map((eq) => eq.category));
    return Array.from(categories).sort();
}
