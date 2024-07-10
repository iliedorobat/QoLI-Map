enum CHART_TYPE {
    BAR = 'bar',
    LINE = 'line'
}

const CHART_TYPE_LABELS = {
    [CHART_TYPE.BAR]: 'Bar',
    [CHART_TYPE.LINE]: 'Line'
};

const CHART_DIRECTION = {
    [CHART_TYPE.BAR]: {
        HORIZONTAL: 'HORIZONTAL',
        VERTICAL: 'VERTICAL'
    },
    [CHART_TYPE.LINE]: {
        HORIZONTAL: 'HORIZONTAL'
    }
};

const CHART_DIRECTION_LABELS: {[index: string]: string} = {
    HORIZONTAL: 'Horizontal',
    VERTICAL: 'Vertical'
};

export {
    CHART_DIRECTION,
    CHART_DIRECTION_LABELS,
    CHART_TYPE,
    CHART_TYPE_LABELS
}
