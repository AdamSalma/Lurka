/**
 * Wrap a component inside one of the exported animations to use the effect
 *
 * e.g. <FadeInTopSlideAnimation> <FolderTree /> </FadeInTopSlideAnimation/>
 *
 * Note: if you're creating a new animation, avoid composing these components.
 *       Its better to create a new one with the desired animation.
 */
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { FC } from "react";

type Props = {
  /**
   * Time to wait before performing the animation
   **/
  delay?: number;

  /**
   * Animation speed in milliseconds
   **/
  speed?: number;

  /**
   * Speed control for the animation
   **/
  cubicBezier?: string;
};

const fadeInTopSlide = keyframes`
   from {
     transform: translateY(-8px);
     opacity: 0;
   }
   to {
     transform: translateY(0);
     opacity: 1;
   }
 `;

// prettier-ignore
export const FadeInTopSlideAnimation = styled.div<Props>`
   animation: ${({ delay = 0, speed = 240, cubicBezier='' }) =>
     css`${fadeInTopSlide} ${speed}ms ${delay}ms ${cubicBezier} forwards;`};
   opacity: 0;
 `;

const fadeInBottomSlide = keyframes`
   from {
     transform: translateY(8px);
     opacity: 0;
   }
   to {
     transform: translateY(0);
     opacity: 1;
   }
 `;

// prettier-ignore
export const FadeInLeftSlideAnimation = styled.div<Props>`
   animation: ${({ delay = 0, speed = 240, cubicBezier=''}) =>
     css`${fadeInLeftSlide} ${speed}ms ${delay}ms ${cubicBezier} forwards;`};
   opacity: 0;
 `;

const fadeInLeftSlide = keyframes`
   from {
     transform: translateX(8px);
     opacity: 0;
   }
   to {
     transform: translateY(0);
     opacity: 1;
   }
 `;

// prettier-ignore
export const FadeInRightSlideAnimation = styled.div<Props>`
   animation: ${({ delay = 0, speed = 240, cubicBezier=''}) =>
     css`${fadeInRightSlide} ${speed}ms ${delay}ms ${cubicBezier} forwards;`};
   opacity: 0;
 `;

const fadeInRightSlide = keyframes`
   from {
     transform: translateX(-8px);
     opacity: 0;
   }
   to {
     transform: translateX(0);
     opacity: 1;
   }
 `;

// prettier-ignore
export const FadeInBottomSlideAnimation = styled.div<Props>`
   animation: ${({ delay = 0, speed = 240, cubicBezier=''}) =>
     css`${fadeInBottomSlide} ${speed}ms ${delay}ms ${cubicBezier} forwards;`};
   opacity: 0;
 `;

const fadeIn = keyframes`
   from { opacity: 0 }
   to { opacity: 1 }
 `;

// prettier-ignore
export const FadeInAnimation = styled.div<Props>`
   animation: ${({ delay = 0, speed = 240, cubicBezier = '' }) =>
     css`${fadeIn} ${speed}ms ${delay}ms ${cubicBezier} forwards;`};
   opacity: 0;
 `;

/**
 * Single reference to a fade in component that occurs
 * when we navigate to a new page in the app.
 */
export const AppNavigationAnimation: FC<Props> = (props) => (
  <FadeInAnimation cubicBezier={"cubic-bezier(0.25, 1, 0.5, 1)"} {...props} />
);

export const EmptyStateAnimation: FC<Props> = (props: Props) => (
  <FadeInBottomSlideAnimation delay={500} {...props} />
);
