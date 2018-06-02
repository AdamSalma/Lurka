import { createPropToClassMapper } from '~/utils/react';

export default createPropToClassMapper("Title", {
    font: {
        primary: "font-primary",
        secondary: "font-secondary"
    },
    weight: {
        light: "weight-light",
        normal: "weight-normal",
        bold: "weight-bold"
    },
    align: {
        center: "align-center",
        left: "align-left",
        right: "align-right"
    }
})
