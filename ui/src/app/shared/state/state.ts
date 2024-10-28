import {Injectable} from "@angular/core";

import {
    ANALYSIS_TYPE,
    DEFAULT_ANALYSIS_TYPE,
    DEFAULT_STATS_ANALYSIS_TYPE,
    STATS_ANALYSIS_TYPE
} from "@/app/shared/constants/app.const";
import {MENU_ITEMS_IDS} from "@/app/app.const";

export interface IState {
    analysisType: ANALYSIS_TYPE;

    isAggregatedAnalysis(): boolean;
    isIndividuallyAnalysis(): boolean;
}

@Injectable({
    providedIn: 'root'
})
export class State implements IState {
    public analysisType: ANALYSIS_TYPE = DEFAULT_ANALYSIS_TYPE;
    public statsAnalysisType: STATS_ANALYSIS_TYPE = DEFAULT_STATS_ANALYSIS_TYPE;

    isAggregatedAnalysis = (): boolean => {
        return this.analysisType === ANALYSIS_TYPE.AGGREGATE;
    }

    isIndividuallyAnalysis(): boolean {
        return this.analysisType === ANALYSIS_TYPE.INDIVIDUALLY;
    }

    isChartAnalysis(): boolean {
        return this.statsAnalysisType === STATS_ANALYSIS_TYPE.CHART;
    }

    isTableAnalysis(): boolean {
        return this.statsAnalysisType === STATS_ANALYSIS_TYPE.TABLE;
    }

    isStatsAnalysis(): boolean {
        return this.isChartAnalysis() || this.isTableAnalysis();
    }

    setStatsAnalysisType(buttonId: string): void {
        if (buttonId === MENU_ITEMS_IDS.STATS_CHART) {
            this.statsAnalysisType = STATS_ANALYSIS_TYPE.CHART;
        } else if (buttonId === MENU_ITEMS_IDS.STATS_TABLE) {
            this.statsAnalysisType = STATS_ANALYSIS_TYPE.TABLE;
        } else {
            this.statsAnalysisType = DEFAULT_STATS_ANALYSIS_TYPE;
        }
    }

    resetStatsAnalysisType(): void {
        this.statsAnalysisType = DEFAULT_STATS_ANALYSIS_TYPE;
    }
}
