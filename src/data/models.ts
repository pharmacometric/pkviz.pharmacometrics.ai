import { PharmacokineticModel } from '../types';

export const pharmacokineticModels: PharmacokineticModel[] = [
  {
    id: '1-compartment-iv',
    name: '1-Compartment IV Model',
    type: 'compartment',
    compartments: 1,
    category: 'Intravenous',
    description: 'Simple IV model with instantaneous distribution and first-order elimination',
    longDescription: 'The one-compartment intravenous model assumes instantaneous distribution throughout the body with first-order elimination kinetics. This model is appropriate for drugs administered intravenously that have rapid distribution.',
    parameters: [
      {
        symbol: 'V',
        name: 'Volume of Distribution',
        description: 'Apparent volume in which the drug is distributed',
        unit: 'L or L/kg',
        typicalRange: '0.1 - 10 L/kg',
        estimable: true
      },
      {
        symbol: 'CL',
        name: 'Clearance',
        description: 'Volume of plasma cleared of drug per unit time',
        unit: 'L/h or L/h/kg',
        typicalRange: '0.01 - 5 L/h/kg',
        estimable: true
      },
      {
        symbol: 'ke',
        name: 'Elimination Rate Constant',
        description: 'First-order elimination rate constant',
        unit: 'h⁻¹',
        typicalRange: '0.1 - 2 h⁻¹',
        estimable: true
      }
    ],
    equations: [
      'dA/dt = -ke × A',
      'C(t) = (Dose/V) × e^(-ke×t)',
      'ke = CL/V',
      'AUC = Dose/CL'
    ],
    applications: [
      'IV bolus administration',
      'Rapid distribution drugs',
      'Simple PK analysis',
      'Bioequivalence studies'
    ],
    advantages: [
      'Simple mathematical description',
      'Few parameters to estimate',
      'Direct IV administration',
      'No absorption phase'
    ],
    limitations: [
      'Assumes instantaneous distribution',
      'Only for IV administration',
      'Cannot describe distribution phase',
      'May not capture complex elimination'
    ],
    references: [
      'Gibaldi M, Perrier D. Pharmacokinetics, 2nd ed. Marcel Dekker, 1982',
      'Shargel L, Yu ABC. Applied Biopharmaceutics & Pharmacokinetics, 7th ed. McGraw-Hill, 2016'
    ],
    extendedDescription: [
      'The one-compartment intravenous model represents the foundation of pharmacokinetic analysis for drugs administered directly into the systemic circulation. This model eliminates the complexity of absorption processes, focusing solely on distribution and elimination kinetics.',
      'For intravenous administration, the entire dose is immediately available in the central compartment, resulting in a monoexponential decline in plasma concentrations. This simplicity makes the model ideal for understanding basic pharmacokinetic principles and for drugs where distribution is rapid compared to elimination.',
      'Clinical applications include therapeutic drug monitoring for drugs like digoxin, aminoglycosides, and vancomycin when administered intravenously. The model is particularly useful for calculating loading doses and maintenance dosing regimens.',
      'Parameter estimation is straightforward using linear regression after logarithmic transformation of concentration data. The slope of the log-linear plot directly provides the elimination rate constant, while the y-intercept gives the initial concentration.',
      'This model serves as the basis for more complex pharmacokinetic models and is essential for understanding concepts like clearance, volume of distribution, and half-life in the context of intravenous drug administration.'
    ]
  },
  {
    id: '1-compartment-oral',
    name: '1-Compartment Oral Model',
    type: 'compartment',
    compartments: 1,
    category: 'Oral',
    description: 'Oral absorption model with first-order absorption and elimination',
    longDescription: 'The one-compartment oral model includes first-order absorption from the gastrointestinal tract followed by first-order elimination. This model describes the typical rise and fall pattern seen with oral dosing.',
    parameters: [
      {
        symbol: 'V',
        name: 'Volume of Distribution',
        description: 'Apparent volume in which the drug is distributed',
        unit: 'L or L/kg',
        typicalRange: '0.1 - 10 L/kg',
        estimable: true
      },
      {
        symbol: 'CL',
        name: 'Clearance',
        description: 'Volume of plasma cleared of drug per unit time',
        unit: 'L/h or L/h/kg',
        typicalRange: '0.01 - 5 L/h/kg',
        estimable: true
      },
      {
        symbol: 'ka',
        name: 'Absorption Rate Constant',
        description: 'First-order absorption rate constant',
        unit: 'h⁻¹',
        typicalRange: '0.1 - 5 h⁻¹',
        estimable: true
      },
      {
        symbol: 'F',
        name: 'Bioavailability',
        description: 'Fraction of dose that reaches systemic circulation',
        unit: 'fraction',
        typicalRange: '0.1 - 1.0',
        estimable: true
      }
    ],
    equations: [
      'dAa/dt = -ka × Aa',
      'dAc/dt = ka × Aa - ke × Ac',
      'C(t) = (F×Dose×ka)/(V×(ka-ke)) × (e^(-ke×t) - e^(-ka×t))',
      'Tmax = ln(ka/ke)/(ka-ke)'
    ],
    applications: [
      'Oral tablet formulations',
      'Immediate release dosage forms',
      'Bioavailability studies',
      'Food effect studies'
    ],
    advantages: [
      'Describes oral absorption',
      'Predicts time to peak concentration',
      'Accounts for bioavailability',
      'Suitable for most oral drugs'
    ],
    limitations: [
      'Assumes first-order absorption',
      'Single absorption site',
      'No lag time consideration',
      'May not fit complex absorption'
    ],
    references: [
      'Wagner JG. Fundamentals of Clinical Pharmacokinetics. Drug Intelligence Publications, 1975',
      'Rowland M, Tozer TN. Clinical Pharmacokinetics and Pharmacodynamics, 4th ed. Lippincott Williams & Wilkins, 2011'
    ],
    extendedDescription: [
      'The one-compartment oral model extends basic pharmacokinetic principles to include the absorption phase that occurs with oral drug administration. This model accounts for the sequential processes of drug dissolution, absorption across the gastrointestinal membrane, and subsequent distribution and elimination.',
      'The characteristic concentration-time profile shows an initial rise to a peak concentration (Cmax) at time Tmax, followed by a decline phase. The absorption rate constant (ka) determines how quickly the drug is absorbed, while the elimination rate constant (ke) controls the decline phase.',
      'Bioavailability (F) is a crucial parameter that accounts for incomplete absorption and first-pass metabolism. This parameter allows the model to predict systemic exposure from oral doses and is essential for bioequivalence assessments between different formulations.',
      'Clinical applications include dose optimization for oral medications, prediction of drug interactions affecting absorption, and formulation development. The model is widely used for drugs like acetaminophen, ibuprofen, and many cardiovascular medications.',
      'The flip-flop phenomenon can occur when absorption is slower than elimination (ka < ke), leading to apparent prolongation of the terminal half-life. Understanding this concept is crucial for proper interpretation of oral pharmacokinetic data.'
    ]
  },
  {
    id: '1-compartment-combined',
    name: '1-Compartment Combined IV/Oral Model',
    type: 'compartment',
    compartments: 1,
    category: 'Combined',
    description: 'Model supporting both IV and oral administration routes',
    longDescription: 'This flexible model can describe pharmacokinetics for both intravenous and oral administration, allowing for combination dosing regimens and route comparison studies.',
    parameters: [
      {
        symbol: 'V',
        name: 'Volume of Distribution',
        description: 'Apparent volume in which the drug is distributed',
        unit: 'L or L/kg',
        typicalRange: '0.1 - 10 L/kg',
        estimable: true
      },
      {
        symbol: 'CL',
        name: 'Clearance',
        description: 'Volume of plasma cleared of drug per unit time',
        unit: 'L/h or L/h/kg',
        typicalRange: '0.01 - 5 L/h/kg',
        estimable: true
      },
      {
        symbol: 'ka',
        name: 'Absorption Rate Constant',
        description: 'First-order absorption rate constant (oral only)',
        unit: 'h⁻¹',
        typicalRange: '0.1 - 5 h⁻¹',
        estimable: true
      },
      {
        symbol: 'F',
        name: 'Bioavailability',
        description: 'Fraction of oral dose reaching systemic circulation',
        unit: 'fraction',
        typicalRange: '0.1 - 1.0',
        estimable: true
      }
    ],
    equations: [
      'IV: dAc/dt = -ke × Ac',
      'Oral: dAa/dt = -ka × Aa, dAc/dt = ka × Aa - ke × Ac',
      'Combined dosing: superposition principle',
      'Route-specific bioavailability correction'
    ],
    applications: [
      'IV to oral conversion studies',
      'Combination dosing regimens',
      'Route comparison studies',
      'Hospital to home transitions'
    ],
    advantages: [
      'Flexible dosing routes',
      'Supports combination therapy',
      'Route-specific parameters',
      'Clinical transition modeling'
    ],
    limitations: [
      'Assumes same elimination for both routes',
      'Complex parameter estimation',
      'Requires route-specific data',
      'May need route-specific clearance'
    ],
    references: [
      'Benet LZ, et al. Pharmacokinetic basis for drug treatment. Raven Press, 1984',
      'Tozer TN, Rowland M. Introduction to Pharmacokinetics and Pharmacodynamics, 2nd ed. Lippincott Williams & Wilkins, 2006'
    ],
    extendedDescription: [
      'The combined IV/oral model provides flexibility for analyzing drugs that may be administered through multiple routes during treatment. This approach is particularly valuable in clinical settings where patients may transition from intravenous to oral therapy.',
      'The model maintains the same elimination parameters (clearance and volume) for both routes while allowing route-specific absorption parameters. This assumption is generally valid since elimination processes are independent of the administration route.',
      'Clinical applications include antibiotic therapy where patients start with IV administration in hospital and transition to oral therapy at home. The model helps optimize dosing during route transitions to maintain therapeutic concentrations.',
      'Bioavailability differences between routes are explicitly modeled, allowing for dose adjustments when switching administration methods. This is crucial for drugs with significant first-pass metabolism or absorption limitations.',
      'The superposition principle allows modeling of complex dosing regimens that combine both routes, such as IV loading doses followed by oral maintenance therapy. This flexibility makes the model valuable for real-world clinical scenarios.'
    ]
  },
  {
    id: 'transit-compartment',
    name: 'Transit Compartment Model',
    type: 'compartment',
    compartments: 1,
    category: 'Absorption',
    description: 'Model with transit compartments to describe delayed and variable absorption',
    longDescription: 'The transit compartment model uses a series of transit compartments to describe more realistic absorption kinetics, including lag times and variable absorption rates commonly seen with modified-release formulations.',
    parameters: [
      {
        symbol: 'V',
        name: 'Volume of Distribution',
        description: 'Apparent volume in which the drug is distributed',
        unit: 'L or L/kg',
        typicalRange: '0.1 - 10 L/kg',
        estimable: true
      },
      {
        symbol: 'CL',
        name: 'Clearance',
        description: 'Volume of plasma cleared of drug per unit time',
        unit: 'L/h or L/h/kg',
        typicalRange: '0.01 - 5 L/h/kg',
        estimable: true
      },
      {
        symbol: 'ktr',
        name: 'Transit Rate Constant',
        description: 'Rate constant for transit through absorption compartments',
        unit: 'h⁻¹',
        typicalRange: '0.1 - 2 h⁻¹',
        estimable: true
      },
      {
        symbol: 'n',
        name: 'Number of Transit Compartments',
        description: 'Number of transit compartments in absorption chain',
        unit: 'count',
        typicalRange: '1 - 10',
        estimable: true
      },
      {
        symbol: 'F',
        name: 'Bioavailability',
        description: 'Fraction of dose that reaches systemic circulation',
        unit: 'fraction',
        typicalRange: '0.1 - 1.0',
        estimable: true
      }
    ],
    equations: [
      'dA₁/dt = -ktr × A₁',
      'dAᵢ/dt = ktr × Aᵢ₋₁ - ktr × Aᵢ (i = 2 to n)',
      'dAc/dt = ktr × Aₙ - ke × Ac',
      'Mean absorption time = n/ktr'
    ],
    applications: [
      'Modified-release formulations',
      'Enteric-coated tablets',
      'Complex absorption profiles',
      'Formulation development'
    ],
    advantages: [
      'Flexible absorption modeling',
      'Describes lag times naturally',
      'Accounts for absorption variability',
      'Physiologically meaningful parameters'
    ],
    limitations: [
      'More complex than simple absorption',
      'Requires more data for estimation',
      'Parameter correlation issues',
      'May be overparameterized'
    ],
    references: [
      'Savic RM, et al. Implementation of a transit compartment model for describing drug absorption in pharmacokinetic studies. J Pharmacokinet Pharmacodyn, 2007',
      'Bergstrand M, et al. Prediction-corrected visual predictive checks for diagnosing nonlinear mixed-effects models. AAPS J, 2011'
    ],
    extendedDescription: [
      'The transit compartment model represents a significant advancement in absorption modeling by providing a mechanistic framework for describing complex absorption processes. Unlike simple first-order absorption, this model can capture lag times, variable absorption rates, and the effects of gastrointestinal transit.',
      'The model consists of a chain of transit compartments that drug must pass through before reaching the systemic circulation. Each compartment represents a step in the absorption process, such as dissolution, gastric emptying, intestinal transit, and membrane permeation.',
      'The number of transit compartments (n) and the transit rate constant (ktr) together determine the shape of the absorption profile. More compartments create longer lag times and more gradual absorption, while the rate constant controls the overall speed of the process.',
      'This model is particularly valuable for modified-release formulations where absorption occurs over extended periods. It can describe the absorption of sustained-release tablets, enteric-coated formulations, and other complex dosage forms that exhibit non-classical absorption kinetics.',
      'Clinical applications include optimizing dosing intervals for extended-release formulations, predicting food effects on absorption, and understanding formulation performance in different patient populations. The model provides insights into both the rate and extent of absorption.'
    ]
  },
  {
    id: '2-compartment-iv',
    name: '2-Compartment IV Model',
    type: 'compartment',
    compartments: 2,
    category: 'Intravenous',
    description: 'Two-compartment model with IV administration and biphasic elimination',
    longDescription: 'The two-compartment IV model describes drugs with distinct distribution and elimination phases following intravenous administration. This model captures the biphasic decline characteristic of many drugs.',
    parameters: [
      {
        symbol: 'V1',
        name: 'Central Volume of Distribution',
        description: 'Volume of the central compartment',
        unit: 'L or L/kg',
        typicalRange: '0.05 - 1 L/kg',
        estimable: true
      },
      {
        symbol: 'V2',
        name: 'Peripheral Volume of Distribution',
        description: 'Volume of the peripheral compartment',
        unit: 'L or L/kg',
        typicalRange: '0.1 - 5 L/kg',
        estimable: true
      },
      {
        symbol: 'CL',
        name: 'Clearance',
        description: 'Systemic clearance from central compartment',
        unit: 'L/h or L/h/kg',
        typicalRange: '0.01 - 5 L/h/kg',
        estimable: true
      },
      {
        symbol: 'Q',
        name: 'Intercompartmental Clearance',
        description: 'Clearance between central and peripheral compartments',
        unit: 'L/h or L/h/kg',
        typicalRange: '0.01 - 2 L/h/kg',
        estimable: true
      }
    ],
    equations: [
      'dA1/dt = -CL×A1/V1 - Q×A1/V1 + Q×A2/V2',
      'dA2/dt = Q×A1/V1 - Q×A2/V2',
      'C(t) = A × e^(-α×t) + B × e^(-β×t)',
      'α = (k12 + k21 + k10 + √D)/2'
    ],
    applications: [
      'IV antibiotics with distribution phase',
      'Cardiovascular drugs',
      'Anesthetics',
      'Oncology compounds'
    ],
    advantages: [
      'Describes biphasic kinetics',
      'Captures distribution phase',
      'More realistic than 1-compartment',
      'Suitable for many IV drugs'
    ],
    limitations: [
      'More complex parameter estimation',
      'Requires rich sampling',
      'Parameter correlation issues',
      'May overfit sparse data'
    ],
    references: [
      'Gibaldi M, Perrier D. Pharmacokinetics, 2nd ed. Marcel Dekker, 1982',
      'Wagner JG. Pharmacokinetics for the Pharmaceutical Scientist. Technomic, 1993'
    ],
    extendedDescription: [
      'The two-compartment IV model extends the simple one-compartment approach by explicitly accounting for the distribution phase that occurs immediately after intravenous administration. This model is essential for drugs that exhibit biphasic elimination kinetics.',
      'Following IV bolus administration, the drug initially distributes rapidly from the central compartment (representing plasma and highly perfused tissues) to the peripheral compartment (representing slowly perfused tissues). This creates the characteristic biphasic concentration-time profile.',
      'The distribution phase (α-phase) is typically rapid and represents drug movement from plasma to tissues. The elimination phase (β-phase) is slower and represents the overall elimination of drug from the body. Understanding both phases is crucial for optimal dosing.',
      'Clinical applications include dosing of antibiotics like vancomycin and gentamicin, where the distribution phase affects both efficacy and toxicity. The model helps determine appropriate dosing intervals and loading doses for rapid therapeutic effect.',
      'This model is particularly important for drugs with narrow therapeutic windows, where understanding the complete concentration-time profile is essential for safe and effective therapy. It forms the basis for therapeutic drug monitoring protocols.'
    ]
  },
  {
    id: '2-compartment-oral',
    name: '2-Compartment Oral Model',
    type: 'compartment',
    compartments: 2,
    category: 'Oral',
    description: 'Two-compartment model with oral absorption and distribution',
    longDescription: 'This model combines oral absorption kinetics with two-compartment distribution, describing drugs that exhibit both absorption and distribution phases following oral administration.',
    parameters: [
      {
        symbol: 'V1',
        name: 'Central Volume of Distribution',
        description: 'Volume of the central compartment',
        unit: 'L or L/kg',
        typicalRange: '0.05 - 1 L/kg',
        estimable: true
      },
      {
        symbol: 'V2',
        name: 'Peripheral Volume of Distribution',
        description: 'Volume of the peripheral compartment',
        unit: 'L or L/kg',
        typicalRange: '0.1 - 5 L/kg',
        estimable: true
      },
      {
        symbol: 'CL',
        name: 'Clearance',
        description: 'Systemic clearance from central compartment',
        unit: 'L/h or L/h/kg',
        typicalRange: '0.01 - 5 L/h/kg',
        estimable: true
      },
      {
        symbol: 'Q',
        name: 'Intercompartmental Clearance',
        description: 'Clearance between central and peripheral compartments',
        unit: 'L/h or L/h/kg',
        typicalRange: '0.01 - 2 L/h/kg',
        estimable: true
      },
      {
        symbol: 'ka',
        name: 'Absorption Rate Constant',
        description: 'First-order absorption rate constant',
        unit: 'h⁻¹',
        typicalRange: '0.1 - 5 h⁻¹',
        estimable: true
      },
      {
        symbol: 'F',
        name: 'Bioavailability',
        description: 'Fraction of dose that reaches systemic circulation',
        unit: 'fraction',
        typicalRange: '0.1 - 1.0',
        estimable: true
      }
    ],
    equations: [
      'dAa/dt = -ka × Aa',
      'dA1/dt = ka × Aa - CL×A1/V1 - Q×A1/V1 + Q×A2/V2',
      'dA2/dt = Q×A1/V1 - Q×A2/V2',
      'Complex absorption and distribution kinetics'
    ],
    applications: [
      'Oral drugs with significant distribution',
      'Extended-release formulations',
      'Drugs with tissue accumulation',
      'Complex oral kinetics'
    ],
    advantages: [
      'Realistic oral drug behavior',
      'Accounts for distribution',
      'Describes complex profiles',
      'Clinically relevant'
    ],
    limitations: [
      'Complex parameter estimation',
      'Requires extensive sampling',
      'Parameter identifiability issues',
      'May be overparameterized'
    ],
    references: [
      'Rowland M, Tozer TN. Clinical Pharmacokinetics and Pharmacodynamics, 4th ed. Lippincott Williams & Wilkins, 2011',
      'Benet LZ, et al. Pharmacokinetic basis for drug treatment. Raven Press, 1984'
    ],
    extendedDescription: [
      'The two-compartment oral model represents a sophisticated approach to describing oral drug pharmacokinetics when distribution is significant. This model is essential for drugs that exhibit complex concentration-time profiles following oral administration.',
      'The model accounts for the sequential processes of absorption from the gastrointestinal tract, distribution between central and peripheral compartments, and elimination from the central compartment. This creates a complex interplay between absorption and distribution kinetics.',
      'Clinical applications include oral formulations of drugs like digoxin, quinidine, and many psychoactive medications where tissue distribution significantly affects the concentration-time profile. The model helps optimize dosing regimens for sustained therapeutic effect.',
      'The interaction between absorption and distribution can lead to complex peak shapes and multiple peaks in some cases. Understanding these phenomena is crucial for proper interpretation of oral pharmacokinetic data and formulation development.',
      'This model is particularly valuable for extended-release formulations where the absorption process may be prolonged and interact with distribution kinetics to create unique concentration-time profiles that require sophisticated modeling approaches.'
    ]
  },
  {
    id: '2-compartment-combined',
    name: '2-Compartment Combined IV/Oral Model',
    type: 'compartment',
    compartments: 2,
    category: 'Combined',
    description: 'Two-compartment model supporting both IV and oral administration',
    longDescription: 'This flexible two-compartment model accommodates both intravenous and oral administration routes, allowing for comprehensive analysis of drugs administered through multiple routes.',
    parameters: [
      {
        symbol: 'V1',
        name: 'Central Volume of Distribution',
        description: 'Volume of the central compartment',
        unit: 'L or L/kg',
        typicalRange: '0.05 - 1 L/kg',
        estimable: true
      },
      {
        symbol: 'V2',
        name: 'Peripheral Volume of Distribution',
        description: 'Volume of the peripheral compartment',
        unit: 'L or L/kg',
        typicalRange: '0.1 - 5 L/kg',
        estimable: true
      },
      {
        symbol: 'CL',
        name: 'Clearance',
        description: 'Systemic clearance from central compartment',
        unit: 'L/h or L/h/kg',
        typicalRange: '0.01 - 5 L/h/kg',
        estimable: true
      },
      {
        symbol: 'Q',
        name: 'Intercompartmental Clearance',
        description: 'Clearance between central and peripheral compartments',
        unit: 'L/h or L/h/kg',
        typicalRange: '0.01 - 2 L/h/kg',
        estimable: true
      },
      {
        symbol: 'ka',
        name: 'Absorption Rate Constant',
        description: 'First-order absorption rate constant (oral only)',
        unit: 'h⁻¹',
        typicalRange: '0.1 - 5 h⁻¹',
        estimable: true
      },
      {
        symbol: 'F',
        name: 'Bioavailability',
        description: 'Fraction of oral dose reaching systemic circulation',
        unit: 'fraction',
        typicalRange: '0.1 - 1.0',
        estimable: true
      }
    ],
    equations: [
      'IV: Direct input to central compartment',
      'Oral: Absorption compartment → central compartment',
      'Distribution: Central ↔ peripheral compartments',
      'Elimination: From central compartment only'
    ],
    applications: [
      'Hospital to home therapy transitions',
      'Route comparison studies',
      'Bioavailability assessments',
      'Flexible dosing regimens'
    ],
    advantages: [
      'Route flexibility',
      'Comprehensive analysis',
      'Clinical transition modeling',
      'Comparative bioavailability'
    ],
    limitations: [
      'Complex parameter estimation',
      'Requires route-specific data',
      'High parameter correlation',
      'Computational complexity'
    ],
    references: [
      'Tozer TN, Rowland M. Introduction to Pharmacokinetics and Pharmacodynamics, 2nd ed. Lippincott Williams & Wilkins, 2006',
      'Benet LZ, et al. Pharmacokinetic basis for drug treatment. Raven Press, 1984'
    ],
    extendedDescription: [
      'The two-compartment combined model provides maximum flexibility for analyzing drugs that may be administered through multiple routes during treatment. This approach is particularly valuable for drugs used in both hospital and outpatient settings.',
      'The model maintains consistent distribution and elimination parameters across routes while allowing route-specific absorption parameters. This approach enables direct comparison of bioavailability and helps optimize dose conversion between routes.',
      'Clinical applications include antibiotics, anticoagulants, and pain medications where patients may receive IV therapy initially and transition to oral therapy. The model helps ensure therapeutic continuity during route transitions.',
      'The combined approach allows for sophisticated dosing regimens that may include IV loading doses followed by oral maintenance therapy, or alternating routes based on clinical circumstances. This flexibility is essential for personalized medicine approaches.',
      'Understanding the relationship between IV and oral pharmacokinetics through this model helps clinicians make informed decisions about dose adjustments, timing of route transitions, and optimization of therapeutic outcomes while minimizing adverse effects.'
    ]
  },
  {
    id: '2-compartment-transit',
    name: '2-Compartment Transit Model',
    type: 'compartment',
    compartments: 2,
    category: 'Absorption',
    description: 'Two-compartment model with transit compartment absorption',
    longDescription: 'This model combines the sophisticated absorption modeling of transit compartments with two-compartment distribution, ideal for modified-release formulations with significant distribution.',
    parameters: [
      {
        symbol: 'V1',
        name: 'Central Volume of Distribution',
        description: 'Volume of the central compartment',
        unit: 'L or L/kg',
        typicalRange: '0.05 - 1 L/kg',
        estimable: true
      },
      {
        symbol: 'V2',
        name: 'Peripheral Volume of Distribution',
        description: 'Volume of the peripheral compartment',
        unit: 'L or L/kg',
        typicalRange: '0.1 - 5 L/kg',
        estimable: true
      },
      {
        symbol: 'CL',
        name: 'Clearance',
        description: 'Systemic clearance from central compartment',
        unit: 'L/h or L/h/kg',
        typicalRange: '0.01 - 5 L/h/kg',
        estimable: true
      },
      {
        symbol: 'Q',
        name: 'Intercompartmental Clearance',
        description: 'Clearance between central and peripheral compartments',
        unit: 'L/h or L/h/kg',
        typicalRange: '0.01 - 2 L/h/kg',
        estimable: true
      },
      {
        symbol: 'ktr',
        name: 'Transit Rate Constant',
        description: 'Rate constant for transit through absorption compartments',
        unit: 'h⁻¹',
        typicalRange: '0.1 - 2 h⁻¹',
        estimable: true
      },
      {
        symbol: 'n',
        name: 'Number of Transit Compartments',
        description: 'Number of transit compartments in absorption chain',
        unit: 'count',
        typicalRange: '1 - 10',
        estimable: true
      },
      {
        symbol: 'F',
        name: 'Bioavailability',
        description: 'Fraction of dose that reaches systemic circulation',
        unit: 'fraction',
        typicalRange: '0.1 - 1.0',
        estimable: true
      }
    ],
    equations: [
      'Transit chain: dAᵢ/dt = ktr × Aᵢ₋₁ - ktr × Aᵢ',
      'dA1/dt = ktr × Aₙ - CL×A1/V1 - Q×A1/V1 + Q×A2/V2',
      'dA2/dt = Q×A1/V1 - Q×A2/V2',
      'Complex absorption with distribution'
    ],
    applications: [
      'Extended-release formulations with distribution',
      'Complex oral dosage forms',
      'Enteric-coated tablets',
      'Sustained-release systems'
    ],
    advantages: [
      'Realistic absorption modeling',
      'Accounts for distribution',
      'Flexible absorption kinetics',
      'Clinically relevant'
    ],
    limitations: [
      'High parameter count',
      'Complex estimation',
      'Requires rich data',
      'Potential overparameterization'
    ],
    references: [
      'Savic RM, et al. Implementation of a transit compartment model for describing drug absorption in pharmacokinetic studies. J Pharmacokinet Pharmacodyn, 2007',
      'Bergstrand M, et al. Prediction-corrected visual predictive checks for diagnosing nonlinear mixed-effects models. AAPS J, 2011'
    ],
    extendedDescription: [
      'The two-compartment transit model represents the most sophisticated approach to modeling oral drug absorption when significant distribution also occurs. This model is essential for complex formulations that exhibit both delayed absorption and tissue distribution.',
      'The transit compartment chain models the complex processes of tablet disintegration, drug dissolution, gastrointestinal transit, and membrane permeation, while the two-compartment system captures subsequent distribution and elimination kinetics.',
      'This model is particularly valuable for extended-release formulations where drug release occurs over many hours and distribution to tissues significantly affects the concentration-time profile. Examples include sustained-release cardiovascular medications and long-acting pain medications.',
      'The interaction between prolonged absorption and distribution can create complex concentration-time profiles with multiple phases. Understanding these interactions is crucial for optimizing dosing intervals and predicting steady-state behavior.',
      'Clinical applications include formulation development, bioequivalence studies of complex generics, and understanding the impact of food or disease states on both absorption and distribution processes. This model provides the most comprehensive description of oral drug behavior.'
    ]
  },
  {
    id: '2-compartment-linear',
    name: '2-Compartment Linear Elimination Model',
    type: 'compartment',
    compartments: 2,
    category: 'Linear Elimination',
    description: 'Two-compartment model with linear first-order elimination kinetics',
    longDescription: 'This model combines the distribution characteristics of a two-compartment system with linear, first-order elimination kinetics. It assumes elimination is proportional to drug concentration.',
    parameters: [
      {
        symbol: 'V1',
        name: 'Central Volume of Distribution',
        description: 'Volume of the central compartment',
        unit: 'L or L/kg',
        typicalRange: '0.05 - 1 L/kg',
        estimable: true
      },
      {
        symbol: 'V2',
        name: 'Peripheral Volume of Distribution',
        description: 'Volume of the peripheral compartment',
        unit: 'L or L/kg',
        typicalRange: '0.1 - 5 L/kg',
        estimable: true
      },
      {
        symbol: 'CL',
        name: 'Linear Clearance',
        description: 'First-order clearance from central compartment',
        unit: 'L/h or L/h/kg',
        typicalRange: '0.01 - 5 L/h/kg',
        estimable: true
      },
      {
        symbol: 'Q',
        name: 'Intercompartmental Clearance',
        description: 'Clearance between central and peripheral compartments',
        unit: 'L/h or L/h/kg',
        typicalRange: '0.01 - 2 L/h/kg',
        estimable: true
      }
    ],
    equations: [
      'dA1/dt = -CL×A1/V1 - Q×A1/V1 + Q×A2/V2',
      'dA2/dt = Q×A1/V1 - Q×A2/V2',
      'C1(t) = A × e^(-α×t) + B × e^(-β×t)',
      'Linear elimination: Rate ∝ Concentration'
    ],
    applications: [
      'Most pharmaceutical compounds',
      'Therapeutic drug monitoring',
      'Dose proportionality studies',
      'Population pharmacokinetics'
    ],
    advantages: [
      'Predictable dose-response',
      'Simple scaling relationships',
      'Well-established theory',
      'Suitable for most drugs'
    ],
    limitations: [
      'Assumes non-saturable elimination',
      'May not apply at high doses',
      'Cannot describe capacity-limited processes',
      'Limited for biologics'
    ],
    references: [
      'Gibaldi M, Perrier D. Pharmacokinetics, 2nd ed. Marcel Dekker, 1982',
      'Bauer LA. Applied Clinical Pharmacokinetics, 3rd ed. McGraw-Hill, 2014'
    ],
    extendedDescription: [
      'The two-compartment linear elimination model represents the standard approach for most pharmaceutical compounds that follow predictable, dose-proportional pharmacokinetics. This model assumes that elimination processes are not saturated within the therapeutic dose range.',
      'Linear elimination means that clearance remains constant regardless of dose or concentration. This property allows for straightforward dose adjustments and predictions of steady-state concentrations. The elimination rate is directly proportional to the amount of drug in the central compartment.',
      'This model is widely used in therapeutic drug monitoring for drugs like digoxin, lithium, and many antibiotics. The linear relationship between dose and exposure simplifies clinical decision-making and allows for evidence-based dosing guidelines.',
      'Population pharmacokinetic studies often use this model as a starting point, incorporating covariates to explain inter-individual variability in clearance and volume parameters. The linear assumption is valid for most small molecule drugs at therapeutic concentrations.',
      'The model forms the basis for bioequivalence studies and generic drug approval, where linear kinetics allow for straightforward comparison of different formulations. Understanding linear elimination is fundamental to clinical pharmacology and rational drug therapy.'
    ]
  },
  {
    id: '2-compartment-mm',
    name: '2-Compartment Michaelis-Menten Model',
    type: 'mechanism',
    compartments: 2,
    category: 'Nonlinear Elimination',
    description: 'Two-compartment model with saturable Michaelis-Menten elimination',
    longDescription: 'This model combines two-compartment distribution with saturable elimination kinetics, describing drugs that exhibit both distribution and nonlinear elimination characteristics.',
    parameters: [
      {
        symbol: 'V1',
        name: 'Central Volume of Distribution',
        description: 'Volume of the central compartment',
        unit: 'L or L/kg',
        typicalRange: '0.05 - 1 L/kg',
        estimable: true
      },
      {
        symbol: 'V2',
        name: 'Peripheral Volume of Distribution',
        description: 'Volume of the peripheral compartment',
        unit: 'L or L/kg',
        typicalRange: '0.1 - 5 L/kg',
        estimable: true
      },
      {
        symbol: 'Q',
        name: 'Intercompartmental Clearance',
        description: 'Clearance between central and peripheral compartments',
        unit: 'L/h or L/h/kg',
        typicalRange: '0.01 - 2 L/h/kg',
        estimable: true
      },
      {
        symbol: 'Vmax',
        name: 'Maximum Elimination Rate',
        description: 'Maximum rate of elimination when enzymes are saturated',
        unit: 'mg/h or mg/h/kg',
        typicalRange: '1 - 1000 mg/h/kg',
        estimable: true
      },
      {
        symbol: 'Km',
        name: 'Michaelis Constant',
        description: 'Concentration at half-maximum elimination rate',
        unit: 'mg/L or µg/mL',
        typicalRange: '0.1 - 100 µg/mL',
        estimable: true
      }
    ],
    equations: [
      'dA1/dt = -Vmax×C1/(Km + C1) - Q×A1/V1 + Q×A2/V2',
      'dA2/dt = Q×A1/V1 - Q×A2/V2',
      'Saturable elimination from central compartment',
      'Distribution between compartments'
    ],
    applications: [
      'Drugs with saturable metabolism and distribution',
      'High-dose therapy with nonlinear kinetics',
      'Biologics with target-mediated elimination',
      'Complex nonlinear behavior'
    ],
    advantages: [
      'Mechanistically based',
      'Explains dose-dependent kinetics',
      'Accounts for distribution',
      'Clinically relevant'
    ],
    limitations: [
      'Complex parameter estimation',
      'Requires extensive data',
      'High parameter correlation',
      'Computational complexity'
    ],
    references: [
      'Ludden TM, et al. Nonlinear pharmacokinetics of phenytoin. Clin Pharmacokinet, 1977',
      'Wagner JG. Properties of the Michaelis-Menten equation and its integrated form. J Pharmacokinet Biopharm, 1973'
    ],
    extendedDescription: [
      'The two-compartment Michaelis-Menten model describes drugs that exhibit both significant distribution and saturable elimination kinetics. This combination creates complex pharmacokinetic behavior that requires sophisticated modeling approaches.',
      'The model accounts for drug distribution between central and peripheral compartments while elimination follows Michaelis-Menten kinetics from the central compartment. This creates a complex interplay between distribution and saturable elimination processes.',
      'Clinical applications include drugs like phenytoin at high doses, where both distribution and saturable metabolism contribute to complex dose-concentration relationships. The model helps predict the nonlinear behavior and optimize dosing strategies.',
      'The interaction between distribution and saturable elimination can lead to unexpected accumulation patterns and prolonged elimination phases. Understanding these phenomena is crucial for safe dosing of drugs with nonlinear kinetics.',
      'This model is increasingly relevant for biologics and targeted therapies that may exhibit both tissue distribution and target-mediated elimination. The combination of these processes creates unique pharmacokinetic challenges that require sophisticated modeling approaches.'
    ]
  },
  {
    id: '2-compartment-combined-elim',
    name: '2-Compartment Combined Elimination Model',
    type: 'mechanism',
    compartments: 2,
    category: 'Mixed Elimination',
    description: 'Two-compartment model with both linear and Michaelis-Menten elimination',
    longDescription: 'This model combines two-compartment distribution with both linear and saturable elimination pathways, representing the most comprehensive approach to modeling complex elimination kinetics.',
    parameters: [
      {
        symbol: 'V1',
        name: 'Central Volume of Distribution',
        description: 'Volume of the central compartment',
        unit: 'L or L/kg',
        typicalRange: '0.05 - 1 L/kg',
        estimable: true
      },
      {
        symbol: 'V2',
        name: 'Peripheral Volume of Distribution',
        description: 'Volume of the peripheral compartment',
        unit: 'L or L/kg',
        typicalRange: '0.1 - 5 L/kg',
        estimable: true
      },
      {
        symbol: 'Q',
        name: 'Intercompartmental Clearance',
        description: 'Clearance between central and peripheral compartments',
        unit: 'L/h or L/h/kg',
        typicalRange: '0.01 - 2 L/h/kg',
        estimable: true
      },
      {
        symbol: 'CL',
        name: 'Linear Clearance',
        description: 'Non-saturable clearance component',
        unit: 'L/h or L/h/kg',
        typicalRange: '0.01 - 5 L/h/kg',
        estimable: true
      },
      {
        symbol: 'Vmax',
        name: 'Maximum Saturable Elimination Rate',
        description: 'Maximum rate of saturable elimination pathway',
        unit: 'mg/h or mg/h/kg',
        typicalRange: '1 - 1000 mg/h/kg',
        estimable: true
      },
      {
        symbol: 'Km',
        name: 'Michaelis Constant',
        description: 'Concentration at half-maximum saturable elimination',
        unit: 'mg/L or µg/mL',
        typicalRange: '0.1 - 100 µg/mL',
        estimable: true
      }
    ],
    equations: [
      'dA1/dt = -CL×C1 - Vmax×C1/(Km + C1) - Q×A1/V1 + Q×A2/V2',
      'dA2/dt = Q×A1/V1 - Q×A2/V2',
      'Total elimination = Linear + Saturable components',
      'Distribution between compartments'
    ],
    applications: [
      'Drugs with multiple elimination pathways',
      'Biologics with complex elimination',
      'High-dose therapy with mixed kinetics',
      'Complex pharmacokinetic behavior'
    ],
    advantages: [
      'Most comprehensive model',
      'Explains complex kinetics',
      'Accounts for multiple pathways',
      'Clinically realistic'
    ],
    limitations: [
      'Very complex estimation',
      'Requires extensive data',
      'High parameter correlation',
      'Identifiability challenges'
    ],
    references: [
      'Houston JB. Drug metabolite kinetics. Pharmacol Ther, 1982',
      'Pang KS, Rowland M. Hepatic clearance of drugs. I. Theoretical considerations. J Pharmacokinet Biopharm, 1977'
    ],
    extendedDescription: [
      'The two-compartment combined elimination model represents the most sophisticated approach to describing drug pharmacokinetics when both distribution and multiple elimination pathways are significant. This model captures the full complexity of drug disposition.',
      'The model accounts for distribution between central and peripheral compartments while elimination occurs through both linear (non-saturable) and Michaelis-Menten (saturable) pathways from the central compartment. This creates highly complex pharmacokinetic behavior.',
      'Clinical applications include biologics and targeted therapies that may undergo both target-mediated (saturable) and non-specific (linear) elimination while also distributing to tissues. Understanding these complex interactions is crucial for optimal dosing.',
      'The relative contribution of each elimination pathway depends on drug concentration, making dose-response relationships highly complex. The model helps predict how changes in dose or patient factors might affect overall drug disposition.',
      'This model represents the current frontier in pharmacokinetic modeling, providing the most comprehensive description of drug behavior but requiring sophisticated analytical approaches and extensive data for reliable parameter estimation.'
    ]
  },
  {
    id: '3-compartment-iv',
    name: '3-Compartment IV Model',
    type: 'compartment',
    compartments: 3,
    category: 'Intravenous',
    description: 'Three-compartment model with IV administration and triphasic elimination',
    longDescription: 'The three-compartment IV model describes drugs with complex distribution kinetics following intravenous administration, exhibiting triphasic elimination with distinct distribution, redistribution, and elimination phases.',
    parameters: [
      {
        symbol: 'V1',
        name: 'Central Volume',
        description: 'Volume of the central compartment',
        unit: 'L or L/kg',
        typicalRange: '0.05 - 1 L/kg',
        estimable: true
      },
      {
        symbol: 'V2',
        name: 'First Peripheral Volume',
        description: 'Volume of the first peripheral compartment',
        unit: 'L or L/kg',
        typicalRange: '0.1 - 3 L/kg',
        estimable: true
      },
      {
        symbol: 'V3',
        name: 'Second Peripheral Volume',
        description: 'Volume of the second peripheral compartment',
        unit: 'L or L/kg',
        typicalRange: '0.5 - 10 L/kg',
        estimable: true
      },
      {
        symbol: 'CL',
        name: 'Clearance',
        description: 'Systemic clearance from central compartment',
        unit: 'L/h or L/h/kg',
        typicalRange: '0.01 - 5 L/h/kg',
        estimable: true
      },
      {
        symbol: 'Q2',
        name: 'First Intercompartmental Clearance',
        description: 'Clearance between central and first peripheral compartment',
        unit: 'L/h or L/h/kg',
        typicalRange: '0.01 - 2 L/h/kg',
        estimable: true
      },
      {
        symbol: 'Q3',
        name: 'Second Intercompartmental Clearance',
        description: 'Clearance between central and second peripheral compartment',
        unit: 'L/h or L/h/kg',
        typicalRange: '0.001 - 1 L/h/kg',
        estimable: true
      }
    ],
    equations: [
      'dA1/dt = -CL×A1/V1 - Q2×A1/V1 + Q2×A2/V2 - Q3×A1/V1 + Q3×A3/V3',
      'dA2/dt = Q2×A1/V1 - Q2×A2/V2',
      'dA3/dt = Q3×A1/V1 - Q3×A3/V3',
      'C(t) = A × e^(-α×t) + B × e^(-β×t) + C × e^(-γ×t)'
    ],
    applications: [
      'Anesthetics (propofol, thiopental)',
      'Highly lipophilic drugs',
      'Drugs with deep tissue distribution',
      'Complex IV kinetics'
    ],
    advantages: [
      'Captures triphasic kinetics',
      'Describes complex distribution',
      'Accounts for deep tissues',
      'Clinically accurate'
    ],
    limitations: [
      'High parameter count',
      'Requires rich data',
      'Parameter correlation',
      'Computational complexity'
    ],
    references: [
      'Upton RN. A pharmacokinetic model for propofol. BJA, 2008',
      'Schnider TW, et al. The pharmacokinetics of propofol. Anesthesiology, 1998'
    ],
    extendedDescription: [
      'The three-compartment IV model represents the most sophisticated approach to describing intravenous drug distribution, capturing the complex triphasic kinetics exhibited by highly lipophilic drugs and anesthetics.',
      'Following IV administration, the drug undergoes rapid distribution from plasma to highly perfused tissues (α-phase), followed by redistribution to moderately perfused tissues (β-phase), and finally slow equilibration with poorly perfused tissues while elimination occurs (γ-phase).',
      'This model is essential for anesthetics like propofol, where rapid onset and offset of effect depend on complex distribution kinetics. The model helps optimize dosing for rapid induction and controlled recovery from anesthesia.',
      'The three phases represent different tissue groups: highly perfused organs (brain, heart, liver), moderately perfused tissues (muscle, skin), and poorly perfused tissues (fat, bone). Understanding these phases is crucial for predicting drug effects over time.',
      'Clinical applications include anesthesia protocols, where the model helps predict the time course of drug effect and optimize dosing for procedures of different durations. The model is also valuable for understanding the pharmacokinetics of highly lipophilic drugs.'
    ]
  },
  {
    id: '3-compartment-oral',
    name: '3-Compartment Oral Model',
    type: 'compartment',
    compartments: 3,
    category: 'Oral',
    description: 'Three-compartment model with oral absorption and complex distribution',
    longDescription: 'This model combines oral absorption kinetics with three-compartment distribution, describing drugs that exhibit both complex absorption and extensive tissue distribution following oral administration.',
    parameters: [
      {
        symbol: 'V1',
        name: 'Central Volume',
        description: 'Volume of the central compartment',
        unit: 'L or L/kg',
        typicalRange: '0.05 - 1 L/kg',
        estimable: true
      },
      {
        symbol: 'V2',
        name: 'First Peripheral Volume',
        description: 'Volume of the first peripheral compartment',
        unit: 'L or L/kg',
        typicalRange: '0.1 - 3 L/kg',
        estimable: true
      },
      {
        symbol: 'V3',
        name: 'Second Peripheral Volume',
        description: 'Volume of the second peripheral compartment',
        unit: 'L or L/kg',
        typicalRange: '0.5 - 10 L/kg',
        estimable: true
      },
      {
        symbol: 'CL',
        name: 'Clearance',
        description: 'Systemic clearance from central compartment',
        unit: 'L/h or L/h/kg',
        typicalRange: '0.01 - 5 L/h/kg',
        estimable: true
      },
      {
        symbol: 'Q2',
        name: 'First Intercompartmental Clearance',
        description: 'Clearance between central and first peripheral compartment',
        unit: 'L/h or L/h/kg',
        typicalRange: '0.01 - 2 L/h/kg',
        estimable: true
      },
      {
        symbol: 'Q3',
        name: 'Second Intercompartmental Clearance',
        description: 'Clearance between central and second peripheral compartment',
        unit: 'L/h or L/h/kg',
        typicalRange: '0.001 - 1 L/h/kg',
        estimable: true
      },
      {
        symbol: 'ka',
        name: 'Absorption Rate Constant',
        description: 'First-order absorption rate constant',
        unit: 'h⁻¹',
        typicalRange: '0.1 - 5 h⁻¹',
        estimable: true
      },
      {
        symbol: 'F',
        name: 'Bioavailability',
        description: 'Fraction of dose that reaches systemic circulation',
        unit: 'fraction',
        typicalRange: '0.1 - 1.0',
        estimable: true
      }
    ],
    equations: [
      'dAa/dt = -ka × Aa',
      'dA1/dt = ka × Aa - CL×A1/V1 - Q2×A1/V1 + Q2×A2/V2 - Q3×A1/V1 + Q3×A3/V3',
      'dA2/dt = Q2×A1/V1 - Q2×A2/V2',
      'dA3/dt = Q3×A1/V1 - Q3×A3/V3'
    ],
    applications: [
      'Oral drugs with extensive distribution',
      'Lipophilic oral medications',
      'Drugs with tissue accumulation',
      'Complex oral kinetics'
    ],
    advantages: [
      'Comprehensive oral modeling',
      'Accounts for complex distribution',
      'Describes tissue accumulation',
      'Clinically relevant'
    ],
    limitations: [
      'Very complex estimation',
      'Requires extensive data',
      'High parameter correlation',
      'May be overparameterized'
    ],
    references: [
      'Rowland M, Tozer TN. Clinical Pharmacokinetics and Pharmacodynamics, 4th ed. Lippincott Williams & Wilkins, 2011',
      'Benet LZ, et al. Pharmacokinetic basis for drug treatment. Raven Press, 1984'
    ],
    extendedDescription: [
      'The three-compartment oral model represents the most comprehensive approach to describing oral drug pharmacokinetics when extensive tissue distribution occurs. This model is essential for highly lipophilic drugs that accumulate in deep tissue compartments.',
      'The model accounts for absorption from the gastrointestinal tract followed by complex distribution to multiple tissue compartments with different perfusion rates and binding characteristics. This creates highly complex concentration-time profiles.',
      'Clinical applications include oral formulations of highly lipophilic drugs like amiodarone, where tissue accumulation significantly affects both efficacy and toxicity. The model helps predict long-term accumulation and elimination patterns.',
      'The interaction between absorption and multi-compartment distribution can lead to complex peak shapes, multiple peaks, and prolonged elimination phases. Understanding these phenomena is crucial for optimal dosing and monitoring.',
      'This model is particularly valuable for drugs with very long half-lives due to deep tissue distribution, where understanding the complete disposition profile is essential for safe and effective therapy over extended treatment periods.'
    ]
  },
  {
    id: '3-compartment-combined',
    name: '3-Compartment Combined IV/Oral Model',
    type: 'compartment',
    compartments: 3,
    category: 'Combined',
    description: 'Three-compartment model supporting both IV and oral administration',
    longDescription: 'This comprehensive three-compartment model accommodates both intravenous and oral administration routes, providing the most complete analysis of drugs with complex distribution kinetics.',
    parameters: [
      {
        symbol: 'V1',
        name: 'Central Volume',
        description: 'Volume of the central compartment',
        unit: 'L or L/kg',
        typicalRange: '0.05 - 1 L/kg',
        estimable: true
      },
      {
        symbol: 'V2',
        name: 'First Peripheral Volume',
        description: 'Volume of the first peripheral compartment',
        unit: 'L or L/kg',
        typicalRange: '0.1 - 3 L/kg',
        estimable: true
      },
      {
        symbol: 'V3',
        name: 'Second Peripheral Volume',
        description: 'Volume of the second peripheral compartment',
        unit: 'L or L/kg',
        typicalRange: '0.5 - 10 L/kg',
        estimable: true
      },
      {
        symbol: 'CL',
        name: 'Clearance',
        description: 'Systemic clearance from central compartment',
        unit: 'L/h or L/h/kg',
        typicalRange: '0.01 - 5 L/h/kg',
        estimable: true
      },
      {
        symbol: 'Q2',
        name: 'First Intercompartmental Clearance',
        description: 'Clearance between central and first peripheral compartment',
        unit: 'L/h or L/h/kg',
        typicalRange: '0.01 - 2 L/h/kg',
        estimable: true
      },
      {
        symbol: 'Q3',
        name: 'Second Intercompartmental Clearance',
        description: 'Clearance between central and second peripheral compartment',
        unit: 'L/h or L/h/kg',
        typicalRange: '0.001 - 1 L/h/kg',
        estimable: true
      },
      {
        symbol: 'ka',
        name: 'Absorption Rate Constant',
        description: 'First-order absorption rate constant (oral only)',
        unit: 'h⁻¹',
        typicalRange: '0.1 - 5 h⁻¹',
        estimable: true
      },
      {
        symbol: 'F',
        name: 'Bioavailability',
        description: 'Fraction of oral dose reaching systemic circulation',
        unit: 'fraction',
        typicalRange: '0.1 - 1.0',
        estimable: true
      }
    ],
    equations: [
      'IV: Direct input to central compartment',
      'Oral: Absorption → central compartment',
      'Complex three-compartment distribution',
      'Route-independent elimination'
    ],
    applications: [
      'Complex therapy transitions',
      'Comprehensive route comparison',
      'Advanced bioavailability studies',
      'Sophisticated dosing regimens'
    ],
    advantages: [
      'Maximum route flexibility',
      'Comprehensive analysis',
      'Complete distribution modeling',
      'Clinical versatility'
    ],
    limitations: [
      'Extremely complex estimation',
      'Requires extensive data',
      'Very high parameter correlation',
      'Computational challenges'
    ],
    references: [
      'Tozer TN, Rowland M. Introduction to Pharmacokinetics and Pharmacodynamics, 2nd ed. Lippincott Williams & Wilkins, 2006',
      'Benet LZ, et al. Pharmacokinetic basis for drug treatment. Raven Press, 1984'
    ],
    extendedDescription: [
      'The three-compartment combined model represents the pinnacle of pharmacokinetic modeling complexity, providing comprehensive analysis of drugs with complex distribution kinetics administered through multiple routes.',
      'This model maintains consistent distribution and elimination parameters across routes while allowing route-specific absorption parameters. The approach enables direct comparison of bioavailability and optimization of complex dosing regimens.',
      'Clinical applications include highly lipophilic drugs used in both hospital and outpatient settings, where understanding the complete disposition profile is essential for safe transitions between administration routes.',
      'The model allows for the most sophisticated dosing regimens, including IV loading with oral maintenance, alternating routes based on clinical status, and optimization of therapy for drugs with very long elimination half-lives.',
      'This represents the most comprehensive approach to pharmacokinetic modeling, suitable for the most complex clinical scenarios but requiring extensive data and sophisticated analytical approaches for reliable parameter estimation.'
    ]
  },
  {
    id: '3-compartment-transit',
    name: '3-Compartment Transit Model',
    type: 'compartment',
    compartments: 3,
    category: 'Absorption',
    description: 'Three-compartment model with transit compartment absorption',
    longDescription: 'This model combines sophisticated transit compartment absorption with three-compartment distribution, representing the most advanced approach to modeling complex oral drug behavior.',
    parameters: [
      {
        symbol: 'V1',
        name: 'Central Volume',
        description: 'Volume of the central compartment',
        unit: 'L or L/kg',
        typicalRange: '0.05 - 1 L/kg',
        estimable: true
      },
      {
        symbol: 'V2',
        name: 'First Peripheral Volume',
        description: 'Volume of the first peripheral compartment',
        unit: 'L or L/kg',
        typicalRange: '0.1 - 3 L/kg',
        estimable: true
      },
      {
        symbol: 'V3',
        name: 'Second Peripheral Volume',
        description: 'Volume of the second peripheral compartment',
        unit: 'L or L/kg',
        typicalRange: '0.5 - 10 L/kg',
        estimable: true
      },
      {
        symbol: 'CL',
        name: 'Clearance',
        description: 'Systemic clearance from central compartment',
        unit: 'L/h or L/h/kg',
        typicalRange: '0.01 - 5 L/h/kg',
        estimable: true
      },
      {
        symbol: 'Q2',
        name: 'First Intercompartmental Clearance',
        description: 'Clearance between central and first peripheral compartment',
        unit: 'L/h or L/h/kg',
        typicalRange: '0.01 - 2 L/h/kg',
        estimable: true
      },
      {
        symbol: 'Q3',
        name: 'Second Intercompartmental Clearance',
        description: 'Clearance between central and second peripheral compartment',
        unit: 'L/h or L/h/kg',
        typicalRange: '0.001 - 1 L/h/kg',
        estimable: true
      },
      {
        symbol: 'ktr',
        name: 'Transit Rate Constant',
        description: 'Rate constant for transit through absorption compartments',
        unit: 'h⁻¹',
        typicalRange: '0.1 - 2 h⁻¹',
        estimable: true
      },
      {
        symbol: 'n',
        name: 'Number of Transit Compartments',
        description: 'Number of transit compartments in absorption chain',
        unit: 'count',
        typicalRange: '1 - 10',
        estimable: true
      },
      {
        symbol: 'F',
        name: 'Bioavailability',
        description: 'Fraction of dose that reaches systemic circulation',
        unit: 'fraction',
        typicalRange: '0.1 - 1.0',
        estimable: true
      }
    ],
    equations: [
      'Transit chain: dAᵢ/dt = ktr × Aᵢ₋₁ - ktr × Aᵢ',
      'dA1/dt = ktr × Aₙ - CL×A1/V1 - Q2×A1/V1 + Q2×A2/V2 - Q3×A1/V1 + Q3×A3/V3',
      'dA2/dt = Q2×A1/V1 - Q2×A2/V2',
      'dA3/dt = Q3×A1/V1 - Q3×A3/V3'
    ],
    applications: [
      'Complex extended-release formulations',
      'Advanced oral dosage forms',
      'Sophisticated absorption modeling',
      'Research applications'
    ],
    advantages: [
      'Most comprehensive oral model',
      'Flexible absorption kinetics',
      'Complete distribution modeling',
      'Research-grade accuracy'
    ],
    limitations: [
      'Extremely high parameter count',
      'Very complex estimation',
      'Requires extensive rich data',
      'High risk of overparameterization'
    ],
    references: [
      'Savic RM, et al. Implementation of a transit compartment model for describing drug absorption in pharmacokinetic studies. J Pharmacokinet Pharmacodyn, 2007',
      'Bergstrand M, et al. Prediction-corrected visual predictive checks for diagnosing nonlinear mixed-effects models. AAPS J, 2011'
    ],
    extendedDescription: [
      'The three-compartment transit model represents the most sophisticated approach to modeling oral drug pharmacokinetics, combining advanced absorption modeling with comprehensive distribution kinetics.',
      'This model is reserved for the most complex oral formulations where both absorption and distribution are highly complex. It can describe sustained-release formulations of highly lipophilic drugs with extensive tissue distribution.',
      'The transit compartment chain models complex absorption processes while the three-compartment system captures distribution to multiple tissue types with different binding and perfusion characteristics.',
      'Clinical applications are primarily in research settings and advanced formulation development, where understanding the complete absorption and distribution profile is essential for optimizing complex drug delivery systems.',
      'This model represents the current frontier in oral pharmacokinetic modeling, providing the most comprehensive description possible but requiring extensive data and sophisticated analytical approaches for reliable implementation.'
    ]
  },
  {
    id: '3-compartment-linear',
    name: '3-Compartment Linear Elimination Model',
    type: 'compartment',
    compartments: 3,
    category: 'Linear Elimination',
    description: 'Three-compartment model with linear first-order elimination kinetics',
    longDescription: 'This model combines complex three-compartment distribution with linear elimination kinetics, suitable for drugs with extensive distribution but predictable elimination.',
    parameters: [
      {
        symbol: 'V1',
        name: 'Central Volume',
        description: 'Volume of the central compartment',
        unit: 'L or L/kg',
        typicalRange: '0.05 - 1 L/kg',
        estimable: true
      },
      {
        symbol: 'V2',
        name: 'First Peripheral Volume',
        description: 'Volume of the first peripheral compartment',
        unit: 'L or L/kg',
        typicalRange: '0.1 - 3 L/kg',
        estimable: true
      },
      {
        symbol: 'V3',
        name: 'Second Peripheral Volume',
        description: 'Volume of the second peripheral compartment',
        unit: 'L or L/kg',
        typicalRange: '0.5 - 10 L/kg',
        estimable: true
      },
      {
        symbol: 'CL',
        name: 'Linear Clearance',
        description: 'First-order clearance from central compartment',
        unit: 'L/h or L/h/kg',
        typicalRange: '0.01 - 5 L/h/kg',
        estimable: true
      },
      {
        symbol: 'Q2',
        name: 'First Intercompartmental Clearance',
        description: 'Clearance between central and first peripheral compartment',
        unit: 'L/h or L/h/kg',
        typicalRange: '0.01 - 2 L/h/kg',
        estimable: true
      },
      {
        symbol: 'Q3',
        name: 'Second Intercompartmental Clearance',
        description: 'Clearance between central and second peripheral compartment',
        unit: 'L/h or L/h/kg',
        typicalRange: '0.001 - 1 L/h/kg',
        estimable: true
      }
    ],
    equations: [
      'dA1/dt = -CL×A1/V1 - Q2×A1/V1 + Q2×A2/V2 - Q3×A1/V1 + Q3×A3/V3',
      'dA2/dt = Q2×A1/V1 - Q2×A2/V2',
      'dA3/dt = Q3×A1/V1 - Q3×A3/V3',
      'Linear elimination: Rate ∝ Concentration'
    ],
    applications: [
      'Drugs with extensive distribution',
      'Linear kinetics with complex distribution',
      'Therapeutic drug monitoring',
      'Population pharmacokinetics'
    ],
    advantages: [
      'Predictable dose-response',
      'Complex distribution modeling',
      'Linear scaling relationships',
      'Well-established theory'
    ],
    limitations: [
      'High parameter count',
      'Requires rich data',
      'Parameter correlation issues',
      'Computational complexity'
    ],
    references: [
      'Gibaldi M, Perrier D. Pharmacokinetics, 2nd ed. Marcel Dekker, 1982',
      'Bauer LA. Applied Clinical Pharmacokinetics, 3rd ed. McGraw-Hill, 2014'
    ],
    extendedDescription: [
      'The three-compartment linear elimination model provides the most comprehensive description of drug distribution while maintaining the predictability of linear elimination kinetics.',
      'This model is ideal for drugs that undergo extensive tissue distribution but maintain linear elimination kinetics within the therapeutic dose range. The linear assumption simplifies dose adjustments while accounting for complex distribution.',
      'Clinical applications include drugs like digoxin and lithium at therapeutic doses, where tissue distribution is extensive but elimination remains predictable. The model helps optimize dosing for drugs with very long elimination half-lives.',
      'The three-compartment structure captures the complete time course of drug distribution and elimination, providing insights into both rapid and slow distribution phases that affect drug action and duration.',
      'This model is valuable for therapeutic drug monitoring of drugs with complex distribution, where understanding the complete concentration-time profile is essential for interpreting plasma concentrations and optimizing therapy.'
    ]
  },
  {
    id: '3-compartment-mm',
    name: '3-Compartment Michaelis-Menten Model',
    type: 'mechanism',
    compartments: 3,
    category: 'Nonlinear Elimination',
    description: 'Three-compartment model with saturable Michaelis-Menten elimination',
    longDescription: 'This model combines complex three-compartment distribution with saturable elimination kinetics, representing the most sophisticated approach to modeling nonlinear pharmacokinetics.',
    parameters: [
      {
        symbol: 'V1',
        name: 'Central Volume',
        description: 'Volume of the central compartment',
        unit: 'L or L/kg',
        typicalRange: '0.05 - 1 L/kg',
        estimable: true
      },
      {
        symbol: 'V2',
        name: 'First Peripheral Volume',
        description: 'Volume of the first peripheral compartment',
        unit: 'L or L/kg',
        typicalRange: '0.1 - 3 L/kg',
        estimable: true
      },
      {
        symbol: 'V3',
        name: 'Second Peripheral Volume',
        description: 'Volume of the second peripheral compartment',
        unit: 'L or L/kg',
        typicalRange: '0.5 - 10 L/kg',
        estimable: true
      },
      {
        symbol: 'Q2',
        name: 'First Intercompartmental Clearance',
        description: 'Clearance between central and first peripheral compartment',
        unit: 'L/h or L/h/kg',
        typicalRange: '0.01 - 2 L/h/kg',
        estimable: true
      },
      {
        symbol: 'Q3',
        name: 'Second Intercompartmental Clearance',
        description: 'Clearance between central and second peripheral compartment',
        unit: 'L/h or L/h/kg',
        typicalRange: '0.001 - 1 L/h/kg',
        estimable: true
      },
      {
        symbol: 'Vmax',
        name: 'Maximum Elimination Rate',
        description: 'Maximum rate of elimination when enzymes are saturated',
        unit: 'mg/h or mg/h/kg',
        typicalRange: '1 - 1000 mg/h/kg',
        estimable: true
      },
      {
        symbol: 'Km',
        name: 'Michaelis Constant',
        description: 'Concentration at half-maximum elimination rate',
        unit: 'mg/L or µg/mL',
        typicalRange: '0.1 - 100 µg/mL',
        estimable: true
      }
    ],
    equations: [
      'dA1/dt = -Vmax×C1/(Km + C1) - Q2×A1/V1 + Q2×A2/V2 - Q3×A1/V1 + Q3×A3/V3',
      'dA2/dt = Q2×A1/V1 - Q2×A2/V2',
      'dA3/dt = Q3×A1/V1 - Q3×A3/V3',
      'Saturable elimination with complex distribution'
    ],
    applications: [
      'Complex nonlinear behavior',
      'High-dose therapy with distribution',
      'Advanced biologics',
      'Research applications'
    ],
    advantages: [
      'Most comprehensive nonlinear model',
      'Mechanistically based',
      'Explains complex dose-dependent kinetics',
      'Research-grade accuracy'
    ],
    limitations: [
      'Extremely complex estimation',
      'Requires extensive data',
      'Very high parameter correlation',
      'Computational challenges'
    ],
    references: [
      'Ludden TM, et al. Nonlinear pharmacokinetics of phenytoin. Clin Pharmacokinet, 1977',
      'Wagner JG. Properties of the Michaelis-Menten equation and its integrated form. J Pharmacokinet Biopharm, 1973'
    ],
    extendedDescription: [
      'The three-compartment Michaelis-Menten model represents the most sophisticated approach to modeling nonlinear pharmacokinetics when complex distribution is also significant.',
      'This model is reserved for the most complex scenarios where both saturable elimination and extensive tissue distribution contribute to highly nonlinear pharmacokinetic behavior.',
      'The interaction between saturable elimination and multi-compartment distribution creates extremely complex dose-concentration relationships that require sophisticated modeling approaches.',
      'Clinical applications are primarily in research settings and for advanced biologics where both target-mediated elimination and tissue distribution contribute to complex pharmacokinetic behavior.',
      'This model represents the current frontier in nonlinear pharmacokinetic modeling, providing the most comprehensive description possible but requiring extensive data and sophisticated analytical approaches.'
    ]
  },
  {
    id: '3-compartment-combined-elim',
    name: '3-Compartment Combined Elimination Model',
    type: 'mechanism',
    compartments: 3,
    category: 'Mixed Elimination',
    description: 'Three-compartment model with both linear and Michaelis-Menten elimination',
    longDescription: 'This model represents the ultimate in pharmacokinetic modeling complexity, combining three-compartment distribution with both linear and saturable elimination pathways.',
    parameters: [
      {
        symbol: 'V1',
        name: 'Central Volume',
        description: 'Volume of the central compartment',
        unit: 'L or L/kg',
        typicalRange: '0.05 - 1 L/kg',
        estimable: true
      },
      {
        symbol: 'V2',
        name: 'First Peripheral Volume',
        description: 'Volume of the first peripheral compartment',
        unit: 'L or L/kg',
        typicalRange: '0.1 - 3 L/kg',
        estimable: true
      },
      {
        symbol: 'V3',
        name: 'Second Peripheral Volume',
        description: 'Volume of the second peripheral compartment',
        unit: 'L or L/kg',
        typicalRange: '0.5 - 10 L/kg',
        estimable: true
      },
      {
        symbol: 'Q2',
        name: 'First Intercompartmental Clearance',
        description: 'Clearance between central and first peripheral compartment',
        unit: 'L/h or L/h/kg',
        typicalRange: '0.01 - 2 L/h/kg',
        estimable: true
      },
      {
        symbol: 'Q3',
        name: 'Second Intercompartmental Clearance',
        description: 'Clearance between central and second peripheral compartment',
        unit: 'L/h or L/h/kg',
        typicalRange: '0.001 - 1 L/h/kg',
        estimable: true
      },
      {
        symbol: 'CL',
        name: 'Linear Clearance',
        description: 'Non-saturable clearance component',
        unit: 'L/h or L/h/kg',
        typicalRange: '0.01 - 5 L/h/kg',
        estimable: true
      },
      {
        symbol: 'Vmax',
        name: 'Maximum Saturable Elimination Rate',
        description: 'Maximum rate of saturable elimination pathway',
        unit: 'mg/h or mg/h/kg',
        typicalRange: '1 - 1000 mg/h/kg',
        estimable: true
      },
      {
        symbol: 'Km',
        name: 'Michaelis Constant',
        description: 'Concentration at half-maximum saturable elimination',
        unit: 'mg/L or µg/mL',
        typicalRange: '0.1 - 100 µg/mL',
        estimable: true
      }
    ],
    equations: [
      'dA1/dt = -CL×C1 - Vmax×C1/(Km + C1) - Q2×A1/V1 + Q2×A2/V2 - Q3×A1/V1 + Q3×A3/V3',
      'dA2/dt = Q2×A1/V1 - Q2×A2/V2',
      'dA3/dt = Q3×A1/V1 - Q3×A3/V3',
      'Combined linear and saturable elimination'
    ],
    applications: [
      'Most complex pharmacokinetic scenarios',
      'Advanced biologics research',
      'Sophisticated drug development',
      'Academic research'
    ],
    advantages: [
      'Ultimate model complexity',
      'Most comprehensive description',
      'Explains most complex behavior',
      'Research gold standard'
    ],
    limitations: [
      'Extremely complex estimation',
      'Requires very extensive data',
      'Highest parameter correlation',
      'Significant computational challenges'
    ],
    references: [
      'Houston JB. Drug metabolite kinetics. Pharmacol Ther, 1982',
      'Pang KS, Rowland M. Hepatic clearance of drugs. I. Theoretical considerations. J Pharmacokinet Biopharm, 1977'
    ],
    extendedDescription: [
      'The three-compartment combined elimination model represents the ultimate in pharmacokinetic modeling complexity, providing the most comprehensive description of drug disposition possible.',
      'This model is reserved for the most complex research applications where understanding every aspect of drug disposition is critical. It combines complex distribution with multiple elimination pathways.',
      'The model accounts for distribution to multiple tissue compartments while elimination occurs through both linear and saturable pathways, creating the most complex pharmacokinetic behavior possible.',
      'Clinical applications are primarily in advanced drug development and research settings where complete understanding of drug disposition is essential for regulatory approval or mechanistic understanding.',
      'This model represents the current pinnacle of pharmacokinetic modeling, requiring the most sophisticated analytical approaches and extensive data for reliable parameter estimation.'
    ]
  },
  {
    id: 'michaelis-menten',
    name: 'Michaelis-Menten Elimination Model',
    type: 'mechanism',
    compartments: 1,
    category: 'Nonlinear Elimination',
    description: 'Model with saturable, capacity-limited elimination following Michaelis-Menten kinetics',
    longDescription: 'This model describes drugs that exhibit nonlinear pharmacokinetics due to saturable elimination processes. At low concentrations, elimination appears first-order, but becomes zero-order at high concentrations.',
    parameters: [
      {
        symbol: 'V',
        name: 'Volume of Distribution',
        description: 'Apparent volume in which the drug is distributed',
        unit: 'L or L/kg',
        typicalRange: '0.1 - 10 L/kg',
        estimable: true
      },
      {
        symbol: 'Vmax',
        name: 'Maximum Elimination Rate',
        description: 'Maximum rate of elimination when enzymes are saturated',
        unit: 'mg/h or mg/h/kg',
        typicalRange: '1 - 1000 mg/h/kg',
        estimable: true
      },
      {
        symbol: 'Km',
        name: 'Michaelis Constant',
        description: 'Concentration at half-maximum elimination rate',
        unit: 'mg/L or µg/mL',
        typicalRange: '0.1 - 100 µg/mL',
        estimable: true
      }
    ],
    equations: [
      'dA/dt = -Vmax × C/(Km + C)',
      'Rate = Vmax × C/(Km + C)',
      'At low C: Rate ≈ (Vmax/Km) × C (first-order)',
      'At high C: Rate ≈ Vmax (zero-order)'
    ],
    applications: [
      'Phenytoin',
      'Ethanol',
      'Salicylates at high doses',
      'Some biologics'
    ],
    advantages: [
      'Mechanistically based',
      'Explains dose-dependent kinetics',
      'Predicts saturation effects',
      'Clinically relevant'
    ],
    limitations: [
      'Complex parameter estimation',
      'Requires wide concentration range',
      'May need rich sampling',
      'Assumes single enzyme system'
    ],
    references: [
      'Ludden TM, et al. Nonlinear pharmacokinetics of phenytoin. Clin Pharmacokinet, 1977',
      'Wagner JG. Properties of the Michaelis-Menten equation and its integrated form. J Pharmacokinet Biopharm, 1973'
    ],
    extendedDescription: [
      'The Michaelis-Menten elimination model describes the pharmacokinetics of drugs that undergo saturable elimination processes. This nonlinear behavior occurs when elimination pathways become saturated at therapeutic concentrations, leading to dose-dependent pharmacokinetics.',
      'Phenytoin is the classic example of a drug following Michaelis-Menten kinetics. Small increases in dose can lead to disproportionately large increases in plasma concentrations once the elimination pathway approaches saturation. This makes dosing adjustments challenging and requires careful monitoring.',
      'The model parameters have direct physiological meaning: Vmax represents the maximum capacity of the elimination system, while Km represents the concentration at which elimination is half-saturated. The ratio Vmax/Km represents the intrinsic clearance at low concentrations.',
      'Clinical implications include the need for individualized dosing, careful monitoring during dose adjustments, and understanding that steady-state may take much longer to achieve compared to linear kinetics. Drug interactions can be particularly significant for drugs following Michaelis-Menten kinetics.',
      'This model is increasingly relevant for biologics and targeted therapies that may saturate specific elimination pathways. Understanding nonlinear kinetics is crucial for safe and effective use of drugs with capacity-limited elimination.'
    ]
  },
  {
    id: 'combined-elimination',
    name: 'Combined Linear and Michaelis-Menten Elimination Model',
    type: 'mechanism',
    compartments: 1,
    category: 'Mixed Elimination',
    description: 'Model with both linear and saturable elimination pathways operating simultaneously',
    longDescription: 'This model describes drugs that have both linear (non-saturable) and nonlinear (saturable) elimination pathways operating in parallel. This is common for drugs with multiple elimination routes.',
    parameters: [
      {
        symbol: 'V',
        name: 'Volume of Distribution',
        description: 'Apparent volume in which the drug is distributed',
        unit: 'L or L/kg',
        typicalRange: '0.1 - 10 L/kg',
        estimable: true
      },
      {
        symbol: 'CL',
        name: 'Linear Clearance',
        description: 'Non-saturable clearance component',
        unit: 'L/h or L/h/kg',
        typicalRange: '0.01 - 5 L/h/kg',
        estimable: true
      },
      {
        symbol: 'Vmax',
        name: 'Maximum Saturable Elimination Rate',
        description: 'Maximum rate of saturable elimination pathway',
        unit: 'mg/h or mg/h/kg',
        typicalRange: '1 - 1000 mg/h/kg',
        estimable: true
      },
      {
        symbol: 'Km',
        name: 'Michaelis Constant',
        description: 'Concentration at half-maximum saturable elimination',
        unit: 'mg/L or µg/mL',
        typicalRange: '0.1 - 100 µg/mL',
        estimable: true
      }
    ],
    equations: [
      'dA/dt = -CL×C - Vmax×C/(Km + C)',
      'Total clearance = CL + Vmax/(Km + C)',
      'Linear component: Rate = CL × C',
      'Saturable component: Rate = Vmax × C/(Km + C)'
    ],
    applications: [
      'Drugs with multiple elimination pathways',
      'Compounds with renal and hepatic clearance',
      'Biologics with target and non-target elimination',
      'Drugs with active and passive transport'
    ],
    advantages: [
      'Realistic for many drugs',
      'Explains complex kinetics',
      'Accounts for multiple pathways',
      'Clinically relevant'
    ],
    limitations: [
      'Complex parameter estimation',
      'High parameter correlation',
      'Requires extensive data',
      'Identifiability challenges'
    ],
    references: [
      'Houston JB. Drug metabolite kinetics. Pharmacol Ther, 1982',
      'Pang KS, Rowland M. Hepatic clearance of drugs. I. Theoretical considerations. J Pharmacokinet Biopharm, 1977'
    ],
    extendedDescription: [
      'The combined linear and Michaelis-Menten elimination model represents a more realistic description of drug elimination for compounds that undergo multiple elimination pathways. Many drugs are eliminated through both saturable (e.g., hepatic metabolism) and non-saturable (e.g., renal excretion) processes.',
      'This model is particularly relevant for drugs where one pathway may become saturated while others remain linear. For example, a drug may undergo saturable hepatic metabolism while also being eliminated unchanged by the kidneys through a non-saturable process.',
      'The relative contribution of each pathway depends on the drug concentration and the kinetic parameters. At low concentrations, both pathways may appear linear, but as concentrations increase, the saturable component becomes capacity-limited while the linear component continues proportionally.',
      'Clinical implications include complex dose-response relationships and the potential for drug interactions to affect different elimination pathways differently. Understanding the contribution of each pathway is important for predicting the effects of disease states or drug interactions.',
      'This model is increasingly important for biologics and targeted therapies that may have both target-mediated (saturable) and non-specific (linear) elimination pathways. The model helps predict how changes in target expression or binding might affect overall drug disposition.'
    ]
  },
  {
    id: 'tmdd',
    name: 'TMDD (Target-Mediated Drug Disposition)',
    type: 'mechanism',
    compartments: 1,
    category: 'Mechanistic',
    description: 'Model for drugs that bind specifically to their pharmacological target',
    longDescription: 'Target-Mediated Drug Disposition (TMDD) models describe the pharmacokinetics of drugs that bind with high affinity to their pharmacological target. This binding significantly affects the drug\'s disposition. TMDD is commonly observed with monoclonal antibodies, biologics, and drugs with specific high-affinity binding sites.',
    parameters: [
      {
        symbol: 'V',
        name: 'Volume of Distribution',
        description: 'Central volume of distribution',
        unit: 'L or L/kg',
        typicalRange: '0.05 - 0.2 L/kg',
        estimable: true
      },
      {
        symbol: 'CL',
        name: 'Linear Clearance',
        description: 'Non-specific clearance',
        unit: 'L/h or L/h/kg',
        typicalRange: '0.001 - 0.1 L/h/kg',
        estimable: true
      },
      {
        symbol: 'Vmax',
        name: 'Maximum Binding Rate',
        description: 'Maximum rate of target-mediated elimination',
        unit: 'mg/h or mg/h/kg',
        typicalRange: '0.1 - 100 mg/h/kg',
        estimable: true
      },
      {
        symbol: 'Km',
        name: 'Michaelis Constant',
        description: 'Concentration at half-maximum binding',
        unit: 'mg/L or µg/mL',
        typicalRange: '0.1 - 50 µg/mL',
        estimable: true
      }
    ],
    equations: [
      'dC/dt = -CL×C/V - Vmax×C/(Km + C)',
      'Total clearance = CL + Vmax/(Km + C)',
      'Non-linear kinetics at low concentrations',
      'Linear kinetics at high concentrations'
    ],
    applications: [
      'Monoclonal antibodies',
      'Therapeutic proteins',
      'Biologics with specific targets',
      'Drugs with saturable binding'
    ],
    advantages: [
      'Mechanistically based',
      'Explains non-linear kinetics',
      'Predicts target occupancy',
      'Guides dose selection'
    ],
    limitations: [
      'Complex parameter estimation',
      'Requires rich data',
      'Assumptions about target kinetics',
      'May need additional compartments'
    ],
    references: [
      'Mager DE, Jusko WJ. General pharmacokinetic model for drugs exhibiting target-mediated drug disposition. J Pharmacokinet Pharmacodyn, 2001',
      'Gibiansky L, et al. Target-mediated drug disposition model: approximations, identifiability of model parameters and applications to the population pharmacokinetic-pharmacodynamic modeling of biologics. Expert Opin Drug Metab Toxicol, 2008'
    ],
    extendedDescription: [
      'Target-Mediated Drug Disposition (TMDD) models describe the pharmacokinetics of drugs that bind with high affinity to their pharmacological target. This binding significantly affects the drug\'s disposition. TMDD is commonly observed with monoclonal antibodies, biologics, and drugs with specific high-affinity binding sites.',
      'The TMDD model accounts for the nonlinear pharmacokinetics that result from saturable binding to the target. At low concentrations, the target is not saturated and elimination appears nonlinear. At high concentrations, the target becomes saturated and elimination becomes linear.',
      'Clinical applications include monoclonal antibodies and therapeutic proteins where target binding significantly affects pharmacokinetics. The model helps optimize dosing to achieve target saturation while minimizing unnecessary exposure.',
      'The model parameters provide insights into target biology and drug-target interactions. Understanding these relationships is crucial for dose selection and predicting the effects of target expression changes on drug disposition.',
      'TMDD models are increasingly important in the development of biologics and targeted therapies, where understanding target-mediated elimination is essential for rational dose selection and optimization of therapeutic outcomes.'
    ]
  }
];

export const getModelById = (id: string): PharmacokineticModel | undefined => {
  return pharmacokineticModels.find(model => model.id === id);
};

export const searchModels = (query: string): PharmacokineticModel[] => {
  if (!query.trim()) return pharmacokineticModels;
  
  const lowerQuery = query.toLowerCase();
  return pharmacokineticModels.filter(model => 
    model.name.toLowerCase().includes(lowerQuery) ||
    model.description.toLowerCase().includes(lowerQuery) ||
    model.category.toLowerCase().includes(lowerQuery) ||
    model.type.toLowerCase().includes(lowerQuery)
  );
};