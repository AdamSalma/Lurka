import React, { Component, Children } from 'react';
import cx from 'classnames';
import './styles';
import {isFunction} from '~/utils/types';
import * as TabEffects from './TabEffects';

class Tabs extends Component {
    constructor({defaultTab, effect}) {
        super();
        this.state = {
            activeTab: defaultTab
        }

        if (effect && !this.getTabComponent(effect)) {
            throw new Error(`Tabs: effect '${effect}' is not one of ${Object.keys(TabEffects)}`);
        }
    }

    render() {
        const { className, children, effect, ...restProps } = this.props;
        const { activeTab } = this.state;

        const TabComponent = this.getTabComponent(effect);
        const PageComponent = this.getActivePage(children, activeTab)

        return (
            <div className={cx('TabGroup', className)}>
                <div className="TabBar">
                    {children.map(child => {
                        return <TabComponent key={child.id}
                            isActive={child.id == activeTab}
                            onClick={() => this.changeTab(child.id)}>
                            {child.title}
                        </TabComponent>
                    })}
                </div>
                <PageComponent {...restProps}/>
            </div>
        );
    }

    getActivePage(children, activeTab) {
        console.warn("CHILDREN");
        console.warn(children);
        const activeChild = children.find(child => child.id === activeTab)

        if (!activeChild) {
            // Should we throw an error here instead?
            console.error(`Invalid tab id: ${activeTab} was not in ${children.map(c => c.id)}`)
            return null;
        }

        return activeChild.page
    }

    changeTab = (tabId) => {
        const { activeTab } = this.state;

        if (activeTab === tabId) {
            console.log(`Tab '${tabId}' is already active.`);
            return
        }

        this.setState({ activeTab: tabId }, () => {
            // Let parent know of change
            if (isFunction(this.props.onChange)) {
                this.props.onChange(tabId)
            }
        })
    }

    getTabComponent(effect) {
        switch (effect) {
            case "bar-slide":
                return TabEffects.BarSlideTab;
            default:
                return TabEffects.BarSlideTab;
        }
    }
}

export default Tabs
