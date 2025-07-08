export interface ODESystem {
  equations: (t: number, y: number[], params: Record<string, number>) => number[];
  initialConditions: number[];
  parameters: Record<string, number>;
}

export interface SolverOptions {
  tStart: number;
  tEnd: number;
  stepSize: number;
  method: 'rk4' | 'euler';
}

export class PKSolver {
  private static instance: PKSolver;

  public static getInstance(): PKSolver {
    if (!PKSolver.instance) {
      PKSolver.instance = new PKSolver();
    }
    return PKSolver.instance;
  }

  /**
   * Fourth-order Runge-Kutta method for solving ODEs
   */
  private rungeKutta4(
    f: (t: number, y: number[], params: Record<string, number>) => number[],
    t: number,
    y: number[],
    h: number,
    params: Record<string, number>
  ): number[] {
    const k1 = f(t, y, params);
    const k2 = f(t + h/2, y.map((yi, i) => yi + h * k1[i] / 2), params);
    const k3 = f(t + h/2, y.map((yi, i) => yi + h * k2[i] / 2), params);
    const k4 = f(t + h, y.map((yi, i) => yi + h * k3[i]), params);

    return y.map((yi, i) => yi + h * (k1[i] + 2*k2[i] + 2*k3[i] + k4[i]) / 6);
  }

  /**
   * Euler method for solving ODEs
   */
  private euler(
    f: (t: number, y: number[], params: Record<string, number>) => number[],
    t: number,
    y: number[],
    h: number,
    params: Record<string, number>
  ): number[] {
    const dydt = f(t, y, params);
    return y.map((yi, i) => yi + h * dydt[i]);
  }

  /**
   * Solve ODE system
   */
  public solve(system: ODESystem, options: SolverOptions): { time: number[], concentrations: number[][] } {
    console.log('+1 simulation run');
    const { tStart, tEnd, stepSize, method } = options;
    const { equations, initialConditions, parameters } = system;

    const timePoints: number[] = [];
    const concentrations: number[][] = [];
    
    let t = tStart;
    let y = [...initialConditions];

    while (t <= tEnd) {
      timePoints.push(t);
      concentrations.push([...y]);

      if (t + stepSize > tEnd) break;

      if (method === 'rk4') {
        y = this.rungeKutta4(equations, t, y, stepSize, parameters);
      } else {
        y = this.euler(equations, t, y, stepSize, parameters);
      }

      t += stepSize;
    }

    return { time: timePoints, concentrations };
  }

  /**
   * Get ODE system for 1-compartment model
   */
  public getOneCompartmentIVSystem(params: Record<string, number>, dose: number = 100): ODESystem {
    const CL = params.CL || 2.0;
    const V = params.V || 10.0;
    const ke = CL / V;

    return {
      equations: (t: number, y: number[], p: Record<string, number>) => {
        const [A1] = y; // Amount in central compartment
        return [-ke * A1]; // dA1/dt
      },
      initialConditions: [dose], // Initial dose in central compartment
      parameters: { CL, V, ke }
    };
  }

  /**
   * Get ODE system for 1-compartment oral model
   */
  public getOneCompartmentOralSystem(params: Record<string, number>, dose: number = 100): ODESystem {
    const CL = params.CL || 2.0;
    const V = params.V || 10.0;
    const ka = params.ka || 1.0;
    const F = params.F || 1.0;
    const ke = CL / V;

    return {
      equations: (t: number, y: number[], p: Record<string, number>) => {
        const [Aa, Ac] = y; // Amount in absorption and central compartments
        return [
          -ka * Aa,           // dAa/dt
          ka * Aa - ke * Ac   // dAc/dt
        ];
      },
      initialConditions: [F * dose, 0], // Initial dose in absorption compartment
      parameters: { CL, V, ka, F, ke }
    };
  }

