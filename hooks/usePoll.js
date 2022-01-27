import { PollContext } from "contexts";
import { useContext } from "react";

const usePoll = () => {
  return useContext(PollContext);
};

export default usePoll;
