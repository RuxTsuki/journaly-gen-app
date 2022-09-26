import { useAppSelector } from "./reduxHooks";

const useGetNote = () => {
  return useAppSelector((state) => state.journal);
};

export default useGetNote;