  /**
   * Get ODE system for 1-compartment combined IV/oral model
   */
  public getOneCompartmentCombinedSystem(params: Record<string, number>, dose: number = 100, route: 'iv' | 'oral' = 'iv'): ODESystem {
    const CL = params.CL || 2.0;
    const V = params.V || 10.0;
    const ka = params.ka || 1.0;
    const F = params.F || 1.0;
    const ke = CL / V;

    if (route === 'iv') {
      return {
        equations: (t: number, y: number[], p: Record<string, number>) => {
          const [Ac] = y; // Amount in central compartment
          return [-ke * Ac]; // dAc/dt
        },
        initialConditions: [dose], // Initial dose in central compartment
        parameters: { CL, V, ke }
      };
    } else {
      return {
        equations: (t: number, y: number[], p: Record<string, number>) => {
          const [Aa, Ac] = y; // Amount in absorption and central compartments
          return [
            -ka * Aa,           // dAa/dt
            ka * Aa - ke * Ac   // dAc/dt
          ];
        },
        initialConditions: [F * dose, 0], // Initial dose in absorption compartment
        parameters: { CL, V, ka, F, ke }
      };
    }
  }

  /**
   * Get ODE system for transit compartment model
   */
  public getTransitCompartmentSystem(params: Record<string, number>, dose: number = 100): ODESystem {
    const CL = params.CL || 2.0;
    const V = params.V || 10.0;
    const ktr = params.ktr || 1.0;
    const n = Math.round(params.n || 3);
    const F = params.F || 1.0;
    const ke = CL / V;

    return {
      equations: (t: number, y: number[], p: Record<string, number>) => {
        const dydt = new Array(n + 1).fill(0);
        
        // Transit compartments
        dydt[0] = -ktr * y[0]; // First transit compartment
        for (let i = 1; i < n; i++) {
          dydt[i] = ktr * y[i-1] - ktr * y[i];
        }
        // Central compartment
        dydt[n] = ktr * y[n-1] - ke * y[n];
        
        return dydt;
      },
      initialConditions: [F * dose, ...new Array(n).fill(0)], // Initial dose in first transit compartment
      parameters: { CL, V, ktr, n, F, ke }
    };
  }

  /**
   * Get ODE system for 2-compartment linear elimination model
   */
  public getTwoCompartmentLinearSystem(params: Record<string, number>, dose: number = 100): ODESystem {
    const CL = params.CL || 2.0;
    const V1 = params.V1 || 5.0;
    const V2 = params.V2 || 15.0;
    const Q = params.Q || 1.0;

    const k10 = CL / V1;
    const k12 = Q / V1;
    const k21 = Q / V2;

    return {
      equations: (t: number, y: number[], p: Record<string, number>) => {
        const [A1, A2] = y; // Amounts in central and peripheral compartments
        return [
          -k10 * A1 - k12 * A1 + k21 * A2, // dA1/dt
          k12 * A1 - k21 * A2               // dA2/dt
        ];
      },
      initialConditions: [dose, 0], // Initial dose in central, none in peripheral
      parameters: { CL, V1, V2, Q, k10, k12, k21 }
    };
  }

  /**
   * Get ODE system for Michaelis-Menten elimination model
   */
  public getMichaelisMentenSystem(params: Record<string, number>, dose: number = 100): ODESystem {
    const V = params.V || 10.0;
    const Vmax = params.Vmax || 50.0;
    const Km = params.Km || 5.0;

    return {
      equations: (t: number, y: number[], p: Record<string, number>) => {
        const [A] = y; // Amount in central compartment
        const C = A / V; // Concentration
        
        // Michaelis-Menten elimination
        const eliminationRate = (Vmax * C) / (Km + C);
        
        return [-eliminationRate * V]; // dA/dt
      },
      initialConditions: [dose],
      parameters: { V, Vmax, Km }
    };
  }

  /**
   * Get ODE system for combined linear and Michaelis-Menten elimination model
   */
  public getCombinedEliminationSystem(params: Record<string, number>, dose: number = 100): ODESystem {
    const V = params.V || 10.0;
    const CL = params.CL || 1.0;
    const Vmax = params.Vmax || 50.0;
    const Km = params.Km || 5.0;

    return {
      equations: (t: number, y: number[], p: Record<string, number>) => {
        const [A] = y; // Amount in central compartment
        const C = A / V; // Concentration
        
        // Linear elimination
        const linearRate = CL * C;
        
        // Michaelis-Menten elimination
        const nonlinearRate = (Vmax * C) / (Km + C);
        
        return [-(linearRate + nonlinearRate) * V]; // dA/dt
      },
      initialConditions: [dose],
      parameters: { V, CL, Vmax, Km }
    };
  }

