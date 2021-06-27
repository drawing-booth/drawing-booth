import * as React from "react";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useRoute, useRouter } from "react-router5";
import { routes } from "../../../pages/Router";
import { Grid } from "@material-ui/core";
import classNames from "classnames";

import { INITIAL_ROUTE } from "../../../config";

const getComponent = (name: string) => {
  const { component } = routes.find((r) => r.name === name)!;
  return component;
};

const INDEX_DICT = routes
  .map(({ name }, index) => [name, index])
  .reduce<any>((acm, [k, v]) => ({ ...acm, [k]: v }), {});

interface IContainerProps {
  children: React.ReactChild;
  style?: React.CSSProperties;
  onAnimationEnd?: () => void;
  className?: string;
}

const Container = ({
  onAnimationEnd,
  children,
  className,
  style,
}: IContainerProps) => (
  <Grid
    onAnimationEnd={onAnimationEnd}
    className={className}
    style={style}
    item
    xs
    sm
    md
    lg
    xl
  >
    <Grid container>{children}</Grid>
  </Grid>
);

const useStyles = makeStyles((theme) => ({
  moveLeft: {
    animation: `$moveLeftEnter 500ms ${theme.transitions.easing.easeInOut}`,
  },
  moveRight: {
    animation: `$moveRightEnter 500ms ${theme.transitions.easing.easeInOut}`,
  },
  "@keyframes moveLeftEnter": {
    "0%": {
      transform: "translateX(-200%)",
      opacity: 0,
    },
    "100%": {
      transform: "translateX(0)",
      opacity: 1,
    },
  },
  "@keyframes moveRightEnter": {
    "0%": {
      transform: "translateX(200%)",
      opacity: 0,
    },
    "100%": {
      transform: "translateX(0)",
      opacity: 1,
    },
  },
}));

interface IRouterContainerProps {
  defaultPage?: string;
}

export const RouterContainer = ({
  defaultPage,
}: IRouterContainerProps) => {
  const [moveLeft, setMoveLeft] = useState(false);
  const [moveRight, setMoveRight] = useState(false);
  const { route } = useRoute();
  const router = useRouter();
  const classes = useStyles();

  useEffect(() => {
    const unsubscribe = router.useMiddleware(
      () => (toRoute, fromRoute, done) => {
        const { name: to = INITIAL_ROUTE } = toRoute || {};
        const { name: from = INITIAL_ROUTE } = fromRoute || {};
        const toIdx = INDEX_DICT[to];
        const fromIdx = INDEX_DICT[from];
        if (fromIdx === toIdx) {
          // void(0);
        } else if (fromIdx > toIdx) {
          setMoveLeft(true);
        } else {
          setMoveRight(true);
        }
        done();
      }
    );
    return () => unsubscribe();
  }, []);

  const handleAnimationEnd = () => {
    setMoveLeft(false);
    setMoveRight(false);
  };

  const { name = defaultPage, params = {} } = route || {};
  const Component = getComponent(name!);
  return (
    <Container
      className={classNames({
        [classes.moveLeft]: moveLeft,
        [classes.moveRight]: moveRight,
      })}
      onAnimationEnd={handleAnimationEnd}
    >
      <Component {...params} />
    </Container>
  );
};

export default RouterContainer;
