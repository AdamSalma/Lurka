import { createPropToClassMapper } from '~/utils/react';

export default createPropToClassMapper("Card", {
    size: {
        "small": "Card__size-small",
        "medium": "Card__size-medium",
        "large": "Card__size-large",
    },
    isActive: {
        true: "Card__is-active"
    }
})