  /**
   * Get ODE system for 2-compartment model
   */
  public getTwoCompartmentSystem(params: Record<string, number>, dose: number = 100): ODESystem {
    const CL = params.CL || 2.0;
    const V1 = params.V1 || 5.0;
    const V2 = params.V2 || 15.0;
    const Q = params.Q || 1.0;

    const k10 = CL / V1;
    const k12 = Q / V1;
    const k21 = Q / V2;

    return {
      equations: (t: number, y: number[], p: Record<string, number>) => {
        const [A1, A2] = y; // Amounts in central and peripheral compartments
        return [
          -k10 * A1 - k12 * A1 + k21 * A2, // dA1/dt
          k12 * A1 - k21 * A2               // dA2/dt
        ];
      },
      initialConditions: [dose, 0], // Initial dose in central, none in peripheral
      parameters: { CL, V1, V2, Q, k10, k12, k21 }
    };
  }

  /**
   * Get ODE system for 3-compartment model
   */
  public getThreeCompartmentSystem(params: Record<string, number>, dose: number = 100): ODESystem {
    const CL = params.CL || 2.0;
    const V1 = params.V1 || 5.0;
    const V2 = params.V2 || 10.0;
    const V3 = params.V3 || 20.0;
    const Q2 = params.Q2 || 1.0;
    const Q3 = params.Q3 || 0.5;

    const k10 = CL / V1;
    const k12 = Q2 / V1;
    const k21 = Q2 / V2;
    const k13 = Q3 / V1;
    const k31 = Q3 / V3;

    return {
      equations: (t: number, y: number[], p: Record<string, number>) => {
        const [A1, A2, A3] = y; // Amounts in central and two peripheral compartments
        return [
          -k10 * A1 - k12 * A1 + k21 * A2 - k13 * A1 + k31 * A3, // dA1/dt
          k12 * A1 - k21 * A2,                                     // dA2/dt
          k13 * A1 - k31 * A3                                      // dA3/dt
        ];
      },
      initialConditions: [dose, 0, 0], // Initial dose in central, none in peripherals
      parameters: { CL, V1, V2, V3, Q2, Q3, k10, k12, k21, k13, k31 }
    };
  }

  /**
   * Get ODE system for TMDD model
   */
  public getTMDDSystem(params: Record<string, number>, dose: number = 100): ODESystem {
    const kel = params.kel || 0.1;
    const V = params.V || 5.0;
    const kon = params.kon || 0.1;
    const koff = params.koff || 0.01;
    const kint = params.kint || 0.1;
    const R0 = params.R0 || 1.0;
    const kdeg = params.kdeg || 0.01;
    const ksyn = kdeg * R0; // At steady state: ksyn = kdeg * R0

    return {
      equations: (t: number, y: number[], p: Record<string, number>) => {
        const [L, R, P] = y; // Free drug, free target, drug-target complex
        
        // Full TMDD model
        const dLdt = -kel * L - kon * L * R + koff * P;
        const dRdt = ksyn - kdeg * R - kon * L * R + koff * P;
        const dPdt = kon * L * R - koff * P - kint * P;
        
        return [dLdt, dRdt, dPdt];
      },
      initialConditions: [dose/V, R0, 0], // Initial free drug, free target, and complex
      parameters: { kel, V, kon, koff, kint, R0, kdeg, ksyn }
    };
  }

  /**
   * Get ODE system for TMDD with oral absorption model
   */
  public getTMDDOralSystem(params: Record<string, number>, dose: number = 100): ODESystem {
    const kel = params.kel || 0.1;
    const V = params.V || 5.0;
    const ka = params.ka || 0.5;
    const F = params.F || 0.8;
    const kon = params.kon || 0.1;
    const koff = params.koff || 0.01;
    const kint = params.kint || 0.1;
    const R0 = params.R0 || 1.0;
    const kdeg = params.kdeg || 0.01;
    const ksyn = kdeg * R0; // At steady state: ksyn = kdeg * R0

    return {
      equations: (t: number, y: number[], p: Record<string, number>) => {
        const [A, L, R, P] = y; // Absorption compartment, free drug, free target, drug-target complex
        
        // TMDD model with oral absorption
        const dAdt = -ka * A;
        const dLdt = ka * A / V - kel * L - kon * L * R + koff * P;
        const dRdt = ksyn - kdeg * R - kon * L * R + koff * P;
        const dPdt = kon * L * R - koff * P - kint * P;
        
        return [dAdt, dLdt, dRdt, dPdt];
      },
      initialConditions: [F * dose, 0, R0, 0], // Initial amount in absorption compartment, free drug, free target, and complex
      parameters: { kel, V, ka, F, kon, koff, kint, R0, kdeg, ksyn }
    };
  }

