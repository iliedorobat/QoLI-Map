// downloaded from /stats/config?analysisType=aggregate
export default {
    checked: true,
    filename: "qoli",
    label: "QoLI",
    aggregators: [
        {
            checked: true,
            filename: "safety",
            label: "Economic and Physical Safety",
            aggregators: [
                {
                    checked: true,
                    filename: "safety:crimeRatio",
                    label: "Crime Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "safety:unpaidRatio",
                    label: "Non Payment Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "safety:pensionPpsRatio",
                    label: "Pension in PPS Ratio",
                    negativeState: false,
                    units: "PPS per inhabitant"
                },
                {
                    checked: true,
                    filename: "safety:socialProtectionPpsRatio",
                    label: "Social Protection in PPS Ratio",
                    negativeState: false,
                    units: "PPS per inhabitant"
                },
                {
                    checked: true,
                    filename: "safety:offencesRatio",
                    label: "Total Offences Ratio",
                    negativeState: true,
                    units: "per hundred inhabitants"
                },
                {
                    checked: true,
                    filename: "safety:unexpectedRatio",
                    label: "Unexpected Ratio",
                    negativeState: true,
                    units: "%"
                }
            ]
        },
        {
            checked: true,
            filename: "education",
            label: "Education",
            aggregators: [
                {
                    checked: true,
                    filename: "education:digitalSkillsRatio",
                    label: "Digital Skills Ratio",
                    negativeState: false,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "education:dropoutRatio",
                    label: "Dropout Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "education:earlyEducationRatio",
                    label: "Early Education Ratio",
                    negativeState: false,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "education:educationRatio",
                    label: "Education Ratio",
                    negativeState: false,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "education:inactiveYoungRatio",
                    label: "Inactive Young People Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "education:noKnownForeignLangRatio",
                    label: "No Foreign Language Known Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "education:pupilsRatio",
                    label: "Pupils Ratio",
                    negativeState: true,
                    units: "pupils per teacher"
                },
                {
                    checked: true,
                    filename: "education:trainingLastMonthRatio",
                    label: "Training Ratio (last 4 weeks)",
                    negativeState: false,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "education:trainingLastYearRatio",
                    label: "Training Ratio (last year)",
                    negativeState: false,
                    units: "%"
                }
            ]
        },
        {
            checked: true,
            filename: "governance",
            label: "Governance and Basic Rights",
            aggregators: [
                {
                    checked: true,
                    filename: "governance:citizenshipRatio",
                    label: "Citizenship Ratio",
                    negativeState: false,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "governance:genderEmpGap",
                    label: "Gender Employment Gap",
                    negativeState: false,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "governance:genderPayGap",
                    label: "Gender Pay Gap",
                    negativeState: false,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "governance:populationTrustRatio",
                    label: "Population Trust Ratio",
                    negativeState: false,
                    units: "Scores between 10 - 100"
                },
                {
                    checked: true,
                    filename: "governance:voterTurnout",
                    label: "Voter Turnout",
                    negativeState: false,
                    units: "%"
                }
            ]
        },
        {
            checked: true,
            filename: "health",
            label: "Health",
            aggregators: [
                {
                    checked: true,
                    filename: "health:bodyMassIndex",
                    label: "Body Mass Index",
                    negativeState: false,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "health:depressiveRatio",
                    label: "Depressive Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "health:personnelTotal",
                    label: "Health Personnel Ratio",
                    negativeState: false,
                    units: "per million inhabitants"
                },
                {
                    checked: true,
                    filename: "health:healthyLifeRatio",
                    label: "Healthy Life Ratio",
                    negativeState: false,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "health:healthyLifeYears",
                    label: "Healthy Life Years",
                    negativeState: false,
                    units: "years"
                },
                {
                    checked: true,
                    filename: "health:hospitalBeds",
                    label: "Hospital Beds",
                    negativeState: false,
                    units: "per million inhabitants"
                },
                {
                    checked: true,
                    filename: "health:lifeExpectancy",
                    label: "Life Expectancy at Birth",
                    negativeState: false,
                    units: "years"
                },
                {
                    checked: true,
                    filename: "health:longHealthIssuesRatio",
                    label: "Long Health Issues Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "health:nonAlcoholicRatio",
                    label: "Non-Alcoholic Ratio",
                    negativeState: false,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "health:nonFruitsVegetablesRatio",
                    label: "Non-Fruits Vegetables Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "health:physicalActivitiesRatio",
                    label: "Physical Activities Ratio",
                    negativeState: false,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "health:smokersRatio",
                    label: "Smokers Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "health:unmetDentalStatus",
                    label: "Unmet Dental Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "health:unmetMedicalStatus",
                    label: "Unmet Medical Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "health:workAccidents",
                    label: "Work Accidents Ratio",
                    negativeState: true,
                    units: "per thousand inhabitants"
                }
            ]
        },
        {
            checked: true,
            filename: "leisureInteractions",
            label: "Leisure and Social Interactions",
            aggregators: [
                {
                    checked: true,
                    filename: "leisureInteractions:askingRatio",
                    label: "Asking Ratio",
                    negativeState: false,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "leisureInteractions:discussionRatio",
                    label: "Discussion Ratio",
                    negativeState: false,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "leisureInteractions:formalVoluntaryActivitiesRatio",
                    label: "Formal Voluntary Ratio",
                    negativeState: false,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "leisureInteractions:frequencyContactFamRatio",
                    label: "Frequency Contact Ratio (Family)",
                    negativeState: false,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "leisureInteractions:frequencyContactFrdRatio",
                    label: "Frequency Contact Ratio (Friends)",
                    negativeState: false,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "leisureInteractions:gettingTogetherFamRatio",
                    label: "Getting Together Ratio (Family)",
                    negativeState: false,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "leisureInteractions:gettingTogetherFrdRatio",
                    label: "Getting Together Ratio (Friends)",
                    negativeState: false,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "leisureInteractions:areaSatisfactionRatio",
                    label: "Green Areas Satisfaction Ratio",
                    negativeState: false,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "leisureInteractions:informalVoluntaryActivitiesRatio",
                    label: "Informal Voluntary Ratio",
                    negativeState: false,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "leisureInteractions:socialActivitiesNpRatio",
                    label: "Non-Participation in Social Activities Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "leisureInteractions:voluntaryActivitiesNpRatio",
                    label: "Non-Participation in Voluntary Activities Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "leisureInteractions:relationshipsSatisfactionRatio",
                    label: "Relationships Satisfaction Ratio",
                    negativeState: false,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "leisureInteractions:socialActivitiesRatio",
                    label: "Social Activities Ratio",
                    negativeState: false,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "leisureInteractions:timeSpentSatisfaction",
                    label: "Time Satisfaction Ratio",
                    negativeState: false,
                    units: "%"
                }
            ]
        },
        {
            checked: true,
            filename: "livingConditions",
            label: "Material Living Conditions",
            aggregators: [
                {
                    checked: true,
                    filename: "livingConditions:dwellingIssuesRatio",
                    label: "Dwelling Issues Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "livingConditions:endMeetInabilityRatio",
                    label: "Ends Meet Inability Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "livingConditions:financialSatisfactionRatio",
                    label: "Financial Satisfaction Ratio",
                    negativeState: false,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "livingConditions:gdpPerCapitaPpsRatio",
                    label: "GDP per Capita in PPS Ratio",
                    negativeState: false,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "livingConditions:highIncomeRatio",
                    label: "High Income Ratio",
                    negativeState: false,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "livingConditions:incomeQuintileRatio",
                    label: "Income Quintile Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "livingConditions:lackOfBathsRatio",
                    label: "Lack of Baths Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "livingConditions:lowWorkIntensityRatio",
                    label: "Low Work Intensity Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "livingConditions:materialDeprivationRatio",
                    label: "Material Deprivation Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "livingConditions:medianIncomePpsRatio",
                    label: "Median Income in PPS Ratio",
                    negativeState: false,
                    units: "PPS"
                },
                {
                    checked: true,
                    filename: "livingConditions:overOccupiedRatio",
                    label: "Over Occupied Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "livingConditions:povertyRiskRatio",
                    label: "Poverty Risk Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "livingConditions:underOccupiedRatio",
                    label: "Under Occupied Ratio",
                    negativeState: false,
                    units: "%"
                }
            ]
        },
        {
            checked: true,
            filename: "environment",
            label: "Natural and Living Environment",
            aggregators: [
                {
                    checked: true,
                    filename: "environment:airPollutionRatio",
                    label: "Air Pollution Ratio",
                    negativeState: true,
                    units: "kilograms per capita"
                },
                {
                    checked: true,
                    filename: "environment:noisePollutionRatio",
                    label: "Noise Pollution Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "environment:pollutionRatio",
                    label: "Pollution Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "environment:waterSupplyRatio",
                    label: "Water Supply Ratio",
                    negativeState: false,
                    units: "%"
                }
            ]
        },
        {
            checked: true,
            filename: "overallExperience",
            label: "Overall Experience of Life",
            aggregators: [
                {
                    checked: true,
                    filename: "overallExperience:happinessRatio",
                    label: "Happiness Ratio",
                    negativeState: false,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "overallExperience:highSatisfactionRatio",
                    label: "High Satisfaction Ratio",
                    negativeState: false,
                    units: "%"
                }
            ]
        },
        {
            checked: true,
            filename: "mainActivity",
            label: "Productive or Main Activity",
            aggregators: [
                {
                    checked: true,
                    filename: "mainActivity:avgRemainedWorkHours",
                    label: "Average Remained Work Hours Ratio",
                    negativeState: false,
                    units: "hours"
                },
                {
                    checked: true,
                    filename: "mainActivity:employmentRatio",
                    label: "Employment Ratio",
                    negativeState: false,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "mainActivity:inactivePopulationRatio",
                    label: "Inactive Population Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "mainActivity:involuntaryPartTimeRatio",
                    label: "Involuntary Part-Time Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "mainActivity:jobSatisfaction",
                    label: "Job Satisfaction",
                    negativeState: false,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "mainActivity:longTermUnemploymentRatio",
                    label: "Long Term Unemployment Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "mainActivity:lowWageEarnersRatio",
                    label: "Low Wage Earners Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "mainActivity:lowWorkIntensityRatio",
                    label: "Low Work Intensity Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "mainActivity:researchersRatio",
                    label: "Researchers Ratio",
                    negativeState: false,
                    units: "per ten thousand inhabitants"
                },
                {
                    checked: true,
                    filename: "mainActivity:temporaryEmploymentRatio",
                    label: "Temporary Employment Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "mainActivity:unemploymentRatio",
                    label: "Unemployment Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "mainActivity:workingFlexibilityRatio",
                    label: "Working Flexibility Ratio",
                    negativeState: false,
                    units: "%"
                },
                {
                    checked: true,
                    filename: "mainActivity:workingNightsRatio",
                    label: "Working Nights Ratio",
                    negativeState: true,
                    units: "%"
                }
            ]
        }
    ]
};
