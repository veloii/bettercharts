import {
  TransitionGroup,
  Transition as ReactTransition,
} from "react-transition-group";
const TIMEOUT = 200;

const getTransitionStyles = {
  entering: {
    position: `absolute`,
    opacity: 0,
    transform: `trangrayX(50px)`,
  },
  entered: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 1,
    transform: `trangrayX(0px)`,
  },
  exiting: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 0,
    transform: `trangrayX(-50px)`,
  },
};

const Transition = ({ children, location, user }: any) => {
  return user ? (
    <TransitionGroup style={{ position: "relative" }}>
      <ReactTransition
        key={location}
        timeout={{
          enter: TIMEOUT,
          exit: TIMEOUT,
        }}
      >
        {(status: string | number) => (
          <div
            style={{
              //@ts-ignore
              ...getTransitionStyles[status],
            }}
          >
            {children}
          </div>
        )}
      </ReactTransition>
    </TransitionGroup>
  ) : (
    children
  );
};

export default Transition;