  /**
   * Get ODE system for TMDD with Michaelis-Menten elimination model
   */
  public getTMDDMMSystem(params: Record<string, number>, dose: number = 100): ODESystem {
    const kel = params.kel || 0.1;
    const V = params.V || 5.0;
    const Vmax = params.Vmax || 10.0;
    const Km = params.Km || 1.0;
    const kon = params.kon || 0.1;
    const koff = params.koff || 0.01;
    const kint = params.kint || 0.1;
    const R0 = params.R0 || 1.0;
    const kdeg = params.kdeg || 0.01;
    const ksyn = kdeg * R0; // At steady state: ksyn = kdeg * R0

    return {
      equations: (t: number, y: number[], p: Record<string, number>) => {
        const [L, R, P] = y; // Free drug, free target, drug-target complex
        
        // TMDD model with additional Michaelis-Menten elimination
        const mmElimination = (Vmax * L) / (Km + L);
        const dLdt = -kel * L - mmElimination - kon * L * R + koff * P;
        const dRdt = ksyn - kdeg * R - kon * L * R + koff * P;
        const dPdt = kon * L * R - koff * P - kint * P;
        
        return [dLdt, dRdt, dPdt];
      },
      initialConditions: [dose/V, R0, 0], // Initial free drug, free target, and complex
      parameters: { kel, V, Vmax, Km, kon, koff, kint, R0, kdeg, ksyn }
    };
  }

  /**
   * Get ODE system for 2-compartment IV model
   */
  public getTwoCompartmentIVSystem(params: Record<string, number>, dose: number = 100): ODESystem {
    const CL = params.CL || 2.0;
    const V1 = params.V1 || 5.0;
    const V2 = params.V2 || 15.0;
    const Q = params.Q || 1.0;

    const k10 = CL / V1;
    const k12 = Q / V1;
    const k21 = Q / V2;

    return {
      equations: (t: number, y: number[], p: Record<string, number>) => {
        const [A1, A2] = y; // Amounts in central and peripheral compartments
        return [
          -k10 * A1 - k12 * A1 + k21 * A2, // dA1/dt
          k12 * A1 - k21 * A2               // dA2/dt
        ];
      },
      initialConditions: [dose, 0], // Initial dose in central, none in peripheral
      parameters: { CL, V1, V2, Q, k10, k12, k21 }
    };
  }

  /**
   * Get ODE system for 2-compartment oral model
   */
  public getTwoCompartmentOralSystem(params: Record<string, number>, dose: number = 100): ODESystem {
    const CL = params.CL || 2.0;
    const V1 = params.V1 || 5.0;
    const V2 = params.V2 || 15.0;
    const Q = params.Q || 1.0;
    const ka = params.ka || 1.0;
    const F = params.F || 1.0;

    const k10 = CL / V1;
    const k12 = Q / V1;
    const k21 = Q / V2;

    return {
      equations: (t: number, y: number[], p: Record<string, number>) => {
        const [Aa, A1, A2] = y; // Amounts in absorption, central, and peripheral compartments
        return [
          -ka * Aa,                                    // dAa/dt
          ka * Aa - k10 * A1 - k12 * A1 + k21 * A2,   // dA1/dt
          k12 * A1 - k21 * A2                         // dA2/dt
        ];
      },
      initialConditions: [F * dose, 0, 0], // Initial dose in absorption compartment
      parameters: { CL, V1, V2, Q, ka, F, k10, k12, k21 }
    };
  }

  /**
   * Get ODE system for 2-compartment combined IV/oral model
   */
  public getTwoCompartmentCombinedSystem(params: Record<string, number>, dose: number = 100, route: 'iv' | 'oral' = 'iv'): ODESystem {
    if (route === 'iv') {
      return this.getTwoCompartmentIVSystem(params, dose);
    } else {
      return this.getTwoCompartmentOralSystem(params, dose);
    }
  }

