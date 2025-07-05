export interface CompartmentNode {
  id: string;
  name: string;
  x: number;
  y: number;
  radius: number;
  color: string;
  volume?: string;
}

export interface ConnectionEdge {
  from: string;
  to: string;
  rate: string;
  type: 'elimination' | 'distribution' | 'absorption';
  bidirectional?: boolean;
}

export interface ModelStructure {
  compartments: CompartmentNode[];
  connections: ConnectionEdge[];
  title: string;
}

interface StructureSettings {
  compartmentColor: string;
  textColor: string;
  lineColor: string;
  backgroundColor: string;
  fontSize: number;
}

export class ModelStructureRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private isDark: boolean;
  private settings: StructureSettings;

  constructor(canvas: HTMLCanvasElement, isDark: boolean = false, settings?: StructureSettings) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.isDark = isDark;
    this.settings = settings || {
      compartmentColor: '#3b82f6',
      textColor: isDark ? '#ffffff' : '#000000',
      lineColor: '#ef4444',
      backgroundColor: isDark ? '#1f2937' : '#ffffff',
      fontSize: 14
    };
    this.setupCanvas();
  }

  private setupCanvas(): void {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    
    this.ctx.scale(dpr, dpr);
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = rect.height + 'px';
  }

  public render(structure: ModelStructure): void {
    this.clear();
    this.drawTitle(structure.title);
    this.drawConnections(structure.connections, structure.compartments);
    this.drawCompartments(structure.compartments);
  }

  private clear(): void {
    this.ctx.fillStyle = this.settings.backgroundColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private drawTitle(title: string): void {
    this.ctx.font = `bold ${this.settings.fontSize + 4}px Inter, sans-serif`;
    this.ctx.fillStyle = this.settings.textColor;
    this.ctx.textAlign = 'center';
    this.ctx.fillText(title, this.canvas.width / 2, 25);
  }

  private drawCompartments(compartments: CompartmentNode[]): void {
    compartments.forEach(comp => {
      // Draw compartment circle
      this.ctx.beginPath();
      this.ctx.arc(comp.x, comp.y, comp.radius, 0, 2 * Math.PI);
      this.ctx.fillStyle = this.settings.compartmentColor;
      this.ctx.fill();
      this.ctx.strokeStyle = this.settings.lineColor;
      this.ctx.lineWidth = 2;
      this.ctx.stroke();

      // Draw compartment name
      this.ctx.font = `bold ${this.settings.fontSize}px Inter, sans-serif`;
      this.ctx.fillStyle = this.settings.textColor;
      this.ctx.textAlign = 'center';
      this.ctx.fillText(comp.name, comp.x, comp.y + 5);

      // Draw volume if provided
      if (comp.volume) {
        this.ctx.font = `${this.settings.fontSize - 2}px Inter, sans-serif`;
        this.ctx.fillStyle = this.settings.textColor;
        this.ctx.fillText(comp.volume, comp.x, comp.y + comp.radius + 20);
      }
    });
  }

  private drawConnections(connections: ConnectionEdge[], compartments: CompartmentNode[]): void {
    connections.forEach(conn => {
      const fromComp = compartments.find(c => c.id === conn.from);
      const toComp = compartments.find(c => c.id === conn.to);
      
      if (!fromComp || !toComp) return;

      if (conn.type === 'elimination') {
        this.drawEliminationArrow(fromComp, conn.rate);
      } else {
        this.drawDistributionArrow(fromComp, toComp, conn.rate, conn.bidirectional);
      }
    });
  }

  private drawDistributionArrow(
    from: CompartmentNode, 
    to: CompartmentNode, 
    rate: string, 
    bidirectional: boolean = false
  ): void {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const unitX = dx / distance;
    const unitY = dy / distance;

    // Calculate arrow start and end points (on circle edges)
    const startX = from.x + unitX * from.radius;
    const startY = from.y + unitY * from.radius;
    const endX = to.x - unitX * to.radius;
    const endY = to.y - unitY * to.radius;

    // Draw arrow line
    this.ctx.beginPath();
    this.ctx.moveTo(startX, startY);
    this.ctx.lineTo(endX, endY);
    this.ctx.strokeStyle = this.settings.lineColor;
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    // Draw arrowhead
    this.drawArrowhead(endX, endY, Math.atan2(dy, dx));

    if (bidirectional) {
      this.drawArrowhead(startX, startY, Math.atan2(-dy, -dx));
    }

    // Draw rate label
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    this.drawRateLabel(midX, midY, rate);
  }

  private drawEliminationArrow(comp: CompartmentNode, rate: string): void {
    const startX = comp.x;
    const startY = comp.y + comp.radius;
    const endX = comp.x;
    const endY = comp.y + comp.radius + 40;

    // Draw arrow line
    this.ctx.beginPath();
    this.ctx.moveTo(startX, startY);
    this.ctx.lineTo(endX, endY);
    this.ctx.strokeStyle = this.settings.lineColor;
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    // Draw arrowhead
    this.drawArrowhead(endX, endY, Math.PI / 2);

    // Draw rate label
    this.drawRateLabel(endX + 15, endY - 10, rate);
  }

  private drawArrowhead(x: number, y: number, angle: number): void {
    const headLength = 10;
    const headAngle = Math.PI / 6;

    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(
      x - headLength * Math.cos(angle - headAngle),
      y - headLength * Math.sin(angle - headAngle)
    );
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(
      x - headLength * Math.cos(angle + headAngle),
      y - headLength * Math.sin(angle + headAngle)
    );
    this.ctx.stroke();
  }

  private drawRateLabel(x: number, y: number, rate: string): void {
    // Draw background rectangle
    this.ctx.font = `${this.settings.fontSize - 2}px Inter, sans-serif`;
    const metrics = this.ctx.measureText(rate);
    const padding = 4;
    
    this.ctx.fillStyle = this.settings.backgroundColor;
    this.ctx.fillRect(
      x - metrics.width / 2 - padding,
      y - 8 - padding,
      metrics.width + 2 * padding,
      16 + 2 * padding
    );

    // Draw text
    this.ctx.fillStyle = this.settings.textColor;
    this.ctx.textAlign = 'center';
    this.ctx.fillText(rate, x, y + 4);
  }

  public getModelStructure(modelId: string): ModelStructure {
    switch (modelId) {
      case '1-compartment':
        return this.getOneCompartmentStructure();
      case '2-compartment':
        return this.getTwoCompartmentStructure();
      case '3-compartment':
        return this.getThreeCompartmentStructure();
      case 'tmdd':
        return this.getTMDDStructure();
      default:
        return this.getOneCompartmentStructure();
    }
  }

  private getOneCompartmentStructure(): ModelStructure {
    return {
      title: '1-Compartment Model',
      compartments: [
        {
          id: 'central',
          name: 'Central',
          x: 250,
          y: 150,
          radius: 50,
          color: this.settings.compartmentColor,
          volume: 'V'
        }
      ],
      connections: [
        {
          from: 'central',
          to: 'elimination',
          rate: 'CL',
          type: 'elimination'
        }
      ]
    };
  }

  private getTwoCompartmentStructure(): ModelStructure {
    return {
      title: '2-Compartment Model',
      compartments: [
        {
          id: 'central',
          name: 'Central',
          x: 180,
          y: 150,
          radius: 50,
          color: this.settings.compartmentColor,
          volume: 'V₁'
        },
        {
          id: 'peripheral',
          name: 'Peripheral',
          x: 320,
          y: 150,
          radius: 45,
          color: '#10b981',
          volume: 'V₂'
        }
      ],
      connections: [
        {
          from: 'central',
          to: 'elimination',
          rate: 'CL',
          type: 'elimination'
        },
        {
          from: 'central',
          to: 'peripheral',
          rate: 'Q',
          type: 'distribution',
          bidirectional: true
        }
      ]
    };
  }

  private getThreeCompartmentStructure(): ModelStructure {
    return {
      title: '3-Compartment Model',
      compartments: [
        {
          id: 'central',
          name: 'Central',
          x: 250,
          y: 150,
          radius: 50,
          color: this.settings.compartmentColor,
          volume: 'V₁'
        },
        {
          id: 'peripheral1',
          name: 'Peripheral 1',
          x: 380,
          y: 100,
          radius: 40,
          color: '#10b981',
          volume: 'V₂'
        },
        {
          id: 'peripheral2',
          name: 'Peripheral 2',
          x: 380,
          y: 200,
          radius: 40,
          color: '#8b5cf6',
          volume: 'V₃'
        }
      ],
      connections: [
        {
          from: 'central',
          to: 'elimination',
          rate: 'CL',
          type: 'elimination'
        },
        {
          from: 'central',
          to: 'peripheral1',
          rate: 'Q₂',
          type: 'distribution',
          bidirectional: true
        },
        {
          from: 'central',
          to: 'peripheral2',
          rate: 'Q₃',
          type: 'distribution',
          bidirectional: true
        }
      ]
    };
  }

  private getTMDDStructure(): ModelStructure {
    return {
      title: 'Target-Mediated Drug Disposition',
      compartments: [
        {
          id: 'central',
          name: 'Central C₁',
          x: 120,
          y: 150,
          radius: 50,
          color: this.settings.compartmentColor,
          volume: 'V'
        },
        {
          id: 'receptor',
          name: 'Receptor',
          x: 280,
          y: 150,
          radius: 40,
          color: '#8b5cf6',
          volume: 'R'
        },
        {
          id: 'complex',
          name: 'LR Complex',
          x: 420,
          y: 150,
          radius: 40,
          color: '#6b7280',
          volume: 'LR'
        }
      ],
      connections: [
        {
          from: 'central',
          to: 'elimination',
          rate: 'Kel',
          type: 'elimination'
        },
        {
          from: 'central',
          to: 'receptor',
          rate: 'Kon',
          type: 'distribution',
          bidirectional: false
        },
        {
          from: 'receptor',
          to: 'complex',
          rate: 'Koff',
          type: 'distribution',
          bidirectional: false
        },
        {
          from: 'complex',
          to: 'elimination',
          rate: 'Kdeg',
          type: 'elimination'
        }
      ]
    };
  }

  public updateSettings(isDark: boolean, settings?: StructureSettings): void {
    this.isDark = isDark;
    if (settings) {
      this.settings = settings;
    }
  }
}