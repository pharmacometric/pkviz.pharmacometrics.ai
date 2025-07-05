export interface PharmacokineticModel {
  id: string;
  name: string;
  type: 'compartment' | 'physiological' | 'mechanism';
  compartments: number;
  category: string;
  description: string;
  longDescription: string;
  parameters: Parameter[];
  equations: string[];
  applications: string[];
  advantages: string[];
  limitations: string[];
  references: string[];
  extendedDescription: string[];
}

export interface Parameter {
  symbol: string;
  name: string;
  description: string;
  unit: string;
  typicalRange: string;
  estimable: boolean;
}

export interface ModelStructure {
  compartments: Compartment[];
  connections: Connection[];
}

export interface Compartment {
  id: string;
  name: string;
  volume: string;
  position: { x: number; y: number };
}

export interface Connection {
  from: string;
  to: string;
  rate: string;
  type: 'elimination' | 'distribution' | 'absorption';
}

export interface PlotData {
  time: number[];
  concentration: number[];
  title: string;
  xLabel: string;
  yLabel: string;
}

export interface PatientParameters {
  dose: number;
  numberOfDoses: number;
  frequency: number; // hours between doses
  parameters: Record<string, number>;
}

export interface PlotSettings {
  title: string;
  xAxisTitle: string;
  yAxisTitle: string;
  fontSize: number;
  xAxisMin: number;
  xAxisMax: number;
  yAxisMin: number;
  yAxisMax: number;
  width: number;
  height: number;
  patient1Color: string;
  patient2Color: string;
}