  /**
   * Get ODE system for 2-compartment transit model
   */
  public getTwoCompartmentTransitSystem(params: Record<string, number>, dose: number = 100): ODESystem {
    const CL = params.CL || 2.0;
    const V1 = params.V1 || 5.0;
    const V2 = params.V2 || 15.0;
    const Q = params.Q || 1.0;
    const ktr = params.ktr || 1.0;
    const n = Math.round(params.n || 3);
    const F = params.F || 1.0;

    const k10 = CL / V1;
    const k12 = Q / V1;
    const k21 = Q / V2;

    return {
      equations: (t: number, y: number[], p: Record<string, number>) => {
        const dydt = new Array(n + 2).fill(0);
        
        // Transit compartments
        dydt[0] = -ktr * y[0]; // First transit compartment
        for (let i = 1; i < n; i++) {
          dydt[i] = ktr * y[i-1] - ktr * y[i];
        }
        // Central compartment
        dydt[n] = ktr * y[n-1] - k10 * y[n] - k12 * y[n] + k21 * y[n+1];
        // Peripheral compartment
        dydt[n+1] = k12 * y[n] - k21 * y[n+1];
        
        return dydt;
      },
      initialConditions: [F * dose, ...new Array(n + 1).fill(0)], // Initial dose in first transit compartment
      parameters: { CL, V1, V2, Q, ktr, n, F, k10, k12, k21 }
    };
  }

  /**
   * Get ODE system for 2-compartment Michaelis-Menten model
   */
  public getTwoCompartmentMMSystem(params: Record<string, number>, dose: number = 100): ODESystem {
    const V1 = params.V1 || 5.0;
    const V2 = params.V2 || 15.0;
    const Q = params.Q || 1.0;
    const Vmax = params.Vmax || 50.0;
    const Km = params.Km || 5.0;

    const k12 = Q / V1;
    const k21 = Q / V2;

    return {
      equations: (t: number, y: number[], p: Record<string, number>) => {
        const [A1, A2] = y; // Amounts in central and peripheral compartments
        const C1 = A1 / V1; // Central concentration
        
        // Michaelis-Menten elimination from central compartment
        const eliminationRate = (Vmax * C1) / (Km + C1);
        
        return [
          -eliminationRate * V1 - k12 * A1 + k21 * A2, // dA1/dt
          k12 * A1 - k21 * A2                          // dA2/dt
        ];
      },
      initialConditions: [dose, 0],
      parameters: { V1, V2, Q, Vmax, Km, k12, k21 }
    };
  }

  /**
   * Get ODE system for 2-compartment combined elimination model
   */
  public getTwoCompartmentCombinedElimSystem(params: Record<string, number>, dose: number = 100): ODESystem {
    const CL = params.CL || 1.0;
    const V1 = params.V1 || 5.0;
    const V2 = params.V2 || 15.0;
    const Q = params.Q || 1.0;
    const Vmax = params.Vmax || 50.0;
    const Km = params.Km || 5.0;

    const k12 = Q / V1;
    const k21 = Q / V2;

    return {
      equations: (t: number, y: number[], p: Record<string, number>) => {
        const [A1, A2] = y; // Amounts in central and peripheral compartments
        const C1 = A1 / V1; // Central concentration
        
        // Linear elimination
        const linearRate = CL * C1;
        
        // Michaelis-Menten elimination
        const nonlinearRate = (Vmax * C1) / (Km + C1);
        
        return [
          -(linearRate + nonlinearRate) * V1 - k12 * A1 + k21 * A2, // dA1/dt
          k12 * A1 - k21 * A2                                       // dA2/dt
        ];
      },
      initialConditions: [dose, 0],
      parameters: { CL, V1, V2, Q, Vmax, Km, k12, k21 }
    };
  }

  /**
   * Get ODE system for 3-compartment IV model
   */
  public getThreeCompartmentIVSystem(params: Record<string, number>, dose: number = 100): ODESystem {
    const CL = params.CL || 2.0;
    const V1 = params.V1 || 5.0;
    const V2 = params.V2 || 10.0;
    const V3 = params.V3 || 20.0;
    const Q2 = params.Q2 || 1.0;
    const Q3 = params.Q3 || 0.5;

    const k10 = CL / V1;
    const k12 = Q2 / V1;
    const k21 = Q2 / V2;
    const k13 = Q3 / V1;
    const k31 = Q3 / V3;

    return {
      equations: (t: number, y: number[], p: Record<string, number>) => {
        const [A1, A2, A3] = y; // Amounts in central and two peripheral compartments
        return [
          -k10 * A1 - k12 * A1 + k21 * A2 - k13 * A1 + k31 * A3, // dA1/dt
          k12 * A1 - k21 * A2,                                     // dA2/dt
          k13 * A1 - k31 * A3                                      // dA3/dt
        ];
      },
      initialConditions: [dose, 0, 0], // Initial dose in central, none in peripherals
      parameters: { CL, V1, V2, V3, Q2, Q3, k10, k12, k21, k13, k31 }
    };
  }

  /**
   * Get ODE system for 3-compartment oral model
   */
  public getThreeCompartmentOralSystem(params: Record<string, number>, dose: number = 100): ODESystem {
    const CL = params.CL || 2.0;
    const V1 = params.V1 || 5.0;
    const V2 = params.V2 || 10.0;
    const V3 = params.V3 || 20.0;
    const Q2 = params.Q2 || 1.0;
    const Q3 = params.Q3 || 0.5;
    const ka = params.ka || 1.0;
    const F = params.F || 1.0;

    const k10 = CL / V1;
    const k12 = Q2 / V1;
    const k21 = Q2 / V2;
    const k13 = Q3 / V1;
    const k31 = Q3 / V3;

    return {
      equations: (t: number, y: number[], p: Record<string, number>) => {
        const [Aa, A1, A2, A3] = y; // Amounts in absorption, central, and two peripheral compartments
        return [
          -ka * Aa,                                                      // dAa/dt
          ka * Aa - k10 * A1 - k12 * A1 + k21 * A2 - k13 * A1 + k31 * A3, // dA1/dt
          k12 * A1 - k21 * A2,                                           // dA2/dt
          k13 * A1 - k31 * A3                                            // dA3/dt
        ];
      },
      initialConditions: [F * dose, 0, 0, 0], // Initial dose in absorption compartment
      parameters: { CL, V1, V2, V3, Q2, Q3, ka, F, k10, k12, k21, k13, k31 }
    };
  }

  /**
   * Get ODE system for 3-compartment combined IV/oral model
   */
  public getThreeCompartmentCombinedSystem(params: Record<string, number>, dose: number = 100, route: 'iv' | 'oral' = 'iv'): ODESystem {
    if (route === 'iv') {
      return this.getThreeCompartmentIVSystem(params, dose);
    } else {
      return this.getThreeCompartmentOralSystem(params, dose);
    }
  }

  /**
   * Get ODE system for 3-compartment transit model
   */
  public getThreeCompartmentTransitSystem(params: Record<string, number>, dose: number = 100): ODESystem {
    const CL = params.CL || 2.0;
    const V1 = params.V1 || 5.0;
    const V2 = params.V2 || 10.0;
    const V3 = params.V3 || 20.0;
    const Q2 = params.Q2 || 1.0;
    const Q3 = params.Q3 || 0.5;
    const ktr = params.ktr || 1.0;
    const n = Math.round(params.n || 3);
    const F = params.F || 1.0;

    const k10 = CL / V1;
    const k12 = Q2 / V1;
    const k21 = Q2 / V2;
    const k13 = Q3 / V1;
    const k31 = Q3 / V3;

    return {
      equations: (t: number, y: number[], p: Record<string, number>) => {
        const dydt = new Array(n + 3).fill(0);
        
        // Transit compartments
        dydt[0] = -ktr * y[0]; // First transit compartment
        for (let i = 1; i < n; i++) {
          dydt[i] = ktr * y[i-1] - ktr * y[i];
        }
        // Central compartment
        dydt[n] = ktr * y[n-1] - k10 * y[n] - k12 * y[n] + k21 * y[n+1] - k13 * y[n] + k31 * y[n+2];
        // First peripheral compartment
        dydt[n+1] = k12 * y[n] - k21 * y[n+1];
        // Second peripheral compartment
        dydt[n+2] = k13 * y[n] - k31 * y[n+2];
        
        return dydt;
      },
      initialConditions: [F * dose, ...new Array(n + 2).fill(0)], // Initial dose in first transit compartment
      parameters: { CL, V1, V2, V3, Q2, Q3, ktr, n, F, k10, k12, k21, k13, k31 }
    };
  }

  /**
   * Get ODE system for 3-compartment Michaelis-Menten model
   */
  public getThreeCompartmentMMSystem(params: Record<string, number>, dose: number = 100): ODESystem {
    const V1 = params.V1 || 5.0;
    const V2 = params.V2 || 10.0;
    const V3 = params.V3 || 20.0;
    const Q2 = params.Q2 || 1.0;
    const Q3 = params.Q3 || 0.5;
    const Vmax = params.Vmax || 50.0;
    const Km = params.Km || 5.0;

    const k12 = Q2 / V1;
    const k21 = Q2 / V2;
    const k13 = Q3 / V1;
    const k31 = Q3 / V3;

    return {
      equations: (t: number, y: number[], p: Record<string, number>) => {
        const [A1, A2, A3] = y; // Amounts in central and two peripheral compartments
        const C1 = A1 / V1; // Central concentration
        
        // Michaelis-Menten elimination from central compartment
        const eliminationRate = (Vmax * C1) / (Km + C1);
        
        return [
          -eliminationRate * V1 - k12 * A1 + k21 * A2 - k13 * A1 + k31 * A3, // dA1/dt
          k12 * A1 - k21 * A2,                                                 // dA2/dt
          k13 * A1 - k31 * A3                                                  // dA3/dt
        ];
      },
      initialConditions: [dose, 0, 0],
      parameters: { V1, V2, V3, Q2, Q3, Vmax, Km, k12, k21, k13, k31 }
    };
  }

  /**
   * Get ODE system for 3-compartment combined elimination model
   */
  public getThreeCompartmentCombinedElimSystem(params: Record<string, number>, dose: number = 100): ODESystem {
    const CL = params.CL || 1.0;
    const V1 = params.V1 || 5.0;
    const V2 = params.V2 || 10.0;
    const V3 = params.V3 || 20.0;
    const Q2 = params.Q2 || 1.0;
    const Q3 = params.Q3 || 0.5;
    const Vmax = params.Vmax || 50.0;
    const Km = params.Km || 5.0;

    const k12 = Q2 / V1;
    const k21 = Q2 / V2;
    const k13 = Q3 / V1;
    const k31 = Q3 / V3;

    return {
      equations: (t: number, y: number[], p: Record<string, number>) => {
        const [A1, A2, A3] = y; // Amounts in central and two peripheral compartments
        const C1 = A1 / V1; // Central concentration
        
        // Linear elimination
        const linearRate = CL * C1;
        
        // Michaelis-Menten elimination
        const nonlinearRate = (Vmax * C1) / (Km + C1);
        
        return [
          -(linearRate + nonlinearRate) * V1 - k12 * A1 + k21 * A2 - k13 * A1 + k31 * A3, // dA1/dt
          k12 * A1 - k21 * A2,                                                             // dA2/dt
          k13 * A1 - k31 * A3                                                              // dA3/dt
        ];
      },
      initialConditions: [dose, 0, 0],
      parameters: { CL, V1, V2, V3, Q2, Q3, Vmax, Km, k12, k21, k13, k31 }
    };
  }

  /**
   * Get appropriate ODE system based on model ID
   */
  public getModelSystem(modelId: string, params: Record<string, number>, dose: number = 100): ODESystem {
    switch (modelId) {
      case '1-compartment-iv':
        return this.getOneCompartmentIVSystem(params, dose);
      case '1-compartment-oral':
        return this.getOneCompartmentOralSystem(params, dose);
      case '1-compartment-combined':
        return this.getOneCompartmentCombinedSystem(params, dose);
      case 'transit-compartment':
        return this.getTransitCompartmentSystem(params, dose);
      case '2-compartment-iv':
        return this.getTwoCompartmentIVSystem(params, dose);
      case '2-compartment-oral':
        return this.getTwoCompartmentOralSystem(params, dose);
      case '2-compartment-combined':
        return this.getTwoCompartmentCombinedSystem(params, dose);
      case '2-compartment-transit':
        return this.getTwoCompartmentTransitSystem(params, dose);
      case '2-compartment':
        return this.getTwoCompartmentSystem(params, dose);
      case '2-compartment-linear':
        return this.getTwoCompartmentLinearSystem(params, dose);
      case '2-compartment-mm':
        return this.getTwoCompartmentMMSystem(params, dose);
      case '2-compartment-combined-elim':
        return this.getTwoCompartmentCombinedElimSystem(params, dose);
      case '3-compartment-iv':
        return this.getThreeCompartmentIVSystem(params, dose);
      case '3-compartment-oral':
        return this.getThreeCompartmentOralSystem(params, dose);
      case '3-compartment-combined':
        return this.getThreeCompartmentCombinedSystem(params, dose);
      case '3-compartment-transit':
        return this.getThreeCompartmentTransitSystem(params, dose);
      case '3-compartment':
        return this.getThreeCompartmentSystem(params, dose);
      case '3-compartment-linear':
        return this.getThreeCompartmentSystem(params, dose); // Same as regular 3-compartment
      case '3-compartment-mm':
        return this.getThreeCompartmentMMSystem(params, dose);
      case '3-compartment-combined-elim':
        return this.getThreeCompartmentCombinedElimSystem(params, dose);
      case 'michaelis-menten':
        return this.getMichaelisMentenSystem(params, dose);
      case 'combined-elimination':
        return this.getCombinedEliminationSystem(params, dose);
      case 'tmdd':
        return this.getTMDDSystem(params, dose);
      case 'tmdd-oral':
        return this.getTMDDOralSystem(params, dose);
      case 'tmdd-mm':
        return this.getTMDDMMSystem(params, dose);
      default:
        return this.getOneCompartmentIVSystem(params, dose);
    }
  }

  /**
   * Solve model and return concentration-time profile
   */
  public solveModel(
    modelId: string, 
    params: Record<string, number>, 
    dose: number = 100,
    options: Partial<SolverOptions> = {}
  ): { time: number[], concentration: number[] } {
    const defaultOptions: SolverOptions = {
      tStart: 0,
      tEnd: 24,
      stepSize: 0.1,
      method: 'rk4'
    };

    const solverOptions = { ...defaultOptions, ...options };
    const system = this.getModelSystem(modelId, params, dose);
    const result = this.solve(system, solverOptions);

    // Extract central compartment concentration
    const volume = this.getCentralVolume(modelId, params);
    const concentration = result.concentrations.map(conc => conc[0] / volume);

    return {
      time: result.time,
      concentration
    };
  }

  /**
   * Get central volume for concentration calculation
   */
  private getCentralVolume(modelId: string, params: Record<string, number>): number {
    switch (modelId) {
      case '1-compartment-iv':
      case '1-compartment-oral':
      case '1-compartment-combined':
      case 'transit-compartment':
      case 'michaelis-menten':
      case 'combined-elimination':
        return params.V || 10.0;
      case '2-compartment-iv':
      case '2-compartment-oral':
      case '2-compartment-combined':
      case '2-compartment-transit':
      case '2-compartment':
      case '2-compartment-linear':
      case '2-compartment-mm':
      case '2-compartment-combined-elim':
      case '3-compartment-iv':
      case '3-compartment-oral':
      case '3-compartment-combined':
      case '3-compartment-transit':
      case '3-compartment':
      case '3-compartment-linear':
      case '3-compartment-mm':
      case '3-compartment-combined-elim':
        return params.V1 || 5.0;
      case 'tmdd':
        return params.V || 5.0;
      default:
        return 10.0;
    }
  }

  /**
   * Get central volume for concentration calculation with transit compartments
   */
  private getCentralVolumeTransit(modelId: string, params: Record<string, number>, compartmentIndex: number): number {
    if (modelId === 'transit-compartment') {
      const n = Math.round(params.n || 3);
      if (compartmentIndex === n) { // Central compartment is the last one
        return params.V || 10.0;
      }
      return 1; // Transit compartments don't contribute to concentration
    }
    return this.getCentralVolume(modelId, params);
  }
}